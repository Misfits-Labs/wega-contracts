// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface IWegaRandomizer {

    /**
     * @notice returns the current length of randomnumbers set
     */
    function randomNumbersCount() external view returns (uint256);

    /**
     * @notice adds random numbers from a source to the random number set
     * @param randomNumbers the randomnumber that should be added
     */
    function seed(uint256[] memory randomNumbers) external;

    /**
    * @notice retrieves a random number based on the current owner nonce
    */
    function retrieve() external view returns(uint256);

    /**
    * @notice increments the nonce for the game controller
    */
    function useOwnerNonce() external  returns (uint256);
}