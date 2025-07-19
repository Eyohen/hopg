// import React, { useState } from 'react';
// import { ShoppingBag, Search, User, MapPin, Bell, Settings, LogOut, Edit} from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// export default function Profile() {
//   const [activeTab, setActiveTab] = useState('addresses');
 
//   const addresses = [
//     {
//       id: 1,
//       type: 'Home',
//       name: 'John Doe',
//       address: '123 Main Street, New York, NY 10001',
//       phone: '+1 (555) 123-4567',
//       isDefault: true
//     },
//     {
//       id: 2,
//       type: 'Work',
//       name: 'John Doe',
//       address: '456 Business Ave, New York, NY 10002',
//       phone: '+1 (555) 987-6543',
//       isDefault: false
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
//                 <span className="text-gray-600 text-sm">Home of Protein Goodies</span>
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
//                   3
//                 </span>
//               </button>
//               <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
//                 <User className="h-4 w-4 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//               {/* Profile Info */}
//               <div className="text-center mb-6">
//                 <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <User className="h-10 w-10 text-white" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
//                 <p className="text-gray-600">john.doe@example.com</p>
//                 <p className="text-sm text-sky-600 mt-1">Premium Member</p>
//               </div>

//               {/* Navigation Menu */}
//               <nav className="space-y-2">
              
//                 <button
//                   onClick={() => setActiveTab('addresses')}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                     activeTab === 'addresses' ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   <MapPin className="h-5 w-5" />
//                   <span>Addresses</span>
//                 </button>
               
//                 <button
//                   onClick={() => setActiveTab('notifications')}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                     activeTab === 'notifications' ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Bell className="h-5 w-5" />
//                   <span>Notifications</span>
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('settings')}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                     activeTab === 'settings' ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Settings className="h-5 w-5" />
//                   <span>Settings</span>
//                 </button>
//                 <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
//                   <LogOut className="h-5 w-5" />
//                   <span>Sign Out</span>
//                 </button>
//               </nav>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
 
