// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import '../IWega.sol';

interface IWegaGameControllerEvents {
 event GameCreation(bytes32 indexed escrowHash, address creator, IWega.WegaGameType gameType);
 event WinnerDeclaration(bytes32 indexed escrowHash, address[] indexed winners);
}