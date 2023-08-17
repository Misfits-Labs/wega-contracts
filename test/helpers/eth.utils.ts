import { utils, BigNumber, constants } from 'ethers';
const keccak256 = require('js-sha3').keccak256;

export function getInterfaceID(contractInterface: utils.Interface): BigNumber {
    let interfaceID: BigNumber = constants.Zero;
    const functions: string[] = Object.keys(contractInterface.functions);
    for (let i=0; i< functions.length; i++) {
        interfaceID = interfaceID.xor(contractInterface.getSighash(functions[i]));
    }
    return interfaceID;
}

export function toCeiledNumber(input: BigNumber): number {
    return Math.ceil(Number(utils.formatEther(input)));
}

export function stringToUint256(inputString: string ): BigNumber {
    let inputBytes = utils.toUtf8Bytes(inputString);
    let keccakHash = utils.keccak256(inputBytes);
    return BigNumber.from(keccakHash);
}

export function numberToBytes32(input: BigNumber): string {
    return utils.hexZeroPad(input.toHexString(), 32);
}

export function toSolidityShaWithAbiEncoder(
    types: string[], 
    values: any[]
) {
    const hash = utils.solidityKeccak256(
        [...types],
        [...values]
    );
    return hash;
}