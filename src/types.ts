import { BigNumber } from 'ethers';

export enum ArtifactName {
  WegaERC20Escrow = 'WegaERC20Escrow',
  WegaERC20Dummy = 'WegaERC20Dummy',
  WegaGameController = 'WegaGameController',
  WegaChanceGame = 'WegaChanceGame',
}

export enum ContractName {
  ProxyAdmin = 'ProxyAdmin',
  WegaERC20Escrow = 'WegaERC20Escrow',
  WegaERC20Dummy = 'WegaERC20Dummy',
  WegaGameController = 'WegaGameController',
  WegaChanceGame = 'WegaChanceGame',
}

export type DeployedContract = {
  address: string,
  implementation?: string,
  legacyAddresses: string[],
  forwarder?: string,
  deprecated?: boolean;
  deploymentBlock: string,
} 

export type DeployedContractList = { // hndsNetworkConfig
  contracts: DeployedContractMap
}

export type DeployedContractMap = { // hdnsContractConfigMap 
  [k in ContractName]: DeployedContract
}

export type DeployedContractsConfig = { // hdnsConfig
  version?: string;
  networks: {
    [chainId: number]: DeployedContractList
  };
}

export type DependenciesMap = {
  [k in ArtifactName]?: DeployedContract
}

export enum TransactionState { OPEN, PENDING, READY, CLOSED }
export enum GameState { WAITING, PLAYED }
export enum GameType { DICE, COINFLIP }


// For DRAND
export type RandomNumbersConfig = {
  [chainId: number]: {
    lastParsedRound: number;
    lastStoredIndex?: number;
    drands: ({ round: number, randomness: string, signature: string })[];
  }
}
 