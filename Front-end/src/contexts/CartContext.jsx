import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext();
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const ACTION_TYPES = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  INITIALIZE_CART: 'INITIALIZE_CART',
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        
        return {
          ...state,
          items: updatedItems,
          totalItems: calculateTotalItems(updatedItems),
          totalPrice: calculateTotalPrice(updatedItems),
        };
      } else {
        const newItem = { ...product, quantity };
        const updatedItems = [...state.items, newItem];
        
        return {
          ...state,
          items: updatedItems,
          totalItems: calculateTotalItems(updatedItems),
          totalPrice: calculateTotalPrice(updatedItems),
        };
      }
    }
    
    case ACTION_TYPES.REMOVE_ITEM: {
      const productId = action.payload;
      const updatedItems = state.items.filter(item => item.id !== productId);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: calculateTotalItems(updatedItems),
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }
    
    case ACTION_TYPES.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { 
          type: ACTION_TYPES.REMOVE_ITEM, 
          payload: productId 
        });
      }
      
      const updatedItems = state.items.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: calculateTotalItems(updatedItems),
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }
    
    case ACTION_TYPES.CLEAR_CART:
      return { ...initialState };
      
    case ACTION_TYPES.INITIALIZE_CART:
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.totalItems,
        totalPrice: action.payload.totalPrice,
      };
      
    default:
      return state;
  }
}

// backend, aca: adapta esta función para usar los campos correctos de tu API
function calculateTotalPrice(items) {
  return items.reduce((total, item) => {
    const price = item.discount_percentage > 0 
      ? item.price * (1 - item.discount_percentage / 100) 
      : item.price;
    return total + (price * item.quantity);
  }, 0);
}

function calculateTotalItems(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // BACKEND: Cargar carrito inicial
  useEffect(() => {
    // const fetchCart = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await fetch('/api/cart', {
    //       headers: {
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`
    //       }
    //     });
    //     
    //     if (!response.ok) throw new Error('Error loading cart');
    //     const data = await response.json();
    //     
    //     dispatch({ 
    //       type: 'INITIALIZE_CART',
    //       payload: data 
    //     });
    //   } catch (err) {
    //     setError(err.message);
    //     console.error('Error fetching cart:', err);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    //
    // fetchCart();
  }, []);

  // BACKEND: Sincronizar cambios con el servidor
  useEffect(() => {
    // const syncCart = async () => {
    //   try {
    //     const response = await fetch('/api/cart/sync', {
    //       method: 'PUT',
    //       headers: {
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         items: state.items,
    //         totalItems: state.totalItems,
    //         totalPrice: state.totalPrice
    //       })
    //     });
    //
    //     if (!response.ok) throw new Error('Error syncing cart');
    //   } catch (err) {
    //     console.error('Error syncing with backend:', err);
    //   }
    // };
    //
    // syncCart();
  }, [state]);

  const addToCart = async (product, quantity = 1) => {
    // try {
    //   setIsLoading(true);
    //   const response = await fetch('/api/cart/items', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ productId: product.id, quantity })
    //   });
    //
    //   if (!response.ok) throw new Error('Error adding item to cart');
    //   
    //   dispatch({ 
    //     type: ACTION_TYPES.ADD_ITEM, 
    //     payload: { product, quantity } 
    //   });
    // } catch (err) {
    //   setError(err.message);
    //   console.error('Error:', err);
    // } finally {
    //   setIsLoading(false);
    // }
    dispatch({ 
      type: ACTION_TYPES.ADD_ITEM, 
      payload: { product, quantity } 
    });
  };

  const removeFromCart = async (productId) => {
    // try {
    //   setIsLoading(true);
    //   const response = await fetch(`/api/cart/items/${productId}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     }
    //   });
    //
    //   if (!response.ok) throw new Error('Error removing item from cart');
    //
    //   dispatch({ 
    //     type: ACTION_TYPES.REMOVE_ITEM, 
    //     payload: productId 
    //   });
    // } catch (err) {
    //   setError(err.message);
    //   console.error('Error:', err);
    // } finally {
    //   setIsLoading(false);
    // }
    dispatch({ 
      type: ACTION_TYPES.REMOVE_ITEM, 
      payload: productId 
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: ACTION_TYPES.UPDATE_QUANTITY, 
      payload: { productId, quantity } 
    });
  };
  
  const clearCart = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_CART });
  };
  
  const value = {
    ...state,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  
  return context;
}