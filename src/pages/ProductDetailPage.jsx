//pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Star, ArrowRight, MessageCircle, Share2, Truck, Shield, RotateCcw, Plus, Minus, Phone, Mail, X } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function ProductDetails({ productId = '1' }) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use CartContext instead of local cart management
  const { cartCount, addToCart } = useCart();
  
  // Product selection state
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  
  // UI state
  const [activeTab, setActiveTab] = useState('description');
  const [reviewsPage, setReviewsPage] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
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
      console.log("see product", data)
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

  // Updated addToCart function using CartContext
  const handleAddToCart = async () => {
    const result = await addToCart(product, quantity, selectedFlavor, selectedSize);
    
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message || 'Failed to add product to cart');
    }
  };

  const contactSeller = () => {
    setShowContactModal(true);
  };

  const handleWhatsApp = () => {
    const phoneNumber = '2348134110122';
    const message = `Hi, I'm interested in ${product.name}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowContactModal(false);
  };

  const handlePhone = () => {
    window.location.href = 'tel:08134110122';
    setShowContactModal(false);
  };

  const handleEmail = () => {
    const subject = `Inquiry about ${product.name}`;
    const body = `Hi, I'm interested in ${product.name}`;
    window.location.href = `mailto:Homeofproteingoodie@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowContactModal(false);
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

  // Updated addRelatedToCart function using CartContext
  const addRelatedToCart = async (relatedProduct) => {
    const result = await addToCart(relatedProduct, 1);
    
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message || 'Failed to add product to cart');
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
 <Navbar/>

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
                className="w-full h-full object-contain"
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
                  <span className="text-xs text-sky-600 font-medium">
                      {product.brand?.name || 'No Brand'}
                    </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase">{product.name}</h1>
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
                <span className="text-3xl font-bold text-gray-900">₦{Number(currentPrice).toLocaleString()}</span>
                {originalPrice && originalPrice > currentPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₦{Number(originalPrice).toLocaleString()}</span>
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
                      <div className="text-sm text-gray-600">₦{Number(sizeOption.price).toLocaleString()}</div>
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
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                  product.stockQuantity > 0 
                    ? 'bg-sky-500 text-white hover:bg-sky-600' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.stockQuantity > 0 ? `Add to Cart - ₦${Number(currentPrice * quantity).toLocaleString()}` : 'Out of Stock'}
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={contactSeller}
                  className="flex-1 border border-green-500 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Seller</span>
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
                  <span className="text-gray-600">24 - 72 hour delivery all over Nigeria</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-sky-500" />
                  <span className="text-gray-600">100% quality guarantee</span>
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
                {/* Review Summary */}
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 mb-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-5xl font-bold text-gray-900">{product.rating || '0.0'}</span>
                        <div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{product.reviewCount || 0} reviews</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      {user.id ? (
                        <button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors font-medium shadow-md hover:shadow-lg"
                        >
                          {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                        </button>
                      ) : (
                        <div className="text-center">
                          <p className="text-gray-600 mb-2">Want to write a review?</p>
                          <button
                            onClick={() => window.location.href = '/login'}
                            className="text-sky-600 hover:text-sky-700 font-medium"
                          >
                            Sign in to leave a review
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <div className="bg-white border-2 border-sky-200 rounded-xl p-6 mb-8 shadow-md">
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Share Your Experience</h4>
                    <form onSubmit={submitReview} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                          Overall Rating <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setReviewForm({...reviewForm, rating})}
                              className="focus:outline-none hover:scale-110 transition-transform"
                            >
                              <Star
                                className={`h-10 w-10 ${rating <= reviewForm.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} transition-colors`}
                              />
                            </button>
                          ))}
                          <span className="ml-3 text-lg font-medium text-gray-900">
                            {reviewForm.rating === 1 && 'Poor'}
                            {reviewForm.rating === 2 && 'Fair'}
                            {reviewForm.rating === 3 && 'Good'}
                            {reviewForm.rating === 4 && 'Very Good'}
                            {reviewForm.rating === 5 && 'Excellent'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Review Title <span className="text-gray-500">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={reviewForm.title}
                          onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="Summarize your experience..."
                          maxLength={100}
                        />
                        <p className="text-xs text-gray-500 mt-1">{reviewForm.title.length}/100 characters</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Your Review <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                          rows={5}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="Tell us what you loved about this product, or what we could improve..."
                          maxLength={1000}
                        />
                        <p className="text-xs text-gray-500 mt-1">{reviewForm.comment.length}/1000 characters</p>
                      </div>

                      <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700">
                          <strong>Please note:</strong> Reviews are public and include your name.
                          Be honest and respectful in your feedback.
                        </p>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          disabled={!reviewForm.comment.trim()}
                          className="bg-sky-500 text-white px-8 py-3 rounded-lg hover:bg-sky-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                          Submit Review
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowReviewForm(false);
                            setReviewForm({ rating: 5, title: '', comment: '' });
                          }}
                          className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Reviews List */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center">
                                <span className="text-sky-600 font-bold text-lg">
                                  {review.user?.firstName?.charAt(0)}{review.user?.lastName?.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold text-gray-900">
                                    {review.user?.firstName} {review.user?.lastName}
                                  </span>
                                  {review.isVerified && (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                                      Verified Purchase
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {review.title && (
                            <h4 className="font-semibold text-gray-900 mb-2 text-lg">{review.title}</h4>
                          )}
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg font-medium mb-2">No reviews yet</p>
                        <p className="text-gray-500">Be the first to share your experience with this product!</p>
                        {user.id && (
                          <button
                            onClick={() => setShowReviewForm(true)}
                            className="mt-4 bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                          >
                            Write the First Review
                          </button>
                        )}
                      </div>
                    )}
                  </div>
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
                      <span className="text-xl font-bold text-gray-900">₦{Number(relatedProduct.price).toLocaleString()}</span>
                      <button
                        onClick={() => addRelatedToCart(relatedProduct)}
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

      {/* Contact Seller Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowContactModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Contact Seller</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">Choose your preferred contact method:</p>

            <div className="space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center space-x-4 p-4 border-2 border-green-500 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
              >
                <div className="p-3 bg-green-500 rounded-full">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">WhatsApp</div>
                  <div className="text-sm text-gray-600">08134110122</div>
                </div>
              </button>

              <button
                onClick={handlePhone}
                className="w-full flex items-center space-x-4 p-4 border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
              >
                <div className="p-3 bg-blue-500 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">Phone Call</div>
                  <div className="text-sm text-gray-600">08134110122</div>
                </div>
              </button>

              <button
                onClick={handleEmail}
                className="w-full flex items-center space-x-4 p-4 border-2 border-purple-500 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
              >
                <div className="p-3 bg-purple-500 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-sm text-gray-600">Homeofproteingoodie@gmail.com</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}