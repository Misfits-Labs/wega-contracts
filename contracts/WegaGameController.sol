// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "./escrow/IWegaERC20Escrow.sol";
import "./escrow/IEscrow.sol";
import "./roles/WegaGameManagerRole.sol";
import "./events/IWegaGameControllerEvents.sol";
import "./events/IERC20EscrowEvents.sol";
import "./IWegaGameController.sol";
import "./IWegaRandomNumberController.sol";
import "./utils/Arrays.sol";
import './errors/WegaGameControllerErrors.sol';
import "./utils/Strings.sol";
import "./games/IWega.sol";

import 'hardhat/console.sol';

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
  WegaGameManagerRole,
  UUPSUpgradeable
  {

  using EnumerableMapUpgradeable for EnumerableMapUpgradeable.UintToUintMap;
  using EnumerableSetUpgradeable for EnumerableSetUpgradeable.UintSet; 
  using Strings for string;
  using Arrays for uint256[];

  IWegaERC20Escrow public erc20Escrow;
  
  mapping(bytes32 => IWega.Wega) private _games;
  mapping(uint256 => address) _registeredGames;
  mapping(uint256 => GameSettings) _gameSettings;
  EnumerableSetUpgradeable.UintSet _gameNameHashes;
  
  function initialize(
    address erc20EscrowAddress, 
    string[] memory games,
    GameSettings[] memory gameSettings
  ) initializer public {
    __Ownable_init();
    __WegaGameController_init(erc20EscrowAddress, games, gameSettings);
    __WegaGameManagerRole_init();
    _addWegaGameManager(owner());
    __UUPSUpgradeable_init();
  }

  function __WegaGameController_init(
    address erc20EscrowAddress, 
    string[] memory games,
    GameSettings[] memory gameSettings
  ) public onlyInitializing {
    __WegaGameController_init_unchained(erc20EscrowAddress, games, gameSettings);
  } 

  function __WegaGameController_init_unchained(
    address erc20EscrowAddress, 
    string[] memory games,
    GameSettings[] memory gameSettings
  ) public onlyInitializing {
    erc20Escrow = IWegaERC20Escrow(erc20EscrowAddress);
    for(uint256 i = 0; i < games.length; i++) {
      _registerGame(
        games[i].keyHash(),
        gameSettings[i].proxy,
        gameSettings[i].denominator,
        gameSettings[i].minRounds,
        gameSettings[i].requiredPlayers,
        gameSettings[i].randomNumberController
      );
    }
  }

  // should create wager and deposit wager into contract 
  function createGame(
    string memory name,
    address tokenAddress,
    uint256 wagerAmount
  ) public {
    require(_gameNameHashes.contains(name.keyHash()), INVALID_WEGA_GAME);
    GameSettings memory settings = _getGameSettings(name);
    // create wager
    bytes32 escrowHash = erc20Escrow.createWagerRequest(
      tokenAddress, 
      _msgSender(), 
      settings.requiredPlayers, 
      wagerAmount
    );
    // create game 
    IWega.Wega memory game;
    game.name = name;
    game.state = IWega.WegaState.WAITING;
    game.currentPlayers[game.currentPlayers.length] = _msgSender(); 
    _games[escrowHash] = game;
    emit GameCreation(escrowHash, _msgSender(), name); 
  }

  // should deposit to contract
  function depositOrPlay(bytes32 escrowHash) public override {
    IWega.Wega memory game =_games[escrowHash];
    GameSettings memory settings = _getGameSettings(game.name); 
    IEscrow.ERC20WagerRequest memory wagerRequest = erc20Escrow.getWagerRequest(escrowHash);
    require(game.state != IWega.WegaState.PLAYED, INVALID_GAME_STATE);

    if(game.currentPlayers.length != settings.requiredPlayers) {

      // update escrow
      erc20Escrow.deposit(escrowHash, _msgSender(), wagerRequest.wagerAmount);
      
      // add player to game
      _games[escrowHash].currentPlayers[game.currentPlayers.length] = _msgSender();
      
      // play game 
      if(game.currentPlayers.length == settings.requiredPlayers) {
        _playWega(settings.proxy, escrowHash, game.currentPlayers, settings.minRounds, settings.denominator);
      }

    }
  } 

  function _playWega(
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

  function winners(
    string memory game, 
    bytes32 escrowHash
  ) external override returns(address[] memory) {
    GameSettings memory settings = _getGameSettings(game);
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
  ) external override returns(uint256[] memory) {
    return IWega(_getGameSettings(game).proxy).playerResults(escrowHash, player);
  }

  function playerScore(
    string memory game,
    bytes32 escrowHash, 
    address player
  ) external override returns(uint256) {
    return IWega(_getGameSettings(game).proxy).playerScore(escrowHash, player);
  }
  
  function setMinRounds(string memory game, uint256 newMinRounds) external override {
    GameSettings memory settings = _getGameSettings(game);
    _gameSettings[game.keyHash()].minRounds = newMinRounds;
    emit MinRoundsSet(game, settings.minRounds, newMinRounds);
  }
  
  function setDenominator(string memory game, uint256 denominator) external override {
    GameSettings memory settings = _getGameSettings(game);
    _gameSettings[game.keyHash()].denominator = denominator;
    emit MinRoundsSet(game, settings.denominator, denominator);
  }

  function setRequiredPlayers(string memory game, uint256 requiredPlayers) external override {
    GameSettings memory settings = _getGameSettings(game);
    _gameSettings[game.keyHash()].requiredPlayers = requiredPlayers;
    emit RequiredPlayersSet(game, settings.requiredPlayers, requiredPlayers);
  }

  function registerGame(
    string memory game,
    address gameAddress,
    uint256 minRounds,
    uint256 denominator, 
    uint256 requiredPlayers
  ) external override {
    _registerGame(
      game.keyHash(), 
      gameAddress, 
      denominator, 
      minRounds, 
      requiredPlayers, 
      IWega(gameAddress).randomNumbersContract()
    );
    emit GameRegistration(game, gameAddress);
  }

  function _registerGame(
    uint256 gameNameHash,
    address gameAddress,
    uint256 denominator, 
    uint256 minRounds,
    uint256 requiredPlayers,
    address randomNumberController
  ) internal {
    _registeredGames[gameNameHash] = gameAddress;
    GameSettings memory settings = GameSettings({
      proxy: gameAddress,
      denominator: denominator,
      minRounds: minRounds,
      requiredPlayers: requiredPlayers,
      randomNumberController: randomNumberController
    });
    _gameSettings[gameNameHash] = settings;
    _gameNameHashes.add(gameNameHash);
  }

  function _getGameSettings(string memory game) internal view returns (GameSettings memory settings) {
    settings = _gameSettings[game.keyHash()];
  }

  function removeGame(string memory game) external override {
    require(_registeredGames[game.keyHash()] != address(0), INVALID_WEGA_GAME);
    delete _gameSettings[game.keyHash()];
    delete _registeredGames[game.keyHash()];
  }

  function _authorizeUpgrade(address newImplementation) internal onlyOwner override {}
}