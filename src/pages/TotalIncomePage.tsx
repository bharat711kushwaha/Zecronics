import  { useState } from 'react';
import { motion } from 'framer-motion';
import CryptoDashboardLayout from '../components/CryptoDashboardLayout';
import {
  Crown, DollarSign, TrendingUp, Calendar,  
  PieChart, BarChart3, Target, Award, Trophy, Users
} from 'lucide-react';

// Combined income data from all sources
const totalIncomeData = {
  direct: 1600,
  level: 640,
  roi: 17431,
  bonus: 7250,
  total: 26921,
  thisMonth: 8676,
  lastMonth: 6234,
  growth: 39.2
};

const monthlyData = [
  { month: 'Jan', direct: 400, level: 120, roi: 3800, bonus: 1500 },
  { month: 'Feb', direct: 350, level: 150, roi: 4200, bonus: 1800 },
  { month: 'Mar', direct: 450, level: 180, roi: 4500, bonus: 2000 },
  { month: 'Apr', direct: 400, level: 190, roi: 5131, bonus: 1950 },
];

const incomeBreakdown = [
  {
    type: 'ROI Income',
    amount: totalIncomeData.roi,
    percentage: 64.8,
    color: 'from-orange-500 to-red-600',
    icon: <Target size={20} />,
    description: 'Return on investment earnings'
  },
  {
    type: 'Bonus Income',
    amount: totalIncomeData.bonus,
    percentage: 26.9,
    color: 'from-pink-500 to-purple-600',
    icon: <Trophy size={20} />,
    description: 'Achievement and performance bonuses'
  },
  {
    type: 'Direct Income',
    amount: totalIncomeData.direct,
    percentage: 5.9,
    color: 'from-green-500 to-emerald-600',
    icon: <Users size={20} />,
    description: 'Direct referral commissions'
  },
  {
    type: 'Level Income',
    amount: totalIncomeData.level,
    percentage: 2.4,
    color: 'from-purple-500 to-pink-600',
    icon: <Award size={20} />,
    description: 'Multi-level commission earnings'
  }
];

const recentTransactions = [
  { type: 'ROI Income', amount: 83.33, date: '2024-01-15', status: 'completed' },
  { type: 'Leadership Bonus', amount: 1500, date: '2024-01-14', status: 'completed' },
  { type: 'Direct Commission', amount: 250, date: '2024-01-13', status: 'completed' },
  { type: 'Level 2 Income', amount: 150, date: '2024-01-12', status: 'completed' },
  { type: 'Fast Start Bonus', amount: 500, date: '2024-01-11', status: 'pending' }
];

const TotalIncomePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  return (
    <CryptoDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Total Income</h1>
              <p className="text-indigo-100 mt-2">Complete earnings overview</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${totalIncomeData.total.toLocaleString()}</div>
              <div className="text-indigo-100">Total Lifetime Earnings</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${totalIncomeData.thisMonth.toLocaleString()}
                </p>
                <p className="text-green-600 text-sm mt-1">+{totalIncomeData.growth}%</p>
              </div>
              <div className="p-3 rounded-xl bg-green-50">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Last Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${totalIncomeData.lastMonth.toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm mt-1">Previous period</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Daily Average</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${(totalIncomeData.thisMonth / 30).toFixed(0)}
                </p>
                <p className="text-gray-500 text-sm mt-1">Per day</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50">
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {totalIncomeData.growth}%
                </p>
                <p className="text-green-600 text-sm mt-1">Month over month</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-50">
                <Crown className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Income Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Income Breakdown</h2>
            <div className="flex items-center space-x-2">
              <PieChart size={20} className="text-gray-500" />
              <span className="text-sm text-gray-500">By Source</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {incomeBreakdown.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="relative overflow-hidden rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {item.percentage}%
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.type}</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ${item.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Trend and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trend</h2>
            
            {/* Simple bar chart representation */}
            <div className="space-y-4">
              {monthlyData.map((month, index) => {
                const total = month.direct + month.level + month.roi + month.bonus;
                const maxValue = Math.max(...monthlyData.map(m => m.direct + m.level + m.roi + m.bonus));
                
                return (
                  <div key={month.month} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900">{month.month}</span>
                      <span className="text-gray-600">${total.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(total / maxValue) * 100}%` }}
                        transition={{ delay: 0.1 * index, duration: 0.8 }}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <DollarSign size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
                      <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">+${transaction.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Export Income Report</h3>
              <p className="text-sm text-gray-500 mt-1">Download complete income statement</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Time</option>
                <option value="year">This Year</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            
            </div>
          </div>
        </motion.div>
      </div>
    </CryptoDashboardLayout>
  );
};

export default TotalIncomePage;