'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  Rocket, 
  Sparkles, 
  Upload, 
  Coins, 
  Target, 
  Zap, 
  Crown,
  DollarSign,
  Users,
  Star,
  Flame,
  TrendingUp,
  Trophy,
  Plus,
  ArrowRight,
  Eye,
  Download,
  Copy
} from 'lucide-react';
import toast from 'react-hot-toast';

interface TokenCreatorProps {
  onLaunch?: () => void;
}

export function TokenCreator({ onLaunch }: TokenCreatorProps) {
  const { connected, publicKey } = useWallet();
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    description: '',
    image: null as File | null,
    totalSupply: 1000000000,
    decimals: 9,
    website: '',
    twitter: '',
    telegram: '',
    discord: ''
  });

  const [launchConfig, setLaunchConfig] = useState({
    presaleAmount: 40, // 40% for presale
    presalePrice: 0.0001,
    liquidityAmount: 50, // 50% for liquidity
    launchFee: 2.5, // 2.5 SOL launch fee
    creatorRewards: 10, // 10% for creator
    prizePool: 5 // 5 SOL prize pool
  });

  const [preview, setPreview] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTokenData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateToken = async () => {
    if (!connected) {
      toast.error('Please connect your wallet first!');
      return;
    }

    setIsCreating(true);
    
    try {
      // Simulate token creation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('🚀 Token created successfully!');
      onLaunch?.();
      
      // Reset form
      setStep(1);
      setTokenData({
        name: '',
        symbol: '',
        description: '',
        image: null,
        totalSupply: 1000000000,
        decimals: 9,
        website: '',
        twitter: '',
        telegram: '',
        discord: ''
      });
      setPreview('');
    } catch (error) {
      toast.error('Failed to create token. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!connected) {
    return (
      <div className="text-center py-16">
        <Rocket className="w-16 h-16 mx-auto mb-6 text-orange-400" />
        <h2 className="text-2xl font-bold text-white mb-4">Create Your Token</h2>
        <p className="text-white/60 mb-6">Connect your wallet to start launching tokens with prizes</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-center space-x-4 mb-6">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <motion.div
                animate={{
                  backgroundColor: stepNum <= step ? '#f97316' : '#374151',
                  scale: stepNum === step ? 1.2 : 1
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              >
                {stepNum}
              </motion.div>
              {stepNum < 4 && (
                <div 
                  className={`w-16 h-1 mx-2 ${stepNum < step ? 'bg-orange-500' : 'bg-gray-600'}`}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            {step === 1 && 'Token Details'}
            {step === 2 && 'Social Links'}
            {step === 3 && 'Launch Configuration'}
            {step === 4 && 'Review & Launch'}
          </h2>
          <p className="text-white/60">
            {step === 1 && 'Set up your token name, symbol, and supply'}
            {step === 2 && 'Add social media links and community info'}
            {step === 3 && 'Configure presale and liquidity parameters'}
            {step === 4 && 'Review everything and launch your token'}
          </p>
        </div>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          {step === 1 && (
            <div className="space-y-6">
              {/* Token Image Upload */}
              <div className="text-center">
                <div className="relative mx-auto w-32 h-32 mb-4">
                  {preview ? (
                    <img 
                      src={preview} 
                      alt="Token preview" 
                      className="w-full h-full rounded-full object-cover border-4 border-orange-500"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Upload className="w-12 h-12 text-white" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 cursor-pointer hover:bg-orange-600 transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-white/60 text-sm">Upload token logo (recommended: 512x512px)</p>
              </div>

              {/* Token Name & Symbol */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Token Name</label>
                  <input
                    type="text"
                    value={tokenData.name}
                    onChange={(e) => setTokenData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Wild Meme Token"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Symbol</label>
                  <input
                    type="text"
                    value={tokenData.symbol}
                    onChange={(e) => setTokenData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                    placeholder="e.g., WILD"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <textarea
                  value={tokenData.description}
                  onChange={(e) => setTokenData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your token and its utility..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>

              {/* Supply & Decimals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Total Supply</label>
                  <input
                    type="number"
                    value={tokenData.totalSupply}
                    onChange={(e) => setTokenData(prev => ({ ...prev, totalSupply: Number(e.target.value) }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Decimals</label>
                  <select
                    value={tokenData.decimals}
                    onChange={(e) => setTokenData(prev => ({ ...prev, decimals: Number(e.target.value) }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value={6}>6 decimals</option>
                    <option value={9}>9 decimals (recommended)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-bold text-white mb-2">Build Your Community</h3>
                <p className="text-white/60">Add social links to help users find and follow your project</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Website</label>
                  <input
                    type="url"
                    value={tokenData.website}
                    onChange={(e) => setTokenData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://yourtoken.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Twitter</label>
                  <input
                    type="text"
                    value={tokenData.twitter}
                    onChange={(e) => setTokenData(prev => ({ ...prev, twitter: e.target.value }))}
                    placeholder="@yourtoken"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Telegram</label>
                  <input
                    type="text"
                    value={tokenData.telegram}
                    onChange={(e) => setTokenData(prev => ({ ...prev, telegram: e.target.value }))}
                    placeholder="t.me/yourtoken"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Discord</label>
                  <input
                    type="text"
                    value={tokenData.discord}
                    onChange={(e) => setTokenData(prev => ({ ...prev, discord: e.target.value }))}
                    placeholder="discord.gg/yourtoken"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Target className="w-12 h-12 mx-auto mb-4 text-green-400" />
                <h3 className="text-xl font-bold text-white mb-2">Launch Configuration</h3>
                <p className="text-white/60">Set up presale and liquidity parameters</p>
              </div>

              {/* Tokenomics Visualization */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-bold text-white mb-4">Token Distribution</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Presale</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${launchConfig.presaleAmount}%` }}
                        />
                      </div>
                      <span className="text-white font-semibold">{launchConfig.presaleAmount}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Liquidity</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${launchConfig.liquidityAmount}%` }}
                        />
                      </div>
                      <span className="text-white font-semibold">{launchConfig.liquidityAmount}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Creator</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${launchConfig.creatorRewards}%` }}
                        />
                      </div>
                      <span className="text-white font-semibold">{launchConfig.creatorRewards}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Launch Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Presale Price (SOL)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={launchConfig.presalePrice}
                    onChange={(e) => setLaunchConfig(prev => ({ ...prev, presalePrice: Number(e.target.value) }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Launch Fee (SOL)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={launchConfig.launchFee}
                    onChange={(e) => setLaunchConfig(prev => ({ ...prev, launchFee: Number(e.target.value) }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Prize Pool Contribution */}
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <span className="font-bold text-white">Prize Pool Contribution</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-400">{launchConfig.prizePool} SOL</span>
                </div>
                <p className="text-white/80 text-sm">
                  Your launch will contribute to the platform prize pool, earning you creator rewards and boosting your token visibility!
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Rocket className="w-12 h-12 mx-auto mb-4 text-orange-400 animate-bounce" />
                <h3 className="text-xl font-bold text-white mb-2">Ready to Launch! 🚀</h3>
                <p className="text-white/60">Review your token details and launch to the universe</p>
              </div>

              {/* Token Preview Card */}
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30">
                <div className="flex items-center space-x-4 mb-6">
                  {preview ? (
                    <img src={preview} alt="Token" className="w-16 h-16 rounded-full border-2 border-orange-500" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Coins className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-2xl font-bold text-white">{tokenData.name || 'Token Name'}</h4>
                    <p className="text-white/60">{tokenData.symbol || 'SYMBOL'} • {tokenData.totalSupply.toLocaleString()} supply</p>
                  </div>
                </div>

                <p className="text-white/80 mb-6">{tokenData.description || 'Token description...'}</p>

                {/* Social Links Preview */}
                {(tokenData.website || tokenData.twitter || tokenData.telegram || tokenData.discord) && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tokenData.website && (
                      <span className="bg-white/10 px-3 py-1 rounded-full text-white/80 text-sm">🌐 Website</span>
                    )}
                    {tokenData.twitter && (
                      <span className="bg-white/10 px-3 py-1 rounded-full text-white/80 text-sm">🐦 Twitter</span>
                    )}
                    {tokenData.telegram && (
                      <span className="bg-white/10 px-3 py-1 rounded-full text-white/80 text-sm">📱 Telegram</span>
                    )}
                    {tokenData.discord && (
                      <span className="bg-white/10 px-3 py-1 rounded-full text-white/80 text-sm">💬 Discord</span>
                    )}
                  </div>
                )}

                {/* Launch Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-400">{launchConfig.presaleAmount}%</div>
                    <div className="text-white/60 text-sm">Presale</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">{launchConfig.liquidityAmount}%</div>
                    <div className="text-white/60 text-sm">Liquidity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">{launchConfig.creatorRewards}%</div>
                    <div className="text-white/60 text-sm">Creator</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">{launchConfig.prizePool} SOL</div>
                    <div className="text-white/60 text-sm">Prize Pool</div>
                  </div>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h5 className="font-semibold text-white mb-3">Fee Breakdown</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/80">Token Creation</span>
                    <span className="text-white">0.1 SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Launch Fee</span>
                    <span className="text-white">{launchConfig.launchFee} SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Prize Pool Contribution</span>
                    <span className="text-white">{launchConfig.prizePool} SOL</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex justify-between font-semibold">
                    <span className="text-white">Total Cost</span>
                    <span className="text-green-400">{(0.1 + launchConfig.launchFee + launchConfig.prizePool).toFixed(1)} SOL</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-white/10 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <span>← Previous</span>
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <motion.button
                onClick={handleCreateToken}
                disabled={isCreating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isCreating && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-5 h-5" />
                  </motion.div>
                )}
                <span>{isCreating ? 'Launching...' : 'Launch Token! 🚀'}</span>
                {!isCreating && <Rocket className="w-5 h-5" />}
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Launch Effect Overlay */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-full"
            >
              <Rocket className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}