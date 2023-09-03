// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @author @RasenGUY @Daosourced.
 */
library Arrays {
    
    using Math for uint256;

    function findMax(uint256[] memory values) internal pure returns (uint256 max) {
        for(uint256 i = 0; i < values.length; i++) {
            max = values[i].max(max);
        }
    }

    function hasDraw(uint256[] memory values) internal pure returns (bool) {
        uint256 max = findMax(values);
        for(uint256 i = 0; i < values.length; i++) {
            if(values[i] < max) {
                continue;
            } else {
                if(i != values.length - 1) {  
                    if(values[i] == values[i+1]) {
                        return true;
                    } else {
                       continue; 
                    }
                } 
            } 
        }
        return false;
    }
}    
