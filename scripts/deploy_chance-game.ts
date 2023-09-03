import { ethers, network } from "hardhat";
import { getNetworkConfig, mergeNetworkConfig, getRandomNumbersConfig, mergeRandomNumConfig } from '../src/config';
import { BigNumber } from 'ethers';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';


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
  const deployConfig = await deployer.execute(['wega_chance_game'], config, { 
    initialDrands: [ ...randomNumConfig[chainId].drands.map(({ randomness }) => BigNumber.from(randomness)).slice(0, 101) ] 
   });
  mergeNetworkConfig(deployConfig);
  mergeRandomNumConfig({[chainId]: { ...randomNumConfig[chainId], lastStoredIndex: 100 } }, drandChainhash)
  console.log('Deployed!');
}

// curently stores untill lastStoredIndex
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
