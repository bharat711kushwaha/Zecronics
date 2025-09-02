import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../hooks/useWallet'; 
import {
  Home,  Wallet, Users,   History, CreditCard,
  Settings, Shield, HelpCircle, Zap, DollarSign, Target, Award,
  Menu, X, Search, User, LogOut, ChevronDown, ChevronRight,
  Copy,  ArrowUpRight, PiggyBank, Trophy, Crown, 
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const CryptoDashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Real wallet integration
  const { 
    
    address, 
    balance, 
    formattedAddress, 
    isOnBNBChain, 
    connectedWallet, 
    disconnect,
    updateBalance
  } = useWallet();
  
  // States (removed notification related states)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['income']);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  
  // Refs (removed notificationRef)
  const sidebarRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Copy wallet address
  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside (removed notification handling)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  // Navigation items - Updated with correct paths
  const navigationItems = [
    {
      icon: <Home size={20} />,
      label: 'Dashboard',
      to: '/investment/dashboard',
      isActive: location.pathname === '/investment/dashboard'
    },
    {
      icon: <Wallet size={20} />,
      label: 'Game Home',
      to: '/',
      isActive: location.pathname === '/',
      badge: balance ? `${parseFloat(balance).toFixed(2)} BNB` : undefined
    },
    {
      icon: <Users size={20} />,
      label: 'Referrals',
      to: '/investment/referrals',
      isActive: location.pathname === '/investment/referrals',
      badge: '12'
    },
    {
      icon: <PiggyBank size={20} />,
      label: 'Income Reports',
      isExpanded: expandedItems.includes('income'),
      onToggle: () => toggleExpanded('income'),
      children: [
        { icon: <DollarSign size={18} />, label: 'Direct Income', to: '/investment/income/direct', isActive: location.pathname === '/investment/income/direct' },
        { icon: <Target size={18} />, label: 'Level Income', to: '/investment/income/level', isActive: location.pathname === '/investment/income/level' },
        { icon: <Award size={18} />, label: 'ROI Income', to: '/investment/income/roi', isActive: location.pathname === '/investment/income/roi' },
        { icon: <Trophy size={18} />, label: 'Bonus Income', to: '/investment/income/bonus', isActive: location.pathname === '/investment/income/bonus' },
        { icon: <Crown size={18} />, label: 'Total Income', to: '/investment/income/total', isActive: location.pathname === '/investment/income/total' }
      ]
    },
    {
      icon: <History size={20} />,
      label: 'Transactions',
      to: '/investment/transactions',
      isActive: location.pathname === '/investment/transactions'
    },
    {
      icon: <CreditCard size={20} />,
      label: 'Deposit',
      to: '/investment/deposit',
      isActive: location.pathname === '/investment/deposit'
    },
    {
      icon: <ArrowUpRight size={20} />,
      label: 'Withdraw',
      to: '/investment/withdraw',
      isActive: location.pathname === '/investment/withdraw'
    }
  ];

  // Calculate USD value
  const bnbPrice = 310.50;
  const balanceUSD = parseFloat(balance || '0') * bnbPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Copy notification */}
      <AnimatePresence>
        {showCopied && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-[100] font-medium"
          >
            Address copied to clipboard! ✓
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg border-b border-gray-200'
            : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
        }`}
      >
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Hamburger Menu */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isSidebarOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </motion.button>

              {/* Logo - Updated with logo.png */}
              <Link to="/investment/dashboard" className="flex items-center space-x-3 group">
                <div className="relative">
                  <img 
                    src="/logo.png" 
                    alt="ICX Logo" 
                    className="w-10 h-10 object-cover rounded-xl shadow-sm border border-gray-200 group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyNTYzRUIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTEyIDJMMTQuMDkgOC4yNkwyMSA5TDE0LjA5IDE1Ljc0TDEyIDIyTDkuOTEgMTUuNzRMMyA5TDkuOTEgOC4yNkwxMiAyWiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4KPC9zdmc+';
                    }}
                  />
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                    ICX
                  </span>
                  <div className="text-xs text-gray-500">Dashboard</div>
                </div>
              </Link>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search transactions, addresses..."
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm placeholder-gray-400"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              
              {/* Network Status */}
              <div className={`hidden lg:flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                isOnBNBChain 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  isOnBNBChain ? 'bg-green-500' : 'bg-amber-500'
                } animate-pulse`}></div>
                <span className="text-xs">{isOnBNBChain ? 'BNB Chain' : 'Wrong Network'}</span>
              </div>

              {/* Balance Display */}
              <div className="hidden lg:flex items-center space-x-3 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign size={14} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Balance</div>
                    <div className="font-semibold text-gray-900">{balance || '0'} BNB</div>
                  </div>
                </div>
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {connectedWallet?.charAt(0) || 'W'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {connectedWallet || 'Wallet'}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {formattedAddress}
                    </div>
                  </div>
                  <ChevronDown size={14} className="text-gray-500" />
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                    >
                      {/* Profile Header */}
                      <div className="p-4 bg-gray-50 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                            {connectedWallet?.charAt(0) || 'W'}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">
                              {connectedWallet || 'Connected Wallet'}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 font-mono">
                                {formattedAddress}
                              </span>
                              <button 
                                onClick={copyAddress}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Copy size={12} className="text-gray-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div className="bg-white p-2 rounded-lg border border-gray-100">
                            <div className="text-xs text-gray-500">Balance</div>
                            <div className="font-semibold text-gray-900 text-sm">
                              {balance || '0'} BNB
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-gray-100">
                            <div className="text-xs text-gray-500">USD Value</div>
                            <div className="font-semibold text-green-600 text-sm">
                              ${balanceUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link to="/investment/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                          <User size={16} />
                          <span className="text-sm">Profile Settings</span>
                        </Link>
                        <Link to="/investment/wallet" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                          <Wallet size={16} />
                          <span className="text-sm">Wallet Management</span>
                        </Link>
                        <Link to="/investment/security" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                          <Shield size={16} />
                          <span className="text-sm">Security</span>
                        </Link>
                        <Link to="/investment/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                          <Settings size={16} />
                          <span className="text-sm">Settings</span>
                        </Link>
                        <button 
                          onClick={updateBalance}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                        >
                          <Zap size={16} />
                          <span className="text-sm">Refresh Balance</span>
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="p-2 border-t border-gray-100">
                        <button 
                          onClick={() => {
                            disconnect();
                            setShowProfileDropdown(false);
                            navigate('/');
                          }}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                        >
                          <LogOut size={16} />
                          <span className="text-sm">Disconnect</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 shadow-2xl overflow-y-auto"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {connectedWallet?.charAt(0) || 'W'}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {connectedWallet || 'Connected Wallet'}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {formattedAddress}
                  </div>
                </div>
              </div>

              {/* Quick Balance */}
              <div className="mt-4 p-3 bg-white rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Total Balance</div>
                    <div className="font-bold text-lg text-gray-900">
                      {balance || '0'} BNB
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">USD Value</div>
                    <div className="font-semibold text-green-600">
                      ${balanceUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="p-4 space-y-2">
              <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-4 px-2">
                Main Menu
              </div>
              
              {navigationItems.map((item, index) => (
                <NavItem 
                  key={index} 
                  {...item} 
                  onClick={() => setIsSidebarOpen(false)}
                />
              ))}

              {/* Additional Menu Items */}
              <div className="pt-6">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-4 px-2">
                  Account
                </div>
                
                <NavItem
                  icon={<Settings size={20} />}
                  label="Settings"
                  to="/investment/settings"
                  isActive={location.pathname === '/investment/settings'}
                  onClick={() => setIsSidebarOpen(false)}
                />
                
                <NavItem
                  icon={<Shield size={20} />}
                  label="Security"
                  to="/investment/security"
                  isActive={location.pathname === '/investment/security'}
                  onClick={() => setIsSidebarOpen(false)}
                />
                
                <NavItem
                  icon={<HelpCircle size={20} />}
                  label="Help & Support"
                  to="/investment/support"
                  isActive={location.pathname === '/investment/support'}
                  onClick={() => setIsSidebarOpen(false)}
                />
              </div>

              {/* Logout Button */}
              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    disconnect();
                    setIsSidebarOpen(false);
                    navigate('/');
                  }}
                  className="w-full flex items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg mr-3 bg-red-100">
                    <LogOut size={18} />
                  </div>
                  <span className="font-medium">Disconnect Wallet</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="pt-16">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

// Navigation Item Component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  badge?: string | number;
  isActive?: boolean;
  onClick?: () => void;
  children?: NavItemProps[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  to, 
  badge, 
  isActive, 
  onClick, 
  children, 
  isExpanded, 
  onToggle 
}) => {
  const hasChildren = children && children.length > 0;

  return (
    <div className="mb-1">
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative ${hasChildren ? 'cursor-pointer' : ''}`}
      >
        {to ? (
          <Link
            to={to}
            onClick={onClick}
            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 transition-all duration-300 ${
              isActive 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 group-hover:bg-blue-100'
            }`}>
              {icon}
            </div>
            <span className="font-medium flex-1 text-sm">{label}</span>
            {badge && (
              <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full font-medium">
                {badge}
              </span>
            )}
          </Link>
        ) : (
          <div
            onClick={onToggle}
            className="flex items-center px-4 py-3 rounded-xl transition-all duration-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg mr-3 bg-gray-100 group-hover:bg-blue-100 transition-all duration-300">
              {icon}
            </div>
            <span className="font-medium flex-1 text-sm">{label}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={16} />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden ml-6 mt-2"
          >
            <div className="space-y-1 pl-4 border-l-2 border-gray-200">
              {children.map((child, index) => (
                <NavItem key={index} {...child} onClick={() => onClick?.()} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CryptoDashboardLayout;