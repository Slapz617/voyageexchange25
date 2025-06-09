'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function TokenLaunchBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="relative overflow-hidden"
      >
        <div className="token-launch-glow h-16 flex items-center justify-center relative">
          <div className="flex items-center space-x-4 text-white font-semibold">
            <Sparkles className="w-6 h-6 animate-spin" />
            <span className="text-lg">🚀 New Token Launch Program Live!</span>
            <Link 
              href="/launchpad"
              className="bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
            >
              Launch Now
            </Link>
            <Rocket className="w-6 h-6" />
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}