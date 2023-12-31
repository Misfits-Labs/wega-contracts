// require("@nomicfoundation/hardhat-chai-matchers");
import '@openzeppelin/hardhat-upgrades';
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";


import path from 'path';
import fs from 'fs';
import { HardhatUserConfig } from 'hardhat/types/config';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { pickBy } from 'lodash';

const dotenv = require('dotenv');
dotenv.config();

type MintersMap = Record<string, string[]>;
type AdminsMap = Record<string, string[]>;
type ProtocolAdminsMap = Record<string, string[]>;
type TokenManagersMap = Record<string, string[]>;
export type Treasury = { address: string; name: string; };
type Treasuries = Record<string, Treasury[]>;
type Pools = Record<string, string[]>;

// We need to extend HardhatUserConfig in order to support custom uns settings.
declare module 'hardhat/types/config' {
  
  interface HardhatUserConfig {
    accounts?: {
      minters: MintersMap;
      admins: AdminsMap;
    };
  }
  
  interface HardhatConfig {
    accounts: {
      minters: MintersMap;
      admins: AdminsMap;
    };
  }

  interface ProjectPathsUserConfig {
    flatArtifacts: string;
  }

  interface ProjectPathsConfig {
    flatArtifacts: string;
  }
}

import '@nomiclabs/hardhat-solhint';
// import '@typechain/hardhat';
// import '@nomiclabs/hardhat-ethers';
// import '@nomiclabs/hardhat-waffle';
// import "@nomicfoundation/hardhat-toolbox";
// import "@nomicfoundation/hardhat-verify"

// import '@nomiclabs/hardhat-etherscan';

// import '@openzeppelin/hardhat-upgrades';

// There are no type declarations for
// require('solidity-coverage');

// import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import yargs from 'yargs/yargs';

// import { Sandbox } from './sandbox';

/// ENVVAR
// - ENABLE_GAS_REPORT
// - ENABLE_CONTRACT_SIZER
// - CI
const argv = yargs().env('').boolean('enableGasReport').boolean('enableContractSizer').boolean('ci').parseSync();

task(
  TASK_COMPILE,
  'hook compile task to perform post-compile task',
  async (_, hre: HardhatRuntimeEnvironment, runSuper) => {
    const { root, flatArtifacts } = hre.config.paths;
    const outputDir = path.resolve(root, flatArtifacts);

    await runSuper();

    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    for (const artifactPath of await hre.artifacts.getArtifactPaths()) {
      const artifact = fs.readFileSync(artifactPath);
      const { abi, contractName } = JSON.parse(artifact.toString());
      if (!abi.length || contractName.includes('Mock')) continue;

      const target = path.join(outputDir, `${contractName}.json`);
      fs.copyFileSync(artifactPath, target);
    }
  },
);

// NOTE: Order matters
import "tsconfig-paths/register";
import 'hardhat-abi-exporter';

const settings = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.5.12',
        settings,
      },
      {
        version: '0.6.6',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
      {
        version: '0.8.4',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
      {
        version: '0.8.9',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
      {
        version: '0.8.11',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
      {
        version: '0.8.13',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
      {
        version: '0.8.14',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
      {
        version: '0.8.19',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
      {
        version: '0.8.20',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
    ],
  },
  paths: {
    artifacts: './.artifacts',
    flatArtifacts: './artifacts',
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      blockGasLimit: 10000000,
      initialBaseFeePerGas: 0,
      hardfork: 'shanghai',
      chainId: 1337,
    },
    localhost: {
      allowUnlimitedContractSize: true,
      url: 'http://127.0.0.1:8545',
      chainId: 1337,
      loggingEnabled: true,
    },
    // sandbox: Sandbox.defaultNetworkOptions(),
    goerli: {
     url: process.env.GOERLI_RPC_URL,
     chainId: 5,
     accounts: process.env.GOERLI_DEPLOYER_PRIVATE_KEY ? [process.env.GOERLI_DEPLOYER_PRIVATE_KEY as string] : undefined,
    },
    mainnet: {
     url: process.env.MAINNET_RPC_URL,
     chainId: 1,
     accounts: process.env.MAINNET_DEPLOYER_PRIVATE_KEY ? [process.env.MAINNET_DEPLOYER_PRIVATE_KEY as string] : undefined,
     loggingEnabled: true,
    },
    mumbai: {
     url: process.env.MUMBAI_RPC_URL,
     chainId: 80001,
     accounts: [
      process.env.MUMBAI_DEPLOYER_PRIVATE_KEY as string,
      process.env.MUMBAI_PROTOCOL_ADMIN_PRIVATE_KEY as string
      ],
     loggingEnabled: true,
     blockGasLimit: 20000000,
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      chainId: 137,
      accounts: process.env.POLYGON_DEPLOYER_PRIVATE_KEY ? [
        process.env.POLYGON_DEPLOYER_PRIVATE_KEY as string,
        process.env.POLYGON_PROTOCOL_ADMIN_PRIVATE_KEY as string
      ] : undefined,
      loggingEnabled: true,
      blockGasLimit: 44000000000 
    },
    skaleCalypsoTestnet: {
      url: process.env.SKALE_CALYPSO_RPC_URL,
      chainId: 344106930,
      accounts: process.env.SKALE_DEPLOYER_PRIVATE_KEY ? [process.env.SKALE_DEPLOYER_PRIVATE_KEY as string] : undefined,
      loggingEnabled: true,
    },
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v6',
  },
  gasReporter: {
    enabled: argv.enableGasReport,
    currency: 'USD',
    outputFile: argv.ci ? 'gas-report.txt' : undefined,
    excludeContracts: ['ERC721ReceiverMock', 'ERC2771RegistryContextMock', 'ERC20Upgradeable'],
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: argv.enableContractSizer,
    disambiguatePaths: false,
    only: ['DEPLOYERRegistry.sol', 'ProxyReader.sol', 'MintingManager.sol', 'MainController.sol', 'MainControllerBase.sol', 'PaymentSettings.sol'],
  },
  mocha: {
    timeout: 100000,
    require: ['./test/helpers/setup.ts'],
  },
  etherscan: {
    apiKey: pickBy({
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    }) as Record<string, string>,
  },
  abiExporter: {
    path: './artifacts/abi',
    clear: true,
    flat: true,
    except: ['Mock'],
    spacing: 0,
  },
  accounts: {
    minters: {
      hardhat: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
      localhost: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
      polygon: [process.env.POLYGON_PROTOCOL_ADMIN_ADDRESS as string],
      mumbai: [process.env.MUMBAI_PROTOCOL_ADMIN_ADDRESS as string],
    },
    admins: {
      hardhat: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
      localhost: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
      polygon: [process.env.POLYGON_PROTOCOL_ADMIN_ADDRESS as string],
      mumbai: [process.env.MUMBAI_PROTOCOL_ADMIN_ADDRESS as string],
    },
  },
};
export default config;
