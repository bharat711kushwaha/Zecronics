
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../hooks/useWallet'; 
import {
  Menu, X,  ChevronDown,
  Wallet, BarChart3,
  LogOut, Copy, Check
} from 'lucide-react';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { 
    isConnected, 
    address, 
    formattedAddress, 
    isOnBNBChain, 
    connectedWallet,
    balance,
    disconnect,
    connectWallet 
  } = useWallet();
  
  // States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  
  // Refs
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle wallet connection
  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  // Handle copy address
  const copyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy address:', error);
      }
    }
  };

  // Handle dashboard navigation
  const handleDashboardClick = () => {
    if (isConnected && isOnBNBChain) {
      navigate('/dashboard');
    } else if (isConnected && !isOnBNBChain) {
      // Show network warning
      alert('Please switch to BNB Smart Chain to access the dashboard.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 text-gray-900">
      
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-xl'
            : 'bg-white/80 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl overflow-hidden shadow-lg">
                  <motion.span 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-lg lg:text-xl text-white font-bold"
                  >
                    ₿
                  </motion.span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl lg:text-2xl bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                  ICX
                </span>
                <div className="text-xs text-gray-500">
                  Web3 Platform
                </div>
              </div>
            </Link>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              
              {/* Wallet Section */}
              {!isConnected ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConnectWallet}
                  className="hidden sm:flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Wallet size={18} />
                  <span>Connect Wallet</span>
                </motion.button>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  {/* Dashboard Button - Only show when connected and on correct network */}
                  {isOnBNBChain && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDashboardClick}
                      className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <BarChart3 size={18} />
                      <span>Dashboard</span>
                    </motion.button>
                  )}

                  {/* Connected Wallet Dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 border-2 ${
                        isOnBNBChain 
                          ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                          : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        isOnBNBChain ? 'bg-green-500' : 'bg-amber-500'
                      } animate-pulse`}></div>
                      <span className="font-mono text-sm">{formattedAddress}</span>
                      <ChevronDown size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </motion.button>

                    {/* Wallet Dropdown */}
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl backdrop-blur-xl z-50"
                        >
                          <div className="p-6">
                            {/* Wallet Info */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">
                                  Connected Wallet
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  isOnBNBChain 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {isOnBNBChain ? 'BNB Chain' : 'Wrong Network'}
                                </span>
                              </div>
                              <div className="font-bold text-lg text-gray-900">
                                {connectedWallet || 'Unknown Wallet'}
                              </div>
                            </div>

                            {/* Address */}
                            <div className="mb-4">
                              <div className="text-sm font-medium mb-2 text-gray-600">
                                Address
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <span className="font-mono text-sm">{formattedAddress}</span>
                                <button
                                  onClick={copyAddress}
                                  className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                  {showCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                </button>
                              </div>
                            </div>

                            {/* Balance */}
                            <div className="mb-6">
                              <div className="text-sm font-medium mb-2 text-gray-600">
                                Balance
                              </div>
                              <div className="text-2xl font-bold text-gray-900">
                                {balance || '0.00'} BNB
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-2">
                              {isOnBNBChain && (
                                <button
                                  onClick={() => {
                                    handleDashboardClick();
                                    setShowUserMenu(false);
                                  }}
                                  className="w-full flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300"
                                >
                                  <BarChart3 size={18} />
                                  <span>Open Dashboard</span>
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  disconnect();
                                  setShowUserMenu(false);
                                }}
                                className="w-full flex items-center space-x-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-all duration-300"
                              >
                                <LogOut size={18} />
                                <span>Disconnect</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2.5 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-3">
                {/* Mobile Wallet Section */}
                <div className="space-y-3">
                  {!isConnected ? (
                    <button
                      onClick={() => {
                        handleConnectWallet();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      <Wallet size={18} />
                      <span>Connect Wallet</span>
                    </button>
                  ) : (
                    <>
                      {/* Connected Wallet Info */}
                      <div className="p-4 rounded-xl bg-gray-100/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            Connected
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isOnBNBChain 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {isOnBNBChain ? 'BNB Chain' : 'Wrong Network'}
                          </span>
                        </div>
                        <div className="font-mono text-sm">{formattedAddress}</div>
                        <div className="text-lg font-bold text-gray-900">
                          {balance || '0.00'} BNB
                        </div>
                      </div>

                      {/* Mobile Actions */}
                      {isOnBNBChain && (
                        <button
                          onClick={() => {
                            handleDashboardClick();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300"
                        >
                          <BarChart3 size={18} />
                          <span>Open Dashboard</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          disconnect();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-all duration-300"
                      >
                        <LogOut size={18} />
                        <span>Disconnect</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative py-16 bg-white/50 border-t border-gray-200/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl flex items-center justify-center">
                  <span className="text-xl text-white font-bold">₿</span>
                </div>
                <div>
                  <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                    ICX
                  </span>
                  <div className="text-sm text-gray-500">
                    Next-Gen Web3 Platform
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-md text-gray-600">
                Experience the future of decentralized finance with our secure, 
                fast, and user-friendly Web3 wallet connector platform.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4 mt-6">
                {['🐦', '📘', '📷', '💬'].map((icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 hover:text-gray-900 rounded-xl flex items-center justify-center transition-all duration-300"
                  >
                    <span className="text-lg">{icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {['Home', 'Wallet', 'Dashboard', 'Support'].map((link) => (
                  <li key={link}>
                    <Link
                      to={`#${link.toLowerCase()}`}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">
                Support
              </h3>
              <ul className="space-y-3">
                {['Help Center', 'Documentation', 'Contact Us', 'FAQ'].map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200/50 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-600">
              © 2025 ICX. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <Link 
                to="#" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="#" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeLayout;