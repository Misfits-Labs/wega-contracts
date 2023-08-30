/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  GameController,
  GameControllerInterface,
} from "../../contracts/GameController";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "erc20EscrowAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "game",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WegaEscrow_CallerNotApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "WegaEscrow_InvalidState",
    type: "error",
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
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "DeclareWinner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "chanceContract",
    outputs: [
      {
        internalType: "contract ITwoWayChanceGame",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20Escrow",
    outputs: [
      {
        internalType: "contract IWegaERC20Escrow",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "escrowHash",
        type: "bytes32",
      },
      {
        internalType: "address[]",
        name: "players",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "rounds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "denominator",
        type: "uint256",
      },
    ],
    name: "playTwoWayChanceGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561000f575f80fd5b50604051610afa380380610afa83398101604081905261002e916100dd565b61003733610073565b600180546001600160a01b038481166001600160a01b03199283161783556004805491851691909216179055600380549091019055505061010e565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146100d8575f80fd5b919050565b5f80604083850312156100ee575f80fd5b6100f7836100c2565b9150610105602084016100c2565b90509250929050565b6109df8061011b5f395ff3fe608060405234801561000f575f80fd5b5060043610610060575f3560e01c80630148995314610064578063715018a6146100935780638da5cb5b1461009d578063a30993ed146100ad578063f2fde38b146100c0578063fe2810cf146100d3575b5f80fd5b600454610077906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b61009b6100e6565b005b5f546001600160a01b0316610077565b61009b6100bb3660046107cd565b6100f9565b61009b6100ce366004610893565b6105c3565b600154610077906001600160a01b031681565b6100ee610641565b6100f75f61069a565b565b6001546001600160a01b031663bde0c98885336040516001600160e01b031960e085901b16815260048101929092526001600160a01b03166024820152604401602060405180830381865afa158015610154573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061017891906108b5565b61019557604051631022a99960e31b815260040160405180910390fd5b600180546040516331627f4360e21b8152600481018790526001600160a01b039091169063c589fd0c9060240160c060405180830381865afa1580156101dd573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061020191906108f8565b516003811115610213576102136108d4565b14610231576040516368b1fd3f60e01b815260040160405180910390fd5b5f80838160015b828111610519576004545f906001600160a01b031663e62bdf498861025c60035490565b8c5f8151811061026e5761026e610983565b60200260200101516040518463ffffffff1660e01b81526004016102ae9392919092835260208301919091526001600160a01b0316604082015260600190565b6020604051808303815f875af11580156102ca573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102ee9190610997565b905061034f828260025f8e81526020019081526020015f205f8d5f8151811061031957610319610983565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020015f206106e99092919063ffffffff16565b5061035e600380546001019055565b6004545f906001600160a01b031663e62bdf498961037b60035490565b8d60018151811061038e5761038e610983565b60200260200101516040518463ffffffff1660e01b81526004016103ce9392919092835260208301919091526001600160a01b0316604082015260600190565b6020604051808303815f875af11580156103ea573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061040e9190610997565b905061043a838260025f8f81526020019081526020015f205f8e60018151811061031957610319610983565b50610449600380546001019055565b80821115610463578661045b816109ae565b975050610499565b8082101561047d5785610475816109ae565b965050610499565b86610487816109ae565b9750508580610495906109ae565b9650505b84831480156104a757508587145b156104c057846104b6816109ae565b9550505050610507565b8587116104e757896001815181106104da576104da610983565b6020026020010151610502565b895f815181106104f9576104f9610983565b60200260200101515b935050505b80610511816109ae565b915050610238565b506001546040516396560d2b60e01b8152600481018a90526001600160a01b038381166024830152909116906396560d2b906044015f604051808303815f87803b158015610565575f80fd5b505af1158015610577573d5f803e3d5ffd5b50506040516001600160a01b03841681528a92507f1bb0541679368426b4a98a31278d9e1257181c993231ec1f8897e4d7d1f63c19915060200160405180910390a25050505050505050565b6105cb610641565b6001600160a01b0381166106355760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b61063e8161069a565b50565b5f546001600160a01b031633146100f75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161062c565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f6106f58484846106fd565b949350505050565b5f82815260028401602052604081208290556106f584845f61071f8383610728565b90505b92915050565b5f81815260018301602052604081205461076d57508154600181810184555f848152602080822090930184905584548482528286019093526040902091909155610722565b505f610722565b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f1916810167ffffffffffffffff811182821017156107b1576107b1610774565b604052919050565b6001600160a01b038116811461063e575f80fd5b5f805f80608085870312156107e0575f80fd5b8435935060208086013567ffffffffffffffff808211156107ff575f80fd5b818801915088601f830112610812575f80fd5b81358181111561082457610824610774565b8060051b9150610835848301610788565b818152918301840191848101908b84111561084e575f80fd5b938501935b838510156108785784359250610868836107b9565b8282529385019390850190610853565b989b989a505050506040870135966060013595945050505050565b5f602082840312156108a3575f80fd5b81356108ae816107b9565b9392505050565b5f602082840312156108c5575f80fd5b815180151581146108ae575f80fd5b634e487b7160e01b5f52602160045260245ffd5b80516108f3816107b9565b919050565b5f60c08284031215610908575f80fd5b60405160c0810181811067ffffffffffffffff8211171561092b5761092b610774565b60405282516004811061093c575f80fd5b808252506020830151602082015260408301516040820152610960606084016108e8565b60608201526080830151608082015260a083015160a08201528091505092915050565b634e487b7160e01b5f52603260045260245ffd5b5f602082840312156109a7575f80fd5b5051919050565b5f600182016109cb57634e487b7160e01b5f52601160045260245ffd5b506001019056fea164736f6c6343000815000a";

type GameControllerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GameControllerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GameController__factory extends ContractFactory {
  constructor(...args: GameControllerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    erc20EscrowAddress: PromiseOrValue<string>,
    game: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GameController> {
    return super.deploy(
      erc20EscrowAddress,
      game,
      overrides || {}
    ) as Promise<GameController>;
  }
  override getDeployTransaction(
    erc20EscrowAddress: PromiseOrValue<string>,
    game: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      erc20EscrowAddress,
      game,
      overrides || {}
    );
  }
  override attach(address: string): GameController {
    return super.attach(address) as GameController;
  }
  override connect(signer: Signer): GameController__factory {
    return super.connect(signer) as GameController__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GameControllerInterface {
    return new utils.Interface(_abi) as GameControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GameController {
    return new Contract(address, _abi, signerOrProvider) as GameController;
  }
}
