import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // BACKEND: Verificar sesión al montar el componente
  useEffect(() => {
    // const verifySession = async () => {
    //   try {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //       setLoading(false);
    //       return;
    //     }
    //
    //     const response = await fetch('/api/auth/verify', {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
    //
    //     if (!response.ok) throw new Error('Invalid session');
    //
    //     const userData = await response.json();
    //     setUser(userData);
    //   } catch (err) {
    //     localStorage.removeItem('token');
    //     setUser(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    //
    // verifySession();

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // BACKEND: Implementar login real
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(credentials)
      // });
      //
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message);
      // }
      //
      // const { user, token } = await response.json();
      // localStorage.setItem('token', token);
      // setUser(user);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        setUser(fakeUser);
        localStorage.setItem('user', JSON.stringify(fakeUser));
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // BACKEND: Implementar registro real
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(userData)
      // });
      //
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message);
      // }
      //
      // const { user, token } = await response.json();
      // localStorage.setItem('token', token);
      // setUser(user);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(fakeUser);
      localStorage.setItem('user', JSON.stringify(fakeUser));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // BACKEND: Implementar logout real
  const logout = async () => {
    try {
      // const response = await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      //
      // if (!response.ok) {
      //   console.error('Error during logout');
      // }

      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}