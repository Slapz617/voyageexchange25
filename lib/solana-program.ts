import { PublicKey, Connection } from '@solana/web3.js';

// Generate a new program ID for your Solana app
// In production, you would deploy this as an actual program
export const SOLANA_GAMING_PROGRAM_ID = new PublicKey(
  'GMEPrizE7VQx9KzMHbEVeqD8y8qJ5x4N3m2A9BcXsStW'
);

// Program accounts and seeds
export const PROGRAM_SEEDS = {
  PRIZE_POOL: 'prize_pool',
  RAKE_VAULT: 'rake_vault',
  USER_PROFILE: 'user_profile',
  GAME_STATE: 'game_state',
} as const;

// Generate PDAs (Program Derived Addresses)
export function getPrizePoolPDA(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PROGRAM_SEEDS.PRIZE_POOL)],
    SOLANA_GAMING_PROGRAM_ID
  );
}

export function getRakeVaultPDA(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PROGRAM_SEEDS.RAKE_VAULT)],
    SOLANA_GAMING_PROGRAM_ID
  );
}

export function getUserProfilePDA(userPubkey: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PROGRAM_SEEDS.USER_PROFILE), userPubkey.toBuffer()],
    SOLANA_GAMING_PROGRAM_ID
  );
}

export function getGameStatePDA(gameId: string): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PROGRAM_SEEDS.GAME_STATE), Buffer.from(gameId)],
    SOLANA_GAMING_PROGRAM_ID
  );
}

// Program instruction types
export enum ProgramInstruction {
  InitializePrizePool = 0,
  DepositToPool = 1,
  WithdrawPrize = 2,
  CollectRake = 3,
  CreateGame = 4,
  JoinGame = 5,
  EndGame = 6,
}

// Prize pool configuration
export interface PrizePoolConfig {
  rakePercentage: number;  // 2.5% = 250 basis points
  minimumStake: number;    // Minimum SOL to participate
  maxPlayers: number;      // Maximum players per game
}

export const DEFAULT_PRIZE_CONFIG: PrizePoolConfig = {
  rakePercentage: 250,     // 2.5%
  minimumStake: 0.1,       // 0.1 SOL minimum
  maxPlayers: 8,           // Max 8 players per game
};