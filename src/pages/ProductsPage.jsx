// import React, { useState } from 'react';
// import { ShoppingBag, Search, Menu, Star, Heart, Filter, Grid, List, ChevronDown, X } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// export default function ProductsPage() {
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('featured');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 200]);
//   const [selectedFlavors, setSelectedFlavors] = useState([]);

//   const categories = [
//     { id: 'all', name: 'All Products', count: 48 },
//     { id: 'whey-protein', name: 'Whey Protein', count: 18 },
//     { id: 'mass-gainers', name: 'Mass Gainers', count: 12 },
//     { id: 'creatine', name: 'Creatine', count: 8 },
//     { id: 'pre-workout', name: 'Pre Workout', count: 10 },
//     { id: 'meal-replacement', name: 'Meal Replacement', count: 6 }
//   ];

//   const brands = [
//     { id: 'hopg-premium', name: 'HOPG Premium', count: 24 },
//     { id: 'hopg-gold', name: 'HOPG Gold', count: 16 },
//     { id: 'hopg-pro', name: 'HOPG Pro', count: 8 }
//   ];

//   const flavors = [
//     { id: 'chocolate', name: 'Chocolate', count: 20 },
//     { id: 'vanilla', name: 'Vanilla', count: 18 },
//     { id: 'strawberry', name: 'Strawberry', count: 12 },
//     { id: 'cookies-cream', name: 'Cookies & Cream', count: 10 },
//     { id: 'unflavored', name: 'Unflavored', count: 8 }
//   ];

//   const products = [
//     {
//       id: 1,
//       name: 'Premium Whey Isolate',
//       brand: 'HOPG Premium',
//       category: 'whey-protein',
//       price: 49.99,
//       originalPrice: 59.99,
//       rating: 4.8,
//       reviews: 324,
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
//       badge: 'Best Seller',
//       flavors: ['Chocolate', 'Vanilla', 'Strawberry'],
//       inStock: true
//     },
//     {
//       id: 2,
//       name: 'Mass Gainer Pro 5000',
//       brand: 'HOPG Gold',
//       category: 'mass-gainers',
//       price: 89.99,
//       originalPrice: 109.99,
//       rating: 4.9,
//       reviews: 189,
//       image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
//       badge: 'Top Rated',
//       flavors: ['Chocolate', 'Vanilla'],
//       inStock: true
//     },
//     {
//       id: 3,
//       name: 'Pure Creatine Monohydrate',
//       brand: 'HOPG Premium',
//       category: 'creatine',
//       price: 24.99,
//       originalPrice: 29.99,
//       rating: 4.7,
//       reviews: 256,
//       image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
//       badge: 'New',
//       flavors: ['Unflavored'],
//       inStock: true
//     },
//     {
//       id: 4,
//       name: 'Energy Blast Pre Workout',
//       brand: 'HOPG Pro',
//       category: 'pre-workout',
//       price: 34.99,
//       originalPrice: 44.99,
//       rating: 4.6,
//       reviews: 198,
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
//       badge: '',
//       flavors: ['Berry Blast', 'Tropical'],
//       inStock: true
//     },
//     {
//       id: 5,
//       name: 'Complete Meal Replacement',
//       brand: 'HOPG Gold',
//       category: 'meal-replacement',
//       price: 39.99,
//       originalPrice: 49.99,
//       rating: 4.5,
//       reviews: 142,
//       image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
//       badge: '',
//       flavors: ['Chocolate', 'Vanilla'],
//       inStock: true
//     },
//     {
//       id: 6,
//       name: 'Advanced Whey Protein',
//       brand: 'HOPG Premium',
//       category: 'whey-protein',
//       price: 42.99,
//       originalPrice: 52.99,
//       rating: 4.7,
//       reviews: 287,
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
//       badge: '',
//       flavors: ['Chocolate', 'Cookies & Cream'],
//       inStock: false
//     },
//     {
//       id: 7,
//       name: 'Ultra Mass Gainer',
//       brand: 'HOPG Gold',
//       category: 'mass-gainers',
//       price: 79.99,
//       originalPrice: 99.99,
//       rating: 4.8,
//       reviews: 156,
//       image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
//       badge: 'Popular',
//       flavors: ['Chocolate', 'Vanilla', 'Strawberry'],
//       inStock: true
//     },
//     {
//       id: 8,
//       name: 'Micronized Creatine',
//       brand: 'HOPG Pro',
//       category: 'creatine',
//       price: 29.99,
//       originalPrice: 39.99,
//       rating: 4.6,
//       reviews: 203,
//       image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
//       badge: '',
//       flavors: ['Unflavored', 'Fruit Punch'],
//       inStock: true
//     },
//     {
//       id: 9,
//       name: 'Pre Workout Extreme',
//       brand: 'HOPG Premium',
//       category: 'pre-workout',
//       price: 44.99,
//       originalPrice: 54.99,
//       rating: 4.9,
//       reviews: 312,
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
//       badge: 'Best Seller',
//       flavors: ['Blue Raspberry', 'Watermelon'],
//       inStock: true
//     }
//   ];

