// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "hardhat/console.sol";

import "./escrow/IWegaERC20Escrow.sol";
import "./escrow/IEscrow.sol";
import "./roles/WegaProtocolAdminRole.sol";
import "./events/IWegaGameControllerEvents.sol";
import "./events/IERC20EscrowEvents.sol";
import "./IWegaGameController.sol";
import "./IWegaRandomizerController.sol";
import "./utils/Arrays.sol";
import './errors/WegaGameControllerErrors.sol';
import "./utils/Strings.sol";
import "./games/IWega.sol";

/**
  * @title GameController (MVP)
  * @author @RasenGUY @Daosourced.
  * The Game controller contract controls game play and winner declaration, it is the only contract 
  * with access controll that can interact with the Two-way chance game contract 
  * the Two-Way chance game that power the randomization logic for chance games      
  * that require two people for play 
  * @dev note this is draft contract not meant to be used in production
*/
contract WegaGameController is 
  IWegaGameController, 
  IWegaGameControllerEvents,
  WegaGameControllerErrors,
  WegaProtocolAdminRole,
  UUPSUpgradeable
  {

  using EnumerableMapUpgradeable for EnumerableMapUpgradeable.UintToUintMap;
  using EnumerableSetUpgradeable for EnumerableSetUpgradeable.UintSet; 
  using Strings for string;
  using Arrays for uint256[];

  IWegaERC20Escrow public erc20Escrow;
  IWegaRandomizerController public randomizerController;
  
  mapping(bytes32 => IWega.Wega) private _games;
  mapping(uint256 => address) _registeredGames;
  mapping(uint256 => GameSettings) _gameSettings;
  EnumerableSetUpgradeable.UintSet _gameNameHashes;
  
  function initialize(
    address erc20EscrowAddress, 
    address randomizerController_,
    GameSettings[] memory gameSettings
  ) initializer public {
    __WegaController_init(erc20EscrowAddress, gameSettings);
    __WegaProtocolAdminRole_init();
    __UUPSUpgradeable_init();
    randomizerController = IWegaRandomizerController(randomizerController_);
  }

  function __WegaController_init(
    address erc20EscrowAddress, 
    GameSettings[] memory gameSettings
  ) public onlyInitializing {
    __WegaController_init_unchained(erc20EscrowAddress, gameSettings);
  } 

  function __WegaController_init_unchained(
    address erc20EscrowAddress, 
    GameSettings[] memory gameSettings
  ) public onlyInitializing {
    erc20Escrow = IWegaERC20Escrow(erc20EscrowAddress);
    for(uint256 i = 0; i < gameSettings.length; i++) {
      _registeredGames[gameSettings[i].name.keyHash()] = gameSettings[i].proxy;
      _gameNameHashes.add(gameSettings[i].name.keyHash());
      _setGameConfiguration(gameSettings[i]);
    }
  }

  function createGame(
    string memory name,
    address tokenAddress,
    uint256 wagerAmount,
    uint256[] memory randomNumbers
  ) public override {
    require(_gameNameHashes.contains(name.keyHash()), INVALID_WEGA_GAME);
    GameSettings memory settings = getGameSettings(name);
    _seedRandomizerBeforeCreateOrDeposit(randomNumbers);
    bytes32 escrowHash = erc20Escrow.createWagerRequest(
      tokenAddress, 
      _msgSender(), 
      settings.requiredPlayers, 
      wagerAmount
    );
    IWega.Wega memory game;
    game.name = name;
    game.state = IWega.WegaState.WAITING;
    address[] memory players_ = new address[](settings.requiredPlayers);
    game.currentPlayers = players_;
    game.currentPlayers[0] = _msgSender();
    game.deposited += 1;
    _games[escrowHash] = game;
    emit GameCreation(escrowHash, erc20Escrow.getWagerRequest(escrowHash).nonce, _msgSender(), name); 
  }

  function depositOrPlay(bytes32 escrowHash, uint256[] memory randomNumbers) public override {
    IWega.Wega memory game =_games[escrowHash];
    GameSettings memory settings = getGameSettings(game.name); 
    _depositWagerTo(escrowHash);
    _seedRandomizerBeforeCreateOrDeposit(randomNumbers); 
    if(_games[escrowHash].deposited == settings.requiredPlayers) {
      _playDice(settings.proxy, escrowHash, _games[escrowHash].currentPlayers, settings.denominator, settings.minRounds);
    }
  }

  function depositOrPlay(
    bytes32 escrowHash,
    uint256[] memory playerChoices, 
    uint256[] memory randomNumbers
  ) public override {
    IWega.Wega memory game =_games[escrowHash];
    GameSettings memory settings = getGameSettings(game.name); 
    _depositWagerTo(escrowHash);
    _seedRandomizerBeforeCreateOrDeposit(randomNumbers);
    if(_games[escrowHash].deposited == settings.requiredPlayers) {
      _playCoinFlip(
        settings.proxy, 
        escrowHash, 
        _games[escrowHash].currentPlayers,
        playerChoices, 
        settings.denominator, 
        settings.minRounds
      );
    }
  }

  function _playDice(
    address gameAddress,
    bytes32 escrowHash, 
    address[] memory currentPlayers,
    uint256 rounds,
    uint256 denominator 
  ) internal {
    address[] memory gameWinners = IWega(gameAddress).play(
      escrowHash, 
      currentPlayers, 
      rounds, 
      denominator
    );  
    erc20Escrow.setWithdrawers(escrowHash, gameWinners);
    _games[escrowHash].state = IWega.WegaState.PLAYED;
    emit WinnerDeclaration(escrowHash, gameWinners);
  }

  function _playCoinFlip(
    address gameAddress,
    bytes32 escrowHash, 
    address[] memory currentPlayers,
    uint256[] memory playerChoices,
    uint256 rounds,
    uint256 denominator 
  ) internal {
    address[] memory gameWinners = IWega(gameAddress).play(
      escrowHash, 
      currentPlayers,
      playerChoices, 
      rounds, 
      denominator
    );  
    erc20Escrow.setWithdrawers(escrowHash, gameWinners);
    _games[escrowHash].state = IWega.WegaState.PLAYED;
    emit WinnerDeclaration(escrowHash, gameWinners);
  }

  function _depositWagerTo(bytes32 escrowHash) internal {
    IWega.Wega memory game =_games[escrowHash];
    GameSettings memory settings = getGameSettings(game.name); 
    IEscrow.ERC20WagerRequest memory wagerRequest = erc20Escrow.getWagerRequest(escrowHash);
    require(game.state != IWega.WegaState.PLAYED, INVALID_GAME_STATE);
    if(game.deposited != settings.requiredPlayers) {
      erc20Escrow.deposit(escrowHash, _msgSender(), wagerRequest.wagerAmount);
      _games[escrowHash].currentPlayers[game.deposited] = _msgSender();
      _games[escrowHash].deposited +=1; 
    }
  }

  function winners(
    string memory game, 
    bytes32 escrowHash
  ) external view override returns(address[] memory) {
    GameSettings memory settings = getGameSettings(game);
    return IWega(settings.proxy).winners(escrowHash);
  }
  
  function players(
    bytes32 escrowHash
  ) external view override returns(address[] memory) {
    return _games[escrowHash].currentPlayers;
  }

  function getGame(bytes32 escrowHash) external view override returns(IWega.Wega memory) {
    return _games[escrowHash];
  }
  
  function gameResults(
    string memory game,
    bytes32 escrowHash, 
    address player
  ) external view override returns(uint256[] memory) {
    return IWega(getGameSettings(game).proxy).playerResults(escrowHash, player);
  }

  function playerScore(
    string memory game,
    bytes32 escrowHash, 
    address player
  ) external view override returns(uint256) {
    return IWega(getGameSettings(game).proxy).playerScore(escrowHash, player);
  }

  function setGameConfiguration(GameSettings memory config) external onlyWegaProtocolAdmin {
    require(existsGame(config.name), INVALID_WEGA_GAME);
    _setGameConfiguration(config);
  }

  function registerGame(GameSettings memory config) external override onlyWegaProtocolAdmin {
    require(!existsGame(config.name), INVALID_WEGA_GAME);
    _registeredGames[config.name.keyHash()] = config.proxy;
    _gameNameHashes.add(config.name.keyHash());
    _setGameConfiguration(config);
    emit GameRegistration(config.name, config.proxy);
  }

  function _setGameConfiguration(GameSettings memory config) internal {
    _gameSettings[config.name.keyHash()] = config;
    emit SetGame(
      config.name, 
      config.denominator, 
      config.minRounds, 
      config.requiredPlayers, 
      config.proxy, 
      config.randomNumberController
    );
  }

  function getGameSettings(
    string memory game
  ) public view returns (GameSettings memory settings) {
    settings = _gameSettings[game.keyHash()];
  }

  function removeGame(string memory game) external override {
    require(existsGame(game), INVALID_WEGA_GAME);
    delete _gameSettings[game.keyHash()];
    delete _registeredGames[game.keyHash()];
  }

  function existsGame(string memory game) public view override returns (bool exists) {
    exists = _registeredGames[game.keyHash()] != address(0);
  }

  function _authorizeUpgrade(address newImplementation) internal onlyOwner override {}

  function _seedRandomizerBeforeCreateOrDeposit(uint256[] memory randomNumbers) internal {
    randomizerController.seedRandomizer(randomNumbers);
  }
}