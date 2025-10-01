import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("grandRealtors_cart")) || [],

  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      const findProduct = state.find((item) => item.id === action.payload.id);

      if (findProduct) {
        toast.error('This product is already in your cart', { id: 'cart-toast' });
      } else {
        state.push(action.payload);
        toast.success('Product added to cart successfully', { id: 'cart-toast' });
      }
      localStorage.setItem("texcars__cart", JSON.stringify(state));
    },

    // Change product quantity
    changeCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const productIndex = state.findIndex((item) => item.id === id);

      if (productIndex >= 0) {
        if (quantity < 1) {
          state.splice(productIndex, 1);
          toast.info('Product removed from cart', { id: 'cart-toast' });
        } else {
          state[productIndex].quantity = quantity;
        }
        localStorage.setItem("texcars__cart", JSON.stringify(state));
      }
    },

    // Remove a product from cart
    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.id !== action.payload);
      toast.success('Product removed from cart successfully', { id: 'cart-toast' });
      localStorage.setItem("texcars__cart", JSON.stringify(updatedCart));
      return updatedCart;
    },

    // Clear all products from cart
    clearCart: () => {
      toast.success('Cart cleared successfully', { id: 'cart-toast' });
      localStorage.removeItem("texcars__cart");
      return [];
    }
  }
});

// Export actions
export const { addToCart, changeCartQuantity, removeFromCart, clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
