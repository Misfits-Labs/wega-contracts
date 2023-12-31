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
  uint256 deposited;
  WegaState state;
 }
 
 /**
  * @notice returns winners of a game
  * @param escrowHash id of the escrow
  */
 function winners(bytes32 escrowHash) external view returns (address[] memory);

 /**
  * @notice returns reesults of players of a game
  * @param escrowHash id of the escrow
  * @param player player address
 */
 function playerResults(bytes32 escrowHash, address player) external view returns (uint256[] memory);
 /**
  * @notice returns results of players of a game
  * @param escrowHash id of the escrow
  * @param players player addresseses
 */
 function multiplePlayersResults(bytes32 escrowHash, address[] memory players) external view returns (uint256[][] memory results);

 /**
  * @notice returns player points for a game
  * @param escrowHash id of the escrow
  * @param player player to retrieve points of
 */
 function playerScore(bytes32 escrowHash, address player) external view returns(uint256);

 /**
  * @notice returns the address of the random number contract
 */
 function randomNumbersContract() external view returns(address);
}