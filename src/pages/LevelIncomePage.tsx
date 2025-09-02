import { useState } from 'react';
import { motion } from 'framer-motion';
import CryptoDashboardLayout from '../components/CryptoDashboardLayout';
import {
   Users, TrendingUp, Calendar, Eye,
   Search, Filter, Layers
} from 'lucide-react';

// Mock Level Income Data
const mockLevelIncomeData = [
  {
    id: 1,
    level: 1,
    userName: 'Alice Smith',
    walletAddress: '0x1234...5678',
    packageAmount: 2500,
    commission: 125,
    commissionRate: '5%',
    date: '2024-01-15',
    status: 'completed',
    downlineCount: 5
  },
  {
    id: 2,
    level: 2,
    userName: 'Bob Johnson',
    walletAddress: '0x8765...4321',
    packageAmount: 5000,
    commission: 150,
    commissionRate: '3%',
    date: '2024-01-14',
    status: 'completed',
    downlineCount: 12
  },
  {
    id: 3,
    level: 1,
    userName: 'Carol Davis',
    walletAddress: '0x9876...1234',
    packageAmount: 1000,
    commission: 50,
    commissionRate: '5%',
    date: '2024-01-13',
    status: 'pending',
    downlineCount: 3
  },
  {
    id: 4,
    level: 3,
    userName: 'David Wilson',
    walletAddress: '0x4567...8901',
    packageAmount: 7500,
    commission: 225,
    commissionRate: '3%',
    date: '2024-01-12',
    status: 'completed',
    downlineCount: 8
  },
  {
    id: 5,
    level: 2,
    userName: 'Eva Martinez',
    walletAddress: '0x3456...7890',
    packageAmount: 3000,
    commission: 90,
    commissionRate: '3%',
    date: '2024-01-11',
    status: 'completed',
    downlineCount: 6
  }
];

const LevelIncomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Calculate total level income
  const totalLevelIncome = mockLevelIncomeData
    .filter(item => item.status === 'completed')
    .reduce((sum, item) => sum + item.commission, 0);

  // Level-wise breakdown
  const levelBreakdown = [
    {
      level: 1,
      count: mockLevelIncomeData.filter(item => item.level === 1).length,
      income: mockLevelIncomeData.filter(item => item.level === 1).reduce((sum, item) => sum + item.commission, 0),
      rate: '5%'
    },
    {
      level: 2,
      count: mockLevelIncomeData.filter(item => item.level === 2).length,
      income: mockLevelIncomeData.filter(item => item.level === 2).reduce((sum, item) => sum + item.commission, 0),
      rate: '3%'
    },
    {
      level: 3,
      count: mockLevelIncomeData.filter(item => item.level === 3).length,
      income: mockLevelIncomeData.filter(item => item.level === 3).reduce((sum, item) => sum + item.commission, 0),
      rate: '3%'
    }
  ];

  // Filter data
  const filteredData = mockLevelIncomeData.filter(item => {
    const matchesSearch = item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.walletAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || item.level.toString() === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <CryptoDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Level Income</h1>
              <p className="text-purple-100 mt-2">Multi-level commission earnings</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${totalLevelIncome.toLocaleString()}</div>
              <div className="text-purple-100">Total Level Income</div>
            </div>
          </div>
        </motion.div>

        {/* Level Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {levelBreakdown.map((level, index) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                  level.level === 1 ? 'bg-blue-500' :
                  level.level === 2 ? 'bg-purple-500' :
                  'bg-pink-500'
                }`}>
                  L{level.level}
                </div>
                <span className="text-sm text-gray-500">Rate: {level.rate}</span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-gray-500 text-sm">Level {level.level} Income</p>
                  <p className="text-xl font-bold text-gray-900">${level.income.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Active Members</p>
                  <p className="text-lg font-semibold text-gray-700">{level.count}</p>
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
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Downlines</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {mockLevelIncomeData.reduce((sum, item) => sum + item.downlineCount, 0)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Levels</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50">
                <Layers className="h-5 w-5 text-purple-500" />
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
                  ${(totalLevelIncome * 0.3).toLocaleString()}
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
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {mockLevelIncomeData.filter(i => i.status === 'pending').length}
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
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm w-full sm:w-64"
                />
              </div>

              {/* Level Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm appearance-none bg-white"
                >
                  <option value="all">All Levels</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                </select>
              </div>
            </div>

           
          </div>
        </motion.div>

        {/* Level Income Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Level Income History</h2>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden">
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          item.level === 1 ? 'bg-blue-100 text-blue-800' :
                          item.level === 2 ? 'bg-purple-100 text-purple-800' :
                          'bg-pink-100 text-pink-800'
                        }`}>
                          Level {item.level}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900 mt-1">{item.userName}</p>
                      <p className="text-xs text-gray-500 font-mono">{item.walletAddress}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      item.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Package Amount</p>
                      <p className="font-medium">${item.packageAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Commission</p>
                      <p className="font-medium text-purple-600">${item.commission.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rate</p>
                      <p className="font-medium">{item.commissionRate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Downlines</p>
                      <p className="font-medium">{item.downlineCount}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downlines
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        item.level === 1 ? 'bg-blue-100 text-blue-800' :
                        item.level === 2 ? 'bg-purple-100 text-purple-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        Level {item.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.userName}</p>
                        <p className="text-sm text-gray-500 font-mono">{item.walletAddress}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">${item.packageAmount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-purple-600">${item.commission.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{item.commissionRate}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{item.downlineCount}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{new Date(item.date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        item.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-purple-600 hover:text-purple-900 text-sm">
                        <Eye size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No level income records found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </CryptoDashboardLayout>
  );
};

export default LevelIncomePage;