//   const toggleBrand = (brandId) => {
//     setSelectedBrands(prev => 
//       prev.includes(brandId) 
//         ? prev.filter(id => id !== brandId)
//         : [...prev, brandId]
//     );
//   };

//   const toggleFlavor = (flavorId) => {
//     setSelectedFlavors(prev => 
//       prev.includes(flavorId) 
//         ? prev.filter(id => id !== flavorId)
//         : [...prev, flavorId]
//     );
//   };

//   const clearFilters = () => {
//     setSelectedCategory('all');
//     setSelectedBrands([]);
//     setSelectedFlavors([]);
//     setPriceRange([0, 200]);
//   };

//   const getBadgeColor = (badge) => {
//     switch (badge) {
//       case 'Best Seller': return 'bg-red-100 text-red-800';
//       case 'Top Rated': return 'bg-green-100 text-green-800';
//       case 'New': return 'bg-blue-100 text-blue-800';
//       case 'Popular': return 'bg-purple-100 text-purple-800';
//       default: return '';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="bg-sky-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
//               HOPG
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
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Breadcrumb */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <nav className="text-sm text-gray-500">
//           <span>Home</span> <span className="mx-2">/</span>
//           <span className="text-gray-900">Products</span>
//         </nav>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Filters Sidebar */}
//           <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
//                 <button
//                   onClick={clearFilters}
//                   className="text-sm text-sky-600 hover:text-sky-700"
//                 >
//                   Clear All
//                 </button>
//               </div>

//               {/* Categories */}
//               <div className="mb-6">
//                 <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
//                 <div className="space-y-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category.id}
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={`w-full flex justify-between items-center p-2 rounded-lg transition-colors ${
//                         selectedCategory === category.id 
//                           ? 'bg-sky-50 text-sky-700' 
//                           : 'text-gray-600 hover:bg-gray-50'
//                       }`}
//                     >
//                       <span>{category.name}</span>
//                       <span className="text-sm">({category.count})</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-6">
//                 <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="number"
//                       placeholder="Min"
//                       value={priceRange[0]}
//                       onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
//                       className="w-full p-2 border border-gray-300 rounded-lg text-sm"
//                     />
//                     <span className="text-gray-500">-</span>
//                     <input
//                       type="number"
//                       placeholder="Max"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200])}
//                       className="w-full p-2 border border-gray-300 rounded-lg text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Brands */}
//               <div className="mb-6">
//                 <h3 className="font-medium text-gray-900 mb-3">Brands</h3>
//                 <div className="space-y-2">
//                   {brands.map((brand) => (
//                     <label key={brand.id} className="flex items-center space-x-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={selectedBrands.includes(brand.id)}
//                         onChange={() => toggleBrand(brand.id)}
//                         className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
//                       />
//                       <span className="text-gray-600">{brand.name}</span>
//                       <span className="text-sm text-gray-400">({brand.count})</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Flavors */}
//               <div className="mb-6">
//                 <h3 className="font-medium text-gray-900 mb-3">Flavors</h3>
//                 <div className="space-y-2">
//                   {flavors.map((flavor) => (
//                     <label key={flavor.id} className="flex items-center space-x-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={selectedFlavors.includes(flavor.id)}
//                         onChange={() => toggleFlavor(flavor.id)}
//                         className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
//                       />
//                       <span className="text-gray-600">{flavor.name}</span>
//                       <span className="text-sm text-gray-400">({flavor.count})</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Section */}
//           <div className="lg:col-span-3">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
//                 <p className="text-gray-600">Showing {products.length} products</p>
//               </div>

