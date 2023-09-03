// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface IWega {
 
 enum WegaType { DICE, COINFLIP }
 
 enum WegaState { PENDING, READY, PLAYED }
 
 struct Wega {
  WegaType gameType;
  WegaState state;
  uint256 denom;
  uint256 requiredPlayers;
  uint256 playersDeposited;
  uint256 minRounds;
 }
}