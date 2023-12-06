import { toBigInt } from 'ethers';

export function addPercentage(value: bigint, percentage: number): bigint {
 const bps = 10000 * percentage;
 const bpsAsBigInt = toBigInt(bps);
 return value + ((bpsAsBigInt * value / toBigInt(10000))); 
}