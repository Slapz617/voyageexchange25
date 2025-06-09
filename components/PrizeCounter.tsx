'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PrizeCounter() {
  const [totalPrizes, setTotalPrizes] = useState(1247.56);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalPrizes(prev => prev + (Math.random() * 0.1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto mb-12 border border-white/20"
    >
      <div className="text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          Total Prizes Distributed
        </p>
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {totalPrizes.toFixed(2)} SOL
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          ~${(totalPrizes * 45.32).toFixed(0)} USD
        </p>
      </div>
    </motion.div>
  );
}