// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IGameController {
 /**
 * @notice allows a player to trigger a two-way chance game  
 * @param escrowHash address of the contract that holds the funds for a game
 * @param players the players of the game
 * @param rounds the minimum number of rounds in a game
 * @param denominator the roll posibilities
 */
 function playTwoWayChanceGame(
    bytes32 escrowHash, 
    address[] memory players,
    uint256 rounds,
    uint256 denominator
  ) external;
}