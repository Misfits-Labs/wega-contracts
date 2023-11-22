// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
/**
  * @title TwoWayChanceContract (MVP)
  * @author @RasenGUY @Daosourced.
  *
  * The contract that handles the business logic for randomness game plays
  * The contract also takes in a list of random numbers from DRAND, this as a short-term solution 
  * just for poc but. Which will be replaced in next iterations with a proper implementation of DIA'
  * oracle implementation for random numbers
  * @dev note this is draft contract not meant to be used in production
*/
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "../escrow/WegaERC20Escrow.sol";
import "../roles/WegaProtocolAdminRole.sol";
import "../IWegaRandomNumberController.sol";
import "../errors/AccessControlErrors.sol";
import "../utils/Arrays.sol";
import "./IWega.sol";


abstract contract Wega is IWega, WegaProtocolAdminRole, UUPSUpgradeable {

  using EnumerableMap for EnumerableMap.UintToUintMap;
  using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;
  using Math for uint256;
  using Arrays for uint256[];

  IWegaRandomNumberController internal randomNumberGen;
  
  // escrowHash -> address of the player -> results
  mapping(bytes32 => mapping(address => uint256[])) private _gameResults;
  mapping(bytes32 => mapping(address => uint256)) private _playerScores;
  mapping(bytes32 => EnumerableSetUpgradeable.AddressSet) private _winners;
  CountersUpgradeable.Counter internal _nonces;
  bytes32 public GAME_CONTROLLER_ROLE;

  

  function initialize(
    address randomNumberController
  ) initializer public {
    __UUPSUpgradeable_init();
    __WegaProtocolAdminRole_init();
    __Wega_init(randomNumberController);
    GAME_CONTROLLER_ROLE = keccak256('GAME_CONTROLLER_ROLE');
    _setRoleAdmin(GAME_CONTROLLER_ROLE, WEGA_PROTOCOL_ADMIN_ROLE);
  }

  function __Wega_init(address randomNumberController) public onlyInitializing {
    __Wega_init_unchained(randomNumberController);
  } 

  function __Wega_init_unchained(address randomNumberController) public onlyInitializing {
    randomNumberGen = IWegaRandomNumberController(randomNumberController);
  }

  function winners(bytes32 escrowHash) external view override returns(address[] memory) {
    return _winners[escrowHash].values();
  }
  
  function playerResults(bytes32 escrowHash, address player) external view override returns(uint256[] memory) {
    return _gameResults[escrowHash][player];
  }

  function playerScore(bytes32 escrowHash, address player) external view override returns(uint256){
    return _playerScores[escrowHash][player];
  }

  function _getHighestScore(
   bytes32 escrowHash, 
   address[] memory players_
  ) internal view returns(uint256) {
    uint256[] memory playerScores = new uint256[](players_.length);
    for(uint256 i = 0; i < players_.length; i++) { 
      playerScores[i] = _playerScores[escrowHash][players_[i]];    
    }
    return playerScores.findMax();
  }

  function _declareWinners(
   bytes32 escrowHash, 
   address[] memory players
   ) internal returns (address[] memory) {
    uint256 highestScore = _getHighestScore(escrowHash, players);
    for(uint256 i = 0; i < players.length; i++) {
      if(_playerScores[escrowHash][players[i]] == highestScore) {
        _winners[escrowHash].add(players[i]);
      }
    }
    return _winners[escrowHash].values();
  }

  function _authorizeUpgrade(address newImplementation) internal onlyOwner override {}

  function _addResult(bytes32 escrowHash, address player, uint256 result) internal {
    _gameResults[escrowHash][player].push(result);
  }

  function _addScore(bytes32 escrowHash, address player, uint256 score) internal {
    _playerScores[escrowHash][player] += score;
  }

  function randomNumbersContract() external view returns(address) {
    return address(randomNumberGen);
  }
  
  // coinflip
  function play(
    bytes32 escrowHash, 
    address[] memory currentPlayers, 
    uint256[] memory playerChoises, 
    uint256 currentRound,
    uint256 minRounds
  ) external virtual returns (address[] memory winners_) {}
  
  // dice
  function play(
    bytes32 escrowHash, 
    address[] memory currentPlayers, 
    uint256 currentRound,
    uint256 minRounds
  ) external virtual returns (address[] memory winners_) {}
}