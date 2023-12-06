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

export declare namespace IWega {
  export type WegaStruct = {
    name: string;
    currentPlayers: AddressLike[];
    deposited: BigNumberish;
    state: BigNumberish;
  };

  export type WegaStructOutput = [
    name: string,
    currentPlayers: string[],
    deposited: bigint,
    state: bigint
  ] & {
    name: string;
    currentPlayers: string[];
    deposited: bigint;
    state: bigint;
  };
}

export declare namespace IWegaGameController {
  export type GameSettingsStruct = {
    denominator: BigNumberish;
    minRounds: BigNumberish;
    requiredPlayers: BigNumberish;
    proxy: AddressLike;
    randomNumberController: AddressLike;
    name: string;
  };

  export type GameSettingsStructOutput = [
    denominator: bigint,
    minRounds: bigint,
    requiredPlayers: bigint,
    proxy: string,
    randomNumberController: string,
    name: string
  ] & {
    denominator: bigint;
    minRounds: bigint;
    requiredPlayers: bigint;
    proxy: string;
    randomNumberController: string;
    name: string;
  };
}

export interface IWegaGameControllerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "createGame"
      | "depositOrPlay(bytes32,uint256[])"
      | "depositOrPlay(bytes32,uint256[],uint256[])"
      | "existsGame"
      | "gameResults"
      | "getGame"
      | "playerScore"
      | "players"
      | "registerGame"
      | "removeGame"
      | "setGameConfiguration"
      | "winners"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createGame",
    values: [string, AddressLike, BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "depositOrPlay(bytes32,uint256[])",
    values: [BytesLike, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "depositOrPlay(bytes32,uint256[],uint256[])",
    values: [BytesLike, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "existsGame", values: [string]): string;
  encodeFunctionData(
    functionFragment: "gameResults",
    values: [string, BytesLike, AddressLike[]]
  ): string;
  encodeFunctionData(functionFragment: "getGame", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "playerScore",
    values: [string, BytesLike, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "players", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "registerGame",
    values: [IWegaGameController.GameSettingsStruct]
  ): string;
  encodeFunctionData(functionFragment: "removeGame", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setGameConfiguration",
    values: [IWegaGameController.GameSettingsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "winners",
    values: [string, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "createGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositOrPlay(bytes32,uint256[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositOrPlay(bytes32,uint256[],uint256[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "existsGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "gameResults",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "playerScore",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "players", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerGame",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "removeGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setGameConfiguration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "winners", data: BytesLike): Result;
}

export interface IWegaGameController extends BaseContract {
  connect(runner?: ContractRunner | null): IWegaGameController;
  waitForDeployment(): Promise<this>;

  interface: IWegaGameControllerInterface;

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

  createGame: TypedContractMethod<
    [
      name: string,
      tokenAddress: AddressLike,
      wagerAmount: BigNumberish,
      randomNumbers: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;

  "depositOrPlay(bytes32,uint256[])": TypedContractMethod<
    [escrowHash: BytesLike, randomNumbers: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  "depositOrPlay(bytes32,uint256[],uint256[])": TypedContractMethod<
    [
      escrowHash: BytesLike,
      playerChoices: BigNumberish[],
      randomNumbers: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;

  existsGame: TypedContractMethod<[game: string], [boolean], "nonpayable">;

  gameResults: TypedContractMethod<
    [game: string, escrowHash: BytesLike, players: AddressLike[]],
    [bigint[][]],
    "nonpayable"
  >;

  getGame: TypedContractMethod<
    [escrowHash: BytesLike],
    [IWega.WegaStructOutput],
    "nonpayable"
  >;

  playerScore: TypedContractMethod<
    [game: string, escrowHash: BytesLike, player: AddressLike],
    [bigint],
    "nonpayable"
  >;

  players: TypedContractMethod<
    [escrowHash: BytesLike],
    [string[]],
    "nonpayable"
  >;

  registerGame: TypedContractMethod<
    [config: IWegaGameController.GameSettingsStruct],
    [void],
    "nonpayable"
  >;

  removeGame: TypedContractMethod<[game: string], [void], "nonpayable">;

  setGameConfiguration: TypedContractMethod<
    [config: IWegaGameController.GameSettingsStruct],
    [void],
    "nonpayable"
  >;

  winners: TypedContractMethod<
    [game: string, escrowHash: BytesLike],
    [string[]],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createGame"
  ): TypedContractMethod<
    [
      name: string,
      tokenAddress: AddressLike,
      wagerAmount: BigNumberish,
      randomNumbers: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositOrPlay(bytes32,uint256[])"
  ): TypedContractMethod<
    [escrowHash: BytesLike, randomNumbers: BigNumberish[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositOrPlay(bytes32,uint256[],uint256[])"
  ): TypedContractMethod<
    [
      escrowHash: BytesLike,
      playerChoices: BigNumberish[],
      randomNumbers: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "existsGame"
  ): TypedContractMethod<[game: string], [boolean], "nonpayable">;
  getFunction(
    nameOrSignature: "gameResults"
  ): TypedContractMethod<
    [game: string, escrowHash: BytesLike, players: AddressLike[]],
    [bigint[][]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getGame"
  ): TypedContractMethod<
    [escrowHash: BytesLike],
    [IWega.WegaStructOutput],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "playerScore"
  ): TypedContractMethod<
    [game: string, escrowHash: BytesLike, player: AddressLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "players"
  ): TypedContractMethod<[escrowHash: BytesLike], [string[]], "nonpayable">;
  getFunction(
    nameOrSignature: "registerGame"
  ): TypedContractMethod<
    [config: IWegaGameController.GameSettingsStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "removeGame"
  ): TypedContractMethod<[game: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setGameConfiguration"
  ): TypedContractMethod<
    [config: IWegaGameController.GameSettingsStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "winners"
  ): TypedContractMethod<
    [game: string, escrowHash: BytesLike],
    [string[]],
    "nonpayable"
  >;

  filters: {};
}
