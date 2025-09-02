import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../hooks/useWallet'; 
import {
  Menu, X, ChevronDown,
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
      navigate('/investment/dashboard');
    } else if (isConnected && !isOnBNBChain) {
      alert('Please switch to BNB Smart Chain to access the dashboard.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navigation Bar - Professional Design */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg border-b border-gray-200'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section - Fixed with proper logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="ICX Logo" 
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-cover rounded-xl shadow-sm border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMyNTYzRUIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMiIgeT0iMTIiPgo8cGF0aCBkPSJNMTIgMkwxNC4wOSA4LjI2TDIxIDlMMTQuMDkgMTUuNzRMMTIgMjJMOS45MSAxNS43NEwzIDlMOS45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl lg:text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                  Zycronex
                </span>
                <div className="text-xs text-gray-500">
                  Web3 Platform
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Features
              </Link>
              <Link to="/#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                How it Works
              </Link>
              <Link to="/#security" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Security
              </Link>
              <Link 
                to="/investment/dashboard" 
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                <BarChart3 size={16} />
                <span>Dashboard</span>
              </Link>
            </div>

            {/* Right Section - Mobile Optimized */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Wallet Section */}
              {!isConnected ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConnectWallet}
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  <Wallet size={16} />
                  <span>Connect Wallet</span>
                </motion.button>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  {/* Dashboard Button */}
                  {isOnBNBChain && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDashboardClick}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                    >
                      <BarChart3 size={16} />
                      <span>Dashboard</span>
                    </motion.button>
                  )}

                  {/* Connected Wallet Dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border ${
                        isOnBNBChain 
                          ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                          : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        isOnBNBChain ? 'bg-green-500' : 'bg-amber-500'
                      }`}></div>
                      <span className="font-mono text-sm">{formattedAddress}</span>
                      <ChevronDown size={14} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </motion.button>

                    {/* Wallet Dropdown */}
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
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
                              <div className="font-semibold text-gray-900">
                                {connectedWallet || 'Unknown Wallet'}
                              </div>
                            </div>

                            {/* Address */}
                            <div className="mb-4">
                              <div className="text-sm font-medium mb-2 text-gray-600">
                                Address
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="font-mono text-sm text-gray-700">{formattedAddress}</span>
                                <button
                                  onClick={copyAddress}
                                  className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                                >
                                  {showCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-500" />}
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
                                  className="w-full flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                >
                                  <BarChart3 size={16} />
                                  <span>Open Dashboard</span>
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  disconnect();
                                  setShowUserMenu(false);
                                }}
                                className="w-full flex items-center space-x-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors"
                              >
                                <LogOut size={16} />
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

              {/* Mobile Connect Button */}
              {!isConnected && (
                <button
                  onClick={handleConnectWallet}
                  className="sm:hidden flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Wallet size={14} />
                  <span>Connect</span>
                </button>
              )}

              {/* Mobile Connected Indicator */}
              {isConnected && (
                <div className="md:hidden flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${isOnBNBChain ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <span className="text-xs text-gray-600 hidden xs:inline">Connected</span>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Improved */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-4 space-y-3">
                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  {[
                    { name: 'Features', href: '/#features' },
                    { name: 'How it Works', href: '/#how-it-works' },
                    { name: 'Security', href: '/#security' },
                    { name: 'Dashboard', href: '/investment/dashboard' }
                  ].map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        link.name === 'Dashboard' 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {link.name === 'Dashboard' && <BarChart3 size={16} />}
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Wallet Section */}
                <div className="pt-3 border-t border-gray-200">
                  {!isConnected ? (
                    <button
                      onClick={() => {
                        handleConnectWallet();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <Wallet size={16} />
                      <span>Connect Wallet</span>
                    </button>
                  ) : (
                    <>
                      {/* Connected Wallet Info */}
                      <div className="p-4 rounded-lg bg-gray-50 mb-3">
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
                        <div className="font-mono text-sm text-gray-700">{formattedAddress}</div>
                        <div className="text-lg font-semibold text-gray-900">
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
                          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors mb-2"
                        >
                          <BarChart3 size={16} />
                          <span>Open Dashboard</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          disconnect();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Disconnect</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Copy Success Notification */}
        {showCopied && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-60">
            Address Copied!
          </div>
        )}
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {children}
      </main>

      {/* Footer - Professional Design */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/logo.png" 
                  alt="ICX Logo" 
                  className="w-10 h-10 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyNTYzRUIiLz4KPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTIgMkwxNC4wOSA4LjI2TDIxIDlMMTQuMDkgMTUuNzRMMTIgMjJMOS45MSAxNS43NEwzIDlMOS45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                  }}
                />
                <div>
                  <span className="font-bold text-xl text-gray-900">Zycronex</span>
                  <div className="text-sm text-gray-500">Next-Gen Web3 Platform</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-md mb-6">
                Experience the future of decentralized finance with our secure, 
                fast, and user-friendly Web3 wallet connector platform.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'Features', 'Security', 'Support'].map((link) => (
                  <li key={link}>
                    <Link
                      to={`#${link.toLowerCase()}`}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                {['Help Center', 'Documentation', 'Contact Us', 'FAQ'].map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-600">
              © 2025 ICX. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors">
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