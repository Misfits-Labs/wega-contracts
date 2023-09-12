/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IWegaRandomNumberController,
  IWegaRandomNumberControllerInterface,
} from "../../contracts/IWegaRandomNumberController";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "randomNumbers",
        type: "uint256[]",
      },
    ],
    name: "addRandomNumbers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
    name: "randomNumbersCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IWegaRandomNumberController__factory {
  static readonly abi = _abi;
  static createInterface(): IWegaRandomNumberControllerInterface {
    return new utils.Interface(_abi) as IWegaRandomNumberControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWegaRandomNumberController {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IWegaRandomNumberController;
  }
}
