// import React, {useState} from 'react'
// import AdminNavbar from '../components/AdminNavbar'
// import { BsArrowUpRight } from "react-icons/bs";
// import MetricCard from '../components/MetricCard';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import OrdersAnalysis from '../components/OrdersAnalysis';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// // Sample data for the year
// const analysisData = [
//   { month: 'Jan', revenue: 45000, orders: 220 },
//   { month: 'Feb', revenue: 52000, orders: 280 },
//   { month: 'Mar', revenue: 48000, orders: 250 },
//   { month: 'Apr', revenue: 61000, orders: 320 },
//   { month: 'May', revenue: 55000, orders: 290 },
//   { month: 'Jun', revenue: 67000, orders: 350 },
//   { month: 'Jul', revenue: 72000, orders: 380 },
//   { month: 'Aug', revenue: 69000, orders: 360 },
//   { month: 'Sep', revenue: 75000, orders: 400 },
//   { month: 'Oct', revenue: 82000, orders: 420 },
//   { month: 'Nov', revenue: 87000, orders: 450 },
//   { month: 'Dec', revenue: 92000, orders: 480 },
// ];

// const Dashboard = () => {

//   const [timeframe, setTimeframe] = useState('year');

//   // Calculate total revenue and orders
//   const totalRevenue = analysisData.reduce((sum, item) => sum + item.revenue, 0);
//   const totalOrders = analysisData.reduce((sum, item) => sum + item.orders, 0);

//   // Custom tooltip formatter
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
//           <p className="font-semibold text-gray-800">{label}</p>
//           <p className="text-blue-600">
//             Revenue: ${payload[0].value.toLocaleString()}
//           </p>
//           <p className="text-green-600">
//             Orders: {payload[1].value}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className='bg-violet-50 min-h-[100vh] py-9 px-12'>
//     <AdminNavbar/>
    
//     <div className='flex justify-center gap-x-12'>
//     <MetricCard bgColor={'#C9CC3F'} name={'Total Sales'}/>
//     <MetricCard bgColor={'#B6D0E2'} name={'Revenue'}/>
//     <MetricCard bgColor={'#C1E1C1'} name={'Orders'} />
//     <MetricCard bgColor={'#FFFFFF'} name={'Sent Bills'}/>
//     </div>


//   <div className="bg-[#B6D0E2] rounded-xl mt-12 max-w-[1100px] mx-auto p-6">
//       {/* Header Section */}
//       <div className="mb-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Revenue vs Orders Analysis</h2>
//           <div className="flex gap-2">
//             <select 
//               value={timeframe}
//               onChange={(e) => setTimeframe(e.target.value)}
//               className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="year">Yearly</option>
//               <option value="quarter">Quarterly</option>
//               <option value="month">Monthly</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
//           <div className="flex flex-col">
//             <p className="text-sm text-blue-600 mb-1">Total Revenue</p>
//             <p className="text-2xl font-bold text-blue-800">
//               ${totalRevenue.toLocaleString()}
//             </p>
//           </div>
//         </div>
        
//         <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
//           <div className="flex flex-col">
//             <p className="text-sm text-green-600 mb-1">Total Orders</p>
//             <p className="text-2xl font-bold text-green-800">
//               {totalOrders.toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="bg-white p-4 rounded-lg border border-gray-200">
//         <div className="h-[400px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               data={analysisData}
//               margin={{
//                 top: 20,
//                 right: 30,
//                 left: 20,
//                 bottom: 20,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
//               <XAxis 
//                 dataKey="month" 
//                 tick={{ fill: '#666' }}
//                 tickLine={{ stroke: '#666' }}
//               />
//               <YAxis 
//                 yAxisId="left"
//                 tick={{ fill: '#666' }}
//                 tickLine={{ stroke: '#666' }}
//                 axisLine={{ stroke: '#666' }}
//                 label={{ 
//                   value: 'Revenue ($)', 
//                   angle: -90, 
//                   position: 'insideLeft',
//                   style: { textAnchor: 'middle', fill: '#666' }
//                 }}
//               />
//               <YAxis 
//                 yAxisId="right" 
//                 orientation="right"
//                 tick={{ fill: '#666' }}
//                 tickLine={{ stroke: '#666' }}
//                 axisLine={{ stroke: '#666' }}
//                 label={{ 
//                   value: 'Orders', 
//                   angle: 90, 
//                   position: 'insideRight',
//                   style: { textAnchor: 'middle', fill: '#666' }
//                 }}
//               />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend 
//                 wrapperStyle={{ 
//                   paddingTop: '20px'
//                 }}
//               />
//               <Line
//                 yAxisId="left"
//                 type="monotone"
//                 dataKey="revenue"
//                 name="Revenue"
//                 stroke="#3B82F6"
//                 strokeWidth={2}
//                 dot={{ fill: '#3B82F6', r: 4 }}
//                 activeDot={{ r: 6, stroke: '#2563EB' }}
//               />
//               <Line
//                 yAxisId="right"
//                 type="monotone"
//                 dataKey="orders"
//                 name="Orders"
//                 stroke="#10B981"
//                 strokeWidth={2}
//                 dot={{ fill: '#10B981', r: 4 }}
//                 activeDot={{ r: 6, stroke: '#059669' }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>


