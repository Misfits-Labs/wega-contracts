// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface IWegaDiceGame {
 
 /**
  * @notice plays a wega dice game 
  * @param escrowHash wager hash
  * @param currentPlayers list of players currently playing the game
  * @param denominator the denominator
  * @param minRounds minimum number of rounds required for the game
 */
 function play(
   bytes32 escrowHash,
   address[] memory currentPlayers,
   uint256 denominator,
   uint256 minRounds
 ) external returns (address[] memory winners);
}