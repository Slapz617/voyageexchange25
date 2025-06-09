'use client';

// Jupiter integration for Solana DEX aggregation
export interface JupiterQuote {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  platformFee: null;
  priceImpactPct: string;
  routePlan: RouteInfo[];
}

export interface RouteInfo {
  swapInfo: {
    ammKey: string;
    label: string;
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    feeAmount: string;
    feeMint: string;
  };
  percent: number;
}

export class JupiterService {
  private static readonly BASE_URL = 'https://quote-api.jup.ag/v6';

  static async getQuote(
    inputMint: string,
    outputMint: string,
    amount: number,
    slippageBps: number = 50
  ): Promise<JupiterQuote> {
    const params = new URLSearchParams({
      inputMint,
      outputMint,
      amount: amount.toString(),
      slippageBps: slippageBps.toString(),
    });

    const response = await fetch(`${this.BASE_URL}/quote?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to get Jupiter quote');
    }

    return response.json();
  }

  static async getSwapTransaction(
    quote: JupiterQuote,
    userPublicKey: string,
    wrapUnwrapSOL: boolean = true
  ) {
    const response = await fetch(`${this.BASE_URL}/swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quoteResponse: quote,
        userPublicKey,
        wrapAndUnwrapSol: wrapUnwrapSOL,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get swap transaction');
    }

    return response.json();
  }

  static async getTokenList() {
    const response = await fetch('https://token.jup.ag/all');
    
    if (!response.ok) {
      throw new Error('Failed to get token list');
    }

    return response.json();
  }

  // Perpetuals integration
  static async getPerpMarkets() {
    // This would integrate with Jupiter's perpetuals when available
    // For now, return mock data
    return [
      {
        symbol: 'SOL-PERP',
        baseToken: 'SOL',
        quoteToken: 'USDC',
        markPrice: 98.45,
        indexPrice: 98.42,
        fundingRate: 0.0001,
        openInterest: 1250000,
        volume24h: 5680000,
        change24h: 2.34
      },
      {
        symbol: 'BTC-PERP',
        baseToken: 'BTC',
        quoteToken: 'USDC',
        markPrice: 43250.67,
        indexPrice: 43248.12,
        fundingRate: -0.0002,
        openInterest: 890000,
        volume24h: 12340000,
        change24h: -1.23
      },
      {
        symbol: 'ETH-PERP',
        baseToken: 'ETH',
        quoteToken: 'USDC',
        markPrice: 2650.89,
        indexPrice: 2651.23,
        fundingRate: 0.0003,
        openInterest: 2100000,
        volume24h: 8900000,
        change24h: 3.45
      }
    ];
  }

  // Calculate rake fees for trades
  static calculateRakeFee(tradeSize: number, isPerp: boolean = false): number {
    const baseRate = isPerp ? 0.0005 : 0.0003; // 0.05% for perps, 0.03% for spot
    return tradeSize * baseRate;
  }
}

// Token addresses for common tokens
export const TOKEN_ADDRESSES = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  SRM: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
  MANGO: 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac',
};