//             {/* Addresses Tab */}
//             {activeTab === 'addresses' && (
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">Shipping Addresses</h2>
//                   <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
//                     Add New Address
//                   </button>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {addresses.map((address) => (
//                     <div key={address.id} className="border border-gray-200 rounded-lg p-6">
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <div className="flex items-center space-x-2 mb-2">
//                             <h3 className="font-semibold text-gray-900">{address.type}</h3>
//                             {address.isDefault && (
//                               <span className="px-2 py-1 text-xs font-medium bg-sky-100 text-sky-800 rounded-full">
//                                 Default
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-600">{address.name}</p>
//                           <p className="text-gray-600">{address.address}</p>
//                           <p className="text-gray-600">{address.phone}</p>
//                         </div>
//                         <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                           <Edit className="h-4 w-4 text-gray-500" />
//                         </button>
//                       </div>
//                       <div className="flex space-x-3">
//                         <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
//                           Edit
//                         </button>
//                         <button className="flex-1 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors">
//                           Set as Default
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Settings Tab */}
//             {activeTab === 'settings' && (
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
//                         <input
//                           type="text"
//                           defaultValue="John"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
//                         <input
//                           type="text"
//                           defaultValue="Doe"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                     <input
//                       type="email"
//                       defaultValue="john.doe@example.com"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                     <input
//                       type="tel"
//                       defaultValue="+1 (555) 123-4567"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
//                         <input
//                           type="password"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
//                         <input
//                           type="password"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
//                         <input
//                           type="password"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-end space-x-4">
//                     <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//                       Cancel
//                     </button>
//                     <button className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
//                       Save Changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, MapPin, Bell, Settings, LogOut, Edit, Plus, X } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('addresses');
  const [addresses, setAddresses] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [profileFormData, setProfileFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [addressFormData, setAddressFormData] = useState({
    type: 'home',
    firstName: '',
    lastName: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
    isDefault: false
  });


  useEffect(() => {
    fetchUserProfile();
    fetchAddresses();
    fetchCartCount();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user);
        setProfileFormData({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
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
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  };

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        const count = data.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
        setCartCount(count);
      }
    } catch (err) {
      console.error('Error fetching cart count:', err);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // Update basic profile info
      const profileResponse = await fetch(`${URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: profileFormData.firstName,
          lastName: profileFormData.lastName,
          phone: profileFormData.phone
        })
      });

      if (profileResponse.ok) {
        alert('Profile updated successfully!');
        await fetchUserProfile();
      } else {
        const errorData = await profileResponse.json();
        alert(errorData.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  const createAddress = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${URL}/api/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(addressFormData)
      });

      if (response.ok) {
        alert('Address added successfully!');
        setShowAddressForm(false);
        setAddressFormData({
          type: 'home',
          firstName: '',
          lastName: '',
          phone: '',
          streetAddress: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'Nigeria',
          isDefault: false
        });
        await fetchAddresses();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add address');
      }
    } catch (err) {
      console.error('Error creating address:', err);
      alert('Failed to add address. Please try again.');
    }
  };

  const updateAddress = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${URL}/api/addresses/${editingAddress.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(addressFormData)
      });

      if (response.ok) {
        alert('Address updated successfully!');
        setEditingAddress(null);
        setShowAddressForm(false);
        await fetchAddresses();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update address');
      }
    } catch (err) {
      console.error('Error updating address:', err);
      alert('Failed to update address. Please try again.');
    }
  };

  const deleteAddress = async (addressId) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${URL}/api/addresses/${addressId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Address deleted successfully!');
        await fetchAddresses();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to delete address');
      }
    } catch (err) {
      console.error('Error deleting address:', err);
      alert('Failed to delete address. Please try again.');
    }
  };

  const setAsDefault = async (addressId) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${URL}/api/addresses/${addressId}/default`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Default address updated!');
        await fetchAddresses();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to set default address');
      }
    } catch (err) {
      console.error('Error setting default address:', err);
      alert('Failed to set default address. Please try again.');
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressFormData({
      type: address.type,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault
    });
    setShowAddressForm(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleAddressInputChange = (field, value) => {
    setAddressFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileInputChange = (field, value) => {
    setProfileFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
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
              <div 
                onClick={() => window.location.href = '/'}
                className="bg-sky-500 text-white px-3 py-2 rounded-lg font-bold text-xl cursor-pointer"
              >
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
              <button 
                onClick={() => window.location.href = '/cart'}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Profile Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {userProfile.firstName} {userProfile.lastName}
                </h2>
                <p className="text-gray-600">{userProfile.email}</p>
                <p className="text-sm text-sky-600 mt-1">Premium Member</p>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'addresses' ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                  <span>Addresses</span>
                </button>
               
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Shipping Addresses</h2>
                  <button 
                    onClick={() => {
                      setShowAddressForm(true);
                      setEditingAddress(null);
                      setAddressFormData({
                        type: 'home',
                        firstName: '',
                        lastName: '',
                        phone: '',
                        streetAddress: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        country: 'Nigeria',
                        isDefault: false
                      });
                    }}
                    className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {/* Address Form */}
                {showAddressForm && (
                  <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                      </h3>
                      <button 
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <X className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                          <select
                            value={addressFormData.type}
                            onChange={(e) => handleAddressInputChange('type', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          >
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={addressFormData.isDefault}
                              onChange={(e) => handleAddressInputChange('isDefault', e.target.checked)}
                              className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                            />
                            <span className="text-sm text-gray-700">Set as default</span>
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input
                            type="text"
                            value={addressFormData.firstName}
                            onChange={(e) => handleAddressInputChange('firstName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            value={addressFormData.lastName}
                            onChange={(e) => handleAddressInputChange('lastName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={addressFormData.phone}
                          onChange={(e) => handleAddressInputChange('phone', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                        <input
                          type="text"
                          value={addressFormData.streetAddress}
                          onChange={(e) => handleAddressInputChange('streetAddress', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <input
                            type="text"
                            value={addressFormData.city}
                            onChange={(e) => handleAddressInputChange('city', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                          <input
                            type="text"
                            value={addressFormData.state}
                            onChange={(e) => handleAddressInputChange('state', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                          <input
                            type="text"
                            value={addressFormData.zipCode}
                            onChange={(e) => handleAddressInputChange('zipCode', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                          <select
                            value={addressFormData.country}
                            onChange={(e) => handleAddressInputChange('country', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          >
                            <option value="Nigeria">Nigeria</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={editingAddress ? updateAddress : createAddress}
                          className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                        >
                          {editingAddress ? 'Update Address' : 'Save Address'}
                        </button>
                        <button
                          onClick={() => {
                            setShowAddressForm(false);
                            setEditingAddress(null);
                          }}
                          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Address List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900 capitalize">{address.type}</h3>
                            {address.isDefault && (
                              <span className="px-2 py-1 text-xs font-medium bg-sky-100 text-sky-800 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{address.firstName} {address.lastName}</p>
                          <p className="text-gray-600">{address.streetAddress}</p>
                          <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                          <p className="text-gray-600">{address.phone}</p>
                        </div>
                        <button 
                          onClick={() => handleEditAddress(address)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleEditAddress(address)}
                          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </button>
                        {!address.isDefault && (
                          <button 
                            onClick={() => setAsDefault(address.id)}
                            className="flex-1 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors"
                          >
                            Set as Default
                          </button>
                        )}
                        <button 
                          onClick={() => deleteAddress(address.id)}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {addresses.length === 0 && !showAddressForm && (
                  <div className="text-center py-8">
                    <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses found</h3>
                    <p className="text-gray-600 mb-4">Add your first shipping address to get started.</p>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={profileFormData.firstName}
                          onChange={(e) => handleProfileInputChange('firstName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={profileFormData.lastName}
                          onChange={(e) => handleProfileInputChange('lastName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileFormData.email}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileFormData.phone}
                      onChange={(e) => handleProfileInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={updateProfile}
                      className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}