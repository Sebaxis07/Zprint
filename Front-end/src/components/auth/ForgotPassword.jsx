import { useState } from 'react';
import { Link } from 'react-router-dom';
import zapatillaSvg from '../../assets/icons/zapatilla.svg';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email.trim()) {
      setValidationError('El email es obligatorio');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError('Email inválido');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      // BACKEND: Enviar solicitud para restablecer contraseña
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      // if (!response.ok) throw new Error('Error al enviar el correo de recuperación');
      
      setIsSubmitted(true);
    } catch (err) {
      setError('No se pudo enviar el correo de recuperación. Intente nuevamente.');
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
                  ¿Olvidaste tu contraseña?
                </h1>
                <p className="text-gray-400">Ingresa tu correo para recuperar el acceso</p>
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
            
            {isSubmitted ? (
              <div className="text-center p-6 bg-green-900/20 rounded-xl border border-green-500/20">
                <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-white mb-2">Correo enviado</h3>
                <p className="text-gray-400 mb-6">
                  Hemos enviado instrucciones para recuperar tu contraseña a <span className="text-primary-400">{email}</span>. El enlace expirará en 30 minutos.
                </p>
                <Link to="/login" className="text-primary-500 hover:text-primary-400 font-medium">
                  Volver al inicio de sesión
                </Link>
              </div>
            ) : (
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
                        value={email}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-dark-300/50 border ${
                          validationError ? 'border-red-500' : 'border-dark-400'
                        } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 group-hover:bg-dark-300/70`}
                        placeholder="tucorreo@ejemplo.com"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {validationError && (
                      <p className="mt-1 text-sm text-red-400">{validationError}</p>
                    )}
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full group"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                      <div className="relative px-6 py-3 bg-dark-200 rounded-xl leading-none flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
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