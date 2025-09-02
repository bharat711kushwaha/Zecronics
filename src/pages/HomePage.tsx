import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../hooks/useWallet';
import HomeLayout from '../components/HomeLayout';  
import HeroSection from '../components/HeroSection'; 
import { 
  AlertTriangle, Shield, Zap, Globe, DollarSign, 
  Smartphone, Wallet, TrendingUp, 
   Lock, RefreshCw, ArrowRight, ExternalLink,
   ChevronDown
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { 
    isConnected, 
    isOnBNBChain, 
    connectWallet, 
    formattedAddress, 
    connectedWallet,
    balance 
  } = useWallet();
  const navigate = useNavigate();
  const [showNetworkWarning, setShowNetworkWarning] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleOpenDashboard = () => {
    if (isConnected && isOnBNBChain) {
      navigate('/dashboard');
    } else if (isConnected && !isOnBNBChain) {
      setShowNetworkWarning(true);
      setTimeout(() => setShowNetworkWarning(false), 4000);
    }
  };

  return (
    <HomeLayout>
      {/* Network Warning */}
      <NetworkWarning 
        show={showNetworkWarning} 
        onClose={() => setShowNetworkWarning(false)} 
      />

      {/* Hero Section */}
      <HeroSection 
        isConnected={isConnected}
        isOnBNBChain={isOnBNBChain}
        onConnect={handleConnect}
        onOpenDashboard={handleOpenDashboard}
        formattedAddress={formattedAddress}
        connectedWallet={connectedWallet}
        balance={balance}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Supported Wallets Section */}
      <SupportedWalletsSection />

      {/* Security Section */}
      <SecuritySection />

      {/* FAQ Section */}
      <FAQSection openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />

      {/* CTA Section */}
      <CTASection 
        isConnected={isConnected} 
        onConnect={handleConnect}
        onOpenDashboard={handleOpenDashboard}
        isOnBNBChain={isOnBNBChain}
      />
    </HomeLayout>
  );
};

