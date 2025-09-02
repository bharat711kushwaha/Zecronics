
import { useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWalletStore } from '../store/useWalletStore';

// Type definitions
interface UseWalletReturn {
  isConnected: boolean;
  address: string | null;
  balance: string;
  formattedAddress: string;
  isOnBNBChain: boolean;
  connectedWallet: string | null;
  disconnect: () => void;
  connectWallet: (walletType?: string) => Promise<{success: boolean; hash?: string; error?: string}>;
  sendBNB: (recipient: string, amount: string) => Promise<{success: boolean; hash?: string; error?: string}>;
  addToken: (address: string, symbol: string, decimals: number) => Promise<boolean>;
  getTokenBalance: (tokenAddress: string, abi: string[]) => Promise<string>;
  getTransactionHistory: (limit: number) => Promise<any[]>;
  updateBalance: () => void;
  error: string | null;
  availableWallets: WalletInfo[];
  recentTransactions: () => void;
  chainId: string | null;
}

// Define ethers TransactionResponse type for properly typing blocks
interface EthersTransaction {
  hash: string;
  from: string;
  to: string | null;
  value: ethers.BigNumberish;
  blockNumber: number | bigint;
}

interface EthereumProvider {
  isTokenPocket?: boolean;
  isMetaMask?: boolean;
  isSafePal?: boolean;
  isTrust?: boolean;
  isCoinbaseWallet?: boolean;
  isWalletConnect?: boolean;
  isBinance?: boolean;
  isOkxWallet?: boolean;
  request: (args: {method: string; params?: any}) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  removeListener: (event: string, handler: (...args: any[]) => void) => void;
  selectedAddress?: string;
  chainId?: string;
  isConnected?: () => boolean;
}

interface WalletInfo {
  name: string;
  key: string;
  icon: string;
  available: boolean;
  description: string;
  downloadUrl?: string;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    trustWallet?: EthereumProvider;
    BinanceChain?: EthereumProvider;
    okxwallet?: EthereumProvider;
  }
}

// BNB Chain constants
const BNB_CHAIN_IDS = {
  MAINNET: {
    HEX: '0x38',
    DECIMAL: '56'
  },
  TESTNET: {
    HEX: '0x61',
    DECIMAL: '97'
  }
};

// Helper function to normalize chain IDs
const normalizeChainId = (chainId: string | number | undefined | null): string | null => {
  if (chainId === undefined || chainId === null) return null;
  
  // Convert to string
  let chainIdStr = String(chainId).toLowerCase();
  
  // If it's a decimal number without 0x prefix, convert to hex
  if (/^\d+$/.test(chainIdStr)) {
    chainIdStr = '0x' + Number(chainIdStr).toString(16);
  }
  
  return chainIdStr;
};

// Check if a chainId is BNB Chain
const isBNBChain = (chainId: string | number | undefined | null): boolean => {
  const normalizedChainId = normalizeChainId(chainId);
  if (!normalizedChainId) return false;
  
  return normalizedChainId === BNB_CHAIN_IDS.MAINNET.HEX || 
         normalizedChainId === BNB_CHAIN_IDS.TESTNET.HEX || 
         normalizedChainId === normalizeChainId(BNB_CHAIN_IDS.MAINNET.DECIMAL) || 
         normalizedChainId === normalizeChainId(BNB_CHAIN_IDS.TESTNET.DECIMAL);
};

// Improved wallet detection function
const detectConnectedWalletType = (provider: EthereumProvider): string => {
  // TokenPocket has highest priority as it also injects isMetaMask
  if (provider.isTokenPocket) {
    console.log('🔍 Detected wallet: TokenPocket');
    return 'TokenPocket';
  }
  
  // Trust Wallet detection
  if (provider.isTrust || window.trustWallet) {
    console.log('🔍 Detected wallet: Trust Wallet');
    return 'Trust Wallet';
  }
  
  // SafePal detection
  if (provider.isSafePal) {
    console.log('🔍 Detected wallet: SafePal');
    return 'SafePal';
  }
  
  // Binance Chain Wallet detection
  if (provider.isBinance || window.BinanceChain) {
    console.log('🔍 Detected wallet: Binance Wallet');
    return 'Binance Wallet';
  }
  
  // OKX Wallet detection
  if (provider.isOkxWallet || window.okxwallet) {
    console.log('🔍 Detected wallet: OKX Wallet');
    return 'OKX Wallet';
  }
  
  // Coinbase Wallet detection
  if (provider.isCoinbaseWallet) {
    console.log('🔍 Detected wallet: Coinbase Wallet');
    return 'Coinbase Wallet';
  }
  
  // MetaMask should be checked last as many wallets inject isMetaMask
  if (provider.isMetaMask) {
    // Additional check to see if it's really MetaMask or another wallet
    if (window.ethereum?.isTokenPocket || window.ethereum?.isTrust || 
        window.ethereum?.isSafePal || window.ethereum?.isBinance) {
      console.log('🔍 Detected wallet: Web3 Wallet (with MetaMask compatibility)');
      return 'Web3 Wallet';
    }
    console.log('🔍 Detected wallet: MetaMask');
    return 'MetaMask';
  }
  
  // Fallback for unknown wallets
  console.log('🔍 Detected wallet: Unknown Wallet');
  return 'Unknown Wallet';
};

