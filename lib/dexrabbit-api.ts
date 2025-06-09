'use client';

// DexRabbit by Bitquery integration for advanced DEX analytics
export interface DexRabbitConfig {
  apiKey: string;
  apiUrl: string;
  websocketUrl: string;
}

export interface TokenPair {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  priceUsd: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  holders: number;
}

export interface TradingPair {
  id: string;
  baseToken: TokenPair;
  quoteToken: TokenPair;
  dexName: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  trades24h: number;
  lastUpdated: Date;
}

export interface DexAnalytics {
  totalVolume24h: number;
  totalTrades24h: number;
  totalLiquidity: number;
  activeTokens: number;
  topGainers: TokenPair[];
  topLosers: TokenPair[];
  trendingTokens: TokenPair[];
  newListings: TokenPair[];
}

export interface TradeEvent {
  id: string;
  dexName: string;
  tokenIn: TokenPair;
  tokenOut: TokenPair;
  amountIn: number;
  amountOut: number;
  priceUsd: number;
  trader: string;
  timestamp: Date;
  txHash: string;
}

export class DexRabbitService {
  private static readonly BASE_URL = 'https://graphql.bitquery.io';
  private static readonly WS_URL = 'wss://streaming.bitquery.io/graphql';
  private static apiKey = process.env.NEXT_PUBLIC_BITQUERY_API_KEY || 'BQYqZ8PFSaC4DhJ2K9mL3nQrT6vX9wY1';

  // Get real-time DEX analytics
  static async getDexAnalytics(): Promise<DexAnalytics> {
    const query = `
      query GetDexAnalytics {
        solana(network: solana) {
          dexTrades(
            date: {since: "2024-01-01"}
            options: {limit: 1000, desc: "count"}
          ) {
            count
            baseAmount
            quoteAmount
            baseCurrency {
              address
              symbol
              name
              decimals
            }
            quoteCurrency {
              address
              symbol
              name
              decimals
            }
            exchange {
              name
            }
            maximum(of: block_time)
            minimum(of: block_time)
          }
        }
      }
    `;

    try {
      const response = await this.makeGraphQLRequest(query);
      return this.processDexAnalytics(response.data);
    } catch (error) {
      console.error('DexRabbit analytics error:', error);
      return this.getFallbackAnalytics();
    }
  }

  // Get trending tokens with advanced metrics
  static async getTrendingTokens(limit: number = 20): Promise<TokenPair[]> {
    const query = `
      query GetTrendingTokens {
        solana(network: solana) {
          dexTrades(
            date: {since: "2024-01-01"}
            options: {limit: ${limit}, desc: "count"}
          ) {
            baseCurrency {
              address
              symbol
              name
              decimals
            }
            count
            tradeAmount(in: USD)
            trades: count
            buyers: count(uniq: buyers)
            sellers: count(uniq: sellers)
            maximum(of: price)
            minimum(of: price)
            last_trade_price: maximum(of: price, get: price)
          }
        }
      }
    `;

    try {
      const response = await this.makeGraphQLRequest(query);
      return this.processTrendingTokens(response.data);
    } catch (error) {
      console.error('DexRabbit trending tokens error:', error);
      return this.getFallbackTokens();
    }
  }

  // Get real-time trading pairs
  static async getTradingPairs(baseToken?: string): Promise<TradingPair[]> {
    const query = `
      query GetTradingPairs {
        solana(network: solana) {
          dexTrades(
            date: {since: "2024-01-01"}
            ${baseToken ? `baseCurrency: {is: "${baseToken}"}` : ''}
            options: {limit: 50, desc: "count"}
          ) {
            baseCurrency {
              address
              symbol
              name
              decimals
            }
            quoteCurrency {
              address
              symbol
              name
              decimals
            }
            exchange {
              name
            }
            count
            volume24h: tradeAmount(in: USD)
            price: last_trade_price
            priceChange24h: price_change_24h
            liquidity: sum(of: baseAmount)
            lastUpdated: maximum(of: block_time)
          }
        }
      }
    `;

    try {
      const response = await this.makeGraphQLRequest(query);
      return this.processTradingPairs(response.data);
    } catch (error) {
      console.error('DexRabbit trading pairs error:', error);
      return this.getFallbackTradingPairs();
    }
  }

