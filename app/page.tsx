'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { GameCard } from '@/components/GameCard';
import { PrizeCounter } from '@/components/PrizeCounter';
import { RakeCounter } from '@/components/RakeCounter';
import { TradingStats } from '@/components/TradingStats';
import { TokenLaunchBanner } from '@/components/TokenLaunchBanner';
import { 
  Trophy, 
  Zap, 
  TrendingUp, 
  Coins, 
  Rocket,
  DollarSign,
  Users,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { connected } = useWallet();
  const [totalPrizePool, setTotalPrizePool] = useState(15847.32);
  const [totalRake, setTotalRake] = useState(1245.67);
  const [activeUsers, setActiveUsers] = useState(1337);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalPrizePool(prev => prev + Math.random() * 10);
      setTotalRake(prev => prev + Math.random() * 2);
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen">
      <TokenLaunchBanner />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col lg:flex-row justify-between items-center mb-12"
        >
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              Solana Gaming
              <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Prizes
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Skill-based gaming competitions with futures trading, token launches, and transparent prize distribution on Solana
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !rounded-full !font-semibold !transition-all !duration-300 hover:!scale-105" />
            {connected && (
              <div className="flex items-center space-x-2 text-green-400">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Connected</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={itemVariants}>
            <PrizeCounter value={totalPrizePool} label="Total Prize Pool" icon={Trophy} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <RakeCounter value={totalRake} label="Total Rake Collected" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="glass-effect rounded-xl p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{activeUsers.toLocaleString()}</div>
              <div className="text-gray-300 text-sm">Active Players</div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <TradingStats />
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants}>
            <GameCard
              title="Chess Tournaments"
              description="Strategic gameplay with real-time prize distribution"
              icon={Trophy}
              href="/chess"
              gradient="from-blue-500 to-purple-600"
              prizePool="5,847 SOL"
              players={234}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <GameCard
              title="Texas Hold'em"
              description="Skill-based poker with transparent rake system"
              icon={Zap}
              href="/poker"
              gradient="from-green-500 to-teal-600"
              prizePool="8,423 SOL"
              players={567}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <GameCard
              title="Futures Trading"
              description="Leveraged trading with Jupiter integration"
              icon={TrendingUp}
              href="/trading"
              gradient="from-orange-500 to-red-600"
              prizePool="12,456 SOL"
              players={891}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <GameCard
              title="Spot Exchange"
              description="Instant swaps powered by Jupiter aggregator"
              icon={Coins}
              href="/exchange"
              gradient="from-purple-500 to-pink-600"
              prizePool="3,234 SOL"
              players={445}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <GameCard
              title="Token Launchpad"
              description="Launch and trade new tokens with automated market making"
              icon={Rocket}
              href="/launchpad"
              gradient="from-yellow-500 to-orange-600"
              prizePool="9,876 SOL"
              players={1234}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <GameCard
              title="Rake Dashboard"
              description="Track platform revenue and fee distribution"
              icon={DollarSign}
              href="/rake"
              gradient="from-green-600 to-emerald-700"
              prizePool="1,245 SOL"
              players={null}
            />
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-xl p-6">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-semibold text-white mb-2">Transparent Fees</h3>
              <p className="text-gray-300">All rake fees are transparent and distributed fairly to prize pools</p>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white mb-2">Instant Settlements</h3>
              <p className="text-gray-300">Lightning-fast prize distribution powered by Solana blockchain</p>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold text-white mb-2">DeFi Integration</h3>
              <p className="text-gray-300">Seamless integration with Jupiter for trading and token launches</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}