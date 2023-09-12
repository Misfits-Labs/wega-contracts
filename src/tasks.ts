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
  priority: 6,
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
      WegaRandomNumberController,
      WegaDiceGame,
      WegaCoinFlipGame
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.WegaERC20Escrow,
        ArtifactName.WegaRandomNumberController,
        ArtifactName.WegaDiceGame,
        ArtifactName.WegaCoinFlipGame
      ],
    );
    const gameSettings = [
      {
        denominator: 6,
        minRounds: 1,
        requiredPlayers: 2,
        proxy: WegaDiceGame.address,
        randomNumberController: WegaRandomNumberController.address
      },
      {
        denominator: 2,
        minRounds: 1,
        requiredPlayers: 2,
        proxy: WegaCoinFlipGame.address,
        randomNumberController: WegaRandomNumberController.address
      }
    ]
    if(ctx.options.proxy) {
      gameController = await upgrades.deployProxy(
        ctx.artifacts.WegaGameController.connect(owner), [
          WegaERC20Escrow.address, 
          ["DICE", "COINFLIP"],
          [...gameSettings],
        ], { 
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
      await gameController.connect(owner).initialize(WegaERC20Escrow.implementation, ["DICE", "COINFLIP"], [...gameSettings]);
      await ctx.saveContractConfig(ContractName.WegaGameController, gameController);
      await gameController.deployTransaction.wait();
      await verify(ctx, gameController.address, []);
    }
    
    // configure game controller 
    const erc20Escrow = ctx.artifacts.WegaERC20Escrow.attach(WegaERC20Escrow.address);
    const randomNumController = ctx.artifacts.WegaRandomNumberController.attach(WegaRandomNumberController.address);
    const diceGame = ctx.artifacts.WegaDiceGame.attach(WegaDiceGame.address);
    const coinflipGame = ctx.artifacts.WegaCoinFlipGame.attach(WegaCoinFlipGame.address);
    
    ctx.log('Configuring settings on dependencies...');
    ctx.log('Adding game controller as manager on dependencies...')
    // add EscrowManagerRole to gameController on escrow
    await erc20Escrow.connect(owner).addWegaEscrowManager(gameController.address);
    // add RandomNumControllerManagerRole to gameController on randomNumController
    await randomNumController.connect(owner).addWegaGameManager(gameController.address);
    // add gameManager to 
    await diceGame.connect(owner).addWegaGameManager(gameController.address);
    // add gameManager to 
    await coinflipGame.connect(owner).addWegaGameManager(gameController.address);
    ctx.log('Adding managers done!')

    // add more randomNumbers
    if (inputs.drands.length > 0) {
      let chunkSize = 100;
      for (let i = 0, j = inputs.drands.length; i < j; i += chunkSize){
        const array = inputs.drands.slice(i, i + chunkSize);
        ctx.log(`Adding ${array.length} random numbers...`);
        const tx = await randomNumController.connect(owner).addRandomNumbers(array);
        await tx.wait();
        ctx.log(`Successfully added random numbers!`);
      }
    }
    ctx.log('Configuration done!!!');
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaERC20Escrow, WegaRandomNumberController, WegaCoinFlipGame, WegaDiceGame } = config?.contracts || {};

    const dependencies = { WegaERC20Escrow, WegaRandomNumberController, WegaCoinFlipGame, WegaDiceGame };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }
    return dependencies;
  },
}

/**
* deploy the wega dice game
*/
const deployDiceGameTask: Task = {
  tags: ['wega_dice_game', 'full'],
  priority: 5,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega Dice Game');
    const { owner } = ctx.accounts;
    const [
      WegaRandomNumberController
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.WegaRandomNumberController,
      ],
    );
    const { WegaDiceGame } = ctx.artifacts;
    let wegaDice: Contract;
    if(ctx.options.proxy) {      
      wegaDice = await upgrades.deployProxy(
        ctx.artifacts.WegaDiceGame.connect(owner), [WegaRandomNumberController.address], { 
          initializer: 'initialize', 
          kind: 'uups'
        }
      );
      await wegaDice.deployTransaction.wait();
      let wegaDiceImpl = await upgrades.erc1967.getImplementationAddress(wegaDice.address);
      await ctx.saveContractConfig(ContractName.WegaDiceGame, wegaDice, wegaDiceImpl);
      await verify(ctx, wegaDiceImpl, []);
    } else {
      wegaDice = await WegaDiceGame.connect(owner).deploy();
      await wegaDice.connect(owner).initialize(WegaRandomNumberController.address);
      await ctx.saveContractConfig(ContractName.WegaDiceGame, wegaDice);
      await wegaDice.deployTransaction.wait();
      await verify(ctx, wegaDice.address, []);
    }
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaRandomNumberController } = config?.contracts || {};

    const dependencies = { WegaRandomNumberController };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }
    return dependencies;
  },
}