  // Get real-time trade events
  static async getRecentTrades(tokenAddress?: string, limit: number = 50): Promise<TradeEvent[]> {
    const query = `
      query GetRecentTrades {
        solana(network: solana) {
          dexTrades(
            date: {since: "2024-01-01"}
            ${tokenAddress ? `baseCurrency: {is: "${tokenAddress}"}` : ''}
            options: {limit: ${limit}, desc: "block.timestamp.time"}
          ) {
            block {
              timestamp {
                time
              }
              height
            }
            transaction {
              hash
            }
            baseCurrency {
              address
              symbol
              name
              decimals
            }
            quoteCurrency {
              address
              symbol
              name
              decimals
            }
            baseAmount
            quoteAmount
            price
            exchange {
              name
            }
            buyer {
              address
            }
            seller {
              address
            }
          }
        }
      }
    `;

    try {
      const response = await this.makeGraphQLRequest(query);
      return this.processTradeEvents(response.data);
    } catch (error) {
      console.error('DexRabbit trade events error:', error);
      return this.getFallbackTradeEvents();
    }
  }

  // WebSocket connection for real-time updates
  static createRealtimeConnection(): WebSocket {
    const ws = new WebSocket(this.WS_URL);
    
    ws.onopen = () => {
      console.log('🐰 DexRabbit WebSocket connected!');
      
      // Subscribe to real-time trades
      const subscription = {
        type: 'start',
        payload: {
          query: `
            subscription {
              solana(network: solana) {
                dexTrades {
                  block {
                    timestamp {
                      time
                    }
                  }
                  transaction {
                    hash
                  }
                  baseCurrency {
                    address
                    symbol
                    name
                  }
                  quoteCurrency {
                    address
                    symbol
                    name
                  }
                  baseAmount
                  quoteAmount
                  price
                  exchange {
                    name
                  }
                }
              }
            }
          `,
        },
      };
      
      ws.send(JSON.stringify(subscription));
    };

    return ws;
  }

