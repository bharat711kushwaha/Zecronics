
import React, { useState, useCallback, memo } from 'react';
import { useWallet } from '../hooks/useWallet';

// Performance optimized with React.memo
const WalletConnector: React.FC = memo(() => {
  const {
    isConnected,
    address,
    balance,
    formattedAddress,
    isOnBNBChain,
    connectedWallet,
    disconnect,
    connectWallet,
    updateBalance,
    error: walletError,
    availableWallets
  } = useWallet();

  // Minimize state variables
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletList, setShowWalletList] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // Group wallets by availability - memoize calculation
  const availableWalletsList = availableWallets.filter(w => w.available);
  const unavailableWalletsList = availableWallets.filter(w => !w.available);

  // Handle wallet connection with useCallback
  const handleConnect = useCallback(async (walletKey?: string) => {
    setIsConnecting(true);
    try {
      const result = await connectWallet(walletKey);
      if (result.success) {
        setShowWalletList(false);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  }, [connectWallet]);

  // Optimized copy address function
  const copyAddress = useCallback(async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy address:', error);
      }
    }
  }, [address]);

  // Simple function with no state updates
  const getNetworkStatus = useCallback(() => {
    if (!isConnected) return null;
    return isOnBNBChain ? 'BNB Smart Chain' : 'Wrong Network';
  }, [isConnected, isOnBNBChain]);

  // CONNECTED STATE - Mobile & Desktop Responsive
  if (isConnected) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
        {/* Responsive card with glassmorphism */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Header - Mobile optimized */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm border border-white/30">
                <span className="text-2xl">✅</span>
              </div>
              <h1 className="text-2xl font-bold">
                {connectedWallet || 'Wallet Connected'}
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <p className="text-green-100 text-sm">
                  {getNetworkStatus()}
                </p>
              </div>
            </div>
          </div>

          {/* Content - Mobile optimized spacing */}
          <div className="px-6 py-6 space-y-6">
            {/* Wallet Info Cards */}
            <div className="space-y-4">
              {/* Address Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/20 rounded-full -translate-y-10 translate-x-10"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 text-sm font-medium flex items-center">
                      <span className="mr-2">📧</span>
                      Wallet Address
                    </span>
                    <button 
                      onClick={copyAddress}
                      className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-100 transition-colors group"
                    >
                      <span className="group-hover:scale-110 transition-transform inline-block">📋</span>
                    </button>
                  </div>
                  <div className="font-mono text-sm text-gray-800 bg-white rounded-lg px-3 py-2 border border-blue-200/30 shadow-sm">
                    {formattedAddress}
                  </div>
                  
                  {/* Copy notification */}
                  {showCopied && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs shadow-lg z-10 animate-bounce">
                      Copied! ✓
                    </div>
                  )}
                </div>
              </div>
              
              {/* Balance Card */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/20 rounded-full -translate-y-12 translate-x-12"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 text-sm font-medium flex items-center">
                      <span className="mr-2">💰</span>
                      Balance
                    </span>
                    <button 
                      onClick={updateBalance}
                      className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-100 transition-colors group"
                    >
                      <span className="group-hover:rotate-180 transition-transform duration-500 inline-block">🔄</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">{balance}</span>
                      <span className="ml-2 text-lg text-gray-600">BNB</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">USD Value</div>
                      <div className="text-lg font-semibold text-green-600">
                        ${(parseFloat(balance || '0') * 310).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Network Status Card */}
              <div className={`rounded-2xl p-4 border relative overflow-hidden ${
                isOnBNBChain 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50' 
                  : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200/50'
              }`}>
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 ${
                  isOnBNBChain ? 'bg-green-200/20' : 'bg-red-200/20'
                }`}></div>
                
                <div className="relative">
                  <span className="text-gray-600 text-sm font-medium flex items-center mb-3">
                    <span className="mr-2">🌐</span>
                    Network Status
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      isOnBNBChain ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`}></div>
                    <span className={`font-semibold ${
                      isOnBNBChain ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {getNetworkStatus()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={updateBalance}
                className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-xl group-hover:rotate-180 transition-transform duration-500">🔄</span>
                  <span className="text-sm">Refresh</span>
                </div>
              </button>
              
              <button
                onClick={copyAddress}
                className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-xl group-hover:scale-110 transition-transform">📋</span>
                  <span className="text-sm">Copy</span>
                </div>
              </button>
            </div>

            {/* Disconnect Button */}
            <button
              onClick={disconnect}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-lg">🔓</span>
                <span>Disconnect Wallet</span>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200/50">
            <div className="text-center text-sm text-gray-500">
              <span className="inline-flex items-center space-x-2">
                <span>🔐</span>
                <span>Secure</span>
                <span>•</span>
                <span>⚡</span>
                <span>Fast</span>
                <span>•</span>
                <span>💎</span>
                <span>Premium</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // NOT CONNECTED STATE - Mobile & Desktop Responsive
  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
      {/* Responsive card with glassmorphism */}
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        {/* Header - Mobile optimized with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm border border-white/30">
              <span className="text-2xl">💼</span>
            </div>
            <h1 className="text-2xl font-bold">
              Connect Your Wallet
            </h1>
            <p className="text-blue-100 text-sm mt-2 px-4">
              Choose your preferred wallet to access the Web3 ecosystem
            </p>
          </div>
        </div>

        {/* Content - Mobile optimized */}
        <div className="px-6 py-6 space-y-6">
          {/* Error Display - Mobile friendly */}
          {walletError && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <span className="text-red-500 text-xl mt-0.5 flex-shrink-0">⚠️</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-red-800 text-sm">Connection Error</div>
                  <div className="text-red-700 text-sm mt-1 break-words">{walletError}</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Connect Button - Mobile optimized */}
          {!showWalletList && (
            <div className="space-y-4">
              <button
                onClick={() => handleConnect()}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isConnecting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-xl">🔗</span>
                    <span>Quick Connect</span>
                  </div>
                )}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setShowWalletList(true)}
                  className="text-sm text-gray-500 hover:text-gray-700 underline py-2 transition-colors"
                >
                  Or choose from available wallets
                </button>
              </div>
            </div>
          )}

          {/* Wallet Selection List - Mobile optimized */}
          {showWalletList && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg text-gray-900">Available Wallets</h3>
                <button
                  onClick={() => setShowWalletList(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-gray-400 hover:text-gray-600 text-xl">✕</span>
                </button>
              </div>
              
              {/* Available Wallets */}
              <div className="space-y-3">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Available</h4>
                <div className="space-y-3">
                  {availableWalletsList.map((wallet) => (
                    <button
                      key={wallet.key}
                      onClick={() => handleConnect(wallet.key)}
                      disabled={isConnecting}
                      className="w-full p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-left group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          {wallet.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {wallet.name}
                            </span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                              Available
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2">{wallet.description}</p>
                        </div>
                        <span className="text-gray-400 group-hover:text-blue-600 text-lg transition-colors">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Unavailable Wallets */}
              {unavailableWalletsList.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Not Installed</h4>
                  <div className="space-y-3">
                    {unavailableWalletsList.map((wallet) => (
                      <button
                        key={wallet.key}
                        onClick={() => window.open(wallet.downloadUrl, '_blank')}
                        className="w-full p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 text-left group opacity-60 hover:opacity-80"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center grayscale">
                            {wallet.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-gray-600">
                                {wallet.name}
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                                Install
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2">{wallet.description}</p>
                          </div>
                          <span className="text-gray-400 text-lg">↗</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Instructions - Mobile optimized */}
          {!showWalletList && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl mt-0.5 flex-shrink-0">💡</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-blue-900 text-sm mb-2">Getting Started:</div>
                  <ul className="text-blue-800 text-sm space-y-1.5">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Install a compatible Web3 wallet</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Connect to BNB Smart Chain</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Keep your seed phrase secure</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200/50">
          <div className="text-center text-sm text-gray-500">
            <span className="inline-flex items-center space-x-2">
              <span>🔐</span>
              <span>Secure</span>
              <span>•</span>
              <span>⚡</span>
              <span>Fast</span>
              <span>•</span>
              <span>🌐</span>
              <span>Multi-Chain</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Supported wallets - Mobile friendly */}
      <div className="mt-6 text-center">
        <h4 className="text-gray-500 text-sm mb-3">Supported Wallets</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {availableWallets.slice(0, 6).map((wallet) => (
            <div 
              key={wallet.key}
              className={`bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-200/50 flex items-center space-x-2 ${
                !wallet.available && 'grayscale opacity-50'
              }`}
            >
              <span className="text-lg">{wallet.icon}</span>
              <span className="text-xs text-gray-600 hidden sm:inline">{wallet.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

WalletConnector.displayName = 'WalletConnector';

export default WalletConnector;