// Updated detectWallets function with better detection
const detectWallets = (): WalletInfo[] => {
  const wallets: WalletInfo[] = [];
  
  // TokenPocket - check first as it's most specific
  wallets.push({
    name: 'TokenPocket',
    key: 'tokenpocket',
    icon: '🟢',
    available: !!(window.ethereum?.isTokenPocket),
    description: 'Multi-chain crypto wallet',
    downloadUrl: 'https://tokenpocket.pro/en/download/app'
  });

  // Trust Wallet
  wallets.push({
    name: 'Trust Wallet',
    key: 'trust',
    icon: '🛡️',
    available: !!(window.ethereum?.isTrust || window.trustWallet),
    description: 'Secure cryptocurrency wallet',
    downloadUrl: 'https://trustwallet.com/download'
  });

  // SafePal
  wallets.push({
    name: 'SafePal',
    key: 'safepal',
    icon: '🔒',
    available: !!(window.ethereum?.isSafePal),
    description: 'Hardware and software wallet',
    downloadUrl: 'https://safepal.io/download'
  });

  // Binance Chain Wallet
  wallets.push({
    name: 'Binance Wallet',
    key: 'binance',
    icon: '🟡',
    available: !!(window.BinanceChain || window.ethereum?.isBinance),
    description: 'Official Binance wallet',
    downloadUrl: 'https://www.bnbchain.org/en/wallets'
  });

  // OKX Wallet
  wallets.push({
    name: 'OKX Wallet',
    key: 'okx',
    icon: '⚫',
    available: !!(window.okxwallet || window.ethereum?.isOkxWallet),
    description: 'Multi-chain Web3 wallet',
    downloadUrl: 'https://www.okx.com/web3'
  });

  // Coinbase Wallet
  wallets.push({
    name: 'Coinbase Wallet',
    key: 'coinbase',
    icon: '🔵',
    available: !!(window.ethereum?.isCoinbaseWallet),
    description: 'Self-custody crypto wallet',
    downloadUrl: 'https://www.coinbase.com/wallet/downloads'
  });

  // MetaMask - check after other wallets as many inject isMetaMask
  wallets.push({
    name: 'MetaMask',
    key: 'metamask',
    icon: '🦊',
    available: !!(window.ethereum?.isMetaMask && 
                  !window.ethereum?.isTokenPocket && 
                  !window.ethereum?.isTrust && 
                  !window.ethereum?.isSafePal && 
                  !window.ethereum?.isBinance),
    description: 'Popular Ethereum wallet',
    downloadUrl: 'https://metamask.io/download/'
  });

  // Generic Web3 Browser - only if no specific wallet detected
  const hasSpecificWallet = wallets.some(w => w.available);
  if (window.ethereum && !hasSpecificWallet) {
    wallets.push({
      name: 'Web3 Browser',
      key: 'web3',
      icon: '🌐',
      available: true,
      description: 'Generic Web3 provider'
    });
  }

  return wallets;
};

