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

export interface WegaGameControllerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "DEFAULT_ADMIN_ROLE"
      | "WEGA_PROTOCOL_ADMIN_ROLE"
      | "__WegaController_init"
      | "__WegaController_init_unchained"
      | "addWegaProtocolAdmin"
      | "addWegaProtocolAdmins"
      | "closeWegaProtocolAdmin"
      | "createGame"
      | "depositOrPlay(bytes32,uint256[])"
      | "depositOrPlay(bytes32,uint256[],uint256[])"
      | "erc20Escrow"
      | "existsGame"
      | "gameResults"
      | "getGame"
      | "getGameSettings"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "initialize"
      | "isWegaProtocolAdmin"
      | "owner"
      | "playerScore"
      | "players"
      | "proxiableUUID"
      | "randomizerController"
      | "registerGame"
      | "removeGame"
      | "removeWegaProtocolAdmin"
      | "removeWegaProtocolAdmins"
      | "renounceOwnership"
      | "renounceRole"
      | "renounceWegaProtocolAdmin"
      | "revokeRole"
      | "rotateWegaProtocolAdmin"
      | "setGameConfiguration"
      | "supportsInterface"
      | "transferOwnership"
      | "upgradeTo"
      | "upgradeToAndCall"
      | "winners"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AdminChanged"
      | "BeaconUpgraded"
      | "GameCreation"
      | "GameRegistration"
      | "Initialized"
      | "OwnershipTransferred"
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
      | "SetGame"
      | "Upgraded"
      | "WinnerDeclaration"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WEGA_PROTOCOL_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "__WegaController_init",
    values: [AddressLike, IWegaGameController.GameSettingsStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "__WegaController_init_unchained",
    values: [AddressLike, IWegaGameController.GameSettingsStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addWegaProtocolAdmin",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "addWegaProtocolAdmins",
    values: [AddressLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "closeWegaProtocolAdmin",
    values: [AddressLike]
  ): string;
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
  encodeFunctionData(
    functionFragment: "erc20Escrow",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "existsGame", values: [string]): string;
  encodeFunctionData(
    functionFragment: "gameResults",
    values: [string, BytesLike, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "getGame", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "getGameSettings",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike, AddressLike, IWegaGameController.GameSettingsStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "isWegaProtocolAdmin",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "playerScore",
    values: [string, BytesLike, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "players", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "randomizerController",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "registerGame",
    values: [IWegaGameController.GameSettingsStruct]
  ): string;
  encodeFunctionData(functionFragment: "removeGame", values: [string]): string;
  encodeFunctionData(
    functionFragment: "removeWegaProtocolAdmin",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeWegaProtocolAdmins",
    values: [AddressLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceWegaProtocolAdmin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "rotateWegaProtocolAdmin",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setGameConfiguration",
    values: [IWegaGameController.GameSettingsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "winners",
    values: [string, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WEGA_PROTOCOL_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__WegaController_init",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__WegaController_init_unchained",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addWegaProtocolAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addWegaProtocolAdmins",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "closeWegaProtocolAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositOrPlay(bytes32,uint256[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositOrPlay(bytes32,uint256[],uint256[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc20Escrow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "existsGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "gameResults",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getGameSettings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isWegaProtocolAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "playerScore",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "players", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "randomizerController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerGame",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "removeGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeWegaProtocolAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeWegaProtocolAdmins",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceWegaProtocolAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rotateWegaProtocolAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGameConfiguration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "winners", data: BytesLike): Result;
}

export namespace AdminChangedEvent {
  export type InputTuple = [previousAdmin: AddressLike, newAdmin: AddressLike];
  export type OutputTuple = [previousAdmin: string, newAdmin: string];
  export interface OutputObject {
    previousAdmin: string;
    newAdmin: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BeaconUpgradedEvent {
  export type InputTuple = [beacon: AddressLike];
  export type OutputTuple = [beacon: string];
  export interface OutputObject {
    beacon: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameCreationEvent {
  export type InputTuple = [
    escrowHash: BytesLike,
    nonce: BigNumberish,
    creator: AddressLike,
    name: string
  ];
  export type OutputTuple = [
    escrowHash: string,
    nonce: bigint,
    creator: string,
    name: string
  ];
  export interface OutputObject {
    escrowHash: string;
    nonce: bigint;
    creator: string;
    name: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameRegistrationEvent {
  export type InputTuple = [name: string, gameAddress: AddressLike];
  export type OutputTuple = [name: string, gameAddress: string];
  export interface OutputObject {
    name: string;
    gameAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetGameEvent {
  export type InputTuple = [
    name: string,
    denominator: BigNumberish,
    minRounds: BigNumberish,
    requiredPlayers: BigNumberish,
    proxy: AddressLike,
    randomNumberController: AddressLike
  ];
  export type OutputTuple = [
    name: string,
    denominator: bigint,
    minRounds: bigint,
    requiredPlayers: bigint,
    proxy: string,
    randomNumberController: string
  ];
  export interface OutputObject {
    name: string;
    denominator: bigint;
    minRounds: bigint;
    requiredPlayers: bigint;
    proxy: string;
    randomNumberController: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UpgradedEvent {
  export type InputTuple = [implementation: AddressLike];
  export type OutputTuple = [implementation: string];
  export interface OutputObject {
    implementation: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WinnerDeclarationEvent {
  export type InputTuple = [escrowHash: BytesLike, winners: AddressLike[]];
  export type OutputTuple = [escrowHash: string, winners: string[]];
  export interface OutputObject {
    escrowHash: string;
    winners: string[];
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface WegaGameController extends BaseContract {
  connect(runner?: ContractRunner | null): WegaGameController;
  waitForDeployment(): Promise<this>;

  interface: WegaGameControllerInterface;

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

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  WEGA_PROTOCOL_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  __WegaController_init: TypedContractMethod<
    [
      erc20EscrowAddress: AddressLike,
      gameSettings: IWegaGameController.GameSettingsStruct[]
    ],
    [void],
    "nonpayable"
  >;

  __WegaController_init_unchained: TypedContractMethod<
    [
      erc20EscrowAddress: AddressLike,
      gameSettings: IWegaGameController.GameSettingsStruct[]
    ],
    [void],
    "nonpayable"
  >;

  addWegaProtocolAdmin: TypedContractMethod<
    [account: AddressLike],
    [void],
    "nonpayable"
  >;

  addWegaProtocolAdmins: TypedContractMethod<
    [accounts: AddressLike[]],
    [void],
    "nonpayable"
  >;

  closeWegaProtocolAdmin: TypedContractMethod<
    [receiver: AddressLike],
    [void],
    "payable"
  >;

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

  erc20Escrow: TypedContractMethod<[], [string], "view">;

  existsGame: TypedContractMethod<[game: string], [boolean], "view">;

  gameResults: TypedContractMethod<
    [game: string, escrowHash: BytesLike, player: AddressLike],
    [bigint[]],
    "view"
  >;

  getGame: TypedContractMethod<
    [escrowHash: BytesLike],
    [IWega.WegaStructOutput],
    "view"
  >;

  getGameSettings: TypedContractMethod<
    [game: string],
    [IWegaGameController.GameSettingsStructOutput],
    "view"
  >;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  initialize: TypedContractMethod<
    [
      erc20EscrowAddress: AddressLike,
      randomizerController_: AddressLike,
      gameSettings: IWegaGameController.GameSettingsStruct[]
    ],
    [void],
    "nonpayable"
  >;

  isWegaProtocolAdmin: TypedContractMethod<
    [account: AddressLike],
    [boolean],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  playerScore: TypedContractMethod<
    [game: string, escrowHash: BytesLike, player: AddressLike],
    [bigint],
    "view"
  >;

  players: TypedContractMethod<[escrowHash: BytesLike], [string[]], "view">;

  proxiableUUID: TypedContractMethod<[], [string], "view">;

  randomizerController: TypedContractMethod<[], [string], "view">;

  registerGame: TypedContractMethod<
    [config: IWegaGameController.GameSettingsStruct],
    [void],
    "nonpayable"
  >;

  removeGame: TypedContractMethod<[game: string], [void], "nonpayable">;

  removeWegaProtocolAdmin: TypedContractMethod<
    [account: AddressLike],
    [void],
    "nonpayable"
  >;

  removeWegaProtocolAdmins: TypedContractMethod<
    [accounts: AddressLike[]],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  renounceRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceWegaProtocolAdmin: TypedContractMethod<[], [void], "nonpayable">;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  rotateWegaProtocolAdmin: TypedContractMethod<
    [receiver: AddressLike],
    [void],
    "payable"
  >;

  setGameConfiguration: TypedContractMethod<
    [config: IWegaGameController.GameSettingsStruct],
    [void],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  upgradeTo: TypedContractMethod<
    [newImplementation: AddressLike],
    [void],
    "nonpayable"
  >;

  upgradeToAndCall: TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;

  winners: TypedContractMethod<
    [game: string, escrowHash: BytesLike],
    [string[]],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "DEFAULT_ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "WEGA_PROTOCOL_ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "__WegaController_init"
  ): TypedContractMethod<
    [
      erc20EscrowAddress: AddressLike,
      gameSettings: IWegaGameController.GameSettingsStruct[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "__WegaController_init_unchained"
  ): TypedContractMethod<
    [
      erc20EscrowAddress: AddressLike,
      gameSettings: IWegaGameController.GameSettingsStruct[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addWegaProtocolAdmin"
  ): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "addWegaProtocolAdmins"
  ): TypedContractMethod<[accounts: AddressLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "closeWegaProtocolAdmin"
  ): TypedContractMethod<[receiver: AddressLike], [void], "payable">;
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
    nameOrSignature: "erc20Escrow"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "existsGame"
  ): TypedContractMethod<[game: string], [boolean], "view">;
  getFunction(
    nameOrSignature: "gameResults"
  ): TypedContractMethod<
    [game: string, escrowHash: BytesLike, player: AddressLike],
    [bigint[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getGame"
  ): TypedContractMethod<
    [escrowHash: BytesLike],
    [IWega.WegaStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getGameSettings"
  ): TypedContractMethod<
    [game: string],
    [IWegaGameController.GameSettingsStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "grantRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "hasRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [
      erc20EscrowAddress: AddressLike,
      randomizerController_: AddressLike,
      gameSettings: IWegaGameController.GameSettingsStruct[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isWegaProtocolAdmin"
  ): TypedContractMethod<[account: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "playerScore"
  ): TypedContractMethod<
    [game: string, escrowHash: BytesLike, player: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "players"
  ): TypedContractMethod<[escrowHash: BytesLike], [string[]], "view">;
  getFunction(
    nameOrSignature: "proxiableUUID"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "randomizerController"
  ): TypedContractMethod<[], [string], "view">;
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
    nameOrSignature: "removeWegaProtocolAdmin"
  ): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeWegaProtocolAdmins"
  ): TypedContractMethod<[accounts: AddressLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceWegaProtocolAdmin"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "rotateWegaProtocolAdmin"
  ): TypedContractMethod<[receiver: AddressLike], [void], "payable">;
  getFunction(
    nameOrSignature: "setGameConfiguration"
  ): TypedContractMethod<
    [config: IWegaGameController.GameSettingsStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "upgradeTo"
  ): TypedContractMethod<
    [newImplementation: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "upgradeToAndCall"
  ): TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "winners"
  ): TypedContractMethod<
    [game: string, escrowHash: BytesLike],
    [string[]],
    "view"
  >;

  getEvent(
    key: "AdminChanged"
  ): TypedContractEvent<
    AdminChangedEvent.InputTuple,
    AdminChangedEvent.OutputTuple,
    AdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "BeaconUpgraded"
  ): TypedContractEvent<
    BeaconUpgradedEvent.InputTuple,
    BeaconUpgradedEvent.OutputTuple,
    BeaconUpgradedEvent.OutputObject
  >;
  getEvent(
    key: "GameCreation"
  ): TypedContractEvent<
    GameCreationEvent.InputTuple,
    GameCreationEvent.OutputTuple,
    GameCreationEvent.OutputObject
  >;
  getEvent(
    key: "GameRegistration"
  ): TypedContractEvent<
    GameRegistrationEvent.InputTuple,
    GameRegistrationEvent.OutputTuple,
    GameRegistrationEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "RoleAdminChanged"
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleGranted"
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: "RoleRevoked"
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;
  getEvent(
    key: "SetGame"
  ): TypedContractEvent<
    SetGameEvent.InputTuple,
    SetGameEvent.OutputTuple,
    SetGameEvent.OutputObject
  >;
  getEvent(
    key: "Upgraded"
  ): TypedContractEvent<
    UpgradedEvent.InputTuple,
    UpgradedEvent.OutputTuple,
    UpgradedEvent.OutputObject
  >;
  getEvent(
    key: "WinnerDeclaration"
  ): TypedContractEvent<
    WinnerDeclarationEvent.InputTuple,
    WinnerDeclarationEvent.OutputTuple,
    WinnerDeclarationEvent.OutputObject
  >;

  filters: {
    "AdminChanged(address,address)": TypedContractEvent<
      AdminChangedEvent.InputTuple,
      AdminChangedEvent.OutputTuple,
      AdminChangedEvent.OutputObject
    >;
    AdminChanged: TypedContractEvent<
      AdminChangedEvent.InputTuple,
      AdminChangedEvent.OutputTuple,
      AdminChangedEvent.OutputObject
    >;

    "BeaconUpgraded(address)": TypedContractEvent<
      BeaconUpgradedEvent.InputTuple,
      BeaconUpgradedEvent.OutputTuple,
      BeaconUpgradedEvent.OutputObject
    >;
    BeaconUpgraded: TypedContractEvent<
      BeaconUpgradedEvent.InputTuple,
      BeaconUpgradedEvent.OutputTuple,
      BeaconUpgradedEvent.OutputObject
    >;

    "GameCreation(bytes32,uint256,address,string)": TypedContractEvent<
      GameCreationEvent.InputTuple,
      GameCreationEvent.OutputTuple,
      GameCreationEvent.OutputObject
    >;
    GameCreation: TypedContractEvent<
      GameCreationEvent.InputTuple,
      GameCreationEvent.OutputTuple,
      GameCreationEvent.OutputObject
    >;

    "GameRegistration(string,address)": TypedContractEvent<
      GameRegistrationEvent.InputTuple,
      GameRegistrationEvent.OutputTuple,
      GameRegistrationEvent.OutputObject
    >;
    GameRegistration: TypedContractEvent<
      GameRegistrationEvent.InputTuple,
      GameRegistrationEvent.OutputTuple,
      GameRegistrationEvent.OutputObject
    >;

    "Initialized(uint8)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    "RoleGranted(bytes32,address,address)": TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    "RoleRevoked(bytes32,address,address)": TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;

    "SetGame(string,uint256,uint256,uint256,address,address)": TypedContractEvent<
      SetGameEvent.InputTuple,
      SetGameEvent.OutputTuple,
      SetGameEvent.OutputObject
    >;
    SetGame: TypedContractEvent<
      SetGameEvent.InputTuple,
      SetGameEvent.OutputTuple,
      SetGameEvent.OutputObject
    >;

    "Upgraded(address)": TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;
    Upgraded: TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;

    "WinnerDeclaration(bytes32,address[])": TypedContractEvent<
      WinnerDeclarationEvent.InputTuple,
      WinnerDeclarationEvent.OutputTuple,
      WinnerDeclarationEvent.OutputObject
    >;
    WinnerDeclaration: TypedContractEvent<
      WinnerDeclarationEvent.InputTuple,
      WinnerDeclarationEvent.OutputTuple,
      WinnerDeclarationEvent.OutputObject
    >;
  };
}
