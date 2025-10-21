// // //pages/CheckoutPage.jsx
// import React, { useState, useEffect } from 'react';
// import { ShoppingBag, Lock, CheckCircle, Truck, ShieldCheck, User, Tag, X } from 'lucide-react';
// import { URL } from '../url';
// import { useCart } from '../context/CartContext';
// import Navbar from '../components/Navbar';

// export default function Checkout() {
//   const { cartItems, fetchCartItems, clearCart } = useCart();
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState('');
//   const [showNewAddressForm, setShowNewAddressForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [orderComplete, setOrderComplete] = useState(false);
//   const [orderData, setOrderData] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//   // Discount states
//   const [discountCode, setDiscountCode] = useState('');
//   const [appliedDiscount, setAppliedDiscount] = useState(null);
//   const [discountLoading, setDiscountLoading] = useState(false);
//   const [discountError, setDiscountError] = useState('');

//   const [shippingInfo, setShippingInfo] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     streetAddress: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: 'Nigeria'
//   });

//   // Load Paystack script
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://js.paystack.co/v1/inline.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       if (document.body.contains(script)) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     checkAuthentication();
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchCartItems();
//       fetchAddresses();
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     if (addresses.length === 0 && isAuthenticated) {
//       setShowNewAddressForm(true);
//     }
//   }, [addresses, isAuthenticated]);

//   const checkAuthentication = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       localStorage.setItem('returnUrl', '/checkout');
//       window.location.href = '/login';
//       return;
//     }
//     setIsAuthenticated(true);
//   };

//   const fetchAddresses = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) return;

//       const response = await fetch(`${URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAddresses(data.addresses || []);

//         const defaultAddress = data.addresses?.find(addr => addr.isDefault);
//         if (defaultAddress) {
//           setSelectedAddressId(defaultAddress.id);
//         }
//       }
//     } catch (err) {
//       console.error('Error fetching addresses:', err);
//     }
//   };

//   const validateDiscountCode = async () => {
//     if (!discountCode.trim()) {
//       setDiscountError('Please enter a discount code');
//       return;
//     }

//     setDiscountLoading(true);
//     setDiscountError('');

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${URL}/api/discounts/validate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token && { Authorization: `Bearer ${token}` })
//         },
//         body: JSON.stringify({
//           code: discountCode.trim(),
//           subtotal: subtotal
//         })
//       });

//       const data = await response.json();

//       if (response.ok && data.valid) {
//         setAppliedDiscount(data.discount);
//         setDiscountError('');
//       } else {
//         setDiscountError(data.message || 'Invalid discount code');
//         setAppliedDiscount(null);
//       }
//     } catch (error) {
//       console.error('Error validating discount:', error);
//       setDiscountError('Failed to validate discount code');
//       setAppliedDiscount(null);
//     } finally {
//       setDiscountLoading(false);
//     }
//   };

//   const removeDiscount = () => {
//     setAppliedDiscount(null);
//     setDiscountCode('');
//     setDiscountError('');
//   };

//   const createAddress = async (addressData) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${URL}/api/addresses`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(addressData)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAddresses(prev => [...prev, data.address]);
//         setSelectedAddressId(data.address.id);
//         setShowNewAddressForm(false);
//         return data.address;
//       } else {
//         throw new Error('Failed to create address');
//       }
//     } catch (err) {
//       console.error('Error creating address:', err);
//       throw err;
//     }
//   };

//   const createOrder = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       const orderItems = cartItems.map(item => ({
//         productId: item.product.id,
//         quantity: item.quantity,
//         selectedFlavor: item.selectedFlavor,
//         selectedSize: item.selectedSize
//       }));

//       const response = await fetch(`${URL}/api/orders`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           items: orderItems,
//           shippingAddressId: selectedAddressId,
//           paymentMethod: 'paystack',
//           discountCode: appliedDiscount ? appliedDiscount.code : null
//         })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         return data.order;
//       } else {
//         const errorData = await response.json();
//         console.log('Order creation error:', errorData);
//         throw new Error(errorData.message || 'Failed to create order');
//       }
//     } catch (err) {
//       console.error('Error creating order:', err);
//       throw err;
//     }
//   };

