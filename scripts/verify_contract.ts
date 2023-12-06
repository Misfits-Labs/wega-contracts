import { network } from 'hardhat';
import { getNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';
import { ArtifactName, ContractName } from '../src/types';

async function main () {
  const deployer = await Deployer.create();
  deployer.log('Network:', network.name);
  const chainId: number = unwrap(network.config, 'chainId');
  const config = getNetworkConfig(chainId);
  if (!config) {
    throw new Error(`HDNS config not found for network ${chainId}`);
  }
  await deployer.execute(['verify_contract'], config, [ 
    {
      artifactName: ArtifactName.WegaERC20Escrow,
      contractName: ContractName.WegaERC20Escrow,
    },
  ]);
  deployer.log('Verify: Contract', network.name);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });