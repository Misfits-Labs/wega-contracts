/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IWegaERC721Escrow,
  IWegaERC721EscrowInterface,
} from "../../contracts/IWegaERC721Escrow";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "nftFor",
        type: "address",
      },
      {
        internalType: "address",
        name: "ownerFor",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenIdFor",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
    ],
    name: "cancelRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAgainst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenIdAgainst",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "createRequestAndDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentNonce",
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
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
    ],
    name: "depositNftForSide",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
    ],
    name: "getEscrowRequest",
    outputs: [
      {
        components: [
          {
            internalType: "enum IWegaERC721Escrow.TransactionState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "nftAgainst",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenIdAgainst",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "ownerAgainst",
            type: "address",
          },
          {
            internalType: "address",
            name: "nftFor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenIdFor",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "ownerFor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "transferId",
            type: "bytes32",
          },
        ],
        internalType: "struct IWegaERC721Escrow.EscrowRequest",
        name: "request_",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEscrowRequests",
    outputs: [
      {
        components: [
          {
            internalType: "enum IWegaERC721Escrow.TransactionState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "nftAgainst",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenIdAgainst",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "ownerAgainst",
            type: "address",
          },
          {
            internalType: "address",
            name: "nftFor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenIdFor",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "ownerFor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "transferId",
            type: "bytes32",
          },
        ],
        internalType: "struct IWegaERC721Escrow.EscrowRequest[]",
        name: "requests_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getEscrowRequestsOfUser",
    outputs: [
      {
        components: [
          {
            internalType: "enum IWegaERC721Escrow.TransactionState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "nftAgainst",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenIdAgainst",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "ownerAgainst",
            type: "address",
          },
          {
            internalType: "address",
            name: "nftFor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenIdFor",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "ownerFor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "transferId",
            type: "bytes32",
          },
        ],
        internalType: "struct IWegaERC721Escrow.EscrowRequest[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAgainst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenIdAgainst",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "ownerAgainst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "hash",
    outputs: [
      {
        internalType: "bytes32",
        name: "transferId_",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IWegaERC721Escrow__factory {
  static readonly abi = _abi;
  static createInterface(): IWegaERC721EscrowInterface {
    return new utils.Interface(_abi) as IWegaERC721EscrowInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWegaERC721Escrow {
    return new Contract(address, _abi, signerOrProvider) as IWegaERC721Escrow;
  }
}
