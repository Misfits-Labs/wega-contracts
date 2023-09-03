import { network, upgrades } from 'hardhat';
import { BigNumber, Contract, utils } from 'ethers';
import { Deployer } from './deployer';
import { merge } from 'lodash'

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
* deploys the wega game controller
*/
const deployWegaGameControllerTask: Task = {
  tags: ['wega_game_controller', 'full'],
  priority: 4,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega GameController');
    const { owner } = ctx.accounts;
    const { WegaGameController } = ctx.artifacts;
    let gameController: Contract;
    const [
      WegaERC20Escrow,
      WegaChanceGame
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.WegaERC20Escrow,
        ArtifactName.WegaChanceGame,
      ],
    );
    
    if(ctx.options.proxy) {
      gameController = await upgrades.deployProxy(
        ctx.artifacts.WegaGameController.connect(owner), [WegaERC20Escrow.address, WegaChanceGame.address], { 
          initializer: "initialize",
          kind: 'uups'
        }
      );
      await gameController.deployTransaction.wait();
      let gameControllerImpl = await upgrades.erc1967.getImplementationAddress(gameController.address);
      await ctx.saveContractConfig(ContractName.WegaGameController, gameController, gameControllerImpl);
      await verify(ctx, gameControllerImpl, []);

    } else {
      gameController = await WegaGameController.connect(owner).deploy();      
      await gameController.connect(owner)['__WegaGameController_init'](WegaERC20Escrow.implementation, WegaChanceGame.implementation);
      await ctx.saveContractConfig(ContractName.WegaGameController, gameController);
      await gameController.deployTransaction.wait();
      await verify(ctx, gameController.address, []);
    }
    
    // configure game controller 
    const erc20Escrow = ctx.artifacts.WegaERC20Escrow.attach(inputs.proxy ? WegaERC20Escrow.address : WegaERC20Escrow.implementation as string);
    const chanceGame = ctx.artifacts.WegaChanceGame.attach(inputs.proxy ? WegaChanceGame.address: WegaChanceGame.implementation as string);
    
    ctx.log('Configuring settings on dependencies...');
    // add EscrowManagerRole to gameController on escrow
    await erc20Escrow.connect(owner).addWegaEscrowManager(gameController.address);
    // add ChanceGameManagerRole to gameController on chanceGame
    await chanceGame.connect(owner).addWegaGameManager(gameController.address);
    // add more randomNumbers
    if (inputs.drands.length > 0) {
      let chunkSize = 100;
      for (let i = 0, j = inputs.drands.length; i < j; i += chunkSize){
        const array = inputs.drands.slice(i, i + chunkSize);
        ctx.log(`Adding ${array.length} random numbers...`);
        const tx = await chanceGame.connect(owner).addRandomNumbers(array);
        await tx.wait();
        ctx.log(`Successfully added random numbers`);
      }
    }
    ctx.log('Configuration done!!!');
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaERC20Escrow, WegaChanceGame } = config?.contracts || {};

    const dependencies = { WegaERC20Escrow, WegaChanceGame };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }
    return dependencies;
  },
}

/**
* deploys the wega game controller
*/
const deployWegaChanceGameTask: Task = {
  tags: ['wega_chance_game', 'full'],
  priority: 3,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega Chance Game');
    const { owner } = ctx.accounts;
    let chanceGame: Contract;
    if(ctx.options.proxy) {
      chanceGame = await upgrades.deployProxy(
        ctx.artifacts.WegaChanceGame.connect(owner), [inputs.initialDrands], { 
          initializer: "initialize",
          kind: 'uups'
        }
      );
      await chanceGame.deployTransaction.wait();
      let chanceGameImpl = await upgrades.erc1967.getImplementationAddress(chanceGame.address);
      await ctx.saveContractConfig(ContractName.WegaChanceGame, chanceGame, chanceGameImpl);
      await verify(ctx, chanceGameImpl, []);
    } else {
      chanceGame = await ctx.artifacts.WegaChanceGame.connect(owner).deploy();
      await chanceGame.connect(owner).initialize(inputs.initialDrands);
      await ctx.saveContractConfig(ContractName.WegaChanceGame, chanceGame);
      await chanceGame.deployTransaction.wait();
      await verify(ctx, chanceGame.address, []);
    }
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaERC20Escrow, WegaChanceGame } = config?.contracts || {};

    const dependencies = { WegaERC20Escrow, WegaChanceGame };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }
    return dependencies;
  },
}

/**
* deploys the wega nft escrow
*/
const deployERC20EscrowTask: Task = {
  tags: ['wega_erc20_escrow', 'full'],
  priority: 2,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega NFT Escrow');
    const { owner } = ctx.accounts;
    const { WegaERC20Escrow } = ctx.artifacts;
    let erc20Escrow: Contract;
    if(ctx.options.proxy) {      
      erc20Escrow = await upgrades.deployProxy(
        ctx.artifacts.WegaERC20Escrow.connect(owner), [...inputs.escrow], { 
          initializer: 'initialize', 
          kind: 'uups'
        }
      );
      await erc20Escrow.deployTransaction.wait();
      let erc20EscrowImpl = await upgrades.erc1967.getImplementationAddress(erc20Escrow.address);
      await ctx.saveContractConfig(ContractName.WegaERC20Escrow, erc20Escrow, erc20EscrowImpl);
      await verify(ctx, erc20EscrowImpl, []);
    } else {
      erc20Escrow = await WegaERC20Escrow.connect(owner).deploy();
      await erc20Escrow.connect(owner).initialize(...inputs.escrow);
      await ctx.saveContractConfig(ContractName.WegaERC20Escrow, erc20Escrow);
      await erc20Escrow.deployTransaction.wait();
      await verify(ctx, erc20Escrow.address, [...inputs.escrow]);
    }
  },
  ensureDependencies: () =>({})
}

/**
* deploys the wega nft dummies
*/
const deployERC20DummyTask: Task = {
  tags: ['erc20_dummy', 'full'],
  priority: 1,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {

    ctx.log('Deploying Wega ERC20 Dummies');
    const { owner } = ctx.accounts;
    const { WegaERC20Dummy } = ctx.artifacts
    const erc20Dummy = await WegaERC20Dummy.connect(owner).deploy(inputs.tokenReceivers);
    await ctx.saveContractConfig(ContractName.WegaERC20Dummy, erc20Dummy);
    await erc20Dummy.deployTransaction.wait();
    await verify(ctx, erc20Dummy.address, []);
    
    // // mint Token Ids
    // if (inputs.tokenReceivers.length > 0) {
    //   let chunkSize = 2;
    //   for (let i = 0, j = inputs.tokenReceivers.length; i < j; i += chunkSize){
    //     const array = inputs.tokenReceivers.slice(i, i + chunkSize);
    //     await Promise.all(array.map(async (receiver: string) => {
    //       console.log('minting tokens', array);
    //       const tokenAmount = 10000;
    //       const gp = await erc20Dummy.provider.getGasPrice();
    //       const tenPercent = gp.mul(BigNumber.from(10)).div(100);
    //       const tx = await erc20Dummy.connect(owner).mint(receiver, utils.parseEther(String(tokenAmount)), { gasPrice: gp.add(tenPercent) });
    //       await tx.wait();
    //       console.log(`successfully minted ${tokenAmount} to ${receiver}`);
    //     }))
    //   }
    // }
  },
  ensureDependencies: () =>({})
}

export const tasks: Task[] = [
  deployERC20EscrowTask,
  deployERC20DummyTask,
  deployWegaGameControllerTask,
  deployWegaChanceGameTask,
];
