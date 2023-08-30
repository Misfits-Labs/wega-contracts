// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IGameControllerEvents {
 event DeclareWinner(bytes32 indexed escrowId, address winner);
}