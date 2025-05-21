import { Link } from 'react-router-dom';
import { categories } from '../../data/fakeProducts';

const categoryImages = {
  running: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3",
  basketball: "https://images.unsplash.com/photo-1579338908476-3a3a1d71a706?ixlib=rb-4.0.3",
  casual: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-4.0.3",
  skateboarding: "https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?ixlib=rb-4.0.3"
};

function CategoryCards() {
  // TODO: Implementar llamadas al backend:
  // GET /api/categories
  // - Listado de categorías
  // - Imágenes
  // - Contadores
  // - Metadata
  return (
    <section className="py-16 bg-dark-300 relative">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-600/5 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-primary-500 text-sm font-semibold tracking-wider uppercase mb-2">
            Explora por categoría
          </span>
          <h2 className="text-3xl font-bold text-white mb-4">
            Categorías populares
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Encuentra el calzado perfecto para cada ocasión en nuestras colecciones especializadas
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.name}`}
              className="group relative rounded-lg overflow-hidden h-80 bg-dark-200 border border-dark-400 hover:border-primary-600 transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={categoryImages[category.name]}
                alt={category.label}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2">{category.label}</h3>
                <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Explora nuestra colección de {category.label.toLowerCase()}
                </p>
                <span className="inline-flex items-center text-primary-500 text-sm font-medium">
                  Ver productos
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryCards;