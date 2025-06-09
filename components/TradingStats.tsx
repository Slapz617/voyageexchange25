'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function TradingStats() {
  const [stats, setStats] = useState({
    volume24h: 2450000,
    change24h: 12.5,
    totalTrades: 15847
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        volume24h: prev.volume24h + Math.random() * 10000,
        change24h: prev.change24h + (Math.random() - 0.5) * 2,
        totalTrades: prev.totalTrades + Math.floor(Math.random() * 5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const isPositive = stats.change24h >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`glass-effect rounded-xl p-6 text-center ${
        isPositive ? 'profit-glow' : 'loss-glow'
      }`}
    >
      <div className="flex items-center justify-center mb-2">
        {isPositive ? (
          <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
        ) : (
          <TrendingDown className="w-6 h-6 text-red-400 mr-2" />
        )}
        <div className="text-lg font-bold text-white">
          ${stats.volume24h.toLocaleString()}
        </div>
      </div>
      <div className="text-gray-300 text-sm mb-1">24h Volume</div>
      <div className={`text-xs font-semibold ${
        isPositive ? 'text-green-400' : 'text-red-400'
      }`}>
        {isPositive ? '+' : ''}{stats.change24h.toFixed(2)}%
      </div>
      <div className="text-xs text-gray-400 mt-1">
        {stats.totalTrades.toLocaleString()} trades
      </div>
    </motion.div>
  );
}