//         </div>
//   )
// }

// export default Dashboard







import React, { useState, useEffect } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('year');

  const { user } = useAuth();

  const formatCurrency = (amount) => {
    return parseFloat(amount || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, [timeframe]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to view dashboard');
        return;
      }

      const [dashboardResponse, ordersResponse] = await Promise.all([
        fetch(`${URL}/analytics/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${URL}/analytics/orders?period=${timeframe}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (!dashboardResponse.ok || !ordersResponse.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const dashboardData = await dashboardResponse.json();
      const ordersData = await ordersResponse.json();

      setStats(dashboardData.stats);
      setMonthlyRevenue(dashboardData.monthlyRevenue || []);
      setTopProducts(dashboardData.topProducts || []);
      setRecentOrders(dashboardData.recentOrders || []);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${URL}/products`);
      const data = await response.json();
      setStats(prev => ({ ...prev, totalProducts: data.pagination?.total || 0 }));
    } catch (err) {
      console.error('Error fetching products count:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setStats(prev => ({ ...prev, totalUsers: data.users?.length || 0 }));
    } catch (err) {
      console.error('Error fetching users count:', err);
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, bgColor }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <BsArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600 ml-1">{change}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full`} style={{ backgroundColor: bgColor }}>
          {Icon && <Icon className="h-6 w-6 text-white" />}
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">
            Revenue: ${payload[0]?.value?.toLocaleString() || 0}
          </p>
          <p className="text-green-600">
            Orders: {payload[1]?.value || 0}
          </p>
        </div>
      );
    }
    return null;
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.firstName || 'Admin'}!</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Sales"
            value={`₦${formatCurrency(stats.totalSales)}`}
            change={12.5}
            bgColor="#C9CC3F"
          />
          <MetricCard
            title="Total Revenue"
            value={`₦${formatCurrency(stats.totalSales)}`}
            change={8.2}
            bgColor="#B6D0E2"
          />
          <MetricCard
            title="Total Orders"
            value={stats.totalOrders?.toLocaleString() || 0}
            change={15.3}
            bgColor="#C1E1C1"
          />
          <MetricCard
            title="Total Users"
            value={stats.totalUsers?.toLocaleString() || 0}
            change={5.7}
            bgColor="#FFFFFF"
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Revenue vs Orders Analysis</h2>
            <div className="flex gap-2">
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="year">Yearly</option>
                <option value="month">Monthly</option>
                <option value="week">Weekly</option>
                <option value="day">Daily</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-blue-800">
                ₦{formatCurrency(monthlyRevenue.reduce((sum, item) => sum + (item.revenue || 0), 0))}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-green-800">
                {monthlyRevenue.reduce((sum, item) => sum + (item.orders || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#666' }}
                  tickLine={{ stroke: '#666' }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fill: '#666' }}
                  tickLine={{ stroke: '#666' }}
                  axisLine={{ stroke: '#666' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tick={{ fill: '#666' }}
                  tickLine={{ stroke: '#666' }}
                  axisLine={{ stroke: '#666' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  activeDot={{ r: 6, stroke: '#2563EB' }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 4 }}
                  activeDot={{ r: 6, stroke: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              {topProducts.length > 0 ? (
                topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={product.product?.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'} 
                          alt={product.product?.name || 'Product'} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.product?.name || 'Product Name'}</p>
                        <p className="text-sm text-gray-600">{product.totalSold || 0} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₦{formatCurrency(product.totalRevenue)}</p>
                      <p className="text-sm text-gray-600">₦{formatCurrency(product.product?.price)} each</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No sales data available</p>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">
                        {order.user?.firstName} {order.user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₦{formatCurrency(order.total)}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No recent orders</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-violet-500 text-white p-4 rounded-lg hover:bg-violet-600 transition-colors">
            <h4 className="font-semibold">Add Product</h4>
            <p className="text-sm opacity-90">Create new product</p>
          </button>
          <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
            <h4 className="font-semibold">Manage Orders</h4>
            <p className="text-sm opacity-90">View all orders</p>
          </button>
          <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
            <h4 className="font-semibold">View Users</h4>
            <p className="text-sm opacity-90">Manage customers</p>
          </button>
          <button className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-colors">
            <h4 className="font-semibold">Reports</h4>
            <p className="text-sm opacity-90">Generate reports</p>
          </button>
        </div>
      </div>
    </div>
  );
}