import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, setIsAuthenticated, setLoading } = useAuth();
  const location = useLocation();

  // BACKEND: Verificar token y sesión
  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     try {
  //       const response = await fetch('/api/auth/verify', {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });
  //       
  //       if (!response.ok) {
  //         throw new Error('Token inválido');
  //       }
  //       
  //       const data = await response.json();
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       console.error('Error verificando autenticación:', error);
  //       setIsAuthenticated(false);
  //       localStorage.removeItem('token');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   verifyAuth();
  // }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-300 flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-t-4 border-b-4 border-primary-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-4 border-l-4 border-primary-300 rounded-full animate-spin animation-reverse"></div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

export default ProtectedRoute;