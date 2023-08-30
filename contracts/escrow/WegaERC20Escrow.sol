// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// lib imports
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "hardhat/console.sol";

// protocol imports
import "./IEscrow.sol";
import "./IWegaERC20Escrow.sol";
import "../events/IERC20EscrowEvents.sol";

import { 
    WegaEscrow_InvalidRequestData, 
    WegaEscrow_NotNftOwner, 
    WegaEscrow_InvalidRequestState,
    WegaEscrow_DepositorNotApproved,
    WegaEscrow_CallerNotApproved,
    WegaEscrow_InvalidWagerAmount,
    WegaEscrow_CanOnlyDepositOnce,
    WegaEscrow_MaximumWagerAmountReached
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
 Ownable {

  using Counters for Counters.Counter;
  using EnumerableSet for EnumerableSet.Bytes32Set;
  using EnumerableSet for EnumerableSet.AddressSet;

  // mapping of requestHash(wagerId) -> escrowRequest
  mapping(bytes32 => ERC20WagerRequest) private _wagerRequests; 

  // for keeping track of user deposits
  mapping(bytes32 => mapping(address => uint256)) private _deposits;

  // for keeping track of depositor addresses
  mapping(bytes32 => EnumerableSet.AddressSet) _depositors;

  // mapping of creators -> nonces
  mapping(address => Counters.Counter) private _wagerNonces;
  
  // request balance
  mapping(bytes32 => uint256) private _balances;

  // winner - withdrawers 
  mapping(bytes32 => address) public winners;

  // game controller
  address gameController; 
  
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

  modifier onlyGameController {
    if(_msgSender() != gameController) revert WegaEscrow_CallerNotApproved();
    _;
  }
  
  // then constructor
  constructor(string memory name, string memory version) {
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
      wagerRequest_.nonce = currentNonce(account);
      

      // increment user nonce
      _wagerNonces[account].increment();

      // create escrowId
      bytes32 escrowId_ = hash(wagerRequest_.token, account, accountsCount, wager, wagerRequest_.nonce);

      wagerRequest_.escrowId = escrowId_;
      
      // record deposit amount
      _deposits[escrowId_][account] = wager;

      _escrowIds.add(escrowId_);
      _wagerRequests[escrowId_] = wagerRequest_;

      // add depositors
      _depositors[escrowId_].add(account);
      
      // add to balance
      _balances[escrowId_] += wager;

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

  function currentNonce(address account) public view override returns (uint256) {
   return _wagerNonces[account].current();
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

  function depositOf(bytes32 escrowId, address account) external view override returns (uint256){
    return _deposits[escrowId][account];
  }

  function deposit(bytes32 escrowId, uint256 wager) external {
    ERC20WagerRequest memory request = _wagerRequests[escrowId];
    if(request.state != IEscrow.TransactionState.OPEN) revert WegaEscrow_InvalidRequestState();
    if(wager != request.wager) revert WegaEscrow_InvalidWagerAmount();
    if(_balances[escrowId] + wager >  request.totalWager) revert WegaEscrow_MaximumWagerAmountReached();
    if(_deposits[escrowId][_msgSender()] > 0) revert WegaEscrow_CanOnlyDepositOnce();
        
    // update depositor on escrow
    _depositors[escrowId].add(_msgSender());

    // update deposits on escrow
    _deposits[escrowId][_msgSender()] = wager;

    // add balance 
    _balances[escrowId] += wager;

    // change state to pending if total wager amount is reached
    if(request.totalWager == _balances[escrowId]){
      _wagerRequests[escrowId].state = IEscrow.TransactionState.PENDING;
    }
    // deposit to escrow 
    IERC20(request.token).transferFrom(
      _msgSender(), 
      address(this),
      wager
    );

    // emit deposit 
    emit WagerDeposit(escrowId, wager, _msgSender());
  }

  function wagerBalance(bytes32 escrowId) public view returns (uint256) {
    return _balances[escrowId];
  }

  function containsPlayer(bytes32 escrowId, address player) public view override returns (bool) {
    return _depositors[escrowId].contains(player);
  }

  function setWithdrawer(bytes32 escrowId, address winner) external override onlyGameController {
    if(!containsPlayer(escrowId, winner)) revert WegaEscrow_InvalidRequestData();
    _wagerRequests[escrowId].state = IEscrow.TransactionState.READY; 
    winners[escrowId] = winner;
    emit SetWithdrawer(escrowId, winner); 
  }

  function setGameController(address gameController_) external onlyOwner {
    gameController = gameController_;
    emit SetGameControler(gameController_);
  }
}
