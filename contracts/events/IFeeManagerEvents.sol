// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface IFeeManagerEvents {
 event SetFeeRule(address indexed feeApplier, address indexed feeTaker, uint256 feeShare);
}