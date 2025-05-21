import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';

function WishList() {
  const { favorites, removeFromFavorite, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const handleAddToCart = async (product) => {
    // BACKEND: Enviar petición POST a /api/cart para agregar el producto
    addToCart(product, 1);
  };
  
  const handleRemove = async (productId) => {
    // BACKEND: Enviar petición DELETE a /api/wishlist/{productId}
    removeFromFavorite(productId);
  };
  
  const handleClearAll = async () => {
    // BACKEND: Enviar petición DELETE a /api/wishlist para eliminar todos los favoritos
    clearFavorites();
    setShowConfirmModal(false);
  };
  
  const cancelClearAll = () => {
    setShowConfirmModal(false);
  };
  
  if (!favorites || favorites.length === 0) {
    return (
      <div className="bg-dark-300 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-dark-200 rounded-lg shadow-lg border border-dark-400">
            <svg 
              className="mx-auto h-16 w-16 text-gray-400 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <h1 className="text-3xl font-bold text-white mb-4">Tu lista de favoritos está vacía</h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Aún no has añadido ningún producto a tus favoritos. Explora nuestra tienda y guarda los productos que más te gusten.</p>
            <Link 
              to="/products" 
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors transform hover:scale-105 duration-200 shadow-lg"
            >
              Explorar productos
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-dark-300 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Mi Lista de Deseos</h1>
          <button 
            onClick={confirmClearAll}
            className="text-red-500 hover:text-red-400 transition-colors flex items-center"
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar todo
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(product => (
            <div 
              key={product.id} 
              className="bg-dark-200 rounded-lg shadow-lg border border-dark-400 overflow-hidden hover:border-primary-500 transition-colors group"
            >
              <div className="relative">
                <Link to={`/products/${product.id}`} className="block">
                  <img 
                    src={product.images?.[0] || "/placeholder.jpg"} 
                    alt={product.name} 
                    className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                
                <button
                  className="absolute top-3 right-3 bg-dark-300 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                  onClick={() => handleRemove(product.id)}
                  title="Eliminar de favoritos"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4">
                <Link 
                  to={`/products/${product.id}`}
                  className="font-bold text-white text-lg hover:text-primary-500 transition-colors"
                >
                  {product.name}
                </Link>
                <p className="text-gray-400 mb-2">{product.brand}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    {product.discount_price ? (
                      <>
                        <span className="text-primary-500 font-bold text-lg">${product.discount_price.toFixed(2)}</span>
                        <span className="text-gray-400 line-through ml-2">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-white font-bold text-lg">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  {product.rating && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-400 ml-1">{product.rating}</span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-dark-200 rounded-lg shadow-lg p-6 max-w-md w-full border border-dark-400">
            <h3 className="text-xl font-bold text-white mb-4">¿Eliminar todos los favoritos?</h3>
            <p className="text-gray-400 mb-6">¿Estás seguro de que quieres eliminar todos los productos de tu lista de favoritos? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelClearAll}
                className="px-4 py-2 border border-dark-400 rounded-md bg-dark-300 text-white hover:bg-dark-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Sí, eliminar todo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WishList;