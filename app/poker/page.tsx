'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Trophy, Users, Coins, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Card {
  suit: string;
  rank: string;
  value: number;
}

interface Player {
  id: string;
  name: string;
  chips: number;
  cards: Card[];
  folded: boolean;
  currentBet: number;
}

const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function createDeck(): Card[] {
  const deck: Card[] = [];
  suits.forEach(suit => {
    ranks.forEach((rank, index) => {
      deck.push({
        suit,
        rank,
        value: index + 2
      });
    });
  });
  return deck.sort(() => Math.random() - 0.5);
}

export default function PokerPage() {
  const { connected } = useWallet();
  const [players, setPlayers] = useState<Player[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [currentPot, setCurrentPot] = useState(12.5);
  const [gamePhase, setGamePhase] = useState<'preflop' | 'flop' | 'turn' | 'river' | 'showdown'>('preflop');
  const [playerAction, setPlayerAction] = useState<string>('');
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    if (connected) {
      initializeGame();
    }
  }, [connected]);

  const initializeGame = () => {
    const deck = createDeck();
    const newPlayers: Player[] = [
      {
        id: 'player',
        name: 'You',
        chips: 100,
        cards: [deck.pop()!, deck.pop()!],
        folded: false,
        currentBet: 0
      },
      {
        id: 'bot1',
        name: 'Alex',
        chips: 150,
        cards: [deck.pop()!, deck.pop()!],
        folded: false,
        currentBet: 0
      },
      {
        id: 'bot2',
        name: 'Sarah',
        chips: 80,
        cards: [deck.pop()!, deck.pop()!],
        folded: false,
        currentBet: 0
      },
      {
        id: 'bot3',
        name: 'Mike',
        chips: 120,
        cards: [deck.pop()!, deck.pop()!],
        folded: false,
        currentBet: 0
      }
    ];
    
    setPlayers(newPlayers);
    setCommunityCards([]);
    setGamePhase('preflop');
    setCurrentPot(12.5 + Math.random() * 5);
  };

  const handlePlayerAction = (action: 'fold' | 'call' | 'raise') => {
    setPlayerAction(action);
    
    switch (action) {
      case 'fold':
        toast.error('You folded. Better luck next hand!');
        setPlayers(prev => 
          prev.map(p => p.id === 'player' ? { ...p, folded: true } : p)
        );
        break;
      case 'call':
        toast.success('You called!');
        advanceGamePhase();
        break;
      case 'raise':
        toast.success('You raised! Prize pool increased.');
        setCurrentPot(prev => prev + 2.5);
        advanceGamePhase();
        break;
    }
  };

  const advanceGamePhase = () => {
    const phases: typeof gamePhase[] = ['preflop', 'flop', 'turn', 'river', 'showdown'];
    const currentIndex = phases.indexOf(gamePhase);
    const nextPhase = phases[Math.min(currentIndex + 1, phases.length - 1)];
    
    setGamePhase(nextPhase);
    
    if (nextPhase === 'flop') {
      const deck = createDeck();
      setCommunityCards([deck.pop()!, deck.pop()!, deck.pop()!]);
    } else if (nextPhase === 'turn') {
      setCommunityCards(prev => [...prev, createDeck().pop()!]);
    } else if (nextPhase === 'river') {
      setCommunityCards(prev => [...prev, createDeck().pop()!]);
    } else if (nextPhase === 'showdown') {
      toast.success(`Showdown! You won ${currentPot.toFixed(2)} SOL in prizes!`);
      setShowCards(true);
    }
  };

  const resetGame = () => {
    initializeGame();
    setPlayerAction('');
    setShowCards(false);
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="game-card text-center max-w-md"
        >
          <Trophy className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Connect Wallet to Play
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Connect your Solana wallet to join Texas Hold'em tables and compete for prizes.
          </p>
          <WalletMultiButton />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link href="/" className="btn-secondary p-3">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Texas Hold'em
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Skill-based poker with transparent prize distribution
              </p>
            </div>
          </div>
          <WalletMultiButton />
        </motion.div>

        {/* Game Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="game-card mb-8"
        >
          {/* Prize Pool & Game Info */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-8 mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  {currentPot.toFixed(2)} SOL
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  {players.filter(p => !p.folded).length} active
                </span>
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize">
              {gamePhase} Phase
            </div>
          </div>

          {/* Community Cards */}
          <div className="flex justify-center space-x-4 mb-8">
            {communityCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: 180 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ delay: index * 0.2 }}
                className="poker-card w-16 h-24 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className={`text-2xl ${card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black'}`}>
                    {card.suit}
                  </div>
                  <div className="text-sm font-bold">{card.rank}</div>
                </div>
              </motion.div>
            ))}
            {Array.from({ length: 5 - communityCards.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="w-16 h-24 bg-blue-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
              />
            ))}
          </div>

          {/* Players */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {players.map((player) => (
              <div
                key={player.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  player.folded 
                    ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-50' 
                    : 'bg-white dark:bg-slate-700 border-blue-300 dark:border-blue-600'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {player.name}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {player.chips} SOL
                    </span>
                  </div>
                  
                  {/* Player Cards */}
                  <div className="flex justify-center space-x-2">
                    {player.cards.map((card, cardIndex) => (
                      <div
                        key={cardIndex}
                        className="poker-card w-10 h-14 flex items-center justify-center text-xs"
                      >
                        {player.id === 'player' || showCards ? (
                          <div className="text-center">
                            <div className={`text-lg ${card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black'}`}>
                              {card.suit}
                            </div>
                            <div className="text-xs font-bold">{card.rank}</div>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-blue-600 rounded flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Player Actions */}
          {gamePhase !== 'showdown' && !players.find(p => p.id === 'player')?.folded && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handlePlayerAction('fold')}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Fold
              </button>
              <button
                onClick={() => handlePlayerAction('call')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Call
              </button>
              <button
                onClick={() => handlePlayerAction('raise')}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Raise
              </button>
            </div>
          )}

          {gamePhase === 'showdown' && (
            <div className="text-center">
              <button
                onClick={resetGame}
                className="btn-primary"
              >
                New Hand
              </button>
            </div>
          )}
        </motion.div>

        {/* Game Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="game-card"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Prize Tournament Rules
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Game Rules</h4>
              <ul className="space-y-1">
                <li>• Standard Texas Hold'em rules</li>
                <li>• Best 5-card hand wins</li>
                <li>• Community cards shared by all</li>
                <li>• Four betting rounds</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Prize Structure</h4>
              <ul className="space-y-1">
                <li>• Winner takes 70% of prize pool</li>
                <li>• Runner-up gets 30%</li>
                <li>• All payouts instant via Solana</li>
                <li>• Transparent blockchain records</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}