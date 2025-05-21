import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import ProductReviews from '../components/product/ProductReview';
import StarRating from '../components/ui/StarRating';
import { productService } from '../services/productServices';

// Datos de ejemplo - SOLO PARA DESARROLLO
// Reemplazar con llamada a API
const fakeProduct = {
  id: 1,
  name: "Air Max 270",
  brand: "Nike",
  price: 149.99,
  discount_price: 129.99,
  rating: 4.7,
  reviews_count: 124,
  description: "El Nike Air Max 270 ofrece un look audaz y un confort inigualable. Su unidad Air Max visible en el talón, la más grande hasta la fecha, proporciona una increíble amortiguación para un estilo urbano que destaca en cualquier ocasión.",
  features: [
    "Parte superior en malla para mayor transpirabilidad",
    "Unidad Air Max 270 para máxima amortiguación",
    "Mediasuela de espuma para mayor suavidad",
    "Suela exterior de goma para mayor durabilidad",
    "Diseño ligero para un uso diario cómodo"
  ],
  sizes: [38, 39, 40, 41, 42, 43, 44, 45],
  colors: ["Negro", "Blanco", "Rojo", "Azul"],
  images: [
    "/src/assets/images/default.webp",
    "/src/assets/images/default.webp",
    "/src/assets/images/default.webp",
    "/src/assets/images/default.webp",
  ],
  stock: 15,
  is_new: true,
  is_featured: true,
  category: "Running"
};

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorite, isFavorite } = useFavorites();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [showReviews, setShowReviews] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  const [isVisible, setIsVisible] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    // Activar animaciones después de un breve retraso
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  // BACKEND: Cargar detalles del producto
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // const response = await fetch(`/api/products/${productId}`);
        // if (!response.ok) throw new Error('Product not found');
        // const data = await response.json();
        // setProduct(data);
        // setIsFavorited(await checkIfFavorited(productId));
        
        // Temporalmente usando datos de ejemplo
        setTimeout(() => {
          setProduct(fakeProduct);
          setIsFavorited(isFavorite(fakeProduct.id));
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Error al cargar el producto');
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);

  // BACKEND: Cargar productos relacionados
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // const response = await fetch(`/api/products/${productId}/related`);
        // if (!response.ok) throw new Error('Error loading related products');
        // const data = await response.json();
        // setRelatedProducts(data);
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };

    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      setError('Por favor, selecciona talla y color');
      return;
    }

    try {
      // const response = await fetch('/api/cart', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({
      //     productId: product.id,
      //     quantity,
      //     size: selectedSize,
      //     color: selectedColor
      //   })
      // });
      // 
      // if (!response.ok) throw new Error('Error adding to cart');
      // 
      // const data = await response.json();
      addToCart({
        ...product,
        selectedSize,
        selectedColor,
        quantity
      });
    } catch (err) {
      setError('Error al agregar al carrito');
    }
  };

  // BACKEND: Manejar favoritos
  const handleToggleFavorite = async () => {
    try {
      // const endpoint = `/api/wishlist/${product.id}`;
      // const method = isFavorited ? 'DELETE' : 'POST';
      // 
      // const response = await fetch(endpoint, {
      //   method,
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // 
      // if (!response.ok) throw new Error('Error updating wishlist');

      if (isFavorited) {
        removeFromFavorite(product.id);
      } else {
        addToFavorites(product);
      }
      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error('Error updating wishlist:', err);
    }
  };
  
  const handleMouseMove = (e) => {
    if (!showZoom) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-300">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-t-4 border-b-4 border-primary-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-r-4 border-l-4 border-primary-300 rounded-full animate-spin animation-reverse"></div>
            <div className="absolute inset-4 border-t-4 border-b-4 border-primary-700 rounded-full animate-spin animation-delay-500"></div>
          </div>
          <p className="mt-6 text-white text-lg font-medium tracking-wide animate-pulse">Cargando producto...</p>
        </div>
      </div>
    );
  }
  
  if (error && !product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-300">
        <div className="bg-dark-200 p-8 rounded-2xl shadow-2xl max-w-md relative overflow-hidden border border-red-800">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-dark-200"></div>
          <div className="relative z-10 text-center">
            <div className="relative inline-block mb-6">
              <svg className="h-24 w-24 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="absolute inset-0 bg-red-500/30 blur-xl rounded-full"></div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Producto no encontrado</h2>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">{error}</p>
            <button 
              onClick={() => navigate('/products')} 
              className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/30 shadow-lg shadow-primary-900/30"
            >
              Ver otros productos
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100) 
    : 0;
  
  return (
    <div className="bg-dark-300 min-h-screen pb-20 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-40 -left-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-10 w-80 h-80 bg-primary-900/15 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div className="relative pt-12 pb-36 overflow-hidden">
        <div 
          className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center text-gray-400 text-sm mb-4">
            <Link to="/" className="hover:text-primary-500 transition-colors">Inicio</Link>
            <svg className="mx-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/products" className="hover:text-primary-500 transition-colors">Productos</Link>
            <svg className="mx-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to={`/categories/${product.category.toLowerCase()}`} className="hover:text-primary-500 transition-colors">{product.category}</Link>
          </div>
          
          <h1 
            className="text-6xl font-bold text-white mb-4 tracking-tight leading-tight"
            style={{
              textShadow: '0 0 15px rgba(239, 68, 68, 0.3), 0 0 30px rgba(239, 68, 68, 0.1)'
            }}
          >
            {product.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-2xl font-medium text-primary-500">{product.brand}</span>
            <div className="flex items-center gap-2 py-1 px-3 bg-dark-200/80 backdrop-blur-sm rounded-full">
              <StarRating rating={product.rating} />
              <span className="text-gray-400">({product.reviews_count})</span>
            </div>
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="text-primary-500 hover:text-primary-400 text-sm transition-colors underline underline-offset-4"
            >
              {showReviews ? 'Ocultar reseñas' : 'Ver reseñas'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Columna Izquierda: Galería con efectos */}
          <div className="lg:col-span-7 lg:pr-10">
            <div 
              className={`bg-dark-200 rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <div 
                className="relative"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <div className="relative h-[550px] overflow-hidden">
                  <img 
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700"
                  />
                  
                  {showZoom && (
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundImage: `url(${product.images[activeImage]})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: '200%',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.9
                      }}
                    ></div>
                  )}
                  
                  {showZoom && (
                    <div 
                      className="absolute w-16 h-16 rounded-full border border-primary-400 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{
                        left: `${zoomPosition.x}%`,
                        top: `${zoomPosition.y}%`,
                        boxShadow: '0 0 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2)'
                      }}
                    ></div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-200/90 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  {product.is_new && (
                    <div 
                      className={`bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-1000 ease-out transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                      }`}
                      style={{ 
                        boxShadow: '0 5px 15px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      NUEVO LANZAMIENTO
                    </div>
                  )}
                  
                  {discountPercentage > 0 && (
                    <div 
                      className={`bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-1000 ease-out transform ${
                        isVisible ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 -translate-x-10'
                      }`}
                      style={{ 
                        boxShadow: '0 5px 15px rgba(239, 68, 68, 0.4), 0 0 30px rgba(239, 68, 68, 0.2)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <span className="relative">
                        <svg className="h-4 w-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {discountPercentage}% DESCUENTO
                    </div>
                  )}
                </div>
                
                <button 
                  className={`absolute bottom-6 right-6 p-3 rounded-full transition-all duration-500 transform ${
                    isFavorited 
                      ? 'bg-primary-600 scale-110 rotate-12' 
                      : 'bg-dark-300/90 backdrop-blur-md hover:bg-dark-400/90 hover:scale-110'
                  }`}
                  onClick={handleToggleFavorite}
                  style={{ 
                    boxShadow: isFavorited 
                      ? '0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)' 
                      : '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <svg 
                    className={`h-7 w-7 ${
                      isFavorited 
                        ? 'text-white animate-heartbeat' 
                        : 'text-primary-500'
                    }`}
                    fill={isFavorited ? 'currentColor' : 'none'} 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={isFavorited ? 0 : 2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </button>
              </div>
              
              <div className="px-8 pb-8 pt-6 relative z-10 bg-dark-200">
                <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((image, index) => (
                    <button 
                      key={index} 
                      className={`flex-shrink-0 transition-all duration-300 transform ${
                        activeImage === index 
                          ? 'scale-105 opacity-100 border-2 border-primary-500'
                          : 'scale-95 opacity-70 hover:opacity-100 border-2 border-transparent'
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${product.name} vista ${index + 1}`} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-center mt-4 space-x-2">
                  {product.images.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        activeImage === index 
                          ? 'w-8 bg-primary-500'
                          : 'w-2 bg-dark-400'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex flex-col">
            <div 
              className={`bg-dark-200 rounded-3xl shadow-2xl overflow-hidden relative transition-all duration-1000 delay-200 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-dark-100/50 translate-y-1/3 -translate-x-1/3 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary-500/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"></div>
              </div>
            
              <div className="relative p-8 border-b border-dark-300">
                <div className="flex flex-col gap-2">
                  <div className="flex items-end gap-4">
                    {discountPercentage > 0 ? (
                      <>
                        <div className="flex items-center">
                          <span className="text-4xl font-bold text-primary-500">${product.discount_price.toFixed(2)}</span>
                          <span className="text-xl text-gray-400 line-through ml-3">${product.price.toFixed(2)}</span>
                        </div>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-white">${product.price.toFixed(2)}</span>
                    )}
                    
                    {product.stock > 0 ? (
                      <span className="py-1 px-3 bg-green-900/80 text-green-300 text-sm rounded-full flex items-center gap-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        En stock ({product.stock})
                      </span>
                    ) : (
                      <span className="py-1 px-3 bg-red-900/80 text-red-300 text-sm rounded-full">
                        Agotado
                      </span>
                    )}
                  </div>
                  
                  {discountPercentage > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="text-sm bg-primary-900/40 text-primary-400 py-1 px-2 rounded">
                        Ahorras: ${(product.price - product.discount_price).toFixed(2)}
                      </div>
                      <div className="h-1 w-1 bg-dark-400 rounded-full"></div>
                      <div className="text-sm text-gray-400">
                        Oferta por tiempo limitado
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="relative p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-4 inline-flex items-center">
                    <svg className="h-5 w-5 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Sobre este producto
                  </h2>
                  <p className="text-gray-400 leading-relaxed">{product.description}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-4 inline-flex items-center">
                    <svg className="h-5 w-5 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Características
                  </h2>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-dark-300 text-primary-500 rounded-full p-1 mr-3 mt-0.5">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-white">Selecciona una talla</h2>
                    <button className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Guía de tallas
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`py-3 relative overflow-hidden rounded-xl transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 font-medium scale-105 z-10'
                            : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                        }`}
                        onClick={() => {
                          setSelectedSize(size);
                          setError('');
                        }}
                      >
                        {selectedSize === size && (
                          <div className="absolute inset-0 bg-primary-500 animate-pulse-slow opacity-30"></div>
                        )}
                        <span className="relative z-10">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-white mb-4">Selecciona un color</h2>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => {
                      const colorMap = {
                        'negro': '#111111',
                        'blanco': '#ffffff',
                        'rojo': '#ef4444',
                        'azul': '#3b82f6'
                      };
                      
                      const bgColor = colorMap[color.toLowerCase()] || '#ddd';
                      const textColor = ['blanco', 'amarillo'].includes(color.toLowerCase()) ? '#111' : '#fff';
                      
                      return (
                        <button
                          key={color}
                          className={`relative w-12 h-12 rounded-full transition-all duration-300 transform ${
                            selectedColor === color
                              ? 'scale-110 shadow-lg z-10'
                              : 'hover:scale-105'
                          }`}
                          style={{ 
                            backgroundColor: bgColor,
                            boxShadow: selectedColor === color 
                              ? `0 0 0 3px #171717, 0 0 0 6px ${bgColor}` 
                              : 'none'
                          }}
                          onClick={() => {
                            setSelectedColor(color);
                            setError('');
                          }}
                        >
                          {selectedColor === color && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg className="h-6 w-6" style={{ color: textColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                          <span className="sr-only">{color}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-white mb-4">Cantidad</h2>
                  <div className="flex items-center">
                    <button
                      className="p-3 rounded-l-xl border border-dark-400 bg-dark-300 text-gray-300 hover:bg-dark-400 transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-16 py-3 px-4 text-center border-t border-b border-dark-400 bg-dark-300 text-white text-lg font-medium focus:outline-none"
                    />
                    <button
                      className="p-3 rounded-r-xl border border-dark-400 bg-dark-300 text-gray-300 hover:bg-dark-400 transition-colors"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-900/30 text-red-300 rounded-xl border border-red-800/50 animate-shake">
                    <div className="flex">
                      <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col space-y-3">
                  <button
                    className="group relative w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-primary-600/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-200"
                    onClick={handleAddToCart}
                  >
                    <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-x-0 group-hover:scale-x-100 group-hover:bg-primary-700/30"></div>
                    <div className="relative flex items-center justify-center">
                      <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Añadir al Carrito
                    </div>
                  </button>
                  
                  <button
                    className={`relative w-full py-4 px-6 rounded-xl font-medium text-lg transition-all duration-300 overflow-hidden ${
                      isFavorited 
                        ? 'bg-dark-100 text-primary-500 border-2 border-primary-500'
                        : 'bg-dark-300 text-white hover:bg-dark-400 border-2 border-dark-400'
                    }`}
                    onClick={handleToggleFavorite}
                  >
                    <div className="relative flex items-center justify-center">
                      <svg 
                        className={`h-6 w-6 mr-2 ${isFavorited ? 'text-primary-500' : 'text-white'}`}
                        fill={isFavorited ? 'currentColor' : 'none'} 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {isFavorited ? 'Guardado en Favoritos' : 'Añadir a Favoritos'}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {showReviews && (
          <div 
            className={`mt-12 bg-dark-200 rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 ease-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <ProductReviews productId={product.id} />
          </div>
        )}
      </div>
      
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Productos Relacionados</h2>
          <Link 
            to={`/products?category=${product.category}`}
            className="text-primary-500 hover:text-primary-400 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            Ver más
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div 
              key={relatedProduct.id}
              className="bg-dark-200 rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-300/90 via-dark-300/20 to-transparent"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-medium mb-2 line-clamp-2">
                  {relatedProduct.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary-500 font-bold">
                    ${relatedProduct.price.toFixed(2)}
                  </span>
                  <Link 
                    to={`/products/${relatedProduct.id}`}
                    className="bg-dark-300 p-2 rounded-full hover:bg-primary-600 transition-colors"
                  >
                    <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.2s ease-in-out;
        }
        
        .animation-reverse {
          animation-direction: reverse;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-slideRight {
          animation: slideRight 0.7s forwards;
        }
        
        @keyframes slideRight {
          to { transform: translateX(0); }
        }
        
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default ProductDetail;