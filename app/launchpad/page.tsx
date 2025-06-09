'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { TokenCreator } from '@/components/launchpad/TokenCreator';
import { TokenList } from '@/components/launchpad/TokenList';
import { LaunchpadStats } from '@/components/launchpad/LaunchpadStats';
import { ArrowLeft, Rocket, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function LaunchpadPage() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState<'create' | 'explore'>('explore');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Rocket className="w-8 h-8 mr-3 text-yellow-400" />
                Token Launchpad
              </h1>
              <p className="text-gray-400 mt-1">Launch and discover new tokens on Solana</p>
            </div>
          </div>
          <WalletMultiButton />
        </div>

        <LaunchpadStats />

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'explore'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline mr-2" />
            Explore Tokens
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'create'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Rocket className="w-5 h-5 inline mr-2" />
            Create Token
          </button>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'explore' ? (
            <TokenList />
          ) : (
            <TokenCreator />
          )}
        </motion.div>
      </div>
    </div>
  );
}