import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Users, Globe, Zap, Star } from 'lucide-react';

interface MarketData {
  price: number;
  change24h: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  rank: number;
  holders: number;
}

const MarketSummary: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData>({
    price: 0.00847,
    change24h: 0.00023,
    changePercent: 2.79,
    volume: 1547832,
    marketCap: 42750000,
    rank: 47,
    holders: 15847
  });

  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time price updates
  useEffect(() => {
    // Initialize price history
    const initialHistory = Array.from({ length: 24 }, (_) => {
      const basePrice = 0.00847;
      const variation = (Math.random() - 0.5) * 0.001;
      return basePrice + variation;
    });
    setPriceHistory(initialHistory);
    setIsLoading(false);

    // Update price every 3 seconds
    const interval = setInterval(() => {
      setMarketData(prev => {
        const variation = (Math.random() - 0.5) * 0.0001;
        const newPrice = Math.max(0.001, prev.price + variation);
        const newChange = newPrice - 0.00847;
        const newChangePercent = (newChange / 0.00847) * 100;
        
        return {
          ...prev,
          price: newPrice,
          change24h: newChange,
          changePercent: newChangePercent,
          volume: prev.volume + Math.floor(Math.random() * 1000) - 500,
          holders: prev.holders + Math.floor(Math.random() * 10) - 5
        };
      });

      setPriceHistory(prev => {
        const newHistory = [...prev.slice(1), marketData.price];
        return newHistory;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [marketData.price]);

  const formatNumber = (num: number, decimals: number = 2) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toFixed(decimals);
  };

  const formatPrice = (price: number) => {
    return price.toFixed(6);
  };

  // Simple line chart component
  const MiniChart = () => {
    const max = Math.max(...priceHistory);
    const min = Math.min(...priceHistory);
    const range = max - min;
    
    const points = priceHistory.map((price, index) => {
      const x = (index / (priceHistory.length - 1)) * 200;
      const y = 60 - ((price - min) / range) * 40;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-full h-16" viewBox="0 0 200 60">
        <polyline
          points={points}
          fill="none"
          stroke={marketData.changePercent >= 0 ? "#10b981" : "#ef4444"}
          strokeWidth="2"
          className="animate-pulse"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={marketData.changePercent >= 0 ? "#10b981" : "#ef4444"} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={marketData.changePercent >= 0 ? "#10b981" : "#ef4444"} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polyline
          points={`0,60 ${points} 200,60`}
          fill="url(#gradient)"
        />
      </svg>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">ZycroneX</h1>
            <p className="text-gray-400 text-sm">ZYX • Rank #{marketData.rank}</p>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 mb-6 border border-purple-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl sm:text-4xl font-bold">${formatPrice(marketData.price)}</span>
              <span className="text-sm text-gray-400">USD</span>
            </div>
            <div className={`flex items-center gap-2 ${marketData.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {marketData.changePercent >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="font-semibold">
                {marketData.changePercent >= 0 ? '+' : ''}{marketData.changePercent.toFixed(2)}%
              </span>
              <span className="text-sm">
                ({marketData.changePercent >= 0 ? '+' : ''}${marketData.change24h.toFixed(6)})
              </span>
            </div>
          </div>
          
          <div className="w-full sm:w-48">
            <p className="text-xs text-gray-400 mb-2">24h Price Chart</p>
            <MiniChart />
          </div>
        </div>
      </div>

      {/* Market Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-green-400" />
            <span className="text-xs text-gray-400">Market Cap</span>
          </div>
          <p className="text-lg sm:text-xl font-bold">${formatNumber(marketData.marketCap)}</p>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-blue-400" />
            <span className="text-xs text-gray-400">24h Volume</span>
          </div>
          <p className="text-lg sm:text-xl font-bold">${formatNumber(marketData.volume)}</p>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-gray-400">Holders</span>
          </div>
          <p className="text-lg sm:text-xl font-bold">{formatNumber(marketData.holders, 0)}</p>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-purple-400" />
            <span className="text-xs text-gray-400">Rank</span>
          </div>
          <p className="text-lg sm:text-xl font-bold">#{marketData.rank}</p>
        </div>
      </div>

      {/* Trading Activity */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 mb-6 border border-purple-500/20">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-400" />
          Live Trading Activity
        </h2>
        
        <div className="space-y-3">
          {Array.from({ length: 5 }, (_, i) => {
            const isBuy = Math.random() > 0.5;
            const amount = (Math.random() * 1000 + 100).toFixed(0);
            const price = (marketData.price + (Math.random() - 0.5) * 0.0001).toFixed(6);
            
            return (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isBuy ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                  <span className={`text-sm font-medium ${isBuy ? 'text-green-400' : 'text-red-400'}`}>
                    {isBuy ? 'BUY' : 'SELL'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{amount} ZYX</p>
                  <p className="text-xs text-gray-400">${price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          Market Insights
        </h2>
        
        <div className="grid gap-4">
          <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4">
            <h3 className="font-semibold text-green-400 mb-2">Bullish Momentum</h3>
            <p className="text-sm text-gray-300">
              ZycronX is showing strong upward momentum with increased trading volume and growing holder count.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-4">
            <h3 className="font-semibold text-blue-400 mb-2">High Activity</h3>
            <p className="text-sm text-gray-300">
              Trading activity has increased by 15% in the last 24 hours, indicating strong market interest.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-4">
            <h3 className="font-semibold text-purple-400 mb-2">Growing Community</h3>
            <p className="text-sm text-gray-300">
              The ZycronX community continues to grow with new holders joining daily.
            </p>
          </div>
        </div>
      </div>

      {/* Live indicator */}
      {/* <div className="fixed top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-xl rounded-full px-3 py-2 border border-green-500/30">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-green-400 font-medium">LIVE</span>
      </div> */}
    </div>
  );
};

export default MarketSummary;