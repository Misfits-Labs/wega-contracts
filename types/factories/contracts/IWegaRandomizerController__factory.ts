/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IWegaRandomizerController,
  IWegaRandomizerControllerInterface,
} from "../../contracts/IWegaRandomizerController";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newRandomizer",
        type: "address",
      },
    ],
    name: "RandomizerSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "denominator",
        type: "uint256",
      },
    ],
    name: "generate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "incrementControllerNonce",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "randomNumbers",
        type: "uint256[]",
      },
    ],
    name: "seedRandomizer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newRandomizer",
        type: "address",
      },
    ],
    name: "setRandomizer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IWegaRandomizerController__factory {
  static readonly abi = _abi;
  static createInterface(): IWegaRandomizerControllerInterface {
    return new Interface(_abi) as IWegaRandomizerControllerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IWegaRandomizerController {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IWegaRandomizerController;
  }
}