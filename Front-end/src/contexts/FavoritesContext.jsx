import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  
  // Cargar favoritos guardados al iniciar
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);
  
  // Guardar favoritos cuando cambien
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Cuando tengas backend:
  // useEffect(() => {
  //   const fetchFavorites = async () => {
  //     if (isAuthenticated) {
  //       try {
  //         const response = await userService.getFavorites();
  //         setFavorites(response.data);
  //       } catch (error) {
  //         console.error('Error fetching favorites:', error);
  //       }
  //     }
  //   };
  //   
  //   fetchFavorites();
  // }, [isAuthenticated]);
  
  const addToFavorites = (product) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.some(item => item.id === product.id)) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
    
    // Cuando tengas backend:
    // if (isAuthenticated) {
    //   userService.addToFavorites(product.id);
    // }
  };
  
  const removeFromFavorite = (productId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(item => item.id !== productId)
    );
    
    // Cuando tengas backend:
    // if (isAuthenticated) {
    //   userService.removeFromFavorites(productId);
    // }
  };
  
  const clearFavorites = () => {
    setFavorites([]);
    
    // Cuando tengas backend:
    // if (isAuthenticated) {
    //   userService.clearFavorites();
    // }
  };
  
  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };
  
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorite,
    clearFavorites,
    isFavorite,
    totalFavorites: favorites.length
  };
  
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
  }
  
  return context;
}