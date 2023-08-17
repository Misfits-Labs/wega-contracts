import { network, run } from 'hardhat';
import { Deployer } from './deployer';

export default async (ctx: Deployer, address: string, args: unknown[]) => {
  try {
    if (ctx.network.chainId !== 1337) {
      await run('verify:verify', {
        address,
        constructorArguments: args,
      });
    } else {
      ctx.log('skipping verification for localhost ...');  
    }
  } catch (err) {
    ctx.log('Verification failed', { chainId: network.config.chainId, address, args });
  }
};