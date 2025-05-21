import axios from 'axios';

const API_URL = process.env.API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// ------------- AUTENTICACIÓN -------------
export const authService = {
  login: async (credentials) => {
    
  },
  
  register: async (userData) => {
    
  },
  
  getCurrentUser: async () => {
    
  },
  
  logout: async () => {
    
  },
  
  forgotPassword: async (email) => {
    
  },
  
  resetPassword: async (resetData) => {
    
  },
  
  verifyIdentity: async (identityData) => {
    
  }
};

// ------------- PRODUCTOS -------------
export const productService = {
  getProducts: async (params = {}) => {
    
  },
  
  getProductById: async (productId) => {
    
  },
  
  getFeaturedProducts: async () => {
    
  },
  
  getNewProducts: async () => {
    
  },
  
  searchProducts: async (query) => {
    
  },
  
  getDiscountedProducts: async () => {
    
  }
};

// ------------- CATEGORÍAS -------------
export const categoryService = {
  getCategories: async () => {
    
  },
  
  getProductsByCategory: async (categoryId, params = {}) => {
    
  }
};

// ------------- MARCAS -------------
export const brandService = {
  getBrands: async () => {
    
  },
  
  getProductsByBrand: async (brandId, params = {}) => {
    
  }
};

// ------------- CARRITO -------------
export const cartService = {
  getCart: async () => {
    
  },
  
  addToCart: async (productId, quantity = 1) => {
    
  },
  
  updateCartItem: async (cartItemId, quantity) => {
    
  },
  
  removeFromCart: async (cartItemId) => {
    
  },
  
  clearCart: async () => {
    
  },
  
  applyCoupon: async (couponCode) => {
    
  }
};

// ------------- CHECKOUT -------------
export const checkoutService = {
  getShippingMethods: async () => {
    
  },
  
  getPaymentMethods: async () => {
    
  },
  
  createOrder: async (orderData) => {
    
  },
  
  processPayment: async (paymentData) => {
    
  }
};

// ------------- USUARIO -------------
export const userService = {
  getUserAddresses: async () => {
    
  },
  
  addAddress: async (addressData) => {
    
  },
  
  updateAddress: async (addressId, addressData) => {
    
  },
  
  deleteAddress: async (addressId) => {
    
  },
  
  getSavedPaymentMethods: async () => {
    
  },
  
  addPaymentMethod: async (paymentData) => {
    
  },
  
  deletePaymentMethod: async (paymentMethodId) => {
    
  },
  
  getUserOrders: async () => {
    
  },
  
  getOrderDetails: async (orderId) => {
    
  }
};

export default api;