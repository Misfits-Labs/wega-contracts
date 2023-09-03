// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

abstract contract WegaEscrowErrors {
 string constant INVALID_REQUEST_DATA = "WegaEscrow: InvalidRequestData";
 string constant INVALID_REQUEST_STATE = "WegaEscrow: InvalidRequestState";
 string constant MAX_WAGER_REACHED = "WegaEscrow: MaximumWagerAmountReached";
 string constant INVALID_DEPOSIT_CALL = "WegaEscrow: CanOnlyDepositOnce";
 string constant INVALID_WAGER_AMOUNT = "WegaEscrow: InvalidWagerAmount";
 string constant CALLER_NOT_ALLOWED = "WegaEscrow: CallerNotAllowed";
 string constant INVALID_WITHDRAW_BALANCE = "WegaEscrow: InsufficientBalance";
}