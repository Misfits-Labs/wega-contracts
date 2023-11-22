// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
/**
  * @title WegaCoinflipGame (MVP)
  * @author @RasenGUY @Daosourced.
  * @notice a simple decentralized onchain coinflip game
  * @dev note this is draft contract not meant to be used in production
*/
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "../escrow/WegaERC20Escrow.sol";
import "../roles/WegaGameManagerRole.sol";
import "../IWegaRandomNumberController.sol";
import "./Wega.sol";


contract WegaCoinFlipGame is Wega {

  using Arrays for uint256[];
  using CountersUpgradeable for CountersUpgradeable.Counter;

  function play( 
    bytes32 escrowHash,
    address[] memory currentPlayers,
    uint256[] memory playerChoices, 
    uint256 denominator,
    uint256 minRounds
  ) external override onlyRole(GAME_CONTROLLER_ROLE) returns (address[] memory winners) {
    _play(escrowHash, currentPlayers, playerChoices, denominator, 1, minRounds);
    winners = _declareWinners(escrowHash, currentPlayers); 
  }

  function _play(
    bytes32 escrowHash,
    address[] memory currentPlayers,
    uint256[] memory playerChoices,
    uint256 denominator,
    uint256 currentRound,
    uint256 minRounds
  ) private returns (uint256) {
   if(currentRound > minRounds) {
     return 1;
   }
   
   // users have chosen a coin to flip
   uint256 coinflip = randomNumberGen.generate(denominator, _nonces.current());
   _nonces.increment();
   for (uint256 i = 0; i < currentPlayers.length; i++) { 
      uint256 result;
     if(playerChoices[i] == coinflip) {
      result = 1; // win 1 point
     } else {
      result = 0; // lose 0 point
     }
     _addResult(escrowHash, currentPlayers[i], result); // just sets result
     _addScore(escrowHash, currentPlayers[i], result); // 1 point for 
   }
    return _play(escrowHash, currentPlayers, playerChoices, denominator, currentRound + 1, minRounds);
  }
}