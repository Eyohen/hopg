import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Award, Package, Star } from 'lucide-react';
import { URL } from '../../url';
import ProductModal from './ProductModal'; // Import the modal

export default function ProductsContent({
  products = [], // Add default empty array
  categories = [],
  brands = [],
  fetchProducts,
  getFetchOptions
}) {
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterBrand, setFilterBrand] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

  const formatCurrency = (amount) => {
    return parseFloat(amount || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Debug logs
  console.log('ProductsContent props:', { 
    productsCount: products.length, 
    categoriesCount: categories.length, 
    brandsCount: brands.length 
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.categoryId === filterCategory;
    const matchesBrand = filterBrand === 'all' || product.brandId === filterBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/api/products/${productId}`, getFetchOptions('DELETE'));
        if (response.ok) {
          await fetchProducts(); // Refresh products list
          if (paginatedProducts.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
          alert('Product deleted successfully');
        } else {
          const error = await response.json();
          alert('Failed to delete product: ' + (error.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFilterChange = (type, value) => {
    if (type === 'category') {
      setFilterCategory(value);
    } else if (type === 'brand') {
      setFilterBrand(value);
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleProductSaved = async () => {
    // Refresh the products list after save
    await fetchProducts();
    setShowProductModal(false);
    setEditingProduct(null);
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">
              Manage your product inventory ({products.length} products)
            </p>
          </div>
          <button
            onClick={handleAddProduct}
            className="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-yellow-800">Debug Info:</h3>
          <p className="text-sm text-yellow-700">
            Products: {products.length} | Categories: {categories.length} | Brands: {brands.length}
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Category Filter */}
          <select 
            value={filterCategory}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          {/* Brand Filter */}
          <select 
            value={filterBrand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Brands</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Brand</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-contain"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                      {product.isFeatured && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-yellow-600">Featured</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.category?.name || 'No Category'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.brand?.name || 'No Brand'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    ₦{formatCurrency(product.price)}
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-xs text-gray-500 line-through">
                      ₦{formatCurrency(product.originalPrice)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${
                    product.stockQuantity > 10 ? 'text-green-600' : 
                    product.stockQuantity > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {product.stockQuantity || 0} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded"
                      title="View Product"
                      onClick={() => window.open(`/product/${product.id}`, '_blank')}
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Edit Product"
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Delete Product"
                      disabled={loading}
                    >
                      <Trash2 className={`h-4 w-4 ${loading ? 'text-gray-400' : 'text-red-600'}`} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <Package className="h-8 w-8 text-gray-300" />
                    <div>
                      {searchTerm || filterCategory !== 'all' || filterBrand !== 'all' 
                        ? 'No products found matching your filters' 
                        : 'No products found'}
                    </div>
                    {(searchTerm || filterCategory !== 'all' || filterBrand !== 'all') && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setFilterCategory('all');
                          setFilterBrand('all');
                          setCurrentPage(1);
                        }}
                        className="text-sm text-sky-600 hover:text-sky-800"
                      >
                        Clear filters
                      </button>
                    )}
                    {products.length === 0 && (
                      <button
                        onClick={handleAddProduct}
                        className="text-sm text-sky-600 hover:text-sky-800"
                      >
                        Add your first product
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 border rounded-lg ${
                      currentPage === pageNum
                        ? 'bg-sky-500 text-white border-sky-500'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                (pageNum === currentPage - 2 && currentPage > 3) ||
                (pageNum === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={pageNum} className="px-2 text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}

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

      {/* Product Modal */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        categories={categories}
        brands={brands}
        onSave={handleProductSaved}
        getFetchOptions={getFetchOptions}
      />
    </>
  );
}