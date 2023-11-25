// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import '../errors/AccessControlErrors.sol';

/**
  * @title WegaProtocolAdminRole
  * @author @RasenGUY @Daosourced.
  * @notice Access control for wega escrow
*/

abstract contract  WegaProtocolAdminRole is OwnableUpgradeable, AccessControlErrors, AccessControlUpgradeable {
    
    bytes32 public constant WEGA_PROTOCOL_ADMIN_ROLE = keccak256('WEGA_PROTOCOL_ADMIN_ROLE');

    modifier onlyWegaProtocolAdmin() {
        require(isWegaProtocolAdmin(_msgSender()), CALLER_NOT_ALLOWED);
        _;
    }

    // solhint-disable-next-line func-name-mixedcase
    function __WegaProtocolAdminRole_init() internal onlyInitializing {
        __Ownable_init(_msgSender()); // set the msgSender as owner
        __AccessControl_init(); // also make the owner a controller ADMIN
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setRoleAdmin(WEGA_PROTOCOL_ADMIN_ROLE, DEFAULT_ADMIN_ROLE);
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
    function isWegaProtocolAdmin(address account) public view returns (bool) {
        return hasRole(WEGA_PROTOCOL_ADMIN_ROLE, account);  
    }

    /**
    * @notice adds the controller admin role to an account
    * @param account the account that will receive the controller admin role
    */
    function addWegaProtocolAdmin(address account) public onlyOwner {
        _addWegaProtocolAdmin(account);
    }

    /**
    * @notice adds the controller admin role to multiple accounts
    * @param accounts the accounts that will receive the controller admin role
    */
    function addWegaProtocolAdmins(address[] memory accounts) public onlyOwner {
        for (uint256 index = 0; index < accounts.length; index++) {
            _addWegaProtocolAdmin(accounts[index]);
        }
    }

    /**
    * @notice removes the controller admin role from an account
    * @param account account of which the controller admin role will be revoked
    */
    function removeWegaProtocolAdmin(address account) public onlyOwner {
        _removeWegaProtocolAdmin(account);
    }

    /**
    * @notice removes the controller admin role from multiple accounts
    * @param accounts accounts of which the controller admin role will be revoked
    */
    function removeWegaProtocolAdmins(address[] memory accounts) public onlyOwner {
        for (uint256 index = 0; index < accounts.length; index++) {
            _removeWegaProtocolAdmin(accounts[index]);
        }
    }

    /**
    * @notice allows a caller to revoke the controller admin role
    */
    function renounceWegaProtocolAdmin() public {
        renounceRole(WEGA_PROTOCOL_ADMIN_ROLE, _msgSender());
    }

    /**
    * @notice minter account with funds' forwarding
    */
    function closeWegaProtocolAdmin(address payable receiver) external payable onlyWegaProtocolAdmin {
        require(receiver != address(0x0), EMPT_RECEIVER);
        renounceWegaProtocolAdmin();
        receiver.transfer(msg.value);
    }

    /**
    * @notice Replace minter account by new account with funds' forwarding
    */
    function rotateWegaProtocolAdmin(address payable receiver) external payable onlyWegaProtocolAdmin {
        require(receiver != address(0x0), EMPT_RECEIVER);
        _addWegaProtocolAdmin(receiver);
        renounceWegaProtocolAdmin();
        receiver.transfer(msg.value);
    }

    function _addWegaProtocolAdmin(address account) internal {
        _grantRole(WEGA_PROTOCOL_ADMIN_ROLE, account);
    }

    function _removeWegaProtocolAdmin(address account) internal {
        revokeRole(WEGA_PROTOCOL_ADMIN_ROLE, account);
    }
}
