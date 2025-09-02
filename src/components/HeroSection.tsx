
import React from 'react';
import { motion } from 'framer-motion';
import WalletConnector from './WalletConnector';
import {
  Shield, Zap, Globe, DollarSign, ArrowRight, Wallet, Play
} from 'lucide-react';

interface HeroSectionProps {
  isConnected: boolean;
  isOnBNBChain: boolean;
  onConnect: () => void;
  onOpenDashboard: () => void;
  formattedAddress?: string;
  connectedWallet?: string |null;
  balance?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  isConnected, 
  isOnBNBChain, 
  onConnect, 
  onOpenDashboard, 
  formattedAddress, 
  connectedWallet,
  balance 
}) => {
  return (
  <section 
  id="home" 
  className="relative pt-2 lg:pt-12 pb-8 lg:pb-12 overflow-hidden min-h-screen flex items-start"
>
  {/* Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/8 to-purple-600/8 rounded-full filter blur-3xl animate-pulse"></div>
    <div className="absolute top-1/3 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-400/8 to-pink-600/8 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-1/4 left-1/3 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-green-400/8 to-blue-600/8 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
      
      {/* Left Content */}
      <div className="space-y-4 sm:space-y-5 text-center lg:text-left mt-20">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-1">
                  Connect to the
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Future of Finance
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mt-3">
                Experience the most secure and user-friendly way to interact with 
                decentralized applications on BNB Smart Chain and beyond.
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {[
                { icon: Shield, text: 'Secure', color: 'blue' },
                { icon: Zap, text: 'Fast', color: 'yellow' },
                { icon: Globe, text: 'Multi-Chain', color: 'green' },
                { icon: DollarSign, text: 'Low Fees', color: 'purple' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/60 text-sm font-medium text-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <feature.icon size={14} className={`text-${feature.color}-600 group-hover:scale-110 transition-transform`} />
                    <span className="text-xs sm:text-sm">{feature.text}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Connection Status - Only show when connected */}
            {isConnected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`inline-flex items-center space-x-3 px-4 py-2 rounded-xl border ${
                  isOnBNBChain 
                    ? 'border-green-200 bg-green-50 text-green-700' 
                    : 'border-amber-200 bg-amber-50 text-amber-700'
                } shadow-sm`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${
                  isOnBNBChain ? 'bg-green-500' : 'bg-amber-500'
                } animate-pulse`}></div>
                <div>
                  <div className="font-semibold text-sm">
                    {connectedWallet || 'Wallet Connected'}
                  </div>
                  <div className="text-xs opacity-80">
                    {formattedAddress} • {balance || '0.00'} BNB
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1"
            >
              {!isConnected ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConnect}
                  className="group relative px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative flex items-center justify-center space-x-2">
                    <Wallet size={18} />
                    <span>Connect Wallet</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={14} />
                    </motion.div>
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenDashboard}
                  disabled={!isOnBNBChain}
                  className={`group relative px-6 sm:px-8 py-3 font-semibold rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isOnBNBChain 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700' 
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  <span className="relative flex items-center justify-center space-x-2">
                    <span className="text-lg">{isOnBNBChain ? '🚀' : '⚠️'}</span>
                    <span>{isOnBNBChain ? 'Open Dashboard' : 'Switch Network'}</span>
                    {isOnBNBChain && (
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={14} />
                      </motion.div>
                    )}
                  </span>
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-6 sm:px-8 py-3 bg-white/90 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border border-gray-200/60 hover:bg-white hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Play size={16} />
                  <span>Learn More</span>
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 text-sm text-gray-500"
            >
              <div className="flex items-center space-x-1">
                <span>🔒</span>
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⚡</span>
                <span>Fast</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>💎</span>
                <span>100K+ Users</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🌐</span>
                <span>15+ Wallets</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Wallet Connector */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm sm:max-w-md">
              {/* Floating decoration elements */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-400 to-purple-500 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-sm">💎</span>
              </div>
              
              <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-green-400 to-emerald-500 w-6 h-6 rounded-md flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-xs">🔒</span>
              </div>
              
              <WalletConnector />
            </div>
          </motion.div>
        </div>

        {/* Bottom scroll indicator - only show when not connected */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-2"
            >
              <span className="text-xs text-gray-400 uppercase tracking-wide">Scroll to explore</span>
              <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center">
                <motion.div 
                  className="w-1 h-2 bg-gray-400 rounded-full mt-1"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;