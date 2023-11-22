// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
/**
  * @title WegaDiceGame (MVP)
  * @author @RasenGUY @Daosourced.
  * @notice a simple decentralized onchain dice game
  * @dev note this is draft contract not meant to be used in production
*/
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "../escrow/WegaERC20Escrow.sol";
import "../roles/WegaGameManagerRole.sol";
import "../IWegaRandomNumberController.sol";
import "./Wega.sol";


contract WegaDiceGame is Wega {

  using Arrays for uint256[];
  using CountersUpgradeable for CountersUpgradeable.Counter;

  function play( 
    bytes32 escrowHash,
    address[] memory currentPlayers,
    uint256 denominator,
    uint256 minRounds
  ) external override onlyRole(GAME_CONTROLLER_ROLE) returns (address[] memory winners) {
    _play(escrowHash, currentPlayers, denominator, 1, minRounds);
    winners = _declareWinners(escrowHash, currentPlayers); 
  }

  function _play( 
    bytes32 escrowHash,
    address[] memory currentPlayers,
    uint256 denominator,
    uint256 currentRound,
    uint256 minRounds
  ) private returns (uint256) {
    if(currentRound > minRounds) {
      return 1;
    }
    // roll dice
    uint256[] memory results = new uint256[](currentPlayers.length);
    for (uint256 i = 0; i < currentPlayers.length; i++) { 
      results[i] = randomNumberGen.generate(denominator, _nonces.current());
      _nonces.increment();
      _addResult(escrowHash, currentPlayers[i], results[i]);
    }
    _tallyResultsIntoScores(escrowHash, currentPlayers, results);
    return _play(escrowHash, currentPlayers, denominator, currentRound + 1, minRounds);
  }

  function _tallyResultsIntoScores(
    bytes32 escrowHash,
    address[] memory players,
    uint256[] memory results
  ) internal {
    uint256 max = results.findMax();
    for(uint256 i = 0; i < players.length; i++) {
      if(results[i] == max) {
        _addScore(escrowHash, players[i], 1);
      }
    }
  }
}