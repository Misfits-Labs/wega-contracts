const { ethers, upgrades } =  require('hardhat');
import { constants, BigNumber, utils } from 'ethers';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { 
  WegaERC20Escrow,
  WegaERC20Escrow__factory, 
  WegaERC20Dummy,
  WegaERC20Dummy__factory,
  FeeManager,
  FeeManager__factory
} from '../types';

import { TransactionState, HexishString, FeeConfig } from '../src/types'
import { getRandomExpiryDate, randomNumber } from './helpers/utils'
import { toSolidityShaWithAbiEncoder } from './helpers/eth.utils'

export type RequestInput = (string | number | BigNumber)[]


describe("WegaERC20Escrow", () => {

  // contracts
  let erc20Escrow: WegaERC20Escrow,
      erc20Dummy: WegaERC20Dummy, 
      feeManager: FeeManager;
      
  // factories
  let erc20EscrowFactory: WegaERC20Escrow__factory,
      erc20DummyFactory: WegaERC20Dummy__factory,
      feeManagerFactory: FeeManager__factory;


  // accounts
  let signers: SignerWithAddress[],
      protocolAdmin: SignerWithAddress, 
      coinbase: SignerWithAddress, 
      gameController: SignerWithAddress,
      alice: SignerWithAddress, 
      bob: SignerWithAddress, 
      carl: SignerWithAddress,
      david: SignerWithAddress,
      ed: SignerWithAddress,
      feeTaker: SignerWithAddress;

  // amounts
  let aliceAmounts: BigNumber[]  = [utils.parseEther(String(1)), utils.parseEther(String(5)), utils.parseEther(String(10))];
  let bobAmounts: BigNumber[] = aliceAmounts;
  let carlAmounts: BigNumber[] = aliceAmounts;


  let feeConfigs: FeeConfig[];

  beforeEach(async () => {
    // accounts setup
    signers = await ethers.getSigners();
    [coinbase, protocolAdmin, gameController, feeTaker, ...signers] = signers;
    [alice, bob, carl, david, ed, ...signers] = signers;

    // factory setup
    erc20EscrowFactory = new WegaERC20Escrow__factory(coinbase);
    erc20DummyFactory = new WegaERC20Dummy__factory(coinbase);
    feeManagerFactory = new FeeManager__factory(coinbase);
    
    // deploy contracts
    feeManager = await upgrades.deployProxy(feeManagerFactory, [], { kind: 'uups', initializer: 'initialize'});
    await feeManager.connect(coinbase).addWegaProtocolAdmin(protocolAdmin.address);

    erc20Escrow = await upgrades.deployProxy(erc20EscrowFactory, [
      feeManager.address
    ], { kind: 'uups'});

    erc20Dummy = await erc20DummyFactory.deploy([
      alice.address, 
      bob.address, 
      carl.address, 
      david.address, 
      ed.address
    ]);
    await erc20Escrow.connect(coinbase).addWegaProtocolAdmin(protocolAdmin.address);

    feeConfigs = [
      { 
       feeTaker: erc20Escrow.address as HexishString,
       feeShare: 500,
       shouldApply: true,
      }
     ]
    await feeManager.connect(protocolAdmin).setFeeConfigs([feeTaker.address], feeConfigs);
  });

  describe("Function: hash(address,address,uint256,uint256)", () => {
    it("should correctly return requestId", async () => {
      const requestTypes = ['address','address','uint256','uint256','uint256'];
      const requestValues = [erc20Dummy.address, alice.address, 2, utils.parseEther(String(10)), 0];
      const calculatedRequestId = toSolidityShaWithAbiEncoder(requestTypes, requestValues);
      expect(await erc20Escrow.connect(coinbase).hash(erc20Dummy.address, alice.address, 2, utils.parseEther(String(10)), 0)).to.equal(calculatedRequestId);
    });
  });
  describe("Function: createWagerRequest(address,address,uint256,uint256)", () => {
    it("should allow only escrowManager to call", async () => {
      const request = [
        constants.AddressZero, 
        alice.address, 
        2, 
        utils.parseEther(String(5))
      ]
      await expect(erc20Escrow.connect(alice).createWagerRequest(
        request[0] as string, 
        request[1] as string, 
        request[2],
        request[3],
        )
      ).to.be.revertedWith("WegaAccessControl: CallerNotAllowed");
    })
    it("should throw if request data is invalid", async () => {
      await erc20Dummy.connect(alice).approve(erc20Escrow.address, utils.parseEther(String(5)));

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
          0, 
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
        await expect(erc20Escrow.connect(escrowManager).createWagerRequest(
          request[0] as string, 
          request[1] as string, 
          request[2],
          request[3],
          )
        ).to.be.revertedWith("WegaEscrow: InvalidRequestData");
      }))
    });
    it("should emit the correct event and create a new escrow request", async () => {
      const depositors = 2;
      const token = erc20Dummy.address as string;
      const account = alice.address as string;
      const nonce = await erc20Escrow.currentNonce(alice.address);
      const wager = aliceAmounts[0] 
      await erc20Dummy.connect(alice).approve(erc20Escrow.address, aliceAmounts[0]);
      const escId = await erc20Escrow.hash(token, account, depositors, wager, nonce);
      await expect(erc20Escrow.connect(escrowManager).createWagerRequest(token, account, depositors, wager)).to.emit(erc20Escrow, 'WagerRequestCreation').withArgs(escId, token, account, wager);
    });
  });
  describe("Function: deposit(bytes32,uint256)", () => {
    let accounts: SignerWithAddress[];
    let escrowId: any;
    let wager: BigNumber = utils.parseEther("5");
    let creator: SignerWithAddress;  
    let nonce: any;
    let token: any;
    let depositors: number;
    beforeEach(async () => {
      token = erc20Dummy.address as string;
      accounts = [bob, ed, carl];
      depositors = accounts.length;
      creator = bob;
      nonce = await erc20Escrow.currentNonce(creator.address);

      // simulate wager creation
      escrowId = await erc20Escrow.hash(token, creator.address, depositors, wager, nonce);
      await erc20Dummy.connect(creator).approve(erc20Escrow.address, wager);
      await erc20Escrow.connect(escrowManager).createWagerRequest(token, bob.address, depositors, wager);
    })
    it("should allow only escrowManager to call", async () => {
      await expect(erc20Escrow.connect(alice).deposit(
        escrowId as string, 
        alice.address as string, 
        wager)
      ).to.be.revertedWith("WegaAccessControl: CallerNotAllowed");
    })
    it("should throw if wager amount is more or less then ask amount", async () => {
      await erc20Dummy.connect(accounts[1]).increaseAllowance(erc20Escrow.address, wager);
      await expect(erc20Escrow.connect(escrowManager).deposit(escrowId, accounts[1].address, wager.sub(BigNumber.from("2")))).to.be.revertedWith("WegaEscrow: InvalidWagerAmount")
      await expect(erc20Escrow.connect(escrowManager).deposit(escrowId, accounts[1].address, wager.add(BigNumber.from("4")))).to.be.revertedWith("WegaEscrow: InvalidWagerAmount")
    });
    it("should throw if creator is the one depositing", async () => {
      await erc20Dummy.connect(creator).increaseAllowance(erc20Escrow.address, wager);
      await expect(erc20Escrow.connect(escrowManager).deposit(escrowId, creator.address, wager)).to.be.revertedWith("WegaEscrow: CanOnlyDepositOnce")
    })
    it("should deposit wager amount and emit the correct event", async ()=> {
      await erc20Dummy.connect(accounts[2]).increaseAllowance(erc20Escrow.address, wager);
      await expect(erc20Escrow.connect(escrowManager).deposit(escrowId, accounts[2].address , wager)).to.emit(erc20Escrow, 'WagerDeposit').withArgs(escrowId, wager, accounts[2].address);
    });
    it("should correctly change state if the total wager amount is reached", async () => {
      // arrange
      await erc20Dummy.connect(accounts[1]).increaseAllowance(erc20Escrow.address, wager);
      await erc20Dummy.connect(accounts[2]).increaseAllowance(erc20Escrow.address, wager);
      
      // act 
      await erc20Escrow.connect(escrowManager).deposit(escrowId, accounts[1].address, wager);
      await erc20Escrow.connect(escrowManager).deposit(escrowId, accounts[2].address, wager);
      
      // assert
      const request = await erc20Escrow.getWagerRequest(escrowId);
      expect(request.state).to.be.equal(TransactionState.PENDING);
    });

    it("should reject if tx state is not OPEN", async () => {
      // arrange
      await erc20Dummy.connect(accounts[1]).increaseAllowance(erc20Escrow.address, wager);
      await erc20Dummy.connect(accounts[2]).increaseAllowance(erc20Escrow.address, wager);
      await erc20Dummy.connect(fred).increaseAllowance(erc20Escrow.address, wager);
      
      // act 
      await erc20Escrow.connect(escrowManager).deposit(escrowId, accounts[1].address, wager);
      await erc20Escrow.connect(escrowManager).deposit(escrowId, accounts[2].address, wager);
      
      // assert
      await expect(erc20Escrow.connect(escrowManager).deposit(escrowId, fred.address, wager)).to.be.revertedWith("WegaEscrow: InvalidRequestState");
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
      nonce = await erc20Escrow.currentNonce(alice.address);
      aliceWager = utils.parseEther(String(5));

      // for querying one
      escrowId = await erc20Escrow.hash(token, alice.address, 2, aliceWager, nonce);
      await erc20Dummy.connect(alice).approve(erc20Escrow.address, aliceWager);
      await erc20Escrow.connect(escrowManager).createWagerRequest(token, alice.address, 2, aliceWager);
      
      await Promise.all(accounts.map(async (acc) => {
        const w = utils.parseEther(String(5));
        // console.log(await erc20Dummy.balanceOf(acc.address), w); 
        await erc20Dummy.connect(acc).approve(erc20Escrow.address, w);
        await erc20Escrow.connect(escrowManager).createWagerRequest(token, acc.address, 2, w);
      }))
    })

    it('should return all created escrow requests', async () => {
      const wagerRequests = await erc20Escrow.getWagerRequests(); 
      expect(wagerRequests.length).to.equal(accounts.length + 1);
    });

    it('should return a single escrow request', async () => {
      const request = await erc20Escrow.getWagerRequest(escrowId);
      expect(request.escrowHash).to.equal(escrowId);
      expect(request.wagerAmount).to.equal(aliceWager);
      expect(request.tokenAddress).to.equal(erc20Dummy.address);
      expect(request.nonce).to.equal(nonce);
      expect(request.totalWager).to.equal(aliceWager.mul(BigNumber.from(2)));
    });
    it('should return the correct deposit amount of a user', async () => {
      expect(await erc20Escrow.depositOf(escrowId, alice.address)).to.equal(aliceWager);
    })
    it('should return true if a player exists in a wager', async () => {
      expect(await erc20Escrow.containsPlayer(escrowId, alice.address)).to.be.true;
    })
  })

  describe('Withdrawals', () => {
    let gameController: SignerWithAddress;
    let winner: SignerWithAddress;
    let loser: SignerWithAddress;
    let escrowId: any;
    let wager: BigNumber;
    let nonce: any;
    let token: any;
    let winningAmount: BigNumber;

    beforeEach(async () => {
      gameController = fred;
      winner = carl;
      loser = bob; 
      
      token = erc20Dummy.address as string;
      nonce = await erc20Escrow.currentNonce(winner.address);
      wager = utils.parseEther(String(5));

      // for querying one
      escrowId = await erc20Escrow.hash(token, winner.address, 2, wager, nonce);
      await erc20Dummy.connect(winner).approve(erc20Escrow.address, wager);
      await erc20Dummy.connect(loser).approve(erc20Escrow.address, wager);
      await erc20Escrow.connect(escrowManager).createWagerRequest(token, winner.address, 2, wager);
    })
    describe('Function: setWithdrawer(bytes32 escrowId, address winner)', () => {
      it('can only be called by escrowManager', async () => {
        await expect(erc20Escrow.connect(alice).setWithdrawers(escrowId, [winner.address])).to.be.revertedWith("WegaAccessControl: CallerNotAllowed")
      });
      it('can only be called if escrow is pending', async () => {
        await expect(erc20Escrow.connect(escrowManager).setWithdrawers(escrowId, [winner.address])).to.be.revertedWith("WegaEscrow: InvalidRequestState")
      });
      it('must contain withdrawer as player', async () => {
      await erc20Escrow.connect(escrowManager).deposit(escrowId, loser.address, wager);
        await expect(erc20Escrow.connect(escrowManager).setWithdrawers(escrowId, [alice.address])).to.be.revertedWith("WegaEscrow: InvalidRequestData")
      });
      it('must emit the correct event and set wager state as READY', async () => {
        await erc20Escrow.connect(escrowManager).deposit(escrowId, loser.address, wager);
        await expect(erc20Escrow.connect(escrowManager).setWithdrawers(escrowId, [winner.address])).to.emit(erc20Escrow, 'SetWithdrawers');
        expect((await erc20Escrow.getWagerRequest(escrowId)).state).to.equal(TransactionState.READY);
      });
    })
    describe('Function: withdraw(bytes32 escrowId)', () => {

      it('can only be called by players with balance', async () => {
        await erc20Escrow.connect(escrowManager).deposit(escrowId, loser.address, wager);
        await erc20Escrow.connect(escrowManager).setWithdrawers(escrowId, [winner.address]);
        await expect(erc20Escrow.connect(gameController).withdraw(escrowId)).to.be.revertedWith("WegaEscrow: InsufficientBalance")
      })
      it('it should emit the correct event and transfer the correct amount', async () => {
        const balanceB: BigNumber = await erc20Dummy.balanceOf(winner.address);
        await erc20Escrow.connect(escrowManager).deposit(escrowId, loser.address, wager);
        await erc20Escrow.connect(escrowManager).setWithdrawers(escrowId, [winner.address]);
        await expect(erc20Escrow.connect(winner).withdraw(escrowId)).to.emit(erc20Escrow, 'WagerWithdrawal').withArgs(escrowId, wager.add(wager), winner.address);
        expect(await erc20Dummy.balanceOf(winner.address)).to.equal(balanceB.add(wager.add(wager)));
        expect((await erc20Escrow.getWagerRequest(escrowId)).state).to.equal(TransactionState.CLOSED);
      })
    })
  })
});
