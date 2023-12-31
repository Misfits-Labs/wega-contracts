/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace IFeeManager {
  export type FeeConfigStruct = {
    applier: AddressLike;
    feeTaker: AddressLike;
    feeShare: BigNumberish;
    shouldApply: boolean;
  };

  export type FeeConfigStructOutput = [
    applier: string,
    feeTaker: string,
    feeShare: bigint,
    shouldApply: boolean
  ] & {
    applier: string;
    feeTaker: string;
    feeShare: bigint;
    shouldApply: boolean;
  };
}

export interface IFeeManagerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "calculateFeesForTransfer"
      | "getFeeRule"
      | "setFeeConfigs"
      | "shouldApplyFees"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "calculateFeesForTransfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeeRule",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeConfigs",
    values: [IFeeManager.FeeConfigStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "shouldApplyFees",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "calculateFeesForTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFeeRule", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeeConfigs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "shouldApplyFees",
    data: BytesLike
  ): Result;
}

export interface IFeeManager extends BaseContract {
  connect(runner?: ContractRunner | null): IFeeManager;
  waitForDeployment(): Promise<this>;

  interface: IFeeManagerInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  calculateFeesForTransfer: TypedContractMethod<
    [applier: AddressLike, transferAmount: BigNumberish],
    [
      [string, bigint, bigint] & {
        feeTaker: string;
        feeAmount: bigint;
        sendAmount: bigint;
      }
    ],
    "view"
  >;

  getFeeRule: TypedContractMethod<
    [applier: AddressLike],
    [IFeeManager.FeeConfigStructOutput],
    "view"
  >;

  setFeeConfigs: TypedContractMethod<
    [configs: IFeeManager.FeeConfigStruct[]],
    [void],
    "nonpayable"
  >;

  shouldApplyFees: TypedContractMethod<
    [applier: AddressLike],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "calculateFeesForTransfer"
  ): TypedContractMethod<
    [applier: AddressLike, transferAmount: BigNumberish],
    [
      [string, bigint, bigint] & {
        feeTaker: string;
        feeAmount: bigint;
        sendAmount: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getFeeRule"
  ): TypedContractMethod<
    [applier: AddressLike],
    [IFeeManager.FeeConfigStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "setFeeConfigs"
  ): TypedContractMethod<
    [configs: IFeeManager.FeeConfigStruct[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "shouldApplyFees"
  ): TypedContractMethod<[applier: AddressLike], [boolean], "view">;

  filters: {};
}
