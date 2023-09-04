// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
/**
  * @title TwoWayChanceContract (MVP)
  * @author @RasenGUY @Daosourced.
  *
  * The contract that handles the business logic for randomness game plays
  * The contract also takes in a list of random numbers from DRAND, this as a short-term solution 
  * just for poc but. Which will be replaced in next iterations with a proper implementation of DIA'
  * oracle implementation for random numbers
  * @dev note this is draft contract not meant to be used in production
*/
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";



import "../escrow/WegaERC20Escrow.sol";
import "./IWegaChanceGame.sol";
import "../roles/WegaGameManagerRole.sol";


contract WegaChanceGame is IWegaChanceGame, WegaGameManagerRole, UUPSUpgradeable {

  using EnumerableMap for EnumerableMap.UintToUintMap;
  using Math for uint256;
  EnumerableMap.UintToUintMap private _randomNumbers;


  function initialize(
    uint256[] memory randomNumbers
  ) initializer public {
      __UUPSUpgradeable_init();
    __WegaGameManagerRole_init();
    addWegaGameManager(owner());
    __WegaChanceGame_init(randomNumbers);
  }

  function __WegaChanceGame_init(uint256[] memory randomNumbers) public onlyInitializing {
    __WegaChanceGame_init_unchained(randomNumbers);
  } 

  function __WegaChanceGame_init_unchained(uint256[] memory randomNumbers) public onlyInitializing {
   addRandomNumbers(randomNumbers);
  } 

 // roll function
 function roll(
  uint256 denominator, 
  uint256 nonce 
  ) external view override onlyWegaGameManager returns(uint256) {
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

 function addRandomNumbers(uint256[] memory randomNumbers) public override onlyWegaGameManager {
    for(uint256 i = _randomNumbers.length(); i < randomNumbers.length;i++) {
      _randomNumbers.set(i, randomNumbers[i]);
    }
 }

  function _authorizeUpgrade(address newImplementation) internal onlyOwner override {}

}