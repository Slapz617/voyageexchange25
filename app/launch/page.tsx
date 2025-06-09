'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { TokenCreator } from '@/components/launch/TokenCreator';
import { LaunchPool } from '@/components/launch/LaunchPool';
import { CreatorDashboard } from '@/components/launch/CreatorDashboard';
import { LaunchEffects } from '@/components/launch/LaunchEffects';
import { WildStats } from '@/components/launch/WildStats';
import { 
  Rocket, 
  Sparkles, 
  Trophy, 
  Zap, 
  ArrowLeft,
  Crown,
  Target,
  Flame
} from 'lucide-react';
import Link from 'next/link';

export default function LaunchPage() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState<'create' | 'pools' | 'dashboard'>('create');
  const [launchEffect, setLaunchEffect] = useState(false);
  const [totalLaunches, setTotalLaunches] = useState(147);
  const [totalRaised, setTotalRaised] = useState(45678.9);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalLaunches(prev => prev + Math.floor(Math.random() * 2));
      setTotalRaised(prev => prev + Math.random() * 100);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const triggerLaunchEffect = () => {
    setLaunchEffect(true);
    setTimeout(() => setLaunchEffect(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <LaunchEffects isActive={launchEffect} />

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Epic Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <motion.h1 
                className="text-5xl font-bold flex items-center"
                animate={{ 
                  textShadow: [
                    "0 0 7px rgb(255,255,255,0.3)",
                    "0 0 20px rgb(255,165,0,0.5)", 
                    "0 0 7px rgb(255,255,255,0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Rocket className="w-12 h-12 mr-4 text-orange-400 animate-bounce" />
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                  Zoo Launch
                </span>
                <Sparkles className="w-8 h-8 ml-2 text-yellow-400 animate-spin" />
              </motion.h1>
              <p className="text-xl text-white/80 mt-2 font-semibold">
                🦁 Wild Token Launches • Prize Pools • Creator Rewards
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={triggerLaunchEffect}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              <Flame className="w-5 h-5 inline mr-2" />
              FIRE LAUNCH! 🔥
            </motion.button>
            <WalletMultiButton />
          </div>
        </motion.div>

        {/* Wild Stats */}
        <WildStats totalLaunches={totalLaunches} totalRaised={totalRaised} />

        {/* Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-2 mb-8 bg-black/20 backdrop-blur-xl rounded-2xl p-2 border border-white/10"
        >
          {[
            { id: 'create', label: 'Create Token', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
            { id: 'pools', label: 'Launch Pools', icon: Trophy, color: 'from-orange-500 to-red-500' },
            { id: 'dashboard', label: 'Creator Hub', icon: Crown, color: 'from-blue-500 to-indigo-500' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all relative overflow-hidden ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-2xl`
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative flex items-center justify-center space-x-2">
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content with wild transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.5 
            }}
            className="relative"
          >
            {activeTab === 'create' && <TokenCreator onLaunch={triggerLaunchEffect} />}
            {activeTab === 'pools' && <LaunchPool />}
            {activeTab === 'dashboard' && <CreatorDashboard />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}