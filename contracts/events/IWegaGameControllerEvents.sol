// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import '../games/IWega.sol';

interface IWegaGameControllerEvents {
 event GameCreation(bytes32 indexed escrowHash, uint256 indexed nonce, address creator, string name);
 event WinnerDeclaration(bytes32 indexed escrowHash, address[] indexed winners);
 event GameRegistration(string name, address gameAddress);
 event SetGame(string name, uint256 denominator, uint256 minRounds, uint256 requiredPlayers, address proxy, address randomNumberController);
}