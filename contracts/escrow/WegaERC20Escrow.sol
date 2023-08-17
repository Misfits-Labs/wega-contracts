// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// lib imports
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "hardhat/console.sol";

// protocol imports
import "./IEscrow.sol";
import "./IWegaERC20Escrow.sol";
import "../events/IERC20EscrowEvents.sol";

import { 
    WegaEscrow_InvalidRequestData, 
    WegaEscrow_NotNftOwner, 
    WegaEscrow_InvalidRequestState,
    WegaEscrow_DepositorNotApproved,
    WegaEscrow_CallerNotApproved
} from '../errors/EscrowErrors.sol';
import { Wega_ZeroAddress } from '../errors/GlobalErrors.sol';

/**
  * @title WegaERC20Escrow (MVP)
  * @author @RasenGUY @Daosourced.
  * 
  * The WegaERC20Escrow contract is an escrow contract that targets erc20 tokens. 
  * It temporary holds erc20tokens on new wager requests, waits for the other party to deposit his wager,
  * and then allows for withdrawal of tokens through the game controller.
*/
contract WegaERC20Escrow is 
 IWegaERC20Escrow,
 IERC20EscrowEvents,
 ERC2771Context {

  using Counters for Counters.Counter;
  using EnumerableSet for EnumerableSet.Bytes32Set;
  using EnumerableSet for EnumerableSet.AddressSet;

  // mapping of requestHash(escrowId) -> escrowRequest
  mapping(bytes32 => ERC20WagerRequest) private _wagerRequests;

  // for keeping track of user deposits
  mapping(address => uint256) private _deposits;

  // for keeping track of depositor addresses
  mapping(bytes32 => EnumerableSet.AddressSet) _depositors;

  // mapping of creators -> request
  Counters.Counter private _wagerNonces;
  
  // stores all the transfer Ids, will be used enumeration
  EnumerableSet.Bytes32Set private _escrowIds;

  // escrow details
  string public NAME;
  string public VERSION;
  string public TYPE = "TOKEN-ERC20";


  // then modifiers
  modifier onlyValidRequesData(
      address token, 
      address account,
      uint256 accountsCount, 
      uint256 wager
  ) {
     if(
        token == address(0) || 
        account == address(0) ||
        accountsCount <= 1 ||
        wager <= 0 
      ) revert WegaEscrow_InvalidRequestData();
     _;
  } 
  
  // then constructor
  constructor(string memory name, string memory version) ERC2771Context(address(0)) {
    NAME = name;
    VERSION = version;
  }
    // then functions
  function createWagerAndDeposit(
    address token, 
    address account,
    uint256 accountsCount,
    uint256 wager
  ) public override onlyValidRequesData(token, account, accountsCount, wager)  {
      // initialize request struct
      ERC20WagerRequest memory wagerRequest_;
      
      // set request data
      wagerRequest_.state = IEscrow.TransactionState.OPEN;
      wagerRequest_.token = token;
      wagerRequest_.wager = wager;
      wagerRequest_.totalWager = wager * accountsCount;
      wagerRequest_.nonce = currentNonce();
      
      // record deposit amount
      _deposits[account] = wager;

      // increment user nonce
      _wagerNonces.increment();

      // create escrowId
      bytes32 escrowId_ = hash(wagerRequest_.token, account, accountsCount, wager, wagerRequest_.nonce);

      wagerRequest_.escrowId = escrowId_;
      _escrowIds.add(escrowId_);
      _wagerRequests[escrowId_] = wagerRequest_;

      // add depositors
      _depositors[escrowId_].add(account);
      
      // deposit to escrow 
      IERC20(wagerRequest_.token).transferFrom(
        account, 
        address(this),
        wager
      );

      emit WagerRequestCreation(wagerRequest_.escrowId, wagerRequest_.token, account, wager);
  }
    
  function hash(
    address token,
    address creator,
    uint256 accountsCount,
    uint256 wager,
    uint256 nonce
  ) public pure override returns (bytes32 escrowId_) {
    escrowId_ = keccak256(abi.encodePacked(
      token,
      creator,
      accountsCount,
      wager,
      nonce
     )
    );
  }

  function currentNonce() public view override returns (uint256) {
   return _escrowIds.length() + 1;
  }

  function getWagerRequests() external view override returns(ERC20WagerRequest[] memory) {
    uint256 totalWagers = _escrowIds.length();
    ERC20WagerRequest[] memory wagers = new ERC20WagerRequest[](totalWagers);
    for(uint256 i = 0; i < totalWagers;i++){
        wagers[i] = _wagerRequests[_escrowIds.at(i)];
    }
    return wagers;
  }

  function getWagerRequest(bytes32 escrowId) external view override returns (ERC20WagerRequest memory){
    return _wagerRequests[escrowId];
  }
}
