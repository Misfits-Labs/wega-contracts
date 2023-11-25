import { ArtifactName, DependenciesMap, DeployedContract } from './types';
import { upgrades } from 'hardhat';
import { Contract } from 'ethers';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unwrap (object: any, key: string): any {
  if (!object[key]) {
    throw new Error(`Unwrap: cannot find key ${key} on object ${object.toString()}`);
  }
  return object[key];
}

export function unwrapDependencies (dependencies: DependenciesMap, keys: ArtifactName[]): DeployedContract[] {
  return keys.map((key) => unwrap(dependencies, key));
}

export async function forceImport(
  address: string, 
  implFactory: any,
  opts: any,
){
  return await upgrades.forceImport(address, implFactory, opts); 
}; 

export type UpgradeContractParams = {
  implementationFactory: any,
  deployedContractConfig: DeployedContract,
  forceImport?: {
    address: string,
    options: any, 
  },
  options?: any
}
export async function upgradeContract({
  implementationFactory,
  deployedContractConfig, 
  forceImport,
  options
}: UpgradeContractParams) {
    let legacyAddress: string;
    let contractInstance: Contract;
    if (forceImport && forceImport.address) {
      const forceImportContract = await upgrades.forceImport(
        forceImport.address,
        implementationFactory,
        forceImport.options
      ) 
      legacyAddress = forceImportContract.target as string;  
      contractInstance = await upgrades.upgradeProxy(forceImportContract, options);
    } else { 
      legacyAddress = deployedContractConfig.implementation as string;
      contractInstance = await upgrades.upgradeProxy(
        deployedContractConfig.address, 
        implementationFactory, 
        options
      );
    }
    if(contractInstance.deployTransAction) await contractInstance.deployTransAction();
    return {contractInstance, legacyAddress};
}

// let gameCtlImpl = await upgrades.erc1967.getImplementationAddress(WegaGameController.address);
//     await ctx.saveContractConfig(ContractName.WegaGameController, gameController, gameCtlImpl, [legacyAddress, ...WegaGameController.legacyAddresses]);
//     await verify(ctx, gameCtlImpl, []);
