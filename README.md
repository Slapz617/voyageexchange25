# 🚀 Voyage Exchange - Token Launch Ecosystem

[![Netlify Status](https://api.netlify.com/api/v1/badges/309c8ff1-7ea3-4c8e-952f-bc4d91be8274/deploy-status)](https://app.netlify.com/projects/voyagerexchange/deploys)

> **The Ultimate Token Creator Platform on Solana**

## 🌟 Overview

**Voyage Exchange** is a revolutionary token launch ecosystem featuring:
- 🚀 **Professional Token Creator** with 4-step launch process
- 💰 **Launch Pools** with prize systems and tier rewards
- 🎯 **Jupiter Affiliate Integration** with `A6Fdp2gZgBEvPd7uqkUTJqhdf3Jiucdes3MuTcyDupkq`
- ✨ **Amazing Visual Effects** like Jupiter.ag and PancakeSwap
- 🏆 **Creator Rewards Program** with automatic fee distribution
- 📊 **Real-time Analytics** and launch tracking

## 🔥 Key Features

### Token Creation Engine
- **4-Step Launch Process** with stunning animations
- **Token metadata upload** with IPFS integration
- **Social links integration** (Twitter, Discord, Telegram)
- **Tokenomics visualization** with interactive charts
- **Prize pool contributions** and fee breakdowns

### Launch Pool System
- **Real-time investment tracking** with progress bars
- **Tier system** (Bronze, Silver, Gold, Diamond)
- **Prize multipliers** and participant rewards
- **Time countdown** with live updates
- **Investment calculator** with amount validation

### Visual Effects Engine
- **Floating rockets** and sparkles explosions
- **Lightning bolts** and prize stars
- **Crown/trophy animations** with particle systems
- **Background flash effects** and gradient animations
- **Success celebration** overlays with sound effects

### Jupiter Affiliate Integration
- **Account**: `A6Fdp2gZgBEvPd7uqkUTJqhdf3Jiucdes3MuTcyDupkq`
- **0.1% Affiliate Fees** from all swaps
- **Auto Prize Pool Distribution** (60% prizes, 30% creators, 10% platform)
- **Real-time earnings tracking**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Solana wallet (Phantom, Solflare, etc.)
- Git for version control

### Installation
```bash
# Clone the repository
git clone https://github.com/Slapz617/voyageexchange25.git
cd voyageexchange25

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your configuration
# NEXT_PUBLIC_JUPITER_AFFILIATE_ACCOUNT=A6Fdp2gZgBEvPd7uqkUTJqhdf3Jiucdes3MuTcyDupkq

# Start development server
npm run dev
```

### Environment Setup
```env
# Jupiter Affiliate Configuration
NEXT_PUBLIC_JUPITER_AFFILIATE_ACCOUNT=A6Fdp2gZgBEvPd7uqkUTJqhdf3Jiucdes3MuTcyDupkq
NEXT_PUBLIC_JUPITER_AFFILIATE_FEE_BPS=10

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Platform Configuration
NEXT_PUBLIC_LAUNCH_FEE_SOL=2.5
NEXT_PUBLIC_PRIZE_POOL_PERCENTAGE=60
NEXT_PUBLIC_CREATOR_REWARD_PERCENTAGE=30
```

## 🎯 Core Pages

### `/launch` - Token Creator
- **Step 1**: Token details (name, symbol, supply, image)
- **Step 2**: Social links (website, Twitter, Telegram, Discord)
- **Step 3**: Launch configuration (presale, liquidity, fees)
- **Step 4**: Review and launch with amazing effects

### `/pools` - Launch Pools
- **Active Launches** with real-time participation
- **Investment Interface** with tier-based rewards
- **Progress Tracking** with animated progress bars
- **Prize Distribution** with automatic payouts

### `/creator` - Creator Dashboard
- **Launch Analytics** with performance metrics
- **Earnings Tracking** with Jupiter affiliate fees
- **Portfolio Management** with token performance
- **Creator Leaderboard** with ranking system

## 🎨 Visual Design System

### Color Palette
- **Primary**: Orange (#f97316) to Red (#dc2626) gradients
- **Secondary**: Blue (#3b82f6) to Purple (#8b5cf6) gradients
- **Accent**: Yellow (#eab308) for highlights and success
- **Base**: Dark theme with glassmorphism effects

### Animation Library
- **Framer Motion** for smooth transitions
- **Particle Systems** for launch effects
- **Gradient Animations** for background movement
- **Micro-interactions** for button states

### Component Architecture
- **Modular Design** with reusable components
- **Mobile-First** responsive design
- **Accessibility** with proper ARIA labels
- **Performance** optimized with code splitting

## 💰 Revenue Model

### Jupiter Affiliate Fees
- **0.1% fee** on all Jupiter swaps
- **Auto-distribution** to prize pools and creators
- **Real-time tracking** of affiliate earnings
- **Creator rewards** based on token performance

### Launch Fees
- **2.5 SOL** base launch fee
- **Prize pool contribution** (5 SOL minimum)
- **Creator tier benefits** with reduced fees
- **Volume-based rebates** for high performers

### Prize Pool Distribution
- **60%** to prize pools and tournaments
- **30%** to creators and token launchers
- **10%** to platform development and operations

## 🛠️ Technical Stack

### Frontend
- **Next.js 13** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### Blockchain
- **Solana Web3.js** for blockchain interaction
- **Wallet Adapter** for multi-wallet support
- **Jupiter API** for DEX aggregation
- **SPL Token** for token operations

### APIs & Services
- **Jupiter Aggregator** for optimal swap routes
- **Bitquery/DexRabbit** for DEX analytics
- **IPFS** for metadata storage
- **WebSocket** for real-time updates

## 🚀 Deployment

### Development
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
```

### Production (Vercel)
1. Connect your GitHub repository to Vercel.
2. Add environment variables from `.env.local` in the Vercel dashboard.
3. Deploy automatically on push to main.

### Production (Netlify)
1. Connect your GitHub repository to Netlify.
2. **Base directory:** (leave blank)
3. Add environment variables in the Netlify dashboard (copy from your `.env.local`).
4. Ensure `netlify.toml` is in your project root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   ```
5. Deploy!

> **Note:** Do not commit your `.env.local` file. Add it to `.gitignore`.

### Custom Deployment
```bash
npm run build
npm run start
```

## 🎉 Launch Features

### Token Creation
1. **Upload token image** with preview
2. **Set token details** (name, symbol, supply)
3. **Add social links** for community building
4. **Configure tokenomics** (presale, liquidity, creator allocation)
5. **Review and launch** with spectacular effects

### Launch Pool Participation
1. **Browse active launches** with real-time data
2. **Choose investment tier** (Bronze to Diamond)
3. **Participate in presale** with automatic allocation
4. **Earn tier rewards** and bonus multipliers
5. **Claim tokens** after successful launch

### Creator Benefits
1. **Reduced launch fees** for verified creators
2. **Affiliate earnings** from Jupiter swaps
3. **Creator dashboard** with analytics
4. **Leaderboard ranking** with reputation system
5. **Community features** and badge system

## 📊 Analytics & Tracking

### Launch Metrics
- **Total launches** and success rate
- **Funds raised** and participant counts
- **Creator earnings** and affiliate fees
- **Prize pool distributions** and winner tracking

### Token Performance
- **Price tracking** with charts
- **Volume analysis** and holder metrics
- **Liquidity monitoring** and DEX listings
- **Social sentiment** and community growth

## 🔐 Security Features

### Smart Contract Security
- **Audited contracts** for token creation
- **Multi-signature** for large transactions
- **Time locks** for critical operations
- **Emergency pause** functionality

### User Protection
- **Wallet verification** and transaction signing
- **Slippage protection** on all swaps
- **Rug pull protection** with liquidity locks
- **KYC integration** for large launches

## 🤝 Community

### Social Links
- **GitHub**: https://github.com/Slapz617/voyageexchange25
- **Twitter**: @VoyageExchange
- **Discord**: discord.gg/voyageexchange
- **Telegram**: t.me/voyageexchange

### Contributing
1. Fork the repository
2. Create feature branch
3. Make your changes
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with 💜 on Solana | Powered by Jupiter Aggregator**

*Voyage Exchange - Where tokens launch to the moon! 🚀*