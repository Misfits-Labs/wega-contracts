import { network, upgrades, signers } from 'hardhat';
import { Contract, utils } from 'ethers';
import { merge } from 'lodash';
import { Deployer } from './deployer';


import { ArtifactName, DependenciesMap, ContractName, DeployedContractList } from './types';
import verify from './verify';
import { unwrap, unwrapDependencies } from './helpers';

export type Task = {
  tags: string[];
  priority: number;
  inputOptions?: boolean,
  run: (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs?: any
  ) => Promise<void>;
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList) => DependenciesMap;
};

/**
* boilerplate code
*/
const deployDummyTask: Task = {
  tags: ['dummy'],
  priority: 1,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying dummy');
    const { owner } = ctx.accounts;

    // dependencies
    const [] = unwrapDependencies(
      dependencies,
      [],
    );
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList) => {
    config = merge(ctx.getDeployConfig(), config);

    const { } = config?.contracts || {};

    const dependencies = {};

    // for (const [key, value] of Object.entries(dependencies)) {
    //   if (!value || !value.address) {
    //     throw new Error(`${key} contract not found for network ${network.config.chainId}`);
    //   }
    // }

    return dependencies;
  }
}

/**
* deploys the wega nft escrow
*/
const deployNftEscrowTask: Task = {
  tags: ['wega_nft_escrow', 'full'],
  priority: 2,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega NFT Escrow');
    const { owner } = ctx.accounts;
    const { WegaERC721Escrow } = ctx.artifacts

    // // dependencies
    // const [] = unwrapDependencies(
    //   dependencies,
    //   [],
    // );

    const nftEscrow = await WegaERC721Escrow.connect(owner).deploy(...inputs.escrow);
    await ctx.saveContractConfig(ContractName.WegaERC721Escrow, nftEscrow);
    await nftEscrow.deployTransaction.wait();
    await verify(ctx, nftEscrow.address, [...inputs.escrow]);
  },
  ensureDependencies: () =>({})
}
/**
* deploys the wega nft dummies
*/
const deployNftDummiesTask: Task = {
  tags: ['nft_dummies', 'full'],
  priority: 1,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega NFT Dummies');
    const { owner } = ctx.accounts;
    const { ERC721DummyOne, ERC721DummyTwo } = ctx.artifacts

    // // // dependencies
    // // const [] = unwrapDependencies(
    // //   dependencies,
    // //   [],
    // // );
    // const tokenIds = [1, 2, 3, 4, 5, 6];

    const dummyOne = await ERC721DummyOne.connect(owner).deploy(...inputs.dummyOne);
    await ctx.saveContractConfig(ContractName.ERC721DummyOne, dummyOne);
    await dummyOne.deployTransaction.wait();
    await verify(ctx, dummyOne.address, [...inputs.dummyOne]);
    
    const dummyTwo = await ERC721DummyTwo.connect(owner).deploy(...inputs.dummyTwo);
    await ctx.saveContractConfig(ContractName.ERC721DummyTwo, dummyTwo);
    await dummyTwo.deployTransaction.wait();
    await verify(ctx, dummyTwo.address, [...inputs.dummyTwo]);
    
    // // mint Token Ids
    // await Promise.all(tokenIds.map(async tId => {
    //   inputs.nftOwners.forEach(async (owner: string) => {
    //     console.log('minting....', owner)
    //     await dummyOne.safeMint(owner, tId);
    //     await dummyTwo.safeMint(owner, tId);
    //   })
    // }))
  },
  ensureDependencies: () =>({})
}

export const tasks: Task[] = [
  deployNftEscrowTask,
  deployNftDummiesTask,
];
