// @author Daosourced
// @date November 7 2023
pragma solidity ^0.8.14;
import "@openzeppelin/contracts/utils/math/Math.sol";

library Distribution { 
  using Math for uint256;

  /**
  * @notice calculates the distribution amount
  * @param totalAmount total amount
  * @param bps basis points
  */
  function calculateShare(
      uint256 totalAmount, 
      uint256 bps
  ) internal pure returns (uint256 share) {
      if (bps > 0) {
          share = totalAmount.mulDiv(bps, 10000);
      } else {
          share = 0;
      }
  }

  /**
  * @notice calculates the distribution amount
  * @param totalAmount total amount
  * @param amountToGetRatioOf basis points
  */
  function calculateRatio(
      uint256 totalAmount, 
      uint256 amountToGetRatioOf
  ) internal pure returns (uint256 share) {
      return amountToGetRatioOf.mulDiv(10000, totalAmount);
  }

  /**
  * @notice sums up the total  of numbers in a lis
  * @param numbers numbers in the list
  * @return total the sum of the numbers in list
  */
  function summation(uint256[] memory numbers) internal pure returns (uint256 total) {
      for(uint256 i = 0; i < numbers.length; i++){
          total += numbers[i]; 
      }
  }
}