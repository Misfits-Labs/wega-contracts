const { ethers } =  require('hardhat');
import { constants, BigNumber, utils } from 'ethers';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { WegaERC20Escrow} from '../types/contracts/escrow';
import { WegaERC20Dummy } from '../types/contracts/dummies';
import { WegaERC20Escrow__factory } from '../types/factories/contracts/escrow'
import { WegaERC20Dummy__factory } from '../types/factories/contracts/dummies'

import { TransactionState } from '../src/types'
import { getRandomExpiryDate, randomNumber } from './helpers/utils'
import { toSolidityShaWithAbiEncoder } from './helpers/eth.utils'

export type RequestInput = (string | number | BigNumber)[]

describe("WegaERC20Escrow", () => {

  // contracts
  let erc20Escrow: WegaERC20Escrow,
      erc20Dummy: WegaERC20Dummy;
      
  // factories
  let erc20EscrowFactory: WegaERC20Escrow__factory,
      erc20DummyFactory: WegaERC20Dummy__factory;

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

  // amounts
  // let aliceAmounts, bobAmounts = [utils.parseEther(String(1)), utils.parseEther(String(5)), utils.parseEther(String(10))];
  
  beforeEach(async () => {

    // accounts setup
    signers = await ethers.getSigners();
    [coinbase, ...others] = signers;
    [alice, bob, carl, david, ed, fred, ...others] = others;

    // factory setup
    erc20EscrowFactory = new WegaERC20Escrow__factory(coinbase);
    erc20DummyFactory = new WegaERC20Dummy__factory(coinbase);
    
    // deploy contracts
    erc20Escrow = await erc20EscrowFactory.deploy('WegaERC20Escrow', '0.0.0');
    erc20Dummy = await erc20DummyFactory.deploy();

    // mint to users
    const defaultUserBalance = utils.parseEther(String(10)) // give everyone 10 eth
    await Promise.all([alice, bob, carl, david, ed, fred].map(
      async (s) => await erc20Dummy.mint(s.address, defaultUserBalance)
    )); 
  });

  describe("Function: hash(address,address,uint256,uint256)", () => {
    it("should correctly return requestId", async () => {
      const requestTypes = ['address','address','uint256','uint256'];
      const requestValues = [erc20Dummy.address, alice.address, utils.parseEther(String(10)), 0];
      const calculatedRequestId = toSolidityShaWithAbiEncoder(requestTypes, requestValues);
      expect(await erc20Escrow.connect(coinbase).hash(erc20Dummy.address, alice.address, utils.parseEther(String(10)), 0)).to.equal(calculatedRequestId)
    });
  });
  describe("Function: createWagerAndDeposit(address,address,uint256,uint256)", () => {
    it("should throw if request data is invalid");
    it("should emit the correct event and create a new escrow request");
  });

  // describe('Function: cancelRequest()', () => {
  //   it('should throw if caller is not ownerAgainst or ownerFor', async () => {});
  //   it('should emit correct RequestCancelation event and transfer NFTs to respected owners', async () => {});
  // })
  // describe('Function: approve(bytes32,address,address,uint256)', async () => {
  //   it('should allow only the escrow request creator to approve a request', async () => {});
  //   it('should emit the Approval event and set the correct information on the request', async () => {});
  // });
  describe("Getters", () => {
    
    // beforeEach(async () => {
    //   let tokenIdAgainst1 = BigNumber.from(aliceTokenIds[0]),
    //       tokenIdFor1 = BigNumber.from(bobTokenIds[0]),
    //       tokenIdAgainst2 = BigNumber.from(aliceTokenIds[1]),
    //       tokenIdFor2 = BigNumber.from(bobTokenIds[1]),
    //       tokenIdAgainst3 = BigNumber.from(bobTokenIds[2]),
    //       tokenIdFor3 = BigNumber.from(aliceTokenIds[2]);

    //   await nftDummyOne.connect(alice).approve(nftEscrow.address, tokenIdAgainst1);
    //   await nftDummyOne.connect(alice).approve(nftEscrow.address, tokenIdAgainst2);
    //   await nftDummyTwo.connect(bob).approve(nftEscrow.address, tokenIdAgainst3);
    //   await nftEscrow.connect(alice).createRequestAndDeposit(nftDummyOne.address, tokenIdAgainst1, getRandomExpiryDate());
    //   await nftEscrow.connect(alice).createRequestAndDeposit(nftDummyOne.address, tokenIdAgainst2, getRandomExpiryDate());
    //   await nftEscrow.connect(bob).createRequestAndDeposit(nftDummyTwo.address, tokenIdAgainst3, getRandomExpiryDate());
    // })
    it('should return all created escrow requests')
    it('should return a single escrow request')
  })
});
