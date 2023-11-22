import { BigNumber, BigNumberish } from 'ethers';

export enum ArtifactName {
  WegaERC20Escrow = 'WegaERC20Escrow',
  WegaERC20Dummy = 'WegaERC20Dummy',
  WegaRandomNumberController = 'WegaRandomNumberController',
  WegaDiceGame = 'WegaDiceGame',
  WegaCoinFlipGame = 'WegaCoinFlipGame',
  WegaGameController = 'WegaGameController',
  FeeManager = 'FeeManager'
}

export enum ContractName {
  ProxyAdmin = 'ProxyAdmin',
  WegaERC20Escrow = 'WegaERC20Escrow',
  WegaERC20Dummy = 'WegaERC20Dummy',
  WegaRandomNumberController = 'WegaRandomNumberController',
  WegaDiceGame = 'WegaDiceGame',
  WegaCoinFlipGame = 'WegaCoinFlipGame',
  FeeManager = 'FeeManager',
  WegaGameController = 'WegaGameController',
}

export type DeployedContract = {
  address: string,
  implementation?: string,
  legacyAddresses: string[],
  forwarder?: string,
  deprecated?: boolean;
  deploymentBlock: string,
}

export type DeployedContractList = {
  contracts: DeployedContractMap
}

export type DeployedContractMap = { 
  [k in ContractName]: DeployedContract
}

export type DeployedContractsConfig = { 
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

export type RandomNumbersConfig = {
  [chainId: number]: {
    lastParsedRound: number;
    lastStoredIndex?: number;
    drands: ({ round: number, randomness: string, signature: string })[];
  }
}

export type FeeConfig = {
  applier: HexishString;
  feeTaker: HexishString;
  feeShare: number;
  shouldApply: boolean;
}

export type GameSetting = {
  name: string;
  proxy: HexishString;
  requiredPlayers: BigNumberish;
  minRounds: BigNumberish;
  denominator: number;
  randomNumberController: HexishString | string;
}

export type HexishString = `0x${string}`;