import React from 'react';
import { 
  DollarSign, ShoppingCart, Users, Package, ArrowUp, ArrowDown, 
  TrendingUp, BarChart3, PieChart as PieChartIcon 
} from 'lucide-react';

// Simple Pie Chart Component
function PieChart({ data, title }) {
  const total = data.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);
  
  const colors = [
    '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#f97316', '#06b6d4', '#84cc16', '#ec4899', '#6366f1'
  ];

  let cumulativePercentage = 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <PieChartIcon className="h-5 w-5 mr-2 text-sky-500" />
        {title}
      </h3>
      
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const percentage = (parseFloat(item.value || 0) / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors[index % colors.length]}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">₦{total.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">
                ₦{parseFloat(item.value || 0).toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">
                ({((parseFloat(item.value || 0) / total) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardContent({ data, loading, getStatusColor, products }) {
  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  const { stats, monthlyRevenue, topProducts, recentOrders, revenueByStatus, categoryRevenue } = data;

  const statsData = [
    {
      title: 'Total Revenue',
      value: `₦${stats?.totalSales?.toLocaleString() || '0'}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders?.toLocaleString() || '0',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers?.toLocaleString() || '0',
      change: '+23.1%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Products',
      value: products?.length?.toString() || '0',
      change: '-2.4%',
      trend: 'down',
      icon: Package,
      color: 'bg-orange-500'
    }
  ];

  // Prepare pie chart data
  const revenueChartData = categoryRevenue?.map(item => ({
    label: item.product?.category?.name || 'Other',
    value: item.revenue || 0
  })) || [];

  const statusChartData = revenueByStatus?.map(item => ({
    label: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    value: item.revenue || 0
  })) || [];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <th className="px-6 py-3 font-medium">Order ID</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Amount</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders?.slice(0, 5).map((order, index) => (
                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.orderNumber || `#${order.id}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        ₦{parseFloat(order.total || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  )) || (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No recent orders found
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-3">
              {topProducts?.slice(0, 3).map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.product?.name || 'Product Name'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {product.totalSold} sales
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ₦{parseFloat(product.totalRevenue || 0).toFixed(2)}
                  </span>
                </div>
              )) || (
                  <p className="text-sm text-gray-500">No data available</p>
                )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Monthly Revenue</h2>
              <BarChart3 className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-3">
              {monthlyRevenue?.slice(-3).map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {new Date(month.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₦{parseFloat(month.revenue || 0).toFixed(2)}
                  </span>
                </div>
              )) || (
                  <p className="text-sm text-gray-500">No revenue data available</p>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Distribution Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {revenueChartData.length > 0 && (
          <PieChart 
            data={revenueChartData} 
            title="Revenue by Category"
          />
        )}
        
        {statusChartData.length > 0 && (
          <PieChart 
            data={statusChartData} 
            title="Revenue by Order Status"
          />
        )}
      </div>
    </>
  );
}