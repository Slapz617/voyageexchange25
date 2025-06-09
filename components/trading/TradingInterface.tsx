'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calculator } from 'lucide-react';

interface TradingInterfaceProps {
  onTrade: (side: 'long' | 'short', size: number, leverage: number) => void;
  currentPrice: number;
}

export function TradingInterface({ onTrade, currentPrice }: TradingInterfaceProps) {
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [size, setSize] = useState(100);
  const [leverage, setLeverage] = useState(10);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');

  const handleTrade = () => {
    onTrade(side, size, leverage);
  };

  const liquidationPrice = side === 'long' 
    ? currentPrice * (1 - 1/leverage * 0.9)
    : currentPrice * (1 + 1/leverage * 0.9);

  const positionValue = size * currentPrice;
  const rakeFee = positionValue * 0.0005; // 0.05% rake

  return (
    <div className="trading-card rounded-xl p-6">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <Calculator className="w-5 h-5 mr-2" />
        Place Order
      </h3>

      {/* Side Selection */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setSide('long')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
            side === 'long'
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2" />
          Long
        </button>
        <button
          onClick={() => setSide('short')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
            side === 'short'
              ? 'bg-red-600 text-white'
              : 'bg-gray-700 text-gray-400 hover:text-white'
          }`}
        >
          <TrendingDown className="w-4 h-4 inline mr-2" />
          Short
        </button>
      </div>

      {/* Order Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Order Type</label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value as 'market' | 'limit')}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
        >
          <option value="market">Market</option>
          <option value="limit">Limit</option>
        </select>
      </div>

      {/* Size */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Size (SOL)</label>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          placeholder="Enter size"
        />
      </div>

      {/* Leverage */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Leverage: {leverage}x
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1x</span>
          <span>25x</span>
          <span>50x</span>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Position Value:</span>
          <span className="text-white">${positionValue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Liquidation Price:</span>
          <span className="text-white">${liquidationPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Rake Fee:</span>
          <span className="text-yellow-400">{rakeFee.toFixed(4)} SOL</span>
        </div>
      </div>

      {/* Trade Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleTrade}
        className={`w-full py-4 rounded-lg font-semibold text-white transition-colors ${
          side === 'long'
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {side === 'long' ? 'Open Long' : 'Open Short'} Position
      </motion.button>
    </div>
  );
}