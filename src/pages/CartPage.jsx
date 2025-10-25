//pages/CartPage.jsx
import React, { useEffect } from 'react';
import { ShoppingBag, Plus, Minus, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function CartPage() {
  const { 
    cartItems, 
    cartCount, 
    loading, 
    updateCartItem, 
    removeFromCart, 
    clearCart,
    fetchCartItems,
    isLoggedIn
  } = useCart();
  
  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity === 0) {
      await removeFromCart(itemId);
    } else {
      await updateCartItem(itemId, newQuantity);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Allow both guest and authenticated users to proceed to checkout
    window.location.href = '/checkout';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cartCount} items in your cart</p>
          {!isLoggedIn && cartItems.length > 0 && (
            <div className="mt-4 bg-sky-50 border border-sky-200 rounded-lg p-4">
              <p className="text-sky-800 text-sm">
                <strong>Guest Cart:</strong> Your items are saved locally. You can checkout without an account, or{' '}
                <a href="/login" className="underline font-medium hover:text-sky-900">sign in</a>
                {' '}to save them to your account.
              </p>
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some protein supplements to get started!</p>
            <button 
              onClick={() => window.location.href = '/products'}
              className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={item.product.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'} 
                        alt={item.product.name} 
                        className="w-full h-full object-contain cursor-pointer" 
                        onClick={() => window.location.href = `/product/${item.product.id}`}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 
                        className="font-semibold text-gray-900 cursor-pointer hover:text-sky-600"
                        onClick={() => window.location.href = `/product/${item.product.id}`}
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.selectedFlavor && `${item.selectedFlavor}`}
                        {item.selectedFlavor && item.selectedSize && ' • '}
                        {item.selectedSize && `${item.selectedSize}`}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-semibold text-gray-900">₦{Number(item.product.price).toLocaleString()}</span>
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <span className="text-sm text-gray-500 line-through">₦{Number(item.product.originalPrice).toLocaleString()}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={loading}
                        className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={loading}
                        className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ₦{Number(item.product.price * item.quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <div className="text-center pt-4">
                  <button 
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold">₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-sky-800">
                    <strong>Note:</strong> Delivery fee will be calculated at checkout based on your delivery address.
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full bg-sky-500 text-white py-4 rounded-lg font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-5 w-5" />
                </button>

                <button 
                  onClick={() => window.location.href = '/products'}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>

                {/* Features */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-sky-500" />
                      <span className="text-sm text-gray-600">24-72 hours Delivery across Nigeria</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="h-5 w-5 text-sky-500" />
                      <span className="text-sm text-gray-600">Secure checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}