// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IWegaRandomNumberController {

 /**
 * @notice this method calculates rollValue
 * @param denominator the posibilities that can be rolled
 * @param nonce arbitrary number
 */
 function generate(uint256 denominator, uint256 nonce) external returns(uint256);

 /**
 * @notice returns the current length of randomnumbers set
 */
 function randomNumbersCount() external view returns (uint256);

 /**
  * @notice adds random numbers from a source to the random number set
  * @param randomNumbers the randomnumber that should be added
 */
 function addRandomNumbers(uint256[] memory randomNumbers) external;
 /**
  * @notice adds random numbers from a source to the random number set
  * @param randomNumbers the randomnumber that should be added
 */
 function seedRandomizer(uint256[] memory randomNumbers) external;
}