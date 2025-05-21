import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';

// TODO: Reemplazar con llamada a la API
// GET /api/products/featured
// O: GET /api/products?destacado=true&limite=4
// Debería retornar:
// - Solo productos destacados
// - Máximo 4 productos
// - Ordenados por relevancia
// - Incluir toda la información necesaria (imágenes, precios, descuentos, etc.)

function FeaturedProducts({ products }) {
  // TODO: Esta lógica debería estar en el backend
  // El filtrado y límite debería aplicarse en la consulta de bases de datos
  // para mejor rendimiento y menor uso de memoria
  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 4);
  
  return (
    <section className="py-16 bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-primary-500 text-sm font-semibold tracking-wider uppercase mb-2 block">
              Lo más destacado
            </span>
            <h2 className="text-3xl font-bold text-white">
              Productos destacados
            </h2>
          </div>
          <Link 
            to="/products" 
            className="group flex items-center space-x-2 text-primary-500 hover:text-primary-400 font-medium transition-colors duration-200"
          >
            <span>Ver todos</span>
            <span 
              className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <div 
              key={product.id} 
              className="transform hover:-translate-y-2 transition-transform duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

export default FeaturedProducts;