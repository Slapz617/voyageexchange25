'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Trophy } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  prizePool: string;
  players: string;
  href: string;
  icon: string;
  gradient: string;
}

export default function GameCard({
  title,
  description,
  prizePool,
  players,
  href,
  icon,
  gradient
}: GameCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="game-card group cursor-pointer"
    >
      <Link href={href}>
        <div className="flex items-start space-x-6">
          <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-4xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {prizePool}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {players} active
                  </span>
                </div>
              </div>
              
              <div className="prize-badge">
                LIVE
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}