import { expect } from 'chai';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers, upgrades } from 'hardhat';
import { Contract, parseEther, toBigInt, ZeroAddress } from 'ethers';
import { 
  WegaERC20Escrow,
  WegaERC20Escrow__factory, 
  WegaERC20Dummy,
  WegaERC20Dummy__factory,
  FeeManager,
  FeeManager__factory,
  AccessControlUpgradeable
} from '../types';

import { TransactionState, HexishString, FeeConfig } from '../src/types'
import { PROTOCOL_ROLES } from '../src/constants'
import { getRandomExpiryDate, randomNumber } from './helpers/utils'
import { toSolidityShaWithAbiEncoder } from './helpers/eth.utils'

export type RequestInput = (string | number | bigint)[]


describe("WegaERC20Escrow", () => {

  // contracts
  let erc20Escrow: any,
      erc20Dummy: any, 
      feeManager: any;
      
  // factories
  let erc20EscrowFactory: WegaERC20Escrow__factory,
      erc20DummyFactory: WegaERC20Dummy__factory,
      feeManagerFactory: FeeManager__factory;


  // accounts
  let signers: HardhatEthersSigner[],
      protocolAdmin: HardhatEthersSigner, 
      coinbase: HardhatEthersSigner, 
      gameController: HardhatEthersSigner,
      alice: HardhatEthersSigner, 
      bob: HardhatEthersSigner, 
      carl: HardhatEthersSigner,
      david: HardhatEthersSigner,
      ed: HardhatEthersSigner,
      feeTaker: HardhatEthersSigner;

  // amounts
  let aliceAmounts: bigint[]  = [parseEther(String(1)), parseEther(String(5)), parseEther(String(10))];
  let bobAmounts: bigint[] = aliceAmounts;
  let carlAmounts: bigint[] = aliceAmounts;


  let feeConfigs: FeeConfig[];

  before(async () => {
    // accounts setup
    signers = await ethers.getSigners();
    [coinbase, protocolAdmin, gameController, feeTaker, ...signers] = signers;
    [alice, bob, carl, david, ed, ...signers] = signers;
    
    // factory setup
    erc20EscrowFactory = new WegaERC20Escrow__factory(coinbase);
    erc20DummyFactory = new WegaERC20Dummy__factory(coinbase);
    feeManagerFactory = new FeeManager__factory(coinbase);
    
    // deploy contracts
    feeManager = await upgrades.deployProxy(feeManagerFactory, [], { kind: 'uups', initializer: 'initialize' });
    await feeManager.addWegaProtocolAdmin(protocolAdmin.address);

    erc20Escrow = await upgrades.deployProxy(erc20EscrowFactory, 
      [ feeManager.target ], { kind: 'uups', initializer: 'initialize' }
    );

    erc20Dummy = await erc20DummyFactory.deploy([
      alice.address, 
      bob.address, 
      carl.address, 
      david.address, 
      ed.address
    ]);

    await erc20Escrow.connect(coinbase).addWegaProtocolAdmin(protocolAdmin.address);
    await erc20Escrow.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, gameController.address);
    feeConfigs = [
      { 
        applier: erc20Escrow.target as HexishString,
        feeTaker: erc20Escrow.target as HexishString,
        feeShare: 500,
        shouldApply: true,
      }
     ]
    await feeManager.connect(protocolAdmin).setFeeConfigs(feeConfigs);
  });

  describe("Function: hash(address,address,uint256,uint256)", () => {
    it("should correctly return requestId", async () => {
      const requestTypes = ['address','address','uint256','uint256','uint256'];
      const requestValues = [erc20Dummy.target, alice.address, 2, parseEther(String(10)), 0];
      const calculatedRequestId = toSolidityShaWithAbiEncoder(requestTypes, requestValues);
      expect(await erc20Escrow.connect(coinbase).hash(erc20Dummy.target, alice.address, 2, parseEther(String(10)), 0)).to.equal(calculatedRequestId);
    });
  });

  describe("Function: createWagerRequest(address,address,uint256,uint256)", () => {
    it("should allow only gameController to call", async () => {
      const request = [
        ZeroAddress, 
        alice.address, 
        2, 
        parseEther(String(5))
      ]
      await expect(erc20Escrow.connect(alice).createWagerRequest(
        request[0] as string, 
        request[1] as string, 
        request[2],
        request[3],
        )
      ).to.be.reverted
    })
    it("should throw if request data is invalid", async () => {
      await erc20Dummy.connect(alice).approve(erc20Escrow.target, parseEther(String(5)));

      const invalidRequests = [
        [
          ZeroAddress,
          alice.address, 
          2, 
          parseEther(String(5))
        ],
        [
          erc20Dummy.target, 
          ZeroAddress, 
          2, 
          parseEther(String(5)), 
        ],
        [
          erc20Dummy.target, 
          alice.address, 
          0, 
          parseEther(String(5)), 
        ],
        [
          erc20Dummy.target, 
          alice.address, 
          2, 
          0, 
        ],
      ]
      await Promise.all(invalidRequests.map(async (request) => {
        await expect(erc20Escrow.connect(gameController).createWagerRequest(
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
      const token = erc20Dummy.target as string;
      const account = alice.address as string;
      const nonce = await erc20Escrow.nonces(alice.address);
      const wager = aliceAmounts[0] 
      await erc20Dummy.connect(alice).approve(erc20Escrow.target, aliceAmounts[0]);
      const escId = await erc20Escrow.hash(token, account, depositors, wager, nonce);
      await expect(erc20Escrow.connect(gameController).createWagerRequest(token, account, depositors, wager)).to.emit(erc20Escrow, 'WagerRequestCreation').withArgs(escId, token, account, wager);
    });
  });

  describe("Function: deposit(bytes32,uint256)", () => {
    let accounts: HardhatEthersSigner[];
    let escrowId: any;
    let wager: bigint = parseEther("5");
    let creator: HardhatEthersSigner;  
    let nonce: any;
    let token: any;
    let depositors: number;
    beforeEach(async () => {
      token = erc20Dummy.target as string;
      accounts = [bob, ed, carl];
      depositors = accounts.length;
      creator = bob;
      nonce = await erc20Escrow.nonces(creator.address);

      // simulate wager creation
      escrowId = await erc20Escrow.hash(token, creator.address, depositors, wager, nonce);
      await erc20Dummy.connect(creator).approve(erc20Escrow.target, wager);
      await erc20Escrow.connect(gameController).createWagerRequest(token, bob.address, depositors, wager);
    })
    it("should allow only gameController to call", async () => {
      await expect(erc20Escrow.connect(alice).deposit(
        escrowId as string, 
        alice.address as string, 
        wager)
      ).to.be.reverted;
    })
    it("should throw if wager amount is more or less then ask amount", async () => {
      await erc20Dummy.connect(accounts[1]).approve(erc20Escrow.target, wager);
      await expect(erc20Escrow.connect(gameController).deposit(escrowId, accounts[1].address, wager - toBigInt("2"))).to.be.revertedWith("WegaEscrow: InvalidWagerAmount")
      await expect(erc20Escrow.connect(gameController).deposit(escrowId, accounts[1].address, wager - toBigInt("4"))).to.be.revertedWith("WegaEscrow: InvalidWagerAmount")
    });
    it("should throw if creator is the one depositing", async () => {
      await erc20Dummy.connect(creator).approve(erc20Escrow.target, wager);
      await expect(erc20Escrow.connect(gameController).deposit(escrowId, creator.address, wager)).to.be.revertedWith("WegaEscrow: CanOnlyDepositOnce")
    })
    it("should deposit wager amount and emit the correct event", async ()=> {
      await erc20Dummy.connect(accounts[2]).approve(erc20Escrow.target, wager);
      await expect(erc20Escrow.connect(gameController).deposit(escrowId, accounts[2].address , wager)).to.emit(erc20Escrow, 'WagerDeposit').withArgs(escrowId, wager, accounts[2].address);
    });
    it("should correctly change state if the total wager amount is reached", async () => {
      // arrange
      await erc20Dummy.connect(accounts[1]).approve(erc20Escrow.target, wager);
      await erc20Dummy.connect(accounts[2]).approve(erc20Escrow.target, wager);
      
      // act 
      await erc20Escrow.connect(gameController).deposit(escrowId, accounts[1].address, wager);
      await erc20Escrow.connect(gameController).deposit(escrowId, accounts[2].address, wager);
      
      // assert
      const request = await erc20Escrow.getWagerRequest(escrowId);
      expect(request.state).to.be.equal(TransactionState.PENDING);
    });

    it("should reject if tx state is not OPEN", async () => {
      // arrange
      await erc20Dummy.connect(accounts[1]).approve(erc20Escrow.target, wager);
      await erc20Dummy.connect(accounts[2]).approve(erc20Escrow.target, wager);
      await erc20Dummy.connect(ed).approve(erc20Escrow.target, wager);
      
      // act 
      await erc20Escrow.connect(gameController).deposit(escrowId, accounts[1].address, wager);
      await erc20Escrow.connect(gameController).deposit(escrowId, accounts[2].address, wager);
      
      // assert
      await expect(erc20Escrow.connect(gameController).deposit(escrowId, ed.address, wager)).to.be.revertedWith("WegaEscrow: InvalidRequestState");
    });
  });

  describe("Getters", () => {
    let accounts: HardhatEthersSigner[];
    let escrowId: any;
    let aliceWager: bigint;
    let nonce: any;
    beforeEach(async () => {
      const depositors = 2;
      const token = erc20Dummy.target as string;
      accounts = [bob, carl];
      nonce = await erc20Escrow.nonces(alice.address);
      aliceWager = parseEther(String(5));

      // for querying one
      escrowId = await erc20Escrow.hash(token, alice.address, 2, aliceWager, nonce);
      await erc20Dummy.connect(alice).approve(erc20Escrow.target, aliceWager);
      await erc20Escrow.connect(gameController).createWagerRequest(token, alice.address, 2, aliceWager);
      
      await Promise.all(accounts.map(async (acc) => {
        const w = parseEther(String(5));
        // console.log(await erc20Dummy.balanceOf(acc.address), w); 
        await erc20Dummy.connect(acc).approve(erc20Escrow.target, w);
        await erc20Escrow.connect(gameController).createWagerRequest(token, acc.address, 2, w);
      }))
    })

    it('should return all created escrow requests', async () => {
      const wagerRequests = await erc20Escrow.getWagerRequests(); 
      expect(wagerRequests.length).to.be.above(accounts.length + 1);
    });

    it('should return a single escrow request', async () => {
      const request = await erc20Escrow.getWagerRequest(escrowId);
      expect(request.escrowHash).to.equal(escrowId);
      expect(request.wagerAmount).to.equal(aliceWager);
      expect(request.tokenAddress).to.equal(erc20Dummy.target);
      expect(request.nonce).to.equal(nonce);
      expect(request.totalWager).to.equal(aliceWager * toBigInt(2));11
    });
    it('should return the correct deposit amount of a user', async () => {
      expect(await erc20Escrow.depositOf(escrowId, alice.address)).to.equal(aliceWager);
    })
    it('should return true if a player exists in a wager', async () => {
      expect(await erc20Escrow.containsPlayer(escrowId, alice.address)).to.be.true;
    })
  })

  describe('Withdrawals', () => {
    let winner: HardhatEthersSigner;
    let loser: HardhatEthersSigner;
    let escrowId: any;
    let wager: bigint;
    let nonce: any;
    let token: any;
    let winningAmount: bigint;

    beforeEach(async () => {
      winner = carl;
      loser = bob; 
      
      token = erc20Dummy.target as string;
      nonce = await erc20Escrow.nonces(winner.address);
      wager = parseEther(String(5));

      // for querying one
      escrowId = await erc20Escrow.hash(token, winner.address, 2, wager, nonce);
      await erc20Dummy.connect(winner).approve(erc20Escrow.target, wager);
      await erc20Dummy.connect(loser).approve(erc20Escrow.target, wager);
      await erc20Escrow.connect(gameController).createWagerRequest(token, winner.address, 2, wager);
    })
    describe('Function: setWithdrawer(bytes32 escrowId, address winner)', () => {
      it('can only be called by gameController', async () => {
        
        await expect(erc20Escrow.connect(alice).setWithdrawers(escrowId, [winner.address])).to.be.reverted;
      });
      it('can only be called if escrow is pending', async () => {
        await expect(erc20Escrow.connect(gameController).setWithdrawers(escrowId, [winner.address])).to.be.revertedWith("WegaEscrow: InvalidRequestState")
      });
      it('must contain withdrawer as player', async () => {
      await erc20Escrow.connect(gameController).deposit(escrowId, loser.address, wager);
        await expect(erc20Escrow.connect(gameController).setWithdrawers(escrowId, [alice.address])).to.be.revertedWith("WegaEscrow: InvalidRequestData")
      });
      it('must emit the correct event and set wager state as READY', async () => {
        await erc20Escrow.connect(gameController).deposit(escrowId, loser.address, wager);
        await expect(erc20Escrow.connect(gameController).setWithdrawers(escrowId, [winner.address])).to.emit(erc20Escrow, 'SetWithdrawers');
        expect((await erc20Escrow.getWagerRequest(escrowId)).state).to.equal(TransactionState.READY);
      });
    })
    describe('Function: withdraw(bytes32 escrowId)', () => {
      it('can only be called by players with balance', async () => {
        await erc20Escrow.connect(gameController).deposit(escrowId, loser.address, wager);
        await erc20Escrow.connect(gameController).setWithdrawers(escrowId, [winner.address]);
        await expect(erc20Escrow.connect(gameController).withdraw(escrowId)).to.be.revertedWith("WegaEscrow: InsufficientBalance")
      })
      it('it should emit the correct event and transfer the correct amount', async () => {
        const balanceB: bigint = await erc20Dummy.balanceOf(winner.address);
        await erc20Escrow.connect(gameController).deposit(escrowId, loser.address, wager);
        await erc20Escrow.connect(gameController).setWithdrawers(escrowId, [winner.address]);
        await expect(erc20Escrow.connect(winner).withdraw(escrowId)).to.emit(erc20Escrow, 'WagerWithdrawal').withArgs(escrowId, wager + wager , winner.address);
        expect(await erc20Dummy.balanceOf(winner.address)).to.equal(balanceB + wager + wager);
        expect((await erc20Escrow.getWagerRequest(escrowId)).state).to.equal(TransactionState.CLOSED);
      })
    })
  })
});
