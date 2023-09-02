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
} from "../../common";

export interface TwoWayChanceGameInterface extends utils.Interface {
  functions: {
    "addRandomNumbers(uint256[])": FunctionFragment;
    "isTrustedForwarder(address)": FunctionFragment;
    "randomNumbersCount()": FunctionFragment;
    "roll(uint256,uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addRandomNumbers"
      | "isTrustedForwarder"
      | "randomNumbersCount"
      | "roll"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addRandomNumbers",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "isTrustedForwarder",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "randomNumbersCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "roll",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "addRandomNumbers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "randomNumbersCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "roll", data: BytesLike): Result;

  events: {};
}

export interface TwoWayChanceGame extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TwoWayChanceGameInterface;

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
    addRandomNumbers(
      randomNumbers: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    randomNumbersCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    roll(
      denominator: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      player: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  addRandomNumbers(
    randomNumbers: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isTrustedForwarder(
    forwarder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  randomNumbersCount(overrides?: CallOverrides): Promise<BigNumber>;

  roll(
    denominator: PromiseOrValue<BigNumberish>,
    nonce: PromiseOrValue<BigNumberish>,
    player: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    addRandomNumbers(
      randomNumbers: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    randomNumbersCount(overrides?: CallOverrides): Promise<BigNumber>;

    roll(
      denominator: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      player: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    addRandomNumbers(
      randomNumbers: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    randomNumbersCount(overrides?: CallOverrides): Promise<BigNumber>;

    roll(
      denominator: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      player: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addRandomNumbers(
      randomNumbers: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    randomNumbersCount(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    roll(
      denominator: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      player: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
