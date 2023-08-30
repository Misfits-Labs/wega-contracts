// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "./IEscrow.sol";

interface IWegaERC20Escrow {
 
 struct ERC20WagerRequest {
  IEscrow.TransactionState state;
  bytes32 escrowId;
  uint256 wager;
  address token;
  uint256 nonce;
  uint256 totalWager;
 }

 /**
 * @notice create wager request
 * @param token address of the token to used for collatoral
 * @param creator addres of request creator
 * @param accountsCount number of accounts in served by the request 
 * @param wager amount the creator will deposit
 * @dev caller is game controller and at this point should be approved to transfer tokens 
 **/
 function createWagerAndDeposit(
  address token,  
  address creator,
  uint256 accountsCount,
  uint256 wager
 ) external;

 /**
 * @notice deposit on existing wager
 * @param escrowId escrow Id
 * @param account account that will conduct the deposit
 * @param amount deposit amount
 * @dev caller is game controller and at this point should be approved to transfer tokens 
 **/
 // function deposit(
 //  bytes32 escrowId,
 //  address account,
 //  uint256 amount
 // ) external;

 /**
 * @notice hashes request into a requestId
 * @param token wager token address
 * @param creator address of player 1
 * @param accountsCount number of accounts served by wager request
 * @param wager amount deposited by creator to escrow
 * @param nonce owner of nft to trade against
 */
 function hash(
  address token,
  address creator,
  uint256 accountsCount,
  uint256 wager,
  uint256 nonce
 ) external view returns (bytes32 escrowId_);

 /**
 * @notice retrieves the current nonce of account that wants to create a wager
 * @param account is the account that will create the wager
 */
 function currentNonce(address account) external view returns (uint256);

 /**
 * @notice retrieves all erc20 wager requests in existance
 */
 function getWagerRequests() external view returns (ERC20WagerRequest[] memory);

 /**
 * @notice retrieves a erc20 wager requests
 * @param escrowId id of the wager request
 */
 function getWagerRequest(bytes32 escrowId) external view returns (ERC20WagerRequest memory);

 /**
 * @notice retrieves a erc20 wager deposit of a user
 * @param account escrow depositors' account
 * @param escrowId id of the wager request
 */
 function depositOf(bytes32 escrowId, address account) external returns (uint256);

 /**
 * @notice retrieves current total deposits on a wager
 * @param escrowId id of the wager request
 */
 function wagerBalance(bytes32 escrowId) external view returns (uint256);

 /**
 * @notice checks if a player is in the escrow 
 * @param escrowId id of the wager request
 * @param player address of the player
 */
 function containsPlayer(bytes32 escrowId, address player) external view returns (bool);

 /**
 * @notice sets the address that gets to withdraw the funds  
 * @param escrowId id of the wager request
 * @param winner address of the winner
 */
 function setWithdrawer(bytes32 escrowId, address winner) external;

 /**
 * @notice sets the address of the wega game controller contract  
 * @param gameController address of the new gameController
 */
 function setGameController(address gameController) external;
}