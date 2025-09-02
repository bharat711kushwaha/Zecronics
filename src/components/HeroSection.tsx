import React from 'react';
import { motion } from 'framer-motion';
import WalletConnector from './WalletConnector';
import {
  Shield, Zap, Globe, DollarSign, ArrowRight, Wallet, CheckCircle
} from 'lucide-react';

interface HeroSectionProps {
  isConnected: boolean;
  isOnBNBChain: boolean;
  onConnect: () => void;
  onOpenDashboard: () => void;
  formattedAddress?: string;
  connectedWallet?: string | null;
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
    <section className="relative bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      
      {/* Background Elements - Subtle */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-50 rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-50 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Connect to the
                <span className="block text-blue-600 mt-2">
                  Future of Finance
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Experience the most secure and user-friendly way to interact with 
                decentralized applications on BNB Smart Chain.
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {[
                { icon: Shield, text: 'Secure', color: 'blue' },
                { icon: Zap, text: 'Fast', color: 'green' },
                { icon: Globe, text: 'Multi-Chain', color: 'indigo' },
                { icon: DollarSign, text: 'Low Fees', color: 'purple' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <feature.icon size={16} className={`text-${feature.color}-600`} />
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Connection Status */}
            {isConnected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center space-x-3 px-4 py-3 bg-white border rounded-xl shadow-sm"
              >
                <div className={`w-3 h-3 rounded-full ${
                  isOnBNBChain ? 'bg-green-500' : 'bg-amber-500'
                } animate-pulse`}></div>
                <div className="text-left">
                  <div className="font-semibold text-sm text-gray-900">
                    {connectedWallet || 'Wallet Connected'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formattedAddress} • {balance || '0.00'} BNB
                  </div>
                </div>
                <CheckCircle size={20} className="text-green-500" />
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {!isConnected ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConnect}
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Wallet size={20} className="mr-3" />
                  <span>Connect Wallet</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenDashboard}
                  disabled={!isOnBNBChain}
                  className={`group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isOnBNBChain 
                      ? 'text-white bg-green-600 hover:bg-green-700' 
                      : 'text-gray-500 bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <span className="mr-3">{isOnBNBChain ? '🚀' : '⚠️'}</span>
                  <span>{isOnBNBChain ? 'Open Dashboard' : 'Switch Network'}</span>
                  {isOnBNBChain && <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>Learn More</span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">🔒</span>
                </div>
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">⚡</span>
                </div>
                <span>Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">👥</span>
                </div>
                <span>100K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">🌐</span>
                </div>
                <span>15+ Wallets</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Wallet Connector */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md">
              <WalletConnector />
            </div>
          </motion.div>
        </div>

        {/* Bottom Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          {[
            { number: '100K+', label: 'Active Users' },
            { number: '$2M+', label: 'Volume Traded' },
            { number: '15+', label: 'Supported Wallets' },
            { number: '99.9%', label: 'Uptime' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;