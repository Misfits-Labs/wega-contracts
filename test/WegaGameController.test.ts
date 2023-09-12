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
 WegaRandomNumberController,
 WegaERC20Escrow__factory,
 WegaDiceGame,
 WegaCoinFlipGame,
 WegaDiceGame__factory,
 WegaRandomNumberController__factory,
 WegaCoinFlipGame__factory,
 WegaERC20Dummy__factory 
} from '../types';

import { TransactionState } from '../src/types'
import { getRandomExpiryDate, randomNumber } from './helpers/utils'
import { toSolidityShaWithAbiEncoder } from './helpers/eth.utils'

export type RequestInput = (string | number | BigNumber)[]


describe("WegaGameController", () => {
 
  // random numbers 
  const drandChainhash: string = "dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493";
  const randomNumConfig = getRandomNumbersConfig(drandChainhash);
  const randomNumbers = randomNumConfig['1337'].drands.map(({ randomness }) => BigNumber.from(randomness)).slice(0, 101);

  // contracts
  let erc20Escrow: WegaERC20Escrow,
      erc20Dummy: WegaERC20Dummy,
      randomNumController: WegaRandomNumberController,
      gameController: WegaGameController,
      diceGame: WegaDiceGame,
      coinflipGame: WegaCoinFlipGame;
      
      // factories
 let  erc20EscrowFactory: WegaERC20Escrow__factory,
      randomNumControllerFactory: WegaRandomNumberController__factory,
      erc20DummyFactory: WegaERC20Dummy__factory,
      gameControllerFactory: WegaGameController__factory,
      diceGameFactory: WegaDiceGame__factory,
      coinflipGameFactory: WegaCoinFlipGame__factory;

 
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
  
  const depositOrPlayDice = 'depositOrPlay(bytes32)';
  const depositOrPlayCoinFlip = 'depositOrPlay(bytes32,uint256[])';

  beforeEach(async () => {
    // accounts setup
    signers = await ethers.getSigners();
    [coinbase, ...others] = signers;
    [alice, bob, carl, david, ed, fred, ...others] = others;

    // factory setup
    erc20EscrowFactory = new WegaERC20Escrow__factory(coinbase);
    erc20DummyFactory = new WegaERC20Dummy__factory(coinbase);
    randomNumControllerFactory = new WegaRandomNumberController__factory(coinbase);
    gameControllerFactory = new WegaGameController__factory(coinbase);
    diceGameFactory = new WegaDiceGame__factory(coinbase);
    coinflipGameFactory = new WegaCoinFlipGame__factory(coinbase);

    // deploy contracts
    erc20Escrow = await upgrades.deployProxy(erc20EscrowFactory, ['WegaEscrow', '0.0.0'], { kind: 'uups', initializer: 'initialize' });
    randomNumController = await upgrades.deployProxy(randomNumControllerFactory, [randomNumbers], { kind: 'uups', initializer: 'initialize' });    
    erc20Dummy = await erc20DummyFactory.deploy([
     alice.address, 
     bob.address, 
     carl.address, 
     david.address, 
     ed.address, 
     fred.address
    ]);
    
    diceGame = await upgrades.deployProxy(
      diceGameFactory, [randomNumController.address], { 
        initializer: 'initialize', 
        kind: 'uups'
      }
    );
    
    coinflipGame = await upgrades.deployProxy(
      coinflipGameFactory, [randomNumController.address], { 
        initializer: 'initialize', 
        kind: 'uups'
      }
    );

    // deploy gameControllerContract
    gameController = await upgrades.deployProxy(gameControllerFactory, [
      erc20Escrow.address, 
      ["DICE", "COINFLIP"],
      [
        {
          denominator: 6,
          minRounds: 1,
          requiredPlayers: 2,
          proxy: diceGame.address,
          randomNumberController: randomNumController.address
        },
        {
          denominator: 2,
          minRounds: 1,
          requiredPlayers: 2,
          proxy: coinflipGame.address,
          randomNumberController: randomNumController.address
        }
      ]
    ], { kind: 'uups', initializer: 'initialize' });

    // add roles
    await erc20Escrow.addWegaEscrowManager(gameController.address);
    await randomNumController.addWegaGameManager(gameController.address);
    await diceGame.addWegaGameManager(gameController.address);
    await coinflipGame.addWegaGameManager(gameController.address);

    // create escrow for the game
    token = erc20Dummy.address;
    players = [carl, ed, david, fred];
    await erc20Dummy.connect(carl).approve(erc20Escrow.address, wager.mul(BigNumber.from(10)));
    await erc20Dummy.connect(ed).approve(erc20Escrow.address, wager.mul(BigNumber.from(10)));
    await erc20Dummy.connect(david).approve(erc20Escrow.address, wager.mul(BigNumber.from(10)));
    await erc20Dummy.connect(fred).approve(erc20Escrow.address, wager.mul(BigNumber.from(10)));
    const currentNonce = await erc20Escrow.currentNonce(players[0].address); 
    escrowId = await erc20Escrow.hash(token, players[0].address, 2, wager, currentNonce);
    
  });
  // describe("Initialize", () => {
  //   it('should set the correct game types', async () => {

  //   });
  // })
  describe("Function: createGame(string,address,uint256)", () => {
    it("should throw if the game is not supported", async () => {
      await expect(gameController.connect(players[0]).createGame("NONEXISTENT", token, wager)).to.be.revertedWith('WegaGameController: InvalidGame')
    })
    it('should create a game and emit correct event', async () => {
      await expect(gameController.connect(players[0]).createGame("DICE", token, wager)).to.emit(gameController, 'GameCreation').withArgs(escrowId, players[0].address, "DICE");
      const coinflipId = await erc20Escrow.hash(token, players[0].address, 2, wager, await erc20Escrow.currentNonce(players[0].address))
      await expect(gameController.connect(players[0]).createGame("COINFLIP", token, wager)).to.emit(gameController, 'GameCreation').withArgs(coinflipId, players[0].address, "COINFLIP");
    });
  })
  describe("Function: depositOrPlay(bytes32)", () => {
    it('should deposit if game is waiting', async () => {
      await gameController.connect(players[0]).createGame("DICE", token, wager);
      await expect(gameController.connect(players[1])[depositOrPlayDice](escrowId)).to.emit(erc20Escrow, 'WagerDeposit').withArgs(escrowId, wager, players[1].address);
    });
    it('should play DICE if game is ready', async () => {
      await gameController.connect(players[0]).createGame("DICE", token, wager);
      await gameController.connect(players[1])[depositOrPlayDice](escrowId);
      expect((await gameController.getGame(escrowId)).state).to.equal(GameState.PLAYED);
    })
    it('should play COINFLIP if game is ready', async () => {
      const cfn = await erc20Escrow.currentNonce(players[2].address); 
      const cfeid = await erc20Escrow.hash(token, players[2].address, 2, wager, cfn);
      const playerChoices = [1, 2];
      await gameController.connect(players[2]).createGame("COINFLIP", token, wager);
      await gameController.connect(players[3])[depositOrPlayCoinFlip](cfeid, playerChoices);
      expect((await gameController.getGame(cfeid)).state).to.equal(GameState.PLAYED);
    })
    it('should throw if game is played', async () => {
      await gameController.connect(players[0]).createGame("DICE", token, wager)
      await gameController.connect(players[1])[depositOrPlayDice](escrowId);
      await expect(gameController.connect(players[2])[depositOrPlayDice](escrowId)).to.be.revertedWith("WegaGameController: InvalidGameState");  
    });
  })

  describe('Getters', () => {
    it('should get games')
    it('should get winners')
    it('should get players')
  })
});
