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
  let aliceAmounts: BigNumber[]  = [utils.parseEther(String(1)), utils.parseEther(String(5)), utils.parseEther(String(10))];
  let bobAmounts: BigNumber[] = aliceAmounts;
  let carlAmounts: BigNumber[] = aliceAmounts;
  
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
    const defaultUserBalance = utils.parseEther(String(1000)) // give everyone 10 eth
    await Promise.all([alice, bob, carl, david, ed, fred].map(
      async (s) => await erc20Dummy.mint(s.address, defaultUserBalance)
    )); 
  });

  describe("Function: hash(address,address,uint256,uint256)", () => {
    it("should correctly return requestId", async () => {
      const requestTypes = ['address','address','uint256','uint256','uint256'];
      const requestValues = [erc20Dummy.address, alice.address, 2, utils.parseEther(String(10)), 0];
      const calculatedRequestId = toSolidityShaWithAbiEncoder(requestTypes, requestValues);
      expect(await erc20Escrow.connect(coinbase).hash(erc20Dummy.address, alice.address, 2, utils.parseEther(String(10)), 0)).to.equal(calculatedRequestId);
    });
  });
  describe("Function: createWagerAndDeposit(address,address,uint256,uint256)", () => {
    it("should throw if request data is invalid", async () => {
      const invalidRequests = [
        [
          constants.AddressZero, 
          alice.address, 
          2, 
          utils.parseEther(String(5))
        ],
        [
          erc20Dummy.address, 
          constants.AddressZero, 
          2, 
          utils.parseEther(String(5)), 
        ],
        [
          erc20Dummy.address, 
          alice.address, 
          1, 
          utils.parseEther(String(5)), 
        ],
        [
          erc20Dummy.address, 
          alice.address, 
          2, 
          0, 
        ],
      ]
      await Promise.all(invalidRequests.map(async (request) => {
        await expect(erc20Escrow.connect(alice).createWagerAndDeposit(
          request[0] as string, 
          request[1] as string, 
          request[2],
          request[3],
          )
        ).to.be.rejectedWith("WegaEscrow_InvalidRequestData()");
      }))
    });
    it("should emit the correct event and create a new escrow request", async () => {
      const depositors = 2;
      const token = erc20Dummy.address as string;
      const account = alice.address as string;
      const nonce = await erc20Escrow.currentNonce();
      const wager = aliceAmounts[0] 
      await erc20Dummy.connect(alice).approve(erc20Escrow.address, aliceAmounts[0]);
      const escId = await erc20Escrow.hash(token, account, depositors, wager, nonce);
      await expect(erc20Escrow.connect(alice).createWagerAndDeposit(token, account, depositors, wager)).to.emit(erc20Escrow, 'WagerRequestCreation').withArgs(escId, token, account, wager);
    });

  });

  describe("Getters", () => {
    let accounts: SignerWithAddress[];
    let escrowId: any;
    let aliceWager: BigNumber;
    let nonce: any;
    beforeEach(async () => {
      const depositors = 2;
      const token = erc20Dummy.address as string;
      accounts = [bob, carl];
      nonce = await erc20Escrow.currentNonce();
      aliceWager = utils.parseEther(String(5));

      // for querying one
      escrowId = await erc20Escrow.hash(token, alice.address, 2, aliceWager, nonce);
      await erc20Dummy.connect(alice).approve(erc20Escrow.address, aliceWager);
      await erc20Escrow.createWagerAndDeposit(token, alice.address, 2, aliceWager);
      
      await Promise.all(accounts.map(async (acc) => {
        const w = utils.parseEther(String(5));
        // console.log(await erc20Dummy.balanceOf(acc.address), w);
        await erc20Dummy.connect(acc).approve(erc20Escrow.address, w);
        await erc20Escrow.createWagerAndDeposit(token, acc.address, 2, w);
      }))
    })
    it('should return all created escrow requests', async () => {
      const wagerRequests = await erc20Escrow.getWagerRequests(); 
      expect(wagerRequests.length).to.equal(accounts.length + 1);
    })
    it('should return a single escrow request', async () => {
      const request = await erc20Escrow.getWagerRequest(escrowId);
      expect(request.escrowId).to.equal(escrowId);
      expect(request.wager).to.equal(aliceWager);
      expect(request.token).to.equal(erc20Dummy.address);
      expect(request.nonce).to.equal(nonce);
      expect(request.totalWager).to.equal(aliceWager.mul(BigNumber.from(2)));
    })
  })
  // describe('Function: cancelRequest()', () => {
  //   it('should throw if caller is not ownerAgainst or ownerFor', async () => {});
  //   it('should emit correct RequestCancelation event and transfer NFTs to respected owners', async () => {});
  // })
  // describe('Function: approve(bytes32,address,address,uint256)', async () => {
  //   it('should allow only the escrow request creator to approve a request', async () => {});
  //   it('should emit the Approval event and set the correct information on the request', async () => {});
  // });
});
