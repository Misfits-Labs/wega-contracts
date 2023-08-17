// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "./IEscrow.sol";

interface IWegaERC20Escrow {
 
 struct ERC20WagerRequest {
  IEscrow.TransactionState state; // state transaction state
  bytes32 escrowId;
  uint256 wager; // total amount that should be escrowed (have that multiplied by by accounts)
  address token;
  address[] accounts;
  uint256 nonce;
 }

 /**
 * @notice create wager request
 * @param token address of the nft to trade
 * @param account tokenId of the nft to trade
 * @param deposit amount the user will deposit
 * @param wager amount that should be totaled for all users 
 * @dev caller is game controller and at this point should be approved to transfer tokens 
 **/
 function createWagerAndDeposit(
  address token,  
  address account,
  uint256 deposit,
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
 * @param wager total amount to be held
 * @param nonce owner of nft to trade against
 */
 function hash(
  address token,
  address creator,
  uint256 wager,
  uint256 nonce
 ) external view returns (bytes32 escrowId_);

 /**
 * @notice retrieves the current escrow nonce
 */
 function currentNonce() external view returns (uint256);

 /**
 * @notice retrieves all erc20 wager requests in existance
 */
 function getWagerRequests() external view returns (ERC20WagerRequest[] memory);

 /**
 * @notice retrieves a erc20 wager requests
 * @param escrowId id of the wager request
 */
 function getWagerRequest(bytes32 escrowId) external view returns (ERC20WagerRequest memory);
}