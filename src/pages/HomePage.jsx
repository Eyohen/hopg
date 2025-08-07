import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, Star, ArrowRight, Users, Award, Truck, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { URL } from '../url';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.jpg'
import Navbar from '../components/Navbar';

export default function HomePage() {
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();
  
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoriesResponse = await fetch(`${URL}/api/categories`);
      const categoriesData = await categoriesResponse.json();
      
      // Fetch featured products
      const productsResponse = await fetch(`${URL}/api/products/featured?limit=6`);
      const productsData = await productsResponse.json();
      
      setCategories(categoriesData.categories || []);
      setFeaturedProducts(productsData.products || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    const selectedFlavor = getDefaultFlavor(product);
    const selectedSize = getDefaultSize(product);
    
    const result = await addToCart(product, 1, selectedFlavor, selectedSize);
    
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message || 'Failed to add product to cart');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`${URL}/api/products?search=${encodeURIComponent(searchQuery)}&limit=20`);
      const data = await response.json();
      
      console.log('Search results:', data.products);
      alert(`Found ${data.products.length} products for "${searchQuery}"`);
    } catch (err) {
      console.error('Error searching products:', err);
      alert('Search failed. Please try again.');
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
    <Navbar/>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  HOME OF
                  <span className="text-sky-500 block">PROTEIN GOODIES</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Home of protein goodies is a hub for all healthy goodies. 
                  Fuel your fitness journey with premium supplements.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/products')}
                  className="bg-sky-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-sky-500" />
                  <span className="text-gray-600">10k+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-sky-500" />
                  <span className="text-gray-600">Premium Quality</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-sky-100 to-sky-200 rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop"
                  alt="Premium Protein Supplements"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-sky-500" />
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find the perfect supplements for your fitness goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="group cursor-pointer" onClick={() => navigate(`/products?category=${category.id}`)}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-sky-200">
                  <div className="aspect-square mb-4 overflow-hidden rounded-xl">
                    <img
                      src={category.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 uppercase">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                  {category.productCount && (
                    <p className="text-xs text-sky-600 mt-2">{category.productCount} products</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Best-selling supplements trusted by athletes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-sky-600 font-medium">{product.brand}</span>
                  </div>
                  <h3 
                    className="font-semibold text-lg text-gray-900 mb-2 cursor-pointer hover:text-sky-600 uppercase"
                    onClick={() => navigate(`/product/${product.id}`)}
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">₦{(product.price).toLocaleString()}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">₦{(product.originalPrice).toLocaleString()}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sky-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Join thousands of athletes who trust HOPG for their protein needs
          </p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-white text-sky-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Shopping Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-sky-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
                  HOPG
                </div>
              </div>
              <p className="text-gray-400">
                Your trusted partner for premium protein supplements and fitness nutrition.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <a href="#" className="hover:text-white transition-colors">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Get the latest updates on new products and offers.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
                />
                <button className="bg-sky-500 px-4 py-2 rounded-r-lg hover:bg-sky-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HOPG - Home of Protein Goodies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}