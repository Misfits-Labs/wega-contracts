// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";


import "./escrow/IWegaERC20Escrow.sol";
import "./escrow/IEscrow.sol";
import "./events/IWegaGameControllerEvents.sol";
import "./events/IERC20EscrowEvents.sol";
import "./IWegaGameController.sol";
import "./IWega.sol";
import "./games/IWegaChanceGame.sol";
import "./utils/Arrays.sol";
import { 
  WegaGameController_InvalidGameState
} from './errors/WegaGameControllerErrors.sol';

/**
  * @title GameController (MVP)
  * @author @RasenGUY @Daosourced.
  * 
  * The Game controller contract controls game play and winner declaration, it is the only contract 
  * with access controll that can interact with the Two-way chance game contract 
  * the Two-Way chance game that power the randomization logic for chance games      
  * that require two people for play 
  * @dev note this is draft contract not meant to be used in production
*/

contract WegaGameController is 
  IWegaGameController, 
  IWegaGameControllerEvents,
  IWega,
  OwnableUpgradeable {

  using EnumerableMapUpgradeable for EnumerableMapUpgradeable.UintToUintMap;
  using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;
  using CountersUpgradeable for CountersUpgradeable.Counter;
  using Arrays for uint256[]; 

  IWegaERC20Escrow public erc20Escrow;

  mapping(bytes32 => mapping(address => EnumerableMapUpgradeable.UintToUintMap)) private _gameResults;
  mapping(bytes32 => mapping(address => uint256)) private _playerPoints;
  mapping(bytes32 => EnumerableSetUpgradeable.AddressSet) private _winners;
  mapping(bytes32 => EnumerableSetUpgradeable.AddressSet) private _players;
  mapping(WegaType => uint256) private _gameDenoms;
  mapping(WegaType => uint256) private _gameMinRounds;
  mapping(bytes32 => Wega) _games;
  
  CountersUpgradeable.Counter private _nonce;

  IWegaChanceGame private _chanceContract;

  function __WegaGameController_init(address erc20EscrowAddress, address chanceContract) public initializer {
    __Ownable_init();
    __WegaGameController_init_unchained(erc20EscrowAddress, chanceContract);
  } 

  function __WegaGameController_init_unchained(
    address erc20EscrowAddress, 
    address chanceContract
  ) public onlyInitializing {

    erc20Escrow = IWegaERC20Escrow(erc20EscrowAddress);
    _chanceContract = IWegaChanceGame(chanceContract);
    _nonce.increment();
    
    // configure games
    _gameDenoms[WegaType.DICE] = 6;
    _gameDenoms[WegaType.COINFLIP] = 2;
    
    _gameMinRounds[WegaType.DICE] = 3;
    _gameMinRounds[WegaType.COINFLIP] = 2;

  } 
  

  // should create wager and deposit wager into contract 
  function createGameAndDepositInitialWager(
    address tokenAddress,
    uint256 requiredPlayerNum,
    uint256 wagerAmount,
    WegaType gameType
  ) public {
    
    // create wager
    bytes32 escrowHash = erc20Escrow.createWagerRequest(tokenAddress, _msgSender(), requiredPlayerNum, wagerAmount);
    _players[escrowHash].add(_msgSender());
    
    // create game 
    Wega memory game;
    game.gameType = gameType;
    game.state = WegaState.PENDING;
    game.denom = _gameDenoms[gameType];
    game.minRounds = _gameMinRounds[gameType];
    game.requiredPlayers = requiredPlayerNum;
    game.playersDeposited = 1;
    _games[escrowHash] = game;

    emit GameCreation(escrowHash, _msgSender(), gameType); 
  }

  // // should deposit to contract
  function depositOrPlay(bytes32 escrowHash) public override {
    Wega memory game =_games[escrowHash];
    IEscrow.ERC20WagerRequest memory wagerRequest = erc20Escrow.getWagerRequest(escrowHash);
    if(game.state != WegaState.PENDING || game.state != WegaState.READY) revert WegaGameController_InvalidGameState();
    
    if(game.state == WegaState.PENDING) {
      erc20Escrow.deposit(escrowHash, _msgSender(), wagerRequest.wagerAmount);
      if(game.playersDeposited < game.requiredPlayers) {
        _games[escrowHash].playersDeposited++;
        _players[escrowHash].add(_msgSender());
        // should emit a playerJoinedEvent
      } else {
        _games[escrowHash].state = WegaState.READY; 
      } 
    } else if (game.state == WegaState.READY) {
      _playWega(escrowHash, _players[escrowHash].values(), game.minRounds, game.denom);
      _games[escrowHash].state = WegaState.PLAYED;
    }    
  } 


  function _playWega(
    bytes32 escrowHash, 
    address[] memory players,
    uint256 rounds,
    uint256 denominator
  ) internal {
    
    _playChanceGame(escrowHash, players, denominator, 1, rounds);
    address[] memory winners = _declareWinners(escrowHash, players);
    erc20Escrow.setWithdrawers(escrowHash, winners);
    emit WinnerDeclaration(escrowHash, winners);
  }

  function _playChanceGame(
    bytes32 escrowHash,
    address[] memory players,
    uint256 denominator,
    uint256 currentRound,
    uint256 minimumRounds
  ) private returns (uint) {
    
    if(currentRound > minimumRounds) {
      return 1;
    }
    
    // add the results for the round
    uint256[] memory results = new uint256[](players.length);
    for (uint256 i = 0; i < players.length; i++) { 
      uint256 result = _chanceContract.roll(denominator, _nonce.current(), players[i]);
      _gameResults[escrowHash][players[i]].set(currentRound, result);
      _nonce.increment();
    }
    _addPoints(escrowHash, players, results);
    return _playChanceGame(escrowHash, players, denominator, currentRound + 1, minimumRounds);
  }

  function _getHighestScore(bytes32 escrowHash, address[] memory players) internal view returns(uint256) {
    uint256[] memory playerPoints = new uint256[](players.length);
    for(uint256 i = 0; i < players.length; i++) { 
      playerPoints[i] = _playerPoints[escrowHash][players[i]];    
    }
    return playerPoints.findMax();
  }
  
  function _declareWinners(bytes32 escrowHash, address[] memory players) internal returns (address[] memory) {
    uint256 highestScore = _getHighestScore(escrowHash, players);
    for(uint256 i = 0; i < players.length; i++) {
      if(_playerPoints[escrowHash][players[i]] == highestScore){
        _winners[escrowHash].add(players[i]);
      }
    }
    return _winners[escrowHash].values();
  }
  
  function _addPoints(
    bytes32 escrowHash, 
    address[] memory players, 
    uint256[] memory results
  ) internal {
    uint256 max = results.findMax();
    for(uint256 i = 0; i < players.length; i++) {
      if(results[i] == max){
        _playerPoints[escrowHash][players[i]]++;
      }
    }
  }
}