
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';

const Navbar: React.FC = () => {
  const { isConnected, address, balance, disconnect, connectWallet, formattedAddress } = useWallet();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy address to clipboard
  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const handleConnect = () => {
    connectWallet();
  };

  // Navigate to home when logo is clicked
  const handleLogoClick = () => {
    navigate('/');
  };

  // Navigation menu items
  const menuItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Dashboard', path: '/dashboard', icon: '📊', requiresWallet: true },
    { name: 'Features', path: '/#features', icon: '✨' },
    { name: 'How it Works', path: '/#how-it-works', icon: '❓' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
         
          {/* Logo and Brand - Responsive with Click Navigation */}
            <div className="flex items-center min-w-0 flex-shrink-0">
              <div 
                className="flex items-center space-x-3 group cursor-pointer"
                onClick={handleLogoClick}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg animate-pulse">🚀</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 text-xl transition-all duration-300 group-hover:tracking-wide truncate">
                    Smart Wallet
                  </span>
                  <span className="ml-2 text-xs bg-gradient-to-r from-blue-600 to-purple-700 text-white px-2 py-0.5 rounded-full font-medium shadow-sm transform group-hover:scale-105 transition-transform duration-300">
                    Web3
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.requiresWallet && !isConnected) {
                      handleConnect();
                    } else {
                      navigate(item.path);
                    }
                  }}
                  disabled={item.requiresWallet && !isConnected}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    item.requiresWallet && !isConnected
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
            
            {/* Wallet Status / Connect Button - Mobile Optimized */}
            <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
              {isConnected ? (
                <>
                  {/* Desktop Wallet Info */}
                  <div className="hidden md:flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-4 py-2 border border-blue-200/50">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-gray-500">Balance</div>
                          <div className="font-semibold text-gray-900">{balance} BNB</div>
                        </div>
                        <div className="w-px h-8 bg-gray-300"></div>
                        <button 
                          onClick={copyAddress}
                          className="text-xs text-gray-600 hover:text-blue-600 transition-colors font-mono"
                        >
                          {formattedAddress} 📋
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={disconnect}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border border-red-200 rounded-lg text-red-600 text-sm transition-all duration-300 hover:shadow-md active:scale-95"
                    >
                      <span className="mr-2">🔓</span>
                      <span className="font-medium">Disconnect</span>
                    </button>
                  </div>
                  
                  {/* Copy Notification */}
                  {showCopied && (
                    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-60 animate-fade-in-out">
                      Address Copied! 📋
                    </div>
                  )}
                </>
              ) : (
                <button 
                  onClick={handleConnect}
                  className="relative overflow-hidden group flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg active:scale-95 text-sm min-h-[40px] focus:ring-2 focus:ring-blue-300"
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 flex justify-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full -mt-6 animate-ping-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <span className="mr-2 text-lg group-hover:animate-bounce">🔗</span>
                  <span className="hidden sm:inline">Connect Wallet</span>
                  <span className="sm:hidden">Connect</span>
                </button>
              )}
              
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="inline-flex items-center justify-center p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300 active:scale-95"
                  aria-label="Open menu"
                >
                  {menuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg animate-fade-in">
            <div className="px-4 pt-4 pb-6 space-y-4">
              {/* Mobile Navigation */}
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.requiresWallet && !isConnected) {
                        handleConnect();
                      } else {
                        navigate(item.path);
                      }
                      setMenuOpen(false);
                    }}
                    disabled={item.requiresWallet && !isConnected}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                      item.requiresWallet && !isConnected
                        ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    {item.requiresWallet && !isConnected && (
                      <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full ml-auto">
                        Requires Wallet
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Mobile wallet info when connected */}
              {isConnected && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Wallet Balance:</span>
                      <span className="font-semibold text-green-600">{balance} BNB</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">Address:</span>
                      <button 
                        onClick={copyAddress}
                        className="font-mono text-xs text-blue-600 hover:text-blue-800 transition-colors bg-white px-2 py-1 rounded border"
                      >
                        {formattedAddress} 📋
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        disconnect();
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-300"
                    >
                      <span>🔓</span>
                      <span>Disconnect Wallet</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Connect Button when not connected */}
              {!isConnected && (
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      handleConnect();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    <span>🔗</span>
                    <span>Connect Wallet</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      
      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes ping-slow {
          0% { transform: scale(0.2); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(-10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Mobile-specific improvements */
        @media (max-width: 640px) {
          .min-h-\\[40px\\] {
            min-height: 44px;
          }
        }

        /* Backdrop blur fallback */
        @supports not (backdrop-filter: blur(12px)) {
          .backdrop-blur-lg {
            background-color: rgba(255, 255, 255, 0.95);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;