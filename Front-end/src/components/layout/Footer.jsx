import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark-200 text-gray-300 border-t border-dark-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text mb-4">
              ZStore
            </h3>
            <p className="text-gray-400 text-sm">
              Tu destino definitivo para el mejor calzado. Calidad premium, estilo único y confort garantizado.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-md font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-200">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-200">
                  Carrito
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-200">
                  Sobre nosotros
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-md font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-200">
                  Envíos
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-200">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-200">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-md font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Suscríbete para recibir ofertas exclusivas y novedades.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 bg-dark-400 text-gray-300 px-4 py-2 rounded-l-md border border-dark-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm"
              />
              <button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-md text-sm font-medium transition-colors duration-200"
              >
                Unirse
              </button>
            </form>
            
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-dark-400 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ZStore. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-200">
              Política de privacidad
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-200">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;