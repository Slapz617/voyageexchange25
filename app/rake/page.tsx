'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { RakeAnalytics } from '@/components/rake/RakeAnalytics';
import { RakeDistribution } from '@/components/rake/RakeDistribution';
import { RakeHistory } from '@/components/rake/RakeHistory';
import { ArrowLeft, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function RakePage() {
  const { connected } = useWallet();
  const [totalRake, setTotalRake] = useState(1245.67);
  const [dailyRake, setDailyRake] = useState(89.34);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRake(prev => prev + Math.random() * 2);
      setDailyRake(prev => prev + Math.random() * 0.5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
                <DollarSign className="w-8 h-8 mr-3 text-green-400" />
                Rake Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Platform revenue and fee distribution analytics</p>
            </div>
          </div>
          <WalletMultiButton />
        </div>

        {/* Rake Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="trading-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-400">
              {totalRake.toFixed(2)} SOL
            </div>
            <div className="text-gray-400 text-sm">Total Rake Collected</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="trading-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-6 h-6 text-blue-400" />
              <span className="text-xs text-green-400">+12.5%</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {dailyRake.toFixed(2)} SOL
            </div>
            <div className="text-gray-400 text-sm">Daily Rake</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="trading-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400">%</span>
              <span className="text-xs text-gray-400">avg</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">2.5%</div>
            <div className="text-gray-400 text-sm">Rake Rate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="trading-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-400">🏆</span>
              <span className="text-xs text-green-400">live</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">
              {(totalRake * 0.6).toFixed(2)} SOL
            </div>
            <div className="text-gray-400 text-sm">Prize Pool Fund</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RakeAnalytics totalRake={totalRake} dailyRake={dailyRake} />
          <RakeDistribution />
        </div>

        <div className="mt-8">
          <RakeHistory />
        </div>
      </div>
    </div>
  );
}