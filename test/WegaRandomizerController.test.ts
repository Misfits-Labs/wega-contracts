const { ethers, upgrades } =  require('hardhat');
import { BigNumberish, toBigInt  } from 'ethers';
import { expect } from 'chai';
import { uniq } from 'lodash'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { WegaRandomizerController, WegaRandomizerController__factory, WegaRandomizer, WegaRandomizer__factory} from '../types';
import { getRandomNumbersConfig } from '../src/config';
import { PROTOCOL_ROLES } from '../src/constants';

export type RequestInput = (string | number | BigNumberish)[]


describe("Wega RandomNumber Controller", () => {
  
  // random numbers 
  const drandChainhash: string = "dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493";
  const randomNumConfig = getRandomNumbersConfig(drandChainhash);
  const randomNumbers = randomNumConfig['1337'].drands.map(({ randomness }) => toBigInt(randomness)).slice(0, 101);

  // contracts
  let controller: WegaRandomizerController,
      randomizer: any,
      controllerFactory: WegaRandomizerController__factory;

  // accounts
  let signers: HardhatEthersSigner[],      
      protocolAdmin: HardhatEthersSigner, 
      coinbase: HardhatEthersSigner, 
      others: HardhatEthersSigner[],
      alice: HardhatEthersSigner, 
      bob: HardhatEthersSigner, 
      carl: HardhatEthersSigner,
      david: HardhatEthersSigner,
      ed: HardhatEthersSigner,
      fred: HardhatEthersSigner;
  
  before(async () => {
    
    // accounts setup
    signers = await ethers.getSigners();
    [coinbase, protocolAdmin, ...others] = signers;
    [alice, bob, carl, david, ed, fred, ...others] = others;

    // factory setup
    controllerFactory = new WegaRandomizerController__factory(coinbase);
    
    // deploy contracts
    controller = await upgrades.deployProxy(controllerFactory, [randomNumbers], { kind: 'uups', initializer: 'initialize' });
    randomizer = new WegaRandomizer__factory(coinbase).attach(await controller.getRandomizer());

    
    // add appropriate roles
    await controller.connect(coinbase).addWegaProtocolAdmin(protocolAdmin.address);
    await controller.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, protocolAdmin.address);
  });

  describe('Initialization', () => {
    it('should the owner on the randomizer to be the controller', async () => {
      expect((await randomizer.owner()).toLowerCase()).to.equal((controller.target as string).toLowerCase())
    })
    it('should correctly set the random numbers', async () => {
      let randomNumbersCount = randomNumbers.length
      // random number length should be around 5k
      expect(await randomizer.randomNumbersCount()).to.equal(randomNumbersCount);
    })
    it('should allow only the protocolAdmin to set new randomizer', async () => {
      await expect(controller.setRandomizer(controller.target)).to.be.revertedWith('WegaAccessControl: CallerNotAllowed');
    })
    it('should set new randomizer and emit the correct event', async () => {
      await expect(controller.connect(protocolAdmin).setRandomizer(randomizer.target)).to.be.emit(controller, 'RandomizerSet').withArgs(randomizer.target);
    })
  })
  describe('Seeding and spawning', async () => {
    it('should only be called by the gameController', async () => {
      await expect(controller.incrementControllerNonce()).to.be.revertedWith('WegaAccessControl: CallerNotAllowed');
    })
    it('should correctly increment the controller nonce', async () => {
      const controllerNonceBefore = await randomizer.nonces(controller.target);
      await controller.connect(protocolAdmin).incrementControllerNonce();
      expect(await randomizer.nonces(controller.target)).to.equal(Number(controllerNonceBefore)+1)
    })
    it('should allow only the protocol admin to spawn a new randomizer', async () => {
      await expect(controller.spawnRandomizer(randomNumbers)).to.be.revertedWith('WegaAccessControl: CallerNotAllowed')
    })
  })
  describe('Rolling', () => {
   it('it should unpredictably roll a random number each time', async () => {
    const denom = 6; // dice
    let randoms = [];
    await controller.connect(protocolAdmin).incrementControllerNonce();
    randoms.push(await controller.generate(denom));
    await controller.connect(protocolAdmin).incrementControllerNonce();
    randoms.push(await controller.generate(denom));
    await controller.connect(protocolAdmin).incrementControllerNonce();
    randoms.push(await controller.generate(denom));
    // 66% of the time it will be unique, this will improve as the randomizer get seeded with new random numbers
    expect(uniq(randoms).length <= 3 && uniq(randoms).length >= 2).to.be.true; 
   });
  })  
});
