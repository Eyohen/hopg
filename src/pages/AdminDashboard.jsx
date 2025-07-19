// import React, { useState } from 'react';
// import { 
//   LayoutDashboard, Package, ShoppingCart, Users, DollarSign, 
//   TrendingUp, Settings, Bell, Search, Menu, X, ChevronDown,
//   BarChart3, Calendar, AlertCircle, CheckCircle, Clock,
//   Eye, Edit, Trash2, Plus, Filter, Download, ArrowUp,
//   ArrowDown, MoreVertical, Star, Truck, ArrowRight
// } from 'lucide-react';

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   // Sample data
//   const stats = [
//     { 
//       title: 'Total Revenue', 
//       value: '$45,231', 
//       change: '+12.5%', 
//       trend: 'up',
//       icon: DollarSign,
//       color: 'bg-green-500'
//     },
//     { 
//       title: 'Orders Today', 
//       value: '28', 
//       change: '+8.2%', 
//       trend: 'up',
//       icon: ShoppingCart,
//       color: 'bg-blue-500'
//     },
//     { 
//       title: 'Active Products', 
//       value: '156', 
//       change: '-2.4%', 
//       trend: 'down',
//       icon: Package,
//       color: 'bg-purple-500'
//     },
//     { 
//       title: 'New Customers', 
//       value: '12', 
//       change: '+23.1%', 
//       trend: 'up',
//       icon: Users,
//       color: 'bg-orange-500'
//     }
//   ];

//   const recentOrders = [
//     { id: '#3241', customer: 'John Doe', date: '2 hours ago', status: 'processing', amount: '$89.99', items: 3 },
//     { id: '#3240', customer: 'Sarah Smith', date: '5 hours ago', status: 'shipped', amount: '$124.50', items: 2 },
//     { id: '#3239', customer: 'Mike Johnson', date: '1 day ago', status: 'delivered', amount: '$67.89', items: 1 },
//     { id: '#3238', customer: 'Emily Brown', date: '1 day ago', status: 'pending', amount: '$234.99', items: 5 },
//     { id: '#3237', customer: 'David Wilson', date: '2 days ago', status: 'delivered', amount: '$149.99', items: 4 }
//   ];

//   const topProducts = [
//     { name: 'Premium Whey Isolate', sales: 145, revenue: '$7,250', stock: 89 },
//     { name: 'Mass Gainer Pro', sales: 98, revenue: '$8,820', stock: 45 },
//     { name: 'Creatine Monohydrate', sales: 87, revenue: '$2,175', stock: 234 },
//     { name: 'Pre Workout Energy', sales: 76, revenue: '$2,660', stock: 12 },
//     { name: 'BCAA Complex', sales: 65, revenue: '$1,950', stock: 167 }
//   ];

//   const lowStockAlerts = [
//     { product: 'Pre Workout Energy', current: 12, reorder: 50 },
//     { product: 'Vanilla Protein Powder', current: 8, reorder: 30 },
//     { product: 'Energy Bars - Chocolate', current: 15, reorder: 100 }
//   ];

//   const navigationItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'products', label: 'Products', icon: Package },
//     { id: 'orders', label: 'Orders', icon: ShoppingCart },
//     { id: 'customers', label: 'Customers', icon: Users },
//     { id: 'analytics', label: 'Analytics', icon: BarChart3 },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'delivered': return 'bg-green-100 text-green-800';
//       case 'shipped': return 'bg-blue-100 text-blue-800';
//       case 'processing': return 'bg-yellow-100 text-yellow-800';
//       case 'pending': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <DashboardContent stats={stats} recentOrders={recentOrders} topProducts={topProducts} lowStockAlerts={lowStockAlerts} getStatusColor={getStatusColor} />;
//       case 'products':
//         return <ProductsContent />;
//       case 'orders':
//         return <OrdersContent getStatusColor={getStatusColor} />;
//       case 'customers':
//         return <CustomersContent />;
//       case 'analytics':
//         return <AnalyticsContent />;
//       case 'settings':
//         return <SettingsContent />;
//       default:
//         return <DashboardContent stats={stats} recentOrders={recentOrders} topProducts={topProducts} lowStockAlerts={lowStockAlerts} getStatusColor={getStatusColor} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
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
//               HOPG
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
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
//                   <hr className="my-1" />
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="flex pt-16">
//         {/* Sidebar */}
//         <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed left-0 top-16 bottom-0 overflow-y-auto`}>
//           <nav className="p-4 space-y-1">
//             {navigationItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveTab(item.id)}
//                 className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//                   activeTab === item.id 
//                     ? 'bg-sky-50 text-sky-600' 
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <item.icon className="h-5 w-5 flex-shrink-0" />
//                 {sidebarOpen && <span className="font-medium">{item.label}</span>}
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
//           <div className="p-6">
//             {renderContent()}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// // Dashboard Content Component
// function DashboardContent({ stats, recentOrders, topProducts, lowStockAlerts, getStatusColor }) {
//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
//         <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className={`${stat.color} p-3 rounded-lg`}>
//                 <stat.icon className="h-6 w-6 text-white" />
//               </div>
//               <span className={`flex items-center text-sm font-medium ${
//                 stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
//               }`}>
//                 {stat.change}
//                 {stat.trend === 'up' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />}
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
//             <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Recent Orders */}
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
//                   {recentOrders.map((order, index) => (
//                     <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.amount}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-8">
//           {/* Low Stock Alert */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
//               <AlertCircle className="h-5 w-5 text-orange-500" />
//             </div>
//             <div className="space-y-3">
//               {lowStockAlerts.map((alert, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">{alert.product}</p>
//                     <p className="text-xs text-gray-600">Current: {alert.current} | Reorder at: {alert.reorder}</p>
//                   </div>
//                   <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
//                     Reorder
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Top Products */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
//               <TrendingUp className="h-5 w-5 text-green-500" />
//             </div>
//             <div className="space-y-3">
//               {topProducts.slice(0, 3).map((product, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">{product.name}</p>
//                     <p className="text-xs text-gray-600">{product.sales} sales</p>
//                   </div>
//                   <span className="text-sm font-semibold text-gray-900">{product.revenue}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // Products Content Component
// function ProductsContent() {
//   const [showAddProduct, setShowAddProduct] = useState(false);

