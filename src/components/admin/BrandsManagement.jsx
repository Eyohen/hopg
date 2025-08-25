import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, ToggleLeft, ToggleRight, Star, StarOff,
  Search, Filter, Eye, CheckCircle, XCircle, Globe, MapPin,
  Package, ImageIcon, ExternalLink
} from 'lucide-react';
import { URL } from '../../url';

export default function BrandsManagement({ getFetchOptions }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [brandForm, setBrandForm] = useState({
    name: '',
    description: '',
    website: '',
    country: '',
    sortOrder: '',
    isFeatured: false,
    logoUrl: null
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/brands?includeInactive=true`, getFetchOptions());
      if (response.ok) {
        const data = await response.json();
        setBrands(data.brands || []);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(brandForm).forEach(key => {
        if (key === 'logoUrl' && brandForm[key]) {
          formData.append('logoUrl', brandForm[key]);
        } else if (key !== 'logoUrl') {
          formData.append(key, brandForm[key]);
        }
      });

      const url = editingBrand 
        ? `${URL}/api/brands/${editingBrand.id}`
        : `${URL}/api/brands`;
      
      const method = editingBrand ? 'PUT' : 'POST';
      const options = getFetchOptions(method);
      delete options.headers['Content-Type']; // Let browser set boundary for FormData

      const response = await fetch(url, {
        ...options,
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        
        if (editingBrand) {
          setBrands(brands.map(brand => 
            brand.id === editingBrand.id ? data.brand : brand
          ));
          alert('Brand updated successfully!');
        } else {
          setBrands([data.brand, ...brands]);
          alert('Brand created successfully!');
        }
        
        resetForm();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to save brand');
      }
    } catch (error) {
      console.error('Error saving brand:', error);
      alert('Failed to save brand');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBrandForm({
      name: '',
      description: '',
      website: '',
      country: '',
      sortOrder: '',
      isFeatured: false,
      logoUrl: null
    });
    setEditingBrand(null);
    setShowModal(false);
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setBrandForm({
      name: brand.name,
      description: brand.description || '',
      website: brand.website || '',
      country: brand.country || '',
      sortOrder: brand.sortOrder || '',
      isFeatured: brand.isFeatured,
      logoUrl: null
    });
    setShowModal(true);
  };

  const toggleBrandStatus = async (id) => {
    try {
      const response = await fetch(`${URL}/api/brands/${id}/toggle-status`, {
        ...getFetchOptions('PATCH')
      });

      if (response.ok) {
        const data = await response.json();
        setBrands(brands.map(brand => 
          brand.id === id ? data.brand : brand
        ));
      } else {
        alert('Failed to toggle brand status');
      }
    } catch (error) {
      console.error('Error toggling brand status:', error);
      alert('Failed to toggle brand status');
    }
  };

  const toggleFeaturedStatus = async (id) => {
    try {
      const response = await fetch(`${URL}/api/brands/${id}/toggle-featured`, {
        ...getFetchOptions('PATCH')
      });

      if (response.ok) {
        const data = await response.json();
        setBrands(brands.map(brand => 
          brand.id === id ? data.brand : brand
        ));
      } else {
        alert('Failed to toggle featured status');
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      alert('Failed to toggle featured status');
    }
  };

  const deleteBrand = async (id) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;

    try {
      const response = await fetch(`${URL}/api/brands/${id}`, {
        ...getFetchOptions('DELETE')
      });

      if (response.ok) {
        setBrands(brands.filter(brand => brand.id !== id));
        alert('Brand deleted successfully');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to delete brand');
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      alert('Failed to delete brand');
    }
  };

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (brand.description && brand.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && brand.isActive) ||
                         (filterStatus === 'inactive' && !brand.isActive) ||
                         (filterStatus === 'featured' && brand.isFeatured);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Brand Management</h2>
          <p className="text-gray-600">Manage product brands and manufacturers</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Brand</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="featured">Featured</option>
        </select>
      </div>

      {/* Brands Grid */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading brands...</p>
          </div>
        ) : filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => (
            <div key={brand.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {brand.logoUrl ? (
                      <img 
                        src={brand.logoUrl} 
                        alt={brand.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{brand.name}</h3>
                      <div className="flex items-center space-x-2">
                        {brand.isActive ? (
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
                        {brand.isFeatured && (
                          <span className="flex items-center space-x-1 text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
                            <Star className="h-3 w-3" />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {brand.description && (
                      <p className="text-gray-600 mb-3">{brand.description}</p>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-sky-500" />
                        <div>
                          <p className="text-xs text-gray-500">Products</p>
                          <p className="font-medium">{brand.productCount || 0}</p>
                        </div>
                      </div>

                      {brand.country && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-sky-500" />
                          <div>
                            <p className="text-xs text-gray-500">Country</p>
                            <p className="font-medium">{brand.country}</p>
                          </div>
                        </div>
                      )}

                      {brand.website && (
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-sky-500" />
                          <div>
                            <p className="text-xs text-gray-500">Website</p>
                            <a 
                              href={brand.website.startsWith('http') ? brand.website : `https://${brand.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-sky-600 hover:text-sky-800 flex items-center space-x-1"
                            >
                              <span className="truncate max-w-24">Visit</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="font-medium text-sm">{new Date(brand.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => toggleFeaturedStatus(brand.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      brand.isFeatured 
                        ? 'text-yellow-600 hover:bg-yellow-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={brand.isFeatured ? 'Remove from Featured' : 'Add to Featured'}
                  >
                    {brand.isFeatured ? (
                      <Star className="h-5 w-5 fill-current" />
                    ) : (
                      <StarOff className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleBrandStatus(brand.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      brand.isActive 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={brand.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {brand.isActive ? (
                      <ToggleRight className="h-5 w-5" />
                    ) : (
                      <ToggleLeft className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(brand)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteBrand(brand.id)}
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
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No brands found</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {editingBrand ? 'Edit Brand' : 'Add New Brand'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brandForm.name}
                    onChange={(e) => setBrandForm({...brandForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={brandForm.country}
                    onChange={(e) => setBrandForm({...brandForm, country: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Enter country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={brandForm.description}
                  onChange={(e) => setBrandForm({...brandForm, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  rows="3"
                  placeholder="Enter brand description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={brandForm.website}
                    onChange={(e) => setBrandForm({...brandForm, website: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={brandForm.sortOrder}
                    onChange={(e) => setBrandForm({...brandForm, sortOrder: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBrandForm({...brandForm, logoUrl: e.target.files[0]})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={brandForm.isFeatured}
                  onChange={(e) => setBrandForm({...brandForm, isFeatured: e.target.checked})}
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                  Featured brand
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingBrand ? 'Update Brand' : 'Create Brand')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}