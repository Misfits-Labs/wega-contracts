/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  WegaRandomizerController,
  WegaRandomizerControllerInterface,
} from "../../contracts/WegaRandomizerController";

const _abi = [
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
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
        name: "newRandomizer",
        type: "address",
      },
    ],
    name: "RandomizerSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
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
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
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
    name: "GAME_CONTROLLER_ROLE",
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
    name: "GAME_ROLE",
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
    name: "RANDOMIZER",
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
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WEGA_PROTOCOL_ADMIN_ROLE",
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
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addWegaProtocolAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
    ],
    name: "addWegaProtocolAdmins",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
    ],
    name: "closeWegaProtocolAdmin",
    outputs: [],
    stateMutability: "payable",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRandomizer",
    outputs: [
      {
        internalType: "contract IWegaRandomizer",
        name: "randomizer",
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
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "isWegaProtocolAdmin",
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
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "removeWegaProtocolAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
    ],
    name: "removeWegaProtocolAdmins",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceWegaProtocolAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
    ],
    name: "rotateWegaProtocolAdmin",
    outputs: [],
    stateMutability: "payable",
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
        name: "randomizer",
        type: "address",
      },
    ],
    name: "setRandomizer",
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
    name: "spawnRandomizer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
  "0x60a06040523060805234801561001457600080fd5b5060805161279d61003e60003960008181611092015281816110bc015261120c015261279d6000f3fe6080604052600436106200020b5760003560e01c8063a217fddf1162000117578063cf20013f11620000a1578063da2eab54116200006c578063da2eab541462000638578063e2edc486146200064f578063f2fde38b1462000674578063fcc35a36146200069957600080fd5b8063cf20013f14620005b2578063d145661514620005d7578063d248ae0b14620005ee578063d547741f146200061357600080fd5b8063b1b33c3a11620000e2578063b1b33c3a1462000526578063bad018991462000546578063c12812e31462000568578063c49b1078146200058d57600080fd5b8063a217fddf146200047f578063a297e7ad1462000496578063ab40070614620004ae578063ad3cb1cc14620004e457600080fd5b806362a562cf1162000199578063715018a61162000164578063715018a614620003ca578063767bcab514620003e25780638da5cb5b146200040757806391d14854146200045a57600080fd5b806362a562cf1462000336578063688a845b146200035b5780636e00ffd214620003805780636fe0e55914620003a557600080fd5b806336568abe11620001da57806336568abe14620002bd5780634a7dd52314620002e25780634f1ef286146200030757806352d1902d146200031e57600080fd5b806301ffc9a71462000210578063248a9ca3146200024a578063272bf2a5146200027e5780632f2ff15d1462000298575b600080fd5b3480156200021d57600080fd5b50620002356200022f3660046200184d565b620006be565b60405190151581526020015b60405180910390f35b3480156200025757600080fd5b506200026f6200026936600462001879565b620006f6565b60405190815260200162000241565b3480156200028b57600080fd5b506200029662000719565b005b348015620002a557600080fd5b5062000296620002b7366004620018a9565b62000821565b348015620002ca57600080fd5b5062000296620002dc366004620018a9565b62000849565b348015620002ef57600080fd5b506200026f6200030136600462001879565b62000884565b620002966200031836600462001926565b62000923565b3480156200032b57600080fd5b506200026f62000948565b3480156200034357600080fd5b50620002966200035536600462001a00565b62000968565b3480156200036857600080fd5b50620002966200037a36600462001aab565b620009bb565b3480156200038d57600080fd5b506200026f600080516020620026ef83398151915281565b348015620003b257600080fd5b5062000296620003c436600462001acb565b620009d0565b348015620003d757600080fd5b506200029662000afc565b348015620003ef57600080fd5b50620002966200040136600462001aab565b62000b14565b3480156200041457600080fd5b507f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b03165b6040516001600160a01b03909116815260200162000241565b3480156200046757600080fd5b506200023562000479366004620018a9565b62000b66565b3480156200048c57600080fd5b506200026f600081565b348015620004a357600080fd5b506200029662000b9f565b348015620004bb57600080fd5b506200026f7f6a64baf327d646d1bca72653e2a075d15fd6ac6d8cbd7f6ee03fc55875e0fa8881565b348015620004f157600080fd5b5062000517604051806040016040528060058152602001640352e302e360dc1b81525081565b60405162000241919062001b80565b3480156200053357600080fd5b506000546001600160a01b031662000441565b3480156200055357600080fd5b5060005462000441906001600160a01b031681565b3480156200057557600080fd5b506200026f6000805160206200277183398151915281565b3480156200059a57600080fd5b5062000296620005ac36600462001acb565b62000bba565b348015620005bf57600080fd5b5062000296620005d136600462001a00565b62000c0c565b62000296620005e836600462001aab565b62000c5f565b348015620005fb57600080fd5b50620002966200060d36600462001acb565b62000d44565b3480156200062057600080fd5b506200029662000632366004620018a9565b62000e26565b620002966200064936600462001aab565b62000e48565b3480156200065c57600080fd5b50620002356200066e36600462001aab565b62000eec565b3480156200068157600080fd5b50620002966200069336600462001aab565b62000f09565b348015620006a657600080fd5b5062000296620006b836600462001aab565b62000f39565b60006001600160e01b03198216637965db0b60e01b1480620006f057506301ffc9a760e01b6001600160e01b03198316145b92915050565b60009081526000805160206200272f833981519152602052604090206001015490565b62000734600080516020620026ef8339815191523362000b66565b80620007675750620007677f6a64baf327d646d1bca72653e2a075d15fd6ac6d8cbd7f6ee03fc55875e0fa883362000b66565b604051806060016040528060238152602001620026cc6023913990620007ab5760405162461bcd60e51b8152600401620007a2919062001b80565b60405180910390fd5b506000546001600160a01b03166001600160a01b031663d044955f6040518163ffffffff1660e01b81526004016020604051808303816000875af1158015620007f8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200081e919062001bb5565b50565b6200082c82620006f6565b620008378162000f4e565b62000843838362000f5a565b50505050565b6001600160a01b0381163314620008735760405163334bd91960e11b815260040160405180910390fd5b6200087f828262001006565b505050565b6000806200089a6000546001600160a01b031690565b6001600160a01b0316632e64cec16040518163ffffffff1660e01b8152600401602060405180830381865afa158015620008d8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620008fe919062001bb5565b905060006200090e848362001bcf565b6200091b90600162001c08565b949350505050565b6200092d62001087565b620009388262001130565b6200094482826200113a565b5050565b60006200095462001201565b506000805160206200270f83398151915290565b620009726200124b565b60005b81518110156200094457620009a682828151811062000998576200099862001c1e565b6020026020010151620012a9565b80620009b28162001c34565b91505062000975565b620009c56200124b565b6200081e81620012c4565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff1660008115801562000a175750825b905060008267ffffffffffffffff16600114801562000a355750303b155b90508115801562000a44575080155b1562000a635760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831562000a8e57845460ff60401b1916600160401b1785555b62000a98620012df565b62000aa2620012e9565b62000aad8662001332565b831562000af457845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b62000b066200124b565b62000b126000620013ac565b565b62000b1f3362000eec565b604051806060016040528060238152602001620026cc602391399062000b5a5760405162461bcd60e51b8152600401620007a2919062001b80565b506200081e816200141d565b60009182526000805160206200272f833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b62000b12600080516020620027718339815191523362000849565b62000bc53362000eec565b604051806060016040528060238152602001620026cc602391399062000c005760405162461bcd60e51b8152600401620007a2919062001b80565b506200081e8162001465565b62000c166200124b565b60005b8151811015620009445762000c4a82828151811062000c3c5762000c3c62001c1e565b6020026020010151620012c4565b8062000c568162001c34565b91505062000c19565b62000c6a3362000eec565b604051806060016040528060238152602001620026cc602391399062000ca55760405162461bcd60e51b8152600401620007a2919062001b80565b5060006001600160a01b0316816001600160a01b031614156040518060600160405280602281526020016200274f602291399062000cf85760405162461bcd60e51b8152600401620007a2919062001b80565b5062000d0481620012a9565b62000d0e62000b9f565b6040516001600160a01b038216903480156108fc02916000818181858888f1935050505015801562000944573d6000803e3d6000fd5b62000d5f600080516020620026ef8339815191523362000b66565b8062000d81575062000d81600080516020620027718339815191523362000b66565b604051806060016040528060238152602001620026cc602391399062000dbc5760405162461bcd60e51b8152600401620007a2919062001b80565b50600054604051631a51650760e01b81526001600160a01b0390911690631a5165079062000def90849060040162001c50565b600060405180830381600087803b15801562000e0a57600080fd5b505af115801562000e1f573d6000803e3d6000fd5b5050505050565b62000e3182620006f6565b62000e3c8162000f4e565b62000843838362001006565b62000e533362000eec565b604051806060016040528060238152602001620026cc602391399062000e8e5760405162461bcd60e51b8152600401620007a2919062001b80565b5060006001600160a01b0316816001600160a01b031614156040518060600160405280602281526020016200274f602291399062000ee15760405162461bcd60e51b8152600401620007a2919062001b80565b5062000d0e62000b9f565b6000620006f0600080516020620027718339815191528362000b66565b62000f136200124b565b62000f1e81620014ec565b62000f2b60008262000f5a565b506200081e60003362000849565b62000f436200124b565b6200081e81620012a9565b6200081e81336200152d565b60006000805160206200272f83398151915262000f78848462000b66565b62000ffb576000848152602082815260408083206001600160a01b03871684529091529020805460ff1916600117905562000fb03390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a46001915050620006f0565b6000915050620006f0565b60006000805160206200272f83398151915262001024848462000b66565b1562000ffb576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a46001915050620006f0565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614806200111157507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316620011056000805160206200270f833981519152546001600160a01b031690565b6001600160a01b031614155b1562000b125760405163703e46dd60e11b815260040160405180910390fd5b6200081e6200124b565b816001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801562001197575060408051601f3d908101601f19168201909252620011949181019062001bb5565b60015b620011c157604051634c9c8ce360e01b81526001600160a01b0383166004820152602401620007a2565b6000805160206200270f8339815191528114620011f557604051632a87526960e21b815260048101829052602401620007a2565b6200087f83836200156a565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161462000b125760405163703e46dd60e11b815260040160405180910390fd5b336200127e7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b03161462000b125760405163118cdaa760e01b8152336004820152602401620007a2565b62000944600080516020620027718339815191528262000f5a565b6200081e600080516020620027718339815191528262000e26565b62000b12620015c7565b620012f3620015c7565b620012fe3362001611565b62001308620012df565b6200131560003362000f5a565b5062000b1260008051602062002771833981519152600062001626565b6200133c620015c7565b62001366600080516020620026ef8339815191526000805160206200277183398151915262001626565b620013a17f6a64baf327d646d1bca72653e2a075d15fd6ac6d8cbd7f6ee03fc55875e0fa886000805160206200277183398151915262001626565b6200081e816200168c565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b600080546001600160a01b0319166001600160a01b038316908117825560405190917f0843e01ff4165f850f76b438690c042bb553a2a8a3531c53a59a62435ab9d8dc91a250565b60008160405162001476906200183f565b62001482919062001c50565b604051809103906000f0801580156200149f573d6000803e3d6000fd5b50600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f0843e01ff4165f850f76b438690c042bb553a2a8a3531c53a59a62435ab9d8dc9190a25050565b620014f66200124b565b6001600160a01b0381166200152257604051631e4fbdf760e01b815260006004820152602401620007a2565b6200081e81620013ac565b62001539828262000b66565b620009445760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401620007a2565b6200157582620016a1565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a2805115620015bd576200087f828262001709565b6200094462001785565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1662000b1257604051631afcd79f60e31b815260040160405180910390fd5b6200161b620015c7565b6200081e81620017a5565b6000805160206200272f83398151915260006200164384620006f6565b600085815260208490526040808220600101869055519192508491839187917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a450505050565b62001696620015c7565b6200081e8162001465565b806001600160a01b03163b600003620016d957604051634c9c8ce360e01b81526001600160a01b0382166004820152602401620007a2565b6000805160206200270f83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080846001600160a01b03168460405162001728919062001c96565b600060405180830381855af49150503d806000811462001765576040519150601f19603f3d011682016040523d82523d6000602084013e6200176a565b606091505b50915091506200177c858383620017af565b95945050505050565b341562000b125760405163b398979f60e01b815260040160405180910390fd5b620014f6620015c7565b606082620017c857620017c28262001815565b6200180e565b8151158015620017e057506001600160a01b0384163b155b156200180b57604051639996b31560e01b81526001600160a01b0385166004820152602401620007a2565b50805b9392505050565b805115620018265780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b610a178062001cb583390190565b6000602082840312156200186057600080fd5b81356001600160e01b0319811681146200180e57600080fd5b6000602082840312156200188c57600080fd5b5035919050565b6001600160a01b03811681146200081e57600080fd5b60008060408385031215620018bd57600080fd5b823591506020830135620018d18162001893565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156200191e576200191e620018dc565b604052919050565b600080604083850312156200193a57600080fd5b8235620019478162001893565b915060208381013567ffffffffffffffff808211156200196657600080fd5b818601915086601f8301126200197b57600080fd5b813581811115620019905762001990620018dc565b620019a4601f8201601f19168501620018f2565b91508082528784828501011115620019bb57600080fd5b80848401858401376000848284010152508093505050509250929050565b600067ffffffffffffffff821115620019f657620019f6620018dc565b5060051b60200190565b6000602080838503121562001a1457600080fd5b823567ffffffffffffffff81111562001a2c57600080fd5b8301601f8101851362001a3e57600080fd5b803562001a5562001a4f82620019d9565b620018f2565b81815260059190911b8201830190838101908783111562001a7557600080fd5b928401925b8284101562001aa057833562001a908162001893565b8252928401929084019062001a7a565b979650505050505050565b60006020828403121562001abe57600080fd5b81356200180e8162001893565b6000602080838503121562001adf57600080fd5b823567ffffffffffffffff81111562001af757600080fd5b8301601f8101851362001b0957600080fd5b803562001b1a62001a4f82620019d9565b81815260059190911b8201830190838101908783111562001b3a57600080fd5b928401925b8284101562001aa05783358252928401929084019062001b3f565b60005b8381101562001b7757818101518382015260200162001b5d565b50506000910152565b602081526000825180602084015262001ba181604085016020870162001b5a565b601f01601f19169190910160400192915050565b60006020828403121562001bc857600080fd5b5051919050565b60008262001bed57634e487b7160e01b600052601260045260246000fd5b500690565b634e487b7160e01b600052601160045260246000fd5b80820180821115620006f057620006f062001bf2565b634e487b7160e01b600052603260045260246000fd5b60006001820162001c495762001c4962001bf2565b5060010190565b6020808252825182820181905260009190848201906040850190845b8181101562001c8a5783518352928401929184019160010162001c6c565b50909695505050505050565b6000825162001caa81846020870162001b5a565b919091019291505056fe60806040523480156200001157600080fd5b5060405162000a1738038062000a17833981016040819052620000349162000277565b33806200005b57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000668162000079565b506200007281620000c9565b506200037e565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000620000d760026200016a565b90505b8151811015620001665762000116828281518110620000fd57620000fd62000340565b602002602001015160026200017d60201b90919060201c565b62000151576200014f8183838151811062000135576200013562000340565b602002602001015160026200019260201b9092919060201c565b505b806200015d8162000356565b915050620000da565b5050565b60006200017782620001a9565b92915050565b60006200018b8383620001b6565b9392505050565b6000620001a1848484620001c4565b949350505050565b60006200017782620001e3565b60006200018b8383620001ee565b60008281526002840160205260408120829055620001a1848462000207565b600062000177825490565b600081815260018301602052604081205415156200018b565b60006200018b83836000818152600183016020526040812054620002585750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000177565b50600062000177565b634e487b7160e01b600052604160045260246000fd5b600060208083850312156200028b57600080fd5b82516001600160401b0380821115620002a357600080fd5b818501915085601f830112620002b857600080fd5b815181811115620002cd57620002cd62000261565b8060051b604051601f19603f83011681018181108582111715620002f557620002f562000261565b6040529182528482019250838101850191888311156200031457600080fd5b938501935b82851015620003345784518452938501939285019262000319565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b6000600182016200037757634e487b7160e01b600052601160045260246000fd5b5060010190565b610689806200038e6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063875ff2b01161005b578063875ff2b0146100ee5780638da5cb5b146100f6578063d044955f14610111578063f2fde38b1461011957600080fd5b80631a5165071461008d5780632e64cec1146100a2578063715018a6146100bd5780637ecebe00146100c5575b600080fd5b6100a061009b366004610508565b61012c565b005b6100aa610140565b6040519081526020015b60405180910390f35b6100a0610205565b6100aa6100d33660046105c6565b6001600160a01b031660009081526001602052604090205490565b6100aa610219565b6000546040516001600160a01b0390911681526020016100b4565b6100aa61022a565b6100a06101273660046105c6565b61026d565b6101346102ad565b61013d816102da565b50565b60008061014d600261036a565b9050600081326101686100d36000546001600160a01b031690565b6101729043610605565b40424461018a6100d36000546001600160a01b031690565b6101949030610618565b60405160609590951b6bffffffffffffffffffffffff19166020860152603485019390935260548401919091526074830152609482015260b4016040516020818303038152906040528051906020012060001c6101f1919061062b565b90506101fe60028261037b565b9250505090565b61020d6102ad565b610217600061038e565b565b6000610225600261036a565b905090565b60006102346102ad565b6102256102496000546001600160a01b031690565b6001600160a01b031660009081526001602081905260409091208054918201905590565b6102756102ad565b6001600160a01b0381166102a457604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61013d8161038e565b6000546001600160a01b031633146102175760405163118cdaa760e01b815233600482015260240161029b565b60006102e6600261036a565b90505b81518110156103665761031f8282815181106103075761030761064d565b602002602001015160026103de90919063ffffffff16565b61035457610352818383815181106103395761033961064d565b602002602001015160026103ea9092919063ffffffff16565b505b8061035e81610663565b9150506102e9565b5050565b6000610375826103ff565b92915050565b6000610387838361040a565b9392505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006103878383610451565b60006103f784848461045d565b949350505050565b60006103758261047a565b600081815260028301602052604081205480158015610430575061042e8484610451565b155b156103875760405163015ab34360e11b81526004810184905260240161029b565b60006103878383610484565b600082815260028401602052604081208290556103f7848461049c565b6000610375825490565b60008181526001830160205260408120541515610387565b6000610387838360008181526001830160205260408120546104ea57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610375565b506000610375565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561051b57600080fd5b823567ffffffffffffffff8082111561053357600080fd5b818501915085601f83011261054757600080fd5b813581811115610559576105596104f2565b8060051b604051601f19603f8301168101818110858211171561057e5761057e6104f2565b60405291825284820192508381018501918883111561059c57600080fd5b938501935b828510156105ba578435845293850193928501926105a1565b98975050505050505050565b6000602082840312156105d857600080fd5b81356001600160a01b038116811461038757600080fd5b634e487b7160e01b600052601160045260246000fd5b81810381811115610375576103756105ef565b80820180821115610375576103756105ef565b60008261064857634e487b7160e01b600052601260045260246000fd5b500690565b634e487b7160e01b600052603260045260246000fd5b600060018201610675576106756105ef565b506001019056fea164736f6c6343000814000a57656761416363657373436f6e74726f6c3a2043616c6c65724e6f74416c6c6f7765645245c884765f598386b104eddc4b9179437165bef12b695749d575c8493d71a3360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b62680057656761416363657373436f6e74726f6c3a2052656365697665724973456d707479efda5d9a1a0cecf3bb291502cc13ccbd4160d2b708e821b4eefa53251d1a0854a164736f6c6343000814000a";

type WegaRandomizerControllerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WegaRandomizerControllerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WegaRandomizerController__factory extends ContractFactory {
  constructor(...args: WegaRandomizerControllerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      WegaRandomizerController & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): WegaRandomizerController__factory {
    return super.connect(runner) as WegaRandomizerController__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WegaRandomizerControllerInterface {
    return new Interface(_abi) as WegaRandomizerControllerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): WegaRandomizerController {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as WegaRandomizerController;
  }
}
