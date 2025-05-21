import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/images/default.webp";  

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  // BACKEND: Agregar estados para tracking de wishlist y cart
  // const [isInWishlist, setIsInWishlist] = useState(false);
  // const [isInCart, setIsInCart] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null;

  // BACKEND: Agregar effect para verificar estado inicial del producto
  // useEffect(() => {
  //   const checkProductStatus = async () => {
  //     try {
  //       const [wishlistResponse, cartResponse] = await Promise.all([
  //         fetch(`/api/wishlist/check/${product.id}`),
  //         fetch(`/api/cart/check/${product.id}`)
  //       ]);
  //       const [wishlistData, cartData] = await Promise.all([
  //         wishlistResponse.json(),
  //         cartResponse.json()
  //       ]);
  //       setIsInWishlist(wishlistData.inWishlist);
  //       setIsInCart(cartData.inCart);
  //     } catch (error) {
  //       console.error('Error checking product status:', error);
  //     }
  //   };
  //   checkProductStatus();
  // }, [product.id]);

  const handleAddToWishlist = async () => {
    // BACKEND: Implementar lógica para agregar a wishlist
    // try {
    //   const response = await fetch('/api/wishlist', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ productId: product.id })
    //   });
    //   if (!response.ok) throw new Error('Error adding to wishlist');
    //   setIsInWishlist(true);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  const handleAddToCart = async () => {
    // BACKEND: Implementar lógica para agregar al carrito
    // try {
    //   const response = await fetch('/api/cart', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ 
    //       productId: product.id,
    //       quantity: 1
    //     })
    //   });
    //   if (!response.ok) throw new Error('Error adding to cart');
    //   setIsInCart(true);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  return (
    <div
      className="bg-dark-200 rounded-xl overflow-hidden h-full flex flex-col group relative transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-6px)' : 'none',
        boxShadow: isHovered 
          ? '0 16px 25px -10px rgba(239, 68, 68, 0.3), 0 0 0 1px rgba(239, 68, 68, 0.1)' 
          : '0 8px 15px -8px rgba(0, 0, 0, 0.3)'
      }}
    >  
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 via-primary-600/0 to-primary-600/0 group-hover:from-primary-600/20 group-hover:via-primary-600/5 group-hover:to-primary-600/20 rounded-xl transition-all duration-500 z-0"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="relative overflow-hidden">
          <Link to={`/products/${product.id}`} className="block">
            <div className="h-64 overflow-hidden">
              <img
                src={product.image || defaultImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/90 via-dark-300/30 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
          </Link>
          
          <div className="absolute top-0 left-0 w-full p-3 flex justify-between">
            <div>
              {product.isNew && (
                <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg inline-flex items-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-1.5 animate-pulse"></span>
                  NUEVO
                </span>
              )}
            </div>
            
            {product.discount > 0 && (
              <span className="bg-primary-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <div className="absolute bottom-0 inset-x-0 p-3 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <Link 
              to={`/products/${product.id}`} 
              className="bg-primary-600/90 backdrop-blur-sm text-white font-medium text-sm py-1.5 px-3 rounded-lg shadow-lg w-full text-center transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 hover:bg-primary-500"
            >
              Ver detalle
            </Link>
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col bg-dark-200">
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="bg-dark-300 px-2 py-0.5 rounded text-xs">
              <p className="text-primary-500 font-medium truncate max-w-[100px]">{product.brand}</p>
            </div>

            <div className="flex items-center bg-dark-300 px-1.5 py-0.5 rounded">
              <span className="text-primary-500 mr-1">★</span>
              <span className="text-gray-300 text-xs">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="text-white font-medium text-sm mb-3 line-clamp-2 h-10 group-hover:text-primary-400 transition-colors">{product.name}</h3>
          
          <div className="mt-auto pt-3 flex items-center justify-between border-t border-dark-400">
            <div className="flex flex-col">
              {product.discount > 0 ? (
                <>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-primary-500 font-bold text-base">${discountedPrice.toFixed(2)}</span>
                    <span className="text-gray-500 text-xs line-through">${product.price.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <span className="text-white font-bold text-base">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <div className="flex gap-1">
              <button 
                onClick={handleAddToCart}
                className="bg-dark-300 hover:bg-primary-600 rounded-full p-1.5 transition-colors group-hover:transform group-hover:scale-110"
              >
                <svg className="h-4 w-4 text-primary-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
              
              <button 
                onClick={handleAddToWishlist}
                className="bg-dark-300 hover:bg-primary-600 rounded-full p-1.5 transition-colors group-hover:transform group-hover:scale-110"
              >
                <svg className="h-4 w-4 text-primary-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;