import fs from 'fs';
import { merge } from 'lodash';
import { DeployedContractList, DeployedContractsConfig, RandomNumbersConfig } from './types';


const configPath = './deployed-addresses.json';
const drandConfigPath = './.random-numbers'

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
  fs.writeFileSync(configPath, `${JSON.stringify(_config, null, 4)}\n`);
}

export function mergeRandomNumConfig (config: Partial<RandomNumbersConfig>, chainHash: string) {
  const _config = merge(getRandomNumbersConfig(chainHash), config);
  fs.writeFileSync(drandConfigPath.concat(`/random-numbers-${chainHash}.json`), `${JSON.stringify(_config, null, 4)}\n`);
  return _config;
} 


export function getRandomNumbersConfig(chainHash: string): RandomNumbersConfig {
  const file = fs.existsSync(drandConfigPath.concat(`/random-numbers-${chainHash}.json`))
  ? fs.readFileSync(drandConfigPath.concat(`/random-numbers-${chainHash}.json`)).toString()
  : '{}';
  return JSON.parse(file.length ? file : '{}');
 }