// Updated getProvider function to be more specific
const getProvider = (walletType?: string): EthereumProvider | null => {
  if (!walletType || walletType === 'auto') {
    return window.ethereum || null;
  }

  switch (walletType) {
    case 'tokenpocket':
      // TokenPocket specific check
      if (window.ethereum?.isTokenPocket) {
        console.log('🔗 Using TokenPocket provider');
        return window.ethereum;
      }
      return null;
      
    case 'trust':
      // Trust Wallet specific check
      if (window.trustWallet) {
        console.log('🔗 Using Trust Wallet provider');
        return window.trustWallet;
      } else if (window.ethereum?.isTrust) {
        console.log('🔗 Using Trust Wallet via ethereum provider');
        return window.ethereum;
      }
      return null;
      
    case 'safepal':
      if (window.ethereum?.isSafePal) {
        console.log('🔗 Using SafePal provider');
        return window.ethereum;
      }
      return null;
      
    case 'binance':
      if (window.BinanceChain) {
        console.log('🔗 Using Binance Chain provider');
        return window.BinanceChain;
      } else if (window.ethereum?.isBinance) {
        console.log('🔗 Using Binance via ethereum provider');
        return window.ethereum;
      }
      return null;
      
    case 'okx':
      if (window.okxwallet) {
        console.log('🔗 Using OKX Wallet provider');
        return window.okxwallet;
      } else if (window.ethereum?.isOkxWallet) {
        console.log('🔗 Using OKX via ethereum provider');
        return window.ethereum;
      }
      return null;
      
    case 'coinbase':
      if (window.ethereum?.isCoinbaseWallet) {
        console.log('🔗 Using Coinbase Wallet provider');
        return window.ethereum;
      }
      return null;
      
    case 'metamask':
      // Only use MetaMask if it's actually MetaMask
      if (window.ethereum?.isMetaMask && 
          !window.ethereum?.isTokenPocket && 
          !window.ethereum?.isTrust && 
          !window.ethereum?.isSafePal) {
        console.log('🔗 Using MetaMask provider');
        return window.ethereum;
      }
      return null;
      
    default:
      return window.ethereum || null;
  }
};

