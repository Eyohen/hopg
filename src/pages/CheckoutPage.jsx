// import React, { useState } from 'react';
// import { ShoppingBag, Search, CreditCard, Truck, ShieldCheck, Lock, CheckCircle } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// export default function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);

//   const cartItems = [
//     {
//       id: 1,
//       name: 'Premium Whey Isolate',
//       flavor: 'Chocolate',
//       size: '2.5 lbs',
//       price: 49.99,
//       quantity: 2,
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'
//     },
//     {
//       id: 2,
//       name: 'Mass Gainer Pro',
//       flavor: 'Vanilla',
//       size: '5 lbs',
//       price: 89.99,
//       quantity: 1,
//       image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop'
//     }
//   ];

//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const shipping = 0; // Free shipping
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   const steps = [
//     { id: 1, name: 'Shipping', status: currentStep > 1 ? 'complete' : currentStep === 1 ? 'current' : 'upcoming' },
//     // { id: 2, name: 'Payment', status: currentStep > 2 ? 'complete' : currentStep === 2 ? 'current' : 'upcoming' },
//     // { id: 3, name: 'Review', status: currentStep === 3 ? 'current' : 'upcoming' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm border-b border-gray-100">
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

//             <div className="flex items-center space-x-2">
//               <Lock className="h-4 w-4 text-green-600" />
//               <span className="text-sm text-gray-600">Secure Checkout</span>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Progress Steps */}
//         <div className="mb-8">
//           <nav aria-label="Progress">
//             <ol className="flex items-center justify-center">
//               {steps.map((step, stepIdx) => (
//                 <li key={step.name} className={`${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}>
//                   {step.status === 'complete' ? (
//                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                       <div className="h-0.5 w-full bg-sky-600" />
//                     </div>
//                   ) : step.status === 'current' ? (
//                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                       <div className="h-0.5 w-full bg-gray-200" />
//                     </div>
//                   ) : (
//                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                       <div className="h-0.5 w-full bg-gray-200" />
//                     </div>
//                   )}
//                   <div className={`relative w-8 h-8 flex items-center justify-center rounded-full border-2 bg-white ${
//                     step.status === 'complete' ? 'border-sky-600 bg-sky-600' : 
//                     step.status === 'current' ? 'border-sky-600' : 'border-gray-300'
//                   }`}>
//                     {step.status === 'complete' ? (
//                       <CheckCircle className="w-5 h-5 text-white" />
//                     ) : (
//                       <span className={`text-sm font-medium ${
//                         step.status === 'current' ? 'text-sky-600' : 'text-gray-500'
//                       }`}>
//                         {step.id}
//                       </span>
//                     )}
//                   </div>
//                   <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-900">
//                     {step.name}
//                   </span>
//                 </li>
//               ))}
//             </ol>
//           </nav>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Checkout Form */}
//           <div className="lg:col-span-2">
//             {currentStep === 1 && (
//               <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>

//                 <form className="space-y-6">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
//                       <input
//                         type="text"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         placeholder="John"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
//                       <input
//                         type="text"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         placeholder="Doe"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                     <input
//                       type="email"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                       placeholder="john@example.com"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                     <input
//                       type="tel"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                       placeholder="+1 (555) 123-4567"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
//                     <input
//                       type="text"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                       placeholder="123 Main Street"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                       <input
//                         type="text"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         placeholder="New York"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
//                       <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
//                         <option>Select State</option>
//                         <option>New York</option>
//                         <option>California</option>
//                         <option>Texas</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
//                       <input
//                         type="text"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         placeholder="10001"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
//                       <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
//                         <option>United States</option>
//                         <option>Canada</option>
//                         <option>United Kingdom</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => setCurrentStep(2)}
//                       className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
//                     >
//                       Continue to Payment
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}


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
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
//                       <p className="text-xs text-gray-600">{item.flavor} • {item.size}</p>
//                       <p className="text-sm text-gray-900">Qty: {item.quantity}</p>
//                     </div>
//                     <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Pricing */}
//               <div className="space-y-3 border-t pt-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-medium">${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-medium text-green-600">Free</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax</span>
//                   <span className="font-medium">${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-3">
//                   <div className="flex justify-between">
//                     <span className="text-lg font-semibold">Total</span>
//                     <span className="text-lg font-semibold">${total.toFixed(2)}</span>
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






import React, { useState, useEffect } from 'react';
import { ShoppingBag, Lock, CheckCircle, Truck, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';



export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState(null);

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
    fetchCartItems();
    fetchAddresses();
  }, []);


  useEffect(() => {
    if (addresses.length === 0) {
      setShowNewAddressForm(true);
    }
  }, [addresses]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems || []);
      }
    } catch (err) {
      console.error('Error fetching cart items:', err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      if (!token) return;

      const response = await fetch(`${URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Addresses:', data.addresses);
        setAddresses(data.addresses || []);

        const defaultAddress = data.addresses?.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        }
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
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
          paymentMethod: 'paystack'
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.order;
      } else {
        const errorData = await response.json();
        console.log('Order creation error:', errorData);
        throw new Error('Failed to create order');
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
        orderId: order.id, // Use the order passed directly
        paymentReference: reference.reference,
        paymentMethod: 'paystack'
      })
    });

    if (response.ok) {
      await fetch(`${URL}/api/cart`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
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
    setOrderData(order); // Set order data immediately

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
        customer_name: `${user?.firstName || shippingInfo.firstName} ${user?.lastName || shippingInfo.lastName}`
      },
      callback: function(response) {
        handlePaystackSuccess(response, order); // Pass order directly
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
  const shipping = subtotal; // Free shipping
  const total = subtotal + shipping;

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
                <span className="text-gray-600 text-sm">Home of Protein Goodies</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </nav>

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
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddressId === address.id
                            ? 'border-sky-500 bg-sky-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => {
                          setSelectedAddressId(address.id);
                          setShowNewAddressForm(false);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
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
                          </div>
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddressId === address.id}
                            onChange={() => setSelectedAddressId(address.id)}
                            className="text-sky-600 focus:ring-sky-500"
                          />
                        </div>
                      </div>
                    ))}
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Lagos State"
                      />
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
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleMakePayment}
                  disabled={loading || !isFormValid()}
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

              {/* Pricing */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-sky-500" />
                    <span className="text-sm text-gray-600">Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="h-5 w-5 text-sky-500" />
                    <span className="text-sm text-gray-600">Secure payment with Paystack</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-sky-500" />
                    <span className="text-sm text-gray-600">30-day money-back guarantee</span>
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