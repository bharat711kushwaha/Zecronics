import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CryptoDashboardLayout from '../components/CryptoDashboardLayout'; 
import {
  TrendingUp, Eye, EyeOff, 
  Award, DollarSign,  Activity, Star,
   Clock, ArrowUpRight, ArrowDownLeft, Users
} from 'lucide-react';

// Mock user data - all values in USD
const mockUser = {
  username: 'Aditya Vikram',
  email: 'aditya@cryptowallet.com',
  fullName: 'Aditya Vikram',
  referralCode: 'NMP111112',
  totalBalance: 0,
  availableBalance: 0,
  withdrawnBalance: 0,
  packageIncome: 0,
  levelIncome: 0,
  totalTeam: 0,
  totalLogs: 0,
  currentRank: 'Bronze',
  memberSince: '2024-01-15'
};

// USD-based stats
const mockStats = [
  { 
    id: 1,
    label: 'Total Balance', 
    value: `$${mockUser.totalBalance.toLocaleString()}`, 
    icon: <DollarSign className="h-5 w-5 text-green-500" />, 
    change: '+12.5%',
    changeType: 'positive'
  },
  { 
    id: 2,
    label: 'Available Balance', 
    value: `$${mockUser.availableBalance.toLocaleString()}`, 
    icon: <Activity className="h-5 w-5 text-blue-500" />, 
    change: 'Ready for use',
    changeType: 'positive'
  },
  { 
    id: 3,
    label: 'Package Income', 
    value: `$${mockUser.packageIncome.toLocaleString()}`, 
    icon: <Award className="h-5 w-5 text-purple-500" />, 
    change: '+$250 this month',
    changeType: 'positive'
  },
  { 
    id: 4,
    label: 'Level Income', 
    value: `$${mockUser.levelIncome.toLocaleString()}`, 
    icon: <TrendingUp className="h-5 w-5 text-yellow-500" />, 
    change: '+8.3% growth',
    changeType: 'positive'
  }
];

// USD-based transactions
const mockTransactions = [
  { 
    id: '1', 
    type: 'package_income', 
    amount: 150, 
    currency: 'USD', 
    timestamp: Date.now() - 3600000,
    status: 'completed',
    description: 'Package Revenue'
  },
  { 
    id: '2', 
    type: 'level_income', 
    amount: 75, 
    currency: 'USD', 
    timestamp: Date.now() - 7200000,
    status: 'completed',
    description: 'Level Bonus'
  },
  { 
    id: '3', 
    type: 'withdrawal', 
    amount: 200, 
    currency: 'USD', 
    timestamp: Date.now() - 10800000,
    status: 'pending',
    description: 'Withdrawal Request'
  },
  { 
    id: '4', 
    type: 'deposit', 
    amount: 500, 
    currency: 'USD', 
    timestamp: Date.now() - 14400000,
    status: 'completed',
    description: 'Account Deposit'
  },
  { 
    id: '5', 
    type: 'referral_bonus', 
    amount: 100, 
    currency: 'USD', 
    timestamp: Date.now() - 18000000,
    status: 'completed',
    description: 'Referral Commission'
  }
];

// Investment packages in USD
const investmentPackages = [
  { name: 'Glow Package', amount: 10000, roi: '8.5%', duration: '12 months', status: 'active' },
  { name: 'Premium Package', amount: 5000, roi: '12.3%', duration: '6 months', status: 'active' },
  { name: 'Starter Package', amount: 1000, roi: '6.2%', duration: '3 months', status: 'completed' }
];

