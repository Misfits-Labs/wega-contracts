import { BigNumberish, AddressLike, parseEther, toBigInt } from 'ethers';
const { ethers, upgrades } =  require('hardhat');
import { expect } from 'chai';
import { HardhatEthersSigner} from '@nomicfoundation/hardhat-ethers/signers';
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
  WegaRandomizerController,
  WegaERC20Escrow__factory,
  WegaDiceGame,
  WegaCoinFlipGame,
  WegaDiceGame__factory,
  WegaRandomizerController__factory,
  WegaCoinFlipGame__factory,
  WegaERC20Dummy__factory,
  FeeManager,
  FeeManager__factory,
  WegaRandomizer__factory
} from '../types';

import { FeeConfig, HexishString } from '../src/types'
import { PROTOCOL_ROLES } from '../src/constants'

export type RequestInput = (string | number | BigNumberish)[]


describe("WegaGameController", () => {
 
  // random numbers 
  const drandChainhash: string = "dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493";
  const randomNumConfig = getRandomNumbersConfig(drandChainhash);
  const randomNumbers = randomNumConfig['1337'].drands.map(({ randomness }) => toBigInt(randomness)).slice(0, 101);

  // contracts
  let erc20Escrow: WegaERC20Escrow,
      erc20Dummy: WegaERC20Dummy,
      randomNumController: WegaRandomizerController,
      gameController: WegaGameController,
      diceGame: WegaDiceGame,
      feeManager: FeeManager,
      coinflipGame: WegaCoinFlipGame,
      randomizer: any,
      randomizerFactory: WegaRandomizer__factory;
      
      // factories
 let  erc20EscrowFactory: WegaERC20Escrow__factory,
      randomNumControllerFactory: WegaRandomizerController__factory,
      erc20DummyFactory: WegaERC20Dummy__factory,
      gameControllerFactory: WegaGameController__factory,
      diceGameFactory: WegaDiceGame__factory,
      feeManagerFactory: FeeManager__factory,
      coinflipGameFactory: WegaCoinFlipGame__factory;

 
  // accounts
  let signers: HardhatEthersSigner[],
      coinbase: HardhatEthersSigner, 
      protocolAdmin: HardhatEthersSigner,
      feeTaker: HardhatEthersSigner,
      others: HardhatEthersSigner[],
      alice: HardhatEthersSigner, 
      bob: HardhatEthersSigner, 
      carl: HardhatEthersSigner,
      david: HardhatEthersSigner,
      ed: HardhatEthersSigner,
      fred: HardhatEthersSigner;

  let escrowId: any,
      nonce: BigNumberish = toBigInt(1),
      wager: BigNumberish = parseEther(String(5)),
      token: string,
      players: HardhatEthersSigner[];
  
  const depositOrPlayDice = 'depositOrPlay(bytes32,uint256[])';
  const depositOrPlayCoinFlip = 'depositOrPlay(bytes32,uint256[],uint256[])';
  let feeConfigs: FeeConfig[];


  before(async () => {
    // accounts setup
    signers = await ethers.getSigners();
    [coinbase, protocolAdmin, feeTaker, ...others] = signers;
    [alice, bob, carl, david, ed, fred, ...others] = others;

    // factory setup
    erc20EscrowFactory = new WegaERC20Escrow__factory(coinbase);
    erc20DummyFactory = new WegaERC20Dummy__factory(coinbase);
    randomNumControllerFactory = new WegaRandomizerController__factory(coinbase);
    gameControllerFactory = new WegaGameController__factory(coinbase);
    diceGameFactory = new WegaDiceGame__factory(coinbase);
    feeManagerFactory = new FeeManager__factory(coinbase);
    coinflipGameFactory = new WegaCoinFlipGame__factory(coinbase);

    // deploy contracts
    feeManager = await upgrades.deployProxy(
      feeManagerFactory, [], { kind: 'uups', initializer: 'initialize'}
      );
    await feeManager.connect(coinbase).addWegaProtocolAdmin(protocolAdmin.address);

    erc20Escrow = await upgrades.deployProxy(erc20EscrowFactory, [feeManager.target], { 
        kind: 'uups', 
        initializer: 'initialize' 
      }
    );
    await erc20Escrow.connect(coinbase).addWegaProtocolAdmin(protocolAdmin.address);

    feeConfigs = [
      {
        applier: erc20Escrow.target as HexishString,
        feeTaker: feeTaker.address as HexishString,
        feeShare: 500,
        shouldApply: true,
      }
    ]

    await feeManager.connect(protocolAdmin).setFeeConfigs(feeConfigs);
    randomNumController = await upgrades.deployProxy(
    randomNumControllerFactory, [randomNumbers], { kind: 'uups', initializer: 'initialize' });    
    erc20Dummy = await erc20DummyFactory.deploy([
     alice.address, 
     bob.address, 
     carl.address, 
     david.address, 
     ed.address, 
     fred.address
    ]);
    
    diceGame = await upgrades.deployProxy(
      diceGameFactory, [randomNumController.target], { 
        initializer: 'initialize', 
        kind: 'uups'
      }
    );
    
    coinflipGame = await upgrades.deployProxy(
      coinflipGameFactory, [randomNumController.target], { 
        initializer: 'initialize', 
        kind: 'uups'
      }
    );

    // deploy gameControllerContract
    gameController = await upgrades.deployProxy(
      gameControllerFactory, 
      [], 
      { kind: 'uups', initializer: false }
    );
    await gameController.initialize(erc20Escrow.target, randomNumController.target,
      [
        {
          name: 'DICE',
          denominator: 6,
          minRounds: 1,
          requiredPlayers: 2,
          proxy: diceGame.target,
          randomNumberController: randomNumController.target
        },
        {
          name: 'COINFLIP',
          denominator: 2,
          minRounds: 1,
          requiredPlayers: 2,
          proxy: coinflipGame.target,
          randomNumberController: randomNumController.target
        }
      ]
    )

    // add roles
    await erc20Escrow.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, gameController.target);
    await randomNumController.addWegaProtocolAdmin(protocolAdmin.address);
    await randomNumController.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, gameController.target);

    await diceGame.connect(coinbase).addWegaProtocolAdmin(protocolAdmin.address);
    await diceGame.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, gameController.target);
    await coinflipGame.connect(coinbase).addWegaProtocolAdmin(protocolAdmin.address);
    await coinflipGame.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_CONTROLLER_ROLE, gameController.target);

    // create escrow for the game
    token = erc20Dummy.target as string;
    players = [carl, ed, david, fred];
    await erc20Dummy.connect(carl).approve(erc20Escrow.target, toBigInt(wager) * toBigInt(10));
    await erc20Dummy.connect(ed).approve(erc20Escrow.target, toBigInt(wager) * toBigInt(10));
    await erc20Dummy.connect(david).approve(erc20Escrow.target, toBigInt(wager) * toBigInt(10));
    await erc20Dummy.connect(fred).approve(erc20Escrow.target, toBigInt(wager) * toBigInt(10));
    const currentNonce = await erc20Escrow.currentNonce(players[0].address); 
    escrowId = await erc20Escrow.hash(token, players[0].address, 2, wager, currentNonce);

    // make give games game roll on randomizer
    await randomNumController.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_ROLE, diceGame.target);
    await randomNumController.connect(protocolAdmin).grantRole(PROTOCOL_ROLES.GAME_ROLE, coinflipGame.target);

  });
  // describe("Initialize", () => {
  //   it('should set the correct game types', async () => {

  //   });
  // })
  describe("Function: createGame(string,address,uint256)", () => {
    it("should throw if the game is not supported", async () => {
      await expect(gameController.connect(players[0]).createGame(
        "NONEXISTENT", token, wager, [parseEther('78409832094')],
      )).to.be.revertedWith('WegaGameController: InvalidGame')
    })
    it('should create a game and emit correct event', async () => {
      const diceNonce = await erc20Escrow.currentNonce(players[0].address);
      await expect(gameController.connect(players[0]).createGame("DICE", token, wager, [parseEther('78409832094')])).to.emit(gameController, 'GameCreation').withArgs(
        escrowId, 
        diceNonce, 
        players[0].address, "DICE"
      );
      const coinflipNonce = await erc20Escrow.currentNonce(players[0].address);
      const coinflipId = await erc20Escrow.hash(token, players[0].address, 2, wager, coinflipNonce)
      await expect(gameController.connect(players[0]).createGame("COINFLIP", token, wager, [parseEther('78409832094')])).to.emit(
        gameController, 
        'GameCreation'
        ).withArgs(coinflipId, coinflipNonce, players[0].address, "COINFLIP");
    });
  })
  describe("Function: depositOrPlay(bytes32)", () => {
    it('should deposit if game is waiting', async () => {
      await gameController.connect(players[0]).createGame("DICE", token, wager, [parseEther('78409832094')]);
      await expect(gameController.connect(players[1])[depositOrPlayDice](escrowId,[parseEther('78409832094')])).to.emit(erc20Escrow, 'WagerDeposit').withArgs(escrowId, wager, players[1].address);
    });
    it('should play DICE if game is ready', async () => {
      const currentNonce = await erc20Escrow.currentNonce(players[0].address); 
      escrowId = await erc20Escrow.hash(token, players[0].address, 2, wager, currentNonce);
  
      await gameController.connect(players[0]).createGame("DICE", token, wager,[parseEther('78409832094')]);
      await gameController.connect(players[1])[depositOrPlayDice](escrowId,[parseEther('78409832094')]);
      expect((await gameController.getGame(escrowId)).state).to.equal(GameState.PLAYED);
    })
    it('should play COINFLIP if game is ready', async () => {
      const cfn = await erc20Escrow.currentNonce(players[2].address); 
      const cfeid = await erc20Escrow.hash(token, players[2].address, 2, wager, cfn);
      const playerChoices = [1, 2];
      await gameController.connect(players[2]).createGame("COINFLIP", token, wager,[parseEther('78409832094')]);
      await gameController.connect(players[3])[depositOrPlayCoinFlip](cfeid, playerChoices,[parseEther('78409832094')]);
      expect((await gameController.getGame(cfeid)).state).to.equal(GameState.PLAYED);
    })
    it('should throw if game is played', async () => {
      const currentNonce = await erc20Escrow.currentNonce(players[0].address); 
      escrowId = await erc20Escrow.hash(token, players[0].address, 2, wager, currentNonce);
      
      await gameController.connect(players[0]).createGame("DICE", token, wager,[parseEther('78409832094')])
      await gameController.connect(players[1])[depositOrPlayDice](escrowId,[parseEther('78409832094')]);
      await expect(gameController.connect(players[2])[depositOrPlayDice](escrowId,[parseEther('78409832094')])).to.be.revertedWith("WegaGameController: InvalidGameState");  
    });
  });
  describe('Getters', () => {
    it('should get games')
    it('should get winners')
    it('should get players')
  })
});
