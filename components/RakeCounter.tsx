'use client';

import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface RakeCounterProps {
  value: number;
  label: string;
}

export function RakeCounter({ value, label }: RakeCounterProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass-effect rounded-xl p-6 text-center"
    >
      <div className="flex items-center justify-center mb-2">
        <DollarSign className="w-8 h-8 text-yellow-400 mr-2" />
        <div className="text-2xl font-bold rake-counter">
          {value.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })} SOL
        </div>
      </div>
      <div className="text-gray-300 text-sm">{label}</div>
      <div className="text-xs text-green-400 mt-1">
        +{(Math.random() * 5).toFixed(2)}% from games
      </div>
    </motion.div>
  );
}