const { ethers, upgrades } =  require('hardhat');
import { constants, BigNumber, utils } from 'ethers';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { getRandomNumbersConfig } from '../src/config';
import { 
  GameState,
  GameType
 } from '../src/types';
import { 
 WegaGameController, 
 WegaGameController__factory,
 WegaERC20Escrow,
 WegaERC20Dummy,
 WegaChanceGame,
 WegaERC20Escrow__factory,
 WegaChanceGame__factory,
 WegaERC20Dummy__factory 
} from '../types';

import { TransactionState } from '../src/types'
import { getRandomExpiryDate, randomNumber } from './helpers/utils'
import { toSolidityShaWithAbiEncoder } from './helpers/eth.utils'

export type RequestInput = (string | number | BigNumber)[]


describe("WegaERC20Escrow", () => {
 
  // random numbers 
  const drandChainhash: string = "dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493";
  const randomNumConfig = getRandomNumbersConfig(drandChainhash);
  const randomNumbers = randomNumConfig['1337'].drands.map(({ randomness }) => BigNumber.from(randomness)).slice(0, 101);

  // contracts
  let erc20Escrow: WegaERC20Escrow,
      erc20Dummy: WegaERC20Dummy,
      chanceGame: WegaChanceGame,
      gameController: WegaGameController;
      
      // factories
 let  erc20EscrowFactory: WegaERC20Escrow__factory,
      chanceFactory: WegaChanceGame__factory,
      erc20DummyFactory: WegaERC20Dummy__factory,
      gameControllerFactory: WegaGameController__factory;

 
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

  let escrowId: any,
      nonce: BigNumber = BigNumber.from(1),
      wager: BigNumber = utils.parseEther(String(5)),
      token: string,
      players: SignerWithAddress[];

  beforeEach(async () => {
    // accounts setup
    signers = await ethers.getSigners();
    [coinbase, ...others] = signers;
    [alice, bob, carl, david, ed, fred, ...others] = others;

    // factory setup
    erc20EscrowFactory = new WegaERC20Escrow__factory(coinbase);
    erc20DummyFactory = new WegaERC20Dummy__factory(coinbase);
    chanceFactory = new WegaChanceGame__factory(coinbase);
    gameControllerFactory = new WegaGameController__factory(coinbase);

    // deploy contracts
    erc20Escrow = await upgrades.deployProxy(erc20EscrowFactory, ['WegaEscrow', '0.0.0'], { kind: 'uups', initializer: 'initialize' });
    chanceGame = await upgrades.deployProxy(chanceFactory, [randomNumbers], { kind: 'uups', initializer: 'initialize' });
    await erc20Escrow.deployTransaction.wait()
    await chanceGame.deployTransaction.wait()
    erc20Dummy = await erc20DummyFactory.deploy([
     alice.address, 
     bob.address, 
     carl.address, 
     david.address, 
     ed.address, 
     fred.address
    ]);

    // deploy gameControllerContract
    gameController = await upgrades.deployProxy(gameControllerFactory, [erc20Escrow.address, chanceGame.address], { kind: 'uups', initializer: 'initialize' });
    await gameController.deployTransaction.wait()

    // add roles
    erc20Escrow.addWegaEscrowManager(gameController.address);
    chanceGame.addWegaGameManager(gameController.address);

    // create escrow for the game
    token = erc20Dummy.address;
    players = [carl, ed, david];
    await erc20Dummy.connect(carl).approve(erc20Escrow.address, wager);
    await erc20Dummy.connect(ed).approve(erc20Escrow.address, wager);
    await erc20Dummy.connect(david).approve(erc20Escrow.address, wager);
    const currentNonce = await erc20Escrow.currentNonce(players[0].address); 
    escrowId = await erc20Escrow.hash(token, players[0].address, players.length, wager, currentNonce);
  });
  // describe("Initialize", () => {
  //   it('should set the correct game types', async () => {

  //   });
  // })
  // describe("Function: createGameAndDepositInitialWager(address,uint256,wagerAmount,gameType)", () => {
  //   it('should create a game and emit correct event', async () => {
  //     await expect(gameController.connect(players[0]).createGameAndDepositInitialWager(
  //       token, players.length, wager, GameType.DICE
  //     )).to.emit(gameController, 'GameCreation').withArgs(escrowId, players[0].address, GameType.DICE)
  //   });
  // })
  describe("Function: depositOrPlay(bytes32)", () => {
    it('should deposit if game is waiting', async () => {
      await gameController.connect(players[0]).createGameAndDepositInitialWager(
        token, players.length, wager, GameType.DICE
      )
      await expect(gameController.connect(players[1]).depositOrPlay(escrowId)).to.emit(erc20Escrow, 'WagerDeposit').withArgs(escrowId, wager, players[1].address);
    });
    it('should play if game is ready', async () => {
      await gameController.connect(players[0]).createGameAndDepositInitialWager(
        token, players.length, wager, GameType.DICE
      )
      await gameController.connect(players[1]).depositOrPlay(escrowId);
      await gameController.connect(players[2]).depositOrPlay(escrowId);
      expect((await gameController.getGame(escrowId)).state).to.equal(GameState.PLAYED);
    })
    it('should throw if game is played', async () => {
      await gameController.connect(players[0]).createGameAndDepositInitialWager(
        token, players.length, wager, GameType.DICE
        )
      await gameController.connect(players[1]).depositOrPlay(escrowId);
      await gameController.connect(players[2]).depositOrPlay(escrowId);
      await expect(gameController.connect(players[2]).depositOrPlay(escrowId)).to.be.revertedWith("WegaGameController: InvalidGameState");  
    });
  })
  describe('Getters', () => {
    it('should get games')
    it('should get winners')
    it('should get players')
  })
});
