import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <div className="h-16"></div>
      
      <header className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-dark-300/95 backdrop-blur-md shadow-lg' : 'bg-dark-300'
      }`}>
        <nav className="border-b border-dark-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 relative group">
                  <Link to="/" className="flex items-center space-x-2">
                    <span className="font-bold text-2xl bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-primary-600 transition-all duration-300">
                      ZStore
                    </span>
                  </Link>
                  <span className="absolute -top-0.5 -right-2 h-2 w-2 rounded-full bg-primary-500 group-hover:animate-pulse"></span>
                </div>
                
                <div className="hidden md:ml-10 md:flex md:space-x-1">
                  <NavLink to="/" isActive={isActive('/')}>
                    Inicio
                  </NavLink>
                  <NavLink to="/products" isActive={isActive('/products')}>
                    Productos
                  </NavLink>
                  <NavLink to="/categories" isActive={isActive('/categories')}>
                    Categorías
                  </NavLink>
                  <NavLink to="/offers" isActive={isActive('/offers')}>
                    Ofertas
                  </NavLink>
                </div>
              </div>

              <div className="flex items-center space-x-1 md:space-x-3">
                <div className={`hidden md:block transition-all duration-300 ${searchFocused ? 'w-80' : 'w-64'}`}>
                  <div className="relative">
                    <input
                      type="search"
                      className={`w-full bg-dark-400 text-gray-300 text-sm rounded-full pl-10 pr-4 py-2 border border-dark-200 transition-all duration-300 ${
                        searchFocused 
                          ? 'focus:outline-none border-primary-500 ring-2 ring-primary-500/20' 
                          : 'focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30'
                      }`}
                      placeholder="Buscar productos..."
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                    />
                    <div className="absolute left-3 top-2.5">
                      <svg className={`h-5 w-5 transition-colors duration-300 ${
                        searchFocused ? 'text-primary-500' : 'text-gray-400'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 md:space-x-3">
                  <NavIconButton tooltip="Favoritos">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </NavIconButton>
                  
                  <NavIconButton tooltip="Carrito" badgeCount={0} to="/cart">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </NavIconButton>

                  <NavIconButton tooltip="Mi cuenta">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </NavIconButton>
                </div>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden relative group"
                  aria-label="Menu"
                >
                  <div className="relative flex overflow-hidden items-center justify-center w-8 h-8">
                    <div className={`transform transition-all duration-300 absolute ${
                      isMenuOpen 
                        ? 'rotate-45 translate-y-0' 
                        : 'rotate-0 -translate-y-1.5'
                    }`}>
                      <div className={`w-6 h-0.5 rounded bg-gray-300 group-hover:bg-primary-500 transition-colors duration-200`}></div>
                    </div>
                    
                    <div className={`transform transition-all duration-300 absolute ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}>
                      <div className={`w-6 h-0.5 rounded bg-gray-300 group-hover:bg-primary-500 transition-colors duration-200`}></div>
                    </div>
                    
                    <div className={`transform transition-all duration-300 absolute ${
                      isMenuOpen
                        ? '-rotate-45 translate-y-0'
                        : 'rotate-0 translate-y-1.5'
                    }`}>
                      <div className={`w-6 h-0.5 rounded bg-gray-300 group-hover:bg-primary-500 transition-colors duration-200`}></div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      
      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-30 md:hidden shadow-2xl">
          {/* Búsqueda móvil */}
          <div className="p-4 border-b border-dark-200/30 bg-dark-300/95 backdrop-blur-md">
            <div className="relative">
              <input
                type="search"
                className="w-full bg-dark-400 text-gray-300 text-sm rounded-full pl-10 pr-4 py-3 border border-dark-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200"
                placeholder="Buscar productos..."
              />
              <div className="absolute left-3 top-3.5">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="px-3 py-4 space-y-1 bg-gradient-to-b from-dark-400/95 to-dark-400/95 backdrop-blur-md">
            <MobileNavLink to="/" isActive={isActive('/')}>
              Inicio
            </MobileNavLink>
            <MobileNavLink to="/products" isActive={isActive('/products')}>
              Productos
            </MobileNavLink>
            <MobileNavLink to="/categories" isActive={isActive('/categories')}>
              Categorías
            </MobileNavLink>
            <MobileNavLink to="/offers" isActive={isActive('/offers')}>
              Ofertas
            </MobileNavLink>
            
            <div className="pt-2 mt-3 border-t border-dark-300/50">
              <div className="flex justify-between">
                <MobileNavLink to="/wishlist">
                  <span className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Mis favoritos
                  </span>
                </MobileNavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({ to, children, isActive }) {
  return (
    <Link 
      to={to} 
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group flex items-center space-x-1
        ${isActive ? 'text-primary-500' : 'text-gray-300 hover:text-primary-400'}`}
    >
      <span>{children}</span>
      
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transform transition-transform duration-300 ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}></span>
    </Link>
  );
}

function MobileNavLink({ to, children, isActive }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition-colors duration-200 ${
        isActive 
          ? 'bg-primary-600/20 text-primary-500 border-l-4 border-primary-500' 
          : 'text-gray-300 hover:text-primary-400 hover:bg-dark-300/50'
      }`}
    >
      {children}
    </Link>
  );
}

function NavIconButton({ children, tooltip, badgeCount, to }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const Component = to ? Link : 'button';
  const props = to ? { to } : {};
  
  return (
    <div className="relative" 
      onMouseEnter={() => setShowTooltip(true)} 
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Component
        className="relative flex items-center justify-center h-9 w-9 rounded-full bg-dark-400 hover:bg-dark-300 text-gray-300 hover:text-primary-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        {...props}
      >
        {children}
        
        {badgeCount !== undefined && (
          <span className={`absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary-600 flex items-center justify-center text-xs text-white font-semibold transition-all duration-300 ${
            badgeCount === 0 ? 'scale-75 opacity-70' : 'scale-100 opacity-100'
          }`}>
            {badgeCount}
          </span>
        )}
      </Component>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-dark-200 text-gray-300 text-xs font-medium rounded shadow-lg whitespace-nowrap z-50">
          {tooltip}
          <svg 
            className="absolute text-dark-200 h-2 w-full left-0 top-full" 
            x="0px" 
            y="0px" 
            viewBox="0 0 255 255"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
          </svg>
        </div>
      )}
    </div>
  );
}

export default Navbar;