//   const products = [
//     { 
//       id: 1, 
//       name: 'Premium Whey Isolate', 
//       category: 'Whey Protein',
//       price: '$49.99',
//       stock: 89,
//       status: 'active',
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
//     },
//     { 
//       id: 2, 
//       name: 'Mass Gainer Pro', 
//       category: 'Mass Gainers',
//       price: '$89.99',
//       stock: 45,
//       status: 'active',
//       image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=100&h=100&fit=crop'
//     },
//     { 
//       id: 3, 
//       name: 'Creatine Monohydrate', 
//       category: 'Creatine',
//       price: '$24.99',
//       stock: 234,
//       status: 'active',
//       image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop'
//     },
//     { 
//       id: 4, 
//       name: 'Pre Workout Energy', 
//       category: 'Pre Workout',
//       price: '$34.99',
//       stock: 12,
//       status: 'low stock',
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
//     },
//     { 
//       id: 5, 
//       name: 'BCAA Complex', 
//       category: 'Amino Acids',
//       price: '$29.99',
//       stock: 167,
//       status: 'active',
//       image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop'
//     }
//   ];

//   return (
//     <>
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//             <p className="text-gray-600 mt-1">Manage your product inventory</p>
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

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//           <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
//             <option>All Categories</option>
//             <option>Whey Protein</option>
//             <option>Mass Gainers</option>
//             <option>Creatine</option>
//             <option>Pre Workout</option>
//           </select>
//           <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
//             <option>All Status</option>
//             <option>Active</option>
//             <option>Low Stock</option>
//             <option>Out of Stock</option>
//           </select>
//           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Filter className="h-4 w-4" />
//             <span>More Filters</span>
//           </button>
//         </div>
//       </div>

//       {/* Products Table */}
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
//             {products.map((product) => (
//               <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-3">
//                     <img src={product.image} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
//                     <span className="font-medium text-gray-900">{product.name}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.price}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
//                 <td className="px-6 py-4">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
//                   }`}>
//                     {product.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-2">
//                     <button className="p-1 hover:bg-gray-100 rounded">
//                       <Eye className="h-4 w-4 text-gray-600" />
//                     </button>
//                     <button className="p-1 hover:bg-gray-100 rounded">
//                       <Edit className="h-4 w-4 text-gray-600" />
//                     </button>
//                     <button className="p-1 hover:bg-gray-100 rounded">
//                       <Trash2 className="h-4 w-4 text-red-600" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Product Modal */}
//       {showAddProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
//               <button onClick={() => setShowAddProduct(false)} className="p-2 hover:bg-gray-100 rounded-lg">
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <form className="space-y-6">
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
//                   <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                   <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
//                     <option>Select Category</option>
//                     <option>Whey Protein</option>
//                     <option>Mass Gainers</option>
//                     <option>Creatine</option>
//                     <option>Pre Workout</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
//                   <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
//                   <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                   <p className="text-gray-500">Drag and drop images here or click to browse</p>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3">
//                 <button type="button" onClick={() => setShowAddProduct(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
//                   Add Product
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// // Orders Content Component
// function OrdersContent({ getStatusColor }) {
//   const orders = [
//     { 
//       id: '#3241', 
//       customer: 'John Doe', 
//       email: 'john@example.com',
//       date: '2024-03-15', 
//       status: 'processing', 
//       amount: '$89.99', 
//       items: 3,
//       payment: 'Credit Card'
//     },
//     { 
//       id: '#3240', 
//       customer: 'Sarah Smith', 
//       email: 'sarah@example.com',
//       date: '2024-03-15', 
//       status: 'shipped', 
//       amount: '$124.50', 
//       items: 2,
//       payment: 'PayPal'
//     },
//     { 
//       id: '#3239', 
//       customer: 'Mike Johnson', 
//       email: 'mike@example.com',
//       date: '2024-03-14', 
//       status: 'delivered', 
//       amount: '$67.89', 
//       items: 1,
//       payment: 'Credit Card'
//     },
//     { 
//       id: '#3238', 
//       customer: 'Emily Brown', 
//       email: 'emily@example.com',
//       date: '2024-03-14', 
//       status: 'pending', 
//       amount: '$234.99', 
//       items: 5,
//       payment: 'Bank Transfer'
//     }
//   ];

