// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// @notice request data must be valid 
error WegaEscrow_InvalidRequestData();

// @notice sender must be tokenIdOwner
error WegaEscrow_NotNftOwner(address sender);

// @notice request state must be valid
error WegaEscrow_InvalidRequestState();

// @notice only approved owner can deposit
error WegaEscrow_DepositorNotApproved();

// @notice only approved owner can deposit
error WegaEscrow_CallerNotApproved();
