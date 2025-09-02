import { useState } from 'react';
import { motion } from 'framer-motion';
import CryptoDashboardLayout from '../components/CryptoDashboardLayout';
import {
  Trophy, Star, Calendar, Eye,  Search, Filter,
   TrendingUp, 
} from 'lucide-react';

// Mock Bonus Income Data
const mockBonusData = [
  {
    id: 1,
    bonusType: 'Leadership Bonus',
    amount: 1500,
    description: 'Monthly leadership performance bonus',
    criteria: 'Team volume > $50,000',
    date: '2024-01-15',
    status: 'completed',
    icon: '👑',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 2,
    bonusType: 'Rank Achievement',
    amount: 2500,
    description: 'Bronze to Silver rank upgrade bonus',
    criteria: 'Achieve Silver rank',
    date: '2024-01-10',
    status: 'completed',
    icon: '🥈',
    color: 'from-gray-400 to-gray-600'
  },
  {
    id: 3,
    bonusType: 'Team Building Bonus',
    amount: 800,
    description: 'Building active team members',
    criteria: 'Add 5+ active members',
    date: '2024-01-08',
    status: 'completed',
    icon: '🤝',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 4,
    bonusType: 'Fast Start Bonus',
    amount: 500,
    description: 'Quick start performance bonus',
    criteria: 'Complete first week targets',
    date: '2024-01-05',
    status: 'completed',
    icon: '🚀',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 5,
    bonusType: 'Volume Bonus',
    amount: 1200,
    description: 'High volume achievement bonus',
    criteria: 'Monthly volume > $25,000',
    date: '2024-01-03',
    status: 'pending',
    icon: '📈',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 6,
    bonusType: 'Loyalty Bonus',
    amount: 750,
    description: '6-month loyalty reward',
    criteria: 'Active for 6+ months',
    date: '2024-01-01',
    status: 'completed',
    icon: '💎',
    color: 'from-indigo-500 to-blue-600'
  }
];

const BonusIncomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Calculate totals
  const totalBonus = mockBonusData
    .filter(item => item.status === 'completed')
    .reduce((sum, item) => sum + item.amount, 0);

  const pendingBonus = mockBonusData
    .filter(item => item.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);

  // Bonus categories
  const bonusCategories = [
    {
      name: 'Leadership',
      count: mockBonusData.filter(item => item.bonusType.includes('Leadership')).length,
      total: mockBonusData.filter(item => item.bonusType.includes('Leadership')).reduce((sum, item) => sum + item.amount, 0),
      icon: '👑',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'Achievement',
      count: mockBonusData.filter(item => item.bonusType.includes('Rank') || item.bonusType.includes('Fast')).length,
      total: mockBonusData.filter(item => item.bonusType.includes('Rank') || item.bonusType.includes('Fast')).reduce((sum, item) => sum + item.amount, 0),
      icon: '🏆',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Team Building',
      count: mockBonusData.filter(item => item.bonusType.includes('Team')).length,
      total: mockBonusData.filter(item => item.bonusType.includes('Team')).reduce((sum, item) => sum + item.amount, 0),
      icon: '🤝',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Performance',
      count: mockBonusData.filter(item => item.bonusType.includes('Volume') || item.bonusType.includes('Loyalty')).length,
      total: mockBonusData.filter(item => item.bonusType.includes('Volume') || item.bonusType.includes('Loyalty')).reduce((sum, item) => sum + item.amount, 0),
      icon: '📊',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  // Filter data
  const filteredData = mockBonusData.filter(item => {
    const matchesSearch = item.bonusType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <CryptoDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Bonus Income</h1>
              <p className="text-pink-100 mt-2">Special rewards and achievements</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${totalBonus.toLocaleString()}</div>
              <div className="text-pink-100">Total Bonus Earned</div>
            </div>
          </div>
        </motion.div>

        {/* Bonus Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bonusCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-5`}></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl">{category.icon}</div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                    {category.count}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-500 text-sm">{category.name} Bonuses</p>
                    <p className="text-xl font-bold text-gray-900">${category.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Bonuses</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {mockBonusData.length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-pink-50">
                <Trophy className="h-5 w-5 text-pink-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${(totalBonus * 0.6).toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-green-50">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Average Bonus</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${Math.round(totalBonus / mockBonusData.filter(i => i.status === 'completed').length).toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50">
                <Star className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${pendingBonus.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-orange-50">
                <Calendar className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search bonus type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

          
          </div>
        </motion.div>

        {/* Bonus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 overflow-hidden relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5`}></div>
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{item.icon}</div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    item.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{item.bonusType}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>

                  <div className={`text-center py-3 rounded-lg bg-gradient-to-r ${item.color}`}>
                    <p className="text-white text-2xl font-bold">${item.amount.toLocaleString()}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Achievement Criteria</p>
                    <p className="text-sm text-gray-700">{item.criteria}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-xs text-gray-500">Date Earned</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="text-pink-600 hover:text-pink-800 p-1">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No bonus records found.</p>
          </div>
        )}
      </div>
    </CryptoDashboardLayout>
  );
};

export default BonusIncomePage;