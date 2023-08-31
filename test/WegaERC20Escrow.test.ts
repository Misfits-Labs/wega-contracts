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
    erc20Dummy = await erc20DummyFactory.deploy([alice.address, bob.address, carl.address, david.address, ed.address, fred.address]);

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
      const nonce = await erc20Escrow.currentNonce(alice.address);
      const wager = aliceAmounts[0] 
      await erc20Dummy.connect(alice).approve(erc20Escrow.address, aliceAmounts[0]);
      const escId = await erc20Escrow.hash(token, account, depositors, wager, nonce);
      await expect(erc20Escrow.connect(alice).createWagerAndDeposit(token, account, depositors, wager)).to.emit(erc20Escrow, 'WagerRequestCreation').withArgs(escId, token, account, wager);
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
      await erc20Escrow.createWagerAndDeposit(token, bob.address, depositors, wager);
    })
    it("should throw if wager amount is more or less then ask amount", async () => {
      await erc20Dummy.connect(accounts[1]).increaseAllowance(erc20Escrow.address, wager);
      await expect(erc20Escrow.connect(accounts[1]).deposit(escrowId, wager.sub(BigNumber.from("2")))).to.be.rejectedWith("WegaEscrow_InvalidWagerAmount()")
      await expect(erc20Escrow.connect(accounts[1]).deposit(escrowId, wager.add(BigNumber.from("4")))).to.be.rejectedWith("WegaEscrow_InvalidWagerAmount()")
    });
    it("should throw if creator is the one depositing", async () => {
      await erc20Dummy.connect(creator).increaseAllowance(erc20Escrow.address, wager);
      await expect(erc20Escrow.connect(creator).deposit(escrowId, wager.add(BigNumber.from("4")))).to.be.rejectedWith("WegaEscrow_CanOnlyDepositOnce()")
    })
    it("should deposit wager amount and emit the correct event", async ()=> {
      await erc20Dummy.connect(accounts[2]).increaseAllowance(erc20Escrow.address, wager);
      await expect(erc20Escrow.connect(accounts[2]).deposit(escrowId, wager)).to.emit(erc20Escrow, 'WagerDeposit').withArgs(escrowId, wager, accounts[2].address);
    });
    it("should throw if the totalWagerAmount is reached", async () => {
      // arrange
      await erc20Dummy.connect(accounts[1]).increaseAllowance(erc20Escrow.address, wager);
      await erc20Dummy.connect(accounts[2]).increaseAllowance(erc20Escrow.address, wager);
      await erc20Dummy.connect(ed).increaseAllowance(erc20Escrow.address, wager);
      
      // act 
      await erc20Escrow.connect(accounts[1]).deposit(escrowId, wager);
      await erc20Escrow.connect(accounts[2]).deposit(escrowId, wager);
      
      // assert
      await expect(erc20Escrow.connect(ed).deposit(escrowId, wager)).to.be.rejectedWith("WegaEscrow_MaximumWagerAmountReached()")
    });
    it("should correctly change state if the total wager amount is reached", async () => {
      // arrange
      await erc20Dummy.connect(accounts[1]).increaseAllowance(erc20Escrow.address, wager);
      await erc20Dummy.connect(accounts[2]).increaseAllowance(erc20Escrow.address, wager);
      
      // act 
      await erc20Escrow.connect(accounts[1]).deposit(escrowId, wager);
      await erc20Escrow.connect(accounts[2]).deposit(escrowId, wager);
      
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
      await erc20Escrow.connect(accounts[1]).deposit(escrowId, wager);
      await erc20Escrow.connect(accounts[2]).deposit(escrowId, wager);
      
      // assert
      await expect(erc20Escrow.connect(fred).deposit(escrowId, wager)).to.be.rejectedWith("WegaEscrow_InvalidRequestState()");
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
    });

    it('should return a single escrow request', async () => {
      const request = await erc20Escrow.getWagerRequest(escrowId);
      expect(request.escrowId).to.equal(escrowId);
      expect(request.wager).to.equal(aliceWager);
      expect(request.token).to.equal(erc20Dummy.address);
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
  describe('function: setGameController(address)', () => {
    it('can only be called by the owner', async () => {
      let gameController = fred.address;
      await expect(erc20Escrow.connect(alice).setGameController(gameController)).to.be.rejectedWith("Ownable: caller is not the owner")
    })
    it('should set the correct game controller and emit correct event', async () => {
      let gameController = fred.address;
      await expect(erc20Escrow.connect(coinbase).setGameController(gameController)).to.emit(erc20Escrow, 'SetGameControler').withArgs(gameController);
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
      await erc20Escrow.connect(coinbase).setGameController(gameController.address);
      winner = carl;
      loser = bob; 
      
      token = erc20Dummy.address as string;
      nonce = await erc20Escrow.currentNonce(winner.address);
      wager = utils.parseEther(String(5));

      // for querying one
      escrowId = await erc20Escrow.hash(token, winner.address, 2, wager, nonce);
      await erc20Dummy.connect(winner).approve(erc20Escrow.address, wager);
      await erc20Dummy.connect(loser).approve(erc20Escrow.address, wager);
      await erc20Escrow.createWagerAndDeposit(token, winner.address, 2, wager);
    })
    describe('Function: setWithdrawer(bytes32 escrowId, address winner)', () => {
      it('can only be called by game controller', async () => {
        await expect(erc20Escrow.connect(alice).setWithdrawer(escrowId, winner.address)).to.be.rejectedWith("WegaEscrow_CallerNotApproved()")
      });
      it('must contain withdrawer as player', async () => {
        await expect(erc20Escrow.connect(gameController).setWithdrawer(escrowId, alice.address)).to.be.rejectedWith("WegaEscrow_InvalidRequestData()")
      });
      it('can only be called if escrow is pending', async () => {
        await expect(erc20Escrow.connect(gameController).setWithdrawer(escrowId, winner.address)).to.be.rejectedWith("WegaEscrow_InvalidRequestState()")
      });
      it('must emit the correct event and set wager state as READY', async () => {
        await erc20Escrow.connect(loser).deposit(escrowId, wager);
        await expect(erc20Escrow.connect(gameController).setWithdrawer(escrowId, winner.address)).to.emit(erc20Escrow, 'SetWithdrawer').withArgs(escrowId, winner.address);
        expect(await erc20Escrow.winners(escrowId)).to.equal(winner.address);
        expect((await erc20Escrow.getWagerRequest(escrowId)).state).to.equal(TransactionState.READY);
      });
    })
    describe('Function: withdraw(bytes32 escrowId)', () => {

      it('can only be called by the winner', async () => {
        await erc20Escrow.connect(loser).deposit(escrowId, wager);
        await erc20Escrow.connect(gameController).setWithdrawer(escrowId, winner.address);
        await expect(erc20Escrow.connect(gameController).withdraw(escrowId)).to.be.rejectedWith("WegaEscrow_CallerNotApproved()")
      })
      it('it should emit the correct event and transfer the correct amount', async () => {
        const balanceB: BigNumber = await erc20Dummy.balanceOf(winner.address);
        await erc20Escrow.connect(loser).deposit(escrowId, wager);
        await erc20Escrow.connect(gameController).setWithdrawer(escrowId, winner.address);
        await expect(erc20Escrow.connect(winner).withdraw(escrowId)).to.emit(erc20Escrow, 'WagerWithdrawal').withArgs(escrowId, wager.add(wager), winner.address);
        expect(await erc20Dummy.balanceOf(winner.address)).to.equal(balanceB.add(wager.add(wager)));
        expect((await erc20Escrow.getWagerRequest(escrowId)).state).to.equal(TransactionState.CLOSED);
      })
    })
  })
});
