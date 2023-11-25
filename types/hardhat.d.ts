/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

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
      name: "ERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Upgradeable__factory>;
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
      name: "ReentrancyGuardUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuardUpgradeable__factory>;
    getContractFactory(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControl__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC1822Proxiable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1822Proxiable__factory>;
    getContractFactory(
      name: "IERC1155Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Errors__factory>;
    getContractFactory(
      name: "IERC20Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Errors__factory>;
    getContractFactory(
      name: "IERC721Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Errors__factory>;
    getContractFactory(
      name: "IBeacon",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeacon__factory>;
    getContractFactory(
      name: "ERC1967Utils",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Utils__factory>;
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
      name: "Address",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Address__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "Math",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Math__factory>;
    getContractFactory(
      name: "Nonces",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Nonces__factory>;
    getContractFactory(
      name: "ReentrancyGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuard__factory>;
    getContractFactory(
      name: "EnumerableMap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EnumerableMap__factory>;
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
      name: "IFeeManagerEvents",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFeeManagerEvents__factory>;
    getContractFactory(
      name: "IWegaGameControllerEvents",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaGameControllerEvents__factory>;
    getContractFactory(
      name: "IWegaRandomizerControllerEvents",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaRandomizerControllerEvents__factory>;
    getContractFactory(
      name: "FeeManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FeeManager__factory>;
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
      name: "IFeeManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFeeManager__factory>;
    getContractFactory(
      name: "IWegaGameController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaGameController__factory>;
    getContractFactory(
      name: "IWegaRandomizerController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaRandomizerController__factory>;
    getContractFactory(
      name: "IWegaRandomizer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWegaRandomizer__factory>;
    getContractFactory(
      name: "WegaRandomizer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaRandomizer__factory>;
    getContractFactory(
      name: "WegaEscrowManagerRole",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaEscrowManagerRole__factory>;
    getContractFactory(
      name: "WegaFeeAdminRole",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaFeeAdminRole__factory>;
    getContractFactory(
      name: "WegaGameManagerRole",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaGameManagerRole__factory>;
    getContractFactory(
      name: "WegaProtocolAdminRole",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaProtocolAdminRole__factory>;
    getContractFactory(
      name: "WegaGameController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaGameController__factory>;
    getContractFactory(
      name: "WegaRandomizerController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WegaRandomizerController__factory>;

    getContractAt(
      name: "AccessControlUpgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlUpgradeable>;
    getContractAt(
      name: "IAccessControlUpgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlUpgradeable>;
    getContractAt(
      name: "OwnableUpgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "IERC1822ProxiableUpgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822ProxiableUpgradeable>;
    getContractAt(
      name: "IERC1967Upgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1967Upgradeable>;
    getContractAt(
      name: "IBeaconUpgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeaconUpgradeable>;
    getContractAt(
      name: "ERC1967UpgradeUpgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967UpgradeUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "UUPSUpgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.UUPSUpgradeable>;
    getContractAt(
      name: "ERC20Upgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Upgradeable>;
    getContractAt(
      name: "IERC20Upgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Upgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "ERC165Upgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: "IERC165Upgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: "ReentrancyGuardUpgradeable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuardUpgradeable>;
    getContractAt(
      name: "IAccessControl",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControl>;
    getContractAt(
      name: "Ownable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC1822Proxiable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822Proxiable>;
    getContractAt(
      name: "IERC1155Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Errors>;
    getContractAt(
      name: "IERC20Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Errors>;
    getContractAt(
      name: "IERC721Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Errors>;
    getContractAt(
      name: "IBeacon",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeacon>;
    getContractAt(
      name: "ERC1967Utils",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967Utils>;
    getContractAt(
      name: "ERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "Address",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Address>;
    getContractAt(
      name: "IERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "Math",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Math>;
    getContractAt(
      name: "Nonces",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Nonces>;
    getContractAt(
      name: "ReentrancyGuard",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuard>;
    getContractAt(
      name: "EnumerableMap",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.EnumerableMap>;
    getContractAt(
      name: "WegaERC20Dummy",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaERC20Dummy>;
    getContractAt(
      name: "IWegaERC20Escrow",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaERC20Escrow>;
    getContractAt(
      name: "WegaERC20Escrow",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaERC20Escrow>;
    getContractAt(
      name: "IERC20EscrowEvents",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20EscrowEvents>;
    getContractAt(
      name: "IFeeManagerEvents",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IFeeManagerEvents>;
    getContractAt(
      name: "IWegaGameControllerEvents",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaGameControllerEvents>;
    getContractAt(
      name: "IWegaRandomizerControllerEvents",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaRandomizerControllerEvents>;
    getContractAt(
      name: "FeeManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.FeeManager>;
    getContractAt(
      name: "IWega",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWega>;
    getContractAt(
      name: "IWegaCoinFlipGame",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaCoinFlipGame>;
    getContractAt(
      name: "IWegaDiceGame",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaDiceGame>;
    getContractAt(
      name: "Wega",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Wega>;
    getContractAt(
      name: "WegaCoinFlipGame",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaCoinFlipGame>;
    getContractAt(
      name: "WegaDiceGame",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaDiceGame>;
    getContractAt(
      name: "IFeeManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IFeeManager>;
    getContractAt(
      name: "IWegaGameController",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaGameController>;
    getContractAt(
      name: "IWegaRandomizerController",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaRandomizerController>;
    getContractAt(
      name: "IWegaRandomizer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWegaRandomizer>;
    getContractAt(
      name: "WegaRandomizer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaRandomizer>;
    getContractAt(
      name: "WegaEscrowManagerRole",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaEscrowManagerRole>;
    getContractAt(
      name: "WegaFeeAdminRole",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaFeeAdminRole>;
    getContractAt(
      name: "WegaGameManagerRole",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaGameManagerRole>;
    getContractAt(
      name: "WegaProtocolAdminRole",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaProtocolAdminRole>;
    getContractAt(
      name: "WegaGameController",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaGameController>;
    getContractAt(
      name: "WegaRandomizerController",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WegaRandomizerController>;

    deployContract(
      name: "AccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AccessControlUpgradeable>;
    deployContract(
      name: "IAccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAccessControlUpgradeable>;
    deployContract(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OwnableUpgradeable>;
    deployContract(
      name: "IERC1822ProxiableUpgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1822ProxiableUpgradeable>;
    deployContract(
      name: "IERC1967Upgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1967Upgradeable>;
    deployContract(
      name: "IBeaconUpgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBeaconUpgradeable>;
    deployContract(
      name: "ERC1967UpgradeUpgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC1967UpgradeUpgradeable>;
    deployContract(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Initializable>;
    deployContract(
      name: "UUPSUpgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.UUPSUpgradeable>;
    deployContract(
      name: "ERC20Upgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20Upgradeable>;
    deployContract(
      name: "IERC20Upgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Upgradeable>;
    deployContract(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ContextUpgradeable>;
    deployContract(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC165Upgradeable>;
    deployContract(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165Upgradeable>;
    deployContract(
      name: "ReentrancyGuardUpgradeable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ReentrancyGuardUpgradeable>;
    deployContract(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAccessControl>;
    deployContract(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IERC1822Proxiable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1822Proxiable>;
    deployContract(
      name: "IERC1155Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1155Errors>;
    deployContract(
      name: "IERC20Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Errors>;
    deployContract(
      name: "IERC721Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Errors>;
    deployContract(
      name: "IBeacon",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBeacon>;
    deployContract(
      name: "ERC1967Utils",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC1967Utils>;
    deployContract(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "Address",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Address>;
    deployContract(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "Math",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Math>;
    deployContract(
      name: "Nonces",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Nonces>;
    deployContract(
      name: "ReentrancyGuard",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ReentrancyGuard>;
    deployContract(
      name: "EnumerableMap",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.EnumerableMap>;
    deployContract(
      name: "WegaERC20Dummy",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaERC20Dummy>;
    deployContract(
      name: "IWegaERC20Escrow",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaERC20Escrow>;
    deployContract(
      name: "WegaERC20Escrow",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaERC20Escrow>;
    deployContract(
      name: "IERC20EscrowEvents",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20EscrowEvents>;
    deployContract(
      name: "IFeeManagerEvents",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IFeeManagerEvents>;
    deployContract(
      name: "IWegaGameControllerEvents",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaGameControllerEvents>;
    deployContract(
      name: "IWegaRandomizerControllerEvents",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaRandomizerControllerEvents>;
    deployContract(
      name: "FeeManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FeeManager>;
    deployContract(
      name: "IWega",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWega>;
    deployContract(
      name: "IWegaCoinFlipGame",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaCoinFlipGame>;
    deployContract(
      name: "IWegaDiceGame",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaDiceGame>;
    deployContract(
      name: "Wega",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Wega>;
    deployContract(
      name: "WegaCoinFlipGame",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaCoinFlipGame>;
    deployContract(
      name: "WegaDiceGame",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaDiceGame>;
    deployContract(
      name: "IFeeManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IFeeManager>;
    deployContract(
      name: "IWegaGameController",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaGameController>;
    deployContract(
      name: "IWegaRandomizerController",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaRandomizerController>;
    deployContract(
      name: "IWegaRandomizer",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaRandomizer>;
    deployContract(
      name: "WegaRandomizer",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaRandomizer>;
    deployContract(
      name: "WegaEscrowManagerRole",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaEscrowManagerRole>;
    deployContract(
      name: "WegaFeeAdminRole",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaFeeAdminRole>;
    deployContract(
      name: "WegaGameManagerRole",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaGameManagerRole>;
    deployContract(
      name: "WegaProtocolAdminRole",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaProtocolAdminRole>;
    deployContract(
      name: "WegaGameController",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaGameController>;
    deployContract(
      name: "WegaRandomizerController",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaRandomizerController>;

    deployContract(
      name: "AccessControlUpgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AccessControlUpgradeable>;
    deployContract(
      name: "IAccessControlUpgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAccessControlUpgradeable>;
    deployContract(
      name: "OwnableUpgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OwnableUpgradeable>;
    deployContract(
      name: "IERC1822ProxiableUpgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1822ProxiableUpgradeable>;
    deployContract(
      name: "IERC1967Upgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1967Upgradeable>;
    deployContract(
      name: "IBeaconUpgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBeaconUpgradeable>;
    deployContract(
      name: "ERC1967UpgradeUpgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC1967UpgradeUpgradeable>;
    deployContract(
      name: "Initializable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Initializable>;
    deployContract(
      name: "UUPSUpgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.UUPSUpgradeable>;
    deployContract(
      name: "ERC20Upgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20Upgradeable>;
    deployContract(
      name: "IERC20Upgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Upgradeable>;
    deployContract(
      name: "ContextUpgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ContextUpgradeable>;
    deployContract(
      name: "ERC165Upgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC165Upgradeable>;
    deployContract(
      name: "IERC165Upgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165Upgradeable>;
    deployContract(
      name: "ReentrancyGuardUpgradeable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ReentrancyGuardUpgradeable>;
    deployContract(
      name: "IAccessControl",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAccessControl>;
    deployContract(
      name: "Ownable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IERC1822Proxiable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1822Proxiable>;
    deployContract(
      name: "IERC1155Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1155Errors>;
    deployContract(
      name: "IERC20Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Errors>;
    deployContract(
      name: "IERC721Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Errors>;
    deployContract(
      name: "IBeacon",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBeacon>;
    deployContract(
      name: "ERC1967Utils",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC1967Utils>;
    deployContract(
      name: "ERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "Address",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Address>;
    deployContract(
      name: "IERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "Math",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Math>;
    deployContract(
      name: "Nonces",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Nonces>;
    deployContract(
      name: "ReentrancyGuard",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ReentrancyGuard>;
    deployContract(
      name: "EnumerableMap",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.EnumerableMap>;
    deployContract(
      name: "WegaERC20Dummy",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaERC20Dummy>;
    deployContract(
      name: "IWegaERC20Escrow",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaERC20Escrow>;
    deployContract(
      name: "WegaERC20Escrow",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaERC20Escrow>;
    deployContract(
      name: "IERC20EscrowEvents",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20EscrowEvents>;
    deployContract(
      name: "IFeeManagerEvents",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IFeeManagerEvents>;
    deployContract(
      name: "IWegaGameControllerEvents",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaGameControllerEvents>;
    deployContract(
      name: "IWegaRandomizerControllerEvents",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaRandomizerControllerEvents>;
    deployContract(
      name: "FeeManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FeeManager>;
    deployContract(
      name: "IWega",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWega>;
    deployContract(
      name: "IWegaCoinFlipGame",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaCoinFlipGame>;
    deployContract(
      name: "IWegaDiceGame",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaDiceGame>;
    deployContract(
      name: "Wega",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Wega>;
    deployContract(
      name: "WegaCoinFlipGame",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaCoinFlipGame>;
    deployContract(
      name: "WegaDiceGame",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaDiceGame>;
    deployContract(
      name: "IFeeManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IFeeManager>;
    deployContract(
      name: "IWegaGameController",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaGameController>;
    deployContract(
      name: "IWegaRandomizerController",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaRandomizerController>;
    deployContract(
      name: "IWegaRandomizer",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWegaRandomizer>;
    deployContract(
      name: "WegaRandomizer",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaRandomizer>;
    deployContract(
      name: "WegaEscrowManagerRole",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaEscrowManagerRole>;
    deployContract(
      name: "WegaFeeAdminRole",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaFeeAdminRole>;
    deployContract(
      name: "WegaGameManagerRole",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaGameManagerRole>;
    deployContract(
      name: "WegaProtocolAdminRole",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaProtocolAdminRole>;
    deployContract(
      name: "WegaGameController",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaGameController>;
    deployContract(
      name: "WegaRandomizerController",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WegaRandomizerController>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
