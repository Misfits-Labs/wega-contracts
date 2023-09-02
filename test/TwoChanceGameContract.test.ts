const { ethers } =  require('hardhat');
import { constants, BigNumber, utils } from 'ethers';
import { expect } from 'chai';
import { uniq } from 'lodash'
import drand from '../.random-numbers/random-numbers-dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493.json'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { TwoWayChanceGame } from '../types/contracts/games';
import { TwoWayChanceGame__factory } from '../types/factories/contracts/games'

export type RequestInput = (string | number | BigNumber)[]


describe("TwoWayChanceGameContract", () => {
  
  // random numbers 
  const randomNumbers = drand.drands.map(({ randomness }) => BigNumber.from(randomness)).slice(0, 101);


  // contracts
  let twoChance: TwoWayChanceGame,
      twoChanceFactory: TwoWayChanceGame__factory;

  // accounts
  let signers: SignerWithAddress[],
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
    [coinbase, ...others] = signers;
    [alice, bob, carl, david, ed, fred, ...others] = others;

    // factory setup
    twoChanceFactory = new TwoWayChanceGame__factory(coinbase);
    
    // deploy contracts
    twoChance = await twoChanceFactory.deploy(randomNumbers);
  });

  describe('Initialization', () => {
   it('should correctly set the random numbers', async () => {
    let randomNumbersCount = randomNumbers.length
    // random number length should be around 5k
    expect(await twoChance.randomNumbersCount()).to.equal(randomNumbersCount);
   })
  })
  describe('Rolling', () => {
   it('it should unpredictably roll a random number each time', async () => {
    const rolls = [alice.address, alice.address, alice.address, alice.address];
    const denom = 6; // dice
    const randoms = await Promise.all(rolls.map(async (address, index) => {
     return (await twoChance.roll(denom, index, address)).toNumber();
    }));
    expect(uniq(randoms).length).to.equal(randoms.length);
   });
  })
  
});
