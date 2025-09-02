
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../hooks/useWallet';
import HomeLayout from '../components/HomeLayout';  
import HeroSection from '../components/HeroSection'; 
import { 
  AlertTriangle, Shield, Zap, Globe, DollarSign, 
  Smartphone, Wallet, TrendingUp, Users, CheckCircle,
  Star, Lock, RefreshCw, Play, ArrowRight, ExternalLink,
  BarChart3, 
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
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      <FeaturesSection activeFeature={activeFeature} />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Interactive Demo Section */}
      <DemoSection />

      {/* Supported Wallets Section */}
      <SupportedWalletsSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialsSection 
        activeTestimonial={activeTestimonial}
        setActiveTestimonial={setActiveTestimonial}
      />

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
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-2xl shadow-2xl border border-amber-300/50 backdrop-blur-xl">
          <div className="flex items-start space-x-3">
            <AlertTriangle size={24} className="flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base mb-1">Wrong Network!</h3>
              <p className="text-sm text-amber-50 leading-relaxed">
                Please switch to BNB Smart Chain to access the dashboard.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="flex-shrink-0 text-white hover:text-amber-200 text-xl leading-none transition-colors p-1"
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
const FeaturesSection: React.FC<{ activeFeature: number }> = ({ activeFeature }) => {
  const features = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your private keys remain secure with advanced encryption and never leave your device.',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '256-bit encryption'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience instant transactions with minimal fees on the BNB Smart Chain network.',
      gradient: 'from-yellow-500 to-orange-500',
      stats: '<1s confirmation'
    },
    {
      icon: Globe,
      title: 'Multi-Wallet Support',
      description: 'Connect with MetaMask, Trust Wallet, TokenPocket, and 15+ other popular wallets.',
      gradient: 'from-purple-500 to-pink-500',
      stats: '15+ wallets'
    },
    {
      icon: DollarSign,
      title: 'Low Fees',
      description: 'Enjoy the lowest transaction fees in the crypto space with BNB Smart Chain.',
      gradient: 'from-green-500 to-emerald-500',
      stats: '$0.05 avg fee'
    },
    {
      icon: RefreshCw,
      title: 'Easy Swaps',
      description: 'Swap tokens instantly with our integrated DEX aggregator for best prices.',
      gradient: 'from-indigo-500 to-blue-500',
      stats: 'Best rates'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Fully responsive design works perfectly on all devices and screen sizes.',
      gradient: 'from-rose-500 to-pink-500',
      stats: '100% responsive'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className={`group relative bg-white rounded-3xl p-8 border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                activeFeature === index 
                  ? 'border-blue-200 shadow-xl scale-105' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className="relative">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${feature.gradient} text-white`}>
                  {feature.stats}
                </div>
              </div>
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
      icon: Smartphone,
      color: 'blue'
    },
    {
      step: '02',
      title: 'Connect Wallet',
      description: 'Click "Connect Wallet" and choose your preferred wallet from the list.',
      icon: Wallet,
      color: 'purple'
    },
    {
      step: '03',
      title: 'Switch Network',
      description: 'Ensure you\'re connected to BNB Smart Chain for optimal experience.',
      icon: Globe,
      color: 'green'
    },
    {
      step: '04',
      title: 'Start Trading',
      description: 'Access your dashboard and start trading, swapping, and managing your crypto.',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
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
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 transform -translate-y-1/2 z-0"></div>
              )}
              
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 z-10 border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${
                  step.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                  step.color === 'purple' ? 'from-purple-500 to-pink-500' :
                  step.color === 'green' ? 'from-green-500 to-emerald-500' :
                  'from-orange-500 to-yellow-500'
                } rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg`}>
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

// Interactive Demo Section
const DemoSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Try Our Live Demo
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Experience the power of our platform with our interactive demo. 
              No wallet connection required!
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Real-time price feeds',
                'Interactive trading interface',
                'Portfolio simulation',
                'Multi-wallet preview'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center space-x-2">
                <Play size={20} />
                <span>Launch Demo</span>
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <BarChart3 size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Portfolio Value</div>
                    <div className="text-green-300 text-2xl font-bold">$12,456.78</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-blue-200 text-sm">24h Change</div>
                    <div className="text-green-400 font-bold">+12.5%</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-blue-200 text-sm">Total Assets</div>
                    <div className="text-white font-bold">8</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-blue-200 text-sm">Top Holdings</div>
                  {['BTC', 'ETH', 'BNB'].map((asset, index) => (
                    <div key={asset} className="flex items-center justify-between">
                      <span className="text-white">{asset}</span>
                      <span className="text-green-400">+{5 + index}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Supported Wallets Section
const SupportedWalletsSection: React.FC = () => {
  const wallets = [
    { name: 'MetaMask', icon: '🦊', users: '30M+', gradient: 'from-orange-400 to-orange-600' },
    { name: 'Trust Wallet', icon: '🛡️', users: '60M+', gradient: 'from-blue-400 to-blue-600' },
    { name: 'TokenPocket', icon: '💰', users: '20M+', gradient: 'from-green-400 to-green-600' },
    { name: 'SafePal', icon: '🔐', users: '10M+', gradient: 'from-purple-400 to-purple-600' },
    { name: 'Binance Chain', icon: '🟡', users: '15M+', gradient: 'from-yellow-400 to-yellow-600' },
    { name: 'WalletConnect', icon: '🔗', users: '40M+', gradient: 'from-indigo-400 to-indigo-600' },
    { name: 'Coinbase Wallet', icon: '🔵', users: '35M+', gradient: 'from-cyan-400 to-cyan-600' },
    { name: 'OKX Wallet', icon: '⚫', users: '25M+', gradient: 'from-gray-400 to-gray-600' }
  ];

  return (
    <section className="py-20 bg-white">
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
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${wallet.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
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

// Stats Section
const StatsSection: React.FC = () => {
  const stats = [
    { number: '100K+', label: 'Active Users', icon: Users, color: 'blue' },
    { number: '$2M+', label: 'Volume Traded', icon: DollarSign, color: 'green' },
    { number: '15+', label: 'Supported Wallets', icon: Wallet, color: 'purple' },
    { number: '99.9%', label: 'Uptime', icon: Zap, color: 'orange' }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center text-white group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${
                stat.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                stat.color === 'green' ? 'from-green-500 to-emerald-500' :
                stat.color === 'purple' ? 'from-purple-500 to-pink-500' :
                'from-orange-500 to-yellow-500'
              } rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection: React.FC<{
  activeTestimonial: number;
  setActiveTestimonial: (index: number) => void;
}> = ({ activeTestimonial, setActiveTestimonial }) => {
  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'DeFi Trader',
      avatar: '👨‍💼',
      content: 'The easiest way to connect to DeFi. Security is top-notch and the interface is incredibly user-friendly.',
      rating: 5,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Sarah Wilson',
      role: 'Crypto Investor',
      avatar: '👩‍💻',
      content: 'I love how fast and secure the transactions are. Multi-wallet support is a game changer!',
      rating: 5,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Mike Rodriguez',
      role: 'NFT Creator',
      avatar: '🎨',
      content: 'Best Web3 platform I\'ve used. Low fees and great customer support. Highly recommended!',
      rating: 5,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who trust our platform
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden cursor-pointer ${
                  activeTestimonial === index ? 'scale-105 shadow-2xl' : 'hover:-translate-y-2'
                }`}
                onClick={() => setActiveTestimonial(index)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-2xl flex items-center justify-center text-3xl mr-4 shadow-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeTestimonial === index ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Security Section
const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-20 lg:py-32 bg-white">
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
                  desc: 'You maintain full control of your private keys and funds.',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                { 
                  icon: Shield, 
                  title: 'Open Source', 
                  desc: 'Transparent, audited code that you can verify yourself.',
                  gradient: 'from-green-500 to-emerald-500'
                },
                { 
                  icon: RefreshCw, 
                  title: 'Multi-Layer Security', 
                  desc: 'Advanced encryption and security protocols protect your data.',
                  gradient: 'from-purple-500 to-pink-500'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
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
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🛡️</div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Trusted by 100K+ Users</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Join thousands of users who trust our platform for their Web3 needs.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl font-bold">$2M+</div>
                    <div className="text-blue-200 text-sm">Secured Volume</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
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
    <section className="py-20 lg:py-32 bg-gray-50">
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
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <button
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors group"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-blue-600">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openFAQ === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-2xl transition-colors ${
                    openFAQ === index ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  +
                </motion.span>
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
    <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Wallet size={20} className="mr-3" />
                <span>Connect Your Wallet Now</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  <ArrowRight size={16} />
                </motion.div>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenDashboard}
                disabled={!isOnBNBChain}
                className={`group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isOnBNBChain 
                    ? 'text-green-600 bg-white hover:bg-gray-50' 
                    : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                }`}
              >
                {isOnBNBChain ? <TrendingUp size={20} className="mr-3" /> : <AlertTriangle size={20} className="mr-3" />}
                <span>{isOnBNBChain ? 'Open Dashboard' : 'Switch to BNB Chain'}</span>
                {isOnBNBChain && <ArrowRight size={16} className="ml-2" />}
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <ExternalLink size={20} className="mr-3" />
              <span>Documentation</span>
            </motion.button>
          </div>

          {/* Additional CTA Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: '🔒',
                title: 'Secure & Safe',
                description: 'Bank-level security with non-custodial architecture'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Instant transactions with minimal fees'
              },
              {
                icon: '🌐',
                title: 'Multi-Chain',
                description: 'Support for 15+ popular wallets'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-white"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;