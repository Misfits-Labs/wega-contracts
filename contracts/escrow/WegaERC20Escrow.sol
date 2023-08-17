// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// lib imports
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
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

  // mapping of requestHash(escrowId) -> escrowRequest
  mapping(bytes32 => ERC20WagerRequest) private _wagerRequests;

  // for keeping track of user deposits
  mapping(address => uint256) private _deposits;

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
      uint256 wager,
      uint256 deposit
  ) {
     if(token == address(0) || account == address(0) || wager <= 0 && deposit <= 0) revert WegaEscrow_InvalidRequestData();
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
    uint256 deposit,
    uint256 wager
  ) public override onlyValidRequesData(token, account, wager, deposit)  {

      // initialize request struct
      ERC20WagerRequest memory wagerRequest_;
      
      // set request data
      wagerRequest_.state = IEscrow.TransactionState.OPEN;
      wagerRequest_.accounts[wagerRequest_.accounts.length] = account;
      wagerRequest_.token = token;
      wagerRequest_.wager = wager;
      wagerRequest_.nonce = currentNonce();
      
      // record deposit amount
      _deposits[account] = deposit;

      // increment user nonce
      _wagerNonces.increment();

      // create escrowId
      bytes32 escrowId_ = hash(wagerRequest_.token, account, wagerRequest_.wager, wagerRequest_.nonce);

      wagerRequest_.escrowId = escrowId_;
      _escrowIds.add(escrowId_);
      _wagerRequests[escrowId_] = wagerRequest_;
      
      // deposit to escrow 
      IERC20(wagerRequest_.token).transferFrom(
        account, 
        address(this),
        deposit
      );

      emit WagerRequestCreation(wagerRequest_.escrowId, wagerRequest_.token, account);
  }
    
  function hash(
    address token,
    address creator,
    uint256 wager,
    uint256 nonce
  ) public pure override returns (bytes32 escrowId_) {
    escrowId_ = keccak256(abi.encodePacked(
      token,
      creator,
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
