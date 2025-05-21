import { useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/images/default.webp";  
function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null;

  // TODO: Implementar llamadas al backend:
  // POST /api/cart/add
  // - Agregar producto al carrito
  // - Manejar cantidad
  // - Validar stock
  
  // POST /api/wishlist/add
  // - Agregar/quitar de favoritos
  // - Validar usuario autenticado
  
  // GET /api/products/{id}/stock
  // - Verificar disponibilidad
  // - Obtener tallas disponibles
  // TODO: Agregar funcionalidad
  const handleAddToWishlist = async () => {
    // POST /api/wishlist/add
    // Manejar estados y errores
  };

  // TODO: Funcion para agregar carrito
  const handleAddToCart = async () => {
    // POST /api/cart/add
    // Manejar estados y errores
  };

  return (
    <div
      className="bg-dark-200 rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col border-0 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'none',
        boxShadow: isHovered 
          ? '0 20px 30px -12px rgba(255, 0, 0, 0.25), 0 0 0 1px rgba(255, 0, 0, 0.1)' 
          : '0 10px 20px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }}
    >
  
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 via-primary-600/0 to-primary-600/0 group-hover:from-primary-600/30 group-hover:via-primary-600/5 group-hover:to-primary-600/30 rounded-xl transition-all duration-500 z-0"></div>
      
      <div className="relative z-10">
        <div className="relative overflow-hidden">
          <Link to={`/products/${product.id}`} className="block">
            <div className="h-72 overflow-hidden">
              <img
                src={product.image || defaultImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  console.log('Error loading image:', product.image);
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/90 via-dark-300/20 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
          </Link>
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                NUEVO
              </span>
            )}
          </div>
          
          {product.discount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center backdrop-blur-sm">
                <span className="animate-pulse mr-1">•</span>
                {product.discount}% OFF
              </span>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="bg-primary-600 text-white font-bold py-2.5 px-6 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-primary-500 hover:scale-105">
              Ver detalle
            </button>
          </div>
        </div>
        

        <div className="p-5 flex-grow flex flex-col bg-gradient-to-br from-dark-300 to-dark-200 relative">

          <div className="flex justify-between items-start mb-1">
            <div className="bg-dark-400 px-2.5 py-1 rounded-full inline-block">
              <p className="text-primary-500 text-xs font-bold tracking-wide">{product.brand}</p>
            </div>

            <div className="flex items-center bg-dark-400 px-2 py-1 rounded-full">
              <span className="text-primary-500 mr-1">★</span>
              <span className="text-gray-300 text-xs font-medium">{product.rating}</span>
            </div>
          </div>
          

          <h3 className="text-white font-medium text-lg mb-4 mt-2 group-hover:text-primary-500 transition-colors line-clamp-2">{product.name}</h3>
          

          <div className="mt-auto pt-3 flex items-center justify-between border-t border-dark-400">
            <div className="flex flex-col">
              {product.discount > 0 ? (
                <>
                  <div className="flex items-baseline">
                    <span className="text-primary-500 font-bold text-xl">${discountedPrice.toFixed(2)}</span>
                    <span className="text-gray-500 text-xs line-through ml-2">${product.price.toFixed(2)}</span>
                  </div>
                  <span className="text-green-500 text-xs font-medium mt-0.5">Ahorras: ${(product.price - discountedPrice).toFixed(2)}</span>
                </>
              ) : (
                <span className="text-white font-bold text-xl">${product.price.toFixed(2)}</span>
              )}
            </div>
            
         
            <button className="bg-dark-400 hover:bg-primary-600 rounded-full p-3 transition-all duration-300 group relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              
              <span className="absolute inset-0 rounded-full border border-primary-500/50 group-hover:scale-150 group-hover:opacity-0 transition-all duration-500"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;