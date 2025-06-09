import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export const connection = new Connection('https://api.devnet.solana.com');

export async function transferSOL(
  fromPubkey: PublicKey,
  toPubkey: PublicKey,
  amount: number
): Promise<Transaction> {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = fromPubkey;

  return transaction;
}

export async function getBalance(publicKey: PublicKey): Promise<number> {
  const balance = await connection.getBalance(publicKey);
  return balance / LAMPORTS_PER_SOL;
}

export function formatSOL(lamports: number): string {
  return (lamports / LAMPORTS_PER_SOL).toFixed(4);
}