/**
* deploy the wega coinflip game
*/
const deployCoinFlipGameTask: Task = {
  tags: ['wega_coinflip_game', 'full'],
  priority: 4,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega Coinflip Game');
    const { owner } = ctx.accounts;
    const [
      WegaRandomNumberController
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.WegaRandomNumberController,
      ],
    );
    const { WegaCoinFlipGame } = ctx.artifacts;
    let wegaCoinFlip: Contract;
    if(ctx.options.proxy) {      
      wegaCoinFlip = await upgrades.deployProxy(
        ctx.artifacts.WegaCoinFlipGame.connect(owner), [WegaRandomNumberController.address], { 
          initializer: 'initialize', 
          kind: 'uups'
        }
      );
      await wegaCoinFlip.deployTransaction.wait();
      let wegaCoinFlipImpl = await upgrades.erc1967.getImplementationAddress(wegaCoinFlip.address);
      await ctx.saveContractConfig(ContractName.WegaCoinFlipGame, wegaCoinFlip, wegaCoinFlipImpl);
      await verify(ctx, wegaCoinFlipImpl, []);
    } else {
      wegaCoinFlip = await WegaCoinFlipGame.connect(owner).deploy();
      await wegaCoinFlip.connect(owner).initialize(WegaRandomNumberController.address);
      await ctx.saveContractConfig(ContractName.WegaCoinFlipGame, wegaCoinFlip);
      await wegaCoinFlip.deployTransaction.wait();
      await verify(ctx, wegaCoinFlip.address, []);
    }
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaRandomNumberController } = config?.contracts || {};

    const dependencies = { WegaRandomNumberController };

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
const deployWegaRandomNumberControllerTask: Task = {
  tags: ['wega_random_number_controller', 'full'],
  priority: 3,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega random number controller');
    const { owner } = ctx.accounts;
    let randController: Contract;
    if(ctx.options.proxy) {
      randController = await upgrades.deployProxy(
        ctx.artifacts.WegaRandomNumberController.connect(owner), [inputs.initialDrands], { 
          initializer: "initialize",
          kind: 'uups'
        }
      );
      await randController.deployTransaction.wait();
      let randControllerImpl = await upgrades.erc1967.getImplementationAddress(randController.address);
      await ctx.saveContractConfig(ContractName.WegaRandomNumberController, randController, randControllerImpl);
      await verify(ctx, randControllerImpl, []);
    } else {
      randController = await ctx.artifacts.WegaRandomNumberController.connect(owner).deploy();
      await randController.connect(owner).initialize(inputs.initialDrands);
      await ctx.saveContractConfig(ContractName.WegaRandomNumberController, randController);
      await randController.deployTransaction.wait();
      await verify(ctx, randController.address, []);
    }
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaRandomNumberController } = config?.contracts || {};

    const dependencies = { WegaRandomNumberController };

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

/**
* deploys the wega nft escrow
*/
const upgradeGameControllerTask: Task = {
  tags: ['upgrade_game_controller', 'upgrades_full'],
  priority: 100,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Upgrading Wega Game Controller...');
    const { owner } = ctx.accounts;
    const [
      WegaGameController,
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.WegaGameController,
      ],
      );
    const { WegaGameController: ContractToUpgradeTo } = ctx.artifacts;
    let gameController: Contract;
    let legacyAddress: string = WegaGameController.implementation as string;
    gameController = await upgrades.upgradeProxy(WegaGameController.address, ContractToUpgradeTo, { 
        kind: 'uups',
        redeployImplementation: 'always'  
    });
    await gameController.deployTransaction.wait();
    let gameCtlImpl = await upgrades.erc1967.getImplementationAddress(gameController.address);
    await ctx.saveContractConfig(ContractName.WegaGameController, gameController, gameCtlImpl, [legacyAddress, ...WegaGameController.legacyAddresses]);
    await verify(ctx, gameCtlImpl, []);
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaGameController } = config?.contracts || {};

    const dependencies = { WegaGameController };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }
    return dependencies;
  },
}

export const tasks: Task[] = [
  deployERC20EscrowTask,
  deployERC20DummyTask,
  deployWegaGameControllerTask,
  deployWegaRandomNumberControllerTask,
  upgradeGameControllerTask,
  deployDiceGameTask,
  deployCoinFlipGameTask
];