//               <div className="flex items-center space-x-4">
//                 {/* Mobile Filter Button */}
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   <Filter className="h-4 w-4" />
//                   <span>Filters</span>
//                 </button>

//                 {/* Sort Dropdown */}
//                 <div className="relative">
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                   >
//                     <option value="featured">Featured</option>
//                     <option value="price-low">Price: Low to High</option>
//                     <option value="price-high">Price: High to Low</option>
//                     <option value="rating">Highest Rated</option>
//                     <option value="newest">Newest</option>
//                   </select>
//                   <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
//                 </div>

//                 {/* View Toggle */}
//                 <div className="flex border border-gray-300 rounded-lg">
//                   <button
//                     onClick={() => setViewMode('grid')}
//                     className={`p-2 ${viewMode === 'grid' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//                   >
//                     <Grid className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => setViewMode('list')}
//                     className={`p-2 ${viewMode === 'list' ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//                   >
//                     <List className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {viewMode === 'grid' ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {products.map((product) => (
//                   <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
//                     <div className="relative aspect-square overflow-hidden">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                       {product.badge && (
//                         <div className="absolute top-3 left-3">
//                           <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(product.badge)}`}>
//                             {product.badge}
//                           </span>
//                         </div>
//                       )}
//                       <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
//                         <Heart className="h-4 w-4 text-gray-600" />
//                       </button>
//                       {!product.inStock && (
//                         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                           <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900">
//                             Out of Stock
//                           </span>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="p-6">
//                       <div className="mb-2">
//                         <span className="text-xs text-sky-600 font-medium">{product.brand}</span>
//                       </div>
//                       <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      
//                       <div className="flex items-center space-x-2 mb-3">
//                         <div className="flex items-center">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                             />
//                           ))}
//                         </div>
//                         <span className="text-sm text-gray-600">({product.reviews})</span>
//                       </div>

//                       <div className="mb-3">
//                         <span className="text-xs text-gray-500">Flavors: {product.flavors.join(', ')}</span>
//                       </div>

//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center space-x-2">
//                           <span className="text-xl font-bold text-gray-900">${product.price}</span>
//                           <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
//                         </div>
//                       </div>

//                       <button 
//                         disabled={!product.inStock}
//                         className={`w-full py-3 rounded-lg font-semibold transition-colors ${
//                           product.inStock 
//                             ? 'bg-sky-500 text-white hover:bg-sky-600' 
//                             : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                         }`}
//                       >
//                         {product.inStock ? 'Add to Cart' : 'Out of Stock'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               /* List View */
//               <div className="space-y-4">
//                 {products.map((product) => (
//                   <div key={product.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
//                     <div className="flex items-center space-x-6">
//                       <div className="relative w-24 h-24 flex-shrink-0">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                         {product.badge && (
//                           <span className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(product.badge)}`}>
//                             {product.badge}
//                           </span>
//                         )}
//                       </div>
                      
//                       <div className="flex-1">
//                         <div className="mb-1">
//                           <span className="text-xs text-sky-600 font-medium">{product.brand}</span>
//                         </div>
//                         <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
                        
