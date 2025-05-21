import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
    }
  };
  /*
BACKEND:

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Verificar estado de autenticación
app.get('/api/auth/check', authMiddleware, async (req, res) => {
  return res.json({ 
    isAuthenticated: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      role: req.user.role
    }
  });
});

// Obtener contadores (carrito y favoritos)
app.get('/api/user/counters', authMiddleware, async (req, res) => {
  try {
    const cartCount = await db.query(
      'SELECT COUNT(*) FROM cart WHERE user_id = $1',
      [req.user.id]
    );
    const wishlistCount = await db.query(
      'SELECT COUNT(*) FROM wishlist WHERE user_id = $1',
      [req.user.id]  
    );
    return res.json({
      cart: cartCount.rows[0].count,
      wishlist: wishlistCount.rows[0].count
    });
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener contadores' });
  }
});
*/
  
  return (
    <>
      <div className="h-16"></div>
      
      <header className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-300/90 backdrop-blur-md shadow-xl border-b border-primary-500/10' 
          : 'bg-dark-300'
      }`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-700 via-primary-500 to-primary-700 opacity-80"></div>
        
        <nav>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 relative group">
                  <Link to="/" className="flex items-center space-x-2">
                    <div className="relative overflow-hidden">
                      <span className="font-bold text-2xl bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-primary-600 transition-all duration-500">
                        ZStore
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 transform translate-x-0 group-hover:translate-x-full transition-transform duration-700"></span>
                    </div>
                  </Link>
                  <span className="absolute -top-0.5 -right-2 h-2 w-2 rounded-full bg-primary-500 group-hover:animate-ping"></span>
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

              <div className="flex items-center space-x-1 md:space-x-4">
                <div className={`hidden md:block transition-all duration-300 ${searchFocused ? 'w-80' : 'w-64'}`}>
                  <div className="relative group">
                    <input
                      type="search"
                      className={`w-full bg-dark-400/80 text-gray-300 text-sm rounded-full pl-10 pr-4 py-2 border-2 transition-all duration-300 ${
                        searchFocused 
                          ? 'border-primary-500/70 ring-2 ring-primary-500/20' 
                          : 'border-dark-200/50 focus:outline-none focus:border-primary-500/70 focus:ring-2 focus:ring-primary-500/20'
                      }`}
                      placeholder="Buscar productos..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={handleSearch}
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
                    <div className={`absolute inset-y-0 right-0 flex items-center pr-3 transition-opacity duration-300 ${searchValue ? 'opacity-100' : 'opacity-0'}`}>
                      <button 
                        onClick={() => setSearchValue('')}
                        className="text-gray-400 hover:text-primary-500 focus:outline-none"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 md:space-x-3">
                  <NavIconButton tooltip="Favoritos">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </NavIconButton>
                  
                  <NavIconButton tooltip="Carrito" badgeCount={3} to="/cart">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </NavIconButton>

                  <NavIconButton tooltip="Mi cuenta">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </NavIconButton>
                </div>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden relative group"
                  aria-label="Menu"
                >
                  <div className="relative flex overflow-hidden items-center justify-center w-10 h-10 rounded-lg bg-dark-400/50 hover:bg-dark-300">
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
          <div className="p-4 border-b border-dark-200/30 bg-dark-300/95 backdrop-blur-md">
            <div className="relative">
              <input
                type="search"
                className="w-full bg-dark-400/90 text-gray-300 text-sm rounded-full pl-10 pr-4 py-3 border-2 border-dark-200/50 focus:outline-none focus:border-primary-500/70 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                placeholder="Buscar productos..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
              />
              <div className="absolute left-3 top-3.5">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className={`absolute inset-y-0 right-0 flex items-center pr-3 transition-opacity duration-300 ${searchValue ? 'opacity-100' : 'opacity-0'}`}>
                <button 
                  onClick={() => setSearchValue('')}
                  className="text-gray-400 hover:text-primary-500 focus:outline-none"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-3 py-4 space-y-1 bg-gradient-to-b from-dark-400/95 to-dark-500/95 backdrop-blur-md">
            <MobileNavLink to="/" isActive={isActive('/')}>
              <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </MobileNavLink>
            <MobileNavLink to="/products" isActive={isActive('/products')}>
              <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Productos
            </MobileNavLink>
            <MobileNavLink to="/categories" isActive={isActive('/categories')}>
              <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Categorías
            </MobileNavLink>
            <MobileNavLink to="/offers" isActive={isActive('/offers')}>
              <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              Ofertas
            </MobileNavLink>
            
            <div className="pt-3 mt-3 border-t border-dark-300/50">
              <div className="flex flex-col space-y-1">
                <MobileNavLink to="/wishlist">
                  <span className="flex items-center">
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Mis favoritos
                  </span>
                </MobileNavLink>
                
                <MobileNavLink to="/cart">
                  <span className="flex items-center">
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Mi carrito
                    <span className="ml-2 h-5 min-w-5 px-1 rounded-full bg-primary-600 flex items-center justify-center text-xs text-white font-semibold">
                      3
                    </span>
                  </span>
                </MobileNavLink>
                
                <MobileNavLink to="/account">
                  <span className="flex items-center">
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mi cuenta
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
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 group flex items-center space-x-1
        ${isActive ? 'text-primary-500' : 'text-gray-300 hover:text-primary-400'}`}
    >
      <span>{children}</span>
      
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 transform transition-all duration-300 ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}></span>
    </Link>
  );
}

function MobileNavLink({ to, children, isActive }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-primary-600/20 text-primary-500 border-l-2 border-primary-500' 
          : 'text-gray-300 hover:text-primary-400 hover:bg-dark-300/70'
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
        className="relative flex items-center justify-center h-10 w-10 rounded-full bg-dark-400/80 hover:bg-dark-300 text-gray-300 hover:text-primary-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        {...props}
      >
        <span className="relative z-10">{children}</span>
        
        <span className="absolute inset-0 rounded-full bg-primary-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
        
        {badgeCount !== undefined && (
          <span className={`absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-primary-600 flex items-center justify-center text-xs text-white font-semibold transition-all duration-300 ${
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