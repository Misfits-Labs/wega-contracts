import { network, upgrades } from 'hardhat';
import { BigNumber, Contract, utils } from 'ethers';
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
* deploys the wega nft escrow
*/
const deployNftEscrowTask: Task = {
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
    const nftEscrow = await WegaERC20Escrow.connect(owner).deploy(...inputs.escrow);
    await ctx.saveContractConfig(ContractName.WegaERC20Escrow, nftEscrow);
    await nftEscrow.deployTransaction.wait();
    await verify(ctx, nftEscrow.address, [...inputs.escrow]);
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
    const erc20Dummy = await WegaERC20Dummy.connect(owner).deploy();
    await ctx.saveContractConfig(ContractName.WegaERC20Dummy, erc20Dummy);
    await erc20Dummy.deployTransaction.wait();
    await verify(ctx, erc20Dummy.address, []);
    // // mint Token Ids
    if (inputs.tokenReceivers.length > 0) {
      let chunkSize = 2;
      for (let i = 0, j = inputs.tokenReceivers.length; i < j; i += chunkSize){
        const array = inputs.tokenReceivers.slice(i, i + chunkSize);
        await Promise.all(array.map(async (receiver: string) => {
          console.log('minting tokens', array);
          const tokenAmount = 10000;
          const gp = await erc20Dummy.provider.getGasPrice();
          const tenPercent = gp.mul(BigNumber.from(10)).div(100);
          const tx = await erc20Dummy.connect(owner).mint(receiver, utils.parseEther(String(tokenAmount)), { gasPrice: gp.add(tenPercent) });
          await tx.wait();
          console.log(`successfully minted ${tokenAmount} to ${receiver}`);
        }))
      }
    }
  },
  ensureDependencies: () =>({})
}

export const tasks: Task[] = [
  deployNftEscrowTask,
  deployERC20DummyTask,
];
