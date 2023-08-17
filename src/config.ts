import fs from 'fs';
import { merge } from 'lodash';
import { DeployedContractList, DeployedContractsConfig } from './types';

const configPath = './deployed-addresses.json';

export function getConfig (): DeployedContractsConfig {
  const file = fs.existsSync(configPath) ? fs.readFileSync(configPath).toString() : '{}';
  return JSON.parse(file.length ? file : '{ "version": "0.0.0 }');
}

export function getNetworkConfig (chainId: number): DeployedContractList {
  const { networks } = getConfig();
  return networks[chainId];
}

export function mergeNetworkConfig (config: DeployedContractsConfig) {

  const _config = merge(getConfig(), config);
  // console.log(JSON.stringify(_config, null, 4))
  fs.writeFileSync(configPath, `${JSON.stringify(_config, null, 4)}\n`);
}
