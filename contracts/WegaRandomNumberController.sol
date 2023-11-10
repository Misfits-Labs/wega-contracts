// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
/**
  * @title RandomNumberController (MVP)
  * @author @RasenGUY @Daosourced.
  * The contract that handles the business logic for randomness in game, think of the injection of randomnumbers used for games
  * The contract also takes in a list of random numbers from DRAND, this as a short-term solution just for poc but. 
  * Which will be replaced in next iterations with a proper implementation of DIA'
  * oracle implementation for random numbers
  * @dev note this is draft contract not meant to be used in production
*/
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "./IWegaRandomNumberController.sol";
import "./roles/WegaProtocolAdminRole.sol";

contract WegaRandomNumberController is IWegaRandomNumberController, WegaProtocolAdminRole, UUPSUpgradeable {

  using EnumerableMapUpgradeable for EnumerableMapUpgradeable.UintToUintMap;
  using Math for uint256;
  using CountersUpgradeable for CountersUpgradeable.Counter;
  
  bytes32 public GAME_CONTROLLER_ROLE;
  CountersUpgradeable.Counter _nonce;
  EnumerableMapUpgradeable.UintToUintMap private _randomNumbers;

  function initialize(uint256[] memory randomNumbers) initializer public {
    __UUPSUpgradeable_init();
    __WegaProtocolAdminRole_init();
    __WegaRandomNumberController_init(randomNumbers);
  }

  function __WegaRandomNumberController_init(uint256[] memory randomNumbers) internal onlyInitializing {
    GAME_CONTROLLER_ROLE = keccak256('GAME_CONTROLLER_ROLE');
    _setRoleAdmin(GAME_CONTROLLER_ROLE, WEGA_PROTOCOL_ADMIN_ROLE);
    __WegaRandomNumberController_init_unchained(randomNumbers);
  } 

  function __WegaRandomNumberController_init_unchained(uint256[] memory randomNumbers) internal onlyInitializing {
   _seedRandomizer(randomNumbers);
   _nonce.increment();
  } 

  function generate(uint256 denominator, uint256 nonce) public view override returns(uint256) {
    uint256 randomNumber = _retrieveRandomNumber(nonce);
    uint256 result = (randomNumber % denominator) + 1;
    return result;
  }

  function _retrieveRandomNumber(uint256 nonce) internal view returns (uint256){
    uint256 count = _randomNumbers.length();
    uint256 randomIndex = uint256(keccak256(abi.encodePacked(
      tx.origin,
      blockhash(block.number - nonce),
      block.timestamp,
      block.prevrandao,
      nonce
    ))) % count;
    return _randomNumbers.get(randomIndex); 
  }

  function randomNumbersCount() public view override returns (uint256) {
    return _randomNumbers.length();
  }

  function addRandomNumbers(uint256[] memory randomNumbers) public override onlyRole(GAME_CONTROLLER_ROLE) {
    _seedRandomizer(randomNumbers);
  }

  function seedRandomizer(uint256[] memory randomNumbers) public override onlyWegaProtocolAdmin {
    _seedRandomizer(randomNumbers);
  }
  
  function _seedRandomizer(uint256[] memory randomNumbers) internal {
    for(uint256 i = _randomNumbers.length(); i < randomNumbers.length;i++) {
      if(!_randomNumbers.contains(randomNumbers[i])) {
        _randomNumbers.set(i, randomNumbers[i]);
      }
    }
  }

  function _authorizeUpgrade(address newImplementation) internal onlyOwner override {}
}