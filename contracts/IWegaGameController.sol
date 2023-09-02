// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface IWegaGameController {
  
  enum WegaType { TOKEN, NFT }

  /**
  * @notice allows a player to trigger a two-way chance game  
  * @param tokenAddress tokenAddress to be used in the game
  * @param requiredPlayerNum the players of the game
  * @param wagerAmount the minimum number of rounds in a game
  */
  function createGameAndDepositInitialWager(
    address tokenAddress,  
    uint256 requiredPlayerNum, 
    uint256 wagerAmount
  ) external;

  /**
   * @notice allows a player to trigger a two-way chance game  
   * @param escrowHash address of the contract that holds the funds for a game
   * @param rounds the minimum number of rounds in a game
   * @param denominator the roll posibilities
   */
  function depositOrPlay(
    bytes32 escrowHash, 
    uint256 rounds,
    uint256 denominator
  ) external;
}