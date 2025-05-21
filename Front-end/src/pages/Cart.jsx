import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../contexts/CartContext';

function Cart() {
  const { items = [], totalItems = 0, totalPrice = 0, clearCart } = useCart();
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  
  // BACKEND: Cargar carrito del usuario
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch('/api/cart', {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });
  //       if (!response.ok) throw new Error('Error loading cart');
  //       const data = await response.json();
  //       // Actualizar estado del carrito con los datos del servidor
  //     } catch (error) {
  //       setError(error.message);
  //       console.error('Error fetching cart:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //
  //   fetchCart();
  // }, []);

  // BACKEND: Función para vaciar el carrito
  const handleClearCart = async () => {
    // try {
    //   const response = await fetch('/api/cart', {
    //     method: 'DELETE',
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     }
    //   });
    //   if (!response.ok) throw new Error('Error clearing cart');
    //   clearCart(); // Actualizar estado local después de confirmar con el backend
    // } catch (error) {
    //   console.error('Error clearing cart:', error);
    // }
  };

  // BACKEND: Función para proceder al checkout
  const handleCheckout = async () => {
    // try {
    //   const response = await fetch('/api/checkout/init', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       items,
    //       totalPrice
    //     })
    //   });
    //   if (!response.ok) throw new Error('Error initiating checkout');
    //   const { checkoutUrl } = await response.json();
    //   window.location.href = checkoutUrl;
    // } catch (error) {
    //   console.error('Error starting checkout:', error);
    // }
  };

  if (!items || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-20 bg-dark-200 rounded-lg shadow-lg border border-dark-400">
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
            />
          </svg>
          <h1 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Parece que aún no has añadido ningún producto a tu carrito. ¡Explora nuestra tienda y encuentra productos increíbles!</p>
          <Link 
            to="/products" 
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors transform hover:scale-105 duration-200 shadow-lg"
          >
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-dark-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-2">Carrito de compras</h1>
        <p className="text-gray-400 mb-8">Tienes {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito</p>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <div className="bg-dark-200 rounded-lg shadow-lg overflow-hidden border border-dark-400">
              <div className="bg-dark-100 px-6 py-4 border-b border-dark-400">
                <h2 className="text-lg font-medium text-white">Productos</h2>
              </div>
              <ul className="divide-y divide-dark-400">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
              
              <div className="p-4 border-t border-dark-400 flex justify-between bg-dark-100">
                <button 
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-400 font-medium flex items-center transition-colors focus:outline-none group"
                >
                  <svg className="h-5 w-5 mr-1 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Vaciar carrito
                </button>
                <Link to="/products" className="text-primary-500 hover:text-primary-400 font-medium flex items-center transition-colors focus:outline-none">
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-dark-200 rounded-lg shadow-lg overflow-hidden border border-dark-400 sticky top-8">
              <div className="bg-dark-100 px-6 py-4 border-b border-dark-400">
                <h2 className="text-lg font-medium text-white">Resumen de la orden</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-400">Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</p>
                    <p className="font-medium text-white">${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Envío</p>
                    <p className="font-medium text-white">Calculado en el siguiente paso</p>
                  </div>
                  
                  <div className="border-t border-dark-400 pt-4 mt-4">
                    <div className="flex justify-between">
                      <p className="text-lg font-medium text-white">Total</p>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary-500">${totalPrice.toFixed(2)}</p>
                        <p className="text-xs text-gray-400 mt-1">Impuestos incluidos</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <Link
                    to="/checkout"
                    className="w-full block text-center bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors shadow-lg transform hover:translate-y-[-2px]"
                  >
                    Proceder al pago
                  </Link>
                  
                  <div className="text-center text-sm text-gray-400">
                    <p className="flex items-center justify-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Pago seguro garantizado
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;