//   return (
//     <>
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
//             <p className="text-gray-600 mt-1">Manage and track all orders</p>
//           </div>
//           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Download className="h-4 w-4" />
//             <span>Export</span>
//           </button>
//         </div>
//       </div>

//       {/* Order Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Pending</span>
//             <Clock className="h-5 w-5 text-gray-400" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">12</p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Processing</span>
//             <Package className="h-5 w-5 text-yellow-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">8</p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Shipped</span>
//             <Truck className="h-5 w-5 text-blue-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">24</p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Delivered</span>
//             <CheckCircle className="h-5 w-5 text-green-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">156</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search orders..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//           <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
//             <option>All Status</option>
//             <option>Pending</option>
//             <option>Processing</option>
//             <option>Shipped</option>
//             <option>Delivered</option>
//           </select>
//           <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
//           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Filter className="h-4 w-4" />
//             <span>More Filters</span>
//           </button>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr className="text-left text-sm text-gray-500">
//               <th className="px-6 py-4 font-medium">Order ID</th>
//               <th className="px-6 py-4 font-medium">Customer</th>
//               <th className="px-6 py-4 font-medium">Date</th>
//               <th className="px-6 py-4 font-medium">Status</th>
//               <th className="px-6 py-4 font-medium">Items</th>
//               <th className="px-6 py-4 font-medium">Total</th>
//               <th className="px-6 py-4 font-medium">Payment</th>
//               <th className="px-6 py-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
//                 <td className="px-6 py-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">{order.customer}</p>
//                     <p className="text-xs text-gray-500">{order.email}</p>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
//                 <td className="px-6 py-4">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.amount}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{order.payment}</td>
//                 <td className="px-6 py-4">
//                   <button className="p-2 hover:bg-gray-100 rounded">
//                     <MoreVertical className="h-4 w-4 text-gray-600" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// // Customers Content Component
// function CustomersContent() {
//   const customers = [
//     { 
//       id: 1,
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '+1 234 567 8900',
//       orders: 12,
//       spent: '$1,234.56',
//       joined: '2024-01-15',
//       status: 'active'
//     },
//     { 
//       id: 2,
//       name: 'Sarah Smith',
//       email: 'sarah@example.com',
//       phone: '+1 234 567 8901',
//       orders: 8,
//       spent: '$892.34',
//       joined: '2024-01-20',
//       status: 'active'
//     },
//     { 
//       id: 3,
//       name: 'Mike Johnson',
//       email: 'mike@example.com',
//       phone: '+1 234 567 8902',
//       orders: 3,
//       spent: '$234.99',
//       joined: '2024-02-10',
//       status: 'inactive'
//     },
//     { 
//       id: 4,
//       name: 'Emily Brown',
//       email: 'emily@example.com',
//       phone: '+1 234 567 8903',
//       orders: 15,
//       spent: '$2,341.78',
//       joined: '2023-12-05',
//       status: 'active'
//     }
//   ];

//   return (
//     <>
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
//             <p className="text-gray-600 mt-1">Manage your customer base</p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <Download className="h-4 w-4" />
//               <span>Export</span>
//             </button>
//             <button className="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600">
//               <Plus className="h-5 w-5" />
//               <span>Add Customer</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Customer Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Total Customers</span>
//             <Users className="h-5 w-5 text-blue-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">1,234</p>
//           <p className="text-sm text-green-600 mt-1">+12% from last month</p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Active Customers</span>
//             <CheckCircle className="h-5 w-5 text-green-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">892</p>
//           <p className="text-sm text-gray-600 mt-1">72.3% of total</p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Avg. Order Value</span>
//             <DollarSign className="h-5 w-5 text-green-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">$87.50</p>
//           <p className="text-sm text-green-600 mt-1">+5.2% from last month</p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">New This Month</span>
//             <ArrowUp className="h-5 w-5 text-purple-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">48</p>
//           <p className="text-sm text-green-600 mt-1">+23% from last month</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search customers..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//           <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
//             <option>All Status</option>
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>
//           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Filter className="h-4 w-4" />
//             <span>More Filters</span>
//           </button>
//         </div>
//       </div>

