// import React, { useState } from 'react';
// import { ShoppingBag, Search, Menu, Star, ArrowRight, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// export default function ProductDetails() {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedFlavor, setSelectedFlavor] = useState('Chocolate');
//   const [selectedSize, setSelectedSize] = useState('2.5 lbs');

//   const productImages = [
//     'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop'
//   ];

//   const flavors = ['Chocolate', 'Vanilla', 'Strawberry', 'Cookies & Cream'];
//   const sizes = [
//     { size: '1 lb', price: '$29.99', originalPrice: '$34.99' },
//     { size: '2.5 lbs', price: '$49.99', originalPrice: '$59.99' },
//     { size: '5 lbs', price: '$89.99', originalPrice: '$109.99' }
//   ];

//   const relatedProducts = [
//     {
//       name: 'Mass Gainer Pro',
//       price: '$39.99',
//       image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop',
//       rating: 4.8
//     },
//     {
//       name: 'Creatine Monohydrate',
//       price: '$24.99',
//       image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop',
//       rating: 4.7
//     },
//     {
//       name: 'Pre Workout Energy',
//       price: '$34.99',
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
//       rating: 4.6
//     }
//   ];

//   const currentPrice = sizes.find(s => s.size === selectedSize)?.price || '$49.99';
//   const originalPrice = sizes.find(s => s.size === selectedSize)?.originalPrice || '$59.99';

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="bg-sky-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
//             HOPG
//               </div>
//               <div className="hidden sm:block">
//                 <span className="text-gray-600 text-sm">Home of Proteins</span>
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
//           <span>Whey Protein</span> <span className="mx-2">/</span>
//           <span className="text-gray-900">Premium Whey Isolate</span>
//         </nav>
//       </div>

//       {/* Product Details */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Product Images */}
//           <div className="space-y-4">
//             <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
//               <img
//                 src={productImages[selectedImage]}
//                 alt="Premium Whey Isolate"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="grid grid-cols-4 gap-4">
//               {productImages.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
//                     selectedImage === index ? 'border-sky-500' : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <img src={image} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Premium Whey Isolate</h1>
//               <div className="flex items-center space-x-4 mb-4">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <span className="text-gray-600">(324 reviews)</span>
//                 <span className="text-green-600 font-medium">In Stock</span>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <span className="text-3xl font-bold text-gray-900">{currentPrice}</span>
//                 <span className="text-xl text-gray-500 line-through">{originalPrice}</span>
//                 <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-sm font-medium">
//                   Save 17%
//                 </span>
//               </div>
//             </div>

//             <div className="prose prose-gray max-w-none">
//               <p className="text-gray-600 leading-relaxed">
//                 Our Premium Whey Isolate delivers 25g of pure protein per serving with minimal carbs and fats. 
//                 Perfect for post-workout recovery and muscle building. Made from grass-fed cows and contains 
//                 all essential amino acids your body needs.
//               </p>
//             </div>

//             {/* Size Selection */}
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
//               <div className="grid grid-cols-3 gap-3">
//                 {sizes.map((sizeOption) => (
//                   <button
//                     key={sizeOption.size}
//                     onClick={() => setSelectedSize(sizeOption.size)}
//                     className={`p-3 rounded-lg border-2 transition-colors text-center ${
//                       selectedSize === sizeOption.size
//                         ? 'border-sky-500 bg-sky-50 text-sky-700'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     <div className="font-medium">{sizeOption.size}</div>
//                     <div className="text-sm text-gray-600">{sizeOption.price}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Flavor Selection */}
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-3">Flavor</h3>
//               <div className="grid grid-cols-2 gap-3">
//                 {flavors.map((flavor) => (
//                   <button
//                     key={flavor}
//                     onClick={() => setSelectedFlavor(flavor)}
//                     className={`p-3 rounded-lg border-2 transition-colors ${
//                       selectedFlavor === flavor
//                         ? 'border-sky-500 bg-sky-50 text-sky-700'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     {flavor}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity */}
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   <Minus className="h-4 w-4" />
//                 </button>
//                 <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   <Plus className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Add to Cart */}
//             <div className="space-y-3">
//               <button className="w-full bg-sky-500 text-white py-4 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
//                 Add to Cart - {currentPrice}
//               </button>
//               <div className="flex space-x-3">
//                 <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
//                   <Heart className="h-5 w-5" />
//                   <span>Add to Wishlist</span>
//                 </button>
//                 <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
//                   <Share2 className="h-5 w-5" />
//                   <span>Share</span>
//                 </button>
//               </div>
//             </div>

//             {/* Features */}
//             <div className="border-t pt-6">
//               <div className="grid grid-cols-1 gap-4">
//                 <div className="flex items-center space-x-3">
//                   <Truck className="h-5 w-5 text-sky-500" />
//                   <span className="text-gray-600">Free shipping on orders over $50</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Shield className="h-5 w-5 text-sky-500" />
//                   <span className="text-gray-600">100% quality guarantee</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <RotateCcw className="h-5 w-5 text-sky-500" />
//                   <span className="text-gray-600">30-day return policy</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Tabs */}
//         <div className="mt-16">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8">
//               <button className="py-4 px-1 border-b-2 border-sky-500 text-sky-600 font-medium">
//                 Description
//               </button>
//               <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
//                 Nutrition Facts
//               </button>
//               <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
//                 Reviews (324)
//               </button>
//             </nav>
//           </div>
          
//           <div className="py-8">
//             <div className="prose prose-gray max-w-none">
//               <h3 className="text-xl font-semibold mb-4">Product Description</h3>
//               <p className="text-gray-600 leading-relaxed mb-4">
//                 Our Premium Whey Isolate is the gold standard of protein supplements. Each serving delivers 
//                 25 grams of fast-absorbing, high-quality whey protein isolate that's been filtered to remove 
//                 excess lactose, fat, and carbohydrates.
//               </p>
//               <ul className="list-disc list-inside space-y-2 text-gray-600">
//                 <li>25g of pure whey protein isolate per serving</li>
//                 <li>Less than 1g of carbs and fat</li>
//                 <li>Rapidly absorbed for optimal muscle recovery</li>
//                 <li>Contains all 9 essential amino acids</li>
//                 <li>Third-party tested for purity and potency</li>
//                 <li>Made from grass-fed cows</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {relatedProducts.map((product, index) => (
//               <div key={index} className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
//                 <div className="aspect-square overflow-hidden rounded-t-2xl">
//                   <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
//                   <div className="flex items-center space-x-2 mb-3">
//                     <div className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-600">({product.rating})</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xl font-bold text-gray-900">{product.price}</span>
//                     <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Star, ArrowRight, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

