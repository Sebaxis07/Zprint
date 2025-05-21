const API_URL = import.meta.env.VITE_API_URL;

// Helper para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ha ocurrido un error');
  }
  return response.json();
};

export const productService = {
  // Obtener todos los productos
  getAllProducts: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/products?${queryParams}`);
    return handleResponse(response);
  },

  // Obtener un producto por ID
  getProductById: async (productId) => {
    const response = await fetch(`${API_URL}/products/${productId}`);
    return handleResponse(response);
  },

  // Obtener productos relacionados
  getRelatedProducts: async (productId) => {
    const response = await fetch(`${API_URL}/products/${productId}/related`);
    return handleResponse(response);
  },

  // Obtener productos por categoría
  getProductsByCategory: async (category, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/products/category/${category}?${queryParams}`);
    return handleResponse(response);
  },

  // Buscar productos
  searchProducts: async (query) => {
    const response = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
    return handleResponse(response);
  },

  // Obtener productos destacados
  getFeaturedProducts: async () => {
    const response = await fetch(`${API_URL}/products/featured`);
    return handleResponse(response);
  },

  // Obtener productos nuevos
  getNewProducts: async () => {
    const response = await fetch(`${API_URL}/products/new`);
    return handleResponse(response);
  },

  // Obtener productos en oferta
  getDiscountedProducts: async () => {
    const response = await fetch(`${API_URL}/products/discounted`);
    return handleResponse(response);
  },

  // Verificar stock de un producto
  checkStock: async (productId) => {
    const response = await fetch(`${API_URL}/products/${productId}/stock`);
    return handleResponse(response);
  }
};