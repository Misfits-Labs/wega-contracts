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
import "./games/ITwoWayChanceGame.sol";
import "./utils/Arrays.sol";

import { 
    WegaEscrow_CallerNotApproved,
    WegaEscrow_InvalidState
} from './errors/EscrowErrors.sol';

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
  mapping(bytes32 => EnumerableSetUpgradeable.AddressSet) private _winners;
  mapping(bytes32 => EnumerableSetUpgradeable.AddressSet) private _players;
  mapping(bytes32 => mapping(address => uint256)) private _playerPoints;
  
  CountersUpgradeable.Counter private _nonce;

  ITwoWayChanceGame private _chanceContract; 

  function __WegaGameController_init(address erc20EscrowAddress, address chanceContract) public initializer {
    __Ownable_init();
    __WegaGameController_init_unchained(erc20EscrowAddress, chanceContract);
  } 

  function __WegaGameController_init_unchained(
    address erc20EscrowAddress, 
    address chanceContract
  ) public onlyInitializing {
    erc20Escrow = IWegaERC20Escrow(erc20EscrowAddress);
    _chanceContract = ITwoWayChanceGame(chanceContract);
    _nonce.increment();
  } 
  

  // should create wager and deposit wager into contract 
  function createGameAndDepositInitialWager(
    address tokenAddress,
    uint256 requiredPlayerNum, 
    uint256 wagerAmount,
    WegaGameType gameType
  ) public {
    bytes32 escrowHash = erc20Escrow.createWagerRequest(tokenAddress, _msgSender(), requiredPlayerNum, wagerAmount);
    _players[escrowHash].add(_msgSender());
    emit GameCreation(escrowHash, _msgSender(), gameType); 
  }

  // // should deposit to contract
  function depositOrPlay(
    bytes32 escrowHash, 
    uint256 rounds,
    uint256 denominator
  ){
    // erc20Escrow.state
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
  ) private pure returns (uint) {
    
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