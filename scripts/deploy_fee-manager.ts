import { network } from 'hardhat';
import { mergeNetworkConfig, getNetworkConfig } from '../src/config';
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
  const deployConfig = await deployer.execute(['wega_fee_manager'], config, { 
    feeTaker: chainId == 1337 ? '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' : chainId === 137 ? "0x13C38b2bd4cF15985a1505fc4FAA65aE2AdE45A5": "0x25A9D31Dfe52AaE21526318010f7F4AA4198c353"
  });
  mergeNetworkConfig(deployConfig);
  deployer.log(`Deploy: Contract ${ArtifactName.FeeManager} to network: ${network.name}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });