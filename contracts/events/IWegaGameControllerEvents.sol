// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import '../games/IWega.sol';

interface IWegaGameControllerEvents {
 event GameCreation(bytes32 indexed escrowHash, address creator, string name);
 event WinnerDeclaration(bytes32 indexed escrowHash, address[] indexed winners);
 event MinRoundsSet(string game, uint256 oldMinRounds, uint256 newMinRounds);
 event DenominatorSet(string game, uint256 oldDenominator, uint256 newDenominator);
 event RequiredPlayersSet(string game, uint256 requiredPlayersOld, uint256 requiredPlayersNew);
 event GameRegistration(string name, address gameAddress);
}