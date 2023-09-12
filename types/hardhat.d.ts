/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlUpgradeable__factory>;
    getContractFactory(
      name: "IAccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlUpgradeable__factory>;
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "IERC1822ProxiableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1822ProxiableUpgradeable__factory>;
    getContractFactory(
      name: "IERC1967Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1967Upgradeable__factory>;
    getContractFactory(
      name: "IBeaconUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeaconUpgradeable__factory>;
    getContractFactory(
      name: "ERC1967UpgradeUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967UpgradeUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "UUPSUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UUPSUpgradeable__factory>;
    getContractFactory(
      name: "IERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Upgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "WegaERC20Dummy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaERC20Dummy__factory>;
    getContractFactory(
      name: "IWegaERC20Escrow",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaERC20Escrow__factory>;
    getContractFactory(
      name: "WegaERC20Escrow",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaERC20Escrow__factory>;
    getContractFactory(
      name: "IERC20EscrowEvents",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20EscrowEvents__factory>;
    getContractFactory(
      name: "IWegaGameControllerEvents",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaGameControllerEvents__factory>;
    getContractFactory(
      name: "IWega",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWega__factory>;
    getContractFactory(
      name: "IWegaCoinFlipGame",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaCoinFlipGame__factory>;
    getContractFactory(
      name: "IWegaDiceGame",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaDiceGame__factory>;
    getContractFactory(
      name: "Wega",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Wega__factory>;
    getContractFactory(
      name: "WegaCoinFlipGame",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaCoinFlipGame__factory>;
    getContractFactory(
      name: "WegaDiceGame",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaDiceGame__factory>;
    getContractFactory(
      name: "IWegaGameController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaGameController__factory>;
    getContractFactory(
      name: "IWegaRandomNumberController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaRandomNumberController__factory>;
    getContractFactory(
      name: "WegaEscrowManagerRole",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaEscrowManagerRole__factory>;
    getContractFactory(
      name: "WegaGameManagerRole",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaGameManagerRole__factory>;
    getContractFactory(
      name: "WegaGameController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaGameController__factory>;
    getContractFactory(
      name: "WegaRandomNumberController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaRandomNumberController__factory>;

    getContractAt(
      name: "AccessControlUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlUpgradeable>;
    getContractAt(
      name: "IAccessControlUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlUpgradeable>;
    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "IERC1822ProxiableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822ProxiableUpgradeable>;
    getContractAt(
      name: "IERC1967Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1967Upgradeable>;
    getContractAt(
      name: "IBeaconUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeaconUpgradeable>;
    getContractAt(
      name: "ERC1967UpgradeUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967UpgradeUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "UUPSUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UUPSUpgradeable>;
    getContractAt(
      name: "IERC20Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Upgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "ERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: "IERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "WegaERC20Dummy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaERC20Dummy>;
    getContractAt(
      name: "IWegaERC20Escrow",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaERC20Escrow>;
    getContractAt(
      name: "WegaERC20Escrow",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaERC20Escrow>;
    getContractAt(
      name: "IERC20EscrowEvents",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20EscrowEvents>;
    getContractAt(
      name: "IWegaGameControllerEvents",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaGameControllerEvents>;
    getContractAt(
      name: "IWega",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWega>;
    getContractAt(
      name: "IWegaCoinFlipGame",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaCoinFlipGame>;
    getContractAt(
      name: "IWegaDiceGame",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaDiceGame>;
    getContractAt(
      name: "Wega",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Wega>;
    getContractAt(
      name: "WegaCoinFlipGame",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaCoinFlipGame>;
    getContractAt(
      name: "WegaDiceGame",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaDiceGame>;
    getContractAt(
      name: "IWegaGameController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaGameController>;
    getContractAt(
      name: "IWegaRandomNumberController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaRandomNumberController>;
    getContractAt(
      name: "WegaEscrowManagerRole",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaEscrowManagerRole>;
    getContractAt(
      name: "WegaGameManagerRole",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaGameManagerRole>;
    getContractAt(
      name: "WegaGameController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaGameController>;
    getContractAt(
      name: "WegaRandomNumberController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaRandomNumberController>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
