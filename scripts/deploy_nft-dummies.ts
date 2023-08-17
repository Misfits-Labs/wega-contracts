import { ethers, network } from "hardhat";
import { getNetworkConfig, mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';


async function main() {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  const config = getNetworkConfig(chainId);
  if (!config) {
    throw new Error(`Config not found for network ${chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['nft_dummies'], config, {
    dummyOne: [
      'WegaDummyOne',
      'WDO',
    ],
    dummyTwo: [
      'WegaDummyTwo',
      'WDT'
    ],
    nftOwners: [
      '0x50111E51Cf97d6165e1A88D5CA0d4a4fa5d6c47E',
      '0xAb397611416676127365C7C7c731bf9F77F46B88', 
    ],
  });
  mergeNetworkConfig(deployConfig);
  
  console.log('Deployed!');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
