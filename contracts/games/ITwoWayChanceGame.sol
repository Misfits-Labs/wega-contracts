// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface ITwoWayChanceGame {

 /**
 * @notice this method calculates rollValue
 * @param denominator the posibilities that can be rolled 
 * @param nonce an arbitrary nonce value
 * @param player of the player that is throwing
 */
 function roll(uint256 denominator, uint256 nonce, address player) external returns(uint256);
}