//       {/* Customers Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr className="text-left text-sm text-gray-500">
//               <th className="px-6 py-4 font-medium">Customer</th>
//               <th className="px-6 py-4 font-medium">Contact</th>
//               <th className="px-6 py-4 font-medium">Orders</th>
//               <th className="px-6 py-4 font-medium">Total Spent</th>
//               <th className="px-6 py-4 font-medium">Joined</th>
//               <th className="px-6 py-4 font-medium">Status</th>
//               <th className="px-6 py-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((customer) => (
//               <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="h-10 w-10 bg-sky-100 rounded-full flex items-center justify-center">
//                       <span className="text-sky-600 font-medium">{customer.name.charAt(0)}</span>
//                     </div>
//                     <span className="font-medium text-gray-900">{customer.name}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div>
//                     <p className="text-sm text-gray-900">{customer.email}</p>
//                     <p className="text-xs text-gray-500">{customer.phone}</p>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{customer.orders}</td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.spent}</td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{customer.joined}</td>
//                 <td className="px-6 py-4">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {customer.status}
//                   </span>
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
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// // Analytics Content Component
// function AnalyticsContent() {
//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
//         <p className="text-gray-600 mt-1">Track your store performance and insights</p>
//       </div>

//       {/* Date Range Selector */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex items-center space-x-4">
//             <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Today</button>
//             <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Last 7 days</button>
//             <button className="px-4 py-2 text-sm font-medium bg-sky-50 text-sky-600 rounded-lg">Last 30 days</button>
//             <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Last 3 months</button>
//           </div>
//           <div className="flex items-center space-x-2">
//             <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
//             <span className="text-gray-500">to</span>
//             <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
//           </div>
//         </div>
//       </div>

//       {/* Revenue Overview */}
//       <div className="grid lg:grid-cols-3 gap-8 mb-8">
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
//           <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
//             <BarChart3 className="h-12 w-12 text-gray-400" />
//             <span className="ml-3 text-gray-500">Revenue chart visualization</span>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-semibold text-gray-900">Total Revenue</h3>
//               <TrendingUp className="h-5 w-5 text-green-500" />
//             </div>
//             <p className="text-3xl font-bold text-gray-900">$124,563</p>
//             <p className="text-sm text-green-600 mt-2">+18.2% from last period</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-semibold text-gray-900">Average Order Value</h3>
//               <DollarSign className="h-5 w-5 text-blue-500" />
//             </div>
//             <p className="text-3xl font-bold text-gray-900">$87.50</p>
//             <p className="text-sm text-green-600 mt-2">+5.4% from last period</p>
//           </div>
//         </div>
//       </div>

//       {/* Product Performance */}
//       <div className="grid lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h2>
//           <div className="space-y-4">
//             {[
//               { name: 'Premium Whey Isolate', sales: 245, revenue: '$12,245', percentage: 85 },
//               { name: 'Mass Gainer Pro', sales: 189, revenue: '$16,921', percentage: 72 },
//               { name: 'Creatine Monohydrate', sales: 156, revenue: '$3,900', percentage: 65 },
//               { name: 'Pre Workout Energy', sales: 134, revenue: '$4,690', percentage: 58 },
//               { name: 'BCAA Complex', sales: 98, revenue: '$2,940', percentage: 45 }
//             ].map((product, index) => (
//               <div key={index}>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-gray-900">{product.name}</span>
//                   <span className="text-sm text-gray-600">{product.revenue}</span>
//                 </div>
//                 <div className="relative w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="absolute top-0 left-0 h-full bg-sky-500 rounded-full" 
//                     style={{ width: `${product.percentage}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">{product.sales} sales</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h2>
//           <div className="space-y-6">
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-gray-600">New vs Returning</span>
//                 <span className="text-sm font-medium text-gray-900">32% / 68%</span>
//               </div>
//               <div className="flex h-3 rounded-full overflow-hidden">
//                 <div className="bg-blue-500 w-[32%]"></div>
//                 <div className="bg-sky-500 w-[68%]"></div>
//               </div>
//             </div>

//             <div>
//               <h4 className="font-medium text-gray-900 mb-3">Top Customer Locations</h4>
//               <div className="space-y-2">
//                 {[
//                   { location: 'Lagos, Nigeria', customers: 234 },
//                   { location: 'Abuja, Nigeria', customers: 189 },
//                   { location: 'Port Harcourt, Nigeria', customers: 156 },
//                   { location: 'Ibadan, Nigeria', customers: 98 },
//                   { location: 'Kano, Nigeria', customers: 67 }
//                 ].map((loc, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">{loc.location}</span>
//                     <span className="text-sm font-medium text-gray-900">{loc.customers} customers</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // Settings Content Component
// function SettingsContent() {
//   const [activeSettingsTab, setActiveSettingsTab] = useState('general');

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//         <p className="text-gray-600 mt-1">Manage your store settings and preferences</p>
//       </div>