//   const handlePaystackSuccess = async (reference, order) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${URL}/api/payments/confirm`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           orderId: order.id,
//           paymentReference: reference.reference,
//           paymentMethod: 'paystack'
//         })
//       });

//       if (response.ok) {
//         await clearCart();
//         setOrderData(order);
//         setOrderComplete(true);
//       } else {
//         throw new Error('Payment confirmation failed');
//       }
//     } catch (error) {
//       console.error('Payment confirmation failed:', error);
//       alert('Payment confirmation failed. Please contact support.');
//     }
//   };

//   const handlePaystackClose = () => {
//     alert('Payment was cancelled. You can try again.');
//   };

//   const handleMakePayment = async () => {
//     if (!isAuthenticated) {
//       localStorage.setItem('returnUrl', '/checkout');
//       window.location.href = '/login';
//       return;
//     }

//     setLoading(true);
    
//     try {
//       // Create or use existing address
//       let addressId = selectedAddressId;
      
//       if (!addressId && showNewAddressForm) {
//         const newAddress = await createAddress({
//           type: 'home',
//           ...shippingInfo,
//           isDefault: addresses.length === 0
//         });
//         addressId = newAddress.id;
//       }

//       if (!addressId) {
//         alert('Please select or create a shipping address');
//         setLoading(false);
//         return;
//       }

//       // Create order FIRST
//       const order = await createOrder();
//       setOrderData(order);

//       // Initialize Paystack payment
//       if (!window.PaystackPop) {
//         alert('Paystack is not loaded. Please refresh the page and try again.');
//         setLoading(false);
//         return;
//       }

//       const user = JSON.parse(localStorage.getItem('user') || '{}');
      
//       const handler = window.PaystackPop.setup({
//         key: 'pk_live_1633fba5489bdc4774c767223f0e1c18d2e277f8', 
//         email: user?.email || shippingInfo.email,
//         amount: Math.round(total * 100),
//         currency: 'NGN',
//         ref: `${order.orderNumber}-${Date.now()}`,
//         metadata: {
//           order_id: order.id,
//           order_number: order.orderNumber,
//           customer_name: `${user?.firstName || shippingInfo.firstName} ${user?.lastName || shippingInfo.lastName}`
//         },
//         callback: function(response) {
//           handlePaystackSuccess(response, order);
//         },
//         onClose: handlePaystackClose
//       });

//       handler.openIframe();
//     } catch (error) {
//       console.error('Payment initialization failed:', error);
//       alert('Failed to initialize payment. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setShippingInfo(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
//   const discountAmount = appliedDiscount ? appliedDiscount.discountAmount : 0;
//   const discountedSubtotal = subtotal - discountAmount;
//   const shipping = discountedSubtotal > 23000 ? 0 : 500;
//   const tax = discountedSubtotal * 0.075; // 7.5% VAT
//   const total = discountedSubtotal + shipping + tax;

//   const isFormValid = () => {
//     if (selectedAddressId) return true;
//     if (!showNewAddressForm) return false;

//     return shippingInfo.firstName &&
//       shippingInfo.lastName &&
//       shippingInfo.email &&
//       shippingInfo.phone &&
//       shippingInfo.streetAddress &&
//       shippingInfo.city &&
//       shippingInfo.state &&
//       shippingInfo.zipCode;
//   };

//   // Show login prompt if not authenticated
//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full text-center">
//           <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-100">
//             <User className="h-16 w-16 text-sky-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Sign In Required
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Please sign in to your account to proceed with checkout.
//             </p>
//             <div className="space-y-3">
//               <button
//                 onClick={() => {
//                   localStorage.setItem('returnUrl', '/checkout');
//                   window.location.href = '/login';
//                 }}
//                 className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
//               >
//                 Sign In
//               </button>
//               <button
//                 onClick={() => window.location.href = '/register'}
//                 className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//               >
//                 Create Account
//               </button>
//               <button
//                 onClick={() => window.location.href = '/cart'}
//                 className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
//               >
//                 Back to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (orderComplete) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full text-center">
//           <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-100">
//             <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Order Confirmed!
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Thank you for your order! Your order number is <strong>{orderData?.orderNumber}</strong>.
//             </p>
//             <div className="space-y-3">
//               <button
//                 onClick={() => window.location.href = '/'}
//                 className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
//               >
//                 Continue Shopping
//               </button>
//               <button
//                 onClick={() => window.location.href = '/profile'}
//                 className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//               >
//                 View Orders
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Show empty cart message if no items
//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full text-center">
//           <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-100">
//             <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Cart is Empty
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Add some items to your cart before proceeding to checkout.
//             </p>
//             <button
//               onClick={() => window.location.href = '/products'}
//               className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <Navbar/>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
//           <p className="text-gray-600 mt-2">Complete your order</p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Shipping Information */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>

//               {/* Existing Addresses */}
//               {addresses.length > 0 && (
//                 <div className="mb-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Shipping Address</h3>
//                   <div className="space-y-3">
//                     {addresses.map((address) => (
//                       <div
//                         key={address.id}
//                         className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddressId === address.id
//                             ? 'border-sky-500 bg-sky-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                           }`}
//                         onClick={() => {
//                           setSelectedAddressId(address.id);
//                           setShowNewAddressForm(false);
//                         }}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <div className="flex items-center space-x-2">
//                               <span className="font-medium">{address.type}</span>
//                               {address.isDefault && (
//                                 <span className="px-2 py-1 text-xs bg-sky-100 text-sky-800 rounded-full">
//                                   Default
//                                 </span>
//                               )}
//                             </div>
//                             <p className="text-sm text-gray-600 mt-1">
//                               {address.firstName} {address.lastName}
//                             </p>
//                             <p className="text-sm text-gray-600">
//                               {address.streetAddress}, {address.city}, {address.state} {address.zipCode}
//                             </p>
//                             <p className="text-sm text-gray-600">{address.phone}</p>
//                           </div>
//                           <input
//                             type="radio"
//                             name="address"
//                             checked={selectedAddressId === address.id}
//                             onChange={() => setSelectedAddressId(address.id)}
//                             className="text-sky-600 focus:ring-sky-500"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => {
//                       setShowNewAddressForm(true);
//                       setSelectedAddressId('');
//                     }}
//                     className="mt-4 text-sky-600 hover:text-sky-700 font-medium"
//                   >
//                     + Add new address
//                   </button>
//                 </div>
//               )}

//               {/* New Address Form */}
//               {(showNewAddressForm || addresses.length === 0) && (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
//                       <input
//                         type="text"
//                         value={shippingInfo.firstName}
//                         onChange={(e) => handleInputChange('firstName', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         placeholder="John"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
//                       <input
//                         type="text"
//                         value={shippingInfo.lastName}
//                         onChange={(e) => handleInputChange('lastName', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         placeholder="Doe"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                     <input
//                       type="email"
//                       value={shippingInfo.email}
//                       onChange={(e) => handleInputChange('email', e.target.value)}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                       placeholder="john@example.com"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                     <input
//                       type="tel"
//                       value={shippingInfo.phone}
//                       onChange={(e) => handleInputChange('phone', e.target.value)}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                       placeholder="+234 123 456 7890"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
//                     <input
//                       type="text"
//                       value={shippingInfo.streetAddress}
//                       onChange={(e) => handleInputChange('streetAddress', e.target.value)}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                       placeholder="123 Main Street"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                       <input
//                         type="text"
//                         value={shippingInfo.city}
//                         onChange={(e) => handleInputChange('city', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         placeholder="Lagos"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
//                       <input
//                         type="text"
//                         value={shippingInfo.state}
//                         onChange={(e) => handleInputChange('state', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         placeholder="Lagos State"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
//                       <input
//                         type="text"
//                         value={shippingInfo.zipCode}
//                         onChange={(e) => handleInputChange('zipCode', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         placeholder="100001"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
//                       <select
//                         value={shippingInfo.country}
//                         onChange={(e) => handleInputChange('country', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                       >
//                         <option value="Nigeria">Nigeria</option>
//                         <option value="United States">United States</option>
//                         <option value="United Kingdom">United Kingdom</option>
//                         <option value="Canada">Canada</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="flex justify-end mt-8">
//                 <button
//                   onClick={handleMakePayment}
//                   disabled={loading || !isFormValid()}
//                   className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       <span>Processing...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Lock className="h-5 w-5" />
//                       <span>Make Payment - ₦{total.toLocaleString()}</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

