//components/admin/AnalyticsContent.jsx

import { useState, useEffect } from "react";
import { TrendingUp, BarChart3 } from 'lucide-react';
import { URL } from '../../url';
import PieChart from './PieChart';
import BarChart from './BarChart';

export default function AnalyticsContent({ data, getFetchOptions }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount) => {
    return parseFloat(amount || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const fetchAnalytics = async (selectedPeriod = period) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/analytics/orders?period=${selectedPeriod}`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  // Prepare pie chart data for revenue distribution by category
  const revenueDistributionData = analyticsData?.revenueDistribution?.map(item => {
    // Handle both possible data structures from backend
    const categoryName = item.product?.category?.name || item['product.category.name'] || 'Uncategorized';
    const revenue = parseFloat(item.revenue || 0);

    return {
      label: categoryName,
      value: revenue
    };
  }).filter(item => item.value > 0) || [];

  console.log('Analytics Data:', analyticsData);
  console.log('Revenue Distribution Data:', revenueDistributionData);
  console.log('Analytics for BarChart:', analyticsData?.analytics);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your store performance and insights</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPeriod('day')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${period === 'day' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              Daily
            </button>
            <button
              onClick={() => setPeriod('week')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${period === 'week' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${period === 'month' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('3months')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${period === '3months' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              3 Months
            </button>
            <button
              onClick={() => setPeriod('6months')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${period === '6months' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              6 Months
            </button>
            <button
              onClick={() => setPeriod('year')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${period === 'year' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          {analyticsData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      ₦{formatCurrency(analyticsData.analytics?.reduce((sum, item) => sum + parseFloat(item.revenue || 0), 0))}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {analyticsData.analytics?.reduce((sum, item) => sum + parseInt(item.orders || 0), 0).toLocaleString() || '0'}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-sky-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-sky-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Order Value</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      ₦{analyticsData.analytics && analyticsData.analytics.length > 0
                        ? formatCurrency(analyticsData.analytics.reduce((sum, item) => sum + parseFloat(item.revenue || 0), 0) /
                          analyticsData.analytics.reduce((sum, item) => sum + parseInt(item.orders || 0), 0) || 0)
                        : '0.00'
                      }
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Analytics Bar Chart */}
          <BarChart
            data={analyticsData?.analytics || []}
            title={`Revenue Analytics (${period === '3months' ? '3 Months' : period === '6months' ? '6 Months' : period.charAt(0).toUpperCase() + period.slice(1)})`}
            period={period}
          />

          {/* Revenue Distribution Pie Chart */}
          {revenueDistributionData.length > 0 && (
            <PieChart
              data={revenueDistributionData}
              title={`Revenue Distribution by Category (${period === '3months' ? '3 Months' : period === '6months' ? '6 Months' : period.charAt(0).toUpperCase() + period.slice(1)})`}
            />
          )}

          {/* Top Products Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Top Products
            </h2>
            <div className="space-y-4">
              {data?.topProducts?.slice(0, 5).map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                      <span className="text-sky-600 font-medium text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.product?.name || 'Product Name'}
                      </p>
                      <p className="text-xs text-gray-600">{product.totalSold} sales</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ₦{formatCurrency(product.totalRevenue)}
                  </span>
                </div>
              )) || (
                  <p className="text-sm text-gray-500">No product data available</p>
                )}
            </div>
          </div>

          {/* Order Status Distribution */}
          {data?.revenueByStatus && data.revenueByStatus.length > 0 && (
            <PieChart
              data={data.revenueByStatus.map(item => ({
                label: item.status.charAt(0).toUpperCase() + item.status.slice(1),
                value: item.revenue || 0
              }))}
              title="Revenue by Order Status"
            />
          )}
        </div>
        </>
      )}
    </>
  );
}
