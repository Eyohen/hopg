import React, { useState, useEffect } from 'react';
import { X, Upload, Save, Star, Trash2 } from 'lucide-react';
import { URL } from '../../url';

export default function ProductModal({ 
  isOpen, 
  onClose, 
  product = null,
  categories = [], 
  brands = [], 
  onSave,
  getFetchOptions 
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    categoryId: '',
    brandId: '',
    stockQuantity: '',
    weight: '',
    sku: '',
    ingredients: '',
    isFeatured: false,
    isActive: true
  });
  const [mainImage, setMainImage] = useState(null); // For single main image file
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [existingMainImage, setExistingMainImage] = useState('');

  const isEditing = Boolean(product);

  useEffect(() => {
    if (isOpen && product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        categoryId: product.categoryId || '',
        brandId: product.brandId || '',
        stockQuantity: product.stockQuantity || '',
        weight: product.weight || '',
        sku: product.sku || '',
        ingredients: product.ingredients || '',
        isFeatured: product.isFeatured || false,
        isActive: product.isActive !== false
      });
      
      setExistingMainImage(product.imageUrl || '');
      setMainImagePreview('');
      setMainImage(null);
    } else if (isOpen && !product) {
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        categoryId: '',
        brandId: '',
        stockQuantity: '',
        weight: '',
        sku: '',
        ingredients: '',
        isFeatured: false,
        isActive: true
      });
      setExistingMainImage('');
      setMainImagePreview('');
      setMainImage(null);
    }
  }, [isOpen, product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMainImage(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImagePreview(reader.result);
      setExistingMainImage(''); // Clear existing when new is selected
    };
    reader.readAsDataURL(file);
  };

  const removeMainImage = () => {
    setMainImage(null);
    setMainImagePreview('');
    setExistingMainImage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      // Add image only if a new one was selected
      if (mainImage) {
        submitData.append('imageUrl', mainImage);
      }

      const url = isEditing 
        ? `${URL}/api/products/${product.id}`
        : `${URL}/api/products`;
      
      const method = isEditing ? 'PUT' : 'POST';
      const options = getFetchOptions(method);
      delete options.headers['Content-Type'];

      const response = await fetch(url, {
        ...options,
        body: submitData
      });

      if (response.ok) {
        const data = await response.json();
        onSave(data.product);
        onClose();
        alert(isEditing ? 'Product updated successfully!' : 'Product created successfully!');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const displayImage = mainImagePreview || existingMainImage;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Auto-generated if empty"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter product description"
              />
            </div>

            {/* Category and Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="categoryId"
                  required
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select a brand (optional)</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pricing and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₦) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (₦)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  min="0"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  required
                  min="0"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                min="0"
                step="0.01"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="0.00"
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              
              {displayImage ? (
                <div className="relative inline-block">
                  <img 
                    src={displayImage} 
                    alt="Product" 
                    className="w-40 h-40 object-cover rounded-lg border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeMainImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="hidden"
                    id="main-image-upload"
                  />
                  <label
                    htmlFor="main-image-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-12 w-12 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Click to upload product image
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="List product ingredients"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  Featured Product
                </span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Active Product
                </span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}