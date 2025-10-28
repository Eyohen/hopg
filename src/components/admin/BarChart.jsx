// components/admin/BarChart.jsx
import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function BarChart({ data, title, period }) {
  console.log('BarChart Component Rendered');
  console.log('BarChart Data:', data);
  console.log('BarChart Title:', title);
  console.log('BarChart Period:', period);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-sky-500" />
          {title}
        </h3>
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-gray-500">
            No data available for this period
            {data !== undefined && ` (Data received but empty: ${data.length} items)`}
          </p>
        </div>
      </div>
    );
  }

  // Find the maximum revenue to scale the bars
  const maxRevenue = Math.max(...data.map(item => parseFloat(item.revenue || 0)));

  // Format date based on period
  const formatLabel = (dateString) => {
    const date = new Date(dateString);

    switch (period) {
      case 'day':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case 'week':
        return `Week ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      case 'month':
      case '3months':
      case '6months':
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      case 'year':
        return date.getFullYear().toString();
      default:
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2 text-sky-500" />
        {title}
      </h3>

      {/* Bar Chart */}
      <div className="space-y-4">
        {data.map((item, index) => {
          const revenue = parseFloat(item.revenue || 0);
          const percentage = maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0;

          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600">
                  {formatLabel(item.period)}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {item.orders} order{item.orders !== 1 ? 's' : ''}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₦{revenue.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg transition-all duration-500 ease-out group-hover:from-sky-600 group-hover:to-sky-700"
                  style={{ width: `${percentage}%` }}
                >
                  {percentage > 15 && (
                    <div className="flex items-center justify-end h-full pr-3">
                      <span className="text-xs font-medium text-white">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
                {percentage <= 15 && percentage > 0 && (
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="text-xs font-medium text-gray-600">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Total Revenue</p>
            <p className="text-sm font-bold text-gray-900">
              ₦{data.reduce((sum, item) => sum + parseFloat(item.revenue || 0), 0).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Total Orders</p>
            <p className="text-sm font-bold text-gray-900">
              {data.reduce((sum, item) => sum + parseInt(item.orders || 0), 0).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Avg per Period</p>
            <p className="text-sm font-bold text-gray-900">
              ₦{(data.reduce((sum, item) => sum + parseFloat(item.revenue || 0), 0) / data.length).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
