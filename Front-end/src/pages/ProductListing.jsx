import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import ProductSort from '../components/product/ProductSort';
import { fakeProducts } from '../data/fakeProducts';

function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const initialCategory = searchParams.get('category') || '';
  
  useEffect(() => {
    // Usar fetch para el real api
    setIsLoading(true);
    
    // TODO: Replace with API call
    // GET /api/products?category=${initialCategory}
    setTimeout(() => {
      let productsData = [...fakeProducts];
      
      if (initialCategory) {
        productsData = productsData.filter(product => product.category === initialCategory);
      }
      
      setProducts(productsData);
      setFilteredProducts(productsData);
      setIsLoading(false);
    }, 500);
  }, [initialCategory]);
  
  const handleFilterChange = (filters) => {
    let filteredData = [...products];
    
    if (filters.category.length > 0) {
      filteredData = filteredData.filter(product => 
        filters.category.includes(product.category)
      );
    }
    
    if (filters.brand.length > 0) {
      filteredData = filteredData.filter(product => 
        filters.brand.includes(product.brand.toLowerCase())
      );
    }
    
    if (filters.price.min) {
      filteredData = filteredData.filter(product => 
        product.price >= Number(filters.price.min)
      );
    }
    
    if (filters.price.max) {
      filteredData = filteredData.filter(product => 
        product.price <= Number(filters.price.max)
      );
    }
    
    if (filters.onSale) {
      filteredData = filteredData.filter(product => product.discount > 0);
    }
    
    setFilteredProducts(filteredData);
  };
  
  const handleSortChange = (sortOption) => {
    let sortedProducts = [...filteredProducts];
    
    switch (sortOption) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        sortedProducts.sort((a, b) => b.isFeatured - a.isFeatured);
        break;
    }
    
    setFilteredProducts(sortedProducts);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-dark-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-dark-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Catálogo de productos</h1>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          <div className="hidden lg:block lg:col-span-1">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>
          
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex-grow flex items-center">
                <span className="text-gray-400 mr-2">
                  {filteredProducts.length} productos
                </span>
                <button 
                  type="button"
                  className="lg:hidden text-primary-500 font-medium"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  Filtros
                </button>
              </div>
              <ProductSort onSortChange={handleSortChange} />
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-white mb-2">No se encontraron productos</h3>
                <p className="text-gray-400">Intenta con otros filtros</p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
      
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)}></div>
          <div className="relative h-full w-80 max-w-xs bg-white p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
              <button 
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductListing;