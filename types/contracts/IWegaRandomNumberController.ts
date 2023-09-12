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

export interface IWegaRandomNumberControllerInterface extends utils.Interface {
  functions: {
    "addRandomNumbers(uint256[])": FunctionFragment;
    "generate(uint256)": FunctionFragment;
    "randomNumbersCount()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addRandomNumbers"
      | "generate"
      | "randomNumbersCount"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addRandomNumbers",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "generate",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "randomNumbersCount",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "addRandomNumbers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "generate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "randomNumbersCount",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IWegaRandomNumberController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IWegaRandomNumberControllerInterface;

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

    generate(
      denominator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    randomNumbersCount(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  addRandomNumbers(
    randomNumbers: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  generate(
    denominator: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  randomNumbersCount(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    addRandomNumbers(
      randomNumbers: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    generate(
      denominator: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    randomNumbersCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    addRandomNumbers(
      randomNumbers: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    generate(
      denominator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    randomNumbersCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addRandomNumbers(
      randomNumbers: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    generate(
      denominator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    randomNumbersCount(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
