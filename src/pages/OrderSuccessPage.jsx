import React from 'react';
import { CheckCircle, Package, Truck, Calendar, Download, ArrowRight, Home, ShoppingBag } from 'lucide-react';

export default function OrderSuccess() {
  const orderDetails = {
    orderNumber: 'ORD-2025-0612-001',
    orderDate: 'June 10, 2025',
    estimatedDelivery: 'June 14, 2025',
    total: '$189.97',
    items: [
      {
        name: 'Premium Whey Isolate',
        flavor: 'Chocolate',
        size: '2.5 lbs',
        quantity: 2,
        price: '$49.99',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'
      },
      {
        name: 'Mass Gainer Pro',
        flavor: 'Vanilla',
        size: '5 lbs',
        quantity: 1,
        price: '$89.99',
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop'
      }
    ],
    shipping: {
      method: 'Free Standard Shipping',
      address: '123 Main Street, New York, NY 10001'
    },
    payment: {
      method: 'Credit Card ending in 3456',
      amount: '$189.97'
    }
  };

  const trackingSteps = [
    { id: 1, name: 'Order Confirmed', status: 'complete', date: 'Jun 10, 2:30 PM' },
    { id: 2, name: 'Processing', status: 'current', date: 'Expected by Jun 11' },
    { id: 3, name: 'Shipped', status: 'upcoming', date: 'Expected by Jun 12' },
    { id: 4, name: 'Delivered', status: 'upcoming', date: 'Expected by Jun 14' }
  ];

  const recommendedProducts = [
    {
      name: 'Pre Workout Energy',
      price: '$34.99',
      originalPrice: '$44.99',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'
    },
    {
      name: 'BCAA Recovery',
      price: '$29.99',
      originalPrice: '$39.99',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop'
    },
    {
      name: 'Protein Shaker Bottle',
      price: '$14.99',
      originalPrice: '$19.99',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-sky-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
               HOPG 
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-600 text-sm">Home of Proteins</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your order. We've received your purchase and will process it shortly.
          </p>
          <p className="text-gray-500">
            Order confirmation sent to <span className="font-medium">john.doe@example.com</span>
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium text-gray-900">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium text-gray-900">{orderDetails.orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium text-gray-900">{orderDetails.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium text-green-600">{orderDetails.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <p className="text-gray-600 mb-4">{orderDetails.shipping.address}</p>
              <p className="text-sm text-gray-500">{orderDetails.shipping.method}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h3>
            <div className="space-y-4">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.flavor} • {item.size}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-gray-900">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Tracking */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Tracking</h2>
          
          <div className="relative">
            {trackingSteps.map((step, stepIdx) => (
              <div key={step.id} className="relative pb-8">
                {stepIdx !== trackingSteps.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200" />
                )}
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step.status === 'complete' 
                      ? 'bg-green-500 border-green-500' 
                      : step.status === 'current'
                      ? 'bg-sky-500 border-sky-500'
                      : 'bg-white border-gray-300'
                  }`}>
                    {step.status === 'complete' ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <div className={`w-3 h-3 rounded-full ${
                        step.status === 'current' ? 'bg-white' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      step.status === 'complete' || step.status === 'current' 
                        ? 'text-gray-900' 
                        : 'text-gray-500'
                    }`}>
                      {step.name}
                    </h3>
                    <p className="text-sm text-gray-500">{step.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download Receipt</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="h-5 w-5" />
            <span>Track Package</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Home className="h-5 w-5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Recommended Products */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Complete Your Nutrition Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts.map((product, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                </div>
                <button className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12 p-6 bg-sky-50 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2 border border-sky-500 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors">
              Contact Support
            </button>
            <button className="px-6 py-2 border border-sky-500 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}