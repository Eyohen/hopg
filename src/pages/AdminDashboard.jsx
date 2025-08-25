// import React, { useState, useEffect } from 'react';
// import {
//   LayoutDashboard, Package, ShoppingCart, Users, DollarSign,
//   TrendingUp, Settings, Bell, Search, Menu, X, ChevronDown,
//   BarChart3, Calendar, AlertCircle, CheckCircle, Clock,
//   Eye, Edit, Trash2, Plus, Filter, Download, ArrowUp,
//   ArrowDown, MoreVertical, Star, Truck, ArrowRight, PieChart as PieChartIcon
// } from 'lucide-react';
// import { URL } from '../url';

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [dashboardData, setDashboardData] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const getAuthToken = () => {
//     return localStorage.getItem('token');
//   };

//   const getFetchOptions = (method = 'GET', body = null) => {
//     const options = {
//       method,
//       headers: {
//         'Authorization': `Bearer ${getAuthToken()}`,
//         'Content-Type': 'application/json'
//       }
//     };

//     if (body) {
//       options.body = JSON.stringify(body);
//     }

//     return options;
//   };

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${URL}/api/analytics/dashboard`, getFetchOptions());
//       if (response.ok) {
//         const data = await response.json();
//         setDashboardData(data);
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`${URL}/api/products?limit=50`, getFetchOptions());
//       if (response.ok) {
//         const data = await response.json();
//         setProducts(data.products || []);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch(`${URL}/api/orders?limit=50`, getFetchOptions());
//       if (response.ok) {
//         const data = await response.json();
//         setOrders(data.orders || []);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(`${URL}/api/user/readall`, getFetchOptions());
//       if (response.ok) {
//         const data = await response.json();
//         setUsers(data.users || []);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setUsers([]);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(`${URL}/api/categories`, getFetchOptions());
//       if (response.ok) {
//         const data = await response.json();
//         setCategories(data.categories || []);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//     fetchProducts();
//     fetchOrders();
//     fetchUsers();
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     switch (activeTab) {
//       case 'dashboard':
//         fetchDashboardData();
//         break;
//       case 'products':
//         fetchProducts();
//         break;
//       case 'orders':
//         fetchOrders();
//         break;
//       case 'customers':
//         fetchUsers();
//         break;
//       default:
//         break;
//     }
//   }, [activeTab]);

//   const navigationItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'products', label: 'Products', icon: Package },
//     { id: 'orders', label: 'Orders', icon: ShoppingCart },
//     { id: 'customers', label: 'Customers', icon: Users },
//     { id: 'analytics', label: 'Analytics', icon: BarChart3 },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'delivered': return 'bg-green-100 text-green-800';
//       case 'shipped': return 'bg-blue-100 text-blue-800';
//       case 'processing': return 'bg-yellow-100 text-yellow-800';
//       case 'pending': return 'bg-gray-100 text-gray-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <DashboardContent
//           data={dashboardData}
//           loading={loading}
//           getStatusColor={getStatusColor}
//           products={products}
//         />;
//       case 'products':
//         return <ProductsContent
//           products={products}
//           categories={categories}
//           fetchProducts={fetchProducts}
//           getFetchOptions={getFetchOptions}
//         />;
//       case 'orders':
//         return <OrdersContent
//           orders={orders}
//           getStatusColor={getStatusColor}
//           fetchOrders={fetchOrders}
//           getFetchOptions={getFetchOptions}
//         />;
//       case 'customers':
//         return <CustomersContent
//           users={users}
//           fetchUsers={fetchUsers}
//           getFetchOptions={getFetchOptions}
//         />;
//       case 'analytics':
//         return <AnalyticsContent
//           data={dashboardData}
//           getFetchOptions={getFetchOptions}
//         />;
//       case 'settings':
//         return <SettingsContent />;
//       default:
//         return <DashboardContent
//           data={dashboardData}
//           loading={loading}
//           getStatusColor={getStatusColor}
//           products={products}
//         />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
//         <div className="flex items-center justify-between h-16 px-4">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 rounded-lg hover:bg-gray-100"
//             >
//               <Menu className="h-5 w-5" />
//             </button>
//             <div className="flex items-center space-x-2">
//               <div className="bg-sky-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
//                 HOPG
//               </div>
//               <span className="text-sm text-gray-600 font-medium">Admin</span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="relative hidden md:block">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-sky-500"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>

//             <button className="relative p-2 rounded-lg hover:bg-gray-100">
//               <Bell className="h-5 w-5 text-gray-600" />
//               <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//             </button>

//             <div className="relative">
//               <button
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//                 className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <div className="h-8 w-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-medium">
//                   A
//                 </div>
//                 <ChevronDown className="h-4 w-4 text-gray-600" />
//               </button>

//               {showUserMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
//                   <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
//                   <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</button>
//                   <div className="my-1 border-t border-gray-200"></div>
//                   <button
//                     onClick={() => {
//                       localStorage.removeItem('token');
//                       localStorage.removeItem('user');
//                       window.location.href = '/admin-login';
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="flex pt-16">
//         <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed left-0 top-16 bottom-0 overflow-y-auto`}>
//           <nav className="p-4 space-y-1">
//             {navigationItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveTab(item.id)}
//                 className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.id
//                     ? 'bg-sky-50 text-sky-600'
//                     : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//               >
//                 <item.icon className="h-5 w-5 flex-shrink-0" />
//                 {sidebarOpen && <span className="font-medium">{item.label}</span>}
//               </button>
//             ))}
//           </nav>
//         </aside>

