import React, { useState } from 'react';
import { Search, Download, Eye, X, Package, MapPin, Phone, Mail, User, Calendar, CreditCard, AlertTriangle, Trash2 } from 'lucide-react';
import { URL } from '../../url';

export default function DumpOrdersContent({ orders, getStatusColor, fetchOrders, getFetchOptions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const itemsPerPage = 10;

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
    order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.guestEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

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
      ['Order ID', 'Customer Name', 'Email', 'Date', 'Payment Status', 'Total (₦)'],
      ...filteredOrders.map(order => [
        order.orderNumber || `#${order.id}`,
        order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest',
        order.user?.email || order.guestEmail || 'N/A',
        new Date(order.createdAt).toLocaleDateString(),
        order.payment?.status || 'pending',
        formatCurrency(order.total)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dump_orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              <h1 className="text-2xl font-bold text-gray-900">Dump Orders</h1>
            </div>
            <p className="text-gray-600 mt-1">
              Orders with incomplete/pending payments ({orders.length} orders)
            </p>
            <p className="text-sm text-amber-600 mt-1">
              These orders have not been paid for and should not be fulfilled until payment is confirmed.
            </p>
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
                placeholder="Search dump orders..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-amber-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Payment Status</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-amber-50/50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {order.orderNumber || `#${order.id}`}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest User'}
                    </p>
                    <p className="text-xs text-gray-500">{order.user?.email || order.guestEmail || 'No email'}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment?.status)}`}>
                    {order.payment?.status || 'pending'}
                  </span>
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
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <AlertTriangle className="h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-lg font-medium">No pending payment orders</p>
                    <p className="text-sm text-gray-400">All orders have been paid for</p>
                  </div>
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
                    ? 'bg-amber-500 text-white border-amber-500'
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
            <div className="sticky top-0 bg-amber-50 border-b border-amber-200 px-6 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <h2 className="text-xl font-bold text-gray-900">Dump Order Details</h2>
                </div>
                <p className="text-sm text-gray-600">{selectedOrder.orderNumber || `#${selectedOrder.id}`}</p>
                <p className="text-xs text-amber-600 mt-1">Payment not completed - Do not fulfill</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {loadingDetails ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                </div>
              ) : orderDetails ? (
                <div className="space-y-6">
                  {/* Payment Warning Banner */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <h3 className="font-semibold text-amber-800">Payment Pending</h3>
                    </div>
                    <p className="text-sm text-amber-700 mt-1">
                      This order has not been paid for. The customer may have abandoned checkout or the payment failed.
                    </p>
                  </div>

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
                          <span className="text-gray-600">Order Status:</span>
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
                          <User className="h-4 w-4 text-gray-400" />
                          <span>
                            {orderDetails?.user
                              ? `${orderDetails.user.firstName} ${orderDetails.user.lastName}`
                              : orderDetails?.guestShippingInfo
                              ? `${orderDetails.guestShippingInfo.firstName} ${orderDetails.guestShippingInfo.lastName}`
                              : 'Guest User'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{orderDetails?.user?.email || orderDetails?.guestEmail || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>
                            {orderDetails?.shippingAddress?.phone || orderDetails?.guestShippingInfo?.phone || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

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
                      {orderDetails.discountAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount:</span>
                          <span>-₦{formatCurrency(orderDetails.discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span>₦{formatCurrency(orderDetails.shipping)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-300 font-semibold text-base">
                        <span>Total:</span>
                        <span className="text-amber-600">₦{formatCurrency(orderDetails.total)}</span>
                      </div>

                      {orderDetails.payment && (
                        <div className="pt-2 mt-2 border-t border-gray-200">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-medium capitalize">{orderDetails.payment.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-gray-600">Payment Status:</span>
                            <span className={`px-2 py-0.5 rounded-full font-medium capitalize ${getPaymentStatusColor(orderDetails.payment.status)}`}>
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
