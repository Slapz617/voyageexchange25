import { PublicKey, Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getRakeVaultPDA, SOLANA_GAMING_PROGRAM_ID } from './solana-program';

export interface RakeCollection {
  game: 'chess' | 'poker' | 'trading' | 'swap';
  amount: number;
  timestamp: Date;
  userPubkey: string;
  transactionId: string;
}

export interface RakeStats {
  totalCollected: number;
  dailyCollected: number;
  weeklyCollected: number;
  monthlyCollected: number;
  distributionBreakdown: {
    prizePool: number;
    development: number;
    operations: number;
    affiliate: number;
  };
}

export class RakeCollector {
  private static connection = new Connection('https://api.devnet.solana.com');
  private static rakeHistory: RakeCollection[] = [];

  // Collect rake from game activities
  static async collectRake(
    game: 'chess' | 'poker' | 'trading' | 'swap',
    tradeAmount: number,
    userPubkey: PublicKey,
    gameSpecificData?: any
  ): Promise<{
    rakeAmount: number;
    transaction: Transaction | null;
    success: boolean;
  }> {
    try {
      const rakeAmount = this.calculateRakeAmount(game, tradeAmount);
      
      if (rakeAmount === 0) {
        return { rakeAmount: 0, transaction: null, success: true };
      }

      // Get rake vault PDA
      const [rakeVaultPDA] = getRakeVaultPDA();

      // Create rake collection transaction
      const transaction = new Transaction();
      
      // Transfer rake to vault
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: userPubkey,
          toPubkey: rakeVaultPDA,
          lamports: rakeAmount * LAMPORTS_PER_SOL,
        })
      );

      // Set recent blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = userPubkey;

      // Record rake collection
      const rakeRecord: RakeCollection = {
        game,
        amount: rakeAmount,
        timestamp: new Date(),
        userPubkey: userPubkey.toString(),
        transactionId: `rake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      this.rakeHistory.push(rakeRecord);

      return {
        rakeAmount,
        transaction,
        success: true,
      };
    } catch (error) {
      console.error('Rake collection error:', error);
      return {
        rakeAmount: 0,
        transaction: null,
        success: false,
      };
    }
  }

  // Calculate rake amount based on game type
  static calculateRakeAmount(
    game: 'chess' | 'poker' | 'trading' | 'swap',
    amount: number
  ): number {
    const rakeRates = {
      chess: 0.025,    // 2.5%
      poker: 0.05,     // 5%
      trading: 0.0005, // 0.05%
      swap: 0.003,     // 0.3%
    };

    const rate = rakeRates[game] || 0.025;
    return amount * rate;
  }

  // Get comprehensive rake statistics
  static async getRakeStats(): Promise<RakeStats> {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const dailyRake = this.rakeHistory
      .filter(r => r.timestamp >= dayAgo)
      .reduce((sum, r) => sum + r.amount, 0);

    const weeklyRake = this.rakeHistory
      .filter(r => r.timestamp >= weekAgo)
      .reduce((sum, r) => sum + r.amount, 0);

    const monthlyRake = this.rakeHistory
      .filter(r => r.timestamp >= monthAgo)
      .reduce((sum, r) => sum + r.amount, 0);

    const totalRake = this.rakeHistory.reduce((sum, r) => sum + r.amount, 0);

    // Distribution breakdown (percentages)
    const distributionBreakdown = {
      prizePool: totalRake * 0.6,    // 60% to prize pools
      development: totalRake * 0.25, // 25% to development
      operations: totalRake * 0.1,   // 10% to operations
      affiliate: totalRake * 0.05,   // 5% to affiliates
    };

    return {
      totalCollected: totalRake,
      dailyCollected: dailyRake,
      weeklyCollected: weeklyRake,
      monthlyCollected: monthlyRake,
      distributionBreakdown,
    };
  }

  // Get rake history with filtering
  static getRakeHistory(
    game?: 'chess' | 'poker' | 'trading' | 'swap',
    limit: number = 100
  ): RakeCollection[] {
    let history = [...this.rakeHistory];
    
    if (game) {
      history = history.filter(r => r.game === game);
    }

    return history
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Distribute rake to prize pools
  static async distributeToPrizePools(amount: number): Promise<boolean> {
    try {
      // In a real implementation, this would distribute to active prize pools
      console.log(`Distributing ${amount} SOL to prize pools`);
      return true;
    } catch (error) {
      console.error('Prize distribution error:', error);
      return false;
    }
  }

  // Get real-time rake metrics
  static getRealTimeMetrics(): {
    rakePerSecond: number;
    projectedDaily: number;
    topGameByRake: string;
    recentTransactions: RakeCollection[];
  } {
    const recentHour = this.rakeHistory.filter(
      r => r.timestamp.getTime() > Date.now() - 60 * 60 * 1000
    );

    const rakePerSecond = recentHour.reduce((sum, r) => sum + r.amount, 0) / 3600;
    const projectedDaily = rakePerSecond * 86400;

    // Calculate top game by rake
    const gameRakes = this.rakeHistory.reduce((acc, r) => {
      acc[r.game] = (acc[r.game] || 0) + r.amount;
      return acc;
    }, {} as Record<string, number>);

    const topGameByRake = Object.entries(gameRakes)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'trading';

    return {
      rakePerSecond,
      projectedDaily,
      topGameByRake,
      recentTransactions: this.rakeHistory.slice(-10),
    };
  }
}

// Auto-initialize with some demo data
(() => {
  const demoRakes: RakeCollection[] = [
    {
      game: 'trading',
      amount: 12.5,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      userPubkey: 'DemoUser1',
      transactionId: 'demo_1',
    },
    {
      game: 'poker',
      amount: 8.3,
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      userPubkey: 'DemoUser2',
      transactionId: 'demo_2',
    },
    {
      game: 'chess',
      amount: 5.7,
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      userPubkey: 'DemoUser3',
      transactionId: 'demo_3',
    },
  ];

  (RakeCollector as any).rakeHistory = demoRakes;
})();