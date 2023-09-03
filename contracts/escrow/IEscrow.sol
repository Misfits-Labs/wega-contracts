// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface IEscrow {
 
 enum TransactionState { OPEN, PENDING, READY, CLOSED }

 struct ERC20WagerRequest {
   TransactionState state;
   bytes32 escrowHash;
   uint256 wagerAmount;
   address tokenAddress;
   uint256 totalWager;
   uint256 nonce;
 }
}