export default function ProductDetails({ productId = '1' }) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  
  // Product selection state
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  
  // UI state
  const [activeTab, setActiveTab] = useState('description');
  const [reviewsPage, setReviewsPage] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: ''
  });


  useEffect(() => {
    // Get productId from URL if not provided as prop
    const urlProductId = window.location.pathname.split('/').pop();
    const currentProductId = productId !== '1' ? productId : urlProductId;
    
    fetchProduct(currentProductId);
    fetchReviews(currentProductId);
    fetchCartCount();
  }, [productId]);

  useEffect(() => {
    if (product) {
      // Set default selections
      if (product.flavors && product.flavors.length > 0 && !selectedFlavor) {
        setSelectedFlavor(product.flavors[0]);
      }
      if (product.sizes && product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0].size);
      }
      
      // Fetch related products
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/products/${id}`);
      
      if (!response.ok) {
        throw new Error('Product not found');
      }
      
      const data = await response.json();
      setProduct(data.product);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (id) => {
    try {
      const response = await fetch(`${URL}/api/reviews/product/${id}?page=${reviewsPage}&limit=5`);
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`${URL}/api/products?category=${product.categoryId}&limit=3`);
      const data = await response.json();
      
      // Filter out current product
      const related = data.products.filter(p => p.id !== product.id);
      setRelatedProducts(related.slice(0, 3));
    } catch (err) {
      console.error('Error fetching related products:', err);
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

  const addToCart = async () => {
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
          productId: product.id,
          quantity,
          selectedFlavor,
          selectedSize
        })
      });

      if (response.ok) {
        setCartCount(prevCount => prevCount + quantity);
        alert('Product added to cart!');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const addToWishlist = async () => {
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
        body: JSON.stringify({ productId: product.id })
      });

      if (response.ok) {
        alert('Product added to wishlist!');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add to wishlist');
      }
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      alert('Failed to add product to wishlist. Please try again.');
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to submit a review');
        return;
      }

      const response = await fetch(`${URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id,
          rating: reviewForm.rating,
          title: reviewForm.title,
          comment: reviewForm.comment
        })
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        setShowReviewForm(false);
        setReviewForm({ rating: 5, title: '', comment: '' });
        fetchReviews(product.id); // Refresh reviews
        fetchProduct(product.id); // Refresh product to update rating
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    }
  };

  const addRelatedToCart = async (relatedProductId) => {
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
          productId: relatedProductId,
          quantity: 1
        })
      });

      if (response.ok) {
        setCartCount(prevCount => prevCount + 1);
        alert('Product added to cart!');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const getCurrentPrice = () => {
    if (!product.sizes || product.sizes.length === 0) return product.price;
    
    const selectedSizeObj = product.sizes.find(size => size.size === selectedSize);
    return selectedSizeObj ? selectedSizeObj.price: product.price;
  };

  const getOriginalPrice = () => {
    if (!product.sizes || product.sizes.length === 0) return product.originalPrice ? product.originalPrice : null;
    
    const selectedSizeObj = product.sizes.find(size => size.size === selectedSize);
    return selectedSizeObj && selectedSizeObj.originalPrice ? selectedSizeObj.originalPrice : (product.originalPrice ? product.originalPrice : null);
  };

  const getImages = () => {
    if (!product) return [];
    
    const images = [];
    if (product.imageUrl) images.push(product.imageUrl);
    if (product.images && Array.isArray(product.images)) {
      images.push(...product.images);
    }
    
    return images.length > 0 ? images : ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
          <button 
            onClick={() => window.location.href = '/products'}
            className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = getImages();
  const currentPrice = getCurrentPrice();
  const originalPrice = getOriginalPrice();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-white">
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
          <span 
            onClick={() => window.location.href = '/products'}
            className="cursor-pointer hover:text-gray-700"
          >
            Products
          </span> 
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-sky-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2">
                <span className="text-sm text-sky-600 font-medium">{product.brand}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount || 0} reviews)</span>
                <span className={`font-medium ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">₦{currentPrice.toLocaleString()}</span>
                {originalPrice && originalPrice > currentPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₦{originalPrice.toLocaleString()}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-sm font-medium">
                      Save {Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption.size)}
                      className={`p-3 rounded-lg border-2 transition-colors text-center ${
                        selectedSize === sizeOption.size
                          ? 'border-sky-500 bg-sky-50 text-sky-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{sizeOption.size}</div>
                      <div className="text-sm text-gray-600">₦{(sizeOption.price).toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flavor Selection */}
            {product.flavors && product.flavors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Flavor</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        selectedFlavor === flavor
                          ? 'border-sky-500 bg-sky-50 text-sky-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <button 
                onClick={addToCart}
                disabled={product.stockQuantity === 0}
                className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                  product.stockQuantity > 0 
                    ? 'bg-sky-500 text-white hover:bg-sky-600' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.stockQuantity > 0 ? `Add to Cart - ${currentPrice}` : 'Out of Stock'}
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={addToWishlist}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-sky-500" />
                  <span className="text-gray-600">Free shipping on orders over ₦23,000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-sky-500" />
                  <span className="text-gray-600">100% quality guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-sky-500" />
                  <span className="text-gray-600">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium ${
                  activeTab === 'description' 
                    ? 'border-sky-500 text-sky-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('nutrition')}
                className={`py-4 px-1 border-b-2 font-medium ${
                  activeTab === 'nutrition' 
                    ? 'border-sky-500 text-sky-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Nutrition Facts
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium ${
                  activeTab === 'reviews' 
                    ? 'border-sky-500 text-sky-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews ({product.reviewCount || 0})
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-gray max-w-none">
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>
                {product.ingredients && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Ingredients:</h4>
                    <p className="text-gray-600">{product.ingredients}</p>
                  </div>
                )}
                {product.tags && product.tags.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold mb-4">Nutrition Facts</h3>
                {product.nutritionFacts ? (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Serving Size:</span>
                        <span className="ml-2">{product.nutritionFacts.servingSize}</span>
                      </div>
                      <div>
                        <span className="font-medium">Servings Per Container:</span>
                        <span className="ml-2">{product.nutritionFacts.servingsPerContainer}</span>
                      </div>
                      <div>
                        <span className="font-medium">Calories:</span>
                        <span className="ml-2">{product.nutritionFacts.calories}</span>
                      </div>
                      <div>
                        <span className="font-medium">Protein:</span>
                        <span className="ml-2">{product.nutritionFacts.protein}</span>
                      </div>
                      <div>
                        <span className="font-medium">Carbs:</span>
                        <span className="ml-2">{product.nutritionFacts.carbs}</span>
                      </div>
                      <div>
                        <span className="font-medium">Fat:</span>
                        <span className="ml-2">{product.nutritionFacts.fat}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Nutrition information not available.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  {user.id && (
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      Write a Review
                    </button>
                  )}
                </div>

                {showReviewForm && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold mb-4">Write a Review</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => setReviewForm({...reviewForm, rating})}
                              className={`p-1 ${rating <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              <Star className="h-6 w-6 fill-current" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={reviewForm.title}
                          onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Review title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                        <textarea
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Share your experience with this product..."
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={submitReview}
                          className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                        >
                          Submit Review
                        </button>
                        <button
                          onClick={() => setShowReviewForm(false)}
                          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-900">
                            {review.user?.firstName} {review.user?.lastName}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {review.title && (
                          <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                        )}
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden rounded-t-2xl">
                    <img 
                      src={relatedProduct.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-cover cursor-pointer" 
                      onClick={() => window.location.href = `/product/${relatedProduct.id}`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 
                      onClick={() => window.location.href = `/product/${relatedProduct.id}`}
                      className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-sky-600"
                    >
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(relatedProduct.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({relatedProduct.reviewCount || 0})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">₦{(relatedProduct.price).toLocaleString()}</span>
                      <button 
                        onClick={() => addRelatedToCart(relatedProduct.id)}
                        className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}