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
        name: "account",
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
  "0x60a06040523060805234801561001457600080fd5b50608051612d7761004c6000396000818161088e015281816108d101528181610a1601528181610a590152610af10152612d776000f3fe6080604052600436106200020b5760003560e01c806391d148541162000117578063cf20013f11620000a1578063da2eab54116200006c578063da2eab54146200060d578063e2edc4861462000624578063f2fde38b1462000649578063fcc35a36146200066e57600080fd5b8063cf20013f1462000587578063d145661514620005ac578063d248ae0b14620005c3578063d547741f14620005e857600080fd5b8063b1b33c3a11620000e2578063b1b33c3a14620004f9578063bad01899146200051a578063c12812e3146200053d578063c49b1078146200056257600080fd5b806391d14854146200046f578063a217fddf1462000494578063a297e7ad14620004ab578063ab40070614620004c357600080fd5b806352d1902d11620001995780636fe0e55911620001645780636fe0e55914620003d9578063715018a614620003fe578063767bcab514620004165780638da5cb5b146200043b57600080fd5b806352d1902d146200035257806362a562cf146200036a578063688a845b146200038f5780636e00ffd214620003b457600080fd5b806336568abe11620001da57806336568abe14620002cc5780633659cfe614620002f15780634a7dd52314620003165780634f1ef286146200033b57600080fd5b806301ffc9a71462000210578063248a9ca3146200024a578063272bf2a5146200028d5780632f2ff15d14620002a7575b600080fd5b3480156200021d57600080fd5b50620002356200022f36600462001c90565b62000693565b60405190151581526020015b60405180910390f35b3480156200025757600080fd5b506200027e6200026936600462001cbc565b60009081526097602052604090206001015490565b60405190815260200162000241565b3480156200029a57600080fd5b50620002a5620006cb565b005b348015620002b457600080fd5b50620002a5620002c636600462001cec565b620007d4565b348015620002d957600080fd5b50620002a5620002eb36600462001cec565b62000802565b348015620002fe57600080fd5b50620002a56200031036600462001d1f565b62000884565b3480156200032357600080fd5b506200027e6200033536600462001cbc565b6200096c565b620002a56200034c36600462001d89565b62000a0c565b3480156200035f57600080fd5b506200027e62000ae4565b3480156200037757600080fd5b50620002a56200038936600462001e63565b62000b9a565b3480156200039c57600080fd5b50620002a5620003ae36600462001d1f565b62000bed565b348015620003c157600080fd5b506200027e60008051602062002cc283398151915281565b348015620003e657600080fd5b50620002a5620003f836600462001f0e565b62000c02565b3480156200040b57600080fd5b50620002a562000d31565b3480156200042357600080fd5b50620002a56200043536600462001d1f565b62000d49565b3480156200044857600080fd5b506033546001600160a01b03165b6040516001600160a01b03909116815260200162000241565b3480156200047c57600080fd5b50620002356200048e36600462001cec565b62000d9b565b348015620004a157600080fd5b506200027e600081565b348015620004b857600080fd5b50620002a562000dc6565b348015620004d057600080fd5b506200027e7f6a64baf327d646d1bca72653e2a075d15fd6ac6d8cbd7f6ee03fc55875e0fa8881565b3480156200050657600080fd5b5061012d546001600160a01b031662000456565b3480156200052757600080fd5b5061012d5462000456906001600160a01b031681565b3480156200054a57600080fd5b506200027e60008051602062002d4b83398151915281565b3480156200056f57600080fd5b50620002a56200058136600462001f0e565b62000de1565b3480156200059457600080fd5b50620002a5620005a636600462001e63565b62000e33565b620002a5620005bd36600462001d1f565b62000e86565b348015620005d057600080fd5b50620002a5620005e236600462001f0e565b62000f6b565b348015620005f557600080fd5b50620002a56200060736600462001cec565b62000ff1565b620002a56200061e36600462001d1f565b6200101a565b3480156200063157600080fd5b50620002356200064336600462001d1f565b620010be565b3480156200065657600080fd5b50620002a56200066836600462001d1f565b620010db565b3480156200067b57600080fd5b50620002a56200068d36600462001d1f565b6200110a565b60006001600160e01b03198216637965db0b60e01b1480620006c557506301ffc9a760e01b6001600160e01b03198316145b92915050565b620006e660008051602062002cc28339815191523362000d9b565b80620007195750620007197f6a64baf327d646d1bca72653e2a075d15fd6ac6d8cbd7f6ee03fc55875e0fa883362000d9b565b60405180606001604052806023815260200162002c9f60239139906200075d5760405162461bcd60e51b815260040162000754919062001fc3565b60405180910390fd5b5061012d546001600160a01b03166001600160a01b031663d044955f6040518163ffffffff1660e01b81526004016020604051808303816000875af1158015620007ab573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620007d1919062001ff8565b50565b600082815260976020526040902060010154620007f1816200111f565b620007fd83836200112b565b505050565b6001600160a01b0381163314620008745760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b606482015260840162000754565b620008808282620011b5565b5050565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003620008cf5760405162461bcd60e51b8152600401620007549062002012565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166200091a60008051602062002ce2833981519152546001600160a01b031690565b6001600160a01b031614620009435760405162461bcd60e51b815260040162000754906200205e565b6200094e816200121f565b60408051600080825260208201909252620007d19183919062001229565b6000806200098361012d546001600160a01b031690565b6001600160a01b0316632e64cec16040518163ffffffff1660e01b8152600401602060405180830381865afa158015620009c1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620009e7919062001ff8565b90506000620009f78483620020aa565b62000a04906001620020e3565b949350505050565b6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300362000a575760405162461bcd60e51b8152600401620007549062002012565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031662000aa260008051602062002ce2833981519152546001600160a01b031690565b6001600160a01b03161462000acb5760405162461bcd60e51b815260040162000754906200205e565b62000ad6826200121f565b620008808282600162001229565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161462000b865760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000606482015260840162000754565b5060008051602062002ce283398151915290565b62000ba4620013a1565b60005b8151811015620008805762000bd882828151811062000bca5762000bca620020f9565b6020026020010151620013fd565b8062000be4816200210f565b91505062000ba7565b62000bf7620013a1565b620007d18162001418565b600054610100900460ff161580801562000c235750600054600160ff909116105b8062000c3f5750303b15801562000c3f575060005460ff166001145b62000ca45760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840162000754565b6000805460ff19166001179055801562000cc8576000805461ff0019166101001790555b62000cd262001433565b62000cdc6200145d565b62000ce782620014c4565b801562000880576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b62000d3b620013a1565b62000d4760006200155e565b565b62000d5433620010be565b60405180606001604052806023815260200162002c9f602391399062000d8f5760405162461bcd60e51b815260040162000754919062001fc3565b50620007d181620015b0565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b62000d4760008051602062002d4b8339815191523362000802565b62000dec33620010be565b60405180606001604052806023815260200162002c9f602391399062000e275760405162461bcd60e51b815260040162000754919062001fc3565b50620007d181620015fb565b62000e3d620013a1565b60005b8151811015620008805762000e7182828151811062000e635762000e63620020f9565b602002602001015162001418565b8062000e7d816200210f565b91505062000e40565b62000e9133620010be565b60405180606001604052806023815260200162002c9f602391399062000ecc5760405162461bcd60e51b815260040162000754919062001fc3565b5060006001600160a01b0316816001600160a01b0316141560405180606001604052806022815260200162002d29602291399062000f1f5760405162461bcd60e51b815260040162000754919062001fc3565b5062000f2b81620013fd565b62000f3562000dc6565b6040516001600160a01b038216903480156108fc02916000818181858888f1935050505015801562000880573d6000803e3d6000fd5b60008051602062002cc283398151915262000f86816200111f565b61012d54604051631a51650760e01b81526001600160a01b0390911690631a5165079062000fb99085906004016200212b565b600060405180830381600087803b15801562000fd457600080fd5b505af115801562000fe9573d6000803e3d6000fd5b505050505050565b6000828152609760205260409020600101546200100e816200111f565b620007fd8383620011b5565b6200102533620010be565b60405180606001604052806023815260200162002c9f6023913990620010605760405162461bcd60e51b815260040162000754919062001fc3565b5060006001600160a01b0316816001600160a01b0316141560405180606001604052806022815260200162002d296022913990620010b35760405162461bcd60e51b815260040162000754919062001fc3565b5062000f3562000dc6565b6000620006c560008051602062002d4b8339815191528362000d9b565b620010e5620013a1565b620010f08162001686565b620010fd6000826200112b565b620007d160003362000802565b62001114620013a1565b620007d181620013fd565b620007d1813362001702565b62001137828262000d9b565b620008805760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620011713390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b620011c1828262000d9b565b15620008805760008281526097602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b620007d1620013a1565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156200125f57620007fd8362001766565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015620012bc575060408051601f3d908101601f19168201909252620012b99181019062001ff8565b60015b620013215760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b606482015260840162000754565b60008051602062002ce28339815191528114620013935760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b606482015260840162000754565b50620007fd83838362001805565b6033546001600160a01b0316331462000d475760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640162000754565b620007d160008051602062002d4b833981519152826200112b565b620007d160008051602062002d4b8339815191528262000ff1565b600054610100900460ff1662000d475760405162461bcd60e51b8152600401620007549062002171565b600054610100900460ff16620014875760405162461bcd60e51b8152600401620007549062002171565b6200149162001836565b6200149b62001433565b620014a86000336200112b565b62000d4760008051602062002d4b83398151915260006200186a565b600054610100900460ff16620014ee5760405162461bcd60e51b8152600401620007549062002171565b6200151860008051602062002cc283398151915260008051602062002d4b8339815191526200186a565b620015537f6a64baf327d646d1bca72653e2a075d15fd6ac6d8cbd7f6ee03fc55875e0fa8860008051602062002d4b8339815191526200186a565b620007d181620018b5565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61012d80546001600160a01b0319166001600160a01b0383169081179091556040517f0843e01ff4165f850f76b438690c042bb553a2a8a3531c53a59a62435ab9d8dc90600090a250565b6000816040516200160c9062001c82565b6200161891906200212b565b604051809103906000f08015801562001635573d6000803e3d6000fd5b5061012d80546001600160a01b0319166001600160a01b038316908117909155604051919250907f0843e01ff4165f850f76b438690c042bb553a2a8a3531c53a59a62435ab9d8dc90600090a25050565b62001690620013a1565b6001600160a01b038116620016f75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840162000754565b620007d1816200155e565b6200170e828262000d9b565b62000880576200171e81620018ea565b6200172b836020620018fd565b6040516020016200173e929190620021bc565b60408051601f198184030181529082905262461bcd60e51b8252620007549160040162001fc3565b6001600160a01b0381163b620017d55760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840162000754565b60008051602062002ce283398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b620018108362001abe565b6000825111806200181e5750805b15620007fd5762001830838362001b00565b50505050565b600054610100900460ff16620018605760405162461bcd60e51b8152600401620007549062002171565b62000d4762001b28565b600082815260976020526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b600054610100900460ff16620018df5760405162461bcd60e51b8152600401620007549062002171565b620007d181620015fb565b6060620006c56001600160a01b03831660145b606060006200190e83600262002235565b6200191b906002620020e3565b67ffffffffffffffff81111562001936576200193662001d3f565b6040519080825280601f01601f19166020018201604052801562001961576020820181803683370190505b509050600360fc1b816000815181106200197f576200197f620020f9565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110620019b157620019b1620020f9565b60200101906001600160f81b031916908160001a9053506000620019d784600262002235565b620019e4906001620020e3565b90505b600181111562001a66576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811062001a1c5762001a1c620020f9565b1a60f81b82828151811062001a355762001a35620020f9565b60200101906001600160f81b031916908160001a90535060049490941c9362001a5e816200224f565b9050620019e7565b50831562001ab75760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640162000754565b9392505050565b62001ac98162001766565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b606062001ab7838360405180606001604052806027815260200162002d026027913962001b5d565b600054610100900460ff1662001b525760405162461bcd60e51b8152600401620007549062002171565b62000d47336200155e565b6060600080856001600160a01b03168560405162001b7c919062002269565b600060405180830381855af49150503d806000811462001bb9576040519150601f19603f3d011682016040523d82523d6000602084013e62001bbe565b606091505b509150915062001bd18683838762001bdb565b9695505050505050565b6060831562001c4f57825160000362001c47576001600160a01b0385163b62001c475760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640162000754565b508162000a04565b62000a04838381511562001c665781518083602001fd5b8060405162461bcd60e51b815260040162000754919062001fc3565b610a17806200228883390190565b60006020828403121562001ca357600080fd5b81356001600160e01b03198116811462001ab757600080fd5b60006020828403121562001ccf57600080fd5b5035919050565b6001600160a01b0381168114620007d157600080fd5b6000806040838503121562001d0057600080fd5b82359150602083013562001d148162001cd6565b809150509250929050565b60006020828403121562001d3257600080fd5b813562001ab78162001cd6565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171562001d815762001d8162001d3f565b604052919050565b6000806040838503121562001d9d57600080fd5b823562001daa8162001cd6565b915060208381013567ffffffffffffffff8082111562001dc957600080fd5b818601915086601f83011262001dde57600080fd5b81358181111562001df35762001df362001d3f565b62001e07601f8201601f1916850162001d55565b9150808252878482850101111562001e1e57600080fd5b80848401858401376000848284010152508093505050509250929050565b600067ffffffffffffffff82111562001e595762001e5962001d3f565b5060051b60200190565b6000602080838503121562001e7757600080fd5b823567ffffffffffffffff81111562001e8f57600080fd5b8301601f8101851362001ea157600080fd5b803562001eb862001eb28262001e3c565b62001d55565b81815260059190911b8201830190838101908783111562001ed857600080fd5b928401925b8284101562001f0357833562001ef38162001cd6565b8252928401929084019062001edd565b979650505050505050565b6000602080838503121562001f2257600080fd5b823567ffffffffffffffff81111562001f3a57600080fd5b8301601f8101851362001f4c57600080fd5b803562001f5d62001eb28262001e3c565b81815260059190911b8201830190838101908783111562001f7d57600080fd5b928401925b8284101562001f035783358252928401929084019062001f82565b60005b8381101562001fba57818101518382015260200162001fa0565b50506000910152565b602081526000825180602084015262001fe481604085016020870162001f9d565b601f01601f19169190910160400192915050565b6000602082840312156200200b57600080fd5b5051919050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b600082620020c857634e487b7160e01b600052601260045260246000fd5b500690565b634e487b7160e01b600052601160045260246000fd5b80820180821115620006c557620006c5620020cd565b634e487b7160e01b600052603260045260246000fd5b600060018201620021245762002124620020cd565b5060010190565b6020808252825182820181905260009190848201906040850190845b81811015620021655783518352928401929184019160010162002147565b50909695505050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351620021f681601785016020880162001f9d565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516200222981602884016020880162001f9d565b01602801949350505050565b8082028115828204841417620006c557620006c5620020cd565b600081620022615762002261620020cd565b506000190190565b600082516200227d81846020870162001f9d565b919091019291505056fe60806040523480156200001157600080fd5b5060405162000a1738038062000a17833981016040819052620000349162000277565b33806200005b57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000668162000079565b506200007281620000c9565b506200037e565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000620000d760026200016a565b90505b8151811015620001665762000116828281518110620000fd57620000fd62000340565b602002602001015160026200017d60201b90919060201c565b62000151576200014f8183838151811062000135576200013562000340565b602002602001015160026200019260201b9092919060201c565b505b806200015d8162000356565b915050620000da565b5050565b60006200017782620001a9565b92915050565b60006200018b8383620001b6565b9392505050565b6000620001a1848484620001c4565b949350505050565b60006200017782620001e3565b60006200018b8383620001ee565b60008281526002840160205260408120829055620001a1848462000207565b600062000177825490565b600081815260018301602052604081205415156200018b565b60006200018b83836000818152600183016020526040812054620002585750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000177565b50600062000177565b634e487b7160e01b600052604160045260246000fd5b600060208083850312156200028b57600080fd5b82516001600160401b0380821115620002a357600080fd5b818501915085601f830112620002b857600080fd5b815181811115620002cd57620002cd62000261565b8060051b604051601f19603f83011681018181108582111715620002f557620002f562000261565b6040529182528482019250838101850191888311156200031457600080fd5b938501935b82851015620003345784518452938501939285019262000319565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b6000600182016200037757634e487b7160e01b600052601160045260246000fd5b5060010190565b610689806200038e6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063875ff2b01161005b578063875ff2b0146100ee5780638da5cb5b146100f6578063d044955f14610111578063f2fde38b1461011957600080fd5b80631a5165071461008d5780632e64cec1146100a2578063715018a6146100bd5780637ecebe00146100c5575b600080fd5b6100a061009b366004610508565b61012c565b005b6100aa610140565b6040519081526020015b60405180910390f35b6100a0610205565b6100aa6100d33660046105c6565b6001600160a01b031660009081526001602052604090205490565b6100aa610219565b6000546040516001600160a01b0390911681526020016100b4565b6100aa61022a565b6100a06101273660046105c6565b61026d565b6101346102ad565b61013d816102da565b50565b60008061014d600261036a565b9050600081326101686100d36000546001600160a01b031690565b6101729043610605565b40424461018a6100d36000546001600160a01b031690565b6101949030610618565b60405160609590951b6bffffffffffffffffffffffff19166020860152603485019390935260548401919091526074830152609482015260b4016040516020818303038152906040528051906020012060001c6101f1919061062b565b90506101fe60028261037b565b9250505090565b61020d6102ad565b610217600061038e565b565b6000610225600261036a565b905090565b60006102346102ad565b6102256102496000546001600160a01b031690565b6001600160a01b031660009081526001602081905260409091208054918201905590565b6102756102ad565b6001600160a01b0381166102a457604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61013d8161038e565b6000546001600160a01b031633146102175760405163118cdaa760e01b815233600482015260240161029b565b60006102e6600261036a565b90505b81518110156103665761031f8282815181106103075761030761064d565b602002602001015160026103de90919063ffffffff16565b61035457610352818383815181106103395761033961064d565b602002602001015160026103ea9092919063ffffffff16565b505b8061035e81610663565b9150506102e9565b5050565b6000610375826103ff565b92915050565b6000610387838361040a565b9392505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006103878383610451565b60006103f784848461045d565b949350505050565b60006103758261047a565b600081815260028301602052604081205480158015610430575061042e8484610451565b155b156103875760405163015ab34360e11b81526004810184905260240161029b565b60006103878383610484565b600082815260028401602052604081208290556103f7848461049c565b6000610375825490565b60008181526001830160205260408120541515610387565b6000610387838360008181526001830160205260408120546104ea57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610375565b506000610375565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561051b57600080fd5b823567ffffffffffffffff8082111561053357600080fd5b818501915085601f83011261054757600080fd5b813581811115610559576105596104f2565b8060051b604051601f19603f8301168101818110858211171561057e5761057e6104f2565b60405291825284820192508381018501918883111561059c57600080fd5b938501935b828510156105ba578435845293850193928501926105a1565b98975050505050505050565b6000602082840312156105d857600080fd5b81356001600160a01b038116811461038757600080fd5b634e487b7160e01b600052601160045260246000fd5b81810381811115610375576103756105ef565b80820180821115610375576103756105ef565b60008261064857634e487b7160e01b600052601260045260246000fd5b500690565b634e487b7160e01b600052603260045260246000fd5b600060018201610675576106756105ef565b506001019056fea164736f6c6343000814000a57656761416363657373436f6e74726f6c3a2043616c6c65724e6f74416c6c6f7765645245c884765f598386b104eddc4b9179437165bef12b695749d575c8493d71a3360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c656457656761416363657373436f6e74726f6c3a2052656365697665724973456d707479efda5d9a1a0cecf3bb291502cc13ccbd4160d2b708e821b4eefa53251d1a0854a164736f6c6343000814000a";

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
