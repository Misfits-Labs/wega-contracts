import { BigNumber } from 'ethers';

export enum ArtifactName {
  WegaERC721Escrow = 'WegaERC721Escrow',
  ERC721DummyOne = 'ERC721DummyOne',
  ERC721DummyTwo = 'ERC721DummyTwo',
}

export enum ContractName {
  WegaERC721Escrow = 'WegaERC721Escrow',
  ERC721DummyOne = 'ERC721DummyOne',
  ERC721DummyTwo = 'ERC721DummyTwo',
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

export enum TransactionState { OPEN, APPROVED, READY, CLOSED }
