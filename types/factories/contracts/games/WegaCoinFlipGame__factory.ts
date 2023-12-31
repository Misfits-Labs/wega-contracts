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
  WegaCoinFlipGame,
  WegaCoinFlipGameInterface,
} from "../../../contracts/games/WegaCoinFlipGame";

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
    ],
    name: "multiplePlayersResults",
    outputs: [
      {
        internalType: "uint256[][]",
        name: "results",
        type: "uint256[][]",
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
        name: "playerChoices",
        type: "uint256[]",
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
        internalType: "address[]",
        name: "currentPlayers",
        type: "address[]",
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
  "0x60a06040523060805234801561001457600080fd5b50608051611fed61003e600039600081816111580152818161118101526112c20152611fed6000f3fe6080604052600436106101ee5760003560e01c80637c7abd151161010d578063c12812e3116100a0578063d547741f1161006f578063d547741f146105e6578063da2eab5414610606578063e2edc48614610619578063f2fde38b14610639578063fcc35a361461065957600080fd5b8063c12812e314610571578063c4d66de814610593578063cf20013f146105b3578063d1456615146105d357600080fd5b806391d14854116100dc57806391d14854146104e9578063a217fddf14610509578063a297e7ad1461051e578063ad3cb1cc1461053357600080fd5b80637c7abd151461042957806387ed500f146104495780638ad51186146104695780638da5cb5b146104ac57600080fd5b806352d1902d116101855780636e00ffd2116101545780636e00ffd2146103ac578063709b5361146103c2578063715018a6146103e757806373902522146103fc57600080fd5b806352d1902d1461032a57806356e2bb5e1461033f57806362a562cf1461036c578063688a845b1461038c57600080fd5b80632f2ff15d116101c15780632f2ff15d146102b557806336568abe146102d75780634277f4fd146102f75780634f1ef2861461031757600080fd5b806301ffc9a7146101f3578063047d958c1461022857806319f8ebda1461025a578063248a9ca314610287575b600080fd5b3480156101ff57600080fd5b5061021361020e366004611988565b610679565b60405190151581526020015b60405180910390f35b34801561023457600080fd5b506000546001600160a01b03165b6040516001600160a01b03909116815260200161021f565b34801561026657600080fd5b5061027a610275366004611aa6565b6106b0565b60405161021f9190611b79565b34801561029357600080fd5b506102a76102a2366004611bc6565b6106e3565b60405190815260200161021f565b3480156102c157600080fd5b506102d56102d0366004611bdf565b610705565b005b3480156102e357600080fd5b506102d56102f2366004611bdf565b610727565b34801561030357600080fd5b5061027a610312366004611bc6565b61075f565b6102d5610325366004611c0f565b610779565b34801561033657600080fd5b506102a7610798565b34801561034b57600080fd5b5061035f61035a366004611bdf565b6107b5565b60405161021f9190611cf2565b34801561037857600080fd5b506102d5610387366004611d05565b610829565b34801561039857600080fd5b506102d56103a7366004611d3a565b610871565b3480156103b857600080fd5b506102a760045481565b3480156103ce57600080fd5b5061027a6103dd366004611d57565b6060949350505050565b3480156103f357600080fd5b506102d5610885565b34801561040857600080fd5b5061041c610417366004611dae565b610899565b60405161021f9190611df5565b34801561043557600080fd5b506102d5610444366004611d3a565b610951565b34801561045557600080fd5b506102d5610464366004611d3a565b61095e565b34801561047557600080fd5b506102a7610484366004611bdf565b60009182526002602090815260408084206001600160a01b0393909316845291905290205490565b3480156104b857600080fd5b507f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b0316610242565b3480156104f557600080fd5b50610213610504366004611bdf565b610988565b34801561051557600080fd5b506102a7600081565b34801561052a57600080fd5b506102d56109c0565b34801561053f57600080fd5b50610564604051806040016040528060058152602001640352e302e360dc1b81525081565b60405161021f9190611e7b565b34801561057d57600080fd5b506102a7600080516020611fc183398151915281565b34801561059f57600080fd5b506102d56105ae366004611d3a565b6109d8565b3480156105bf57600080fd5b506102d56105ce366004611d05565b610b36565b6102d56105e1366004611d3a565b610b7e565b3480156105f257600080fd5b506102d5610601366004611bdf565b610c5d565b6102d5610614366004611d3a565b610c79565b34801561062557600080fd5b50610213610634366004611d3a565b610d11565b34801561064557600080fd5b506102d5610654366004611d3a565b610d2b565b34801561066557600080fd5b506102d5610674366004611d3a565b610d53565b60006001600160e01b03198216637965db0b60e01b14806106aa57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606004546106be81610d64565b6106cd87878787600188610d6e565b506106d88787610f37565b979650505050505050565b6000908152600080516020611f7f833981519152602052604090206001015490565b61070e826106e3565b61071781610d64565b6107218383611018565b50505050565b6001600160a01b03811633146107505760405163334bd91960e11b815260040160405180910390fd5b61075a82826110bd565b505050565b60008181526003602052604090206060906106aa90611139565b61078161114d565b61078a826111f2565b61079482826111fa565b5050565b60006107a26112b7565b50600080516020611f5f83398151915290565b60008281526001602090815260408083206001600160a01b038516845282529182902080548351818402810184019094528084526060939283018282801561081c57602002820191906000526020600020905b815481526020019060010190808311610808575b5050505050905092915050565b610831611300565b60005b81518110156107945761085f82828151811061085257610852611eae565b602002602001015161135b565b8061086981611eda565b915050610834565b610879611300565b61088281611373565b50565b61088d611300565b610897600061138b565b565b6060815167ffffffffffffffff8111156108b5576108b56119b2565b6040519080825280602002602001820160405280156108e857816020015b60608152602001906001900390816108d35790505b50905060005b825181101561094a5761091a8484838151811061090d5761090d611eae565b60200260200101516107b5565b82828151811061092c5761092c611eae565b6020026020010181905250808061094290611eda565b9150506108ee565b5092915050565b6109596113fc565b610882815b6109666113fc565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000918252600080516020611f7f833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610897600080516020611fc183398151915233610727565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015610a1e5750825b905060008267ffffffffffffffff166001148015610a3b5750303b155b905081158015610a49575080155b15610a675760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610a9157845460ff60401b1916600160401b1785555b610a99611445565b610aa161144d565b610aaa86610951565b7f5245c884765f598386b104eddc4b9179437165bef12b695749d575c8493d71a36004819055610ae890600080516020611fc1833981519152611487565b8315610b2e57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b610b3e611300565b60005b815181101561079457610b6c828281518110610b5f57610b5f611eae565b6020026020010151611373565b80610b7681611eda565b915050610b41565b610b8733610d11565b604051806060016040528060238152602001611f3c6023913990610bc75760405162461bcd60e51b8152600401610bbe9190611e7b565b60405180910390fd5b5060006001600160a01b0316816001600160a01b03161415604051806060016040528060228152602001611f9f6022913990610c165760405162461bcd60e51b8152600401610bbe9190611e7b565b50610c208161135b565b610c286109c0565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610794573d6000803e3d6000fd5b610c66826106e3565b610c6f81610d64565b61072183836110bd565b610c8233610d11565b604051806060016040528060238152602001611f3c6023913990610cb95760405162461bcd60e51b8152600401610bbe9190611e7b565b5060006001600160a01b0316816001600160a01b03161415604051806060016040528060228152602001611f9f6022913990610d085760405162461bcd60e51b8152600401610bbe9190611e7b565b50610c286109c0565b60006106aa600080516020611fc183398151915283610988565b610d33611300565b610d3c816114ea565b610d47600082611018565b50610882600033610727565b610d5b611300565b6108828161135b565b6108828133611525565b600081831115610d8057506001610f2d565b600080546040805163272bf2a560e01b815290516001600160a01b039092169263272bf2a59260048084019382900301818387803b158015610dc157600080fd5b505af1158015610dd5573d6000803e3d6000fd5b505060008054604051634a7dd52360e01b8152600481018990529193506001600160a01b03169150634a7dd523906024016020604051808303816000875af1158015610e25573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e499190611ef3565b905060005b8751811015610f1057600082888381518110610e6c57610e6c611eae565b602002602001015103610e8157506001610e85565b5060005b610ed98a8a8481518110610e9b57610e9b611eae565b60200260200101518360009283526001602081815260408086206001600160a01b039095168652938152928420805491820181558452919092200155565b610efd8a8a8481518110610eef57610eef611eae565b60200260200101518361155e565b5080610f0881611eda565b915050610e4e565b50610f2988888888610f23896001611f0c565b88610d6e565b9150505b9695505050505050565b60606000610f45848461159a565b905060005b8351811015610ff85760008581526002602052604081208551849290879085908110610f7857610f78611eae565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000205403610fe657610fe4848281518110610fbb57610fbb611eae565b60200260200101516003600088815260200190815260200160002061167890919063ffffffff16565b505b80610ff081611eda565b915050610f4a565b50600084815260036020526040902061101090611139565b949350505050565b6000600080516020611f7f8339815191526110338484610988565b6110b3576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556110693390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a460019150506106aa565b60009150506106aa565b6000600080516020611f7f8339815191526110d88484610988565b156110b3576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a460019150506106aa565b606060006111468361168d565b9392505050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614806111d457507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166111c8600080516020611f5f833981519152546001600160a01b031690565b6001600160a01b031614155b156108975760405163703e46dd60e11b815260040160405180910390fd5b610882611300565b816001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611254575060408051601f3d908101601f1916820190925261125191810190611ef3565b60015b61127c57604051634c9c8ce360e01b81526001600160a01b0383166004820152602401610bbe565b600080516020611f5f83398151915281146112ad57604051632a87526960e21b815260048101829052602401610bbe565b61075a83836116e9565b306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146108975760405163703e46dd60e11b815260040160405180910390fd5b336113327f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b0316146108975760405163118cdaa760e01b8152336004820152602401610bbe565b610794600080516020611fc183398151915282611018565b610882600080516020611fc183398151915282610c5d565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661089757604051631afcd79f60e31b815260040160405180910390fd5b6108976113fc565b6114556113fc565b61145e3361173f565b611466611445565b611471600033611018565b50610897600080516020611fc183398151915260005b600080516020611f7f83398151915260006114a1846106e3565b600085815260208490526040808220600101869055519192508491839187917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a450505050565b6114f2611300565b6001600160a01b03811661151c57604051631e4fbdf760e01b815260006004820152602401610bbe565b6108828161138b565b61152f8282610988565b6107945760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610bbe565b60008381526002602090815260408083206001600160a01b038616845290915281208054839290611590908490611f0c565b9091555050505050565b600080825167ffffffffffffffff8111156115b7576115b76119b2565b6040519080825280602002602001820160405280156115e0578160200160208202803683370190505b50905060005b835181101561166e5760026000868152602001908152602001600020600085838151811061161657611616611eae565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000205482828151811061165157611651611eae565b60209081029190910101528061166681611eda565b9150506115e6565b5061101081611750565b6000611146836001600160a01b0384166117a3565b6060816000018054806020026020016040519081016040528092919081815260200182805480156116dd57602002820191906000526020600020905b8154815260200190600101908083116116c9575b50505050509050919050565b6116f2826117f2565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a28051156117375761075a8282611857565b6107946118cd565b6117476113fc565b610882816118ec565b6000805b825181101561179d576117898284838151811061177357611773611eae565b60200260200101516118f490919063ffffffff16565b91508061179581611eda565b915050611754565b50919050565b60008181526001830160205260408120546117ea575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556106aa565b5060006106aa565b806001600160a01b03163b60000361182857604051634c9c8ce360e01b81526001600160a01b0382166004820152602401610bbe565b600080516020611f5f83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080846001600160a01b0316846040516118749190611f1f565b600060405180830381855af49150503d80600081146118af576040519150601f19603f3d011682016040523d82523d6000602084013e6118b4565b606091505b50915091506118c485838361190a565b95945050505050565b34156108975760405163b398979f60e01b815260040160405180910390fd5b6114f26113fc565b60008183116119035781611146565b5090919050565b60608261191f5761191a8261195f565b611146565b815115801561193657506001600160a01b0384163b155b1561094a57604051639996b31560e01b81526001600160a01b0385166004820152602401610bbe565b80511561196f5780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b60006020828403121561199a57600080fd5b81356001600160e01b03198116811461114657600080fd5b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156119f1576119f16119b2565b604052919050565b600067ffffffffffffffff821115611a1357611a136119b2565b5060051b60200190565b6001600160a01b038116811461088257600080fd5b600082601f830112611a4357600080fd5b81356020611a58611a53836119f9565b6119c8565b82815260059290921b84018101918181019086841115611a7757600080fd5b8286015b84811015611a9b578035611a8e81611a1d565b8352918301918301611a7b565b509695505050505050565b600080600080600060a08688031215611abe57600080fd5b8535945060208087013567ffffffffffffffff80821115611ade57600080fd5b611aea8a838b01611a32565b96506040890135915080821115611b0057600080fd5b508701601f81018913611b1257600080fd5b8035611b20611a53826119f9565b81815260059190911b8201830190838101908b831115611b3f57600080fd5b928401925b82841015611b5d57833582529284019290840190611b44565b989b979a50979860608101359850608001359695505050505050565b6020808252825182820181905260009190848201906040850190845b81811015611bba5783516001600160a01b031683529284019291840191600101611b95565b50909695505050505050565b600060208284031215611bd857600080fd5b5035919050565b60008060408385031215611bf257600080fd5b823591506020830135611c0481611a1d565b809150509250929050565b60008060408385031215611c2257600080fd5b8235611c2d81611a1d565b915060208381013567ffffffffffffffff80821115611c4b57600080fd5b818601915086601f830112611c5f57600080fd5b813581811115611c7157611c716119b2565b611c83601f8201601f191685016119c8565b91508082528784828501011115611c9957600080fd5b80848401858401376000848284010152508093505050509250929050565b600081518084526020808501945080840160005b83811015611ce757815187529582019590820190600101611ccb565b509495945050505050565b6020815260006111466020830184611cb7565b600060208284031215611d1757600080fd5b813567ffffffffffffffff811115611d2e57600080fd5b61101084828501611a32565b600060208284031215611d4c57600080fd5b813561114681611a1d565b60008060008060808587031215611d6d57600080fd5b84359350602085013567ffffffffffffffff811115611d8b57600080fd5b611d9787828801611a32565b949794965050505060408301359260600135919050565b60008060408385031215611dc157600080fd5b82359150602083013567ffffffffffffffff811115611ddf57600080fd5b611deb85828601611a32565b9150509250929050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015611e4a57603f19888603018452611e38858351611cb7565b94509285019290850190600101611e1c565b5092979650505050505050565b60005b83811015611e72578181015183820152602001611e5a565b50506000910152565b6020815260008251806020840152611e9a816040850160208701611e57565b601f01601f19169190910160400192915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201611eec57611eec611ec4565b5060010190565b600060208284031215611f0557600080fd5b5051919050565b808201808211156106aa576106aa611ec4565b60008251611f31818460208701611e57565b919091019291505056fe57656761416363657373436f6e74726f6c3a2043616c6c65724e6f74416c6c6f776564360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b62680057656761416363657373436f6e74726f6c3a2052656365697665724973456d707479efda5d9a1a0cecf3bb291502cc13ccbd4160d2b708e821b4eefa53251d1a0854a164736f6c6343000814000a";

type WegaCoinFlipGameConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WegaCoinFlipGameConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WegaCoinFlipGame__factory extends ContractFactory {
  constructor(...args: WegaCoinFlipGameConstructorParams) {
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
      WegaCoinFlipGame & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): WegaCoinFlipGame__factory {
    return super.connect(runner) as WegaCoinFlipGame__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WegaCoinFlipGameInterface {
    return new Interface(_abi) as WegaCoinFlipGameInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): WegaCoinFlipGame {
    return new Contract(address, _abi, runner) as unknown as WegaCoinFlipGame;
  }
}
