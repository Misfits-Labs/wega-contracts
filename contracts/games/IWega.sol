// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "./IWegaCoinFlipGame.sol";
import "./IWegaDiceGame.sol";
interface IWega is IWegaDiceGame, IWegaCoinFlipGame {
 
 enum WegaType { DICE, COINFLIP }
 
 enum WegaState { WAITING, PLAYED }
 
 struct Wega {
  string name;
  address[] currentPlayers;
  WegaState state;
 }
 
 /**
  * @notice returns winners of a game
  * @param escrowHash id of the escrow
  */
 function winners(bytes32 escrowHash) external returns (address[] memory);

 /**
  * @notice returns players of a game
  * @param escrowHash id of the escrow
  * @param player player address
 */
 function playerResults(bytes32 escrowHash, address player) external returns (uint256[] memory);

 /**
  * @notice returns player points for a game
  * @param escrowHash id of the escrow
  * @param player player to retrieve points of
 */
 function playerScore(bytes32 escrowHash, address player) external returns(uint256);

 /**
  * @notice returns the address of the random number contract
 */
 function randomNumbersContract() external returns(address);
}