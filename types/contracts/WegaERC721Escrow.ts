/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace IWegaERC721Escrow {
  export type EscrowRequestStruct = {
    state: PromiseOrValue<BigNumberish>;
    nftAgainst: PromiseOrValue<string>;
    tokenIdAgainst: PromiseOrValue<BigNumberish>;
    ownerAgainst: PromiseOrValue<string>;
    nftFor: PromiseOrValue<string>;
    tokenIdFor: PromiseOrValue<BigNumberish>;
    ownerFor: PromiseOrValue<string>;
    deadline: PromiseOrValue<BigNumberish>;
    nonce: PromiseOrValue<BigNumberish>;
    transferId: PromiseOrValue<BytesLike>;
  };

  export type EscrowRequestStructOutput = [
    number,
    string,
    BigNumber,
    string,
    string,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    string
  ] & {
    state: number;
    nftAgainst: string;
    tokenIdAgainst: BigNumber;
    ownerAgainst: string;
    nftFor: string;
    tokenIdFor: BigNumber;
    ownerFor: string;
    deadline: BigNumber;
    nonce: BigNumber;
    transferId: string;
  };
}

export interface WegaERC721EscrowInterface extends utils.Interface {
  functions: {
    "NAME()": FunctionFragment;
    "VERSION()": FunctionFragment;
    "approve(bytes32,address,address,uint256)": FunctionFragment;
    "cancelRequest(bytes32)": FunctionFragment;
    "createRequestAndDeposit(address,uint256,uint256)": FunctionFragment;
    "currentNonce()": FunctionFragment;
    "depositNftForSide(bytes32)": FunctionFragment;
    "getEscrowRequest(bytes32)": FunctionFragment;
    "getEscrowRequests()": FunctionFragment;
    "getEscrowRequestsOfUser(address)": FunctionFragment;
    "getRequest(bytes32)": FunctionFragment;
    "getTransferId(uint256)": FunctionFragment;
    "hash(address,uint256,address,uint256)": FunctionFragment;
    "isTrustedForwarder(address)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "withdraw(bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "NAME"
      | "VERSION"
      | "approve"
      | "cancelRequest"
      | "createRequestAndDeposit"
      | "currentNonce"
      | "depositNftForSide"
      | "getEscrowRequest"
      | "getEscrowRequests"
      | "getEscrowRequestsOfUser"
      | "getRequest"
      | "getTransferId"
      | "hash"
      | "isTrustedForwarder"
      | "onERC721Received"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
  encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelRequest",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "createRequestAndDeposit",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "currentNonce",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositNftForSide",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEscrowRequest",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEscrowRequests",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEscrowRequestsOfUser",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRequest",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTransferId",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "hash",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isTrustedForwarder",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createRequestAndDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositNftForSide",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEscrowRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEscrowRequests",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEscrowRequestsOfUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRequest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTransferId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hash", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Approval(bytes32)": EventFragment;
    "Deposit(bytes32,address,uint256)": EventFragment;
    "RequestCancelation(bytes32,address)": EventFragment;
    "RequestCreation(bytes32,address,uint256)": EventFragment;
    "Withdrawal(bytes32,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestCancelation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestCreation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawal"): EventFragment;
}

export interface ApprovalEventObject {
  transferId: string;
}
export type ApprovalEvent = TypedEvent<[string], ApprovalEventObject>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface DepositEventObject {
  transferId: string;
  depositer: string;
  tokenId: BigNumber;
}
export type DepositEvent = TypedEvent<
  [string, string, BigNumber],
  DepositEventObject
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface RequestCancelationEventObject {
  transferId: string;
  canceler: string;
}
export type RequestCancelationEvent = TypedEvent<
  [string, string],
  RequestCancelationEventObject
>;

export type RequestCancelationEventFilter =
  TypedEventFilter<RequestCancelationEvent>;

export interface RequestCreationEventObject {
  transferId: string;
  nftAgainst: string;
  tokenId: BigNumber;
}
export type RequestCreationEvent = TypedEvent<
  [string, string, BigNumber],
  RequestCreationEventObject
>;

export type RequestCreationEventFilter = TypedEventFilter<RequestCreationEvent>;

export interface WithdrawalEventObject {
  transferId: string;
  withdrawer: string;
  tokenId: BigNumber;
}
export type WithdrawalEvent = TypedEvent<
  [string, string, BigNumber],
  WithdrawalEventObject
>;

export type WithdrawalEventFilter = TypedEventFilter<WithdrawalEvent>;

export interface WegaERC721Escrow extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WegaERC721EscrowInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    NAME(overrides?: CallOverrides): Promise<[string]>;

    VERSION(overrides?: CallOverrides): Promise<[string]>;

