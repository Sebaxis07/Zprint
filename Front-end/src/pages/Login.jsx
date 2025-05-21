import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import zapatillaSvg from '../assets/icons/zapatilla.svg';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, isAuthenticated } = useAuth();
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Redirigir si ya está autenticado
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/profile';
    navigate(from);
    return null;
  }
  
  const validateForm = () => {
    const errors = {};
    
    if (!credentials.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!credentials.password) {
      errors.password = 'La contraseña es obligatoria';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    
    // Limpiar error al cambiar el valor
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: null });
    }
  };
  
  // BACKEND: Verificar si hay token guardado al cargar
  useEffect(() => {
    // const checkSavedToken = async () => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     try {
    //       const response = await fetch('/api/auth/verify', {
    //         headers: { 'Authorization': `Bearer ${token}` }
    //       });
    //       if (!response.ok) throw new Error();
    //       const userData = await response.json();
    //       setUser(userData);
    //     } catch {
    //       localStorage.removeItem('token');
    //     }
    //   }
    // };
    // checkSavedToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // BACKEND: Enviar credenciales al servidor
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: credentials.email,
      //     password: credentials.password,
      //     rememberMe: rememberMe
      //   })
      // });
      //
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message);
      // }
      //
      // const { token, user } = await response.json();
      // localStorage.setItem('token', token);
      // if (rememberMe) {
      //   localStorage.setItem('refreshToken', user.refreshToken);
      // }

      await login(credentials);
    } catch (err) {
      console.error('Error en login:', err);
    }
  };
  
  // BACKEND: Manejar login con redes sociales
  const handleSocialLogin = async (provider) => {
    // try {
    //   window.location.href = `/api/auth/${provider.toLowerCase()}/login`;
    // } catch (err) {
    //   console.error(`Error en login con ${provider}:`, err);
    // }
  };

  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-primary-600/30 to-blue-600/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-yellow-600/30 to-primary-600/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="backdrop-blur-xl bg-dark-200/90 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
          <div className="absolute inset-0 p-[1px] rounded-3xl bg-gradient-to-br from-primary-500/50 via-transparent to-blue-500/50">
            <div className="h-full w-full bg-dark-200 rounded-3xl" />
          </div>

          <div className="relative p-8">
            <div className="text-center mb-12 relative"> 
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-20"> 
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 blur-xl animate-pulse-slow opacity-70"></div>
                  <div className="relative w-full h-full animate-float">
                    <img 
                      src={zapatillaSvg} 
                      alt="Logo zapatilla"
                      className="w-full h-full drop-shadow-2xl"
                      style={{
                        filter: 'url(#gradient)',
                        fill: 'url(#gradient)'
                      }}
                    />
                    <svg width="0" height="0">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-16"> 
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-500 mb-2">
                  Bienvenido
                </h1>
                <p className="text-gray-400">Accede a tu cuenta para continuar</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/30 text-red-300 rounded-xl border border-red-800/50 animate-shake">
                <div className="flex">
                  <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-dark-300/50 border border-dark-400 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 group-hover:bg-dark-300/70"
                      placeholder="tucorreo@ejemplo.com"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-dark-300 border ${
                        validationErrors.password ? 'border-red-500' : 'border-dark-400'
                      } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                      placeholder="Tu contraseña"
                    />
                    <button 
                      type="button" 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.password}</p>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="h-4 w-4 bg-dark-300 border-dark-400 rounded text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                      Recordarme
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <Link to="/forgot-password" className="text-primary-500 hover:text-primary-400 font-medium">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <div className="relative px-6 py-3 bg-dark-200 rounded-xl leading-none flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                      </span>
                    </div>
                  </button>
                </div>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dark-400"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-dark-200 px-4 text-sm text-gray-400">O continúa con</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {["Google", "Facebook"].map((provider) => (
                    <button
                      key={provider}
                      className="relative group overflow-hidden rounded-xl bg-dark-300/50 hover:bg-dark-300 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative px-4 py-3 flex items-center justify-center">
                        <span className="text-white">{provider}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #ffffff0f 1px, transparent 1px),
                          linear-gradient(to bottom, #ffffff0f 1px, transparent 1px);
          background-size: 24px 24px;
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(30px, 30px) scale(1.05); }
        }

        .animate-blob {
          animation: blob 10s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        .animate-tilt {
          animation: tilt 10s infinite linear;
        }

        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(-10deg); 
          }
          25% { 
            transform: translateY(-10px) rotate(-5deg); 
          }
          75% { 
            transform: translateY(10px) rotate(-15deg); 
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

export default Login;