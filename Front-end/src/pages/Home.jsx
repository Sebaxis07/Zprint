import { useState, useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryCards from '../components/home/CategoryCards';
import { fakeProducts } from '../data/fakeProducts';

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      setProducts(fakeProducts);
      setIsLoading(false);
    }, 500);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-dark-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-dark-300">
      <HeroBanner />
      <FeaturedProducts products={products} />
      <CategoryCards />
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-200 rounded-lg overflow-hidden border border-dark-400 hover:border-primary-600 transition-colors duration-300">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="text-sm text-primary-500 font-semibold mb-2">OFERTA ESPECIAL</div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-primary-500 transition-colors">
                  Hasta 40% de descuento en zapatillas de running
                </h2>
                <p className="text-gray-400 mb-6">
                  No dejes pasar esta oportunidad. Aprovecha las ofertas por tiempo limitado en nuestra colección exclusiva.
                </p>
                <div>
                  <button className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-600/20">
                    Ver ofertas
                  </button>
                </div>
              </div>
              <div className="h-64 md:h-auto relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                <img 
                  src="https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" 
                  alt="Zapatillas de running" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;