'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  Crown, 
  Rocket, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star,
  Target,
  Zap,
  Eye,
  Calendar,
  BarChart3,
  PieChart,
  Award,
  Coins,
  Flame,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Settings,
  Download
} from 'lucide-react';
import toast from 'react-hot-toast';

interface TokenLaunch {
  id: string;
  name: string;
  symbol: string;
  marketCap: number;
  price: number;
  priceChange24h: number;
  holders: number;
  volume24h: number;
  launchDate: Date;
  status: 'active' | 'presale' | 'completed';
  raised: number;
  yourShare: number;
}

interface CreatorStats {
  totalTokensLaunched: number;
  totalRaised: number;
  totalEarnings: number;
  avgMarketCap: number;
  successRate: number;
  totalHolders: number;
  bestPerformer: string;
  rankingPosition: number;
}

export function CreatorDashboard() {
  const { connected, publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState<'overview' | 'launches' | 'analytics' | 'earnings'>('overview');
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
  
  const [creatorStats, setCreatorStats] = useState<CreatorStats>({
    totalTokensLaunched: 7,
    totalRaised: 245678.90,
    totalEarnings: 12483.45,
    avgMarketCap: 890000,
    successRate: 85.7,
    totalHolders: 15847,
    bestPerformer: 'WILD',
    rankingPosition: 23
  });

  const [tokenLaunches, setTokenLaunches] = useState<TokenLaunch[]>([
    {
      id: '1',
      name: 'Wild Meme Token',
      symbol: 'WILD',
      marketCap: 2450000,
      price: 0.0245,
      priceChange24h: 15.7,
      holders: 5847,
      volume24h: 189000,
      launchDate: new Date('2024-01-15'),
      status: 'active',
      raised: 45678,
      yourShare: 2283.9
    },
    {
      id: '2',
      name: 'Zoo Governance',
      symbol: 'ZOO',
      marketCap: 1890000,
      price: 0.189,
      priceChange24h: -8.3,
      holders: 3421,
      volume24h: 234000,
      launchDate: new Date('2024-01-20'),
      status: 'active',
      raised: 78900,
      yourShare: 3945.0
    },
    {
      id: '3',
      name: 'Gaming Prize Token',
      symbol: 'GPT',
      marketCap: 567000,
      price: 0.0056,
      priceChange24h: 42.1,
      holders: 2156,
      volume24h: 145000,
      launchDate: new Date('2024-01-25'),
      status: 'presale',
      raised: 12340,
      yourShare: 617.0
    }
  ]);

  const [earnings, setEarnings] = useState({
    today: 234.56,
    week: 1567.89,
    month: 5678.90,
    total: 12483.45,
    pending: 345.67
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCreatorStats(prev => ({
        ...prev,
        totalEarnings: prev.totalEarnings + Math.random() * 10,
        totalHolders: prev.totalHolders + Math.floor(Math.random() * 5)
      }));

      setEarnings(prev => ({
        ...prev,
        today: prev.today + Math.random() * 5,
        pending: prev.pending + Math.random() * 2
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNewLaunch = () => {
    toast.success('🚀 Redirecting to Token Creator!');
    // Would redirect to token creation form
  };

  const handleWithdrawEarnings = () => {
    toast.success(`💰 Withdrew ${earnings.pending.toFixed(2)} SOL to your wallet!`);
    setEarnings(prev => ({ ...prev, pending: 0, total: prev.total + prev.pending }));
  };

  if (!connected) {
    return (
      <div className="text-center py-16">
        <Crown className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-white mb-4">Creator Dashboard</h2>
        <p className="text-white/60 mb-6">Connect your wallet to access your creator dashboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Creator Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Creator Dashboard</h1>
              <p className="text-white/60">
                Wallet: {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-4)}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                  #{creatorStats.rankingPosition} Creator
                </span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                  {creatorStats.successRate}% Success Rate
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleNewLaunch}
              className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transition-transform flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Launch</span>
            </button>
            <button className="bg-white/10 px-4 py-3 rounded-xl text-white hover:bg-white/20 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Rocket className="w-6 h-6 text-orange-400" />
              <span className="text-xs text-green-400">+2 this week</span>
            </div>
            <div className="text-2xl font-bold text-white">{creatorStats.totalTokensLaunched}</div>
            <div className="text-white/60 text-sm">Tokens Launched</div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              <span className="text-xs text-green-400">+12.4%</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {(creatorStats.totalRaised / 1000).toFixed(0)}K SOL
            </div>
            <div className="text-white/60 text-sm">Total Raised</div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-blue-400" />
              <span className="text-xs text-green-400">+234 today</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {(creatorStats.totalHolders / 1000).toFixed(1)}K
            </div>
            <div className="text-white/60 text-sm">Total Holders</div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-xs text-green-400">+5.6%</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {creatorStats.totalEarnings.toFixed(0)} SOL
            </div>
            <div className="text-white/60 text-sm">Total Earnings</div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-black/20 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'launches', label: 'My Launches', icon: Rocket },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'earnings', label: 'Earnings', icon: DollarSign }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Chart */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Portfolio Performance</h3>
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value as any)}
                  className="bg-white/10 text-white rounded-lg px-3 py-1 text-sm border border-white/20"
                >
                  <option value="24h">24H</option>
                  <option value="7d">7D</option>
                  <option value="30d">30D</option>
                  <option value="all">All</option>
                </select>
              </div>
              
              {/* Mock Chart */}
              <div className="h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-end justify-around p-4">
                {[65, 78, 45, 89, 92, 76, 85].map((height, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-orange-500 to-red-500 w-8 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              
              <div className="mt-4 flex justify-between text-sm text-white/60">
                <span>Jan</span>
                <span>Today</span>
              </div>
            </div>

            {/* Top Performing Token */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-400" />
                Best Performer
              </h3>
              
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white">
                      W
                    </div>
                    <div>
                      <div className="font-bold text-white">Wild Meme Token</div>
                      <div className="text-white/60 text-sm">WILD</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">$0.0245</div>
                    <div className="flex items-center text-green-400 text-sm">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      +15.7%
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">$2.45M</div>
                    <div className="text-white/60 text-xs">Market Cap</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">5,847</div>
                    <div className="text-white/60 text-xs">Holders</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">$189K</div>
                    <div className="text-white/60 text-xs">24h Volume</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 lg:col-span-2">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-blue-400" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {[
                  { action: 'Token Launch', token: 'GPT', amount: '+617 SOL', time: '2 hours ago', type: 'success' },
                  { action: 'Earnings Claim', token: 'WILD', amount: '+234 SOL', time: '6 hours ago', type: 'success' },
                  { action: 'Presale Started', token: 'ZOO', amount: '+1,234 holders', time: '1 day ago', type: 'info' },
                  { action: 'Liquidity Added', token: 'WILD', amount: '+50K SOL', time: '2 days ago', type: 'info' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                      }`} />
                      <div>
                        <div className="font-semibold text-white">{activity.action}</div>
                        <div className="text-white/60 text-sm">{activity.token} • {activity.time}</div>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      activity.type === 'success' ? 'text-green-400' : 'text-blue-400'
                    }`}>
                      {activity.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'launches' && (
          <div className="space-y-6">
            {/* Launch Filter */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {['all', 'active', 'presale', 'completed'].map((status) => (
                  <button
                    key={status}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors capitalize"
                  >
                    {status}
                  </button>
                ))}
              </div>
              <button className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>

            {/* Launches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tokenLaunches.map((launch) => (
                <motion.div
                  key={launch.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center font-bold text-white">
                        {launch.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white">{launch.name}</div>
                        <div className="text-white/60 text-sm">{launch.symbol}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      launch.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      launch.status === 'presale' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {launch.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">Price</span>
                      <div className="text-right">
                        <div className="text-white font-semibold">${launch.price.toFixed(4)}</div>
                        <div className={`text-xs flex items-center ${
                          launch.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {launch.priceChange24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(launch.priceChange24h).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-white/60">Market Cap</span>
                      <span className="text-white font-semibold">
                        ${(launch.marketCap / 1000000).toFixed(2)}M
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-white/60">Holders</span>
                      <span className="text-white font-semibold">
                        {launch.holders.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-white/60">Your Earnings</span>
                      <span className="text-green-400 font-semibold">
                        {launch.yourShare.toFixed(1)} SOL
                      </span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform">
                    Manage Launch
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Token Performance Breakdown */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <PieChart className="w-6 h-6 mr-2 text-purple-400" />
                Token Performance
              </h3>
              
              <div className="space-y-4">
                {tokenLaunches.map((token, i) => (
                  <div key={token.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: ['#f97316', '#8b5cf6', '#10b981'][i % 3] }}
                      />
                      <span className="text-white font-semibold">{token.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        ${(token.marketCap / 1000000).toFixed(2)}M
                      </div>
                      <div className="text-white/60 text-sm">
                        {((token.marketCap / creatorStats.totalRaised) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Growth */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-400" />
                Community Growth
              </h3>
              
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-end justify-around p-4 mb-4">
                {[45, 62, 78, 65, 89, 92, 85].map((height, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-blue-500 to-purple-500 w-6 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">15.8K</div>
                  <div className="text-white/60 text-sm">Total Holders</div>
                  <div className="text-green-400 text-xs">+12.4%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">2.3K</div>
                  <div className="text-white/60 text-sm">New This Week</div>
                  <div className="text-green-400 text-xs">+8.7%</div>
                </div>
              </div>
            </div>

            {/* Creator Ranking */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 lg:col-span-2">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-yellow-400" />
                Creator Leaderboard
              </h3>
              
              <div className="space-y-3">
                {[
                  { rank: 22, name: 'CryptoMaster', tokens: 12, earnings: '15,234 SOL', change: '+2' },
                  { rank: 23, name: 'You', tokens: 7, earnings: '12,483 SOL', change: '0', isYou: true },
                  { rank: 24, name: 'TokenWizard', tokens: 9, earnings: '11,956 SOL', change: '-1' },
                  { rank: 25, name: 'MemeKing', tokens: 15, earnings: '11,234 SOL', change: '+3' }
                ].map((creator) => (
                  <div 
                    key={creator.rank}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      creator.isYou 
                        ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30' 
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-white">#{creator.rank}</div>
                      <div>
                        <div className={`font-semibold ${creator.isYou ? 'text-orange-400' : 'text-white'}`}>
                          {creator.name}
                          {creator.isYou && <Crown className="w-4 h-4 inline ml-2 text-yellow-400" />}
                        </div>
                        <div className="text-white/60 text-sm">{creator.tokens} tokens launched</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{creator.earnings}</div>
                      <div className={`text-sm ${
                        creator.change.startsWith('+') ? 'text-green-400' : 
                        creator.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {creator.change !== '0' && creator.change} 
                        {creator.change === '0' && 'No change'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Earnings Overview */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Earnings Breakdown</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{earnings.today.toFixed(2)}</div>
                    <div className="text-white/60 text-sm">Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{earnings.week.toFixed(2)}</div>
                    <div className="text-white/60 text-sm">This Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{earnings.month.toFixed(2)}</div>
                    <div className="text-white/60 text-sm">This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{earnings.total.toFixed(2)}</div>
                    <div className="text-white/60 text-sm">All Time</div>
                  </div>
                </div>
                
                {/* Earnings Chart */}
                <div className="h-48 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl flex items-end justify-around p-4">
                  {[234, 456, 567, 678, 789, 890, 987].map((height, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-green-500 to-blue-500 w-8 rounded-t"
                      style={{ height: `${(height / 1000) * 100}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Earnings Sources */}
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Earnings Sources</h3>
                
                <div className="space-y-4">
                  {[
                    { source: 'Launch Fees', amount: 4567.89, percentage: 36.6, color: 'orange' },
                    { source: 'Trading Commissions', amount: 3456.78, percentage: 27.7, color: 'green' },
                    { source: 'Liquidity Rewards', amount: 2345.67, percentage: 18.8, color: 'blue' },
                    { source: 'Creator Bonuses', amount: 2113.11, percentage: 16.9, color: 'purple' }
                  ].map((source, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: {
                            orange: '#f97316',
                            green: '#10b981',
                            blue: '#3b82f6',
                            purple: '#8b5cf6'
                          }[source.color] }}
                        />
                        <span className="text-white font-semibold">{source.source}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{source.amount.toFixed(2)} SOL</div>
                        <div className="text-white/60 text-sm">{source.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Withdrawal Panel */}
            <div className="space-y-6">
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Coins className="w-6 h-6 mr-2 text-yellow-400" />
                  Available to Withdraw
                </h3>
                
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {earnings.pending.toFixed(2)} SOL
                  </div>
                  <div className="text-white/60">≈ ${(earnings.pending * 98.45).toFixed(2)} USD</div>
                </div>
                
                <button
                  onClick={handleWithdrawEarnings}
                  disabled={earnings.pending === 0}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-3 rounded-xl font-bold text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {earnings.pending === 0 ? 'No Pending Earnings' : 'Withdraw All'}
                </button>
                
                <div className="mt-4 text-center text-white/60 text-sm">
                  Withdrawals are processed instantly to your connected wallet
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Recent Withdrawals</h3>
                
                <div className="space-y-3">
                  {[
                    { amount: 567.89, date: '2 hours ago', tx: 'abc123...' },
                    { amount: 234.56, date: '1 day ago', tx: 'def456...' },
                    { amount: 890.12, date: '3 days ago', tx: 'ghi789...' },
                    { amount: 345.67, date: '1 week ago', tx: 'jkl012...' }
                  ].map((withdrawal, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">{withdrawal.amount} SOL</div>
                        <div className="text-white/60 text-sm">{withdrawal.date}</div>
                      </div>
                      <button className="text-blue-400 text-sm hover:underline">
                        {withdrawal.tx}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}