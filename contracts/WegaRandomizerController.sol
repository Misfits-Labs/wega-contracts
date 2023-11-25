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

import "./IWegaRandomizerController.sol";
import "./errors/AccessControlErrors.sol";
import "./roles/WegaProtocolAdminRole.sol";
import "./randomizer/IWegaRandomizer.sol";
import "./randomizer/WegaRandomizer.sol";


contract WegaRandomizerController is AccessControlErrors, WegaProtocolAdminRole, UUPSUpgradeable, IWegaRandomizerController {

  using EnumerableMapUpgradeable for EnumerableMapUpgradeable.UintToUintMap;
  using Math for uint256;
  using CountersUpgradeable for CountersUpgradeable.Counter;
  
  address public RANDOMIZER; 
  bytes32 public constant GAME_CONTROLLER_ROLE = keccak256('GAME_CONTROLLER_ROLE');
  bytes32 public constant GAME_ROLE = keccak256('GAME_ROLE');

  modifier onlyGameOrGameController {
    require(hasRole(GAME_CONTROLLER_ROLE, _msgSender()) || hasRole(GAME_ROLE, _msgSender()), CALLER_NOT_ALLOWED);
    _;
  }

  function initialize(uint256[] memory randomNumbers) initializer public {
    __UUPSUpgradeable_init();
    __WegaProtocolAdminRole_init();
    __WegaRandomNumberController_init(randomNumbers);
  }

  function __WegaRandomNumberController_init(uint256[] memory randomNumbers) internal onlyInitializing {
    _setRoleAdmin(GAME_CONTROLLER_ROLE, WEGA_PROTOCOL_ADMIN_ROLE);
    _setRoleAdmin(GAME_ROLE, WEGA_PROTOCOL_ADMIN_ROLE);
    __WegaRandomNumberController_init_unchained(randomNumbers);
  } 

  function __WegaRandomNumberController_init_unchained(uint256[] memory randomNumbers) internal onlyInitializing {
   _spawnRandomizer(randomNumbers);
  } 

  function generate(uint256 denominator) public view override returns(uint256) {
    uint256 randomNumber = getRandomizer().retrieve();
    uint256 result = (randomNumber % denominator) + 1;
    return result;
  }

  function seedRandomizer(uint256[] memory randomNumbers) public override onlyRole(GAME_CONTROLLER_ROLE) {
    getRandomizer().seed(randomNumbers);
  }
  
  function incrementControllerNonce() public override onlyGameOrGameController {
    getRandomizer().useOwnerNonce();
  }

  function _authorizeUpgrade(address newImplementation) internal onlyOwner override {}

  function getRandomizer() public view returns (IWegaRandomizer randomizer){
    randomizer = IWegaRandomizer(RANDOMIZER);
  }

  function setRandomizer(address randomizer) public onlyWegaProtocolAdmin {
    _setRandomizer(randomizer);
  } 
  
  function _setRandomizer(address randomizer) internal {
    RANDOMIZER = randomizer;
    emit RandomizerSet(RANDOMIZER);
  }

  function spawnRandomizer(uint256[] memory randomNumbers) public onlyWegaProtocolAdmin {
    _spawnRandomizer(randomNumbers);
  }

  function _spawnRandomizer(uint256[] memory randomNumbers) internal {
    WegaRandomizer randomizer = new WegaRandomizer(randomNumbers);
    RANDOMIZER = address(randomizer);
    emit RandomizerSet(RANDOMIZER);
  }
}