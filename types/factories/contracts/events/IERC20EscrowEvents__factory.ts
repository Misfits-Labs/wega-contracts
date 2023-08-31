/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IERC20EscrowEvents,
  IERC20EscrowEventsInterface,
} from "../../../contracts/events/IERC20EscrowEvents";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "gameController",
        type: "address",
      },
    ],
    name: "SetGameControler",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "escrowId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "withdrawer",
        type: "address",
      },
    ],
    name: "SetWithdrawer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "escrowId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "wager",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "WagerDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "escrowId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wager",
        type: "uint256",
      },
    ],
    name: "WagerRequestCreation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "escrowHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "transferAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "WagerWithdrawal",
    type: "event",
  },
] as const;

export class IERC20EscrowEvents__factory {
  static readonly abi = _abi;
  static createInterface(): IERC20EscrowEventsInterface {
    return new utils.Interface(_abi) as IERC20EscrowEventsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC20EscrowEvents {
    return new Contract(address, _abi, signerOrProvider) as IERC20EscrowEvents;
  }
}