//       <div className="grid lg:grid-cols-4 gap-8">
//         {/* Settings Navigation */}
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
//                 className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//                   activeSettingsTab === item.id 
//                     ? 'bg-sky-50 text-sky-600' 
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <item.icon className="h-4 w-4" />
//                 <span className="text-sm font-medium">{item.label}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Settings Content */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             {activeSettingsTab === 'general' && (
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
//                 <form className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
//                     <input 
//                       type="text" 
//                       defaultValue="HOPG - Home of Proteins"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" 
//                     />
//                   </div>

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

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
//                     <div className="flex items-center space-x-4">
//                       <div className="bg-sky-500 text-white px-4 py-3 rounded-lg font-bold text-xl">
//                         HOPG
//                       </div>
//                       <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                         Change Logo
//                       </button>
//                     </div>
//                   </div>

//                   <div className="pt-4">
//                     <button type="submit" className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600">
//                       Save Changes
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {activeSettingsTab === 'shipping' && (
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipping Settings</h2>
//                 <form className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold</label>
//                     <div className="flex items-center space-x-2">
//                       <span className="text-gray-500">$</span>
//                       <input 
//                         type="number" 
//                         defaultValue="50"
//                         className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" 
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Zones</label>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
//                         <span className="text-sm font-medium">Lagos</span>
//                         <span className="text-sm text-gray-600">$5.00</span>
//                       </div>
//                       <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
//                         <span className="text-sm font-medium">Other States</span>
//                         <span className="text-sm text-gray-600">$10.00</span>
//                       </div>
//                       <button type="button" className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400">
//                         + Add Shipping Zone
//                       </button>
//                     </div>
//                   </div>

//                   <div className="pt-4">
//                     <button type="submit" className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600">
//                       Save Changes
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }







// import React, { useState, useEffect } from 'react';
// import { 
//   LayoutDashboard, Package, ShoppingCart, Users, DollarSign, 
//   TrendingUp, Settings, Bell, Search, Menu, X, ChevronDown,
//   BarChart3, Calendar, AlertCircle, CheckCircle, Clock,
//   Eye, Edit, Trash2, Plus, Filter, Download, ArrowUp,
//   ArrowDown, MoreVertical, Star, Truck, ArrowRight
// } from 'lucide-react';
// import {URL} from '../url'


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

//   // Get auth token
//   const getAuthToken = () => {
//     return localStorage.getItem('token');
//   };

//   // Create fetch options with auth
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

//   // Fetch dashboard analytics
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

//   // Fetch products
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

//   // Fetch orders
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

//   // Fetch users (Note: Your backend doesn't have this endpoint, so this might fail)
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(`${URL}/api/users`, getFetchOptions());
//       if (response.ok) {
//         const data = await response.json();
//         setUsers(data || []);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       // Set empty array if endpoint doesn't exist
//       setUsers([]);
//     }
//   };

//   // Fetch categories
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

//   // Load data on component mount
//   useEffect(() => {
//     fetchDashboardData();
//     fetchProducts();
//     fetchOrders();
//     fetchUsers();
//     fetchCategories();
//   }, []);

//   // Refresh data when tab changes
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
//         />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
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
//         {/* Sidebar */}
//         <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed left-0 top-16 bottom-0 overflow-y-auto`}>
//           <nav className="p-4 space-y-1">
//             {navigationItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveTab(item.id)}
//                 className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//                   activeTab === item.id 
//                     ? 'bg-sky-50 text-sky-600' 
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <item.icon className="h-5 w-5 flex-shrink-0" />
//                 {sidebarOpen && <span className="font-medium">{item.label}</span>}
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
//           <div className="p-6">
//             {renderContent()}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// // Dashboard Content Component with real data
// function DashboardContent({ data, loading, getStatusColor }) {
//   if (loading || !data) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
//       </div>
//     );
//   }

//   const { stats, monthlyRevenue, topProducts, recentOrders } = data;

//   const statsData = [
//     { 
//       title: 'Total Revenue', 
//       value: `$${stats?.totalSales?.toLocaleString() || '0'}`, 
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
//       value: '156', 
//       change: '-2.4%', 
//       trend: 'down',
//       icon: Package,
//       color: 'bg-orange-500'
//     }
//   ];

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
//         <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {statsData.map((stat, index) => (
//           <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className={`${stat.color} p-3 rounded-lg`}>
//                 <stat.icon className="h-6 w-6 text-white" />
//               </div>
//               <span className={`flex items-center text-sm font-medium ${
//                 stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
//               }`}>
//                 {stat.change}
//                 {stat.trend === 'up' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />}
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
//             <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Recent Orders */}
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
//                         {order.user?.firstName} {order.user?.lastName}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                         ${parseFloat(order.total || 0).toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   )) || (
//                     <tr>
//                       <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
//                         No recent orders found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-8">
//           {/* Top Products */}
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
//                     ${parseFloat(product.totalRevenue || 0).toFixed(2)}
//                   </span>
//                 </div>
//               )) || (
//                 <p className="text-sm text-gray-500">No data available</p>
//               )}
//             </div>
//           </div>

//           {/* Monthly Revenue Chart */}
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
//                     ${parseFloat(month.revenue || 0).toFixed(2)}
//                   </span>
//                 </div>
//               )) || (
//                 <p className="text-sm text-gray-500">No revenue data available</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // Products Content Component with real data
// function ProductsContent({ products, categories, fetchProducts, getFetchOptions }) {
//   const [showAddProduct, setShowAddProduct] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         const response = await fetch(`${URL}/api/products/${productId}`, getFetchOptions('DELETE'));
//         if (response.ok) {
//           fetchProducts(); // Refresh the list
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

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
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

//       {/* Products Table */}
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
//             {products.length > 0 ? products.map((product) => (
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
//                   ${parseFloat(product.price || 0).toFixed(2)}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   {product.stockQuantity || 0}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                   }`}>
//                     {product.isActive ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-2">
//                     <button className="p-1 hover:bg-gray-100 rounded">
//                       <Eye className="h-4 w-4 text-gray-600" />
//                     </button>
//                     <button className="p-1 hover:bg-gray-100 rounded">
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
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Product Modal */}
//       {showAddProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
//               <button onClick={() => setShowAddProduct(false)} className="p-2 hover:bg-gray-100 rounded-lg">
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
//                   <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                   <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
//                     <option>Select Category</option>
//                     {categories.map(category => (
//                       <option key={category.id} value={category.id}>{category.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
//                   <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
//                   <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                   <p className="text-gray-500">Drag and drop images here or click to browse</p>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3">
//                 <button type="button" onClick={() => setShowAddProduct(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
//                   Add Product
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// // Orders Content Component with real data
// function OrdersContent({ orders, getStatusColor, fetchOrders, getFetchOptions }) {
//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const response = await fetch(`${URL}/api/orders/${orderId}/status`, getFetchOptions('PUT', { status: newStatus }));
//       if (response.ok) {
//         fetchOrders(); // Refresh the list
//       } else {
//         alert('Failed to update order status');
//       }
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Failed to update order status');
//     }
//   };

