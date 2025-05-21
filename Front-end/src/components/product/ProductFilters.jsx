import { useState } from 'react';
import { categories, brands } from '../../data/fakeProducts';

function ProductFilters({ onFilterChange }) {
  // TODO: Implementar llamadas al backend:
  // GET /api/filters
  // - Obtener filtros disponibles
  // - Rangos de precios
  // - Marcas activas
  // - Categorías con contador
  
  // GET /api/products/filter
  // - Filtrar productos
  // - Paginación
  // - Ordenamiento
  
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    price: { min: '', max: '' },
    onSale: false
  });

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    let updatedCategories = [...filters.category];
    
    if (checked) {
      updatedCategories.push(value);
    } else {
      updatedCategories = updatedCategories.filter(cat => cat !== value);
    }
    
    const updatedFilters = {
      ...filters,
      category: updatedCategories
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    let updatedBrands = [...filters.brand];
    
    if (checked) {
      updatedBrands.push(value);
    } else {
      updatedBrands = updatedBrands.filter(b => b !== value);
    }
    
    const updatedFilters = {
      ...filters,
      brand: updatedBrands
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      price: {
        ...filters.price,
        [name]: value
      }
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleOnSaleChange = (e) => {
    const updatedFilters = {
      ...filters,
      onSale: e.target.checked
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      category: [],
      brand: [],
      price: { min: '', max: '' },
      onSale: false
    };
    
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-dark-200 p-6 rounded-xl border border-dark-400 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text">
          Filtros
        </h2>
        <button 
          onClick={handleReset}
          className="px-4 py-2 text-sm bg-dark-300 text-primary-500 rounded-full hover:bg-dark-400 transition-all duration-300 border border-primary-500/20 hover:border-primary-500"
        >
          Resetear filtros
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-white font-medium mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Categorías
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map(category => (
            <div 
              key={category.id} 
              className={`
                flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300
                ${filters.category.includes(category.name) 
                  ? 'bg-primary-600/20 border-primary-500' 
                  : 'bg-dark-300 hover:bg-dark-400'} 
                border
              `}
              onClick={() => handleCategoryChange({
                target: {
                  value: category.name,
                  checked: !filters.category.includes(category.name)
                }
              })}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={filters.category.includes(category.name)}
                readOnly
              />
              <span className={`text-sm ${filters.category.includes(category.name) ? 'text-primary-500' : 'text-gray-300'}`}>
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      

      <div className="mb-8">
        <h3 className="text-white font-medium mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Rango de Precio
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              placeholder="Min"
              className="w-full bg-dark-300 border border-dark-400 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              value={filters.price.min}
              onChange={(e) => handlePriceChange({ target: { name: 'min', value: e.target.value } })}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Max"
              className="w-full bg-dark-300 border border-dark-400 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              value={filters.price.max}
              onChange={(e) => handlePriceChange({ target: { name: 'max', value: e.target.value } })}
            />
          </div>
        </div>
      </div>
      

      <div className="mb-8">
        <h3 className="text-white font-medium mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Marcas
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
          {brands.map(brand => (
            <div 
              key={brand.id}
              className={`
                flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300
                ${filters.brand.includes(brand.name) 
                  ? 'bg-primary-600/20 border-primary-500' 
                  : 'bg-dark-300 hover:bg-dark-400'}
                border
              `}
              onClick={() => handleBrandChange({
                target: {
                  value: brand.name,
                  checked: !filters.brand.includes(brand.name)
                }
              })}
            >
              <span className={`text-sm ${filters.brand.includes(brand.name) ? 'text-primary-500' : 'text-gray-300'}`}>
                {brand.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      

      <div 
        className={`
          p-4 rounded-lg cursor-pointer transition-all duration-300
          ${filters.onSale ? 'bg-primary-600/20 border-primary-500' : 'bg-dark-300 hover:bg-dark-400'}
          border flex items-center justify-between
        `}
        onClick={() => handleOnSaleChange({ target: { checked: !filters.onSale } })}
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
          <span className={`text-sm ${filters.onSale ? 'text-primary-500' : 'text-gray-300'}`}>
            En oferta
          </span>
        </div>
        <div className={`w-4 h-4 rounded-full border ${filters.onSale ? 'bg-primary-500 border-primary-500' : 'border-gray-400'}`}>
          {filters.onSale && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;