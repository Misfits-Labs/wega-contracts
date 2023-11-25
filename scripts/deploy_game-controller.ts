import { ethers, network } from "hardhat";
import { 
  getNetworkConfig, 
  mergeNetworkConfig, 
  getRandomNumbersConfig, 
  mergeRandomNumConfig 
} from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';
import { toBigInt } from 'ethers';


async function main() {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  const drandChainhash: string = "dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493";
  const randomNumConfig = getRandomNumbersConfig(drandChainhash);
  const config = getNetworkConfig(chainId);
  if (!config) {
    throw new Error(`Config not found for network ${chainId}`);
  }
  const deployer = await Deployer.create();
  const drandIndexesToAdd = 500;
  const lastStoredIndex = randomNumConfig[chainId].lastStoredIndex ?? 0;
  const startIndex = lastStoredIndex == 0 ? lastStoredIndex : lastStoredIndex + 1;
  const stopIndex = lastStoredIndex > 0 ? lastStoredIndex + drandIndexesToAdd + 1 : drandIndexesToAdd
  const drands = randomNumConfig[chainId].drands.map(({ randomness }) => toBigInt(randomness)).slice(startIndex, stopIndex); 
  
  const deployConfig = await deployer.execute(['wega_game_controller'], config, { drands });

  mergeNetworkConfig(deployConfig);
  mergeRandomNumConfig({[chainId]: { 
    ...randomNumConfig[chainId], 
    lastStoredIndex: startIndex > 0 ? drands.length + startIndex - 1 : drands.length   
  } }, drandChainhash);
  console.log('Deployed!');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
