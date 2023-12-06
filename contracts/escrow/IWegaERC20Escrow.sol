// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "./IEscrow.sol";

interface IWegaERC20Escrow {
 
 /**
 * @notice create wager request
 * @param token address of the token to used for collatoral
 * @param creator addres of request creator
 * @param requiredAccountNum total amount that should be deposited into the escrow as sum of all wagers deposited  
 * @param wagerAmount amount the creator will deposit
 * @dev caller is game controller and at this point should be approved to transfer tokens 
 **/
 function createWagerRequest(
  address token,  
  address creator,
  uint256 requiredAccountNum,
  uint256 wagerAmount
 ) external returns (bytes32);

 /**
 * @notice deposit on existing wager request
 * @param escrowHash escrow Id
 * @param account account that will conduct the deposit
 * @param amount deposit amount
 * @dev caller is game controller and at this point should be approved to transfer tokens 
 **/
 function deposit(
  bytes32 escrowHash,
  address account,
  uint256 amount
 ) external;

 /**
 * @notice hashes request into a requestId
 * @param token wager token address
 * @param creator address of player 1
 * @param requiredAccountNum number of accounts served by wager request
 * @param wagerAmount amount deposited by creator to escrow
 * @param nonce owner of nft to trade against
 */
 function hash(
  address token,
  address creator,
  uint256 requiredAccountNum,
  uint256 wagerAmount,
  uint256 nonce
 ) external view returns (bytes32 escrowHash_);

 /**
 * @notice retrieves all erc20 wager requests in existance
 */
 function getWagerRequests() external view returns (IEscrow.ERC20WagerRequest[] memory);

 /**
 * @notice retrieves a erc20 wager requests
 * @param escrowHash id of the wager request
 */
 function getWagerRequest(bytes32 escrowHash) external view returns (IEscrow.ERC20WagerRequest memory);

 /**
 * @notice retrieves a erc20 wager deposit of a user
 * @param account escrow depositors' account
 * @param escrowHash id of the wager request
 */
 function depositOf(bytes32 escrowHash, address account) external returns (uint256);

 /**
 * @notice retrieves current total deposits on a wager
 * @param escrowHash id of the wager request
 */
 function wagerBalance(bytes32 escrowHash) external view returns (uint256);

 /**
 * @notice checks if a player is in the escrow 
 * @param escrowHash id of the wager request
 * @param player address of the player
 */
 function containsPlayer(bytes32 escrowHash, address player) external view returns (bool);

 /**
 * @notice sets the address that gets to withdraw the funds  
 * @param escrowHash id of the wager request
 * @param winners addresses of the winner
 */
 function setWithdrawers(bytes32 escrowHash, address[] memory winners) external;

 /**
 * @notice set fee manager
 * @param feeManager address of the fee manager
 */
 function setFeeManager(address feeManager) external;
 
 /**
 * @notice allows a winner to withdraw from a completed game
 * @param escrowHash allows a winner to withdraw from a completed game
 */
 function withdraw(bytes32 escrowHash) external; 
 
 /**
 * @notice retrieves the current escrow balance for of a account 
 * @param escrowHash the current escrow balance for of a account 
 * @param account the current escrow balance for of a account 
 */
 function getClaimAmount(bytes32 escrowHash, address account) external view returns (uint256 feeAmount, uint256 claimAmount);
}