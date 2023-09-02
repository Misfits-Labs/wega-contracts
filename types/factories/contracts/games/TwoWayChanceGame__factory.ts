/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TwoWayChanceGame,
  TwoWayChanceGameInterface,
} from "../../../contracts/games/TwoWayChanceGame";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "randomNumbers",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    name: "isTrustedForwarder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "denominator",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "roll",
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

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161079738038061079783398101604081905261002f91610170565b600060805261003d81610043565b5061026a565b600061004e816100a0565b90505b815181101561009c57610089818383815181106100705761007061022d565b602002602001015160006100b160201b9092919060201c565b508061009481610243565b915050610051565b5050565b60006100ab826100c6565b92915050565b60006100be8484846100d1565b949350505050565b60006100ab826100ee565b600082815260028401602052604081208290556100be84846100f8565b60006100ab825490565b6000610104838361010b565b9392505050565b6000818152600183016020526040812054610152575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556100ab565b5060006100ab565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561018357600080fd5b82516001600160401b038082111561019a57600080fd5b818501915085601f8301126101ae57600080fd5b8151818111156101c0576101c061015a565b8060051b604051601f19603f830116810181811085821117156101e5576101e561015a565b60405291825284820192508381018501918883111561020357600080fd5b938501935b8285101561022157845184529385019392850192610208565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b60006001820161026357634e487b7160e01b600052601160045260246000fd5b5060010190565b6080516105136102846000396000606101526105136000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063572b6c0514610051578063875ff2b0146100a6578063bdfb747d146100bc578063e62bdf49146100d1575b600080fd5b61009161005f366004610351565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0390811691161490565b60405190151581526020015b60405180910390f35b6100ae6100e4565b60405190815260200161009d565b6100cf6100ca366004610382565b6100f5565b005b6100ae6100df366004610440565b610153565b60006100f06000610183565b905090565b60006101016000610183565b90505b815181101561014f5761013c8183838151811061012357610123610475565b602002602001015160006101949092919063ffffffff16565b5080610147816104a1565b915050610104565b5050565b60008061016084846101a9565b9050600061016e86836104ba565b6101799060016104dc565b9695505050505050565b600061018e82610202565b92915050565b60006101a184848461020d565b949350505050565b6000806101b66000610183565b90506000816101c542876104dc565b6101d8906001600160a01b0387166104ef565b6101e290446104dc565b6101ec91906104ba565b90506101f960008261022a565b95945050505050565b600061018e8261023d565b600082815260028401602052604081208290556101a18484610247565b60006102368383610253565b9392505050565b600061018e825490565b600061023683836102c7565b60008181526002830160205260408120548015158061027757506102778484610316565b6102365760405162461bcd60e51b815260206004820152601e60248201527f456e756d657261626c654d61703a206e6f6e6578697374656e74206b65790000604482015260640160405180910390fd5b600081815260018301602052604081205461030e5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561018e565b50600061018e565b6000610236838360008181526001830160205260408120541515610236565b80356001600160a01b038116811461034c57600080fd5b919050565b60006020828403121561036357600080fd5b61023682610335565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561039557600080fd5b823567ffffffffffffffff808211156103ad57600080fd5b818501915085601f8301126103c157600080fd5b8135818111156103d3576103d361036c565b8060051b604051601f19603f830116810181811085821117156103f8576103f861036c565b60405291825284820192508381018501918883111561041657600080fd5b938501935b828510156104345784358452938501939285019261041b565b98975050505050505050565b60008060006060848603121561045557600080fd5b833592506020840135915061046c60408501610335565b90509250925092565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016104b3576104b361048b565b5060010190565b6000826104d757634e487b7160e01b600052601260045260246000fd5b500690565b8082018082111561018e5761018e61048b565b808202811582820484141761018e5761018e61048b56fea164736f6c6343000813000a";

type TwoWayChanceGameConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TwoWayChanceGameConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TwoWayChanceGame__factory extends ContractFactory {
  constructor(...args: TwoWayChanceGameConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    randomNumbers: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TwoWayChanceGame> {
    return super.deploy(
      randomNumbers,
      overrides || {}
    ) as Promise<TwoWayChanceGame>;
  }
  override getDeployTransaction(
    randomNumbers: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(randomNumbers, overrides || {});
  }
  override attach(address: string): TwoWayChanceGame {
    return super.attach(address) as TwoWayChanceGame;
  }
  override connect(signer: Signer): TwoWayChanceGame__factory {
    return super.connect(signer) as TwoWayChanceGame__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TwoWayChanceGameInterface {
    return new utils.Interface(_abi) as TwoWayChanceGameInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TwoWayChanceGame {
    return new Contract(address, _abi, signerOrProvider) as TwoWayChanceGame;
  }
}
