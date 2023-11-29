import { Contract } from 'ethers';
import { network, upgrades, ethers } from 'hardhat';
import { Deployer } from './deployer';
import { merge } from 'lodash'

import { ArtifactName, DependenciesMap, ContractName, DeployedContractList, DeployedContract } from './types';
import verify from './verify';
import { unwrap, unwrapDependencies, upgradeContract } from './helpers';
import { mergeNetworkConfig } from './config';
import { PROTOCOL_ROLES } from './constants'
import { 
  WegaRandomizerController,
  WegaGameController,
  FeeManager,
  WegaDiceGame,
  WegaCoinFlipGame, 
  WegaERC20Escrow,
} from '../types'

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
* deploy the wega dice game
*/
const setFeeRulesTask: Task = {
  tags: ['set_fee_rules', 'full'],
  priority: 9,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Configuring Wega protocol');
    const { protocolAdmin } = ctx.accounts;
    const [
      FeeManager,
      WegaERC20Escrow
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.FeeManager,
        ArtifactName.WegaERC20Escrow
      ],
    );
    // configure game controller
    const rules = [{
      applier: WegaERC20Escrow.address,
      shouldApply: false,
      feeTaker: inputs.feeTaker,
      feeShare: 500
    }];

    ctx.log('Setting fee rules...', JSON.stringify(rules));
    const feeManager = ctx.artifacts.FeeManager.attach(FeeManager.address) as FeeManager;
    await feeManager.connect(protocolAdmin).setFeeConfigs(rules);
    ctx.log('Successfully added the fee rules...', JSON.stringify(rules));
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);
    const { FeeManager, WegaERC20Escrow } = config?.contracts || {};
    const dependencies = { FeeManager, WegaERC20Escrow };
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
const configureProtocolTask: Task = {
  tags: ['configure_wega_protocol', 'full'],
  priority: 8,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Configuring Wega protocol');
    const { owner, protocolAdmin } = ctx.accounts;
    const [
      WegaERC20Escrow,
      WegaRandomizerController,
      WegaDiceGame,
      WegaCoinFlipGame,
      WegaGameController,
      FeeManager
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.WegaERC20Escrow,
        ArtifactName.WegaRandomizerController,
        ArtifactName.WegaDiceGame,
        ArtifactName.WegaCoinFlipGame,
        ArtifactName.WegaGameController,
        ArtifactName.FeeManager
      ],
    );
    
    // configure game controller 
    const gameController = ctx.artifacts.WegaGameController.attach(WegaGameController.address) as WegaGameController;
    const feeManager = ctx.artifacts.FeeManager.attach(FeeManager.address) as FeeManager;
    const erc20Escrow = ctx.artifacts.WegaERC20Escrow.attach(WegaERC20Escrow.address) as WegaERC20Escrow;
    const randomNumController = ctx.artifacts.WegaRandomizerController.attach(WegaRandomizerController.address) as WegaRandomizerController; 
    const diceGame = ctx.artifacts.WegaDiceGame.attach(WegaDiceGame.address) as WegaDiceGame;
    const coinflipGame = ctx.artifacts.WegaCoinFlipGame.attach(WegaCoinFlipGame.address) as WegaCoinFlipGame;

    ctx.log('Configuring settings on dependencies...');
    ctx.log('Adding game controller as manager on dependencies...');
    // add EscrowManagerRole to gameController on escrow
    await erc20Escrow.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, gameController.target);
    
    // add RandomNumControllerManagerRole to gameController on randomNumController
    await randomNumController.connect(protocolAdmin).grantRole(
      PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, 
      gameController.target
    )
    
    // configure dice games
    await diceGame.connect(protocolAdmin).grantRole(
      PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, 
      gameController.target
    );

    // configure coinflip games  
    await coinflipGame.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, gameController.target);
    ctx.log('Adding managers done!');
    
    // add roles for game on randomNum controller
    await randomNumController.connect(owner).addWegaProtocolAdmin(protocolAdmin.address);
    await randomNumController.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_ROLE, diceGame.target);
    await randomNumController.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_ROLE, coinflipGame.target);
    
    // add more randomNumbers
    ctx.log('Adding random numbers!!!');
    if (inputs.drands.length > 0) {
      let chunkSize = 100;
      for (let i = 0, j = inputs.drands.length; i < j; i += chunkSize){
        const array = inputs.drands.slice(i, i + chunkSize);
        ctx.log(`Adding ${array.length} random numbers...`);
        const tx = await randomNumController.connect(protocolAdmin).seedRandomizer(array);
        await tx.wait();
      }
    ctx.log(`Adding random numbers done!`);
    }
    ctx.log('Configuration done!!!');
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { 
      WegaERC20Escrow,
      WegaRandomizerController,
      WegaDiceGame,
      WegaCoinFlipGame,
      WegaGameController,
      FeeManager } = config?.contracts || {};

    const dependencies = { 
      WegaERC20Escrow,
      WegaRandomizerController,
      WegaDiceGame,
      WegaCoinFlipGame,
      WegaGameController,
      FeeManager 
     };

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
const deployWegaGameControllerTask: Task = {
  tags: ['wega_game_controller', 'full'],
  priority: 7,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega GameController');
    const { owner, protocolAdmin } = ctx.accounts;
    const { WegaGameController } = ctx.artifacts;
    let gameController: any;
    const [
      WegaERC20Escrow,
      WegaRandomizerController,
      WegaDiceGame,
      WegaCoinFlipGame
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.WegaERC20Escrow,
        ArtifactName.WegaRandomizerController,
        ArtifactName.WegaDiceGame,
        ArtifactName.WegaCoinFlipGame
      ],
    );
    const gameSettings = [
      {
        name: 'DICE',
        denominator: 6,
        minRounds: 1,
        requiredPlayers: 2,
        proxy: WegaDiceGame.address,
        randomNumberController: WegaRandomizerController.address
      },
      {
        name: 'COINFLIP',
        denominator: 2,
        minRounds: 1,
        requiredPlayers: 2,
        proxy: WegaCoinFlipGame.address,
        randomNumberController: WegaRandomizerController.address
      }
    ]
    if(ctx.options.proxy) {
      gameController = await upgrades.deployProxy(
        ctx.artifacts.WegaGameController.connect(owner), [], { 
          initializer: false,
          kind: 'uups'
        }
      );
      await gameController.waitForDeployment();
      await gameController.initialize(
        WegaERC20Escrow.address, 
        WegaRandomizerController.address, 
        gameSettings
        );
      
      let gameControllerImpl = await upgrades.erc1967.getImplementationAddress(gameController.target as string);

      await ctx.saveContractConfig(ContractName.WegaGameController, gameController, gameControllerImpl);
      await verify(ctx, gameControllerImpl, []);
      ctx.log('Adding protocol admins')
      await gameController.connect(owner).addWegaProtocolAdmin(protocolAdmin.address);
    } else {
      gameController = await WegaGameController.connect(owner).deploy();      
      await gameController.connect(owner).initialize(WegaERC20Escrow.implementation, ["DICE", "COINFLIP"], [...gameSettings]);
      await ctx.saveContractConfig(ContractName.WegaGameController, gameController);
    
      await verify(ctx, gameController.target, []);
      ctx.log('Adding protocol admins')
      await gameController.connect(owner).addWegaProtocolAdmin(protocolAdmin.address);
    } 

  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaERC20Escrow, WegaRandomizerController, WegaCoinFlipGame, WegaDiceGame } = config?.contracts || {};

    const dependencies = { WegaERC20Escrow, WegaRandomizerController, WegaCoinFlipGame, WegaDiceGame };

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
  priority: 6,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega Dice Game');
    const { owner, protocolAdmin } = ctx.accounts;
    const [
      WegaRandomizerController
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.WegaRandomizerController,
      ],
    );
    const { WegaDiceGame } = ctx.artifacts;
    let wegaDice: any;
    if(ctx.options.proxy) {      
      wegaDice = await upgrades.deployProxy(
        ctx.artifacts.WegaDiceGame.connect(owner), [WegaRandomizerController.address], { 
          initializer: 'initialize', 
          kind: 'uups'
        }
      );
      await wegaDice.waitForDeployment();
    
      let wegaDiceImpl = await upgrades.erc1967.getImplementationAddress(wegaDice.target);
      await ctx.saveContractConfig(ContractName.WegaDiceGame, wegaDice, wegaDiceImpl);
      await verify(ctx, wegaDiceImpl, []);
    } else {
      wegaDice = await WegaDiceGame.connect(owner).deploy();
      await wegaDice.connect(owner).initialize(WegaRandomizerController.address);
      await ctx.saveContractConfig(ContractName.WegaDiceGame, wegaDice);
    
      await verify(ctx, wegaDice.target, []);
    }
    ctx.log('Adding protocol admins')
    await wegaDice.connect(owner).addWegaProtocolAdmin(protocolAdmin.address);
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaRandomizerController } = config?.contracts || {};

    const dependencies = { WegaRandomizerController };

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
  priority: 5,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega Coinflip Game');
    const { owner, protocolAdmin } = ctx.accounts;
    const [
      WegaRandomizerController
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.WegaRandomizerController,
      ],
    );
    const { WegaCoinFlipGame } = ctx.artifacts;
    let wegaCoinFlip: any;
    if(ctx.options.proxy) {      
      wegaCoinFlip = await upgrades.deployProxy(
        ctx.artifacts.WegaCoinFlipGame.connect(owner), [WegaRandomizerController.address], { 
          initializer: 'initialize', 
          kind: 'uups'
        }
      );
      await wegaCoinFlip.waitForDeployment();
    
      let wegaCoinFlipImpl = await upgrades.erc1967.getImplementationAddress(wegaCoinFlip.target);
      await ctx.saveContractConfig(ContractName.WegaCoinFlipGame, wegaCoinFlip, wegaCoinFlipImpl);
      await verify(ctx, wegaCoinFlipImpl, []);
    } else {
      wegaCoinFlip = await WegaCoinFlipGame.connect(owner).deploy();
      await wegaCoinFlip.connect(owner).initialize(WegaRandomizerController.address);
      await ctx.saveContractConfig(ContractName.WegaCoinFlipGame, wegaCoinFlip);
    
      await verify(ctx, wegaCoinFlip.target, []);
    }
    ctx.log('Adding protocol admins')
    await wegaCoinFlip.connect(owner).addWegaProtocolAdmin(protocolAdmin.address);
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaRandomizerController } = config?.contracts || {};

    const dependencies = { WegaRandomizerController };

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
const deployWegaRandomizerControllerTask: Task = {
  tags: ['wega_random_number_controller', 'full'],
  priority: 4,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega random number controller');
    const { owner, protocolAdmin } = ctx.accounts;
    let randController: any;
    if(ctx.options.proxy) {
      randController = await upgrades.deployProxy(
        ctx.artifacts.WegaRandomizerController.connect(owner), [inputs.initialDrands], { 
          initializer: "initialize",
          kind: 'uups'
        }
      );
      await randController.waitForDeployment()
      let randControllerImpl = await upgrades.erc1967.getImplementationAddress(randController.target);
      await ctx.saveContractConfig(ContractName.WegaRandomizerController, randController, randControllerImpl);
      await verify(ctx, randControllerImpl, []);
    } else {
      randController = await ctx.artifacts.WegaRandomizerController.connect(owner).deploy();
      await randController.connect(owner).initialize(inputs.initialDrands);
      await ctx.saveContractConfig(ContractName.WegaRandomizerController, randController);
    
      await verify(ctx, randController.target, []);
    }
    ctx.log('Adding protocol admins')
    await randController.connect(owner).addWegaProtocolAdmin(protocolAdmin.address);
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaRandomizerController } = config?.contracts || {};

    const dependencies = { WegaRandomizerController };

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
  priority: 3,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega NFT Escrow');
    const { owner, protocolAdmin } = ctx.accounts;
    const FeeManager = unwrap(dependencies, ArtifactName.FeeManager);
    const { WegaERC20Escrow } = ctx.artifacts;
    let erc20Escrow: any;
    if(ctx.options.proxy) {      
      erc20Escrow = await upgrades.deployProxy(
        ctx.artifacts.WegaERC20Escrow.connect(owner), [
          FeeManager.address
        ], { 
          initializer: 'initialize', 
          kind: 'uups'
        }
      );
      await erc20Escrow.waitForDeployment();
    
      let erc20EscrowImpl = await upgrades.erc1967.getImplementationAddress(erc20Escrow.target);
      await ctx.saveContractConfig(ContractName.WegaERC20Escrow, erc20Escrow, erc20EscrowImpl);
      await verify(ctx, erc20EscrowImpl, []);
    } else {
      erc20Escrow = (await WegaERC20Escrow.connect(owner).deploy());
      await erc20Escrow.connect(owner).initialize(...inputs.escrow);
      await ctx.saveContractConfig(ContractName.WegaERC20Escrow, erc20Escrow);
    
      await verify(ctx, erc20Escrow.address, [...inputs.escrow]);
    }
    ctx.log('Adding protocol admins')
    await erc20Escrow.connect(owner).addWegaProtocolAdmin(protocolAdmin.address);
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { FeeManager } = config?.contracts || {};

    const dependencies = { FeeManager };

    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }
    return dependencies;
  }
}

