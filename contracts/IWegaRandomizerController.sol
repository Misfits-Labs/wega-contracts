// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import './events/IWegaRandomizerControllerEvents.sol';

interface IWegaRandomizerController is IWegaRandomizerControllerEvents {
 /**
 * @notice this method calculates rollValue
 * @param denominator the posibilities that can be rolled
 */
 function generate(uint256 denominator) external returns(uint256);
 
 /**
 * @notice this method calculates rollValue
 * @param newRandomizer address of the new randomizer
 */
 function setRandomizer(address newRandomizer) external;

 /**
 * @notice seeds the randomizer with new random number values
 * @param randomNumbers randomnumbers to add
 */
 function seedRandomizer(uint256[] memory randomNumbers) external;

 /**
 * @notice increments the user nonce on the randomizer
 */
 function incrementControllerNonce() external;
}