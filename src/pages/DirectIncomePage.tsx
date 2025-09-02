import  { useState } from 'react';
import { motion } from 'framer-motion';
import CryptoDashboardLayout from '../components/CryptoDashboardLayout';
import {
  DollarSign, Users, TrendingUp, Calendar, Eye,
   Search, Filter, 
} from 'lucide-react';

// Mock Direct Income Data
const mockDirectIncomeData = [
  {
    id: 1,
    referredUser: 'John Doe',
    walletAddress: '0x1234...5678',
    packageAmount: 2500,
    commission: 250,
    commissionRate: '10%',
    date: '2024-01-15',
    status: 'completed',
    transactionHash: '0xabcd1234567890abcdef1234567890abcdef12345678'
  },
  {
    id: 2,
    referredUser: 'Sarah Wilson',
    walletAddress: '0x8765...4321',
    packageAmount: 5000,
    commission: 500,
    commissionRate: '10%',
    date: '2024-01-14',
    status: 'completed',
    transactionHash: '0xefgh5678901234efgh5678901234efgh56789012'
  },
  {
    id: 3,
    referredUser: 'Mike Johnson',
    walletAddress: '0x9876...1234',
    packageAmount: 1000,
    commission: 100,
    commissionRate: '10%',
    date: '2024-01-13',
    status: 'pending',
    transactionHash: '0xijkl9012345678ijkl9012345678ijkl90123456'
  },
  {
    id: 4,
    referredUser: 'Emma Davis',
    walletAddress: '0x4567...8901',
    packageAmount: 7500,
    commission: 750,
    commissionRate: '10%',
    date: '2024-01-12',
    status: 'completed',
    transactionHash: '0xmnop3456789012mnop3456789012mnop34567890'
  }
];

const DirectIncomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Calculate total direct income
  const totalDirectIncome = mockDirectIncomeData
    .filter(item => item.status === 'completed')
    .reduce((sum, item) => sum + item.commission, 0);

  // Filter data based on search and status
  const filteredData = mockDirectIncomeData.filter(item => {
    const matchesSearch = item.referredUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.walletAddress.toLowerCase().includes(searchTerm.toLowerCase());
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
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Direct Income</h1>
              <p className="text-green-100 mt-2">Earnings from direct referrals</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${totalDirectIncome.toLocaleString()}</div>
              <div className="text-green-100">Total Direct Income</div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Referrals</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {mockDirectIncomeData.length}
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
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${(totalDirectIncome * 0.4).toLocaleString()}
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
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Avg Commission</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${(totalDirectIncome / mockDirectIncomeData.filter(i => i.status === 'completed').length).toFixed(0)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50">
                <DollarSign className="h-5 w-5 text-purple-500" />
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
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {mockDirectIncomeData.filter(i => i.status === 'pending').length}
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
          transition={{ delay: 0.5 }}
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
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

           
          </div>
        </motion.div>

        {/* Direct Income Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Direct Income History</h2>
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
                      <p className="font-semibold text-gray-900">{item.referredUser}</p>
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
                      <p className="font-medium text-green-600">${item.commission.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rate</p>
                      <p className="font-medium">{item.commissionRate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
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
                    Referred User
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
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.referredUser}</p>
                        <p className="text-sm text-gray-500 font-mono">{item.walletAddress}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">${item.packageAmount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-green-600">${item.commission.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{item.commissionRate}</p>
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
                      <button className="text-blue-600 hover:text-blue-900 text-sm">
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
              <p className="text-gray-500">No direct income records found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </CryptoDashboardLayout>
  );
};

export default DirectIncomePage;