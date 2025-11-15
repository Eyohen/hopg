import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, ToggleLeft, ToggleRight, 
  Copy, Calendar, Percent, DollarSign, Users,
  Search, Filter, Eye, CheckCircle, XCircle
} from 'lucide-react';
import { URL } from '../../url';

export default function DiscountManagement({ getFetchOptions }) {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('all');

  // Form states
  const [quickDiscountData, setQuickDiscountData] = useState({
    percentage: 10,
    code: '',
    name: '',
    description: '',
    validUntil: ''
  });

  const [discountForm, setDiscountForm] = useState({
    code: '',
    name: '',
    description: '',
    type: 'percentage',
    value: '',
    minOrderAmount: '',
    maxDiscountAmount: '',
    usageLimit: '',
    userUsageLimit: 1,
    validUntil: ''
  });

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/discounts?limit=50`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        setDiscounts(data.discounts || []);
      }
    } catch (error) {
      console.error('Error fetching discounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createQuickDiscount = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/discounts/quick`, {
        ...getFetchOptions('POST'),
        body: JSON.stringify(quickDiscountData)
      });

      if (response.ok) {
        const data = await response.json();
        setDiscounts([data.discount, ...discounts]);
        setShowQuickCreate(false);
        setQuickDiscountData({ percentage: 10, code: '', name: '', description: '', validUntil: '' });
        alert('Quick discount created successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create discount');
      }
    } catch (error) {
      console.error('Error creating quick discount:', error);
      alert('Failed to create discount');
    } finally {
      setLoading(false);
    }
  };

  const createDiscount = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/discounts`, {
        ...getFetchOptions('POST'),
        body: JSON.stringify(discountForm)
      });

      if (response.ok) {
        const data = await response.json();
        setDiscounts([data.discount, ...discounts]);
        setShowCreateModal(false);
        setDiscountForm({
          code: '',
          name: '',
          description: '',
          type: 'percentage',
          value: '',
          minOrderAmount: '',
          maxDiscountAmount: '',
          usageLimit: '',
          userUsageLimit: 1,
          validUntil: ''
        });
        alert('Discount created successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create discount');
      }
    } catch (error) {
      console.error('Error creating discount:', error);
      alert('Failed to create discount');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (discount) => {
    setSelectedDiscount(discount);
    setDiscountForm({
      code: discount.code,
      name: discount.name,
      description: discount.description || '',
      type: discount.type,
      value: discount.value,
      minOrderAmount: discount.minOrderAmount,
      maxDiscountAmount: discount.maxDiscountAmount || '',
      usageLimit: discount.usageLimit || '',
      userUsageLimit: discount.userUsageLimit,
      validUntil: discount.validUntil ? discount.validUntil.slice(0, 16) : ''
    });
    setShowEditModal(true);
  };

  const updateDiscount = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/discounts/${selectedDiscount.id}`, {
        ...getFetchOptions('PUT'),
        body: JSON.stringify(discountForm)
      });

      if (response.ok) {
        const data = await response.json();
        setDiscounts(discounts.map(d => d.id === selectedDiscount.id ? data.discount : d));
        setShowEditModal(false);
        setSelectedDiscount(null);
        alert('Discount updated successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update discount');
      }
    } catch (error) {
      console.error('Error updating discount:', error);
      alert('Failed to update discount');
    } finally {
      setLoading(false);
    }
  };

  const toggleDiscountStatus = async (id) => {
    try {
      const response = await fetch(`${URL}/api/discounts/${id}/toggle-status`, {
        ...getFetchOptions('PATCH')
      });

      if (response.ok) {
        const data = await response.json();
        setDiscounts(discounts.map(discount => 
          discount.id === id ? data.discount : discount
        ));
      } else {
        alert('Failed to toggle discount status');
      }
    } catch (error) {
      console.error('Error toggling discount status:', error);
      alert('Failed to toggle discount status');
    }
  };

  const deleteDiscount = async (id) => {
    if (!confirm('Are you sure you want to delete this discount code?')) return;

    try {
      const response = await fetch(`${URL}/api/discounts/${id}`, {
        ...getFetchOptions('DELETE')
      });

      if (response.ok) {
        setDiscounts(discounts.filter(discount => discount.id !== id));
        alert('Discount deleted successfully');
      } else {
        alert('Failed to delete discount');
      }
    } catch (error) {
      console.error('Error deleting discount:', error);
      alert('Failed to delete discount');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Discount code copied to clipboard!');
  };

  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && discount.isActive) ||
                         (filterActive === 'inactive' && !discount.isActive);
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'No expiry';
    return new Date(dateString).toLocaleDateString();
  };

  const isExpired = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Discount Codes</h2>
          <p className="text-gray-600">Manage discount codes and promotions</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowQuickCreate(true)}
            className="bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600 transition-colors flex items-center space-x-2"
          >
            <Percent className="h-4 w-4" />
            <span>Quick Discount</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Discount</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search discount codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <select
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Discounts Grid */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading discounts...</p>
          </div>
        ) : filteredDiscounts.length > 0 ? (
          filteredDiscounts.map((discount) => (
            <div key={discount.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                        {discount.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(discount.code)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Copy code"
                      >
                        <Copy className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    {discount.isActive ? (
                      <span className="flex items-center space-x-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                        <CheckCircle className="h-3 w-3" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium">
                        <XCircle className="h-3 w-3" />
                        <span>Inactive</span>
                      </span>
                    )}
                    {isExpired(discount.validUntil) && (
                      <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded-full text-xs font-medium">
                        Expired
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{discount.name}</h3>
                  {discount.description && (
                    <p className="text-gray-600 mb-3">{discount.description}</p>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      {discount.type === 'percentage' ? (
                        <Percent className="h-4 w-4 text-sky-500" />
                      ) : (
                        <DollarSign className="h-4 w-4 text-sky-500" />
                      )}
                      <div>
                        <p className="text-xs text-gray-500">Discount</p>
                        <p className="font-medium">
                          {discount.type === 'percentage' 
                            ? `${discount.value}%` 
                            : `₦${discount.value}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-sky-500" />
                      <div>
                        <p className="text-xs text-gray-500">Usage</p>
                        <p className="font-medium">
                          {discount.usageCount}/{discount.usageLimit || '∞'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-sky-500" />
                      <div>
                        <p className="text-xs text-gray-500">Min Order</p>
                        <p className="font-medium">₦{discount.minOrderAmount || 0}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-sky-500" />
                      <div>
                        <p className="text-xs text-gray-500">Expires</p>
                        <p className="font-medium text-sm">{formatDate(discount.validUntil)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Created by {discount.creator?.firstName} {discount.creator?.lastName} • 
                    {' '}{new Date(discount.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => openEditModal(discount)}
                    className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleDiscountStatus(discount.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      discount.isActive
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={discount.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {discount.isActive ? (
                      <ToggleRight className="h-5 w-5" />
                    ) : (
                      <ToggleLeft className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteDiscount(discount.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Percent className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No discount codes found</p>
          </div>
        )}
      </div>

      {/* Quick Create Modal */}
      {showQuickCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Quick Discount</h3>
              <button
                onClick={() => setShowQuickCreate(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Percentage
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[5, 10, 15, 20, 25].map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() => setQuickDiscountData({
                        ...quickDiscountData,
                        percentage,
                        name: `${percentage}% Off`,
                        description: `Get ${percentage}% off your order`
                      })}
                      className={`p-3 text-center rounded-lg border-2 font-medium transition-colors ${
                        quickDiscountData.percentage === percentage
                          ? 'border-sky-500 bg-sky-50 text-sky-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {percentage}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Code (Optional)
                </label>
                <input
                  type="text"
                  value={quickDiscountData.code}
                  onChange={(e) => setQuickDiscountData({...quickDiscountData, code: e.target.value.toUpperCase()})}
                  placeholder="e.g., PROTEIN25 (leave empty to auto-generate)"
                  maxLength={20}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono uppercase"
                />
                <p className="text-xs text-gray-500 mt-1">4-20 characters, letters and numbers only</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  value={quickDiscountData.name}
                  onChange={(e) => setQuickDiscountData({...quickDiscountData, name: e.target.value})}
                  placeholder={`${quickDiscountData.percentage}% Off`}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid Until (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={quickDiscountData.validUntil}
                  onChange={(e) => setQuickDiscountData({...quickDiscountData, validUntil: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowQuickCreate(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createQuickDiscount}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Discount'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Discount Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create Discount Code</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Code (Optional)
                </label>
                <input
                  type="text"
                  value={discountForm.code}
                  onChange={(e) => setDiscountForm({...discountForm, code: e.target.value.toUpperCase()})}
                  placeholder="e.g., PROTEIN25 (leave empty to auto-generate)"
                  maxLength={20}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono uppercase"
                />
                <p className="text-xs text-gray-500 mt-1">4-20 characters, letters and numbers only</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={discountForm.name}
                  onChange={(e) => setDiscountForm({...discountForm, name: e.target.value})}
                  placeholder="e.g., Summer Sale"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={discountForm.description}
                  onChange={(e) => setDiscountForm({...discountForm, description: e.target.value})}
                  placeholder="Optional description"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type *
                  </label>
                  <select
                    value={discountForm.type}
                    onChange={(e) => setDiscountForm({...discountForm, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value * {discountForm.type === 'percentage' ? '(%)' : '(₦)'}
                  </label>
                  <input
                    type="number"
                    value={discountForm.value}
                    onChange={(e) => setDiscountForm({...discountForm, value: e.target.value})}
                    placeholder={discountForm.type === 'percentage' ? '10' : '1000'}
                    required
                    min="0"
                    max={discountForm.type === 'percentage' ? '100' : undefined}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Order Amount (₦)
                  </label>
                  <input
                    type="number"
                    value={discountForm.minOrderAmount}
                    onChange={(e) => setDiscountForm({...discountForm, minOrderAmount: e.target.value})}
                    placeholder="0"
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Discount Amount (₦)
                  </label>
                  <input
                    type="number"
                    value={discountForm.maxDiscountAmount}
                    onChange={(e) => setDiscountForm({...discountForm, maxDiscountAmount: e.target.value})}
                    placeholder="Optional"
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid Until
                </label>
                <input
                  type="datetime-local"
                  value={discountForm.validUntil}
                  onChange={(e) => setDiscountForm({...discountForm, validUntil: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createDiscount}
                disabled={loading || !discountForm.name || !discountForm.value}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Discount'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Discount Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Discount Code</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedDiscount(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Code *
                </label>
                <input
                  type="text"
                  value={discountForm.code}
                  onChange={(e) => setDiscountForm({...discountForm, code: e.target.value.toUpperCase()})}
                  placeholder="e.g., PROTEIN25"
                  maxLength={20}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono uppercase"
                />
                <p className="text-xs text-gray-500 mt-1">4-20 characters, letters and numbers only</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={discountForm.name}
                  onChange={(e) => setDiscountForm({...discountForm, name: e.target.value})}
                  placeholder="e.g., Summer Sale"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={discountForm.description}
                  onChange={(e) => setDiscountForm({...discountForm, description: e.target.value})}
                  placeholder="Optional description"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type *
                  </label>
                  <select
                    value={discountForm.type}
                    onChange={(e) => setDiscountForm({...discountForm, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value * {discountForm.type === 'percentage' ? '(%)' : '(₦)'}
                  </label>
                  <input
                    type="number"
                    value={discountForm.value}
                    onChange={(e) => setDiscountForm({...discountForm, value: e.target.value})}
                    placeholder={discountForm.type === 'percentage' ? '10' : '1000'}
                    required
                    min="0"
                    max={discountForm.type === 'percentage' ? '100' : undefined}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Order Amount (₦)
                  </label>
                  <input
                    type="number"
                    value={discountForm.minOrderAmount}
                    onChange={(e) => setDiscountForm({...discountForm, minOrderAmount: e.target.value})}
                    placeholder="0"
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Discount Amount (₦)
                  </label>
                  <input
                    type="number"
                    value={discountForm.maxDiscountAmount}
                    onChange={(e) => setDiscountForm({...discountForm, maxDiscountAmount: e.target.value})}
                    placeholder="Optional"
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid Until
                </label>
                <input
                  type="datetime-local"
                  value={discountForm.validUntil}
                  onChange={(e) => setDiscountForm({...discountForm, validUntil: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedDiscount(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={updateDiscount}
                disabled={loading || !discountForm.name || !discountForm.value || !discountForm.code}
                className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Discount'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}