import path from 'path';
import fs from 'fs';
import { merge, defaultsDeep } from 'lodash';
import { utils, BigNumber } from 'ethers';

type RandomNumbers = {
 lastParsedRound: number;
 drands: ({ round: number, randomness: string, signature: string })[];
}
const storagePath = './.random-numbers';

async function main(){
 const chainHash = "dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493";
 const totalRounds = 5000;
 let current = getRandomNumbersFile(chainHash);
 
 // for number of rounds - make a fetch call to drand api;
 let lastParsedRound: number = 0;
 for(let round = current.lastParsedRound ?? 1; round <= totalRounds;round++) {
    console.log(`Retrieving...`);
    const randomNumber = await getRandomNumber(chainHash, round);
    console.log(`retrieval round: ${round} success \n ${JSON.stringify(randomNumber)}`);
    await _save(current, chainHash, current.drands ? [...current.drands, randomNumber] : [randomNumber], lastParsedRound);
    current = getRandomNumbersFile(chainHash);
    lastParsedRound = round;
  }
}

async function getRandomNumber(
 chainHash: string, 
 round: number
 ) {

  const fetchSettings = {
   headers: {
     'Access-Control-Allow-Origin': '*'
   },
   credentials: 'same-origin' as RequestCredentials,
   cache: 'no-cache' as RequestCache
  }

  const url = `https://api.drand.sh/${chainHash}/public/${round}`
  let fulfilled = false;
  let result: { round: number, randomness: string, signature: string } = {
   round: 0,
   randomness: "",
   signature: "", 
  }
  while (!fulfilled) {
   let res = await fetch(url, fetchSettings);
   let resBody = await res.text();
   const { randomness, round, signature } = JSON.parse(resBody);
   // set fulfilled to false;
   if(randomness || round || signature) {
    result = Object.assign(result, { 
     round,
     randomness: convertBytesToNumber(randomness),
     signature: signature,
    })
    fulfilled = true;
   }
  }
  return result;
}

function convertBytesToNumber(bytes: string){
 return BigNumber.from(String(utils.sha256(utils.arrayify("0x".concat(bytes))))).toString()
}

async function _save(
 config: unknown,
 chainHash: string,
 drands: ({ round: number, randomness: string, signature: string })[],
 lastParsedRound: number
 ) {
 const _config = merge(config, {
  lastParsedRound,
  drands,
 });
 const configPath = path.resolve(
   storagePath,
   `random-numbers-${chainHash}.json`,
 );
  fs.writeFileSync(configPath, JSON.stringify(_config, null, 2));
}

function getRandomNumbersFile(chainHash: string): RandomNumbers {
 const configPath = path.resolve(
   storagePath,
   `random-numbers-${chainHash}.json`,
 );
 const file = fs.existsSync(configPath)
   ? fs.readFileSync(configPath).toString()
   : '{}';
 return JSON.parse(file.length ? file : '{}');
}

main().then(() => console.log('DONE!')).catch(e => {
 console.log(e);
 process.exitCode = 1;
});