//   return (
//     <>
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
//             <p className="text-gray-600 mt-1">Manage and track all orders ({orders.length} orders)</p>
//           </div>
//           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Download className="h-4 w-4" />
//             <span>Export</span>
//           </button>
//         </div>
//       </div>

//       {/* Order Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Pending</span>
//             <Clock className="h-5 w-5 text-gray-400" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">
//             {orders.filter(order => order.status === 'pending').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Processing</span>
//             <Package className="h-5 w-5 text-yellow-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">
//             {orders.filter(order => order.status === 'processing').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Shipped</span>
//             <Truck className="h-5 w-5 text-blue-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">
//             {orders.filter(order => order.status === 'shipped').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Delivered</span>
//             <CheckCircle className="h-5 w-5 text-green-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">
//             {orders.filter(order => order.status === 'delivered').length}
//           </p>
//         </div>
//       </div>

//       {/* Orders Table */}
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
//             {orders.length > 0 ? orders.map((order) => (
//               <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="px-6 py-4 font-medium text-gray-900">
//                   {order.orderNumber || `#${order.id}`}
//                 </td>
//                 <td className="px-6 py-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {order.user?.firstName} {order.user?.lastName}
//                     </p>
//                     <p className="text-xs text-gray-500">{order.user?.email}</p>
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
//                   ${parseFloat(order.total || 0).toFixed(2)}
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
//                   No orders found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// // Customers Content Component with real data
// function CustomersContent({ users, fetchUsers, getFetchOptions }) {
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

//       {/* Customer Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Total Customers</span>
//             <Users className="h-5 w-5 text-blue-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">{users.length}</p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Admin Users</span>
//             <CheckCircle className="h-5 w-5 text-green-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">
//             {users.filter(user => user.isAdmin).length}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">Regular Users</span>
//             <Users className="h-5 w-5 text-gray-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">
//             {users.filter(user => !user.isAdmin).length}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600">New This Month</span>
//             <ArrowUp className="h-5 w-5 text-purple-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-900">
//             {users.filter(user => {
//               const userDate = new Date(user.createdAt);
//               const now = new Date();
//               return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
//             }).length}
//           </p>
//         </div>
//       </div>

//       {/* Customers Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr className="text-left text-sm text-gray-500">
//               <th className="px-6 py-4 font-medium">Customer</th>
//               <th className="px-6 py-4 font-medium">Email</th>
//               <th className="px-6 py-4 font-medium">Phone</th>
//               <th className="px-6 py-4 font-medium">Role</th>
//               <th className="px-6 py-4 font-medium">Joined</th>
//               <th className="px-6 py-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? users.map((user) => (
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
//                 <td className="px-6 py-4">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     user.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
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
//                 <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                   No customers found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// // Analytics Content Component
// function AnalyticsContent({ data, getFetchOptions }) {
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [period, setPeriod] = useState('month');

