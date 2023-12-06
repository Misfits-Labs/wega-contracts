import { Contract, BaseContract } from 'ethers';
import { network, upgrades, ethers } from 'hardhat';
import { Deployer } from './deployer';
import { merge } from 'lodash'
const { parseUnits, toBigInt } = ethers;
import { ArtifactName, DependenciesMap, ContractName, DeployedContractList, DeployedContract } from './types';
import verify from './verify';
import { unwrap, unwrapDependencies, upgradeContract } from './helpers';
import { mergeNetworkConfig } from './config';
import { PROTOCOL_ROLES } from './constants'
import { addPercentage } from './utils'
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
  tags: ['set_fee_rules'],
  priority: 9,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Configuring Wega protocol fees');
    const { protocolAdmin } = ctx.accounts;
    // const ownerNonceManager = ctx.getNonceSigner(owner);
    // ownerNonceManager.reset(); 

    const nonceManager = ctx.getNonceSigner(protocolAdmin);
    nonceManager.reset(); 

    let provider = nonceManager.signer.provider;
    
    const baseFee =  (await provider?.getBlock('latest'))?.baseFeePerGas as bigint;
    const currentGasLimit = parseUnits('6', 'gwei');
    const gasFee = baseFee + currentGasLimit;

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
      shouldApply: true,
      feeTaker: inputs.feeTaker,
      feeShare: 200
    }];

    ctx.log('Setting fee rules...', JSON.stringify(rules));
    const feeManager = ctx.artifacts.FeeManager.attach(FeeManager.address) as FeeManager;
    // await feeManager.connect(owner).addWegaProtocolAdmin(protocolAdmin.address, { gasPrice: gasFee });
    // ownerNonceManager.increment();
    await feeManager.connect(protocolAdmin).setFeeConfigs(rules, { gasPrice: gasFee });
    nonceManager.increment(); 

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
    // add EscrowManagerRole to gameController on escrow;
    const [protocolAdminNonceSigner, ownerNonceSigner] = [ctx.getNonceSigner(protocolAdmin), ctx.getNonceSigner(owner)];
    let provider = protocolAdminNonceSigner.signer.provider;
    const baseFee =  (await provider?.getBlock('latest'))?.baseFeePerGas as bigint;
    const currentGasLimit = parseUnits('600', 'gwei');
    const gasFee = baseFee + currentGasLimit   
    protocolAdminNonceSigner.reset();
    ownerNonceSigner.reset();
    
    // await erc20Escrow.connect(ownerNonceSigner).addWegaProtocolAdmin(protocolAdmin.address, { gasLimit: (baseFee + currentGasLimit),  gasPrice: addPercentage(addProtocolAdminGasLimit, 0.1) });
    // ownerNonceSigner.increment();
    // await erc20Escrow.connect(protocolAdmin).grantRole(
    //   PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, 
    //   gameController.target, 
    //   { gasPrice: gasFee }
    // );
    // protocolAdminNonceSigner.increment();
    
    // add RandomNumControllerManagerRole to gameController on randomNumController
    // addProtocolAdminGasLimit = await randomNumController.addWegaProtocolAdmin.estimateGas(protocolAdmin.address);
    // await randomNumController.connect(ownerNonceSigner).addWegaProtocolAdmin(
    //   protocolAdmin.address, 
    //   { gasLimit: addPercentage(addProtocolAdminGasLimit, 0.1) }
    // );
    // grantRoleGasLimit = await randomNumController.connect(protocolAdmin).grantRole.estimateGas(
    //   PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, 
    //   gameController.target
    // );
    // await randomNumController.connect(protocolAdmin).grantRole(
    //   PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, 
    //   gameController.target
    //   , { gasLimit: addPercentage(grantRoleGasLimit, 0.1) }
    // )
    // protocolAdminNonceSigner.increment();
    
    // // configure dice games
    // addProtocolAdminGasLimit = await diceGame.addWegaProtocolAdmin.estimateGas(protocolAdmin.address);
    // await diceGame.connect(owner).addWegaProtocolAdmin(protocolAdmin.address, { gasLimit: addPercentage(addProtocolAdminGasLimit,  0.1) });
    // ownerNonceSigner.increment();
    // grantRoleGasLimit = await diceGame.connect(protocolAdmin).grantRole.estimateGas(
    //   PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, 
    //   gameController.target
    // );
    // await diceGame.connect(protocolAdmin).grantRole(
    //   PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, 
    //   gameController.target,
    //   { gasPrice: gasFee }
    // );
    // protocolAdminNonceSigner.increment();

    // // configure coinflip games 
    // addProtocolAdminGasLimit = await coinflipGame.addWegaProtocolAdmin.estimateGas(protocolAdmin.address);
    // await coinflipGame.connect(owner).addWegaProtocolAdmin(protocolAdmin.address, { gasLimit: addPercentage(addProtocolAdminGasLimit,  0.1) } );
    // ownerNonceSigner.increment();
    // await coinflipGame.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, gameController.target, { gasPrice: gasFee  });
    // protocolAdminNonceSigner.increment();
    
    // // // add roles for game on randomNum controller
    // if(!(await randomNumController.isWegaProtocolAdmin(protocolAdmin.address))) {
    //   await randomNumController.connect(owner).addWegaProtocolAdmin(protocolAdmin.address, { gasPrice: gasFee });
    //   ownerNonceSigner.increment();
    // } 
    // await randomNumController.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_ROLE, diceGame.target, { gasPrice: gasFee });
    // protocolAdminNonceSigner.increment();
    // await randomNumController.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_ROLE, coinflipGame.target, { gasPrice: gasFee });
    // protocolAdminNonceSigner.increment();
    // ctx.log('Adding managers done!');


    // // add more randomNumbers
    // let addRandomNumberGasLimit;
    // ctx.log('Adding random numbers!!!');
    // if (inputs.drands.length > 0) {
    //   let chunkSize = 100;
    //   for (let i = 0, j = inputs.drands.length; i < j; i += chunkSize){
    //     const array = inputs.drands.slice(i, i + chunkSize);
    //     ctx.log(`Adding ${array.length} random numbers...`);
    //     const addRandomNumberGasLimit = await randomNumController.connect(protocolAdmin).seedRandomizer.estimateGas(array);
    //     console.log(array)
    //     console.log(gasFee)
    //     // this is the correct way to do it 
    //     await randomNumController.connect(protocolAdmin).seedRandomizer(array, { gasPrice: gasFee }); 
    //     protocolAdminNonceSigner.increment();
    //   }
    // ctx.log(`Adding random numbers done!`);
    // }
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
  tags: ['wega_game_controller'],
  priority: 7,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega GameController');
    const { owner, protocolAdmin } = ctx.accounts;
    const [ ownerNonceMaster, protocolAdminNonceMaster] = [ctx.getNonceSigner(owner), ctx.getNonceSigner(protocolAdmin)];
    let provider = protocolAdminNonceMaster.signer.provider;
    const baseFee =  (await provider?.getBlock('latest'))?.baseFeePerGas as bigint;
    const currentGasLimit = parseUnits('800', 'gwei');
    const gasFee = baseFee + currentGasLimit   
    
    let gameController: any;
    ownerNonceMaster.reset();
    protocolAdminNonceMaster.reset();
    const [
      WegaERC20Escrow,
      WegaRandomizerController,
      WegaDiceGame,
      WegaCoinFlipGame,
      WegaGameController
    ] = unwrapDependencies(
      dependencies,
      [
        ArtifactName.WegaERC20Escrow,
        ArtifactName.WegaRandomizerController,
        ArtifactName.WegaDiceGame,
        ArtifactName.WegaCoinFlipGame,
        ArtifactName.WegaGameController
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
        ctx.artifacts.WegaGameController.connect(owner), [
          WegaERC20Escrow.address,
          WegaRandomizerController.address,
          gameSettings
        ], { 
          initializer: 'initialize',
          kind: 'uups',
          redeployImplementation: 'always',
          txOverrides: { maxFeePerGas: gasFee },
        }
      );
      await gameController.waitForDeployment();
      ownerNonceMaster.increment();
      
      ownerNonceMaster.increment();
      let gameControllerImpl = await upgrades.erc1967.getImplementationAddress(gameController.target as string);
      await ctx.saveContractConfig(ContractName.WegaGameController, gameController, gameControllerImpl);
      await verify(ctx, gameControllerImpl, []);
      ctx.log('Adding protocol admins')
      await gameController.connect(owner).addWegaProtocolAdmin(protocolAdmin.address, { gasFee: gasFee });
    } else {
      gameController = await ctx.artifacts.WegaGameController.connect(owner).deploy();      
      await gameController.connect(owner).initialize(WegaERC20Escrow.implementation, ["DICE", "COINFLIP"], [...gameSettings]);
      await ctx.saveContractConfig(ContractName.WegaGameController, gameController);
    
      await verify(ctx, gameController.target, []);
      ctx.log('Adding protocol admins')
      await gameController.connect(owner).addWegaProtocolAdmin(protocolAdmin.address, { gasLimit: parseUnits('100000', 'wei') });
    } 

  },
  ensureDependencies: (ctx: Deployer, config?: DeployedContractList): DependenciesMap => {
    config = merge(ctx.getDeployConfig(), config);

    const { WegaERC20Escrow, WegaRandomizerController, WegaCoinFlipGame, WegaDiceGame, WegaGameController } = config?.contracts || {};

    const dependencies = { WegaERC20Escrow, WegaRandomizerController, WegaCoinFlipGame, WegaDiceGame, WegaGameController };

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
  tags: ['wega_dice_game'],
  priority: 6,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega Dice Game');
    const { owner, protocolAdmin } = ctx.accounts;
    const [ ownerNonceMaster, protocolAdminNonceMaster ] = [ctx.getNonceSigner(owner), ctx.getNonceSigner(protocolAdmin)];
    ownerNonceMaster.reset();
    protocolAdminNonceMaster.reset();
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
        ctx.artifacts.WegaDiceGame.connect(ownerNonceMaster), [WegaRandomizerController.address], { 
          initializer: 'initialize', 
          kind: 'uups',
          txOverrides: { maxFeePerGas: parseUnits('1500', 'gwei') },
        }
      );
      ownerNonceMaster.increment();
      await wegaDice.waitForDeployment();
    
      let wegaDiceImpl = await upgrades.erc1967.getImplementationAddress(wegaDice.target);
      await ctx.saveContractConfig(ContractName.WegaDiceGame, wegaDice, wegaDiceImpl);
      await verify(ctx, wegaDiceImpl, []);
    } else {
      wegaDice = await WegaDiceGame.connect(owner).deploy();
      await wegaDice.connect(owner).initialize(WegaRandomizerController.address, { gasLimit: parseUnits('100000', 'wei')});
      await ctx.saveContractConfig(ContractName.WegaDiceGame, wegaDice);
      await verify(ctx, wegaDice.target, []);
    }
    ctx.log('Adding protocol admins')
    await wegaDice.connect(ownerNonceMaster).addWegaProtocolAdmin(protocolAdmin.address, { gasLimit: parseUnits('100000', 'wei') });
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
  tags: ['wega_coinflip_game'],
  priority: 5,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega Coinflip Game');
    const { owner, protocolAdmin } = ctx.accounts;
    const [nonceAdmin, nonceOwner] = [ctx.getNonceSigner(protocolAdmin), ctx.getNonceSigner(owner)]

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
    nonceOwner.reset();
    if(ctx.options.proxy) {      
      wegaCoinFlip = await upgrades.deployProxy(
        ctx.artifacts.WegaCoinFlipGame.connect(nonceOwner), [WegaRandomizerController.address], { 
          initializer: 'initialize', 
          kind: 'uups',
          redeployImplementation: "always",
          txOverrides: { maxFeePerGas: parseUnits('700', 'gwei') },
        }
      );
      nonceOwner.increment();
      await wegaCoinFlip.waitForDeployment();
      let wegaCoinFlipImpl = await upgrades.erc1967.getImplementationAddress(wegaCoinFlip.target);
      await ctx.saveContractConfig(ContractName.WegaCoinFlipGame, wegaCoinFlip, wegaCoinFlipImpl);
      await verify(ctx, wegaCoinFlipImpl, []);
    } else {
      wegaCoinFlip = await WegaCoinFlipGame.connect(owner).deploy();
      await wegaCoinFlip.connect(owner).initialize(WegaRandomizerController.address, {gasLimit: parseUnits('100000', 'wei')});
      nonceOwner.increment()
      await ctx.saveContractConfig(ContractName.WegaCoinFlipGame, wegaCoinFlip);
    
      await verify(ctx, wegaCoinFlip.target, []);
    }
    ctx.log('Adding protocol admins')
    await wegaCoinFlip.connect(nonceOwner).addWegaProtocolAdmin(protocolAdmin.address, { gasLimit: parseUnits('100000', 'wei')});
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
  tags: ['wega_random_number_controller'],
  priority: 4,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega random number controller');
    const { owner, protocolAdmin } = ctx.accounts;
    const [nonceAdmin, nonceOwner] = [ctx.getNonceSigner(protocolAdmin), ctx.getNonceSigner(owner)]

    let randController: any;
    nonceOwner.reset();
    if(ctx.options.proxy) {
      randController = await upgrades.deployProxy(
        ctx.artifacts.WegaRandomizerController.connect(nonceOwner), [inputs.initialDrands], { 
          initializer: "initialize",
          kind: 'uups',
          redeployImplementation: "always",
          txOverrides: { maxFeePerGas: parseUnits('1500', 'gwei') },
        }
      );
      await randController.waitForDeployment()
      nonceOwner.increment();

      let randControllerImpl = await upgrades.erc1967.getImplementationAddress(randController.target);
      await ctx.saveContractConfig(ContractName.WegaRandomizerController, randController, randControllerImpl);
      await verify(ctx, randControllerImpl, []);
    } else {
      randController = await ctx.artifacts.WegaRandomizerController.connect(nonceOwner).deploy();
      nonceOwner.increment();
      await randController.connect(nonceOwner).initialize(inputs.initialDrands, {gasLimit: parseUnits('100000', 'wei')});
      nonceOwner.increment();
      await ctx.saveContractConfig(ContractName.WegaRandomizerController, randController);
      await verify(ctx, randController.target, []);
    }
    ctx.log('Adding protocol admins')
    await randController.connect(nonceOwner).addWegaProtocolAdmin(protocolAdmin.address, {gasLimit: parseUnits('100000', 'wei')});
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
  tags: ['wega_erc20_escrow'],
  priority: 3,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega NFT Escrow');
    const { owner, protocolAdmin } = ctx.accounts;
    const [nonceAdmin, nonceOwner] = [ctx.getNonceSigner(protocolAdmin), ctx.getNonceSigner(owner)]
    nonceOwner.reset();
    nonceAdmin.reset();
    const FeeManager = unwrap(dependencies, ArtifactName.FeeManager);
    const { WegaERC20Escrow } = ctx.artifacts;
    let erc20Escrow: any;
    if(ctx.options.proxy) {      
      erc20Escrow = await upgrades.deployProxy(
        ctx.artifacts.WegaERC20Escrow.connect(nonceOwner), [
          FeeManager.address
        ], { 
          initializer: 'initialize', 
          kind: 'uups',
          redeployImplementation: 'always',
          txOverrides: { maxFeePerGas: parseUnits('700', 'gwei') },
        }
      );
      nonceOwner.increment();
      ctx.log('deployment done')
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
    ctx.log('Adding protocol admins');
    await erc20Escrow.connect(nonceOwner).addWegaProtocolAdmin(protocolAdmin.address, {gasLimit: parseUnits('100000', 'wei')});
    nonceOwner.increment()
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
  tags: ['wega_fee_manager'],
  priority: 2,
  inputOptions: true,
  run: async (
    ctx: Deployer, 
    dependencies: DependenciesMap, 
    inputs: any
  ) => {
    ctx.log('Deploying Wega FeeManager');
    const { owner, protocolAdmin } = ctx.accounts;
    const [nonceAdmin, nonceOwner] = [ctx.getNonceSigner(protocolAdmin), ctx.getNonceSigner(owner)]
    let provider = nonceOwner.signer.provider;
    const baseFee =  (await provider?.getBlock('latest'))?.baseFeePerGas as bigint;
    const currentGasLimit = parseUnits('6', 'gwei');
    const gasFee = baseFee + currentGasLimit   
    
    nonceOwner.reset();
    nonceAdmin.reset();
    let feeManager: any;
    if(ctx.options.proxy) {      
      feeManager = await upgrades.deployProxy(
        ctx.artifacts.FeeManager.connect(owner), [], { 
          initializer: false, 
          kind: 'uups',
          redeployImplementation: 'always',
          txOverrides: { maxFeePerGas: parseUnits('500', 'gwei') },
        }
      );
      nonceOwner.increment();
      await feeManager.waitForDeployment();
      await feeManager.connect(owner).initialize({ gasPrice: gasFee }); 
      nonceOwner.increment();

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
    await feeManager.connect(owner).addWegaProtocolAdmin(protocolAdmin.address, { gasPrice: gasFee });
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
  tags: ['erc20_dummy', 'not'],
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
        options: { kind: 'uups', redeployImplementation: 'always', txOverrides: { maxFeePerGas: parseUnits('900', 'gwei') } },
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
