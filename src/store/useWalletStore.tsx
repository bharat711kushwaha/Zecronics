// src/store/useWalletStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Wallet types (copied from your original code)
interface WalletInfo {
  name: string;
  key: string;
  icon: string;
  available: boolean;
  description: string;
  downloadUrl?: string;
}

// Define the state interface for the store
interface WalletState {
  // State properties
  isConnected: boolean;
  address: string | null;
  balance: string;
  chainId: string | null;
  connectedWallet: string | null;
  error: string | null;
  availableWallets: WalletInfo[];

  // Actions
  setIsConnected: (isConnected: boolean) => void;
  setAddress: (address: string | null) => void;
  setBalance: (balance: string) => void;
  setChainId: (chainId: string | null) => void;
  setConnectedWallet: (walletName: string | null) => void;
  setError: (error: string | null) => void;
  setAvailableWallets: (wallets: WalletInfo[]) => void;
  resetWalletState: () => void;
}

// Create the Zustand store with persistence
export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      // Initial state
      isConnected: false,
      address: null,
      balance: '0',
      chainId: null,
      connectedWallet: null,
      error: null,
      availableWallets: [],

      // Actions
      setIsConnected: (isConnected) => set({ isConnected }),
      setAddress: (address) => set({ address }),
      setBalance: (balance) => set({ balance }),
      setChainId: (chainId) => set({ chainId }),
      setConnectedWallet: (walletName) => set({ connectedWallet: walletName }),
      setError: (error) => set({ error }),
      setAvailableWallets: (wallets) => set({ availableWallets: wallets }),
      
      // Reset all wallet state (for disconnect)
      resetWalletState: () => set({
        isConnected: false,
        address: null,
        balance: '0',
        chainId: null,
        connectedWallet: null,
        error: null,
      }),
    }),
    {
      name: 'wallet-storage', // localStorage key name
      partialize: (state) => ({
        // Only persist these fields (exclude some if needed)
        isConnected: state.isConnected,
        address: state.address,
        balance: state.balance,
        chainId: state.chainId,
        connectedWallet: state.connectedWallet,
      }),
    }
  )
);