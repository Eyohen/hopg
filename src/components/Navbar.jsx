// components/Navbar.jsx
import React, { useState } from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { URL } from '../url';
import logo2 from '../assets/logo2.jpg';

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      // Navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } catch (err) {
      console.error('Error during search:', err);
      alert('Search failed. Please try again.');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div 
              onClick={handleLogoClick}
              className="text-white px-3 py-2 rounded-lg font-bold text-xl cursor-pointer"
            >
              <img src={logo2} className='w-22 h-16 rounded-md' alt="HOPG Logo" />
            </div>
            <div className="hidden sm:block">
              <span className="text-gray-600 text-sm">Home of Protein Goodies</span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for goodies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            <div><button onClick={()=> navigate('/login')} className='bg-sky-500 text-white px-6 py-1 rounded'>Login</button></div>

            {/* Cart Button */}
            <button 
              onClick={handleCartClick} 
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingBag className="h-5 w-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for goodies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}