    approve(
      transferId: PromiseOrValue<BytesLike>,
      nftFor: PromiseOrValue<string>,
      ownerFor: PromiseOrValue<string>,
      tokenIdFor: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createRequestAndDeposit(
      nftAgainst: PromiseOrValue<string>,
      tokenIdAgainst: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    currentNonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    depositNftForSide(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getEscrowRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [IWegaERC721Escrow.EscrowRequestStructOutput] & {
        request_: IWegaERC721Escrow.EscrowRequestStructOutput;
      }
    >;

    getEscrowRequests(
      overrides?: CallOverrides
    ): Promise<[IWegaERC721Escrow.EscrowRequestStructOutput[]]>;

    getEscrowRequestsOfUser(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[IWegaERC721Escrow.EscrowRequestStructOutput[]]>;

    getRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[IWegaERC721Escrow.EscrowRequestStructOutput]>;

    getTransferId(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { transferId_: string }>;

    hash(
      nftAgainst: PromiseOrValue<string>,
      tokenIdAgainst: PromiseOrValue<BigNumberish>,
      ownerAgainst: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { transferId_: string }>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  NAME(overrides?: CallOverrides): Promise<string>;

  VERSION(overrides?: CallOverrides): Promise<string>;

  approve(
    transferId: PromiseOrValue<BytesLike>,
    nftFor: PromiseOrValue<string>,
    ownerFor: PromiseOrValue<string>,
    tokenIdFor: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelRequest(
    transferId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createRequestAndDeposit(
    nftAgainst: PromiseOrValue<string>,
    tokenIdAgainst: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  currentNonce(overrides?: CallOverrides): Promise<BigNumber>;

  depositNftForSide(
    transferId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getEscrowRequest(
    transferId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<IWegaERC721Escrow.EscrowRequestStructOutput>;

  getEscrowRequests(
    overrides?: CallOverrides
  ): Promise<IWegaERC721Escrow.EscrowRequestStructOutput[]>;

  getEscrowRequestsOfUser(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<IWegaERC721Escrow.EscrowRequestStructOutput[]>;

  getRequest(
    transferId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<IWegaERC721Escrow.EscrowRequestStructOutput>;

  getTransferId(
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  hash(
    nftAgainst: PromiseOrValue<string>,
    tokenIdAgainst: PromiseOrValue<BigNumberish>,
    ownerAgainst: PromiseOrValue<string>,
    nonce: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  isTrustedForwarder(
    forwarder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  onERC721Received(
    operator: PromiseOrValue<string>,
    from: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    transferId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    NAME(overrides?: CallOverrides): Promise<string>;

    VERSION(overrides?: CallOverrides): Promise<string>;

    approve(
      transferId: PromiseOrValue<BytesLike>,
      nftFor: PromiseOrValue<string>,
      ownerFor: PromiseOrValue<string>,
      tokenIdFor: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    createRequestAndDeposit(
      nftAgainst: PromiseOrValue<string>,
      tokenIdAgainst: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    currentNonce(overrides?: CallOverrides): Promise<BigNumber>;

    depositNftForSide(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    getEscrowRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<IWegaERC721Escrow.EscrowRequestStructOutput>;

    getEscrowRequests(
      overrides?: CallOverrides
    ): Promise<IWegaERC721Escrow.EscrowRequestStructOutput[]>;

    getEscrowRequestsOfUser(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<IWegaERC721Escrow.EscrowRequestStructOutput[]>;

    getRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<IWegaERC721Escrow.EscrowRequestStructOutput>;

    getTransferId(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    hash(
      nftAgainst: PromiseOrValue<string>,
      tokenIdAgainst: PromiseOrValue<BigNumberish>,
      ownerAgainst: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    withdraw(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Approval(bytes32)"(
      transferId?: PromiseOrValue<BytesLike> | null
    ): ApprovalEventFilter;
    Approval(
      transferId?: PromiseOrValue<BytesLike> | null
    ): ApprovalEventFilter;

    "Deposit(bytes32,address,uint256)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      depositer?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): DepositEventFilter;
    Deposit(
      transferId?: PromiseOrValue<BytesLike> | null,
      depositer?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): DepositEventFilter;

    "RequestCancelation(bytes32,address)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      canceler?: PromiseOrValue<string> | null
    ): RequestCancelationEventFilter;
    RequestCancelation(
      transferId?: PromiseOrValue<BytesLike> | null,
      canceler?: PromiseOrValue<string> | null
    ): RequestCancelationEventFilter;

    "RequestCreation(bytes32,address,uint256)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      nftAgainst?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): RequestCreationEventFilter;
    RequestCreation(
      transferId?: PromiseOrValue<BytesLike> | null,
      nftAgainst?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): RequestCreationEventFilter;

    "Withdrawal(bytes32,address,uint256)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      withdrawer?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): WithdrawalEventFilter;
    Withdrawal(
      transferId?: PromiseOrValue<BytesLike> | null,
      withdrawer?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): WithdrawalEventFilter;
  };

  estimateGas: {
    NAME(overrides?: CallOverrides): Promise<BigNumber>;

    VERSION(overrides?: CallOverrides): Promise<BigNumber>;

    approve(
      transferId: PromiseOrValue<BytesLike>,
      nftFor: PromiseOrValue<string>,
      ownerFor: PromiseOrValue<string>,
      tokenIdFor: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createRequestAndDeposit(
      nftAgainst: PromiseOrValue<string>,
      tokenIdAgainst: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    currentNonce(overrides?: CallOverrides): Promise<BigNumber>;

    depositNftForSide(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getEscrowRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEscrowRequests(overrides?: CallOverrides): Promise<BigNumber>;

    getEscrowRequestsOfUser(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTransferId(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hash(
      nftAgainst: PromiseOrValue<string>,
      tokenIdAgainst: PromiseOrValue<BigNumberish>,
      ownerAgainst: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    approve(
      transferId: PromiseOrValue<BytesLike>,
      nftFor: PromiseOrValue<string>,
      ownerFor: PromiseOrValue<string>,
      tokenIdFor: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createRequestAndDeposit(
      nftAgainst: PromiseOrValue<string>,
      tokenIdAgainst: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    currentNonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    depositNftForSide(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getEscrowRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEscrowRequests(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEscrowRequestsOfUser(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRequest(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTransferId(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hash(
      nftAgainst: PromiseOrValue<string>,
      tokenIdAgainst: PromiseOrValue<BigNumberish>,
      ownerAgainst: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      transferId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
