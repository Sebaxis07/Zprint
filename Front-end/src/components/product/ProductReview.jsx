import { useState, useEffect } from 'react';
import StarRating from '../ui/StarRating';

// Datos de ejemplo - SOLO PARA DESARROLLO
// BAIRON: Reemplazar con llamada a API
const fakeReviews = [
  {
    id: 1,
    user: "Carlos M.",
    rating: 5,
    title: "¡Excelente calidad!",
    comment: "Las zapatillas tienen una calidad excepcional. Muy cómodas desde el primer día y el diseño es espectacular. Totalmente recomendadas.",
    date: "2023-03-15",
    helpful: 24,
    verified: true
  },
  {
    id: 2,
    user: "Laura P.",
    rating: 4,
    title: "Buena compra pero talla pequeña",
    comment: "La calidad es muy buena pero recomendaría pedir una talla más grande de lo normal. Por lo demás, excelentes zapatillas.",
    date: "2023-02-28",
    helpful: 17,
    verified: true
  },
  {
    id: 3,
    user: "Miguel A.",
    rating: 3,
    title: "Diseño genial pero algo incómodas",
    comment: "El diseño es espectacular pero necesitan un periodo de adaptación, los primeros días pueden ser incómodas.",
    date: "2023-01-10",
    helpful: 9,
    verified: false
  },
  {
    id: 4,
    user: "Ana S.",
    rating: 5,
    title: "¡Las mejores zapatillas que he tenido!",
    comment: "Increíble comodidad y estilo. Las he usado tanto para salir como para hacer deporte y son perfectas. El envío fue muy rápido también.",
    date: "2023-04-05",
    helpful: 31,
    verified: true
  },
  {
    id: 5,
    user: "David R.",
    rating: 2,
    title: "Decepcionado con la durabilidad",
    comment: "El aspecto es bueno pero después de un mes ya están mostrando signos de desgaste. Esperaba más durabilidad por este precio.",
    date: "2023-03-22",
    helpful: 15,
    verified: true
  }
];

function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
  
  useEffect(() => {
    // BAIRON: Reemplazar con llamada a API
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Aquí deberías hacer la llamada a la API
        // const data = await productService.getProductReviews(productId);
        // setReviews(data);
        
        // Simular carga desde la API
        setTimeout(() => {
          setReviews(fakeReviews);
          
          // Calcular rating promedio
          const avg = fakeReviews.reduce((sum, review) => sum + review.rating, 0) / fakeReviews.length;
          setAverageRating(avg);
          
          // Contar ratings por estrellas
          const counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
          fakeReviews.forEach(review => {
            counts[review.rating] = (counts[review.rating] || 0) + 1;
          });
          setRatingCounts(counts);
          
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error al cargar reseñas:', err);
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [productId]);
  
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(filter));
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  
  const markHelpful = (reviewId) => {
    // BAIRON: Implementar llamada a API para marcar como útil
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 } 
        : review
    ));
  };
  
  if (loading) {
    return (
      <div className="border-t border-dark-400 p-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="border-t border-dark-400 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Reseñas de Clientes</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Resumen de valoraciones */}
        <div className="lg:col-span-1 bg-dark-100 rounded-lg p-5 border border-dark-400">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</h3>
            <div className="flex justify-center my-2">
              <StarRating rating={averageRating} size="large" />
            </div>
            <p className="text-gray-400">{reviews.length} valoraciones</p>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(star => {
              const count = ratingCounts[star] || 0;
              const percentage = (reviews.length > 0) ? (count / reviews.length) * 100 : 0;
              
              return (
                <div key={star} className="flex items-center">
                  <button 
                    className={`flex items-center hover:bg-dark-300 px-2 py-1 rounded ${filter === star.toString() ? 'bg-dark-300' : ''}`}
                    onClick={() => handleFilterChange(star.toString())}
                  >
                    <span className="text-gray-400 w-5">{star}</span>
                    <svg className="h-4 w-4 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                  <div className="flex-1 ml-4">
                    <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-600"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-2 text-gray-400 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4">
            <button 
              className={`w-full text-center py-2 px-4 rounded-md transition-colors ${
                filter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-dark-300 text-gray-200 hover:bg-dark-400'
              }`}
              onClick={() => handleFilterChange('all')}
            >
              Ver todas las reseñas
            </button>
          </div>
        </div>
        
        {/* Lista de reseñas */}
        <div className="lg:col-span-2">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No hay reseñas con esta valoración</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {filteredReviews.map(review => (
                <li key={review.id} className="bg-dark-100 rounded-lg p-5 border border-dark-400 hover:border-dark-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-white">{review.title}</h4>
                      <div className="flex items-center mt-1">
                        <StarRating rating={review.rating} />
                        {review.verified && (
                          <span className="ml-2 text-green-500 text-xs uppercase font-semibold flex items-center">
                            <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Compra verificada
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">{review.date}</span>
                  </div>
                  
                  <div className="mt-1 mb-3">
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <span className="font-medium">Por {review.user}</span>
                    </div>
                    <button 
                      className="flex items-center text-gray-400 hover:text-primary-500 transition-colors"
                      onClick={() => markHelpful(review.id)}
                    >
                      <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>Útil ({review.helpful})</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;