// Network Warning Component
const NetworkWarning: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-20 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:w-96 z-50"
      >
        <div className="bg-amber-500 text-white p-4 rounded-lg shadow-lg border border-amber-400">
          <div className="flex items-start space-x-3">
            <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">Wrong Network!</h3>
              <p className="text-sm text-amber-50">
                Please switch to BNB Smart Chain to access the dashboard.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="flex-shrink-0 text-white hover:text-amber-200 text-lg leading-none p-1"
            >
              ×
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Features Section
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your private keys remain secure with advanced encryption and never leave your device.',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience instant transactions with minimal fees on the BNB Smart Chain network.',
      color: 'yellow'
    },
    {
      icon: Globe,
      title: 'Multi-Wallet Support',
      description: 'Connect with MetaMask, Trust Wallet, TokenPocket, and 15+ other popular wallets.',
      color: 'green'
    },
    {
      icon: DollarSign,
      title: 'Low Fees',
      description: 'Enjoy the lowest transaction fees in the crypto space with BNB Smart Chain.',
      color: 'indigo'
    },
    {
      icon: RefreshCw,
      title: 'Easy Swaps',
      description: 'Swap tokens instantly with our integrated DEX aggregator for best prices.',
      color: 'purple'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Fully responsive design works perfectly on all devices and screen sizes.',
      color: 'pink'
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of decentralized finance with our cutting-edge features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center text-${feature.color}-600 mb-6`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Install Wallet',
      description: 'Download and install a compatible Web3 wallet like MetaMask or Trust Wallet.',
      icon: Smartphone
    },
    {
      step: '02',
      title: 'Connect Wallet',
      description: 'Click "Connect Wallet" and choose your preferred wallet from the list.',
      icon: Wallet
    },
    {
      step: '03',
      title: 'Switch Network',
      description: 'Ensure you\'re connected to BNB Smart Chain for optimal experience.',
      icon: Globe
    },
    {
      step: '04',
      title: 'Start Trading',
      description: 'Access your dashboard and start trading, swapping, and managing your crypto.',
      icon: TrendingUp
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in just 4 simple steps and join the DeFi revolution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative text-center"
            >
              {/* Connector Line - Desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div>
              )}
              
              <div className="relative bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 z-10 border border-gray-100">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 shadow-lg">
                  {step.step}
                </div>
                <div className="mb-4">
                  <step.icon size={32} className="text-gray-400 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Supported Wallets Section
const SupportedWalletsSection: React.FC = () => {
  const wallets = [
    { name: 'MetaMask', icon: '🦊', users: '30M+' },
    { name: 'Trust Wallet', icon: '🛡️', users: '60M+' },
    { name: 'TokenPocket', icon: '💰', users: '20M+' },
    { name: 'SafePal', icon: '🔐', users: '10M+' },
    { name: 'Binance Chain', icon: '🟡', users: '15M+' },
    { name: 'WalletConnect', icon: '🔗', users: '40M+' },
    { name: 'Coinbase Wallet', icon: '🔵', users: '35M+' },
    { name: 'OKX Wallet', icon: '⚫', users: '25M+' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Supported Wallets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with the most popular and secure wallets in the crypto ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wallets.map((wallet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto">
                {wallet.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{wallet.name}</h3>
              <p className="text-sm text-gray-500">{wallet.users} users</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Security Section
const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Security First Approach
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Your security is our top priority. We use industry-leading practices to keep your assets safe.
            </p>
            
            <div className="space-y-6">
              {[
                { 
                  icon: Lock, 
                  title: 'Non-Custodial', 
                  desc: 'You maintain full control of your private keys and funds.'
                },
                { 
                  icon: Shield, 
                  title: 'Open Source', 
                  desc: 'Transparent, audited code that you can verify yourself.'
                },
                { 
                  icon: RefreshCw, 
                  title: 'Multi-Layer Security', 
                  desc: 'Advanced encryption and security protocols protect your data.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🛡️</div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Trusted by 100K+ Users</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Join thousands of users who trust our platform for their Web3 needs.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-2xl sm:text-3xl font-bold">$2M+</div>
                    <div className="text-blue-200 text-sm">Secured Volume</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-2xl sm:text-3xl font-bold">0</div>
                    <div className="text-blue-200 text-sm">Security Breaches</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection: React.FC<{
  openFAQ: number | null;
  setOpenFAQ: (index: number | null) => void;
}> = ({ openFAQ, setOpenFAQ }) => {
  const faqs = [
    {
      question: 'Is it safe to connect my wallet?',
      answer: 'Yes, absolutely! We use industry-standard security protocols and never store your private keys. Your wallet connection is secure and you maintain full control of your funds.'
    },
    {
      question: 'Which wallets are supported?',
      answer: 'We support 15+ popular wallets including MetaMask, Trust Wallet, TokenPocket, SafePal, Binance Chain Wallet, and many more. Both mobile and desktop wallets are supported.'
    },
    {
      question: 'What are the fees?',
      answer: 'Our platform is completely free to use. You only pay standard blockchain transaction fees (gas fees) which go to the network validators, not to us.'
    },
    {
      question: 'Do I need BNB for transactions?',
      answer: 'Yes, you need a small amount of BNB to pay for transaction fees on the BNB Smart Chain. These fees are typically very low, usually less than $0.10 per transaction.'
    },
    {
      question: 'How do I switch to BNB Smart Chain?',
      answer: 'Our platform will automatically prompt you to switch networks when you connect. If you need to switch manually, you can add BNB Smart Chain in your wallet settings.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 border-t border-gray-100"
                  >
                    <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection: React.FC<{ 
  isConnected: boolean; 
  onConnect: () => void;
  onOpenDashboard: () => void;
  isOnBNBChain: boolean;
}> = ({ isConnected, onConnect, onOpenDashboard, isOnBNBChain }) => {
  return (
    <section className="py-16 lg:py-24 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {isConnected ? 'Ready to Explore?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isConnected 
              ? 'Your wallet is connected! Access your dashboard to start managing your crypto portfolio.'
              : 'Join thousands of users who are already exploring the future of decentralized finance.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isConnected ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConnect}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                <Wallet size={20} className="mr-3" />
                <span>Connect Your Wallet Now</span>
                <ArrowRight size={16} className="ml-2" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenDashboard}
                disabled={!isOnBNBChain}
                className={`inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg ${
                  isOnBNBChain 
                    ? 'text-green-600 bg-white hover:bg-gray-50' 
                    : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                }`}
              >
                {isOnBNBChain ? <TrendingUp size={20} className="mr-3" /> : <AlertTriangle size={20} className="mr-3" />}
                <span>{isOnBNBChain ? 'Open Dashboard' : 'Switch Network'}</span>
                {isOnBNBChain && <ArrowRight size={16} className="ml-2" />}
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <ExternalLink size={20} className="mr-3" />
              <span>Documentation</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;