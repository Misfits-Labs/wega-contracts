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
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Nonces.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import 'hardhat/console.sol';
import "./IWegaRandomizer.sol";


contract WegaRandomizer is IWegaRandomizer, Ownable, Nonces {

  using EnumerableMap for EnumerableMap.UintToUintMap;
  using Math for uint256;
  
  EnumerableMap.UintToUintMap private _randomNumbers;
 
  constructor(uint256[] memory randomNumbers) Ownable(_msgSender()) {
    _seed(randomNumbers);
  }
 
  function retrieve() public view returns (uint256){
    uint256 count = _randomNumbers.length();
    uint256 randomIndex = uint256(keccak256(abi.encodePacked(
      tx.origin,
      blockhash(block.number - nonces(owner())),
      block.timestamp,
      block.prevrandao,
      uint256(uint160(address(this))) + nonces(owner())
    ))) % count;
    return _randomNumbers.get(randomIndex); 
  }

  function randomNumbersCount() public view override returns (uint256) {
    return _randomNumbers.length();
  }

  function seed(uint256[] memory randomNumbers) public override onlyOwner {
    _seed(randomNumbers);
  }

  function useOwnerNonce() onlyOwner external override returns (uint256) {
   return _useNonce(owner());
  } 
  
  function _seed(uint256[] memory randomNumbers) internal {
    for(uint256 i = _randomNumbers.length(); i < randomNumbers.length;i++) {
      if(!_randomNumbers.contains(randomNumbers[i])) {
        _randomNumbers.set(i, randomNumbers[i]);
      }
    }
  }
  
}