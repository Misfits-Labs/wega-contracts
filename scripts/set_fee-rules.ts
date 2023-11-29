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
  await deployer.execute(['set_fee_rules'], config, {
    feeTaker: chainId == 1337 ? '0xBcd4042DE499D14e55001CcbB24a551F3b954096' : chainId === 80001 ? "0x011dF297Da65Cb87a9a8878fF4C8F7d0D3814314" : '0x13C38b2bd4cF15985a1505fc4FAA65aE2AdE45A5'
  });
  deployer.log('Fee rules set');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});