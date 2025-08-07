// context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { URL } from '../url';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Generate or get session ID for guest users
  const getSessionId = () => {
    let sessionId = localStorage.getItem('guestSessionId');
    if (!sessionId) {
      sessionId = `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('guestSessionId', sessionId);
    }
    return sessionId;
  };

  // Get guest cart from localStorage
  const getGuestCart = () => {
    try {
      const guestCart = localStorage.getItem('guestCart');
      return guestCart ? JSON.parse(guestCart) : [];
    } catch (error) {
      console.error('Error reading guest cart:', error);
      return [];
    }
  };

  // Save guest cart to localStorage
  const saveGuestCart = (items) => {
    try {
      localStorage.setItem('guestCart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  };

  // Check if user is logged in
  const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };

  // Fetch cart items (for authenticated users)
  const fetchCartItems = async () => {
    if (!isLoggedIn()) {
      const guestItems = getGuestCart();
      setCartItems(guestItems);
      updateCartCount(guestItems);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems || []);
        updateCartCount(data.cartItems || []);
      } else if (response.status === 401) {
        // User not authenticated, load guest cart
        const guestItems = getGuestCart();
        setCartItems(guestItems);
        updateCartCount(guestItems);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Fallback to guest cart
      const guestItems = getGuestCart();
      setCartItems(guestItems);
      updateCartCount(guestItems);
    } finally {
      setLoading(false);
    }
  };

  // Update cart count
  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  // Add item to cart
  const addToCart = async (product, quantity = 1, selectedFlavor = null, selectedSize = null) => {
    try {
      setLoading(true);
      
      if (isLoggedIn()) {
        // Authenticated user - use API
        const token = localStorage.getItem('token');
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
          await fetchCartItems(); // Refresh cart
          return { success: true, message: 'Item added to cart!' };
        } else {
          const data = await response.json();
          return { success: false, message: data.message || 'Failed to add item to cart' };
        }
      } else {
        // Guest user - use localStorage
        const guestItems = getGuestCart();
        const sessionId = getSessionId();
        
        // Check if item already exists
        const existingItemIndex = guestItems.findIndex(item => 
          item.productId === product.id && 
          item.selectedFlavor === selectedFlavor && 
          item.selectedSize === selectedSize
        );

        if (existingItemIndex >= 0) {
          // Update quantity
          guestItems[existingItemIndex].quantity += quantity;
        } else {
          // Add new item
          const newItem = {
            id: `guest-${sessionId}-${product.id}-${selectedFlavor || 'none'}-${selectedSize || 'none'}`,
            productId: product.id,
            quantity,
            selectedFlavor,
            selectedSize,
            product: {
              id: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              imageUrl: product.imageUrl,
              brand: product.brand
            }
          };
          guestItems.push(newItem);
        }

        saveGuestCart(guestItems);
        setCartItems(guestItems);
        updateCartCount(guestItems);
        
        return { success: true, message: 'Item added to cart!' };
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, message: 'Failed to add item to cart' };
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);

      if (isLoggedIn()) {
        // Authenticated user
        const token = localStorage.getItem('token');
        const response = await fetch(`${URL}/api/cart/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ quantity })
        });

        if (response.ok) {
          await fetchCartItems();
          return { success: true };
        } else {
          const data = await response.json();
          return { success: false, message: data.message };
        }
      } else {
        // Guest user
        const guestItems = getGuestCart();
        const itemIndex = guestItems.findIndex(item => item.id === itemId);
        
        if (itemIndex >= 0) {
          if (quantity <= 0) {
            guestItems.splice(itemIndex, 1);
          } else {
            guestItems[itemIndex].quantity = quantity;
          }
          
          saveGuestCart(guestItems);
          setCartItems(guestItems);
          updateCartCount(guestItems);
        }
        
        return { success: true };
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      return { success: false, message: 'Failed to update cart item' };
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);

      if (isLoggedIn()) {
        // Authenticated user
        const token = localStorage.getItem('token');
        const response = await fetch(`${URL}/api/cart/${itemId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          await fetchCartItems();
          return { success: true };
        } else {
          return { success: false, message: 'Failed to remove item' };
        }
      } else {
        // Guest user
        const guestItems = getGuestCart();
        const filteredItems = guestItems.filter(item => item.id !== itemId);
        
        saveGuestCart(filteredItems);
        setCartItems(filteredItems);
        updateCartCount(filteredItems);
        
        return { success: true };
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false, message: 'Failed to remove item' };
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setLoading(true);

      if (isLoggedIn()) {
        // Authenticated user
        const token = localStorage.getItem('token');
        const response = await fetch(`${URL}/api/cart`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          setCartItems([]);
          setCartCount(0);
        }
      } else {
        // Guest user
        localStorage.removeItem('guestCart');
        setCartItems([]);
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Merge guest cart after login
  const mergeGuestCart = async () => {
    try {
      const guestItems = getGuestCart();
      if (guestItems.length === 0) return;

      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/cart/merge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ guestCartItems: guestItems })
      });

      if (response.ok) {
        // Clear guest cart and refresh user cart
        localStorage.removeItem('guestCart');
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Error merging guest cart:', error);
    }
  };

  // Initialize cart on mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  const value = {
    cartItems,
    cartCount,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCartItems,
    mergeGuestCart,
    isLoggedIn: isLoggedIn()
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};