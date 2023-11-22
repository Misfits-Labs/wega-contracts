// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface IFeeManager {

  struct FeeConfig {
    address applier;
    address feeTaker;
    uint256 feeShare;
    bool shouldApply;
  }
  /**
  * @notice allows a player to create a dice or coinflip game  
  * @param applier address that will apply the fee
  * @param transferAmount transfaction amount of transfer actiuon
  */
  function calculateFeesForTransfer(address applier, uint256 transferAmount) external returns (address feeTaker, uint256 feeAmount, uint256 sendAmount);
  /**
  * @notice allows an admin to set fee rules  
  * @param configs fee rules to be applied
  */
  function setFeeConfigs(FeeConfig[] memory configs) external;
  /**
  * @notice returns configurations on a fee rule  
  * @param applier list of addresses that wil apply the fee
  */
  function getFeeRule(address applier) external view returns (FeeConfig memory feeRule); 
  /**
  * @notice returns wether the fee applier should apply the fee rule  
  * @param applier list of addresses that wil apply the fee
  */
  function shouldApplyFees(address applier) external view returns (bool shouldApply);
}