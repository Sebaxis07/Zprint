import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import zapatillaSvg from '../assets/icons/zapatilla.svg';

function Register() {
  const navigate = useNavigate();
  const { register, loading, error, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    phone: '',
    date: '', 
    password: '',
    confirmPassword: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Redirigir si ya está autenticado
  if (isAuthenticated) {
    navigate('/profile');
    return null;
  }
  
  // BACKEND: Verificar email disponible
  const checkEmailAvailability = async (email) => {
    // try {
    //   const response = await fetch(`/api/auth/check-email?email=${email}`);
    //   const data = await response.json();
    //   return data.available;
    // } catch (err) {
    //   console.error('Error checking email:', err);
    //   return true; // Assume available on error
    // }
  };

  const validateForm = async () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.last_name.trim()) {
      errors.last_name = 'El apellido es obligatorio';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio';
    } else if (!/^\+?[0-9]{8,}$/.test(formData.phone)) {
      errors.phone = 'Número de teléfono inválido';
    }
    
    if (!formData.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (!agreedToTerms) {
      errors.terms = 'Debes aceptar los términos y condiciones';
    }
    
    if (!formData.date) {
      errors.date = 'La fecha de cumpleaños es obligatoria';
    } else {
      const birthDate = new Date(formData.date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        errors.date = 'Debes tener al menos 13 años para registrarte';
      }
    }
    
    // BACKEND: Verificar email no registrado
    // if (!errors.email) {
    //   const isAvailable = await checkEmailAvailability(formData.email);
    //   if (!isAvailable) {
    //     errors.email = 'Este email ya está registrado';
    //   }
    // }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpiar error al cambiar el valor
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: null });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!await validateForm()) return;
    
    try {
      // BACKEND: Enviar datos de registro
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     password: formData.password
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

      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      // La redirección se hará automáticamente cuando isAuthenticated cambie
    } catch (err) {
      console.error('Error en registro:', err);
      setError(err.message);
    }
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
                  Crear cuenta
                </h1>
                <p className="text-gray-400">Únete a nuestra tienda y descubre ofertas exclusivas</p>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Nombre
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-dark-300/50 border border-dark-400 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 group-hover:bg-dark-300/70"
                        placeholder="Tu nombre"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {validationErrors.name && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.name}</p>
                    )}
                  </div>

                  <div className="group">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-300 mb-1">
                      Apellido
                    </label>
                    <div className="relative">
                      <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-dark-300/50 border border-dark-400 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 group-hover:bg-dark-300/70"
                        placeholder="Tu apellido"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {validationErrors.last_name && (
                      <p className="mt-1 text-sm text-red-400">{validationErrors.last_name}</p>
                    )}
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-dark-300/50 border border-dark-400 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 group-hover:bg-dark-300/70"
                      placeholder="tucorreo@ejemplo.com"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                  )}
                </div>

                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Teléfono
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-dark-300/50 border border-dark-400 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 group-hover:bg-dark-300/70"
                      placeholder="+56912345678"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.phone}</p>
                  )}
                </div>

                <div className="group">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                    Fecha de cumpleaños
                  </label>
                  <div className="relative">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]} // Prevenir fechas futuras
                      className="w-full px-5 py-4 bg-dark-300/50 border border-dark-400 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 group-hover:bg-dark-300/70"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {validationErrors.date && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.date}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-dark-300 border ${
                        validationErrors.password ? 'border-red-500' : 'border-dark-400'
                      } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                      placeholder="Mínimo 6 caracteres"
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
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirmar contraseña</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-300 border ${
                      validationErrors.confirmPassword ? 'border-red-500' : 'border-dark-400'
                    } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                    placeholder="Repite tu contraseña"
                  />
                  {validationErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.confirmPassword}</p>
                  )}
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                    className="mt-1 h-4 w-4 bg-dark-300 border-dark-400 rounded text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    Acepto los <Link to="/terms" className="text-primary-500 hover:text-primary-400">términos y condiciones</Link> y la <Link to="/privacy" className="text-primary-500 hover:text-primary-400">política de privacidad</Link>.
                  </label>
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
                        {loading ? "Creando cuenta..." : "Crear cuenta"}
                      </span>
                    </div>
                  </button>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-gray-400">
                    ¿Ya tienes una cuenta? <Link to="/login" className="text-primary-500 hover:text-primary-400 font-medium">Iniciar sesión</Link>
                  </p>
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
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

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-tilt {
          animation: tilt 10s infinite linear;
        }

        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}

export default Register;