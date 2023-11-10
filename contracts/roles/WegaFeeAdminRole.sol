// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import '../errors/AccessControlErrors.sol';

/**
  * @title WegaFeeAdminRole
  * @author @RasenGUY @Daosourced.
  * @notice Access control for wega fee manager
*/

abstract contract  WegaFeeAdminRole is OwnableUpgradeable, AccessControlErrors, AccessControlUpgradeable {
    
    bytes32 public constant WEGA_FEE_MANAGER_ROLE = keccak256('WEGA_FEE_MANAGER_ROLE');

    modifier onlyWegaFeeAdmin() {
        require(isWegaFeeAdmin(_msgSender()), CALLER_NOT_ALLOWED);
        _;
    }

    // solhint-disable-next-line func-name-mixedcase
    function __WegaFeeAdminRole_init() internal onlyInitializing {
        __Ownable_init(); // set the msgSender as owner
        __AccessControl_init(); // also make the owner a controller ADMIN
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setRoleAdmin(WEGA_FEE_MANAGER_ROLE, DEFAULT_ADMIN_ROLE);
    }

    function transferOwnership(address newOwner) public virtual override onlyOwner {
        super.transferOwnership(newOwner);
        _grantRole(DEFAULT_ADMIN_ROLE, newOwner); // give the new owner the default admin role
        renounceRole(DEFAULT_ADMIN_ROLE, _msgSender()); // remove the default admin role from previous owner
    }

    /**
    * @notice checks whether an account has the CONTROLLER ADMIN ROLE
    * @param account address that presumable has or doesn't have the controller admin role
    */
    function isWegaFeeAdmin(address account) public view returns (bool) {
        return hasRole(WEGA_FEE_MANAGER_ROLE, account);  
    }

    /**
    * @notice adds the controller admin role to an account
    * @param account the account that will receive the controller admin role
    */
    function addWegaFeeAdmin(address account) public onlyOwner {
        _addWegaFeeAdmin(account);
    }

    /**
    * @notice adds the controller admin role to multiple accounts
    * @param accounts the accounts that will receive the controller admin role
    */
    function addWegaFeeAdmins(address[] memory accounts) public onlyOwner {
        for (uint256 index = 0; index < accounts.length; index++) {
            _addWegaFeeAdmin(accounts[index]);
        }
    }

    /**
    * @notice removes the controller admin role from an account
    * @param account account of which the controller admin role will be revoked
    */
    function removeWegaFeeAdmin(address account) public onlyOwner {
        _removeWegaFeeAdmin(account);
    }

    /**
    * @notice removes the controller admin role from multiple accounts
    * @param accounts accounts of which the controller admin role will be revoked
    */
    function removeWegaFeeAdmins(address[] memory accounts) public onlyOwner {
        for (uint256 index = 0; index < accounts.length; index++) {
            _removeWegaFeeAdmin(accounts[index]);
        }
    }

    /**
    * @notice allows a caller to revoke the controller admin role
    */
    function renounceWegaFeeAdmin() public {
        renounceRole(WEGA_FEE_MANAGER_ROLE, _msgSender());
    }

    /**
    * @notice minter account with funds' forwarding
    */
    function closeWegaFeeAdmin(address payable receiver) external payable onlyWegaFeeAdmin {
        require(receiver != address(0x0), EMPT_RECEIVER);
        renounceWegaFeeAdmin();
        receiver.transfer(msg.value);
    }

    /**
    * @notice Replace minter account by new account with funds' forwarding
    */
    function rotateWegaFeeAdmin(address payable receiver) external payable onlyWegaFeeAdmin {
        require(receiver != address(0x0), EMPT_RECEIVER);
        _addWegaFeeAdmin(receiver);
        renounceWegaFeeAdmin();
        receiver.transfer(msg.value);
    }

    function _addWegaFeeAdmin(address account) internal {
        _grantRole(WEGA_FEE_MANAGER_ROLE, account);
    }

    function _removeWegaFeeAdmin(address account) internal {
        revokeRole(WEGA_FEE_MANAGER_ROLE, account);
    }
}
