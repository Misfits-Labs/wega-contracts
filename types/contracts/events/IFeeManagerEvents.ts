/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, BigNumber, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IFeeManagerEventsInterface extends utils.Interface {
  functions: {};

  events: {
    "SetFeeRule(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SetFeeRule"): EventFragment;
}

export interface SetFeeRuleEventObject {
  feeApplier: string;
  feeTaker: string;
  feeShare: BigNumber;
}
export type SetFeeRuleEvent = TypedEvent<
  [string, string, BigNumber],
  SetFeeRuleEventObject
>;

export type SetFeeRuleEventFilter = TypedEventFilter<SetFeeRuleEvent>;

export interface IFeeManagerEvents extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IFeeManagerEventsInterface;

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
    "SetFeeRule(address,address,uint256)"(
      feeApplier?: PromiseOrValue<string> | null,
      feeTaker?: PromiseOrValue<string> | null,
      feeShare?: null
    ): SetFeeRuleEventFilter;
    SetFeeRule(
      feeApplier?: PromiseOrValue<string> | null,
      feeTaker?: PromiseOrValue<string> | null,
      feeShare?: null
    ): SetFeeRuleEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}
