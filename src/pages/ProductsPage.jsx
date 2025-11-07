//pages/ProductsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, Star, MessageCircle, Filter, Grid, List, ChevronDown, Plus } from 'lucide-react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const isInitialMount = useRef(true);

  // Use CartContext instead of local cart management
  const { cartCount, addToCart } = useCart();

  // UI State
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Initialize filters with URL search parameter to avoid double-fetching
  const getInitialFilters = () => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    return {
      search: searchQuery || '',
      category: '',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      minPrice: '',
      maxPrice: '',
      brand: '',
      inStock: false,
      featured: false,
      page: 1,
      limit: 12
    };
  };

  // Filter State - initialized with URL params
  const [filters, setFilters] = useState(getInitialFilters());

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Watch for URL changes and update filters accordingly
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    const urlSearch = searchQuery || '';
    const currentSearch = filters.search || '';

    // Update filters only if URL search differs from current filter
    // This handles browser back/forward and direct URL navigation
    if (urlSearch !== currentSearch) {
      setFilters(prev => ({
        ...prev,
        search: urlSearch,
        page: 1
      }));
    }
  }, [location.search]);

  // Fetch products whenever filters change
  useEffect(() => {
    // Mark that we've passed the initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }

    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${URL}/api/categories`);
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== false && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`${URL}/api/products?${queryParams}`);
      const data = await response.json();

      setProducts(data.products || []);
      setPagination(data.pagination || {});
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Updated addToCart function using CartContext
  const handleAddToCart = async (product, selectedFlavor = null, selectedSize = null) => {
    const defaultFlavor = selectedFlavor || getDefaultFlavor(product);
    const defaultSize = selectedSize || getDefaultSize(product);

    const result = await addToCart(product, 1, defaultFlavor, defaultSize);

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message || 'Failed to add product to cart');
    }
  };

  const contactSeller = (product) => {
    const phoneNumber = '2348134110122'; // WhatsApp number with country code
    const message = `Hi, I'm interested in ${product.name}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const updateFilter = (key, value) => {
    // For search filter, update URL and let URL watcher handle filter update
    if (key === 'search') {
      const newUrl = value ? `/products?search=${encodeURIComponent(value)}` : '/products';
      navigate(newUrl, { replace: true }); // Use replace to avoid cluttering history
      return;
    }

    // For other filters, update directly
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      minPrice: '',
      maxPrice: '',
      brand: '',
      inStock: false,
      featured: false,
      page: 1,
      limit: 12
    });
    // Clear URL search parameter as well
    navigate('/products', { replace: true });
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const getDefaultFlavor = (product) => {
    if (product.flavors && product.flavors.length > 0) {
      return product.flavors[0];
    }
    return null;
  };

  const getDefaultSize = (product) => {
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes[0].size;
    }
    return null;
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller': return 'bg-red-100 text-red-800';
      case 'Top Rated': return 'bg-green-100 text-green-800';
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Popular': return 'bg-purple-100 text-purple-800';
      case 'Featured': return 'bg-yellow-100 text-yellow-800';
      default: return '';
    }
  };

  const getProductBadge = (product) => {
    if (product.isFeatured) return 'Featured';
    if (product.salesCount > 1000) return 'Best Seller';
    if (product.rating >= 4.8) return 'Top Rated';
    if (product.reviewCount > 300) return 'Popular';
    return '';
  };

  const brands = products.reduce((acc, p) => {
  if (p.brand && p.brand.id && p.brand.name) {
    const existing = acc.find(b => b.id === p.brand.id);
    if (!existing) {
      acc.push({ id: p.brand.id, name: p.brand.name });
    }
  }
  return acc;
}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <span
            onClick={() => window.location.href = '/'}
            className="cursor-pointer hover:text-gray-700"
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Products</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-sky-600 hover:text-sky-700"
                >
                  Clear All
                </button>
              </div>

              {/* Search Input */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products or brands..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={`w-full flex justify-between items-center p-2 rounded-lg transition-colors ${filters.category === ''
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <span>All Products</span>
                    <span className="text-sm">({products.length})</span>
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => updateFilter('category', category.id)}
                      className={`w-full flex justify-between items-center p-2 rounded-lg transition-colors ${filters.category === category.id
                          ? 'bg-sky-50 text-sky-700'
                          : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm">({category.productCount || 0})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              {brands.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => updateFilter('brand', filters.brand === brand.id ? '' : brand.id)}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${filters.brand === brand.id
                            ? 'bg-sky-50 text-sky-700'
                            : 'text-gray-600 hover:bg-gray-50'
                          }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Filter */}
              <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => updateFilter('inStock', e.target.checked)}
                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-gray-600">In Stock Only</span>
                </label>
              </div>

              {/* Featured Filter */}
              {/* <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) => updateFilter('featured', e.target.checked)}
                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-gray-600">Featured Only</span>
                </label>
              </div> */}
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {filters.search ? `Search Results for "${filters.search}"` : 'All Products'}
                </h1>
                <p className="text-gray-600">
                  Showing {products.length} of {pagination.total || 0} products
                </p>
                {filters.search && (
                  <button
                    onClick={() => {
                      navigate('/products', { replace: true });
                    }}
                    className="text-sm text-sky-600 hover:text-sky-700 mt-1 flex items-center space-x-1"
                  >
                    <span>Clear search</span>
                    <span>×</span>
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={`${filters.sortBy}-${filters.sortOrder}`}
                    onChange={(e) => {
                      const [sortBy, sortOrder] = e.target.value.split('-');
                      updateFilter('sortBy', sortBy);
                      updateFilter('sortOrder', sortOrder);
                    }}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="createdAt-DESC">Newest</option>
                    <option value="name-ASC">Name: A-Z</option>
                    <option value="name-DESC">Name: Z-A</option>
                    <option value="price-ASC">Price: Low to High</option>
                    <option value="price-DESC">Price: High to Low</option>
                    <option value="rating-DESC">Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* No Results State */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {filters.search ? `No products found for "${filters.search}"` : 'No products found'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {filters.search
                    ? 'Try a different search term or clear your filters'
                    : 'Check back later for new products'}
                </p>
                {filters.search && (
                  <button
                    onClick={clearFilters}
                    className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && products.length > 0 && (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={product.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={() => window.location.href = `/product/${product.id}`}
                          />
                          {getProductBadge(product) && (
                            <div className="absolute top-3 left-3">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(getProductBadge(product))}`}>
                                {getProductBadge(product)}
                              </span>
                            </div>
                          )}
                          <button
                            onClick={() => contactSeller(product)}
                            className="absolute top-3 right-3 p-2 bg-green-500 rounded-full shadow-md hover:bg-green-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <MessageCircle className="h-4 w-4 text-white" />
                          </button>
                          {product.stockQuantity === 0 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                                Out of Stock
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <div className="mb-2">
                            <span className="text-xs text-sky-600 font-medium">{product.brand?.name || 'No Brand'}</span>
                          </div>
                          <h3
                            onClick={() => window.location.href = `/product/${product.id}`}
                            className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-sky-600"
                          >
                            {product.name}
                          </h3>

                          <div className="flex items-center space-x-2 mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({product.reviewCount || 0})</span>
                          </div>

                          {product.flavors && product.flavors.length > 0 && (
                            <div className="mb-3">
                              <span className="text-xs text-gray-500">
                                Flavors: {product.flavors.slice(0, 2).join(', ')}
                                {product.flavors.length > 2 && ` +${product.flavors.length - 2} more`}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-gray-900">₦{Number(product.price).toLocaleString()}</span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">₦{Number(product.originalPrice).toLocaleString()}</span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stockQuantity === 0}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${product.stockQuantity > 0
                                ? 'bg-sky-500 text-white hover:bg-sky-600'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              }`}
                          >
                            <Plus className="h-4 w-4" />
                            <span>{product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* List View */
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-6">
                          <div className="relative w-24 h-24 flex-shrink-0">
                            <img
                              src={product.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'}
                              alt={product.name}
                              className="w-full h-full object-contain rounded-lg cursor-pointer"
                              onClick={() => window.location.href = `/product/${product.id}`}
                            />
                            {getProductBadge(product) && (
                              <span className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(getProductBadge(product))}`}>
                                {getProductBadge(product)}
                              </span>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="mb-1">
                              <span className="text-xs text-sky-600 font-medium">{product.brand}</span>
                            </div>
                            <h3
                              onClick={() => window.location.href = `/product/${product.id}`}
                              className="font-semibold text-lg text-gray-900 mb-2 cursor-pointer hover:text-sky-600"
                            >
                              {product.name}
                            </h3>

                            <div className="flex items-center space-x-4 mb-2">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                                <span className="text-sm text-gray-600 ml-1">({product.reviewCount || 0})</span>
                              </div>
                              {product.flavors && product.flavors.length > 0 && (
                                <span className="text-sm text-gray-500">
                                  Flavors: {product.flavors.slice(0, 2).join(', ')}
                                  {product.flavors.length > 2 && ` +${product.flavors.length - 2} more`}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-xl font-bold text-gray-900">₦{Number(product.price).toLocaleString()}</span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">₦{Number(product.originalPrice).toLocaleString()}</span>
                              )}
                            </div>

                            <button
                              onClick={() => handleAddToCart(product)}
                              disabled={product.stockQuantity === 0}
                              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${product.stockQuantity > 0
                                  ? 'bg-sky-500 text-white hover:bg-sky-600'
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                              <Plus className="h-4 w-4" />
                              <span>{product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {[...Array(pagination.pages)].map((_, index) => {
                      const pageNumber = index + 1;
                      const isCurrentPage = pageNumber === pagination.page;

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-2 rounded-lg transition-colors ${isCurrentPage
                              ? 'bg-sky-500 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}