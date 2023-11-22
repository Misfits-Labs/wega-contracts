const { ethers, upgrades } =  require('hardhat');
import { constants, BigNumber, utils } from 'ethers';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { FeeManager, FeeManager__factory } from '../types';

import { TransactionState, FeeConfig, HexishString } from '../src/types'
import { toSolidityShaWithAbiEncoder } from './helpers/eth.utils'

export type RequestInput = (string | number | BigNumber)[]


describe("WegaFeeManager", () => {

  // contracts
  let feeManager: FeeManager;
      
  // factories
  let feeManagerFactory: FeeManager__factory;

  // accounts
  let signers: SignerWithAddress[],
      coinbase: SignerWithAddress, 
      protocolAdmin: SignerWithAddress, 
      feeTaker: SignerWithAddress,
      feeApplier: SignerWithAddress; 

  // amounts
  let aliceAmounts: BigNumber[]  = [utils.parseEther(String(1)), utils.parseEther(String(5)), utils.parseEther(String(10))];
  let bobAmounts: BigNumber[] = aliceAmounts;
  let carlAmounts: BigNumber[] = aliceAmounts;

  // configs
  let feeConfigs: FeeConfig[];
  
  before(async () => {

    // accounts setup
    signers = await ethers.getSigners();
    [coinbase, protocolAdmin, feeTaker, feeApplier, ...signers] = signers;

    // factory setup
    feeManagerFactory = new FeeManager__factory(coinbase);
    
    // deploy contracts
    feeManager = await upgrades.deployProxy(feeManagerFactory, [], { kind: 'uups', initializer: 'initialize'}) as FeeManager;
    await feeManager.connect(coinbase).addWegaProtocolAdmin(protocolAdmin.address);

    // feeConfigs
    feeConfigs = [
     { 
      applier: feeApplier.address as HexishString,
      feeTaker: feeTaker.address as HexishString,
      feeShare: 500,
      shouldApply: false,
     }
    ]
  });
  describe("Function: setFeeConfigs(address[],FeeConfig[])", () => {
   it("should allow only protocol admin to call", async () => {
    await expect(feeManager.connect(signers[0]).setFeeConfigs(feeConfigs)).to.be.revertedWith("WegaAccessControl: CallerNotAllowed");
   })
   it("should correctly set the fee configurations and emit correct event", async () => {
      await  expect(feeManager.connect(protocolAdmin).setFeeConfigs([feeApplier.address], feeConfigs)).to.emit(feeManager, 'SetFeeRule').withArgs(
       feeApplier.address, 
       feeConfigs[0].feeTaker, 
       feeConfigs[0].feeShare
      );
      
    });
  });
  describe("Function: shouldApplyFees(address)", () => {
   it("should return true if should apply fees", async () => {
    await feeManager.connect(protocolAdmin).setFeeConfigs([feeApplier.address], feeConfigs);
    expect(await feeManager.shouldApplyFees(feeApplier.address)).to.be.false;
   })
  });
  describe("Function: getFeeRule(address)", () => {
   it("should return true if should apply fees", async () => {
    const rule = await feeManager.getFeeRule(feeApplier.address);
    expect(rule.feeShare).to.be.equal(feeConfigs[0].feeShare);
    expect(rule.feeTaker).to.be.equal(feeConfigs[0].feeTaker);
    expect(rule.shouldApply).to.be.equal(feeConfigs[0].shouldApply);
   })
  });
  describe("Function: calculateFeesForTransfer(address,uint256)", () => {
   it("should correctly calculate the feeShare", async () => {
    const amount = utils.parseEther('5');
    const feeAmountControl = amount.mul(BigNumber.from(feeConfigs[0].feeShare)).div(BigNumber.from(10000));
    const data = await feeManager.calculateFeesForTransfer(feeApplier.address, amount);
    expect(data.feeTaker).to.be.equal(feeConfigs[0].feeTaker);
    expect(data.feeAmount).to.be.equal(feeAmountControl);
    expect(data.sendAmount).to.be.equal(amount.sub(feeAmountControl));
   })
  });
});
