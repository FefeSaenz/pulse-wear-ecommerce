import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { AppProvider } from './src/context/AppContext';
import { CartProvider, useCart } from './src/context/CartContext';

// Layout Components Globales
import Header from './src/components/layout/Header';
import SearchOverlay from './src/components/layout/SearchOverlay';

// Pages
import Home from './src/pages/Home/Home';

const AppContent: React.FC = () => {
  // --- ESTADOS DE INTERFAZ GLOBALES (Necesarios para Header y Search) ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // --- CONSUMO DE CONTEXTO PARA EL HEADER ---
  const { setIsCartOpen, setIsProfileOpen, cartCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col pt-20">
      
      {/* NAVEGACIÓN Y BUSCADOR (Globales y conectados al Context) */}
      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        cartCount={cartCount} 
      />

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* CONFIGURACIÓN DE RUTAS */}
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          } 
        />
        <Route path="/productos" element={<div className="p-20 text-center">Página de Productos próximamente</div>} />
      </Routes>
      
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <CartProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <AppContent />
        </Router>
      </CartProvider>
    </AppProvider>
  );
};

export default App;