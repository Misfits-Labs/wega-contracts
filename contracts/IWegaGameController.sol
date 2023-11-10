// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "./games/IWega.sol";

interface IWegaGameController {

  struct GameSettings {
    uint256 denominator;
    uint256 minRounds;
    uint256 requiredPlayers;
    address proxy;
    address randomNumberController;
    string name;
  }
  /**
  * @notice allows a player to create a dice or coinflip game  
  * @param name name of the address
  * @param tokenAddress tokenAddress to be used in the game
  * @param wagerAmount the minimum number of rounds in a game
  */
  function createGame(
    string memory name,
    address tokenAddress,  
    uint256 wagerAmount,
    uint256[] memory randomNumbers
  ) external;

  /**
   * @notice allows a player to trigger dice game or deploy if the game is not ready  
   * @param escrowHash address of the contract that holds the funds for a game
   * @param randomNumbers preseeded randomNumbers
  */
  function depositOrPlay(bytes32 escrowHash, uint256[] memory randomNumbers) external;

  /**
   * @notice allows a player to trigger coinflip game or deploy if the game is not ready  
   * @param escrowHash address of the contract that holds the funds for a game
   * @param playerChoices choices for coinflip
   * @param randomNumbers preseeded randomNumbers
  */
  function depositOrPlay(bytes32 escrowHash, uint256[] memory playerChoices, uint256[] memory randomNumbers) external;

  /**
   * @notice returns winners of a game
   * @param game name of the game
   * @param escrowHash id of the escrow
   */
  function winners(string memory game, bytes32 escrowHash) external returns (address[] memory);

  /**
   * @notice returns players of a game
   * @param escrowHash id of the escrow
   */
  function players(bytes32 escrowHash) external returns (address[] memory);

  /**
   * @notice returns a game
   * @param escrowHash id of the escrow
   */
  function getGame(bytes32 escrowHash) external returns(IWega.Wega memory);
  
  /**
   * @notice returns game result for player of game
   * @param game name of the game
   * @param escrowHash id of the escrow
   * @param player player to retrieve results of
   */
  function gameResults(
    string memory game, 
    bytes32 escrowHash, 
    address player
  ) external returns(uint256[] memory);
 
  /**
   * @notice returns player points for a game
   * @param game name of the game
   * @param escrowHash id of the escrow
   * @param player player to retrieve points of
  */
  function playerScore(
    string memory game, 
    bytes32 escrowHash, 
    address player
  ) external returns(uint256);
  
  /**
   * @notice configures a registered game
   * @param config name of the game to register
  */
  function setGameConfiguration(GameSettings memory config) external;

  /**
   * @notice registers a playable game on the wega protocol
   * @param config name of the game to register
  */
  function registerGame(GameSettings memory config) external;

  /**
   * @notice returns player points for a game
   * @param game name of the game to register
  */
  function removeGame(string memory game) external;
  
  /**
   * @notice returns wether a game is already registered 
   * @param game name of the game to register
  */
  function existsGame(string memory game) external returns (bool exists);
}