// Stats Card Component
const StatsCard = ({ stat, delay = 0 }: { stat: any; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
          <div className="flex items-center mt-3">
            <span className={`text-sm font-semibold ${
              stat.changeType === 'positive' ? 'text-green-600' : 
              stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {stat.change}
            </span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
          {stat.icon}
        </div>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
const DashboardPage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <CryptoDashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />
            <p className="mt-4 text-blue-600 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </CryptoDashboardLayout>
    );
  }

  return (
    <CryptoDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {mockUser.fullName}! 👋</h1>
              <p className="text-blue-100 mt-2">Your investment portfolio is performing well</p>
              <div className="mt-3 flex items-center space-x-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Referral: {mockUser.referralCode}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Rank: {mockUser.currentRank}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end space-x-2 mb-2">
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              <div>
                {showBalance ? (
                  <>
                    <div className="text-3xl font-bold">${mockUser.totalBalance.toLocaleString()}</div>
                    <div className="text-blue-100">Total Portfolio Value</div>
                  </>
                ) : (
                  <div className="text-3xl font-bold">••••••</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat, index) => (
            <StatsCard key={stat.id} stat={stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Account Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            
            {/* Account Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
              <div className="space-y-4">
                
                {/* Balance Cards Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600">Total Balance</p>
                    <p className="text-lg font-bold text-green-600">
                      ${mockUser.totalBalance.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600">Available</p>
                    <p className="text-lg font-bold text-blue-600">
                      ${mockUser.availableBalance.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600">Package Income</p>
                    <p className="text-lg font-bold text-purple-600">
                      ${mockUser.packageIncome.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-600">Level Income</p>
                    <p className="text-lg font-bold text-orange-600">
                      ${mockUser.levelIncome.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Team Statistics */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-blue-800">Team Statistics</h4>
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-blue-800">{mockUser.totalTeam}</span>
                      <span className="text-sm text-blue-600 ml-1">Members</span>
                    </div>
                    <div>
                      <span className="text-lg font-bold text-blue-800">{mockUser.totalLogs}</span>
                      <span className="text-sm text-blue-600 ml-1">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow Package Promotion */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5" />
                <span className="font-semibold">Get Started with Glow Package</span>
              </div>
              <p className="text-sm text-yellow-100 mb-3">4 packs of 1 by Glow ($2500 USD each) - Perfect for beginners</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">$10,000</span>
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Purchase Now →
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Investment Packages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Active Investments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Details</h3>
              <div className="space-y-3">
                {investmentPackages.map((package_item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">{package_item.name}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        package_item.status === 'active' ? 'bg-green-100 text-green-800' :
                        package_item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {package_item.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Amount: ${package_item.amount.toLocaleString()}</span>
                      <span>ROI: {package_item.roi}</span>
                    </div>
                    <div className="text-xs text-gray-400">Duration: {package_item.duration}</div>
                  </div>
                ))}
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors">
                  View All Packages →
                </button>
              </div>
            </div>

            {/* Income Balance Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Income Balance</p>
                  <p className="text-2xl font-bold text-green-600">$0</p>
                  <p className="text-xs text-green-500">Available</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Payout Balance</p>
                  <p className="text-2xl font-bold text-orange-600">$0</p>
                  <p className="text-xs text-orange-500">Pending</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Transactions →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {mockTransactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    tx.type === 'package_income' ? 'bg-blue-500' :
                    tx.type === 'level_income' ? 'bg-green-500' :
                    tx.type === 'deposit' ? 'bg-purple-500' :
                    tx.type === 'withdrawal' ? 'bg-orange-500' : 
                    'bg-yellow-500'
                  }`}>
                    {tx.type === 'package_income' ? <Award size={14} /> : 
                     tx.type === 'level_income' ? <TrendingUp size={14} /> :
                     tx.type === 'deposit' ? <ArrowDownLeft size={14} /> :
                     tx.type === 'withdrawal' ? <ArrowUpRight size={14} /> :
                     <Star size={14} />}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tx.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tx.status}
                  </span>
                </div>
                <p className="font-medium text-gray-900 text-sm mb-1">
                  {tx.description}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  ${tx.amount.toLocaleString()} {tx.currency}
                </p>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock size={10} className="mr-1" />
                  {new Date(tx.timestamp).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </CryptoDashboardLayout>
  );
};

export default DashboardPage;