'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { TradingInterface } from '@/components/trading/TradingInterface';
import { PositionsPanel } from '@/components/trading/PositionsPanel';
import { OrderBook } from '@/components/trading/OrderBook';
import { PriceChart } from '@/components/trading/PriceChart';
import { TradingHeader } from '@/components/trading/TradingHeader';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function TradingPage() {
  const { connected } = useWallet();
  const [selectedMarket, setSelectedMarket] = useState('SOL-PERP');
  const [price, setPrice] = useState(98.45);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Simulate price updates
    const interval = setInterval(() => {
      setPrice(prev => prev + (Math.random() - 0.5) * 2);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleTrade = (side: 'long' | 'short', size: number, leverage: number) => {
    if (!connected) {
      toast.error('Please connect your wallet first');
      return;
    }

    const newPosition = {
      id: Date.now(),
      market: selectedMarket,
      side,
      size,
      leverage,
      entryPrice: price,
      unrealizedPnl: 0,
      timestamp: new Date()
    };

    setPositions(prev => [...prev, newPosition]);
    
    // Calculate and collect rake fee (0.05% of position size)
    const rakeAmount = (size * price * 0.0005).toFixed(4);
    toast.success(`Position opened! Rake fee: ${rakeAmount} SOL`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold">Futures Trading</h1>
          </div>
          <WalletMultiButton />
        </div>

        <TradingHeader 
          selectedMarket={selectedMarket}
          onMarketChange={setSelectedMarket}
          price={price}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Chart and Trading Interface */}
          <div className="lg:col-span-3 space-y-6">
            <PriceChart market={selectedMarket} price={price} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TradingInterface onTrade={handleTrade} currentPrice={price} />
              <OrderBook market={selectedMarket} />
            </div>
          </div>

          {/* Positions */}
          <div className="lg:col-span-1">
            <PositionsPanel positions={positions} currentPrice={price} />
          </div>
        </div>
      </div>
    </div>
  );
}