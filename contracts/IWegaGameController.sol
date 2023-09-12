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
    uint256 wagerAmount
  ) external;

  /**
   * @notice allows a player to trigger dice game or deploy if the game is not ready  
   * @param escrowHash address of the contract that holds the funds for a game
  */
  function depositOrPlay(bytes32 escrowHash) external;

  /**
   * @notice allows a player to trigger coinflip game or deploy if the game is not ready  
   * @param escrowHash address of the contract that holds the funds for a game
   * @param playerChoices choices for coinflip
  */
  function depositOrPlay(bytes32 escrowHash, uint256[] memory playerChoices) external;

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
   * @notice sets the minimum required playrounds of a wega game
   * @param game name of the game to register
   * @param newMinRounds player to retrieve points of
  */
  function setMinRounds(string memory game, uint256 newMinRounds) external;

  /**
   * @notice sets the denominator of a wega game
   * @param game name of the game to register
   * @param denominator denominator to set the game to
  */
  function setDenominator(string memory game, uint256 denominator) external;

  /**
   * @notice sets the number of required players of a wega
   * @param game name of the game to register
   * @param requiredPlayers denominator to set the game to
  */
  function setRequiredPlayers(string memory game, uint256 requiredPlayers) external;
  
  /**
   * @notice returns player points for a game
   * @param game name of the game to register
   * @param gameAddress contract address of the game 
   * @param denominator to be used in randomnum generation
   * @param minRounds minimum amount of rounds to play
   * @param requiredPlayers minimum amount of players to play
  */
  function registerGame(
    string memory game,
    address gameAddress,
    uint256 denominator, 
    uint256 minRounds,
    uint256 requiredPlayers
  ) external;

  /**
   * @notice returns player points for a game
   * @param game name of the game to register
  */
  function removeGame(string memory game) external;
}