//         <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
//           <div className="p-6">
//             {renderContent()}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// // Simple Pie Chart Component
// function PieChart({ data, title }) {
//   const total = data.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);

//   const colors = [
//     '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
//     '#f97316', '#06b6d4', '#84cc16', '#ec4899', '#6366f1'
//   ];

//   let cumulativePercentage = 0;

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//         <PieChartIcon className="h-5 w-5 mr-2 text-sky-500" />
//         {title}
//       </h3>

//       <div className="flex items-center justify-center">
//         <div className="relative w-48 h-48">
//           <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
//             {data?.map((item, index) => {
//               const percentage = (parseFloat(item.value || 0) / total) * 100;
//               const strokeDasharray = `${percentage} ${100 - percentage}`;
//               const strokeDashoffset = -cumulativePercentage;

//               cumulativePercentage += percentage;

//               return (
//                 <circle
//                   key={index}
//                   cx="50"
//                   cy="50"
//                   r="40"
//                   fill="transparent"
//                   stroke={colors[index % colors.length]}
//                   strokeWidth="8"
//                   strokeDasharray={strokeDasharray}
//                   strokeDashoffset={strokeDashoffset}
//                   className="transition-all duration-300"
//                 />
//               );
//             })}
//           </svg>

//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-gray-900">₦{total.toLocaleString()}</div>
//               <div className="text-sm text-gray-600">Total</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 space-y-2">
//         {data.map((item, index) => (
//           <div key={index} className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div 
//                 className="w-3 h-3 rounded-full" 
//                 style={{ backgroundColor: colors[index % colors.length] }}
//               />
//               <span className="text-sm text-gray-600">{item.label}</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <span className="text-sm font-medium text-gray-900">
//                 ₦{parseFloat(item.value || 0).toLocaleString()}
//               </span>
//               <span className="text-xs text-gray-500">
//                 ({((parseFloat(item.value || 0) / total) * 100).toFixed(1)}%)
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function DashboardContent({ data, loading, getStatusColor, products }) {
//   if (loading || !data) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
//       </div>
//     );
//   }

//   const { stats, monthlyRevenue, topProducts, recentOrders, revenueByStatus, categoryRevenue } = data;

//   const statsData = [
//     {
//       title: 'Total Revenue',
//       value: `₦${stats?.totalSales?.toLocaleString() || '0'}`,
//       change: '+12.5%',
//       trend: 'up',
//       icon: DollarSign,
//       color: 'bg-green-500'
//     },
//     {
//       title: 'Total Orders',
//       value: stats?.totalOrders?.toLocaleString() || '0',
//       change: '+8.2%',
//       trend: 'up',
//       icon: ShoppingCart,
//       color: 'bg-blue-500'
//     },
//     {
//       title: 'Total Users',
//       value: stats?.totalUsers?.toLocaleString() || '0',
//       change: '+23.1%',
//       trend: 'up',
//       icon: Users,
//       color: 'bg-purple-500'
//     },
//     {
//       title: 'Active Products',
//       value: products?.length?.toString() || '0',
//       change: '-2.4%',
//       trend: 'down',
//       icon: Package,
//       color: 'bg-orange-500'
//     }
//   ];

//   // Prepare pie chart data
//   const revenueChartData = categoryRevenue?.map(item => ({
//     label: item.product?.category?.name || 'Other',
//     value: item.revenue || 0
//   })) || [];

//   const statusChartData = revenueByStatus?.map(item => ({
//     label: item.status.charAt(0).toUpperCase() + item.status.slice(1),
//     value: item.revenue || 0
//   })) || [];

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
//         <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {statsData.map((stat, index) => (
//           <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className={`${stat.color} p-3 rounded-lg`}>
//                 <stat.icon className="h-6 w-6 text-white" />
//               </div>
//               <span className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                 {stat.change}
//                 {stat.trend === 'up' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />}
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
//             <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8 mb-8">
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100">
//               <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
//               <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">View All</button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
//                     <th className="px-6 py-3 font-medium">Order ID</th>
//                     <th className="px-6 py-3 font-medium">Customer</th>
//                     <th className="px-6 py-3 font-medium">Status</th>
//                     <th className="px-6 py-3 font-medium">Amount</th>
//                     <th className="px-6 py-3 font-medium">Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentOrders?.slice(0, 5).map((order, index) => (
//                     <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                         {order.orderNumber || `#${order.id}`}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'N/A'}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                         ₦{parseFloat(order.total || 0).toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   )) || (
//                       <tr>
//                         <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
//                           No recent orders found
//                         </td>
//                       </tr>
//                     )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-8">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
//               <TrendingUp className="h-5 w-5 text-green-500" />
//             </div>
//             <div className="space-y-3">
//               {topProducts?.slice(0, 3).map((product, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {product.product?.name || 'Product Name'}
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       {product.totalSold} sales
//                     </p>
//                   </div>
//                   <span className="text-sm font-semibold text-gray-900">
//                     ₦{parseFloat(product.totalRevenue || 0).toFixed(2)}
//                   </span>
//                 </div>
//               )) || (
//                   <p className="text-sm text-gray-500">No data available</p>
//                 )}
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-900">Monthly Revenue</h2>
//               <BarChart3 className="h-5 w-5 text-blue-500" />
//             </div>
//             <div className="space-y-3">
//               {monthlyRevenue?.slice(-3).map((month, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">
//                     {new Date(month.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
//                   </span>
//                   <span className="text-sm font-semibold text-gray-900">
//                     ₦{parseFloat(month.revenue || 0).toFixed(2)}
//                   </span>
//                 </div>
//               )) || (
//                   <p className="text-sm text-gray-500">No revenue data available</p>
//                 )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Revenue Distribution Charts */}
//       <div className="grid lg:grid-cols-2 gap-8">
//         {revenueChartData.length > 0 && (
//           <PieChart 
//             data={revenueChartData} 
//             title="Revenue by Category"
//           />
//         )}

//         {statusChartData.length > 0 && (
//           <PieChart 
//             data={statusChartData} 
//             title="Revenue by Order Status"
//           />
//         )}
//       </div>
//     </>
//   );
// }

// function OrdersContent({ orders, getStatusColor, fetchOrders, getFetchOptions }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const itemsPerPage = 5;

//   const filteredOrders = orders.filter(order =>
//     order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const response = await fetch(`${URL}/api/orders/${orderId}/status`, getFetchOptions('PUT', { status: newStatus }));
//       if (response.ok) {
//         fetchOrders();
//       } else {
//         alert('Failed to update order status');
//       }
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Failed to update order status');
//     }
//   };

//   const exportOrders = () => {
//     const csvContent = [
//       ['Order ID', 'Customer Name', 'Email', 'Date', 'Status', 'Total (₦)'],
//       ...filteredOrders.map(order => [
//         order.orderNumber || `#${order.id}`,
//         order.user ? `${order.user.firstName} ${order.user.lastName}` : 'N/A',
//         order.user?.email || 'N/A',
//         new Date(order.createdAt).toLocaleDateString(),
//         order.status,
//         parseFloat(order.total || 0).toFixed(2)
//       ])
//     ].map(row => row.join(',')).join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <>
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
//             <p className="text-gray-600 mt-1">Manage and track all orders ({orders.length} orders)</p>
//           </div>
//           <button
//             onClick={exportOrders}
//             className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//           >
//             <Download className="h-4 w-4" />
//             <span>Export CSV</span>
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search orders..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr className="text-left text-sm text-gray-500">
//               <th className="px-6 py-4 font-medium">Order ID</th>
//               <th className="px-6 py-4 font-medium">Customer</th>
//               <th className="px-6 py-4 font-medium">Date</th>
//               <th className="px-6 py-4 font-medium">Status</th>
//               <th className="px-6 py-4 font-medium">Total</th>
//               <th className="px-6 py-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedOrders.length > 0 ? paginatedOrders.map((order) => (
//               <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="px-6 py-4 font-medium text-gray-900">
//                   {order.orderNumber || `#${order.id}`}
//                 </td>
//                 <td className="px-6 py-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest User'}
//                     </p>
//                     <p className="text-xs text-gray-500">{order.user?.email || 'No email'}</p>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4">
//                   <select
//                     value={order.status}
//                     onChange={(e) => updateOrderStatus(order.id, e.target.value)}
//                     className={`text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-sky-500 ${getStatusColor(order.status)}`}
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="processing">Processing</option>
//                     <option value="shipped">Shipped</option>
//                     <option value="delivered">Delivered</option>
//                     <option value="cancelled">Cancelled</option>
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                   ₦{parseFloat(order.total || 0).toFixed(2)}
//                 </td>
//                 <td className="px-6 py-4">
//                   <button className="p-2 hover:bg-gray-100 rounded">
//                     <Eye className="h-4 w-4 text-gray-600" />
//                   </button>
//                 </td>
//               </tr>
//             )) : (
//               <tr>
//                 <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                   {searchTerm ? 'No orders found matching your search' : 'No orders found'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="flex items-center justify-between mt-6">
//           <div className="text-sm text-gray-700">
//             Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Previous
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 border rounded-lg ${currentPage === i + 1
//                     ? 'bg-sky-500 text-white border-sky-500'
//                     : 'border-gray-300 hover:bg-gray-50'
//                   }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// function CustomersContent({ users, fetchUsers, getFetchOptions }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const itemsPerPage = 10;

//   const filteredUsers = users.filter(user =>
//     user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <>
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
//             <p className="text-gray-600 mt-1">Manage your customer base ({users.length} customers)</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search customers..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr className="text-left text-sm text-gray-500">
//               <th className="px-6 py-4 font-medium">Customer</th>
//               <th className="px-6 py-4 font-medium">Email</th>
//               <th className="px-6 py-4 font-medium">Phone</th>
//               <th className="px-6 py-4 font-medium">Orders</th>
//               <th className="px-6 py-4 font-medium">Total Spent</th>
//               <th className="px-6 py-4 font-medium">Role</th>
//               <th className="px-6 py-4 font-medium">Joined</th>
//               <th className="px-6 py-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
//               <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="h-10 w-10 bg-sky-100 rounded-full flex items-center justify-center">
//                       <span className="text-sky-600 font-medium">
//                         {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//                       </span>
//                     </div>
//                     <span className="font-medium text-gray-900">
//                       {user.firstName} {user.lastName}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{user.phone || 'N/A'}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{user.totalOrders || 0}</td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                   ₦{(user.totalSpent || 0).toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
//                     }`}>
//                     {user.isAdmin ? 'Admin' : 'Customer'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   {new Date(user.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-2">
//                     <button className="p-1 hover:bg-gray-100 rounded">
//                       <Eye className="h-4 w-4 text-gray-600" />
//                     </button>
//                     <button className="p-1 hover:bg-gray-100 rounded">
//                       <Edit className="h-4 w-4 text-gray-600" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             )) : (
//               <tr>
//                 <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
//                   {searchTerm ? 'No customers found matching your search' : 'No customers found'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="flex items-center justify-between mt-6">
//           <div className="text-sm text-gray-700">
//             Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} customers
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Previous
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 border rounded-lg ${currentPage === i + 1
//                     ? 'bg-sky-500 text-white border-sky-500'
//                     : 'border-gray-300 hover:bg-gray-50'
//                   }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// function AnalyticsContent({ data, getFetchOptions }) {
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [period, setPeriod] = useState('month');
//   const [loading, setLoading] = useState(false);

//   const fetchAnalytics = async (selectedPeriod = period) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${URL}/api/analytics/orders?period=${selectedPeriod}`, getFetchOptions());
//       if (response.ok) {
//         const data = await response.json();
//         setAnalyticsData(data);
//       }
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();
//   }, [period]);

//   // Prepare pie chart data for revenue distribution
//   const revenueDistributionData = analyticsData?.revenueDistribution?.map(item => ({
//     label: item.product?.category?.name || 'Other',
//     value: item.revenue || 0
//   })) || [];

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
//         <p className="text-gray-600 mt-1">Track your store performance and insights</p>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setPeriod('day')}
//               className={`px-4 py-2 text-sm font-medium rounded-lg ${period === 'day' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//             >
//               Daily
//             </button>
//             <button
//               onClick={() => setPeriod('week')}
//               className={`px-4 py-2 text-sm font-medium rounded-lg ${period === 'week' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//             >
//               Weekly
//             </button>
//             <button
//               onClick={() => setPeriod('month')}
//               className={`px-4 py-2 text-sm font-medium rounded-lg ${period === 'month' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//             >
//               Monthly
//             </button>
//             <button
//               onClick={() => setPeriod('3months')}
//               className={`px-4 py-2 text-sm font-medium rounded-lg ${period === '3months' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//             >
//               3 Months
//             </button>
//             <button
//               onClick={() => setPeriod('6months')}
//               className={`px-4 py-2 text-sm font-medium rounded-lg ${period === '6months' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//             >
//               6 Months
//             </button>
//             <button
//               onClick={() => setPeriod('year')}
//               className={`px-4 py-2 text-sm font-medium rounded-lg ${period === 'year' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//             >
//               Yearly
//             </button>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
//         </div>
//       ) : (
//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <BarChart3 className="h-5 w-5 mr-2 text-sky-500" />
//               Revenue Analytics ({period === '3months' ? '3 Months' : period === '6months' ? '6 Months' : period})
//             </h2>
//             <div className="space-y-4">
//               {analyticsData?.analytics?.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {new Date(item.period).toLocaleDateString()}
//                     </p>
//                     <p className="text-xs text-gray-600">{item.orders} orders</p>
//                   </div>
//                   <span className="text-sm font-semibold text-gray-900">
//                     ₦{parseFloat(item.revenue || 0).toLocaleString()}
//                   </span>
//                 </div>
//               )) || (
//                   <p className="text-sm text-gray-500">No analytics data available for this period</p>
//                 )}
//             </div>
//           </div>

//           {/* Revenue Distribution Pie Chart */}
//           {revenueDistributionData.length > 0 && (
//             <PieChart 
//               data={revenueDistributionData} 
//               title={`Revenue Distribution by Category (${period === '3months' ? '3 Months' : period === '6months' ? '6 Months' : period})`}
//             />
//           )}

//           {/* Top Products Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
//               Top Products
//             </h2>
//             <div className="space-y-4">
//               {data?.topProducts?.slice(0, 5).map((product, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
//                       <span className="text-sky-600 font-medium text-sm">#{index + 1}</span>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">
//                         {product.product?.name || 'Product Name'}
//                       </p>
//                       <p className="text-xs text-gray-600">{product.totalSold} sales</p>
//                     </div>
//                   </div>
//                   <span className="text-sm font-semibold text-gray-900">
//                     ₦{parseFloat(product.totalRevenue || 0).toLocaleString()}
//                   </span>
//                 </div>
//               )) || (
//                   <p className="text-sm text-gray-500">No product data available</p>
//                 )}
//             </div>
//           </div>

//           {/* Order Status Distribution */}
//           {data?.revenueByStatus && data.revenueByStatus.length > 0 && (
//             <PieChart 
//               data={data.revenueByStatus.map(item => ({
//                 label: item.status.charAt(0).toUpperCase() + item.status.slice(1),
//                 value: item.revenue || 0
//               }))} 
//               title="Revenue by Order Status"
//             />
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// function ProductsContent({ products, categories, fetchProducts, getFetchOptions }) {
//   const [showAddProduct, setShowAddProduct] = useState(false);
//   const [showEditProduct, setShowEditProduct] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const itemsPerPage = 5;

//   const filteredProducts = products.filter(product =>
//     product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         const response = await fetch(`${URL}/api/products/${productId}`, getFetchOptions('DELETE'));
//         if (response.ok) {
//           fetchProducts();
//           if (paginatedProducts.length === 1 && currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//           }
//         } else {
//           alert('Failed to delete product');
//         }
//       } catch (error) {
//         console.error('Error deleting product:', error);
//         alert('Failed to delete product');
//       }
//     }
//   };

//   return (
//     <>
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//             <p className="text-gray-600 mt-1">Manage your product inventory ({products.length} products)</p>
//           </div>
//           <button
//             onClick={() => setShowAddProduct(true)}
//             className="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Product</span>
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//           <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
//             <option>All Categories</option>
//             {categories.map(category => (
//               <option key={category.id} value={category.id}>{category.name}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr className="text-left text-sm text-gray-500">
//               <th className="px-6 py-4 font-medium">Product</th>
//               <th className="px-6 py-4 font-medium">Category</th>
//               <th className="px-6 py-4 font-medium">Price</th>
//               <th className="px-6 py-4 font-medium">Stock</th>
//               <th className="px-6 py-4 font-medium">Status</th>
//               <th className="px-6 py-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
//               <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-3">
//                     <img
//                       src={product.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'}
//                       alt={product.name}
//                       className="h-10 w-10 rounded-lg object-cover"
//                     />
//                     <span className="font-medium text-gray-900">{product.name}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   {product.category?.name || 'No Category'}
//                 </td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                   ₦{parseFloat(product.price || 0).toFixed(2)}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   {product.stockQuantity || 0}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                     {product.isActive ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-2">
//                     <button className="p-1 hover:bg-gray-100 rounded">
//                       <Eye className="h-4 w-4 text-gray-600" />
//                     </button>
//                     <button
//                       onClick={() => {
//                         setEditingProduct(product);
//                         setShowEditProduct(true);
//                       }}
//                       className="p-1 hover:bg-gray-100 rounded"
//                     >
//                       <Edit className="h-4 w-4 text-gray-600" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteProduct(product.id)}
//                       className="p-1 hover:bg-gray-100 rounded"
//                     >
//                       <Trash2 className="h-4 w-4 text-red-600" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             )) : (
//               <tr>
//                 <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                   {searchTerm ? 'No products found matching your search' : 'No products found'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="flex items-center justify-between mt-6">
//           <div className="text-sm text-gray-700">
//             Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Previous
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 border rounded-lg ${currentPage === i + 1
//                     ? 'bg-sky-500 text-white border-sky-500'
//                     : 'border-gray-300 hover:bg-gray-50'
//                   }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// function SettingsContent() {
//   const [activeSettingsTab, setActiveSettingsTab] = useState('general');

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//         <p className="text-gray-600 mt-1">Manage your store settings and preferences</p>
//       </div>

//       <div className="grid lg:grid-cols-4 gap-8">
//         <div className="lg:col-span-1">
//           <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
//             {[
//               { id: 'general', label: 'General', icon: Settings },
//               { id: 'shipping', label: 'Shipping', icon: Truck },
//               { id: 'payments', label: 'Payments', icon: DollarSign },
//               { id: 'notifications', label: 'Notifications', icon: Bell },
//               { id: 'users', label: 'Users & Permissions', icon: Users }
//             ].map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveSettingsTab(item.id)}
//                 className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeSettingsTab === item.id
//                     ? 'bg-sky-50 text-sky-600'
//                     : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//               >
//                 <item.icon className="h-4 w-4" />
//                 <span className="text-sm font-medium">{item.label}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             {activeSettingsTab === 'general' && (
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
//                     <input
//                       type="email"
//                       defaultValue="support@hopg.com"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
//                     <textarea
//                       rows="3"
//                       defaultValue="Home of protein goodies is a hub for all healthy goodies. Fuel your fitness journey with premium supplements."
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
//                     ></textarea>
//                   </div>

//                   <div className="pt-4">
//                     <button type="submit" className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600">
//                       Save Changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
















import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Package, ShoppingCart, Users, DollarSign,
  TrendingUp, Settings, Bell, Search, Menu, X, ChevronDown,
  BarChart3, Calendar, AlertCircle, CheckCircle, Clock,
  Eye, Edit, Trash2, Plus, Filter, Download, ArrowUp,
  ArrowDown, MoreVertical, Star, Truck, ArrowRight, Tag, Award
} from 'lucide-react';
import { URL } from '../url';

// Import page components
import DashboardContent from '../components/admin/DashboardContent';
import ProductsContent from '../components/admin/ProductsContent';
import OrdersContent from '../components/admin/OrdersContent';
import CustomersContent from '../components/admin/CustomersContent';
import AnalyticsContent from '../components/admin/AnalyticsContent';
import SettingsContent from '../components/admin/SettingsContent';
import DiscountManagement from '../components/admin/DiscountManagement';
import BrandsManagement from '../components/admin/BrandsManagement'; 

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
 const [brands, setBrands] = useState([]);

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const getFetchOptions = (method = 'GET', body = null) => {
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return options;
  };

  //  const fetchBrands = async () => {
  //   try {
  //     const response = await fetch(`${URL}/api/brands?includeInactive=true`, getFetchOptions());
  //     if (response.ok) {
  //       const data = await response.json();
  //       setBrands(data.brands || []);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching brands:', error);
  //   }
  // };
  const fetchBrands = async () => {
    try {
      const response = await fetch(`${URL}/api/brands?includeInactive=true`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        console.log('Brands data:', data); // Debug log
        setBrands(data.brands || []);
      } else {
        console.error('Failed to fetch brands:', response.status);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/analytics/dashboard`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch(`${URL}/api/products?limit=50`, getFetchOptions());
  //     if (response.ok) {
  //       const data = await response.json();
  //       setProducts(data.products || []);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/products?limit=100`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        console.log('Products data:', data); // Debug log
        setProducts(data.products || []);
      } else {
        console.error('Failed to fetch products:', response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${URL}/api/orders?limit=50`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${URL}/api/user/readall`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  // const fetchCategories = async () => {
  //   try {
  //     const response = await fetch(`${URL}/api/categories`, getFetchOptions());
  //     if (response.ok) {
  //       const data = await response.json();
  //       setCategories(data.categories || []);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };
   const fetchCategories = async () => {
    try {
      const response = await fetch(`${URL}/api/categories`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        console.log('Categories data:', data); // Debug log
        setCategories(data.categories || []);
      } else {
        console.error('Failed to fetch categories:', response.status);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  useEffect(() => {
    fetchDashboardData();
    fetchProducts();
    fetchOrders();
    fetchUsers();
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    switch (activeTab) {
      case 'dashboard':
        fetchDashboardData();
        break;
      case 'products':
        fetchProducts();
           fetchCategories();
        fetchBrands(); // Fetch brands when products tab is active
        break;
      case 'orders':
        fetchOrders();
        break;
      case 'customers':
        fetchUsers();
        break;
          case 'brands':
        fetchBrands();
        break;
      default:
        break;
    }
  }, [activeTab]);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
       { id: 'brands', label: 'Brands', icon: Award }, 
    { id: 'discounts', label: 'Discounts', icon: Tag },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderContent = () => {
    const commonProps = {
      getFetchOptions,
      getStatusColor
    };

    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent
          data={dashboardData}
          loading={loading}
          products={products}
          {...commonProps}
        />;
      case 'products':
        return <ProductsContent
          products={products}
          categories={categories}
           brands={brands} 
          fetchProducts={fetchProducts}
          {...commonProps}
        />;
      case 'orders':
        return <OrdersContent
          orders={orders}
          fetchOrders={fetchOrders}
          {...commonProps}
        />;
      case 'customers':
        return <CustomersContent
          users={users}
          fetchUsers={fetchUsers}
          {...commonProps}
        />;
         case 'brands': // Add this case
        return <BrandsManagement {...commonProps} />;
      case 'discounts': // Add this case
        return <DiscountManagement {...commonProps} />;
      case 'analytics':
        return <AnalyticsContent
          data={dashboardData}
          {...commonProps}
        />;
      case 'settings':
        return <SettingsContent {...commonProps} />;
      default:
        return <DashboardContent
          data={dashboardData}
          loading={loading}
          products={products}
          {...commonProps}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-sky-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
                HOPG
              </div>
              <span className="text-sm text-gray-600 font-medium">Admin</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="h-8 w-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-medium">
                  A
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</button>
                  <div className="my-1 border-t border-gray-200"></div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.href = '/admin-login';
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed left-0 top-16 bottom-0 overflow-y-auto`}>
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.id
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}