// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.14;

// import './IRandomizer.sol';

// /**
//   * @title Randomizer (MVP)
//   * @author @RasenGUY @Daosourced.
//   * The contract that handles the business logic for randomness in game
//   * We use Randomizer.ai as the random number generator for most if not all games on wega platform
//   * Users can withdraw any left over fees from this contract if they have any through withdrawLeftOverFees() 
// */
// contract RandomNumberRequester {
//     IRandomizer public randomizer;
//     address public owner;
//     mapping(uint256 => bytes32) private requestToEscrowHash;
//     mapping(address => uint256) private balances;

//     event Requested(uint256 id, address requester);
//     event NumberRetrieved(uint256 id, uint256 randomNumber, address requester);
//     event BalanceWithdrawn(address user, uint256 amount);

//     constructor(address _randomizerAddress) {
//         randomizer = IRandomizer(_randomizerAddress);
//         owner = msg.sender;
//     }

//     modifier onlyOwner() {
//         require(msg.sender == owner, "Not owner");
//         _;
//     }

//     // Users call this function to request a random number.
//     function rollOnce() external payable {
//         uint256 id = randomizer.request(50000); // Example gas limit
//         requestToAddress[id] = msg.sender;
//         balances[msg.sender] += msg.value; // Track the user's balance
//         emit Requested(id, msg.sender);
//     }

//     // Randomizer calls this function to provide the random number.
//     function randomizerCallback(uint256 _id, bytes32 _value) external {
//         require(msg.sender == address(randomizer), "Unauthorized caller");
//         address user = requestToAddress[_id];
//         uint256 randomNumber = uint256(_value);
//         emit NumberRetrieved(_id, randomNumber, user);
//     }

//     // Users call this function to withdraw their balance (if any).
//     function withdrawBalance() external {
//         uint256 amount = balances[msg.sender];
//         require(amount > 0, "No balance to withdraw");
//         balances[msg.sender] = 0;
//         payable(msg.sender).transfer(amount);
//         emit BalanceWithdrawn(msg.sender, amount);
//     }

//     // Owner can withdraw funds from Randomizer.
//     function withdrawFundsFromRandomizer(uint256 amount) external onlyOwner {
//         randomizer.clientWithdrawTo(owner, amount);
//     }
// }