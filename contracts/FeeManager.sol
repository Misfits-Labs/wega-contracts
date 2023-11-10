// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "hardhat/console.sol";

import "./escrow/IWegaERC20Escrow.sol";
import "./escrow/IEscrow.sol";
import "./roles/WegaProtocolAdminRole.sol";
import "./events/IFeeManagerEvents.sol";
import "./IFeeManager.sol";
import "./utils/Distribution.sol";
import "./games/IWega.sol";

import 'hardhat/console.sol';

/**
  * @title GameController (MVP)
  * @author @RasenGUY @Daosourced.
  * Fee manager contract that handles the attribution of fees 
*/

contract FeeManager is WegaProtocolAdminRole, IFeeManager, IFeeManagerEvents, UUPSUpgradeable {

  using Distribution for uint256;
  
  /**@notice fee applier to feeRule */  
  mapping(address => FeeConfig) public _feeRules;
  
  function initialize() public initializer {
    __FeeManager_init();
  }
  
  function __FeeManager_init() internal onlyInitializing  {
    __FeeManager_init_unchained();
    __WegaProtocolAdminRole_init();
  }

  function __FeeManager_init_unchained() internal onlyInitializing  {}

  function _setFeeConfig(address applier, FeeConfig memory config) internal {
   _feeRules[applier] = config;
   emit SetFeeRule(applier, config.feeTaker, config.feeShare); 
  }

  function setFeeConfigs(address[] memory appliers, FeeConfig[] memory configs) external onlyWegaProtocolAdmin {
    for(uint i = 0; i < appliers.length; i++) {
     _setFeeConfig(appliers[i], configs[i]);
    }  
  }

  function calculateFeesForTransfer(
    address applier, 
    uint256 transferAmount
  ) external view override returns (
    address feeTaker, 
    uint256 feeAmount, 
    uint256 sendAmount
  ) {
   FeeConfig memory config = getFeeRule(applier);
   feeAmount = transferAmount.calculateShare(config.feeShare);
   feeTaker = config.feeTaker;
   sendAmount = transferAmount - feeAmount;
  }

  function shouldApplyFees(address applier) public view override returns (bool shouldApply) {
   return getFeeRule(applier).shouldApply;
  }

  function getFeeRule(address applier) public view returns (FeeConfig memory feeRule) { 
   feeRule = _feeRules[applier];
  }

  function _authorizeUpgrade(address newImplementation) internal onlyOwner override {}
}