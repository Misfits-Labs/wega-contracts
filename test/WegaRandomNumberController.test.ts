const { ethers, upgrades } =  require('hardhat');
import { constants, BigNumber, utils } from 'ethers';
import { expect } from 'chai';
import { uniq } from 'lodash'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { WegaRandomNumberController, WegaRandomNumberController__factory } from '../types';
import { getRandomNumbersConfig } from '../src/config';

export type RequestInput = (string | number | BigNumber)[]


describe("Wega RandomNumber Controller", () => {
  
  // random numbers 
  const drandChainhash: string = "dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493";
  const randomNumConfig = getRandomNumbersConfig(drandChainhash);
  const randomNumbers = randomNumConfig['1337'].drands.map(({ randomness }) => BigNumber.from(randomness)).slice(0, 101);

  // contracts
  let controller: WegaRandomNumberController,
      controllerFactory: WegaRandomNumberController__factory;

  // accounts
  let signers: SignerWithAddress[],      
      protocolAdmin: SignerWithAddress, 
      coinbase: SignerWithAddress, 
      others: SignerWithAddress[],
      alice: SignerWithAddress, 
      bob: SignerWithAddress, 
      carl: SignerWithAddress,
      david: SignerWithAddress,
      ed: SignerWithAddress,
      fred: SignerWithAddress;
  
  beforeEach(async () => {
    // accounts setup
    signers = await ethers.getSigners();
    [coinbase, protocolAdmin, ...others] = signers;
    [alice, bob, carl, david, ed, fred, ...others] = others;

    // factory setup
    controllerFactory = new WegaRandomNumberController__factory(coinbase);
    
    // deploy contracts
    controller = await upgrades.deployProxy(controllerFactory, [randomNumbers], { kind: 'uups', initializer: 'initialize' });
    
    // add appropriate roles
    controller.connect(coinbase).addWegaProtocolAdmin(protocolAdmin.address);
  });

  describe('Initialization', () => {
   it('should correctly set the random numbers', async () => {
    let randomNumbersCount = randomNumbers.length
    // random number length should be around 5k
    expect(await controller.randomNumbersCount()).to.equal(randomNumbersCount);
   })
  })
  describe('Rolling', () => {
   it('it should unpredictably roll a random number each time', async () => {
    const rolls = [alice.address, alice.address, alice.address];
    const denom = 6; // dice
    const randoms = await Promise.all(rolls.map(async (address, index) => {
      const random = await controller.generate(denom, index);
      return random.toNumber();
    }));
    expect(uniq(randoms).length).to.equal(randoms.length);
   });
  })
  
});
