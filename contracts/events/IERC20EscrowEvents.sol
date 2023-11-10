// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC20EscrowEvents {
    event WagerRequestCreation(bytes32 indexed escrowId, address indexed token, address indexed creator, uint256 wager);
    event WagerDeposit(bytes32 indexed escrowId, uint256 indexed wager, address indexed player);
    event SetWithdrawers(bytes32 indexed escrowId, address[] indexed withdrawers);
    event SetGameControler(address indexed gameController);
    event WagerWithdrawal(bytes32 indexed escrowHash, uint256 indexed transferAmount, address indexed winner);
    event ApplyFees(bool indexed areFeesApplied);
    event SetFeeManager(address indexed feeManager);
}