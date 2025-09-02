// Telegram Web App Types
interface TelegramWebApp {
  ready(): void;
  expand(): void;
  close(): void;
  sendData(data: string): void;
  initDataUnsafe?: {
    user?: TelegramUser;
    [key: string]: any;
  };
  MainButton: {
    setText(text: string): void;
    onClick(callback: () => void): void;
    show(): void;
    hide(): void;
  };
  BackButton: {
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
  };
  HapticFeedback?: {
    impactOccurred(style: 'light' | 'medium' | 'heavy'): void;
    selectionChanged(): void;
    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
  };
  themeParams?: Record<string, string>;
  backgroundColor: string;
  textColor: string;
  colorScheme: 'light' | 'dark';
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  platform: string;
}

interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}



const getWebApp = (): TelegramWebApp | null => {
  try {
    return window.Telegram?.WebApp || null;
  } catch (error) {
    console.warn('Error accessing Telegram WebApp:', error);
    return null;
  }
};

// Initialize Telegram Web App with better error handling
const init = (): TelegramWebApp | null => {
  try {
    const tg = getWebApp();
    if (!tg) {
      console.log('Telegram WebApp not available');
      return null;
    }

    // Safe initialization
    if (typeof tg.ready === 'function') {
      tg.ready();
    }

    // Only expand if not already expanded and function exists
    if (typeof tg.expand === 'function' && !tg.isExpanded) {
      setTimeout(() => {
        try {
          tg.expand();
        } catch (expandError) {
          console.warn('Expand failed:', expandError);
        }
      }, 100);
    }

    console.log('Telegram WebApp initialized successfully');
    return tg;
  } catch (err) {
    console.error("Telegram WebApp initialization error:", err);
    return null;
  }
};

// Get current user info safely
const getUser = (): TelegramUser | null => {
  try {
    const tg = getWebApp();
    return tg?.initDataUnsafe?.user || null;
  } catch (error) {
    console.warn('Error getting user:', error);
    return null;
  }
};

// Set main button safely with validation
const setMainButton = (text: string, callback: () => void): void => {
  try {
    const tg = getWebApp();
    if (tg?.MainButton && typeof tg.MainButton.setText === 'function') {
      tg.MainButton.setText(text);
      if (typeof tg.MainButton.onClick === 'function') {
        tg.MainButton.onClick(callback);
      }
      if (typeof tg.MainButton.show === 'function') {
        tg.MainButton.show();
      }
    }
  } catch (error) {
    console.warn('Error setting main button:', error);
  }
};

// Hide main button safely
const hideMainButton = (): void => {
  try {
    const tg = getWebApp();
    if (tg?.MainButton && typeof tg.MainButton.hide === 'function') {
      tg.MainButton.hide();
    }
  } catch (error) {
    console.warn('Error hiding main button:', error);
  }
};

// Safe Haptic feedback with mobile optimization
const hapticFeedback = (style: 'light' | 'medium' | 'heavy' = 'light'): void => {
  try {
    const tg = getWebApp();
    if (tg?.HapticFeedback && typeof tg.HapticFeedback.impactOccurred === 'function') {
      // Use lighter haptic feedback for mobile performance
      tg.HapticFeedback.impactOccurred(style);
    }
  } catch (error) {
    console.warn("HapticFeedback error:", error);
  }
};

const notificationFeedback = (type: 'error' | 'success' | 'warning'): void => {
  try {
    const tg = getWebApp();
    if (tg?.HapticFeedback && typeof tg.HapticFeedback.notificationOccurred === 'function') {
      tg.HapticFeedback.notificationOccurred(type);
    }
  } catch (error) {
    console.warn("Notification feedback error:", error);
  }
};

const selectionFeedback = (): void => {
  try {
    const tg = getWebApp();
    if (tg?.HapticFeedback && typeof tg.HapticFeedback.selectionChanged === 'function') {
      tg.HapticFeedback.selectionChanged();
    }
  } catch (error) {
    console.warn("Selection feedback error:", error);
  }
};

// Get theme params safely
const getThemeParams = (): Record<string, string> | null => {
  try {
    const tg = getWebApp();
    return tg?.themeParams || null;
  } catch (error) {
    console.warn('Error getting theme params:', error);
    return null;
  }
};

// Apply Telegram theme with better error handling and mobile optimization
const applyTelegramTheme = (): void => {
  try {
    const themeParams = getThemeParams();
    if (!themeParams || !document?.documentElement) {
      console.log('Theme params or document not available');
      return;
    }

    const root = document.documentElement;
    
    // Apply theme variables safely
    Object.entries(themeParams).forEach(([key, value]) => {
      try {
        if (typeof value === 'string' && value.trim()) {
          root.style.setProperty(`--tg-${key.replace(/_/g, '-')}`, value);
        }
      } catch (styleError) {
        console.warn(`Error setting theme property ${key}:`, styleError);
      }
    });

    // Apply theme classes safely
    const colorScheme = getColorScheme();
    if (document.body) {
      document.body.classList.remove('tg-dark-theme', 'tg-light-theme');
      document.body.classList.add(`tg-${colorScheme}-theme`);
    }

    console.log('Telegram theme applied successfully');
  } catch (error) {
    console.warn('Theme application failed:', error);
  }
};

