'use client';

import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Trophy, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ChessPage() {
  const { connected } = useWallet();
  const [game, setGame] = useState(new Chess());
  const [gamePosition, setGamePosition] = useState(game.fen());
  const [gameStatus, setGameStatus] = useState('active');
  const [prizePool, setPrizePool] = useState(5.5);

  const makeMove = useCallback((sourceSquare: string, targetSquare: string) => {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (move === null) return false;

      setGame(gameCopy);
      setGamePosition(gameCopy.fen());

      if (gameCopy.isGameOver()) {
        if (gameCopy.isCheckmate()) {
          const winner = gameCopy.turn() === 'w' ? 'Black' : 'White';
          setGameStatus(`${winner} wins by checkmate!`);
          toast.success(`Game Over! ${winner} wins the prize pool of ${prizePool} SOL!`);
        } else if (gameCopy.isDraw()) {
          setGameStatus('Draw!');
          toast.success('Game ended in a draw. Prize pool split equally.');
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  }, [game, prizePool]);

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setGamePosition(newGame.fen());
    setGameStatus('active');
    setPrizePool(5.5 + Math.random() * 2);
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="game-card text-center max-w-md"
        >
          <Trophy className="w-16 h-16 mx-auto mb-6 text-purple-600" />
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Connect Wallet to Play
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Connect your Solana wallet to participate in chess tournaments and win prizes.
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
                Chess Tournament
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Skill-based chess with instant prize distribution
              </p>
            </div>
          </div>
          <WalletMultiButton />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="game-card">
              <div className="chessboard">
                <Chessboard
                  position={gamePosition}
                  onPieceDrop={(sourceSquare, targetSquare) =>
                    makeMove(sourceSquare, targetSquare)
                  }
                  customBoardStyle={{
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                />
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {gameStatus === 'active' ? 'Game in Progress' : gameStatus}
                </div>
                <button
                  onClick={resetGame}
                  className="btn-primary"
                >
                  New Game
                </button>
              </div>
            </div>
          </motion.div>

          {/* Game Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Prize Pool */}
            <div className="game-card">
              <div className="flex items-center space-x-3 mb-4">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Prize Pool
                </h3>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {prizePool.toFixed(2)} SOL
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Winner takes 80%, runner-up gets 20%
              </p>
            </div>

            {/* Game Stats */}
            <div className="game-card">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Game Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Moves</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {game.history().length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Turn</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {game.turn() === 'w' ? 'White' : 'Black'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Status</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {game.isCheck() ? 'Check!' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tournament Info */}
            <div className="game-card">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Tournament Rules
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Standard chess rules apply</li>
                <li>• Winner receives prize instantly</li>
                <li>• All moves recorded on blockchain</li>
                <li>• Fair play enforced by smart contracts</li>
                <li>• Minimum stake: 0.1 SOL</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}