//               {/* Cart Items */}
//               <div className="space-y-4 mb-6">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
//                       <img
//                         src={item.product.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'}
//                         alt={item.product.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
//                       <p className="text-xs text-gray-600">
//                         {item.selectedFlavor && `${item.selectedFlavor}`}
//                         {item.selectedFlavor && item.selectedSize && ' • '}
//                         {item.selectedSize && `${item.selectedSize}`}
//                       </p>
//                       <p className="text-sm text-gray-900">Qty: {item.quantity}</p>
//                     </div>
//                     <span className="text-sm font-medium">₦{(item.product.price * item.quantity).toLocaleString()}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Discount Code Section */}
//               <div className="mb-6 pb-6 border-b border-gray-200">
//                 <h3 className="text-lg font-medium text-gray-900 mb-3">Discount Code</h3>
                
//                 {appliedDiscount ? (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="flex items-center space-x-2">
//                           <Tag className="h-4 w-4 text-green-600" />
//                           <span className="text-green-800 font-medium">{appliedDiscount.code}</span>
//                         </div>
//                         <p className="text-sm text-green-600 mt-1">{appliedDiscount.name}</p>
//                         <p className="text-sm font-medium text-green-800">
//                           -₦{appliedDiscount.discountAmount.toLocaleString()} saved!
//                         </p>
//                       </div>
//                       <button
//                         onClick={removeDiscount}
//                         className="text-green-600 hover:text-green-800"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-3">
//                     <div className="flex space-x-2">
//                       <input
//                         type="text"
//                         value={discountCode}
//                         onChange={(e) => setDiscountCode(e.target.value)}
//                         placeholder="Enter discount code"
//                         className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
//                       />
//                       <button
//                         onClick={validateDiscountCode}
//                         disabled={discountLoading || !discountCode.trim()}
//                         className="bg-sky-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {discountLoading ? (
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                         ) : (
//                           'Apply'
//                         )}
//                       </button>
//                     </div>
//                     {discountError && (
//                       <p className="text-sm text-red-600">{discountError}</p>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Pricing */}
//               <div className="space-y-3 border-t pt-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-medium">₦{subtotal.toLocaleString()}</span>
//                 </div>
                
//                 {appliedDiscount && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount ({appliedDiscount.code})</span>
//                     <span className="font-medium">-₦{discountAmount.toLocaleString()}</span>
//                   </div>
//                 )}
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-medium">{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax (7.5%)</span>
//                   <span className="font-medium">₦{tax.toLocaleString()}</span>
//                 </div>
                
//                 <div className="border-t pt-3">
//                   <div className="flex justify-between">
//                     <span className="text-lg font-semibold">Total</span>
//                     <span className="text-lg font-semibold">₦{total.toLocaleString()}</span>
//                   </div>
//                   {appliedDiscount && (
//                     <p className="text-sm text-green-600 mt-1">
//                       You saved ₦{discountAmount.toLocaleString()}!
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Features */}
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3">
//                     <Truck className="h-5 w-5 text-sky-500" />
//                     <span className="text-sm text-gray-600">24 - 72 hour delivery all over Nigeria</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <ShieldCheck className="h-5 w-5 text-sky-500" />
//                     <span className="text-sm text-gray-600">Secure payment with Paystack</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// //pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Lock, CheckCircle, Truck, ShieldCheck, User, Tag, X } from 'lucide-react';
import { URL } from '../url';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function Checkout() {
  const { cartItems, fetchCartItems, clearCart } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Delivery fee states
  const [deliveryFees, setDeliveryFees] = useState([]);
  const [selectedDeliveryState, setSelectedDeliveryState] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [estimatedDays, setEstimatedDays] = useState(null);
  
  // Discount states
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountError, setDiscountError] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria'
  });

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
      fetchAddresses();
      fetchDeliveryFees();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (addresses.length === 0 && isAuthenticated) {
      setShowNewAddressForm(true);
    }
  }, [addresses, isAuthenticated]);

  // Update delivery fee when state changes
  useEffect(() => {
    if (shippingInfo.state) {
      handleDeliveryStateChange(shippingInfo.state);
    }
  }, [shippingInfo.state]);

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('returnUrl', '/checkout');
      window.location.href = '/login';
      return;
    }
    setIsAuthenticated(true);
  };

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAddresses(data.addresses || []);

        const defaultAddress = data.addresses?.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
          handleDeliveryStateChange(defaultAddress.state);
        }
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  };

  const fetchDeliveryFees = async () => {
    try {
      const response = await fetch(`${URL}/api/delivery-fees?limit=50&sortBy=state&sortOrder=ASC`);
      if (response.ok) {
        const data = await response.json();
        setDeliveryFees(data.deliveryFees || []);
      }
    } catch (error) {
      console.error('Error fetching delivery fees:', error);
    }
  };

  const handleDeliveryStateChange = (state) => {
    setSelectedDeliveryState(state);
    const selectedFee = deliveryFees.find(fee => fee.state === state);
    if (selectedFee) {
      setDeliveryFee(parseFloat(selectedFee.fee));
      setEstimatedDays(selectedFee.estimatedDays);
    } else {
      setDeliveryFee(0);
      setEstimatedDays(null);
    }
  };

  const validateDiscountCode = async () => {
    if (!discountCode.trim()) {
      setDiscountError('Please enter a discount code');
      return;
    }

    setDiscountLoading(true);
    setDiscountError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/discounts/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          code: discountCode.trim(),
          subtotal: subtotal
        })
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setAppliedDiscount(data.discount);
        setDiscountError('');
      } else {
        setDiscountError(data.message || 'Invalid discount code');
        setAppliedDiscount(null);
      }
    } catch (error) {
      console.error('Error validating discount:', error);
      setDiscountError('Failed to validate discount code');
      setAppliedDiscount(null);
    } finally {
      setDiscountLoading(false);
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    setDiscountError('');
  };

  const createAddress = async (addressData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(addressData)
      });

      if (response.ok) {
        const data = await response.json();
        setAddresses(prev => [...prev, data.address]);
        setSelectedAddressId(data.address.id);
        setShowNewAddressForm(false);
        return data.address;
      } else {
        throw new Error('Failed to create address');
      }
    } catch (err) {
      console.error('Error creating address:', err);
      throw err;
    }
  };

  const createOrder = async () => {
    try {
      const token = localStorage.getItem('token');

      const orderItems = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedFlavor: item.selectedFlavor,
        selectedSize: item.selectedSize
      }));

      const response = await fetch(`${URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: orderItems,
          shippingAddressId: selectedAddressId,
          paymentMethod: 'paystack',
          discountCode: appliedDiscount ? appliedDiscount.code : null
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.order;
      } else {
        const errorData = await response.json();
        console.log('Order creation error:', errorData);
        throw new Error(errorData.message || 'Failed to create order');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  };

  const handlePaystackSuccess = async (reference, order) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/payments/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: order.id,
          paymentReference: reference.reference,
          paymentMethod: 'paystack'
        })
      });

      if (response.ok) {
        await clearCart();
        setOrderData(order);
        setOrderComplete(true);
      } else {
        throw new Error('Payment confirmation failed');
      }
    } catch (error) {
      console.error('Payment confirmation failed:', error);
      alert('Payment confirmation failed. Please contact support.');
    }
  };

  const handlePaystackClose = () => {
    alert('Payment was cancelled. You can try again.');
  };

  const handleMakePayment = async () => {
    if (!isAuthenticated) {
      localStorage.setItem('returnUrl', '/checkout');
      window.location.href = '/login';
      return;
    }

    if (deliveryFee === 0) {
      alert('Please select a delivery state');
      return;
    }

    setLoading(true);
    
    try {
      // Create or use existing address
      let addressId = selectedAddressId;
      
      if (!addressId && showNewAddressForm) {
        const newAddress = await createAddress({
          type: 'home',
          ...shippingInfo,
          isDefault: addresses.length === 0
        });
        addressId = newAddress.id;
      }

      if (!addressId) {
        alert('Please select or create a shipping address');
        setLoading(false);
        return;
      }

      // Create order FIRST
      const order = await createOrder();
      setOrderData(order);

      // Initialize Paystack payment
      if (!window.PaystackPop) {
        alert('Paystack is not loaded. Please refresh the page and try again.');
        setLoading(false);
        return;
      }

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const handler = window.PaystackPop.setup({
        key: 'pk_live_1633fba5489bdc4774c767223f0e1c18d2e277f8', 
        email: user?.email || shippingInfo.email,
        amount: Math.round(total * 100),
        currency: 'NGN',
        ref: `${order.orderNumber}-${Date.now()}`,
        metadata: {
          order_id: order.id,
          order_number: order.orderNumber,
          customer_name: `${user?.firstName || shippingInfo.firstName} ${user?.lastName || shippingInfo.lastName}`,
          delivery_state: selectedDeliveryState,
          delivery_fee: deliveryFee
        },
        callback: function(response) {
          handlePaystackSuccess(response, order);
        },
        onClose: handlePaystackClose
      });

      handler.openIframe();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Failed to initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = appliedDiscount ? appliedDiscount.discountAmount : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const total = discountedSubtotal + deliveryFee;

  const isFormValid = () => {
    if (selectedAddressId) return true;
    if (!showNewAddressForm) return false;

    return shippingInfo.firstName &&
      shippingInfo.lastName &&
      shippingInfo.email &&
      shippingInfo.phone &&
      shippingInfo.streetAddress &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.zipCode;
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-100">
            <User className="h-16 w-16 text-sky-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sign In Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to your account to proceed with checkout.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  localStorage.setItem('returnUrl', '/checkout');
                  window.location.href = '/login';
                }}
                className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => window.location.href = '/register'}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Create Account
              </button>
              <button
                onClick={() => window.location.href = '/cart'}
                className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-100">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order! Your order number is <strong>{orderData?.orderNumber}</strong>.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => window.location.href = '/profile'}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty cart message if no items
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-100">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Cart is Empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some items to your cart before proceeding to checkout.
            </p>
            <button
              onClick={() => window.location.href = '/products'}
              className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>

              {/* Existing Addresses */}
              {addresses.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Shipping Address</h3>
                  <div className="space-y-3">
                    {addresses.map((address) => {
                      const addressFee = deliveryFees.find(fee => fee.state === address.state);
                      return (
                        <div
                          key={address.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddressId === address.id
                              ? 'border-sky-500 bg-sky-50'
                              : 'border-gray-200 hover:border-gray-300'
                            }`}
                          onClick={() => {
                            setSelectedAddressId(address.id);
                            setShowNewAddressForm(false);
                            handleDeliveryStateChange(address.state);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{address.type}</span>
                                {address.isDefault && (
                                  <span className="px-2 py-1 text-xs bg-sky-100 text-sky-800 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {address.firstName} {address.lastName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {address.streetAddress}, {address.city}, {address.state} {address.zipCode}
                              </p>
                              <p className="text-sm text-gray-600">{address.phone}</p>
                              {addressFee && (
                                <p className="text-xs text-sky-600 mt-2 font-medium">
                                  Delivery: ₦{parseFloat(addressFee.fee).toLocaleString()} • {addressFee.estimatedDays} {addressFee.estimatedDays === 1 ? 'day' : 'days'}
                                </p>
                              )}
                            </div>
                            <input
                              type="radio"
                              name="address"
                              checked={selectedAddressId === address.id}
                              onChange={() => {
                                setSelectedAddressId(address.id);
                                handleDeliveryStateChange(address.state);
                              }}
                              className="text-sky-600 focus:ring-sky-500 mt-1"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      setShowNewAddressForm(true);
                      setSelectedAddressId('');
                    }}
                    className="mt-4 text-sky-600 hover:text-sky-700 font-medium"
                  >
                    + Add new address
                  </button>
                </div>
              )}

              {/* New Address Form */}
              {(showNewAddressForm || addresses.length === 0) && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="+234 123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={shippingInfo.streetAddress}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Lagos"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State (Delivery Location) *</label>
                      <select
                        value={shippingInfo.state}
                        onChange={(e) => {
                          handleInputChange('state', e.target.value);
                          handleDeliveryStateChange(e.target.value);
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      >
                        <option value="">Select state</option>
                        {deliveryFees.map((fee) => (
                          <option key={fee.id} value={fee.state}>
                            {fee.state} - ₦{parseFloat(fee.fee).toLocaleString()} ({fee.estimatedDays} {fee.estimatedDays === 1 ? 'day' : 'days'})
                          </option>
                        ))}
                      </select>
                      {shippingInfo.state && deliveryFee > 0 && (
                        <p className="text-xs text-sky-600 mt-1">
                          Delivery fee: ₦{deliveryFee.toLocaleString()} • Estimated: {estimatedDays} {estimatedDays === 1 ? 'day' : 'days'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="100001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <select
                        value={shippingInfo.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      >
                        <option value="Nigeria">Nigeria</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleMakePayment}
                  disabled={loading || !isFormValid() || deliveryFee === 0}
                  className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>Make Payment - ₦{total.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.product.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-xs text-gray-600">
                        {item.selectedFlavor && `${item.selectedFlavor}`}
                        {item.selectedFlavor && item.selectedSize && ' • '}
                        {item.selectedSize && `${item.selectedSize}`}
                      </p>
                      <p className="text-sm text-gray-900">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">₦{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Discount Code Section */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Discount Code</h3>
                
                {appliedDiscount ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Tag className="h-4 w-4 text-green-600" />
                          <span className="text-green-800 font-medium">{appliedDiscount.code}</span>
                        </div>
                        <p className="text-sm text-green-600 mt-1">{appliedDiscount.name}</p>
                        <p className="text-sm font-medium text-green-800">
                          -₦{appliedDiscount.discountAmount.toLocaleString()} saved!
                        </p>
                      </div>
                      <button
                        onClick={removeDiscount}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Enter discount code"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                      />
                      <button
                        onClick={validateDiscountCode}
                        disabled={discountLoading || !discountCode.trim()}
                        className="bg-sky-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {discountLoading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          'Apply'
                        )}
                      </button>
                    </div>
                    {discountError && (
                      <p className="text-sm text-red-600">{discountError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedDiscount.code})</span>
                    <span className="font-medium">-₦{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                {/* Delivery Fee Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location
                  </label>
                  <select
                    value={selectedDeliveryState}
                    onChange={(e) => handleDeliveryStateChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  >
                    <option value="">Select delivery state</option>
                    {deliveryFees.map((fee) => (
                      <option key={fee.id} value={fee.state}>
                        {fee.state} - ₦{parseFloat(fee.fee).toLocaleString()} ({fee.estimatedDays} {fee.estimatedDays === 1 ? 'day' : 'days'})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? 'Select state' : `₦${deliveryFee.toLocaleString()}`}
                  </span>
                </div>

                {selectedDeliveryState && estimatedDays && (
                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-sky-600" />
                      <div>
                        <p className="text-sm font-medium text-sky-900">
                          Delivering to {selectedDeliveryState}
                        </p>
                        <p className="text-xs text-sky-700">
                          Est. {estimatedDays} {estimatedDays === 1 ? 'day' : 'days'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">₦{total.toLocaleString()}</span>
                  </div>
                  {appliedDiscount && (
                    <p className="text-sm text-green-600 mt-1">
                      You saved ₦{discountAmount.toLocaleString()}!
                    </p>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-sky-500" />
                    <span className="text-sm text-gray-600">Delivery across Nigeria</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="h-5 w-5 text-sky-500" />
                    <span className="text-sm text-gray-600">Secure payment with Paystack</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}