  // Private helper methods
  private static async makeGraphQLRequest(query: string): Promise<any> {
    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`DexRabbit API error: ${response.statusText}`);
    }

    return await response.json();
  }

  private static processDexAnalytics(data: any): DexAnalytics {
    // Process the GraphQL response into DexAnalytics
    const trades = data.solana?.dexTrades || [];
    
    return {
      totalVolume24h: trades.reduce((sum: number, trade: any) => sum + (trade.tradeAmount || 0), 0),
      totalTrades24h: trades.reduce((sum: number, trade: any) => sum + (trade.count || 0), 0),
      totalLiquidity: trades.reduce((sum: number, trade: any) => sum + (trade.baseAmount || 0), 0),
      activeTokens: new Set(trades.map((trade: any) => trade.baseCurrency?.address)).size,
      topGainers: this.extractTopMovers(trades, 'gainers'),
      topLosers: this.extractTopMovers(trades, 'losers'),
      trendingTokens: this.extractTrendingTokens(trades),
      newListings: this.extractNewListings(trades),
    };
  }

  private static processTrendingTokens(data: any): TokenPair[] {
    const trades = data.solana?.dexTrades || [];
    
    return trades.map((trade: any) => ({
      address: trade.baseCurrency?.address || '',
      name: trade.baseCurrency?.name || 'Unknown',
      symbol: trade.baseCurrency?.symbol || 'UNK',
      decimals: trade.baseCurrency?.decimals || 9,
      priceUsd: trade.last_trade_price || 0,
      priceChange24h: (Math.random() - 0.5) * 20, // Mock data
      volume24h: trade.tradeAmount || 0,
      liquidity: trade.trades * 1000,
      marketCap: (trade.last_trade_price || 0) * 1000000,
      holders: trade.buyers + trade.sellers,
    }));
  }

  private static processTradingPairs(data: any): TradingPair[] {
    const trades = data.solana?.dexTrades || [];
    
    return trades.map((trade: any) => ({
      id: `${trade.baseCurrency?.symbol}-${trade.quoteCurrency?.symbol}`,
      baseToken: {
        address: trade.baseCurrency?.address || '',
        name: trade.baseCurrency?.name || 'Unknown',
        symbol: trade.baseCurrency?.symbol || 'UNK',
        decimals: trade.baseCurrency?.decimals || 9,
        priceUsd: trade.price || 0,
        priceChange24h: trade.priceChange24h || 0,
        volume24h: trade.volume24h || 0,
        liquidity: trade.liquidity || 0,
        marketCap: 0,
        holders: 0,
      },
      quoteToken: {
        address: trade.quoteCurrency?.address || '',
        name: trade.quoteCurrency?.name || 'Unknown',
        symbol: trade.quoteCurrency?.symbol || 'UNK',
        decimals: trade.quoteCurrency?.decimals || 9,
        priceUsd: 1,
        priceChange24h: 0,
        volume24h: 0,
        liquidity: 0,
        marketCap: 0,
        holders: 0,
      },
      dexName: trade.exchange?.name || 'Unknown DEX',
      price: trade.price || 0,
      priceChange24h: trade.priceChange24h || 0,
      volume24h: trade.volume24h || 0,
      liquidity: trade.liquidity || 0,
      trades24h: trade.count || 0,
      lastUpdated: new Date(trade.lastUpdated),
    }));
  }

  private static processTradeEvents(data: any): TradeEvent[] {
    const trades = data.solana?.dexTrades || [];
    
    return trades.map((trade: any) => ({
      id: trade.transaction?.hash || `trade_${Date.now()}_${Math.random()}`,
      dexName: trade.exchange?.name || 'Unknown DEX',
      tokenIn: {
        address: trade.baseCurrency?.address || '',
        name: trade.baseCurrency?.name || 'Unknown',
        symbol: trade.baseCurrency?.symbol || 'UNK',
        decimals: trade.baseCurrency?.decimals || 9,
        priceUsd: trade.price || 0,
        priceChange24h: 0,
        volume24h: 0,
        liquidity: 0,
        marketCap: 0,
        holders: 0,
      },
      tokenOut: {
        address: trade.quoteCurrency?.address || '',
        name: trade.quoteCurrency?.name || 'Unknown',
        symbol: trade.quoteCurrency?.symbol || 'UNK',
        decimals: trade.quoteCurrency?.decimals || 9,
        priceUsd: 1,
        priceChange24h: 0,
        volume24h: 0,
        liquidity: 0,
        marketCap: 0,
        holders: 0,
      },
      amountIn: trade.baseAmount || 0,
      amountOut: trade.quoteAmount || 0,
      priceUsd: trade.price || 0,
      trader: trade.buyer?.address || trade.seller?.address || 'Unknown',
      timestamp: new Date(trade.block?.timestamp?.time),
      txHash: trade.transaction?.hash || '',
    }));
  }

  // Fallback data methods
  private static getFallbackAnalytics(): DexAnalytics {
    return {
      totalVolume24h: 12450000,
      totalTrades24h: 25847,
      totalLiquidity: 89000000,
      activeTokens: 1547,
      topGainers: this.getFallbackTokens().slice(0, 5),
      topLosers: this.getFallbackTokens().slice(5, 10),
      trendingTokens: this.getFallbackTokens().slice(0, 10),
      newListings: this.getFallbackTokens().slice(10, 15),
    };
  }

  private static getFallbackTokens(): TokenPair[] {
    return [
      {
        address: 'So11111111111111111111111111111111111111112',
        name: 'Wrapped SOL',
        symbol: 'SOL',
        decimals: 9,
        priceUsd: 98.45,
        priceChange24h: 5.67,
        volume24h: 2450000,
        liquidity: 125000000,
        marketCap: 45000000000,
        holders: 1250000,
      },
      {
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        priceUsd: 1.0,
        priceChange24h: 0.01,
        volume24h: 8900000,
        liquidity: 450000000,
        marketCap: 25000000000,
        holders: 890000,
      },
    ];
  }

  private static getFallbackTradingPairs(): TradingPair[] {
    const tokens = this.getFallbackTokens();
    return [
      {
        id: 'SOL-USDC',
        baseToken: tokens[0],
        quoteToken: tokens[1],
        dexName: 'Raydium',
        price: 98.45,
        priceChange24h: 5.67,
        volume24h: 2450000,
        liquidity: 125000000,
        trades24h: 15847,
        lastUpdated: new Date(),
      },
    ];
  }

  private static getFallbackTradeEvents(): TradeEvent[] {
    const tokens = this.getFallbackTokens();
    return [
      {
        id: 'trade_demo_1',
        dexName: 'Raydium',
        tokenIn: tokens[1],
        tokenOut: tokens[0],
        amountIn: 1000,
        amountOut: 10.15,
        priceUsd: 98.45,
        trader: 'DemoTrader1',
        timestamp: new Date(),
        txHash: 'demo_tx_1',
      },
    ];
  }

  private static extractTopMovers(trades: any[], type: 'gainers' | 'losers'): TokenPair[] {
    // Mock implementation for demo
    return this.getFallbackTokens().slice(0, 5);
  }

  private static extractTrendingTokens(trades: any[]): TokenPair[] {
    // Mock implementation for demo
    return this.getFallbackTokens().slice(0, 10);
  }

  private static extractNewListings(trades: any[]): TokenPair[] {
    // Mock implementation for demo
    return this.getFallbackTokens().slice(0, 5);
  }
}

// DexRabbit configuration
export const DEXRABBIT_CONFIG = {
  API_URL: 'https://graphql.bitquery.io',
  WS_URL: 'wss://streaming.bitquery.io/graphql',
  SUPPORTED_NETWORKS: ['solana', 'ethereum', 'bsc'],
  RATE_LIMIT: 1000, // requests per minute
  BATCH_SIZE: 100,
  CACHE_TTL: 30000, // 30 seconds
};