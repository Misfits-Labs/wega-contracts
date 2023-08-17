// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC20EscrowEvents {
    event WagerRequestCreation(bytes32 indexed escrowId, address indexed token, address indexed creator, uint256 wager);
}