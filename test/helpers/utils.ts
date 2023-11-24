import { toBigInt } from 'ethers';

export function randomNumber(length: number): number {
    return Math.floor(Math.random() * length);
}

export function getRandomExpiryDate(): bigint {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const expiry = Math.floor((new Date().getTime() + 5 * day) / 1000);
    return toBigInt(String(expiry))
}