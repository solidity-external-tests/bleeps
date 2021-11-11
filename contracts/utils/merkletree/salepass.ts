import {Wallet} from '@ethersproject/wallet';
import {keccak256 as solidityKeccak256} from '@ethersproject/solidity';

export function calculateHash(passId: string, signer: string): string {
  return solidityKeccak256(['uint256', 'address'], [passId, signer]);
}

export function hashLeaves(data: {passId: string; signer: string}[]): string[] {
  const hashedLeaves: string[] = [];

  for (let i = 0; i < data.length; i++) {
    hashedLeaves.push(calculateHash(data[i].passId, data[i].signer));
  }

  return hashedLeaves;
}

export function createLeaves(privateKeys: string[]): {passId: string; signer: string}[] {
  const leaves: {passId: string; signer: string}[] = [];

  for (let i = 0; i < privateKeys.length; i++) {
    const privateKey = privateKeys[i];
    leaves.push({passId: '' + i, signer: new Wallet(privateKey).address});
  }

  return leaves;
}
