import { network } from 'hardhat';
import { getNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';

async function main () {
  const deployer = await Deployer.create();
  deployer.log('Network:', network.name);
  const chainId: number = unwrap(network.config, 'chainId');
  const config = getNetworkConfig(chainId);
  if (!config) {
    throw new Error(`HDNS config not found for network ${chainId}`);
  }
  await deployer.execute(['configure_protocol'], config);
  // adds all the relevant access control info
  deployer.log('Upgrade: Contract', network.name);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });