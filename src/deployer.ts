import path from 'path';
import fs from 'fs';
import { ethers, network, config } from 'hardhat';
import { merge, uniq } from 'lodash';
import debug from 'debug';
import { mergeNetworkConfig, getNetworkConfig } from './config'
import { Contract, ContractFactory } from 'ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { NetworkConfig as HardHatNetworkConfig } from 'hardhat/types';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import {
  ArtifactName,
  DeployedContractsConfig,
  DeployedContractList,
  DeployedContractMap,
  ContractName,
} from './types';
import { Task, tasks } from './tasks';
import { unwrap } from './helpers';

const log = debug('::deployer::');

type DeployerOptions = {
  basePath: string;
  proxy: boolean;
};

export type DeployConfig = {
  contracts: {
    [k in ArtifactName]: {
      address: string;
      legacyAddresses: string[];
      deploymentBlock: string;
      implementation: string;
      forwarder: string;
      transaction: TransactionResponse;
    };
  };
};

type AccountsMap = Record<string, SignerWithAddress>;

type ArtifactsMap = {
  [k in ArtifactName]: ContractFactory;
};

const DEFAULT_OPTIONS: DeployerOptions = {
  basePath: './.deployer',
  proxy: true,
};

async function getArtifacts (): Promise<ArtifactsMap> {
  return {
    WegaERC20Escrow: await ethers.getContractFactory('WegaERC20Escrow'),
    WegaERC20Dummy: await ethers.getContractFactory('WegaERC20Dummy'),
    WegaRandomizerController: await ethers.getContractFactory('WegaRandomizerController'),
    WegaRandomizer: await ethers.getContractFactory('WegaRandomizer'),
    WegaDiceGame: await ethers.getContractFactory('WegaDiceGame'),
    WegaCoinFlipGame: await ethers.getContractFactory('WegaCoinFlipGame'),
    FeeManager: await ethers.getContractFactory('FeeManager'),
    WegaGameController: await ethers.getContractFactory('WegaGameController'),
  };
}

export class Deployer {
  public options: DeployerOptions;
  public artifacts: ArtifactsMap;
  public accounts: AccountsMap;
  public log: debug.Debugger;
  public minters: string[];
  public admins: string[];
  public network: HardHatNetworkConfig;

  static async create (options?: DeployerOptions): Promise<Deployer> {
    const [owner, protocolAdmin] = await ethers.getSigners();

    const _config = config.accounts;

    return new Deployer(
      options ?? DEFAULT_OPTIONS,
      await getArtifacts(),
      { owner, protocolAdmin },
      _config.minters[network.name],
      _config.admins[network.name]
    );
  }

  constructor (
    options: DeployerOptions,
    artifacts: ArtifactsMap,
    accounts: AccountsMap,
    minters: string[],
    admins: string[],
  ) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    this.artifacts = artifacts;
    this.accounts = accounts;
    this.minters = minters;
    this.admins = admins;
    this.network = network.config;

    this.log = log;
    debug.enable('::deployer::');

    const { basePath } = this.options;
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }

    this.log('Initialized deployer', {
      options: this.options,
      artifacts: Object.keys(artifacts),
      accounts: Object.values(accounts)
        .filter((a) => !!a)
        .map((a) => a.address),
      minters,
    });
  }
  getNonceSigner(signer: SignerWithAddress) {
    return new ethers.NonceManager(signer);
  }
  
  async execute (tags: string[], config?: DeployedContractList, inputs?: any): Promise<DeployedContractsConfig> {
    tags = tags || [];

    this.log('Execution started');
    
    
    for (const task of tasks.sort( // sorts tasks from big to small
      (a: Task, b: Task) => a.priority - b.priority,
    )) {
      if (!tags.some((t) => task.tags.includes(t.toLowerCase()))) continue;
      this.log('Executing task', { tags: task.tags });
      let dependencies: any; 
      if(task.tags.includes('full')) {
        const chainId = unwrap(this.network, 'chainId');
        const cf = getNetworkConfig(chainId);
        dependencies = task.ensureDependencies(this, cf);
      } else {
        dependencies = task.ensureDependencies(this, config);
      }
      if (task.inputOptions) {
        await task.run(this, dependencies, inputs); // handles task with inputs
      } else {
        await task.run(this, dependencies); // handles task without inputs
      }
      if(task.tags.includes('full')) {
        mergeNetworkConfig(this.getNetworkConfig());
      }
    }

    const _config = this.getNetworkConfig();
    this.log('Execution completed', JSON.stringify(_config));
    return _config;
  }

  getNetworkConfig (): DeployedContractsConfig {
    const config = this.getDeployConfig();
    const emptyConfig = {
      address: '0x0000000000000000000000000000000000000000',
      legacyAddresses: [],
      deploymentBlock: '0x0',
    };

    const contracts: any = {};

    for (const [key, value] of Object.entries(config.contracts || {})) {
      contracts[key] = {
        ...emptyConfig,
        address: value.address,
        implementation: value.implementation,
        deploymentBlock:
          value.transaction && value.transaction.blockNumber ?
          ethers.toBigInt(String(value.transaction.blockNumber)).toString(16) : null,
        forwarder: value.forwarder,
        legacyAddresses: uniq(value.legacyAddresses)
      };
    }

    return {
      networks: {
        [unwrap(this.network, 'chainId')]: {
          contracts: contracts as DeployedContractMap,
        },
      },
    };
  }

  getDeployConfig (): DeployConfig {
    const configPath = path.resolve(
      this.options.basePath,
      `${this.network.chainId}.json`,
    );
    const file = fs.existsSync(configPath)
      ? fs.readFileSync(configPath).toString()
      : '{}';
    return JSON.parse(file.length ? file : '{}');
  }

  async saveContractConfig (
    name: ContractName | ArtifactName,
    contract: any,
    implAddress?: string,
    legacyAddresses?: string[], 
  ): Promise<void> {
    const config = this.getDeployConfig();
    // console.log(contract.deployTransaction)
    const transaction =  typeof contract.deployTransaction === 'function' ? (await contract.deployTransaction()) : contract.deployTransaction;
    const _config = merge(config, {
      contracts: {
        [name as string]: {
          address: contract.target,
          implementation: implAddress,
          transaction,
          legacyAddresses
        },
      },
    });
    this.log(_config);
    await this._saveConfig(_config);
  }

  async _saveConfig (config: unknown) {
    const configPath = path.resolve(
      this.options.basePath,
      `${this.network.chainId}.json`,
    );
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }
}
