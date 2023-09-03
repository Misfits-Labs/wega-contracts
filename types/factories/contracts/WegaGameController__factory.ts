/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  WegaGameController,
  WegaGameControllerInterface,
} from "../../contracts/WegaGameController";

const _abi = [
  {
    inputs: [],
    name: "WegaGameController_InvalidGameState",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
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
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum IWega.WegaType",
        name: "gameType",
        type: "uint8",
      },
    ],
    name: "GameCreation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
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
        internalType: "address[]",
        name: "winners",
        type: "address[]",
      },
    ],
    name: "WinnerDeclaration",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "erc20EscrowAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "chanceContract",
        type: "address",
      },
    ],
    name: "__WegaGameController_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "erc20EscrowAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "chanceContract",
        type: "address",
      },
    ],
    name: "__WegaGameController_init_unchained",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "requiredPlayerNum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "wagerAmount",
        type: "uint256",
      },
      {
        internalType: "enum IWega.WegaType",
        name: "gameType",
        type: "uint8",
      },
    ],
    name: "createGameAndDepositInitialWager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "escrowHash",
        type: "bytes32",
      },
    ],
    name: "depositOrPlay",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "erc20EscrowAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "chanceContract",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b50608051611d9261004c600039600081816105260152818161056f015281816107320152818161077201526108050152611d926000f3fe6080604052600436106100a75760003560e01c80638da5cb5b116100645780638da5cb5b1461015e578063950e5ca314610190578063a0c8d2ec146101b0578063f155ba3e146101d0578063f2fde38b146101f0578063fe2810cf1461021057600080fd5b806327f2b6be146100ac5780633659cfe6146100ce578063485cc955146100ee5780634f1ef2861461010e57806352d1902d14610121578063715018a614610149575b600080fd5b3480156100b857600080fd5b506100cc6100c7366004611840565b610230565b005b3480156100da57600080fd5b506100cc6100e936600461186e565b61051c565b3480156100fa57600080fd5b506100cc61010936600461188b565b610604565b6100cc61011c36600461190b565b610728565b34801561012d57600080fd5b506101366107f8565b6040519081526020015b60405180910390f35b34801561015557600080fd5b506100cc6108ab565b34801561016a57600080fd5b506033546001600160a01b03165b6040516001600160a01b039091168152602001610140565b34801561019c57600080fd5b506100cc6101ab36600461188b565b6108bf565b3480156101bc57600080fd5b506100cc6101cb3660046119b3565b6108f0565b3480156101dc57600080fd5b506100cc6101eb36600461188b565b610b5c565b3480156101fc57600080fd5b506100cc61020b36600461186e565b610c5f565b34801561021c57600080fd5b5060c954610178906001600160a01b031681565b600081815260d06020526040808220815160c081019092528054829060ff16600181111561026057610260611a01565b600181111561027157610271611a01565b81528154602090910190610100900460ff16600281111561029457610294611a01565b60028111156102a5576102a5611a01565b81526001820154602082015260028201546040808301919091526003830154606083015260049283015460809092019190915260c95490516331627f4360e21b81529182018590529192506000916001600160a01b03169063c589fd0c9060240160c060405180830381865afa158015610323573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103479190611a17565b905060008260200151600281111561036157610361611a01565b141580610384575060018260200151600281111561038157610381611a01565b14155b156103a257604051634c50cdb760e11b815260040160405180910390fd5b6000826020015160028111156103ba576103ba611a01565b036104b25760c9546001600160a01b031663d954863c843360408086015190516001600160e01b031960e086901b16815260048101939093526001600160a01b0390911660248301526044820152606401600060405180830381600087803b15801561042557600080fd5b505af1158015610439573d6000803e3d6000fd5b5050505081606001518260800151101561049357600083815260d06020526040812060030180549161046a83611abc565b919050555061048d6104793390565b600085815260cd6020526040902090610cd5565b50505050565b5050600090815260d060205260409020805461ff001916610100179055565b6001826020015160028111156104ca576104ca611a01565b0361051757600083815260cd602052604090206104fb9084906104ec90610cf3565b8460a001518560400151610d07565b600083815260d060205260409020805461ff0019166102001790555b505050565b6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300361056d5760405162461bcd60e51b815260040161056490611ad5565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166105b6600080516020611d3f833981519152546001600160a01b031690565b6001600160a01b0316146105dc5760405162461bcd60e51b815260040161056490611b21565b6105e581610dce565b6040805160008082526020820190925261060191839190610dd6565b50565b600054610100900460ff16158080156106245750600054600160ff909116105b8061063e5750303b15801561063e575060005460ff166001145b6106a15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610564565b6000805460ff1916600117905580156106c4576000805461ff0019166101001790555b6106cc610f41565b6106d683836108bf565b6106de610f70565b8015610517576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036107705760405162461bcd60e51b815260040161056490611ad5565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166107b9600080516020611d3f833981519152546001600160a01b031690565b6001600160a01b0316146107df5760405162461bcd60e51b815260040161056490611b21565b6107e882610dce565b6107f482826001610dd6565b5050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146108985760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610564565b50600080516020611d3f83398151915290565b6108b3610f97565b6108bd6000610ff1565b565b600054610100900460ff166108e65760405162461bcd60e51b815260040161056490611b6d565b6107f48282610b5c565b60c9546000906001600160a01b031663e6528f7e86336040516001600160e01b031960e085901b1681526001600160a01b0392831660048201529116602482015260448101879052606481018690526084016020604051808303816000875af1158015610961573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109859190611bb8565b905061099f33600083815260cd6020526040902090610cd5565b506109da6040805160c08101909152806000815260200160008152602001600081526020016000815260200160008152602001600081525090565b808360018111156109ed576109ed611a01565b90816001811115610a0057610a00611a01565b90525060006020820181905260ce90846001811115610a2157610a21611a01565b6001811115610a3257610a32611a01565b81526020019081526020016000205481604001818152505060cf6000846001811115610a6057610a60611a01565b6001811115610a7157610a71611a01565b8152602080820192909252604090810160009081205460a08501526060840188905260016080850181905285825260d090935220825181548493839160ff1916908381811115610ac357610ac3611a01565b021790555060208201518154829061ff001916610100836002811115610aeb57610aeb611a01565b021790555060408201516001820155606082015160028201556080820151600382015560a090910151600490910155817f122f81044deeaa6b583e56185be77c92b8072c1b97e817d2146c439dcdd03eec3385604051610b4c929190611bd1565b60405180910390a2505050505050565b600054610100900460ff16610b835760405162461bcd60e51b815260040161056490611b6d565b60c980546001600160a01b038085166001600160a01b03199283161790925560d2805492841692909116919091179055610bc160d180546001019055565b505060067fd3f5862f6f80175da7514904f3a889cc3cc8c4f3af5129e28cdeaee2baa6efc45560027f2c64b4c28102eb31817db0aae9385bd83769912689d15cb6b0f59dd7eff2061381905560cf60205260037fe02c59459e6ae69bba35526a32783b104c6119df0d640a9ac4990ec2f8d493a95560016000527f9bb4860ae4018b7a63008e1d4c4f2ef74d5a095e46377c820dc3f962c67498e855565b610c67610f97565b6001600160a01b038116610ccc5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610564565b61060181610ff1565b6000610cea836001600160a01b038416611043565b90505b92915050565b60606000610d0083611092565b9392505050565b610d158484836001866110ee565b506000610d2285856112be565b60c954604051630996a9eb60e21b81529192506001600160a01b03169063265aa7ac90610d559088908590600401611c0c565b600060405180830381600087803b158015610d6f57600080fd5b505af1158015610d83573d6000803e3d6000fd5b5050505080604051610d959190611c63565b6040519081900381209086907fff69779526003a42f2f0770ec16cc0c045617eacba78439d6509bdb13a0d1d9390600090a35050505050565b610601610f97565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610e09576105178361139f565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610e63575060408051601f3d908101601f19168201909252610e6091810190611bb8565b60015b610ec65760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610564565b600080516020611d3f8339815191528114610f355760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610564565b5061051783838361143b565b600054610100900460ff16610f685760405162461bcd60e51b815260040161056490611b6d565b6108bd611460565b600054610100900460ff166108bd5760405162461bcd60e51b815260040161056490611b6d565b6033546001600160a01b031633146108bd5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610564565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600081815260018301602052604081205461108a57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610ced565b506000610ced565b6060816000018054806020026020016040519081016040528092919081815260200182805480156110e257602002820191906000526020600020905b8154815260200190600101908083116110ce575b50505050509050919050565b600081831115611100575060016112b5565b6000855167ffffffffffffffff81111561111c5761111c6118c4565b604051908082528060200260200182016040528015611145578160200160208202803683370190505b50905060005b865181101561128e5760d2546000906001600160a01b031663e62bdf498861117260d15490565b8b868151811061118457611184611ca2565b60200260200101516040518463ffffffff1660e01b81526004016111c49392919092835260208301919091526001600160a01b0316604082015260600190565b6020604051808303816000875af11580156111e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112079190611bb8565b905061126c868260ca60008d815260200190815260200160002060008c878151811061123557611235611ca2565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206114909092919063ffffffff16565b5061127b60d180546001019055565b508061128681611abc565b91505061114b565b5061129a87878361149d565b6112b18787876112ab886001611cb8565b876110ee565b9150505b95945050505050565b606060006112cc8484611555565b905060005b835181101561137f57600085815260cb6020526040812085518492908790859081106112ff576112ff611ca2565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020540361136d5761136b84828151811061134257611342611ca2565b602002602001015160cc6000888152602001908152602001600020610cd590919063ffffffff16565b505b8061137781611abc565b9150506112d1565b50600084815260cc6020526040902061139790610cf3565b949350505050565b6001600160a01b0381163b61140c5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610564565b600080516020611d3f83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61144483611633565b6000825111806114515750805b156105175761048d8383611673565b600054610100900460ff166114875760405162461bcd60e51b815260040161056490611b6d565b6108bd33610ff1565b6000611397848484611698565b60006114a8826116b5565b905060005b835181101561154e57818382815181106114c9576114c9611ca2565b60200260200101510361153c5760cb600086815260200190815260200160002060008583815181106114fd576114fd611ca2565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020600081548092919061153690611abc565b91905055505b8061154681611abc565b9150506114ad565b5050505050565b600080825167ffffffffffffffff811115611572576115726118c4565b60405190808252806020026020018201604052801561159b578160200160208202803683370190505b50905060005b83518110156116295760cb600086815260200190815260200160002060008583815181106115d1576115d1611ca2565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000205482828151811061160c5761160c611ca2565b60209081029190910101528061162181611abc565b9150506115a1565b50611397816116b5565b61163c8161139f565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060610cea8383604051806060016040528060278152602001611d5f60279139611708565b600082815260028401602052604081208290556113978484611780565b6000805b8251811015611702576116ee828483815181106116d8576116d8611ca2565b602002602001015161178c90919063ffffffff16565b9150806116fa81611abc565b9150506116b9565b50919050565b6060600080856001600160a01b0316856040516117259190611cef565b600060405180830381855af49150503d8060008114611760576040519150601f19603f3d011682016040523d82523d6000602084013e611765565b606091505b5091509150611776868383876117a2565b9695505050505050565b6000610cea8383611043565b600081831161179b5781610cea565b5090919050565b6060831561181157825160000361180a576001600160a01b0385163b61180a5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610564565b5081611397565b61139783838151156118265781518083602001fd5b8060405162461bcd60e51b81526004016105649190611d0b565b60006020828403121561185257600080fd5b5035919050565b6001600160a01b038116811461060157600080fd5b60006020828403121561188057600080fd5b8135610d0081611859565b6000806040838503121561189e57600080fd5b82356118a981611859565b915060208301356118b981611859565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611903576119036118c4565b604052919050565b6000806040838503121561191e57600080fd5b823561192981611859565b915060208381013567ffffffffffffffff8082111561194757600080fd5b818601915086601f83011261195b57600080fd5b81358181111561196d5761196d6118c4565b61197f601f8201601f191685016118da565b9150808252878482850101111561199557600080fd5b80848401858401376000848284010152508093505050509250929050565b600080600080608085870312156119c957600080fd5b84356119d481611859565b935060208501359250604085013591506060850135600281106119f657600080fd5b939692955090935050565b634e487b7160e01b600052602160045260246000fd5b600060c08284031215611a2957600080fd5b60405160c0810181811067ffffffffffffffff82111715611a4c57611a4c6118c4565b604052825160048110611a5e57600080fd5b8082525060208301516020820152604083015160408201526060830151611a8481611859565b60608201526080838101519082015260a0928301519281019290925250919050565b634e487b7160e01b600052601160045260246000fd5b600060018201611ace57611ace611aa6565b5060010190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b600060208284031215611bca57600080fd5b5051919050565b6001600160a01b03831681526040810160028310611bff57634e487b7160e01b600052602160045260246000fd5b8260208301529392505050565b6000604082018483526020604081850152818551808452606086019150828701935060005b81811015611c565784516001600160a01b031683529383019391830191600101611c31565b5090979650505050505050565b815160009082906020808601845b83811015611c965781516001600160a01b031685529382019390820190600101611c71565b50929695505050505050565b634e487b7160e01b600052603260045260246000fd5b80820180821115610ced57610ced611aa6565b60005b83811015611ce6578181015183820152602001611cce565b50506000910152565b60008251611d01818460208701611ccb565b9190910192915050565b6020815260008251806020840152611d2a816040850160208701611ccb565b601f01601f1916919091016040019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000813000a";

type WegaGameControllerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WegaGameControllerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WegaGameController__factory extends ContractFactory {
  constructor(...args: WegaGameControllerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<WegaGameController> {
    return super.deploy(overrides || {}) as Promise<WegaGameController>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): WegaGameController {
    return super.attach(address) as WegaGameController;
  }
  override connect(signer: Signer): WegaGameController__factory {
    return super.connect(signer) as WegaGameController__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WegaGameControllerInterface {
    return new utils.Interface(_abi) as WegaGameControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WegaGameController {
    return new Contract(address, _abi, signerOrProvider) as WegaGameController;
  }
}
