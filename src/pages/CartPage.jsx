// import React, { useState } from 'react';
// import { ShoppingBag, Search, Menu, Plus, Minus, X, ArrowRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// export default function ShoppingCart() {
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: 'Premium Whey Isolate',
//       flavor: 'Chocolate',
//       size: '2.5 lbs',
//       price: 49.99,
//       originalPrice: 59.99,
//       quantity: 2,
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'
//     },
//     {
//       id: 2,
//       name: 'Mass Gainer Pro',
//       flavor: 'Vanilla',
//       size: '5 lbs',
//       price: 89.99,
//       originalPrice: 109.99,
//       quantity: 1,
//       image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop'
//     },
//     {
//       id: 3,
//       name: 'Creatine Monohydrate',
//       flavor: 'Unflavored',
//       size: '1 lb',
//       price: 24.99,
//       originalPrice: 29.99,
//       quantity: 1,
//       image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop'
//     }
//   ]);

//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity === 0) {
//       setCartItems(cartItems.filter(item => item.id !== id));
//     } else {
//       setCartItems(cartItems.map(item => 
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       ));
//     }
//   };

//   const removeItem = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const shipping = subtotal > 50 ? 0 : 9.99;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   const recommendedProducts = [
//     {
//       name: 'Pre Workout Energy',
//       price: '$34.99',
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop'
//     },
//     {
//       name: 'BCAA Recovery',
//       price: '$29.99',
//       image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="bg-sky-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
//                 HOPG
//               </div>
//               <div className="hidden sm:block">
//                 <span className="text-gray-600 text-sm">Home of Proteins</span>
//               </div>
//             </div>

//             <div className="hidden md:flex flex-1 max-w-lg mx-8">
//               <div className="relative w-full">
//                 <input
//                   type="text"
//                   placeholder="Search for protein supplements..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                 />
//                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <ShoppingBag className="h-5 w-5 text-gray-600" />
//                 <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartItems.length}
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
//           <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
//         </div>

//         {cartItems.length === 0 ? (
//           <div className="text-center py-16">
//             <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
//             <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
//             <p className="text-gray-600 mb-8">Add some protein supplements to get started!</p>
//             <button className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Cart Items */}
//             <div className="lg:col-span-2 space-y-4">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                     </div>
                    
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-900">{item.name}</h3>
//                       <p className="text-sm text-gray-600">
//                         {item.flavor} • {item.size}
//                       </p>
//                       <div className="flex items-center space-x-2 mt-1">
//                         <span className="font-semibold text-gray-900">${item.price}</span>
//                         <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-3">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         className="p-1 border border-gray-300 rounded hover:bg-gray-50"
//                       >
//                         <Minus className="h-4 w-4" />
//                       </button>
//                       <span className="w-8 text-center">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         className="p-1 border border-gray-300 rounded hover:bg-gray-50"
//                       >
//                         <Plus className="h-4 w-4" />
//                       </button>
//                     </div>

//                     <div className="text-right">
//                       <div className="font-semibold text-gray-900">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </div>
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="text-red-500 hover:text-red-700 text-sm mt-1"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {/* Recommended Products */}
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-8">
//                 <h3 className="font-semibold text-gray-900 mb-4">Frequently bought together</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {recommendedProducts.map((product, index) => (
//                     <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
//                       <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-gray-900">{product.name}</p>
//                         <p className="text-sm text-gray-600">{product.price}</p>
//                       </div>
//                       <button className="text-sky-500 hover:text-sky-600 text-sm font-medium">
//                         Add
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
//                 <div className="space-y-4 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="font-medium">${subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="font-medium">
//                       {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Tax</span>
//                     <span className="font-medium">${tax.toFixed(2)}</span>
//                   </div>
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between">
//                       <span className="text-lg font-semibold">Total</span>
//                       <span className="text-lg font-semibold">${total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {shipping > 0 && (
//                   <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
//                     <p className="text-sm text-sky-700">
//                       Add ${(50 - subtotal).toFixed(2)} more for free shipping!
//                     </p>
//                   </div>
//                 )}

//                 <button className="w-full bg-sky-500 text-white py-4 rounded-lg font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2 mb-4">
//                   <span>Proceed to Checkout</span>
//                   <ArrowRight className="h-5 w-5" />
//                 </button>

//                 <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
//                   Continue Shopping
//                 </button>

//                 {/* Features */}
//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <div className="space-y-3">
//                     <div className="flex items-center space-x-3">
//                       <Truck className="h-5 w-5 text-sky-500" />
//                       <span className="text-sm text-gray-600">Free shipping over $50</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <ShieldCheck className="h-5 w-5 text-sky-500" />
//                       <span className="text-sm text-gray-600">Secure checkout</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <RotateCcw className="h-5 w-5 text-sky-500" />
//                       <span className="text-sm text-gray-600">30-day returns</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Plus, Minus, X, ArrowRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState({});


  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal + 100; // Free shipping over ₦23,000
  const total = subtotal + shipping;

  const recommendedProducts = [
    {
      name: 'Pre Workout Energy',
      price: '₦34.99',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop'
    },
    {
      name: 'BCAA Recovery',
      price: '₦29.99',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop'
    }
  ];

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to view your cart');
        setLoading(false);
        return;
      }

      const response = await fetch(`${URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      setCartItems(data.cartItems || []);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      setError('Failed to load cart items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }

    try {
      setUpdateLoading(prev => ({ ...prev, [itemId]: true }));
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity. Please try again.');
    } finally {
      setUpdateLoading(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item. Please try again.');
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/cart`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      setCartItems([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
      alert('Failed to clear cart. Please try again.');
    }
  };

  const addRecommendedProduct = async (productName) => {
    try {
      const token = localStorage.getItem('token');
      
      // In a real app, you'd have product IDs for recommended products
      // For now, we'll just show a message
      alert(`${productName} would be added to cart`);
    } catch (err) {
      console.error('Error adding recommended product:', err);
      alert('Failed to add product. Please try again.');
    }
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchCartItems}
            className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-sky-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
                HOPG
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-600 text-sm">Home of Protein Goodies</span>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for protein supplements..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
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
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.selectedFlavor && `${item.selectedFlavor}`}
                        {item.selectedFlavor && item.selectedSize && ' • '}
                        {item.selectedSize && `${item.selectedSize}`}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-semibold text-gray-900">₦{(item.product.price).toLocaleString()}</span>
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <span className="text-sm text-gray-500 line-through">₦{(item.product.originalPrice).toLocaleString()}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updateLoading[item.id]}
                        className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updateLoading[item.id]}
                        className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ₦{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Recommended Products */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Frequently bought together</h3>
                <div className="grid grid-cols-2 gap-4">
                  {recommendedProducts.map((product, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.price}</p>
                      </div>
                      <button 
                        onClick={() => addRecommendedProduct(product.name)}
                        className="text-sky-500 hover:text-sky-600 text-sm font-medium"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div> */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-sky-700">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                <button 
                  onClick={() => window.location.href = '/checkout'}
                  className="w-full bg-sky-500 text-white py-4 rounded-lg font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2 mb-4"
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

                {/* Clear Cart Button */}
                {cartItems.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="w-full mt-3 text-red-500 hover:text-red-700 text-sm"
                  >
                    Clear Cart
                  </button>
                )}

                {/* Features */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-sky-500" />
                      <span className="text-sm text-gray-600">Free shipping over ₦23,000</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="h-5 w-5 text-sky-500" />
                      <span className="text-sm text-gray-600">Secure checkout</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RotateCcw className="h-5 w-5 text-sky-500" />
                      <span className="text-sm text-gray-600">30-day returns</span>
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