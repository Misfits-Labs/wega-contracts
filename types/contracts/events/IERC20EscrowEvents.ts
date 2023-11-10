/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  Signer,
  utils,
} from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IERC20EscrowEventsInterface extends utils.Interface {
  functions: {};

  events: {
    "ApplyFees(bool)": EventFragment;
    "SetFeeManager(address)": EventFragment;
    "SetGameControler(address)": EventFragment;
    "SetWithdrawers(bytes32,address[])": EventFragment;
    "WagerDeposit(bytes32,uint256,address)": EventFragment;
    "WagerRequestCreation(bytes32,address,address,uint256)": EventFragment;
    "WagerWithdrawal(bytes32,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApplyFees"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetFeeManager"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetGameControler"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetWithdrawers"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WagerDeposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WagerRequestCreation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WagerWithdrawal"): EventFragment;
}

export interface ApplyFeesEventObject {
  areFeesApplied: boolean;
}
export type ApplyFeesEvent = TypedEvent<[boolean], ApplyFeesEventObject>;

export type ApplyFeesEventFilter = TypedEventFilter<ApplyFeesEvent>;

export interface SetFeeManagerEventObject {
  feeManager: string;
}
export type SetFeeManagerEvent = TypedEvent<[string], SetFeeManagerEventObject>;

export type SetFeeManagerEventFilter = TypedEventFilter<SetFeeManagerEvent>;

export interface SetGameControlerEventObject {
  gameController: string;
}
export type SetGameControlerEvent = TypedEvent<
  [string],
  SetGameControlerEventObject
>;

export type SetGameControlerEventFilter =
  TypedEventFilter<SetGameControlerEvent>;

export interface SetWithdrawersEventObject {
  escrowId: string;
  withdrawers: string[];
}
export type SetWithdrawersEvent = TypedEvent<
  [string, string[]],
  SetWithdrawersEventObject
>;

export type SetWithdrawersEventFilter = TypedEventFilter<SetWithdrawersEvent>;

export interface WagerDepositEventObject {
  escrowId: string;
  wager: BigNumber;
  player: string;
}
export type WagerDepositEvent = TypedEvent<
  [string, BigNumber, string],
  WagerDepositEventObject
>;

export type WagerDepositEventFilter = TypedEventFilter<WagerDepositEvent>;

export interface WagerRequestCreationEventObject {
  escrowId: string;
  token: string;
  creator: string;
  wager: BigNumber;
}
export type WagerRequestCreationEvent = TypedEvent<
  [string, string, string, BigNumber],
  WagerRequestCreationEventObject
>;

export type WagerRequestCreationEventFilter =
  TypedEventFilter<WagerRequestCreationEvent>;

export interface WagerWithdrawalEventObject {
  escrowHash: string;
  transferAmount: BigNumber;
  winner: string;
}
export type WagerWithdrawalEvent = TypedEvent<
  [string, BigNumber, string],
  WagerWithdrawalEventObject
>;

export type WagerWithdrawalEventFilter = TypedEventFilter<WagerWithdrawalEvent>;

export interface IERC20EscrowEvents extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IERC20EscrowEventsInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "ApplyFees(bool)"(
      areFeesApplied?: PromiseOrValue<boolean> | null
    ): ApplyFeesEventFilter;
    ApplyFees(
      areFeesApplied?: PromiseOrValue<boolean> | null
    ): ApplyFeesEventFilter;

    "SetFeeManager(address)"(
      feeManager?: PromiseOrValue<string> | null
    ): SetFeeManagerEventFilter;
    SetFeeManager(
      feeManager?: PromiseOrValue<string> | null
    ): SetFeeManagerEventFilter;

    "SetGameControler(address)"(
      gameController?: PromiseOrValue<string> | null
    ): SetGameControlerEventFilter;
    SetGameControler(
      gameController?: PromiseOrValue<string> | null
    ): SetGameControlerEventFilter;

    "SetWithdrawers(bytes32,address[])"(
      escrowId?: PromiseOrValue<BytesLike> | null,
      withdrawers?: PromiseOrValue<string>[] | null
    ): SetWithdrawersEventFilter;
    SetWithdrawers(
      escrowId?: PromiseOrValue<BytesLike> | null,
      withdrawers?: PromiseOrValue<string>[] | null
    ): SetWithdrawersEventFilter;

    "WagerDeposit(bytes32,uint256,address)"(
      escrowId?: PromiseOrValue<BytesLike> | null,
      wager?: PromiseOrValue<BigNumberish> | null,
      player?: PromiseOrValue<string> | null
    ): WagerDepositEventFilter;
    WagerDeposit(
      escrowId?: PromiseOrValue<BytesLike> | null,
      wager?: PromiseOrValue<BigNumberish> | null,
      player?: PromiseOrValue<string> | null
    ): WagerDepositEventFilter;

    "WagerRequestCreation(bytes32,address,address,uint256)"(
      escrowId?: PromiseOrValue<BytesLike> | null,
      token?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      wager?: null
    ): WagerRequestCreationEventFilter;
    WagerRequestCreation(
      escrowId?: PromiseOrValue<BytesLike> | null,
      token?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      wager?: null
    ): WagerRequestCreationEventFilter;

    "WagerWithdrawal(bytes32,uint256,address)"(
      escrowHash?: PromiseOrValue<BytesLike> | null,
      transferAmount?: PromiseOrValue<BigNumberish> | null,
      winner?: PromiseOrValue<string> | null
    ): WagerWithdrawalEventFilter;
    WagerWithdrawal(
      escrowHash?: PromiseOrValue<BytesLike> | null,
      transferAmount?: PromiseOrValue<BigNumberish> | null,
      winner?: PromiseOrValue<string> | null
    ): WagerWithdrawalEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}
