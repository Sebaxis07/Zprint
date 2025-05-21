import { useState } from 'react';

function ProductSort({ onSortChange }) {
  // TODO: Implementar llamadas al backend:
  // GET /api/products/sort
  // - Opciones de ordenamiento
  // - Validar parámetros
  // - Aplicar orden en query
  
  const [sortOption, setSortOption] = useState('featured');
  
  const handleChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    onSortChange(option);
  };
  
  return (
    <div className="relative flex items-center space-x-3">
      <label htmlFor="sort" className="text-sm font-medium text-gray-300">
        Ordenar por:
      </label>
      <div className="relative">
        <select
          id="sort"
          name="sort"
          className="appearance-none bg-dark-200 text-gray-300 pl-4 pr-10 py-2.5 border-2 border-dark-400 rounded-lg cursor-pointer
            hover:border-primary-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none
            transition-all duration-200 text-sm font-medium min-w-[200px]
            bg-[length:16px] bg-[calc(100%-12px)_center] bg-no-repeat"
          value={sortOption}
          onChange={handleChange}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FF4444'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`
          }}
        >
          <option value="featured" className="bg-dark-300 text-gray-300">
            ★ Destacados
          </option>
          <option value="newest" className="bg-dark-300 text-gray-300">
            📅 Más recientes
          </option>
          <option value="price-low" className="bg-dark-300 text-gray-300">
            💰 Precio: Menor a Mayor
          </option>
          <option value="price-high" className="bg-dark-300 text-gray-300">
            💰 Precio: Mayor a Menor
          </option>
          <option value="rating" className="bg-dark-300 text-gray-300">
            ⭐ Mejor valorados
          </option>
        </select>

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        <div className="absolute inset-0 -z-10 rounded-lg bg-primary-500/5 blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
      </div>
    </div>
  );
}

export default ProductSort;