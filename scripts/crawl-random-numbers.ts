import { getRandomNumbersConfig, mergeRandomNumConfig } from '../src/config';
import { utils, BigNumber } from 'ethers';
import { unwrap } from '../src/helpers';
import { network } from "hardhat";

async function main(){  
  const chainId: number = unwrap(network.config, 'chainId');
  const chainHash = "dbd506d6ef76e5f386f41c651dcb808c5bcbd75471cc4eafa3f4df7ad4e4c493";
  const totalRounds = 5000;
  let current = getRandomNumbersConfig(chainHash);

  // for number of rounds - make a fetch call to drand api;
  for(let round = current[chainId].lastParsedRound ?? 1; round <= totalRounds;round++) {
      console.log(`Retrieving...`);
      const randomNumber = await getRandomNumber(chainHash, round);
      console.log(`retrieval round: ${round} success \n ${JSON.stringify(randomNumber)}`);
      current = mergeRandomNumConfig({[chainId]: {
          drands: current[chainId].drands ? [...current[chainId].drands, randomNumber] : [randomNumber],
          lastParsedRound: round,
        }},
        chainHash
      )
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

main().then(() => console.log('DONE!')).catch(e => {
 console.log(e);
 process.exitCode = 1;
});