export const useWallet = (): UseWalletReturn => {
  // Use Zustand store instead of React state
  const {
    isConnected,
    address,
    balance,
    chainId,
    connectedWallet,
    error,
    availableWallets,
    
    // Actions
    setIsConnected,
    setAddress,
    setBalance,
    setChainId,
    setConnectedWallet,
    setError,
    setAvailableWallets,
    resetWalletState
  } = useWalletStore();

  // BNB Chain detection using the isBNBChain helper
  const isOnBNBChain = isBNBChain(chainId);

  // Format address for display
  const formattedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  // Detect available wallets on mount
  useEffect(() => {
    const wallets = detectWallets();
    setAvailableWallets(wallets);
    checkExistingConnection();
    setupEventListeners();
    
    return () => {
      removeEventListeners();
    };
  }, []);

  const checkExistingConnection = async () => {
    const provider = getProvider();
    if (!provider) return;

    try {
      const accounts = await provider.request({ method: 'eth_accounts' });
      const currentChainId = await provider.request({ method: 'eth_chainId' });
      
      // Better logging for debugging
      console.log('🔍 checkExistingConnection - Current chain ID (raw):', currentChainId);
      console.log('🔍 checkExistingConnection - Normalized chain ID:', normalizeChainId(currentChainId));
      console.log('🔍 checkExistingConnection - Is BNB Chain?', isBNBChain(currentChainId));
      
      if (accounts.length > 0) {
        setIsConnected(true);
        setAddress(accounts[0]);
        setChainId(currentChainId);
        
        // Detect which wallet is connected
        const walletType = detectConnectedWalletType(provider);
        setConnectedWallet(walletType);
        
        await updateBalanceInternal(accounts[0]);
      }
      
      setChainId(currentChainId);
    } catch (err) {
      console.error('Failed to check connection:', err);
      setError('Failed to check wallet connection');
    }
  };

  const setupEventListeners = () => {
    const provider = getProvider();
    if (!provider) return;

    provider.on('accountsChanged', handleAccountsChanged);
    provider.on('chainChanged', handleChainChanged);
    provider.on('disconnect', handleDisconnect);
  };

  const removeEventListeners = () => {
    const provider = getProvider();
    if (!provider) return;

    provider.removeListener('accountsChanged', handleAccountsChanged);
    provider.removeListener('chainChanged', handleChainChanged);
    provider.removeListener('disconnect', handleDisconnect);
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnect();
    } else {
      setAddress(accounts[0]);
      updateBalanceInternal(accounts[0]);
    }
  };

  const handleChainChanged = (newChainId: string) => {
    // Better logging for debugging
    console.log('🔍 handleChainChanged - Chain changed to (raw):', newChainId);
    console.log('🔍 handleChainChanged - Normalized chain ID:', normalizeChainId(newChainId));
    console.log('🔍 handleChainChanged - Is BNB Chain?', isBNBChain(newChainId));
    
    setChainId(newChainId);
    
    // Force a re-check of the wallet status
    updateBalance();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const updateBalanceInternal = async (walletAddress: string) => {
    const provider = getProvider();
    if (!provider) return;

    try {
      // Also refresh chain ID when updating balance
      const currentChainId = await provider.request({ method: 'eth_chainId' });
      setChainId(currentChainId);
      
      console.log('🔍 updateBalanceInternal - Current chain ID:', currentChainId);
      console.log('🔍 updateBalanceInternal - Is BNB Chain?', isBNBChain(currentChainId));

      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const balance = await ethersProvider.getBalance(walletAddress);
      const balanceInBNB = ethers.formatEther(balance);
      setBalance(parseFloat(balanceInBNB).toFixed(4));
    } catch (err) {
      console.error('Failed to get balance:', err);
    }
  };

  const updateBalance = useCallback(() => {
    if (address) {
      updateBalanceInternal(address);
    }
  }, [address]);
  
  // Added this function to match the interface
  const recentTransactions = useCallback(() => {
    if (address) {
      getTransactionHistory(15).then(txs => {
        // Using the transactions directly without saving them to state
        console.log("Recent transactions:", txs);
      });
    }
  }, [address]);

  const disconnect = useCallback(() => {
    // Use resetWalletState from Zustand store
    resetWalletState();
  }, [resetWalletState]);

  // Updated connectWallet function with improved detection
  const connectWallet = useCallback(async (walletType?: string) => {
    try {
      setError(null);
      
      console.log('🔍 Attempting to connect wallet:', walletType || 'auto');
      
      const provider = getProvider(walletType);
      if (!provider) {
        const errorMsg = walletType 
          ? `${walletType} wallet not found! Please install the wallet extension.`
          : 'No wallet detected! Please install a Web3 wallet.';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      // Log provider properties for debugging
      console.log('🔍 Provider properties:', {
        isMetaMask: provider.isMetaMask,
        isTokenPocket: provider.isTokenPocket,
        isTrust: provider.isTrust,
        isSafePal: provider.isSafePal,
        isBinance: provider.isBinance,
        isOkxWallet: provider.isOkxWallet,
        isCoinbaseWallet: provider.isCoinbaseWallet
      });

      // Request account access
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Get current chain ID first
      const currentChainId = await provider.request({ method: 'eth_chainId' });
      console.log('🔍 connectWallet - Current chain ID before switch:', currentChainId);
      console.log('🔍 connectWallet - Is BNB Chain?', isBNBChain(currentChainId));
      
      setChainId(currentChainId);
      
      // Detect and set connected wallet
      const walletName = detectConnectedWalletType(provider);
      console.log('✅ Connected wallet detected as:', walletName);
      
      // Update connection state immediately to avoid flicker
      setIsConnected(true);
      setAddress(accounts[0]);
      setConnectedWallet(walletName);

      // Get balance
      await updateBalanceInternal(accounts[0]);

      // Try to switch to BNB Chain if needed, but don't block the connection
      if (!isBNBChain(currentChainId)) {
        try {
          await ensureBNBChain(provider);
          // Update chain ID after switch
          const newChainId = await provider.request({ method: 'eth_chainId' });
          console.log('🔍 connectWallet - New chain ID after switch:', newChainId);
          console.log('🔍 connectWallet - Is BNB Chain now?', isBNBChain(newChainId));
          setChainId(newChainId);
        } catch (switchError) {
          console.error('Failed to switch chain, but continuing with connection', switchError);
          // Don't throw an error here, let the connection proceed
        }
      }

      console.log('✅ Wallet connected successfully!');
      return { success: true };
      
    } catch (error: any) {
      const errorMessage = error.message || 'Connection failed';
      console.error('Wallet connection failed:', error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  const ensureBNBChain = async (provider: EthereumProvider) => {
    try {
      // First try switching to mainnet
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BNB_CHAIN_IDS.MAINNET.HEX }],
      });
      console.log('Successfully switched to BNB Chain Mainnet');
    } catch (switchError: any) {
      console.log('Failed to switch to BNB Chain Mainnet, error code:', switchError.code);
      
      // If the chain is not added, add it
      if (switchError.code === 4902) {
        try {
          console.log('Adding BNB Chain to wallet...');
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: BNB_CHAIN_IDS.MAINNET.HEX,
              chainName: 'BNB Smart Chain',
              nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
              rpcUrls: ['https://bsc-dataseed1.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
            }],
          });
          console.log('BNB Chain added successfully');
        } catch (addError) {
          console.error('Failed to add BNB Chain:', addError);
          
          // Try adding testnet as a fallback
          try {
            console.log('Trying to add BNB Chain Testnet instead...');
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: BNB_CHAIN_IDS.TESTNET.HEX,
                chainName: 'BNB Smart Chain Testnet',
                nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                blockExplorerUrls: ['https://testnet.bscscan.com/'],
              }],
            });
            console.log('BNB Chain Testnet added successfully');
          } catch (testnetError) {
            console.error('Failed to add BNB Chain Testnet:', testnetError);
            throw testnetError;
          }
        }
      } else {
        console.error('Failed to switch to BNB Chain:', switchError);
        throw switchError;
      }
    }
  };

  const sendBNB = useCallback(async (recipient: string, amount: string) => {
    const provider = getProvider();
    if (!provider || !address) {
      return { success: false, error: 'Wallet not connected' };
    }

    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const signer = await ethersProvider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount)
      });

      await tx.wait();
      return { success: true, hash: tx.hash };
    } catch (err: any) {
      console.error('Transaction failed:', err);
      return { success: false, error: err.message || 'Transaction failed' };
    }
  }, [address]);

  const addToken = useCallback(async (tokenAddress: string, symbol: string, decimals: number) => {
    const provider = getProvider();
    if (!provider) return false;

    try {
      // Fixed params structure for wallet_watchAsset
      const wasAdded = await provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: symbol,
            decimals: decimals
          }
        }
      });
      return !!wasAdded;
    } catch (err) {
      console.error('Failed to add token:', err);
      return false;
    }
  }, []);

  const getTokenBalance = useCallback(async (tokenAddress: string, abi: string[]) => {
    const provider = getProvider();
    if (!provider || !address) return '0';

    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const contract = new ethers.Contract(tokenAddress, abi, ethersProvider);
      
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      
      return ethers.formatUnits(balance, decimals);
    } catch (err) {
      console.error('Failed to get token balance:', err);
      return '0';
    }
  }, [address]);

  const getTransactionHistory = useCallback(async (limit: number) => {
    const provider = getProvider();
    if (!provider || !address) return [];

    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const currentBlock = await ethersProvider.getBlockNumber();
      
      const transactions = [];
      const blocksToCheck = Math.min(100, currentBlock);
      
      for (let i = 0; i < blocksToCheck && transactions.length < limit; i++) {
        try {
          const block = await ethersProvider.getBlock(currentBlock - i, true);
          if (block && block.transactions) {
            // Properly type the transactions from the block
            for (const txData of block.transactions) {
              // Skip if not a valid transaction object
              if (!txData || typeof txData !== 'object') continue;
              
              // Cast the transaction to the proper type
              const tx = txData as unknown as EthersTransaction;
              
              // Check if this transaction involves the current address
              if (
                (tx.from && tx.from.toLowerCase() === address.toLowerCase()) ||
                (tx.to && tx.to.toLowerCase() === address.toLowerCase())
              ) {
                transactions.push({
                  hash: tx.hash,
                  from: tx.from,
                  to: tx.to,
                  value: ethers.formatEther(tx.value || '0'),
                  blockNumber: Number(tx.blockNumber) || 0,
                  timestamp: block.timestamp ? Number(block.timestamp) : undefined
                });
                
                if (transactions.length >= limit) break;
              }
            }
          }
        } catch (blockErr) {
          console.error(`Failed to get block ${currentBlock - i}:`, blockErr);
        }
      }
      
      return transactions;
    } catch (err) {
      console.error('Failed to get transaction history:', err);
      return [];
    }
  }, [address]);

  return {
    isConnected,
    address,
    balance,
    formattedAddress,
    isOnBNBChain,
    connectedWallet,
    disconnect,
    connectWallet,
    sendBNB,
    addToken,
    getTokenBalance,
    getTransactionHistory,
    updateBalance,
    error,
    availableWallets,
    recentTransactions,
    chainId
  };
};