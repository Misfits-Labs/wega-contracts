const { ethers } =  require('hardhat');
import { constants, BigNumber, utils } from 'ethers';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import drand from '../.random-numbers/random-numbers-dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493.json'
import { 
 GameController, 
 GameController__factory,
 WegaERC20Escrow,
 WegaERC20Dummy,
 TwoWayChanceGame,
 WegaERC20Escrow__factory,
 TwoWayChanceGame__factory,
 WegaERC20Dummy__factory 
} from '../types';

import { TransactionState } from '../src/types'
import { getRandomExpiryDate, randomNumber } from './helpers/utils'
import { toSolidityShaWithAbiEncoder } from './helpers/eth.utils'

export type RequestInput = (string | number | BigNumber)[]


describe("WegaERC20Escrow", () => {
 
  // random numbers 
  const randomNumbers = drand.drands.map(({ randomness }) => BigNumber.from(randomness)).slice(0, 101);

  // contracts
  let erc20Escrow: WegaERC20Escrow,
      erc20Dummy: WegaERC20Dummy,
      twoChance: TwoWayChanceGame,
      gameController: GameController;
      
      // factories
 let erc20EscrowFactory: WegaERC20Escrow__factory,
      twoChanceFactory: TwoWayChanceGame__factory,
      erc20DummyFactory: WegaERC20Dummy__factory,
      gameControllerFactory: GameController__factory;

 
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
    twoChanceFactory = new TwoWayChanceGame__factory(coinbase);
    gameControllerFactory = new GameController__factory(coinbase);

    // deploy contracts
    erc20Escrow = await erc20EscrowFactory.deploy('WegaERC20Escrow', '0.0.0');
    erc20Dummy = await erc20DummyFactory.deploy([
     alice.address, 
     bob.address, 
     carl.address, 
     david.address, 
     ed.address, 
     fred.address
    ]);

    // deploy chance contract
    twoChance = await twoChanceFactory.deploy(randomNumbers);

    // deploy gameControllerContract
    gameController = await gameControllerFactory.deploy(erc20Escrow.address, twoChance.address);

    // create escrow for the game
    // token = erc20Dummy.address;
    // players = [carl, ed];
    // await erc20Dummy.connect(players[0]).approve(erc20Escrow.address, wager);
    // await erc20Dummy.connect(players[1]).approve(erc20Escrow.address, wager);
    // await erc20Escrow.createWagerAndDeposit(token, players[0].address, 2, wager);
    // await erc20Escrow.connect(players[1]).deposit(escrowId, wager);
  });

});
