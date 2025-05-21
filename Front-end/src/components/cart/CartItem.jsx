import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

function CartItem({item}){
    const { updateQuantity, removeFromCart } = useCart();
    const [quantity, setQuantity] = useState(item.quantity);
    // const [isUpdating, setIsUpdating] = useState(false);

    // BACKEND: Obtener precio actual del producto
    // useEffect(() => {
    //   const fetchCurrentPrice = async () => {
    //     try {
    //       const response = await fetch(`/api/products/${item.id}/price`);
    //       const data = await response.json();
    //       setPrice(data.price);
    //       setDiscount(data.discount_percentage);
    //     } catch (error) {
    //       console.error('Error fetching price:', error);
    //     }
    //   };
    //   fetchCurrentPrice();
    // }, [item.id]);

    const price = item.discount_percentage > 0
        ? item.price * (1-item.discount_percentage /100)
        : item.price;

    const subtotal = price * item.quantity;

    const handleQuantityChange = async (e) => {
        const newQuantity = parseInt(e.target.value);
        // BACKEND: Actualizar cantidad en el servidor
        // try {
        //   setIsUpdating(true);
        //   const response = await fetch(`/api/cart/${item.id}`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ quantity: newQuantity })
        //   });
        //   if (!response.ok) throw new Error('Error updating quantity');
        //   setQuantity(newQuantity);
        //   updateQuantity(item.id, newQuantity);
        // } catch (error) {
        //   console.error('Error:', error);
        // } finally {
        //   setIsUpdating(false);
        // }
        setQuantity(newQuantity);
        updateQuantity(item.id, newQuantity);
    };

    const handleIncrement = async () => {
        // BACKEND: Incrementar cantidad en el servidor
        // try {
        //   setIsUpdating(true);
        //   const response = await fetch(`/api/cart/${item.id}/increment`, {
        //     method: 'POST'
        //   });
        //   if (!response.ok) throw new Error('Error incrementing quantity');
        //   const newQuantity = quantity + 1;
        //   setQuantity(newQuantity);
        //   updateQuantity(item.id, newQuantity);
        // } catch (error) {
        //   console.error('Error:', error);
        // } finally {
        //   setIsUpdating(false);
        // }
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(item.id, newQuantity);
    };

    const handleDecrement = async () => {
        if (quantity > 1) {
            // BACKEND: Decrementar cantidad en el servidor
            // try {
            //   setIsUpdating(true);
            //   const response = await fetch(`/api/cart/${item.id}/decrement`, {
            //     method: 'POST'
            //   });
            //   if (!response.ok) throw new Error('Error decrementing quantity');
            //   const newQuantity = quantity - 1;
            //   setQuantity(newQuantity);
            //   updateQuantity(item.id, newQuantity);
            // } catch (error) {
            //   console.error('Error:', error);
            // } finally {
            //   setIsUpdating(false);
            // }
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantity(item.id, newQuantity);
        }
    };
    return (
    <li 
      className="p-4 sm:py-6 sm:px-6 border-b border-dark-400 last:border-b-0 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent' }}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="flex-shrink-0 w-24 h-24 bg-dark-400 rounded-md overflow-hidden mr-4 border border-dark-400 group-hover:border-primary-500 transition-all">
          <img
            src={item.image || '/placeholder.jpg'}
            alt={item.name}
            className="w-full h-full object-center object-cover"
          />
        </div>
        
        <div className="flex-1 flex flex-col mt-4 sm:mt-0">
          <div className="flex justify-between">
            <div>
              <h3 className="text-sm font-medium text-white group-hover:text-primary-500">
                <Link to={`/products/${item.id}`} className="hover:text-primary-400 transition-colors">
                  {item.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-400">{item.brand}</p>
            </div>
            <p className="text-sm font-medium text-primary-500">
              ${price.toFixed(2)}
            </p>
          </div>
          
          <div className="flex-1 flex items-end justify-between mt-4">
            <div className="flex items-center border border-dark-400 rounded-md bg-dark-300">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-primary-500 focus:outline-none transition-colors"
                onClick={handleDecrement}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-12 text-center border-transparent bg-dark-300 text-white focus:border-primary-500 focus:ring-primary-500 focus:outline-none"
              />
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-primary-500 focus:outline-none transition-colors"
                onClick={handleIncrement}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center">
              <p className="text-sm font-medium text-white mr-4">
                ${subtotal.toFixed(2)}
              </p>
              <button
                type="button"
                className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
                onClick={() => removeFromCart(item.id)}
                aria-label="Eliminar producto"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;



