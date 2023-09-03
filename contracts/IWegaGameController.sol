// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "./IWega.sol";

interface IWegaGameController {
  /**
  * @notice allows a player to trigger a two-way chance game  
  * @param tokenAddress tokenAddress to be used in the game
  * @param requiredPlayerNum the players of the game
  * @param wagerAmount the minimum number of rounds in a game
  */
  function createGameAndDepositInitialWager(
    address tokenAddress,  
    uint256 requiredPlayerNum, 
    uint256 wagerAmount,
    IWega.WegaType gameType
  ) external;

  /**
   * @notice allows a player to trigger a two-way chance game or deploy if the game is not ready  
   * @param escrowHash address of the contract that holds the funds for a game
  */
  function depositOrPlay(bytes32 escrowHash) external;
}