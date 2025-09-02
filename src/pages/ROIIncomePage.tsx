import  { useState } from 'react';
import { motion } from 'framer-motion';
import CryptoDashboardLayout from '../components/CryptoDashboardLayout';
import {
   TrendingUp,  Eye, Search, Filter,
  PieChart, Clock, CheckCircle
} from 'lucide-react';

// Mock ROI Income Data
const mockROIData = [
  {
    id: 1,
    packageName: 'Glow Package',
    investmentAmount: 10000,
    dailyROI: 83.33,
    totalDays: 365,
    completedDays: 45,
    remainingDays: 320,
    totalEarned: 3750,
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  },
  {
    id: 2,
    packageName: 'Premium Package',
    investmentAmount: 5000,
    dailyROI: 45.45,
    totalDays: 300,
    completedDays: 180,
    remainingDays: 120,
    totalEarned: 8181,
    status: 'active',
    startDate: '2023-07-15',
    endDate: '2024-05-15'
  },
  {
    id: 3,
    packageName: 'Starter Package',
    investmentAmount: 1000,
    dailyROI: 8.33,
    totalDays: 120,
    completedDays: 120,
    remainingDays: 0,
    totalEarned: 1000,
    status: 'completed',
    startDate: '2023-08-01',
    endDate: '2023-11-29'
  },
  {
    id: 4,
    packageName: 'Elite Package',
    investmentAmount: 25000,
    dailyROI: 250,
    totalDays: 400,
    completedDays: 30,
    remainingDays: 370,
    totalEarned: 7500,
    status: 'active',
    startDate: '2023-12-15',
    endDate: '2025-01-19'
  }
];

const ROIIncomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Calculate totals
  const totalInvestment = mockROIData.reduce((sum, item) => sum + item.investmentAmount, 0);
  const totalEarned = mockROIData.reduce((sum, item) => sum + item.totalEarned, 0);
  const dailyEarning = mockROIData
    .filter(item => item.status === 'active')
    .reduce((sum, item) => sum + item.dailyROI, 0);

  // Filter data
  const filteredData = mockROIData.filter(item => {
    const matchesSearch = item.packageName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <CryptoDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">ROI Income</h1>
              <p className="text-orange-100 mt-2">Return on Investment earnings</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${totalEarned.toLocaleString()}</div>
              <div className="text-orange-100">Total ROI Earned</div>
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
                <p className="text-gray-500 text-sm font-medium">Total Investment</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${totalInvestment.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50">
                <PieChart className="h-5 w-5 text-blue-500" />
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
                <p className="text-gray-500 text-sm font-medium">Daily Earning</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${dailyEarning.toLocaleString()}
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
                <p className="text-gray-500 text-sm font-medium">Active Packages</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {mockROIData.filter(item => item.status === 'active').length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-orange-50">
                <Clock className="h-5 w-5 text-orange-500" />
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
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {mockROIData.filter(item => item.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50">
                <CheckCircle className="h-5 w-5 text-purple-500" />
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
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>

           
          </div>
        </motion.div>

        {/* ROI Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {/* Package Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.packageName}</h3>
                  <p className="text-sm text-gray-500">Investment: ${item.investmentAmount.toLocaleString()}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{getProgressPercentage(item.completedDays, item.totalDays)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercentage(item.completedDays, item.totalDays)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{item.completedDays} days completed</span>
                  <span>{item.remainingDays} days remaining</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Daily ROI</p>
                  <p className="text-lg font-bold text-gray-900">${item.dailyROI}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Total Earned</p>
                  <p className="text-lg font-bold text-green-600">${item.totalEarned.toLocaleString()}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="flex justify-between text-sm text-gray-600 border-t pt-4">
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p>{new Date(item.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">End Date</p>
                  <p>{new Date(item.endDate).toLocaleDateString()}</p>
                </div>
                <button className="text-orange-600 hover:text-orange-800">
                  <Eye size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500">No ROI packages found.</p>
          </div>
        )}
      </div>
    </CryptoDashboardLayout>
  );
};

export default ROIIncomePage;