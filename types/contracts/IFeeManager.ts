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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace IFeeManager {
  export type FeeConfigStruct = {
    feeTaker: PromiseOrValue<string>;
    feeShare: PromiseOrValue<BigNumberish>;
    shouldApply: PromiseOrValue<boolean>;
  };

  export type FeeConfigStructOutput = [string, BigNumber, boolean] & {
    feeTaker: string;
    feeShare: BigNumber;
    shouldApply: boolean;
  };
}

export interface IFeeManagerInterface extends utils.Interface {
  functions: {
    "calculateFeesForTransfer(address,uint256)": FunctionFragment;
    "getFeeRule(address)": FunctionFragment;
    "setFeeConfigs(address[],(address,uint256,bool)[])": FunctionFragment;
    "shouldApplyFees(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "calculateFeesForTransfer"
      | "getFeeRule"
      | "setFeeConfigs"
      | "shouldApplyFees"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "calculateFeesForTransfer",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeeRule",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeConfigs",
    values: [PromiseOrValue<string>[], IFeeManager.FeeConfigStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "shouldApplyFees",
    values: [PromiseOrValue<string>]
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

  events: {};
}

export interface IFeeManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IFeeManagerInterface;

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
    calculateFeesForTransfer(
      applier: PromiseOrValue<string>,
      transferAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getFeeRule(
      applier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [IFeeManager.FeeConfigStructOutput] & {
        feeRule: IFeeManager.FeeConfigStructOutput;
      }
    >;

    setFeeConfigs(
      appliers: PromiseOrValue<string>[],
      configs: IFeeManager.FeeConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    shouldApplyFees(
      applier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean] & { shouldApply: boolean }>;
  };

  calculateFeesForTransfer(
    applier: PromiseOrValue<string>,
    transferAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getFeeRule(
    applier: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<IFeeManager.FeeConfigStructOutput>;

  setFeeConfigs(
    appliers: PromiseOrValue<string>[],
    configs: IFeeManager.FeeConfigStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  shouldApplyFees(
    applier: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    calculateFeesForTransfer(
      applier: PromiseOrValue<string>,
      transferAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber] & {
        feeTaker: string;
        feeAmount: BigNumber;
        sendAmount: BigNumber;
      }
    >;

    getFeeRule(
      applier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<IFeeManager.FeeConfigStructOutput>;

    setFeeConfigs(
      appliers: PromiseOrValue<string>[],
      configs: IFeeManager.FeeConfigStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    shouldApplyFees(
      applier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    calculateFeesForTransfer(
      applier: PromiseOrValue<string>,
      transferAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getFeeRule(
      applier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setFeeConfigs(
      appliers: PromiseOrValue<string>[],
      configs: IFeeManager.FeeConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    shouldApplyFees(
      applier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    calculateFeesForTransfer(
      applier: PromiseOrValue<string>,
      transferAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getFeeRule(
      applier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setFeeConfigs(
      appliers: PromiseOrValue<string>[],
      configs: IFeeManager.FeeConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    shouldApplyFees(
      applier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