// Close web app safely
const close = (): void => {
  try {
    const tg = getWebApp();
    if (tg && typeof tg.close === 'function') {
      tg.close();
    }
  } catch (error) {
    console.warn('Error closing app:', error);
  }
};

// Send data back to bot safely
const sendData = (data: Record<string, any>): void => {
  try {
    const tg = getWebApp();
    if (tg && typeof tg.sendData === 'function') {
      const jsonData = JSON.stringify(data);
      tg.sendData(jsonData);
    }
  } catch (error) {
    console.warn('Error sending data:', error);
  }
};

// Check if running in Telegram
const isTelegramWebApp = (): boolean => {
  try {
    return !!getWebApp();
  } catch (error) {
    console.warn('Error checking Telegram environment:', error);
    return false;
  }
};

// Get viewport info safely
const getViewportInfo = () => {
  try {
    const tg = getWebApp();
    if (!tg) return null;
    
    return {
      height: tg.viewportHeight || window.innerHeight,
      stableHeight: tg.viewportStableHeight || window.innerHeight,
      isExpanded: tg.isExpanded || false
    };
  } catch (error) {
    console.warn('Error getting viewport info:', error);
    return {
      height: window.innerHeight,
      stableHeight: window.innerHeight,
      isExpanded: false
    };
  }
};

// Get platform info safely
const getPlatform = (): string => {
  try {
    const tg = getWebApp();
    return tg?.platform || 'unknown';
  } catch (error) {
    console.warn('Error getting platform:', error);
    return 'unknown';
  }
};

// Check if mobile platform
const isMobile = (): boolean => {
  try {
    const platform = getPlatform().toLowerCase();
    return ['android', 'ios'].includes(platform) || /mobile|android|ios/i.test(navigator.userAgent);
  } catch (error) {
    console.warn('Error checking mobile platform:', error);
    return false;
  }
};

// Get color scheme safely
const getColorScheme = (): 'light' | 'dark' => {
  try {
    const tg = getWebApp();
    return tg?.colorScheme || 'light';
  } catch (error) {
    console.warn('Error getting color scheme:', error);
    return 'light';
  }
};

// Wallet Support Checks
const isWalletSupported = (): boolean => {
  try {
    return true; // Simplified for better compatibility
  } catch (error) {
    console.warn('Error checking wallet support:', error);
    return true;
  }
};

const getRecommendedWallets = (): string[] => {
  try {
    if (!isTelegramWebApp()) return ['metamask', 'trust', 'tokenpocket'];
    const platform = getPlatform();
    if (platform === 'android') return ['trust', 'tokenpocket', 'metamask'];
    if (platform === 'ios') return ['trust', 'metamask', 'tokenpocket'];
    return ['metamask', 'trust', 'tokenpocket'];
  } catch (error) {
    console.warn('Error getting recommended wallets:', error);
    return ['metamask', 'trust'];
  }
};

const promptWalletInstallation = (walletName: string, downloadUrl?: string): void => {
  try {
    if (isTelegramWebApp()) {
      setMainButton(`Install ${walletName}`, () => {
        if (downloadUrl) {
          try {
            window.open(downloadUrl, '_blank');
          } catch (openError) {
            console.warn('Error opening URL:', openError);
          }
        }
      });
    } else {
      if (downloadUrl && confirm(`${walletName} not found. Install now?`)) {
        window.open(downloadUrl, '_blank');
      }
    }
  } catch (error) {
    console.warn('Error prompting wallet installation:', error);
  }
};

// Log wallet events safely
const logWalletEvent = (event: string, data?: Record<string, any>): void => {
  try {
    if (isTelegramWebApp()) {
      const user = getUser();
      const eventData = {
        type: 'wallet_event',
        event,
        data: data || {},
        user_id: user?.id || null,
        timestamp: new Date().toISOString(),
        platform: getPlatform()
      };
      
      // Only send if data is valid
      if (event && typeof event === 'string') {
        sendData(eventData);
      }
    }
  } catch (error) {
    console.warn('Error logging wallet event:', error);
  }
};

// UI Settings with mobile optimization
const getUISettings = () => {
  try {
    const viewport = getViewportInfo();
    const mobile = isMobile();
    return {
      maxHeight: viewport ? `${Math.min(viewport.height, window.innerHeight)}px` : '100vh',
      compactMode: mobile,
      showAdvancedOptions: !mobile
    };
  } catch (error) {
    console.warn('Error getting UI settings:', error);
    return {
      maxHeight: '100vh',
      compactMode: true,
      showAdvancedOptions: false
    };
  }
};

// Export all
const telegramUtils = {
  init,
  getUser,
  setMainButton,
  hideMainButton,
  close,
  sendData,
  isTelegramWebApp,
  hapticFeedback,
  notificationFeedback,
  selectionFeedback,
  getThemeParams,
  applyTelegramTheme,
  getViewportInfo,
  getPlatform,
  isMobile,
  getColorScheme,
  getUISettings,
  isWalletSupported,
  getRecommendedWallets,
  promptWalletInstallation,
  logWalletEvent
};

export default telegramUtils;
export type { TelegramUser, TelegramWebApp };