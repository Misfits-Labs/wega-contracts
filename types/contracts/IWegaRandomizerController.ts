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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface IWegaRandomizerControllerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "generate"
      | "incrementControllerNonce"
      | "seedRandomizer"
      | "setRandomizer"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "RandomizerSet"): EventFragment;

  encodeFunctionData(
    functionFragment: "generate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "incrementControllerNonce",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "seedRandomizer",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setRandomizer",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "generate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "incrementControllerNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "seedRandomizer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRandomizer",
    data: BytesLike
  ): Result;
}

export namespace RandomizerSetEvent {
  export type InputTuple = [newRandomizer: AddressLike];
  export type OutputTuple = [newRandomizer: string];
  export interface OutputObject {
    newRandomizer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IWegaRandomizerController extends BaseContract {
  connect(runner?: ContractRunner | null): IWegaRandomizerController;
  waitForDeployment(): Promise<this>;

  interface: IWegaRandomizerControllerInterface;

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

  generate: TypedContractMethod<
    [denominator: BigNumberish],
    [bigint],
    "nonpayable"
  >;

  incrementControllerNonce: TypedContractMethod<[], [void], "nonpayable">;

  seedRandomizer: TypedContractMethod<
    [randomNumbers: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  setRandomizer: TypedContractMethod<
    [newRandomizer: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "generate"
  ): TypedContractMethod<[denominator: BigNumberish], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "incrementControllerNonce"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "seedRandomizer"
  ): TypedContractMethod<[randomNumbers: BigNumberish[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setRandomizer"
  ): TypedContractMethod<[newRandomizer: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "RandomizerSet"
  ): TypedContractEvent<
    RandomizerSetEvent.InputTuple,
    RandomizerSetEvent.OutputTuple,
    RandomizerSetEvent.OutputObject
  >;

  filters: {
    "RandomizerSet(address)": TypedContractEvent<
      RandomizerSetEvent.InputTuple,
      RandomizerSetEvent.OutputTuple,
      RandomizerSetEvent.OutputObject
    >;
    RandomizerSet: TypedContractEvent<
      RandomizerSetEvent.InputTuple,
      RandomizerSetEvent.OutputTuple,
      RandomizerSetEvent.OutputObject
    >;
  };
}