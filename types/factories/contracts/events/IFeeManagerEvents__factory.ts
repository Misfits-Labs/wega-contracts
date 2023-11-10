/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IFeeManagerEvents,
  IFeeManagerEventsInterface,
} from "../../../contracts/events/IFeeManagerEvents";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "feeApplier",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "feeTaker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeShare",
        type: "uint256",
      },
    ],
    name: "SetFeeRule",
    type: "event",
  },
] as const;

export class IFeeManagerEvents__factory {
  static readonly abi = _abi;
  static createInterface(): IFeeManagerEventsInterface {
    return new utils.Interface(_abi) as IFeeManagerEventsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFeeManagerEvents {
    return new Contract(address, _abi, signerOrProvider) as IFeeManagerEvents;
  }
}