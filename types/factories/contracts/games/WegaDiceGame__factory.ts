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
import type { NonPayableOverrides } from "../../../common";
import type {
  WegaDiceGame,
  WegaDiceGameInterface,
} from "../../../contracts/games/WegaDiceGame";

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
        name: "randomNumberController",
        type: "address",
      },
    ],
    name: "__Wega_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "randomNumberController",
        type: "address",
      },
    ],
    name: "__Wega_init_unchained",
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
    inputs: [
      {
        internalType: "address",
        name: "randomNumberController",
        type: "address",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "escrowHash",
        type: "bytes32",
      },
      {
        internalType: "address[]",
        name: "currentPlayers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "playerChoises",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "currentRound",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minRounds",
        type: "uint256",
      },
    ],
    name: "play",
    outputs: [
      {
        internalType: "address[]",
        name: "winners_",
        type: "address[]",
      },
    ],
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
      {
        internalType: "address[]",
        name: "currentPlayers",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "denominator",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minRounds",
        type: "uint256",
      },
    ],
    name: "play",
    outputs: [
      {
        internalType: "address[]",
        name: "winners",
        type: "address[]",
      },
    ],
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
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "playerResults",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
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
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "playerScore",
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
    name: "randomNumbersContract",
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
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "escrowHash",
        type: "bytes32",
      },
    ],
    name: "winners",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405230608052348015610013575f80fd5b506080516123e46100485f395f81816106da0152818161071a015281816107d101528181610811015261089e01526123e45ff3fe6080604052600436106101db575f3560e01c80637c7abd15116100fd578063c4d66de811610092578063da2eab5411610062578063da2eab541461057e578063e2edc48614610591578063f2fde38b146105b0578063fcc35a36146105cf575f80fd5b8063c4d66de81461050e578063cf20013f1461052d578063d14566151461054c578063d547741f1461055f575f80fd5b806391d14854116100cd57806391d14854146104a8578063a217fddf146104c7578063a297e7ad146104da578063c12812e3146104ee575f80fd5b80637c7abd151461040b57806387ed500f1461042a5780638ad51186146104495780638da5cb5b1461048b575f80fd5b80634f1ef28611610173578063688a845b11610143578063688a845b146103a35780636e00ffd2146103c2578063709b5361146103d8578063715018a6146103f7575f80fd5b80634f1ef2861461033157806352d1902d1461034457806356e2bb5e1461035857806362a562cf14610384575f80fd5b80632f2ff15d116101ae5780632f2ff15d146102b357806336568abe146102d45780633659cfe6146102f35780634277f4fd14610312575f80fd5b806301ffc9a7146101df578063047d958c1461021357806319f8ebda14610245578063248a9ca314610277575b5f80fd5b3480156101ea575f80fd5b506101fe6101f9366004611ce6565b6105ee565b60405190151581526020015b60405180910390f35b34801561021e575f80fd5b5061012d546001600160a01b03165b6040516001600160a01b03909116815260200161020a565b348015610250575f80fd5b5061026a61025f366004611dfa565b606095945050505050565b60405161020a9190611ec5565b348015610282575f80fd5b506102a5610291366004611f11565b5f9081526097602052604090206001015490565b60405190815260200161020a565b3480156102be575f80fd5b506102d26102cd366004611f28565b610624565b005b3480156102df575f80fd5b506102d26102ee366004611f28565b61064d565b3480156102fe575f80fd5b506102d261030d366004611f56565b6106d0565b34801561031d575f80fd5b5061026a61032c366004611f11565b6107ad565b6102d261033f366004611f71565b6107c7565b34801561034f575f80fd5b506102a5610892565b348015610363575f80fd5b50610377610372366004611f28565b610943565b60405161020a9190612013565b34801561038f575f80fd5b506102d261039e36600461204a565b6109b5565b3480156103ae575f80fd5b506102d26103bd366004611f56565b6109fc565b3480156103cd575f80fd5b506102a56101325481565b3480156103e3575f80fd5b5061026a6103f236600461207c565b610a0d565b348015610402575f80fd5b506102d2610a3f565b348015610416575f80fd5b506102d2610425366004611f56565b610a52565b348015610435575f80fd5b506102d2610444366004611f56565b610a7d565b348015610454575f80fd5b506102a5610463366004611f28565b5f91825261012f602090815260408084206001600160a01b0393909316845291905290205490565b348015610496575f80fd5b506033546001600160a01b031661022d565b3480156104b3575f80fd5b506101fe6104c2366004611f28565b610ac6565b3480156104d2575f80fd5b506102a55f81565b3480156104e5575f80fd5b506102d2610af0565b3480156104f9575f80fd5b506102a55f805160206123b883398151915281565b348015610519575f80fd5b506102d2610528366004611f56565b610b07565b348015610538575f80fd5b506102d261054736600461204a565b610c61565b6102d261055a366004611f56565b610ca8565b34801561056a575f80fd5b506102d2610579366004611f28565b610d7a565b6102d261058c366004611f56565b610d9e565b34801561059c575f80fd5b506101fe6105ab366004611f56565b610e35565b3480156105bb575f80fd5b506102d26105ca366004611f56565b610e4d565b3480156105da575f80fd5b506102d26105e9366004611f56565b610e72565b5f6001600160e01b03198216637965db0b60e01b148061061e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b5f8281526097602052604090206001015461063e81610e83565b6106488383610e8d565b505050565b6001600160a01b03811633146106c25760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6106cc8282610f12565b5050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036107185760405162461bcd60e51b81526004016106b9906120cf565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166107605f8051602061234f833981519152546001600160a01b031690565b6001600160a01b0316146107865760405162461bcd60e51b81526004016106b99061211b565b61078f81610f78565b604080515f808252602082019092526107aa91839190610f80565b50565b5f8181526101306020526040902060609061061e906110ea565b6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300361080f5760405162461bcd60e51b81526004016106b9906120cf565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166108575f8051602061234f833981519152546001600160a01b031690565b6001600160a01b03161461087d5760405162461bcd60e51b81526004016106b99061211b565b61088682610f78565b6106cc82826001610f80565b5f306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146109315760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c000000000000000060648201526084016106b9565b505f8051602061234f83398151915290565b5f82815261012e602090815260408083206001600160a01b03851684528252918290208054835181840281018401909452808452606093928301828280156109a857602002820191905f5260205f20905b815481526020019060010190808311610994575b5050505050905092915050565b6109bd6110fd565b5f5b81518110156106cc576109ea8282815181106109dd576109dd612167565b6020026020010151611157565b806109f48161218f565b9150506109bf565b610a046110fd565b6107aa8161116e565b606061013254610a1c81610e83565b610a2a868686600187611185565b50610a358686611347565b9695505050505050565b610a476110fd565b610a505f611424565b565b5f54610100900460ff16610a785760405162461bcd60e51b81526004016106b9906121a7565b6107aa815b5f54610100900460ff16610aa35760405162461bcd60e51b81526004016106b9906121a7565b61012d80546001600160a01b0319166001600160a01b0392909216919091179055565b5f9182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610a505f805160206123b88339815191523361064d565b5f54610100900460ff1615808015610b2557505f54600160ff909116105b80610b3e5750303b158015610b3e57505f5460ff166001145b610ba15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016106b9565b5f805460ff191660011790558015610bc2575f805461ff0019166101001790555b610bca611475565b610bd261149b565b610bdb82610a52565b7f5245c884765f598386b104eddc4b9179437165bef12b695749d575c8493d71a3610132819055610c19905f805160206123b88339815191526114ee565b80156106cc575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b610c696110fd565b5f5b81518110156106cc57610c96828281518110610c8957610c89612167565b602002602001015161116e565b80610ca08161218f565b915050610c6b565b610cb133610e35565b60405180606001604052806023815260200161232c6023913990610ce85760405162461bcd60e51b81526004016106b99190612214565b505f6001600160a01b0316816001600160a01b031614156040518060600160405280602281526020016123966022913990610d365760405162461bcd60e51b81526004016106b99190612214565b50610d4081611157565b610d48610af0565b6040516001600160a01b038216903480156108fc02915f818181858888f193505050501580156106cc573d5f803e3d5ffd5b5f82815260976020526040902060010154610d9481610e83565b6106488383610f12565b610da733610e35565b60405180606001604052806023815260200161232c6023913990610dde5760405162461bcd60e51b81526004016106b99190612214565b505f6001600160a01b0316816001600160a01b031614156040518060600160405280602281526020016123966022913990610e2c5760405162461bcd60e51b81526004016106b99190612214565b50610d48610af0565b5f61061e5f805160206123b883398151915283610ac6565b610e556110fd565b610e5e81611538565b610e685f82610e8d565b6107aa5f3361064d565b610e7a6110fd565b6107aa81611157565b6107aa81336115ae565b610e978282610ac6565b6106cc575f8281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610ece3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610f1c8282610ac6565b156106cc575f8281526097602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6107aa6110fd565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610fb35761064883611607565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561100d575060408051601f3d908101601f1916820190925261100a91810190612246565b60015b6110705760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016106b9565b5f8051602061234f83398151915281146110de5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016106b9565b506106488383836116a2565b60605f6110f6836116cc565b9392505050565b6033546001600160a01b03163314610a505760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106b9565b6107aa5f805160206123b883398151915282610e8d565b6107aa5f805160206123b883398151915282610d7a565b5f818311156111965750600161133e565b5f855167ffffffffffffffff8111156111b1576111b1611d0d565b6040519080825280602002602001820160405280156111da578160200160208202803683370190505b5090505f5b86518110156113175761012d546001600160a01b031663d868f4c0876112056101315490565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303815f875af1158015611245573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906112699190612246565b82828151811061127b5761127b612167565b60200260200101818152505061129661013180546001019055565b611305888883815181106112ac576112ac612167565b60200260200101518484815181106112c6576112c6612167565b60200260200101515f92835261012e602090815260408085206001600160a01b0390941685529281529183208054600181018255908452919092200155565b8061130f8161218f565b9150506111df565b50611323878783611725565b61133a87878761133488600161225d565b87611185565b9150505b95945050505050565b60605f611354848461179a565b90505f5b8351811015611404575f85815261012f60205260408120855184929087908590811061138657611386612167565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020015f2054036113f2576113f08482815181106113c8576113c8612167565b60200260200101516101305f8881526020019081526020015f2061187390919063ffffffff16565b505b806113fc8161218f565b915050611358565b505f8481526101306020526040902061141c906110ea565b949350505050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b5f54610100900460ff16610a505760405162461bcd60e51b81526004016106b9906121a7565b5f54610100900460ff166114c15760405162461bcd60e51b81526004016106b9906121a7565b6114c9611887565b6114d1611475565b6114db5f33610e8d565b610a505f805160206123b88339815191525f5b5f82815260976020526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b6115406110fd565b6001600160a01b0381166115a55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016106b9565b6107aa81611424565b6115b88282610ac6565b6106cc576115c5816118b5565b6115d08360206118c7565b6040516020016115e1929190612270565b60408051601f198184030181529082905262461bcd60e51b82526106b991600401612214565b6001600160a01b0381163b6116745760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016106b9565b5f8051602061234f83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6116ab83611a5d565b5f825111806116b75750805b15610648576116c68383611a9c565b50505050565b6060815f0180548060200260200160405190810160405280929190818152602001828054801561171957602002820191905f5260205f20905b815481526020019060010190808311611705575b50505050509050919050565b5f61172f82611ac1565b90505f5b8351811015611793578183828151811061174f5761174f612167565b602002602001015103611781576117818585838151811061177257611772612167565b60200260200101516001611b13565b8061178b8161218f565b915050611733565b5050505050565b5f80825167ffffffffffffffff8111156117b6576117b6611d0d565b6040519080825280602002602001820160405280156117df578160200160208202803683370190505b5090505f5b83518110156118695761012f5f8681526020019081526020015f205f85838151811061181257611812612167565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020015f205482828151811061184c5761184c612167565b6020908102919091010152806118618161218f565b9150506117e4565b5061141c81611ac1565b5f6110f6836001600160a01b038416611b4f565b5f54610100900460ff166118ad5760405162461bcd60e51b81526004016106b9906121a7565b610a50611b9b565b606061061e6001600160a01b03831660145b60605f6118d58360026122e4565b6118e090600261225d565b67ffffffffffffffff8111156118f8576118f8611d0d565b6040519080825280601f01601f191660200182016040528015611922576020820181803683370190505b509050600360fc1b815f8151811061193c5761193c612167565b60200101906001600160f81b03191690815f1a905350600f60fb1b8160018151811061196a5761196a612167565b60200101906001600160f81b03191690815f1a9053505f61198c8460026122e4565b61199790600161225d565b90505b6001811115611a0e576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106119cb576119cb612167565b1a60f81b8282815181106119e1576119e1612167565b60200101906001600160f81b03191690815f1a90535060049490941c93611a07816122fb565b905061199a565b5083156110f65760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016106b9565b611a6681611607565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b905f90a250565b60606110f6838360405180606001604052806027815260200161236f60279139611bca565b5f805b8251811015611b0d57611af982848381518110611ae357611ae3612167565b6020026020010151611c3490919063ffffffff16565b915080611b058161218f565b915050611ac4565b50919050565b5f83815261012f602090815260408083206001600160a01b038616845290915281208054839290611b4590849061225d565b9091555050505050565b5f818152600183016020526040812054611b9457508154600181810184555f84815260208082209093018490558454848252828601909352604090209190915561061e565b505f61061e565b5f54610100900460ff16611bc15760405162461bcd60e51b81526004016106b9906121a7565b610a5033611424565b60605f80856001600160a01b031685604051611be69190612310565b5f60405180830381855af49150503d805f8114611c1e576040519150601f19603f3d011682016040523d82523d5f602084013e611c23565b606091505b5091509150610a3586838387611c49565b5f818311611c4257816110f6565b5090919050565b60608315611cb75782515f03611cb0576001600160a01b0385163b611cb05760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016106b9565b508161141c565b61141c8383815115611ccc5781518083602001fd5b8060405162461bcd60e51b81526004016106b99190612214565b5f60208284031215611cf6575f80fd5b81356001600160e01b0319811681146110f6575f80fd5b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611d4a57611d4a611d0d565b604052919050565b5f67ffffffffffffffff821115611d6b57611d6b611d0d565b5060051b60200190565b6001600160a01b03811681146107aa575f80fd5b5f82601f830112611d98575f80fd5b81356020611dad611da883611d52565b611d21565b82815260059290921b84018101918181019086841115611dcb575f80fd5b8286015b84811015611def578035611de281611d75565b8352918301918301611dcf565b509695505050505050565b5f805f805f60a08688031215611e0e575f80fd5b8535945060208087013567ffffffffffffffff80821115611e2d575f80fd5b611e398a838b01611d89565b96506040890135915080821115611e4e575f80fd5b508701601f81018913611e5f575f80fd5b8035611e6d611da882611d52565b81815260059190911b8201830190838101908b831115611e8b575f80fd5b928401925b82841015611ea957833582529284019290840190611e90565b989b979a50979860608101359850608001359695505050505050565b602080825282518282018190525f9190848201906040850190845b81811015611f055783516001600160a01b031683529284019291840191600101611ee0565b50909695505050505050565b5f60208284031215611f21575f80fd5b5035919050565b5f8060408385031215611f39575f80fd5b823591506020830135611f4b81611d75565b809150509250929050565b5f60208284031215611f66575f80fd5b81356110f681611d75565b5f8060408385031215611f82575f80fd5b8235611f8d81611d75565b915060208381013567ffffffffffffffff80821115611faa575f80fd5b818601915086601f830112611fbd575f80fd5b813581811115611fcf57611fcf611d0d565b611fe1601f8201601f19168501611d21565b91508082528784828501011115611ff6575f80fd5b80848401858401375f848284010152508093505050509250929050565b602080825282518282018190525f9190848201906040850190845b81811015611f055783518352928401929184019160010161202e565b5f6020828403121561205a575f80fd5b813567ffffffffffffffff811115612070575f80fd5b61141c84828501611d89565b5f805f806080858703121561208f575f80fd5b84359350602085013567ffffffffffffffff8111156120ac575f80fd5b6120b887828801611d89565b949794965050505060408301359260600135919050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b634e487b7160e01b5f52603260045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b5f600182016121a0576121a061217b565b5060010190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b5f5b8381101561220c5781810151838201526020016121f4565b50505f910152565b602081525f82518060208401526122328160408501602087016121f2565b601f01601f19169190910160400192915050565b5f60208284031215612256575f80fd5b5051919050565b8082018082111561061e5761061e61217b565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081525f83516122a78160178501602088016121f2565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516122d88160288401602088016121f2565b01602801949350505050565b808202811582820484141761061e5761061e61217b565b5f816123095761230961217b565b505f190190565b5f82516123218184602087016121f2565b919091019291505056fe57656761416363657373436f6e74726f6c3a2043616c6c65724e6f74416c6c6f776564360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c656457656761416363657373436f6e74726f6c3a2052656365697665724973456d707479efda5d9a1a0cecf3bb291502cc13ccbd4160d2b708e821b4eefa53251d1a0854a164736f6c6343000814000a";

type WegaDiceGameConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WegaDiceGameConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WegaDiceGame__factory extends ContractFactory {
  constructor(...args: WegaDiceGameConstructorParams) {
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
      WegaDiceGame & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): WegaDiceGame__factory {
    return super.connect(runner) as WegaDiceGame__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WegaDiceGameInterface {
    return new Interface(_abi) as WegaDiceGameInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): WegaDiceGame {
    return new Contract(address, _abi, runner) as unknown as WegaDiceGame;
  }
}
