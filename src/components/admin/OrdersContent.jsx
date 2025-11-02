import React, { useState } from 'react';
import { Search, Download, Eye, X, Package, MapPin, Phone, Mail, User, Calendar, CreditCard } from 'lucide-react';
import { URL } from '../../url';

export default function OrdersContent({ orders, getStatusColor, fetchOrders, getFetchOptions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const itemsPerPage = 5;

  const formatCurrency = (amount) => {
    return parseFloat(amount || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

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

  const fetchOrderDetails = async (orderId) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(`${URL}/api/orders/${orderId}`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data.order);
      } else {
        alert('Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Failed to fetch order details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    fetchOrderDetails(order.id);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setOrderDetails(null);
  };

  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Customer Name', 'Email', 'Date', 'Status', 'Total (₦)'],
      ...filteredOrders.map(order => [
        order.orderNumber || `#${order.id}`,
        order.user ? `${order.user.firstName} ${order.user.lastName}` : 'N/A',
        order.user?.email || 'N/A',
        new Date(order.createdAt).toLocaleDateString(),
        order.status,
        formatCurrency(order.total)
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
                      {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest User'}
                    </p>
                    <p className="text-xs text-gray-500">{order.user?.email || 'No email'}</p>
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
                  ₦{formatCurrency(order.total)}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="View order details"
                  >
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-600">{selectedOrder.orderNumber || `#${selectedOrder.id}`}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {loadingDetails ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
                </div>
              ) : orderDetails ? (
                <div className="space-y-6">
                  {/* Order Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">Order Information</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Order Number:</span>
                          <span className="font-medium">{orderDetails.orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{new Date(orderDetails.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(orderDetails.status)}`}>
                            {orderDetails.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <User className="h-5 w-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">Customer Information</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{selectedOrder.user?.email || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>
                            {selectedOrder.user
                              ? `${selectedOrder.user.firstName} ${selectedOrder.user.lastName}`
                              : 'Guest User'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {orderDetails.shippingAddress && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="h-5 w-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">Shipping Address</h3>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="font-medium">{orderDetails.shippingAddress.fullName || 'N/A'}</p>
                        <p className="text-gray-600">{orderDetails.shippingAddress.street || 'N/A'}</p>
                        <p className="text-gray-600">
                          {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postalCode}
                        </p>
                        <p className="text-gray-600">{orderDetails.shippingAddress.country || 'N/A'}</p>
                        <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-gray-200">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{orderDetails.shippingAddress.phoneNumber || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Package className="h-5 w-5 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">Order Items</h3>
                    </div>
                    <div className="space-y-3">
                      {orderDetails.orderItems?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                              {item.product?.imageUrl && (
                                <img
                                  src={item.product.imageUrl}
                                  alt={item.product?.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{item.product?.name || 'Product'}</p>
                              <p className="text-xs text-gray-600">
                                Qty: {item.quantity} × ₦{formatCurrency(item.price)}
                              </p>
                              {item.selectedFlavor && (
                                <p className="text-xs text-gray-500">Flavor: {item.selectedFlavor}</p>
                              )}
                              {item.selectedSize && (
                                <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₦{formatCurrency(item.subtotal)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">Payment Summary</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>₦{formatCurrency(orderDetails.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span>₦{formatCurrency(orderDetails.shipping)}</span>
                      </div>
                      {orderDetails.tax > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax:</span>
                          <span>₦{formatCurrency(orderDetails.tax)}</span>
                        </div>
                      )}
                      {orderDetails.discount && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({orderDetails.discount.code}):</span>
                          <span>-₦{formatCurrency(orderDetails.discountAmount || 0)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold text-base">
                        <span>Total:</span>
                        <span className="text-sky-600">₦{formatCurrency(orderDetails.total)}</span>
                      </div>
                      {orderDetails.payment && (
                        <div className="pt-2 mt-2 border-t border-gray-200">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-medium">{orderDetails.payment.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-gray-600">Payment Status:</span>
                            <span className={`px-2 py-0.5 rounded-full font-medium ${
                              orderDetails.payment.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {orderDetails.payment.status}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Failed to load order details
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}