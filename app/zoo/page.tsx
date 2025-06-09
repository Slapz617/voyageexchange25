'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ZooSwapInterface } from '@/components/zoo/ZooSwapInterface';
import { ZooLiquidityPanel } from '@/components/zoo/ZooLiquidityPanel';
import { ZooStats } from '@/components/zoo/ZooStats';
import { ZooTokenList } from '@/components/zoo/ZooTokenList';
import { ArrowLeft, Zap, TrendingUp, Droplets } from 'lucide-react';
import Link from 'next/link';

export default function SolanaZooPage() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState<'swap' | 'liquidity' | 'tokens'>('swap');
  const [totalVolume, setTotalVolume] = useState(2450000);
  const [affiliateFees, setAffiliateFees] = useState(1245.67);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalVolume(prev => prev + Math.random() * 10000);
      setAffiliateFees(prev => prev + Math.random() * 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold flex items-center">
                🦁 <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent ml-3">
                  Solana Zoo
                </span>
              </h1>
              <p className="text-gray-400 mt-1">Wild DeFi Trading • Jupiter-Powered Swaps</p>
            </div>
          </div>
          <WalletMultiButton />
        </div>

        {/* Stats Row */}
        <ZooStats totalVolume={totalVolume} affiliateFees={affiliateFees} />

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('swap')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'swap'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Zap className="w-5 h-5 inline mr-2" />
            Swap
          </button>
          <button
            onClick={() => setActiveTab('liquidity')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'liquidity'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Droplets className="w-5 h-5 inline mr-2" />
            Liquidity
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'tokens'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline mr-2" />
            Tokens
          </button>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'swap' && <ZooSwapInterface />}
          {activeTab === 'liquidity' && <ZooLiquidityPanel />}
          {activeTab === 'tokens' && <ZooTokenList />}
        </motion.div>
      </div>
    </div>
  );
}