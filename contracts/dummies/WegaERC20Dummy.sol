// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WegaERC20Dummy is ERC20, Ownable {
  constructor(address[] memory receivers) ERC20("WegaERC20Dummy", "DUMMY") Ownable(_msgSender()) {
    for(uint256 i = 0; i < receivers.length; i++){
      _mint(receivers[i], 10000 * 10 ** 18);
    }
  }
  function mint(address to, uint256 amount) public onlyOwner {
      _mint(to, amount);
  }
}
