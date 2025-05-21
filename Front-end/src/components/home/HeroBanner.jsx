import { Link } from 'react-router-dom';

function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-dark-300 py-20 sm:py-24 md:py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-400 to-dark-200"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/images/pattern.svg')] opacity-5"></div>
      </div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary-600/10 rounded-full filter blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block text-primary-500 text-sm font-semibold tracking-wider uppercase mb-4">
            Nueva Colección 2025
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Encuentra tu estilo perfecto
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Descubre nuestra exclusiva colección de zapatillas premium con los mejores descuentos.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-600/20"
            >
              Explorar colección
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              to="/products?category=new" 
              className="inline-flex items-center justify-center bg-dark-200 hover:bg-dark-100 text-white px-8 py-3 rounded-full font-medium border border-primary-500/20 hover:border-primary-500 transition-all duration-300"
            >
              Ver novedades
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-8 sm:h-12 fill-dark-200" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </div>
  );
}

export default HeroBanner;