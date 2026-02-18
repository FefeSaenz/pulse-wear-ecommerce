
import React, { useState, useCallback, useMemo } from 'react';

// Layout Components
import Header from './src/components/layout/Header';
import Footer from './src/components/layout/Footer';
import AnnouncementBar from './src/components/layout/AnnouncementBar';
import SearchOverlay from './src/components/layout/SearchOverlay';
import CartDrawer from './src/components/cart/CartDrawer';

// UI Components
import HeroBanner from './src/components/ui/HeroBanner';
import QuickViewModal from './src/components/ui/QuickViewModal';
import CheckoutModal from './src/components/ui/CheckoutModal';
import UserProfile from './src/components/ui/UserProfile';

// Business Components
import FilterBar from './src/components/ui/FilterBar';
import ProductGrid from './src/components/layout/ProductGrid';
import LocationsSection from './src/components/layout/LocationsSection';

// Utils & Data
import { Product, CartItem, Order } from './types';
import { MOCK_PRODUCTS } from './constants';


const App: React.FC = () => {
  // --- ESTADOS DE INTERFAZ (Modales y Overlays) ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // --- ESTADOS DE NEGOCIO (Carrito, Pedidos y Selección) ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
  
  // Filtering & Search state
  // --- ESTADOS DE FILTRADO Y BÚSQUEDA ---
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Todos', 'Remeras', 'Pantalones'];

  /*
    LÓGICA DE FILTRADO DE PRODUCTOS
    Memorizamos el resultado para evitar cálculos innecesarios en cada render.
   */
  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'Todos' 
      ? [...MOCK_PRODUCTS] 
      : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

    
      // Apply Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    }

    // Apply Sort
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeCategory, sortBy, searchTerm]);

  /*
    MANEJADORES DEL CARRITO
    Usamos useCallback para que las funciones no se recreen si no cambian sus dependencias.
   */
  const addToCart = useCallback((product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && item.selectedSize === size)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setSelectedQuickView(null);
    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.selectedSize === size) {
            const newQty = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
  }, []);

  /*
    FINALIZACIÓN DE COMPRA
    Registra el nuevo pedido y limpia el carrito de compras.
   */
  const handleCheckoutComplete = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col pt-20">
      {/* NAVEGACIÓN Y BUSCADOR */}
      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
      />

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow">
        
        <AnnouncementBar 
          messages={["3X2 EN TODA LA WEB", "ENVÍO GRATIS +$120.000", "6 CUOTAS SIN INTERÉS"]} 
        />

        <HeroBanner 
          title={<>STREET <br/> ESSENTIALS</>} 
          subtitle="New Era Collection" 
          //image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=2000" 
          image="./assets/herobanner.png"
          onCtaClick={() => document.getElementById('shop-section')?.scrollIntoView({behavior: 'smooth'})} 
        />

        <FilterBar 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
          sortBy={sortBy} 
          onSortChange={(v) => setSortBy(v as any)} 
        />

        <ProductGrid 
          products={filteredProducts} 
          searchTerm={searchTerm} 
          onClearSearch={() => setSearchTerm('')} 
          onQuickView={setSelectedQuickView} 
          onResetFilters={() => {setActiveCategory('Todos'); setSearchTerm('');}} 
        />


        {/* Locations & Map Section */}
        <LocationsSection />

        <Footer />
      </main>

      {/* COMPONENTES DE INTERACCIÓN Overlays y Modales */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onOpenCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onAddFromRec={(p) => setSelectedQuickView(p)}
      />

      <QuickViewModal 
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
        onAddToCart={addToCart}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onComplete={handleCheckoutComplete}
      />

      <UserProfile 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        orders={orders}
      />

      
    </div>
  );
};

export default App;