//                         <div className="flex items-center space-x-4 mb-2">
//                           <div className="flex items-center space-x-1">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                               />
//                             ))}
//                             <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
//                           </div>
//                           <span className="text-sm text-gray-500">Flavors: {product.flavors.join(', ')}</span>
//                         </div>
//                       </div>

//                       <div className="text-right">
//                         <div className="flex items-center space-x-2 mb-3">
//                           <span className="text-xl font-bold text-gray-900">${product.price}</span>
//                           <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
//                         </div>
                        
//                         <button 
//                           disabled={!product.inStock}
//                           className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
//                             product.inStock 
//                               ? 'bg-sky-500 text-white hover:bg-sky-600' 
//                               : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                           }`}
//                         >
//                           {product.inStock ? 'Add to Cart' : 'Out of Stock'}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             <div className="flex justify-center items-center space-x-2 mt-12">
//               <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                 Previous
//               </button>
//               <button className="px-3 py-2 bg-sky-500 text-white rounded-lg">1</button>
//               <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
//               <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
//               <span className="px-2 text-gray-500">...</span>
//               <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">8</button>
//               <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, Star, Heart, Filter, Grid, List, ChevronDown, Plus } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [cartCount, setCartCount] = useState(0);
  
  // UI State
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter State
  const [filters, setFilters] = useState({
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



  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchCartCount();
  }, []);

  useEffect(() => {
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

  const addToCart = async (productId, selectedFlavor = null, selectedSize = null) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add items to cart');
        return;
      }

      const response = await fetch(`${URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
          selectedFlavor,
          selectedSize
        })
      });

      if (response.ok) {
        setCartCount(prevCount => prevCount + 1);
        alert('Product added to cart!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add product to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add items to wishlist');
        return;
      }

      const response = await fetch(`${URL}/api/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      });

      if (response.ok) {
        alert('Product added to wishlist!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add to wishlist');
      }
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      alert('Failed to add product to wishlist. Please try again.');
    }
  };

  const updateFilter = (key, value) => {
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

  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

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
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
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
            </div>
          </div>
        </div>
      </nav>

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

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={`w-full flex justify-between items-center p-2 rounded-lg transition-colors ${
                      filters.category === '' 
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
                      className={`w-full flex justify-between items-center p-2 rounded-lg transition-colors ${
                        filters.category === category.id 
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

              {/* Brands */}
              {brands.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => updateFilter('brand', filters.brand === brand ? '' : brand)}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          filters.brand === brand 
                            ? 'bg-sky-50 text-sky-700' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {brand}
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
              <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) => updateFilter('featured', e.target.checked)}
                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-gray-600">Featured Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
                <p className="text-gray-600">
                  Showing {products.length} of {pagination.total || 0} products
                </p>
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

            {/* Products Grid */}
            {!loading && !error && (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={product.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
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
                            onClick={() => addToWishlist(product.id)}
                            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Heart className="h-4 w-4 text-gray-600" />
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
                            <span className="text-xs text-sky-600 font-medium">{product.brand}</span>
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
                              <span className="text-xl font-bold text-gray-900">₦{(product.price).toLocaleString()}</span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">₦{(product.originalPrice).toLocaleString()}</span>
                              )}
                            </div>
                          </div>

                          <button 
                            onClick={() => addToCart(product.id, getDefaultFlavor(product), getDefaultSize(product))}
                            disabled={product.stockQuantity === 0}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                              product.stockQuantity > 0 
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
                              className="w-full h-full object-cover rounded-lg cursor-pointer"
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
                              <span className="text-xl font-bold text-gray-900">₦{(product.price).toLocaleString()}</span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">₦{(product.originalPrice).toLocaleString()}</span>
                              )}
                            </div>
                            
                            <button 
                              onClick={() => addToCart(product.id, getDefaultFlavor(product), getDefaultSize(product))}
                              disabled={product.stockQuantity === 0}
                              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
                                product.stockQuantity > 0 
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
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            isCurrentPage 
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