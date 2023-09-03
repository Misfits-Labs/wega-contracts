// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

// lib imports
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
    import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

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
} from '../errors/WegaEscrowErrors.sol';

import { Wega_ZeroAddress } from '../errors/GlobalErrors.sol';
import "../roles/WegaEscrowManagerRole.sol";

/**
  * @title WegaERC20Escrow (MVP)
  * @author @RasenGUY @Daosourced.
  * 
  * The WegaERC20Escrow contract is an escrow contract that targets erc20 tokens. 
  * It temporary holds erc20tokens on new wager requests, waits for the other party to deposit his wager,
  * and then allows for withdrawal of tokens through the game controller.
*/
contract WegaERC20Escrow is
    IEscrow,
    IWegaERC20Escrow,
    IERC20EscrowEvents,
    WegaEscrowManagerRole,
    UUPSUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.Bytes32Set;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;
    using Math for uint256;

    // mapping of requestHash(wagerId) -> escrowRequest
    mapping(bytes32 => ERC20WagerRequest) private _wagerRequests;

    // for keeping track of user deposits
    mapping(bytes32 => mapping(address => uint256)) private _deposits;

    // for keeping track of depositor addresses
    mapping(bytes32 => EnumerableSetUpgradeable.AddressSet) _depositors;

    // mapping of creators -> nonces
    mapping(address => CountersUpgradeable.Counter) private _wagerNonces;

    // request balance
    mapping(bytes32 => uint256) private _escrowBalances;

    // request accountBalances
    mapping(address => uint256) private _accountBalances;

    // winner - withdrawers
    mapping(bytes32 => address) public winners;

    // game controller
    address gameController;

    // stores all the transfer Ids, will be used enumeration
    EnumerableSetUpgradeable.Bytes32Set private _escrowHashes;

    // escrow details
    string public NAME;
    string public VERSION;
    string public TYPE;

    // then modifiers
    modifier onlyValidRequesData(
        address token,
        address account,
        uint256 accountsCount,
        uint256 wager
    ) {
        if (
            token == address(0) ||
            account == address(0) ||
            accountsCount <= 1 ||
            wager <= 0
        ) revert WegaEscrow_InvalidRequestData();
        _;
    }
    // constructor() {
    //     _disableInitializers();
    // }

    function initialize(
        string memory name,
        string memory version
    ) initializer public {
        __UUPSUpgradeable_init();
        __WegaEscrow_init(name, version);
        __WegaEscrowManagerRole_init();
    }


    function __WegaEscrow_init(
        string memory name,
        string memory version
    ) public onlyInitializing {
        __WegaEscrowInit_init_unchained(name, version);
    }

    function __WegaEscrowInit_init_unchained(
        string memory name,
        string memory version
    ) internal onlyInitializing {
        NAME = name;
        VERSION = version;
        TYPE = "TOKEN-ERC20";
    }

    // then functions
    function createWagerRequest(
        address tokenAddress,
        address account,
        uint256 requiredPlayerNum,
        uint256 wagerAmount
    )
        public
        override
        onlyWegaEscrowManager
        onlyValidRequesData(
            tokenAddress,
            account,
            requiredPlayerNum,
            wagerAmount
        )
        returns (bytes32)
    {
        // initialize request struct
        ERC20WagerRequest memory wagerRequest_;

        // set request data
        wagerRequest_.state = TransactionState.OPEN;
        wagerRequest_.tokenAddress = tokenAddress;
        wagerRequest_.wagerAmount = wagerAmount;
        wagerRequest_.totalWager = wagerAmount * requiredPlayerNum;
        wagerRequest_.nonce = currentNonce(account);

        // increment user nonce
        _wagerNonces[account].increment();

        // create escrowHash
        bytes32 escrowHash_ = hash(
            wagerRequest_.tokenAddress,
            account,
            requiredPlayerNum,
            wagerAmount,
            wagerRequest_.nonce
        );

        wagerRequest_.escrowHash = escrowHash_;

        // record deposit amount
        _deposits[escrowHash_][account] = wagerAmount;

        _escrowHashes.add(escrowHash_);
        _wagerRequests[escrowHash_] = wagerRequest_;

        // add depositors
        _depositors[escrowHash_].add(account);

        // add to balance
        _escrowBalances[escrowHash_] += wagerAmount;

        // deposit to escrow
        IERC20Upgradeable(wagerRequest_.tokenAddress).transferFrom(
            account,
            address(this),
            wagerAmount
        );

        emit WagerRequestCreation(
            wagerRequest_.escrowHash,
            wagerRequest_.tokenAddress,
            account,
            wagerAmount
        );

        return wagerRequest_.escrowHash;
    }

    function hash(
        address token,
        address creator,
        uint256 requiredPlayerNum,
        uint256 wager,
        uint256 nonce
    ) public pure override returns (bytes32 escrowHash_) {
        escrowHash_ = keccak256(
            abi.encodePacked(token, creator, requiredPlayerNum, wager, nonce)
        );
    }

    function currentNonce(
        address account
    ) public view override returns (uint256) {
        return _wagerNonces[account].current();
    }

    function getWagerRequests()
        external
        view
        override
        returns (ERC20WagerRequest[] memory)
    {
        uint256 totalWagers = _escrowHashes.length();
        ERC20WagerRequest[] memory wagers = new ERC20WagerRequest[](
            totalWagers
        );
        for (uint256 i = 0; i < totalWagers; i++) {
            wagers[i] = _wagerRequests[_escrowHashes.at(i)];
        }
        return wagers;
    }

    function getWagerRequest(
        bytes32 escrowHash
    ) external view override returns (ERC20WagerRequest memory) {
        return _wagerRequests[escrowHash];
    }

    function depositOf(
        bytes32 escrowHash,
        address account
    ) external view override returns (uint256) {
        return _deposits[escrowHash][account];
    }

    function deposit(
        bytes32 escrowHash,
        address account,
        uint256 wagerAmount
    ) external onlyWegaEscrowManager {
        ERC20WagerRequest memory request = _wagerRequests[escrowHash];
        if (request.state != TransactionState.OPEN)
            revert WegaEscrow_InvalidRequestState();
        if (wagerAmount != request.wagerAmount)
            revert WegaEscrow_InvalidWagerAmount();
        if (_escrowBalances[escrowHash] + wagerAmount > request.totalWager)
            revert WegaEscrow_MaximumWagerAmountReached();
        if (_deposits[escrowHash][account] > 0)
            revert WegaEscrow_CanOnlyDepositOnce();

        // update depositor on escrow
        _depositors[escrowHash].add(account);

        // update deposits on escrow
        _deposits[escrowHash][account] = wagerAmount;

        // transfer tokens to escrow
        _escrowBalances[escrowHash] += wagerAmount;
        IERC20Upgradeable(request.tokenAddress).transferFrom(
            account,
            address(this),
            wagerAmount
        );

        // change state to pending if total wager amount is reached
        if (request.totalWager == _escrowBalances[escrowHash]) {
            _wagerRequests[escrowHash].state = TransactionState.PENDING;
        }

        // emit deposit
        emit WagerDeposit(escrowHash, wagerAmount, account);
    }

    function wagerBalance(bytes32 escrowHash) public view returns (uint256) {
        return _escrowBalances[escrowHash];
    }

    function containsPlayer(
        bytes32 escrowHash,
        address player
    ) public view override returns (bool) {
        return _depositors[escrowHash].contains(player);
    }

    function setWithdrawers(
        bytes32 escrowHash,
        address[] memory winners_
    ) external override onlyWegaEscrowManager {
        ERC20WagerRequest memory request = _wagerRequests[escrowHash];
        if (request.state != TransactionState.PENDING)
            revert WegaEscrow_InvalidRequestState();
        uint256 withdrawableAmount = _wagerRequests[escrowHash]
            .totalWager
            .mulDiv(1, winners_.length);
        for (uint256 i = 0; i < winners_.length; i++) {
            if (!containsPlayer(escrowHash, winners_[i]))
                revert WegaEscrow_InvalidRequestData();
            _accountBalances[winners_[i]] = withdrawableAmount;
        }
        _wagerRequests[escrowHash].state = TransactionState.READY;
        emit SetWithdrawers(escrowHash, winners_);
    }

    function withdraw(bytes32 escrowHash) public {
        ERC20WagerRequest memory request = _wagerRequests[escrowHash];
        if (request.state != TransactionState.READY)
            revert WegaEscrow_InvalidRequestState();
        if (_accountBalances[_msgSender()] == 0 ether)
            revert WegaEscrow_InvalidRequestData();
        uint256 transferAmount = _accountBalances[_msgSender()];
        _escrowBalances[escrowHash] -= transferAmount;
        delete _accountBalances[_msgSender()];
        _wagerRequests[escrowHash].state = TransactionState.CLOSED;
        IERC20Upgradeable(request.tokenAddress).transfer(
            _msgSender(),
            transferAmount
        );
        emit WagerWithdrawal(escrowHash, transferAmount, _msgSender());
    }

    function _authorizeUpgrade(address newImplementation) internal onlyOwner override {}
}
