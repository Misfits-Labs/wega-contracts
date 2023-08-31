// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


import "./escrow/IWegaERC20Escrow.sol";
import "./escrow/IEscrow.sol";
import "./events/IGameControllerEvents.sol";
import "./events/IERC20EscrowEvents.sol";
import "./IGameController.sol";
import "./games/ITwoWayChanceGame.sol";

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

contract GameController is 
  IGameController, 
  IGameControllerEvents,
  Ownable {

  using EnumerableMap for EnumerableMap.UintToUintMap;
  using Counters for Counters.Counter;


  IWegaERC20Escrow public erc20Escrow;

  mapping(bytes32 => mapping(address => EnumerableMap.UintToUintMap)) private _games;
  
  Counters.Counter private _nonce;

  ITwoWayChanceGame public chanceContract; 

  constructor(
    address erc20EscrowAddress,
    address game
  ) {
    erc20Escrow = IWegaERC20Escrow(erc20EscrowAddress);
    chanceContract = ITwoWayChanceGame(game);
    _nonce.increment();
  }
  
  function playTwoWayChanceGame(
    bytes32 escrowHash, 
    address[] memory players,
    uint256 rounds,
    uint256 denominator
  ) external {
    
    if(!erc20Escrow.containsPlayer(escrowHash, _msgSender())) revert WegaEscrow_CallerNotApproved();
    if(erc20Escrow.getWagerRequest(escrowHash).state != IEscrow.TransactionState.PENDING) revert WegaEscrow_InvalidState();

    uint256 p1Points = 0;
    uint256 p2Points = 0;
    uint256 minimumRounds = rounds;
    address winner; 
    
    // rolls player
    for(uint256 round = 1; round <= minimumRounds; round++) {

      uint256 resultP1 = chanceContract.roll(denominator, _nonce.current(), players[0]);
      _games[escrowHash][players[0]].set(round, resultP1);
      _nonce.increment();
      uint256 resultP2 = chanceContract.roll(denominator, _nonce.current(), players[1]);
      _games[escrowHash][players[1]].set(round, resultP2);
      _nonce.increment();

      if(resultP1 > resultP2) {
        p1Points++;
      } else if (resultP1 < resultP2) {
        p2Points++;
      } else {
        p1Points++;
        p2Points++;
      }

      if(round == minimumRounds && p1Points == p2Points) { // handle ties
        minimumRounds++;
        continue;
      } else {
        winner = p1Points > p2Points ? players[0] : players[1]; 
      }
    }

    erc20Escrow.setWithdrawer(escrowHash, winner);
    emit DeclareWinner(escrowHash, winner);
  }
}





 // user deposits
  // we need to do the following
   // create a game map it to escrow id
   // retrieve a random number for each round
    // modulo a random number for the round (block.prevrandao + address -> uint * counter) -> uint % totalAvailableRandomNumber 
    // get a winner based on the denom
    // store winner for a round - in a mapping of escrowHash -> player address -> (round number, rolled number)
    // declare the winner and store in escrow hash 

// game controller
 // map wager ids to game
 // map winner for wager id to game
 // get winner for a game
 // after a game is finished then set a winner on escrow