/**
* deploy the wega fee manager
*/
const deployFeeManagerTask: Task = {
  tags: ['wega_fee_manager', 'full'],
  priority: 2,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega FeeManager');
    const { owner, protocolAdmin } = ctx.accounts;
    let feeManager: any;
    if(ctx.options.proxy) {      
      feeManager = await upgrades.deployProxy(
        ctx.artifacts.FeeManager.connect(owner), [], { 
          initializer: 'initialize', 
          kind: 'uups'
        }
      );
      await feeManager.waitForDeployment();
      let feeManagerImpl = await upgrades.erc1967.getImplementationAddress(feeManager.target);
      await ctx.saveContractConfig(ContractName.FeeManager, feeManager, feeManagerImpl);
      await verify(ctx, feeManagerImpl, []);
    } else {
      const { FeeManager } = ctx.artifacts;
      feeManager = await FeeManager.connect(owner).deploy();
      await feeManager.connect(owner).initialize();
      await ctx.saveContractConfig(ContractName.FeeManager, feeManager);
      
      await verify(ctx, feeManager.target, []);
    }
    ctx.log('Adding protocol admins')
    await feeManager.connect(owner).addWegaProtocolAdmin(protocolAdmin.address);
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => ({
    // config = merge(ctx.getDeployConfig(), config);

    // const { WegaERC20Escrow } = config?.contracts || {};

    // const dependencies = { WegaERC20Escrow };

    // for (const [key, value] of Object.entries(dependencies)) {
    //   if (!value || !value.address) {
    //     throw new Error(`${key} contract not found for network ${network.config.chainId}`);
    //   }
    // }
    // return dependencies;
  }),
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
    const erc20Dummy = await WegaERC20Dummy.connect(owner).deploy(inputs.tokenReceivers) as Contract;
    await ctx.saveContractConfig(ContractName.WegaERC20Dummy, erc20Dummy);
    await verify(ctx, erc20Dummy.target as string, []);
    
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
  
    let gameCtlImpl = await upgrades.erc1967.getImplementationAddress(WegaGameController.address);
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

/**
* upgrades any contract in the wega protocol
*/
const upgradeContractTask: Task = {
  tags: ['upgrade_contract'],
  priority: 1000,
  inputOptions: true,
  run: async (ctx: Deployer, dependencies: DependenciesMap, inputs: { 
    forceImportAddress?: string;
    artifactName: ArtifactName;
    contractName: ContractName,
  }[]) => {
    await Promise.all(inputs.map(async input => {
      ctx.log(`Upgrade ${input.contractName}`, JSON.stringify(input));
      const ContractConfig: DeployedContract = unwrap(dependencies, input.artifactName);
      const { legacyAddress, contractInstance } = await upgradeContract({
        implementationFactory: ctx.artifacts[input.artifactName],
        deployedContractConfig: ContractConfig,
        options: { kind: 'uups', redeployImplementation: 'always' },
        forceImport: input.forceImportAddress ? {
          address: input.forceImportAddress,
          options: { kind: 'uups', redeployImplementation: 'always'}
        } : undefined,
      })
      const impl = await upgrades.erc1967.getImplementationAddress(contractInstance.target as string)
      await ctx.saveContractConfig(input.contractName, contractInstance, impl, [legacyAddress, ...ContractConfig.legacyAddresses]);
      await verify(ctx, impl, []);
      mergeNetworkConfig(ctx.getNetworkConfig());
      ctx.log(`Upgrade ${input.contractName} success`);
    }))
    ctx.log(`Upgrade Contracts Complement`);
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);
    const { 
      WegaERC20Escrow,
      WegaERC20Dummy,
      WegaGameController,
      WegaRandomizerController,
      WegaDiceGame,
      WegaCoinFlipGame,
      FeeManager
    } = config?.contracts || {};
    const dependencies = { 
      WegaERC20Escrow,
      WegaERC20Dummy,
      WegaGameController,
      WegaRandomizerController,
      WegaDiceGame,
      WegaCoinFlipGame,
      FeeManager   
     };
    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }
    return dependencies;
  },
}
/**
* upgrades any contract in the wega protocol
*/
const verifyContractTask: Task = {
  tags: ['verify_contract'],
  priority: 1000,
  inputOptions: true,
  run: async (ctx: Deployer, dependencies: DependenciesMap, inputs: { 
    forceImportAddress?: string;
    artifactName: ArtifactName;
    contractName: ContractName,
  }[]) => {
    await Promise.all(inputs.map(async input => {
      ctx.log(`Verify ${input.contractName}`, JSON.stringify(input));
      const ContractConfig: DeployedContract = unwrap(dependencies, input.artifactName);
      const instance = ctx.artifacts[input.artifactName].attach(ContractConfig.address);
      const impl = await upgrades.erc1967.getImplementationAddress(ContractConfig.address as string)
      await ctx.saveContractConfig(input.contractName, instance, impl);
      await verify(ctx, impl, []);
      mergeNetworkConfig(ctx.getNetworkConfig());
      ctx.log(`Verify ${input.contractName} success`);
    }))
    ctx.log(`Verify Contracts Complement`);
  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);
    const { 
      WegaERC20Escrow,
      WegaERC20Dummy,
      WegaGameController,
      WegaRandomizerController,
      WegaDiceGame,
      WegaCoinFlipGame,
      FeeManager
    } = config?.contracts || {};
    const dependencies = { 
      WegaERC20Escrow,
      WegaERC20Dummy,
      WegaGameController,
      WegaRandomizerController,
      WegaDiceGame,
      WegaCoinFlipGame,
      FeeManager   
     };
    for (const [key, value] of Object.entries(dependencies)) {
      if (!value || !value.address) {
        throw new Error(`${key} contract not found for network ${network.config.chainId}`);
      }
    }
    return dependencies;
  },
}

export const tasks: Task[] = [
  deployERC20DummyTask, // 1
  deployFeeManagerTask, // 2
  deployERC20EscrowTask, // 3 
  deployWegaRandomizerControllerTask, // 4
  deployCoinFlipGameTask, // 5
  deployDiceGameTask, // 6
  deployWegaGameControllerTask, // 7
  configureProtocolTask, // 8
  setFeeRulesTask, // 9
  upgradeContractTask,
  upgradeGameControllerTask,
  verifyContractTask,
];
