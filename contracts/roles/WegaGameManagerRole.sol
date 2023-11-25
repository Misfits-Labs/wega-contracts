// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import '../errors/AccessControlErrors.sol';

/**
  * @title WegaGameManagerRole
  * @author @RasenGUY @Daosourced.
  * @notice Access control for wega game contract
*/
abstract contract  WegaGameManagerRole is OwnableUpgradeable, AccessControlErrors, AccessControlUpgradeable {
    
    bytes32 public constant WEGA_GAME_MANAGER_ROLE = keccak256('WEGA_GAME_MANAGER_ROLE');

    modifier onlyWegaGameManager() {
        require(isWegaGameManager(_msgSender()), CALLER_NOT_ALLOWED);
        _;
    }

    // solhint-disable-next-line func-name-mixedcase
    function __WegaGameManagerRole_init() internal onlyInitializing {
        __Ownable_init(_msgSender()); // set the msgSender as owner
        __AccessControl_init(); // also make the owner a controller ADMIN
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setRoleAdmin(WEGA_GAME_MANAGER_ROLE, DEFAULT_ADMIN_ROLE);
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
    function isWegaGameManager(address account) public view returns (bool) {
        return hasRole(WEGA_GAME_MANAGER_ROLE, account);  
    }

    /**
    * @notice adds the controller admin role to an account
    * @param account the account that will receive the controller admin role
    */
    function addWegaGameManager(address account) public onlyOwner {
        _addWegaGameManager(account);
    }

    /**
    * @notice adds the controller admin role to multiple accounts
    * @param accounts the accounts that will receive the controller admin role
    */
    function addWegaGameManagers(address[] memory accounts) public onlyOwner {
        for (uint256 index = 0; index < accounts.length; index++) {
            _addWegaGameManager(accounts[index]);
        }
    }

    /**
    * @notice removes the controller admin role from an account
    * @param account account of which the controller admin role will be revoked
    */
    function removeWegaGameManager(address account) public onlyOwner {
        _removeWegaGameManager(account);
    }

    /**
    * @notice removes the controller admin role from multiple accounts
    * @param accounts accounts of which the controller admin role will be revoked
    */
    function removeWegaGameManagers(address[] memory accounts) public onlyOwner {
        for (uint256 index = 0; index < accounts.length; index++) {
            _removeWegaGameManager(accounts[index]);
        }
    }

    /**
    * @notice allows a caller to revoke the controller admin role
    */
    function renounceWegaGameManager() public {
        renounceRole(WEGA_GAME_MANAGER_ROLE, _msgSender());
    }

    /**
    * @notice minter account with funds' forwarding
    */
    function closeWegaGameManager(address payable receiver) external payable onlyWegaGameManager {
        require(receiver != address(0x0), EMPT_RECEIVER);
        renounceWegaGameManager();
        receiver.transfer(msg.value);
    }

    /**
    * @notice Replace minter account by new account with funds' forwarding
    */
    function rotateWegaGameManager(address payable receiver) external payable onlyWegaGameManager {        
        require(receiver != address(0x0), EMPT_RECEIVER);
        _addWegaGameManager(receiver);
        renounceWegaGameManager();
        receiver.transfer(msg.value);
    }

    function _addWegaGameManager(address account) internal {
        _grantRole(WEGA_GAME_MANAGER_ROLE, account);
    }

    function _removeWegaGameManager(address account) internal {
        revokeRole(WEGA_GAME_MANAGER_ROLE, account);
    }
}