//   const fetchAnalytics = async (selectedPeriod = period) => {
//     try {
//       const response = await fetch(`${URL}/api/analytics/orders?period=${selectedPeriod}`, getFetchOptions());
//       if (response.ok) {
//         const data = await response.json();
//         setAnalyticsData(data);
//       }
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();
//   }, [period]);

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
//         <p className="text-gray-600 mt-1">Track your store performance and insights</p>
//       </div>

//       {/* Date Range Selector */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={() => setPeriod('day')}
//               className={`px-4 py-2 text-sm font-medium rounded-lg ${
//                 period === 'day' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               Daily
//             </button>
//             <button 
//               onClick={() => setPeriod('week')}
//               className={`px-4 py-2 text-sm font-medium rounded-lg ${
//                 period === 'week' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               Weekly
//             </button>
//             <button 
//               onClick={() => setPeriod('month')}
//               className={`px-4 py-2 text-sm font-medium rounded-lg ${
//                 period === 'month' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               Monthly
//             </button>
//             <button 
//               onClick={() => setPeriod('year')}
//               className={`px-4 py-2 text-sm font-medium rounded-lg ${
//                 period === 'year' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               Yearly
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Analytics Data */}
//       <div className="grid lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h2>
//           <div className="space-y-4">
//             {analyticsData?.analytics?.map((item, index) => (
//               <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">
//                     {new Date(item.period).toLocaleDateString()}
//                   </p>
//                   <p className="text-xs text-gray-600">{item.orders} orders</p>
//                 </div>
//                 <span className="text-sm font-semibold text-gray-900">
//                   ${parseFloat(item.revenue || 0).toFixed(2)}
//                 </span>
//               </div>
//             )) || (
//               <p className="text-sm text-gray-500">No analytics data available</p>
//             )}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
//           <div className="space-y-4">
//             {data?.topProducts?.slice(0, 5).map((product, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">
//                     {product.product?.name}
//                   </p>
//                   <p className="text-xs text-gray-600">{product.totalSold} sales</p>
//                 </div>
//                 <span className="text-sm font-semibold text-gray-900">
//                   ${parseFloat(product.totalRevenue || 0).toFixed(2)}
//                 </span>
//               </div>
//             )) || (
//               <p className="text-sm text-gray-500">No product data available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // Settings Content Component
// function SettingsContent() {
//   const [activeSettingsTab, setActiveSettingsTab] = useState('general');

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//         <p className="text-gray-600 mt-1">Manage your store settings and preferences</p>
//       </div>

//       <div className="grid lg:grid-cols-4 gap-8">
//         {/* Settings Navigation */}
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
//                 className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//                   activeSettingsTab === item.id 
//                     ? 'bg-sky-50 text-sky-600' 
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <item.icon className="h-4 w-4" />
//                 <span className="text-sm font-medium">{item.label}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Settings Content */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             {activeSettingsTab === 'general' && (
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
//                     <input 
//                       type="text" 
//                       defaultValue="HOPG - Home of Proteins"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" 
//                     />
//                   </div>

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
//             {/* Add other settings tabs content as needed */}
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
  ArrowDown, MoreVertical, Star, Truck, ArrowRight
} from 'lucide-react';

