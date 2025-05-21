import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import zapatillaSvg from '../../assets/icons/zapatilla.svg';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenValid, setTokenValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // BACKEND: Verificar si el token es válido y no ha expirado
        // const response = await fetch(`/api/auth/verify-token/${token}`);
        // const data = await response.json();
        
        // if (!response.ok) throw new Error(data.message || 'Token inválido');
        
        // setTokenValid(data.valid);
        // if (data.expiresIn) {
        //   setTimeLeft(Math.floor(data.expiresIn / 60)); // Convertir a minutos
        // }
      } catch (err) {
        setTokenValid(false);
        setErrorMessage('El enlace ha expirado o es inválido. Solicita uno nuevo.');
      }
    };

    if (token) {
      verifyToken();
    } else {
      setTokenValid(false);
      setErrorMessage('No se encontró ningún token. Solicita un nuevo enlace.');
    }
  }, [token]);

  const validateForm = () => {
    const errors = {};
    
    if (!passwords.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (passwords.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (passwords.password !== passwords.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    
    // Limpiar error al cambiar el valor
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || !tokenValid) return;
    
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // BACKEND: Enviar solicitud para restablecer contraseña
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     token,
      //     password: passwords.password 
      //   })
      // });
      
      // if (!response.ok) {
      //   const data = await response.json();
      //   throw new Error(data.message || 'Error al restablecer la contraseña');
      // }
      
      setResetSuccess(true);
      
      // Redirigir a login después de 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      setErrorMessage(err.message || 'No se pudo restablecer la contraseña. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
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
                  Restablecer contraseña
                </h1>
                <p className="text-gray-400">Crea una nueva contraseña para tu cuenta</p>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-900/30 text-red-300 rounded-xl border border-red-800/50 animate-shake">
                <div className="flex">
                  <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}
            
            {!tokenValid && (
              <div className="text-center p-6">
                <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <Link to="/forgot-password" className="mt-4 inline-block px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                  Solicitar nuevo enlace
                </Link>
              </div>
            )}
            
            {timeLeft && tokenValid && (
              <div className="mb-4 p-3 bg-yellow-900/20 text-yellow-300 rounded-xl border border-yellow-800/50 text-sm text-center">
                Este enlace expirará en {timeLeft} minutos
              </div>
            )}
            
            {resetSuccess ? (
              <div className="text-center p-6 bg-green-900/20 rounded-xl border border-green-500/20">
                <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-white mb-2">¡Contraseña actualizada!</h3>
                <p className="text-gray-400 mb-6">
                  Tu contraseña ha sido restablecida correctamente. Serás redirigido al inicio de sesión en unos segundos...
                </p>
                <Link to="/login" className="text-primary-500 hover:text-primary-400 font-medium">
                  Ir al inicio de sesión
                </Link>
              </div>
            ) : (
              tokenValid && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Nueva contraseña</label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={passwords.password}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-dark-300 border ${
                            validationErrors.password ? 'border-red-500' : 'border-dark-400'
                          } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                          placeholder="Nueva contraseña"
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
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={passwords.confirmPassword}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-dark-300 border ${
                            validationErrors.confirmPassword ? 'border-red-500' : 'border-dark-400'
                          } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                          placeholder="Confirmar contraseña"
                        />
                      </div>
                      {validationErrors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-400">{validationErrors.confirmPassword}</p>
                      )}
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full group"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="relative px-6 py-3 bg-dark-200 rounded-xl leading-none flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
                          </span>
                        </div>
                      </button>
                    </div>
                    
                    <div className="text-center mt-6">
                      <Link to="/login" className="text-primary-500 hover:text-primary-400 font-medium">
                        Volver al inicio de sesión
                      </Link>
                    </div>
                  </div>
                </form>
              )
            )}
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}