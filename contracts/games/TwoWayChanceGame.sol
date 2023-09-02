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
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

import "../escrow/WegaERC20Escrow.sol";
import "./ITwoWayChanceGame.sol";

import { 
    WegaEscrow_CallerNotApproved
} from '../errors/EscrowErrors.sol';

contract TwoWayChanceGame is ITwoWayChanceGame, ERC2771Context {

 using EnumerableMap for EnumerableMap.UintToUintMap;

 EnumerableMap.UintToUintMap private _randomNumbers;

 constructor (uint256[] memory randomNumbers) ERC2771Context(address(0)) {
  addRandomNumbers(randomNumbers);
 }

 // roll function
 function roll(
  uint256 denominator, 
  uint256 nonce, 
  address player
  ) external view override returns(uint256) {
  uint256 randomNumber = _retrieveRandomNumber(nonce, player);
  uint256 result = (randomNumber % denominator) + 1; 
  return result;
 }

 function _retrieveRandomNumber(
  uint256 nonce, 
  address player
  ) internal view returns (uint256){
  uint256 count = _randomNumbers.length();
  uint256 index = (block.prevrandao + uint256(uint160(player)) * (nonce + block.timestamp)) % count;
  return _randomNumbers.get(index); 
 }

 function randomNumbersCount() external view override returns (uint256) {
  return _randomNumbers.length();
 }

 function addRandomNumbers(uint256[] memory randomNumbers) public override {
  for(uint256 i = _randomNumbers.length(); i<randomNumbers.length;i++) {
   _randomNumbers.set(i, randomNumbers[i]);
  }
 }
}