const URL = 'http://localhost:5000';

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

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${URL}/api/products?limit=50`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
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
        setUsers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${URL}/api/categories`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
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
  }, []);

  useEffect(() => {
    switch (activeTab) {
      case 'dashboard':
        fetchDashboardData();
        break;
      case 'products':
        fetchProducts();
        break;
      case 'orders':
        fetchOrders();
        break;
      case 'customers':
        fetchUsers();
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
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent
          data={dashboardData}
          loading={loading}
          getStatusColor={getStatusColor}
          products={products}
        />;
      case 'products':
        return <ProductsContent
          products={products}
          categories={categories}
          fetchProducts={fetchProducts}
          getFetchOptions={getFetchOptions}
        />;
      case 'orders':
        return <OrdersContent
          orders={orders}
          getStatusColor={getStatusColor}
          fetchOrders={fetchOrders}
          getFetchOptions={getFetchOptions}
        />;
      case 'customers':
        return <CustomersContent
          users={users}
          fetchUsers={fetchUsers}
          getFetchOptions={getFetchOptions}
        />;
      case 'analytics':
        return <AnalyticsContent
          data={dashboardData}
          getFetchOptions={getFetchOptions}
        />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent
          data={dashboardData}
          loading={loading}
          getStatusColor={getStatusColor}
          products={products}
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

function DashboardContent({ data, loading, getStatusColor, products }) {
  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  const { stats, monthlyRevenue, topProducts, recentOrders } = data;

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

      <div className="grid lg:grid-cols-3 gap-8">
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
                        {order.user?.firstName} {order.user?.lastName}
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
    </>
  );
}

function ProductsContent({ products, categories, fetchProducts, getFetchOptions }) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${URL}/api/products/${productId}`, getFetchOptions('DELETE'));
        if (response.ok) {
          fetchProducts();
          if (paginatedProducts.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleAddProduct = async (formData) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
      });

      if (response.ok) {
        fetchProducts();
        setShowAddProduct(false);
        alert('Product added successfully!');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (productId, formData) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
      });

      if (response.ok) {
        fetchProducts();
        setShowEditProduct(false);
        setEditingProduct(null);
        alert('Product updated successfully!');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory ({products.length} products)</p>
          </div>
          <button
            onClick={() => setShowAddProduct(true)}
            className="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
            <option>All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.category?.name || 'No Category'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ₦{parseFloat(product.price || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.stockQuantity || 0}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowEditProduct(true);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  {searchTerm ? 'No products found matching your search' : 'No products found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded-lg ${currentPage === i + 1
                    ? 'bg-sky-500 text-white border-sky-500'
                    : 'border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {(showAddProduct || showEditProduct) && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSubmit={showAddProduct ? handleAddProduct : (formData) => handleEditProduct(editingProduct.id, formData)}
          onClose={() => {
            setShowAddProduct(false);
            setShowEditProduct(false);
            setEditingProduct(null);
          }}
          loading={loading}
          isEdit={showEditProduct}
        />
      )}
    </>
  );
}

function ProductForm({ product, categories, onSubmit, onClose, loading, isEdit }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    categoryId: product?.categoryId || '',
    stockQuantity: product?.stockQuantity || '',
    brand: product?.brand || '',
    weight: product?.weight || '',
    ingredients: product?.ingredients || '',
    isActive: product?.isActive !== undefined ? product.isActive : true,
    isFeatured: product?.isFeatured || false
  });
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== '') {
        submitData.append(key, formData[key]);
      }
    });

    if (imageFile) {
      submitData.append('imageUrl', imageFile);
    }

    onSubmit(submitData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50 flex items-center"
            >
              {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
              {isEdit ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrdersContent({ orders, getStatusColor, fetchOrders, getFetchOptions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const filteredOrders = orders.filter(order =>
    order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${URL}/api/orders/${orderId}/status`, getFetchOptions('PUT', { status: newStatus }));
      if (response.ok) {
        fetchOrders();
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Customer Name', 'Email', 'Date', 'Status', 'Total (₦)'],
      ...filteredOrders.map(order => [
        order.orderNumber || `#${order.id}`,
        `${order.user?.firstName || ''} ${order.user?.lastName || ''}`.trim() || 'N/A',
        order.user?.email || 'N/A',
        new Date(order.createdAt).toLocaleDateString(),
        order.status,
        parseFloat(order.total || 0).toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600 mt-1">Manage and track all orders ({orders.length} orders)</p>
          </div>
          <button
            onClick={exportOrders}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {order.orderNumber || `#${order.id}`}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.user?.firstName} {order.user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{order.user?.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-sky-500 ${getStatusColor(order.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ₦{parseFloat(order.total || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  {searchTerm ? 'No orders found matching your search' : 'No orders found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded-lg ${currentPage === i + 1
                    ? 'bg-sky-500 text-white border-sky-500'
                    : 'border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function CustomersContent({ users, fetchUsers, getFetchOptions }) {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-600 mt-1">Manage your customer base ({users.length} customers)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Phone</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-sky-100 rounded-full flex items-center justify-center">
                      <span className="text-sky-600 font-medium">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.phone || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {user.isAdmin ? 'Admin' : 'Customer'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AnalyticsContent({ data, getFetchOptions }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [period, setPeriod] = useState('month');

  const fetchAnalytics = async (selectedPeriod = period) => {
    try {
      const response = await fetch(`${URL}/api/analytics/orders?period=${selectedPeriod}`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

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
              onClick={() => setPeriod('year')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${period === 'year' ? 'bg-sky-50 text-sky-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h2>
          <div className="space-y-4">
            {analyticsData?.analytics?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(item.period).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-600">{item.orders} orders</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  ₦{parseFloat(item.revenue || 0).toFixed(2)}
                </span>
              </div>
            )) || (
                <p className="text-sm text-gray-500">No analytics data available</p>
              )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-4">
            {data?.topProducts?.slice(0, 5).map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.product?.name}
                  </p>
                  <p className="text-xs text-gray-600">{product.totalSold} sales</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  ₦{parseFloat(product.totalRevenue || 0).toFixed(2)}
                </span>
              </div>
            )) || (
                <p className="text-sm text-gray-500">No product data available</p>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

function SettingsContent() {
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your store settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            {[
              { id: 'general', label: 'General', icon: Settings },
              { id: 'shipping', label: 'Shipping', icon: Truck },
              { id: 'payments', label: 'Payments', icon: DollarSign },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'users', label: 'Users & Permissions', icon: Users }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSettingsTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeSettingsTab === item.id
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {activeSettingsTab === 'general' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
                    <input
                      type="email"
                      defaultValue="support@hopg.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                    <textarea
                      rows="3"
                      defaultValue="Home of protein goodies is a hub for all healthy goodies. Fuel your fitness journey with premium supplements."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}