import { network } from 'hardhat';
import { toBigInt } from 'ethers';
import { 
  getNetworkConfig,
  getRandomNumbersConfig, 
  mergeRandomNumConfig 
} from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';

async function main () {
  const chainId: number = unwrap(network.config, 'chainId');
  const drandChainhash: string = "dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493";
  const randomNumConfig = getRandomNumbersConfig(drandChainhash);  
  const config = getNetworkConfig(chainId);

  if (!config) {
    throw new Error(`HDNS config not found for network ${chainId}`);
  }
  const deployer = await Deployer.create();
  const drandIndexesToAdd = 1000;
  const initialDrands = randomNumConfig[chainId].drands.map(({ randomness }) => toBigInt(randomness)).slice(0, 1100);
  const drands = randomNumConfig[chainId].drands.map(({ randomness }) => toBigInt(randomness)).slice(1101, 2101);
  console.log('these are the drands', initialDrands, drands)
  deployer.log('Network:', network.name);


  await deployer.execute(['configure_wega_protocol'], config, {
    initialDrands,
    drands
  });
  // adds all the relevant access control info
  deployer.log('Configure Prototocol', network.name);
  mergeRandomNumConfig({[chainId]: {
    ...randomNumConfig[chainId], 
    lastStoredIndex: drandIndexesToAdd + 100,  
  }}, drandChainhash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });