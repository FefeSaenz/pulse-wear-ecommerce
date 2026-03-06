import React, { useState } from 'react';

// Contexts
import { useApp } from '@/src/context/AppContext'; // Consumo de la API
import { useCart } from '@/src/context/CartContext'; // Consumo del Carrito Global

// Hooks & Utils
//import { mapApiProductToLocal } from '@/src/utils/mappers';
import { useProductFilters } from '@/src/hooks/useProductFilters';
import { Product } from '@/src/types/product.types';


// Layout Components
import Footer from '@/src/components/layout/Footer';
import AnnouncementBar from '@/src/components/layout/AnnouncementBar';
import CartDrawer from '@/src/components/cart/CartDrawer';
import ProductGrid from '@/src/components/layout/ProductGrid';
import LocationsSection from '@/src/components/layout/LocationsSection';

// UI Components
import HeroBanner from '@/src/components/ui/HeroBanner';
import FilterBar from '@/src/components/ui/FilterBar';
import QuickViewModal from '@/src/components/ui/QuickViewModal';
import CheckoutModal from '@/src/components/ui/CheckoutModal';
import UserProfile from '@/src/components/ui/UserProfile';

interface HomeProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

const Home: React.FC<HomeProps> = ({ searchTerm, setSearchTerm }) => {
    const { frontConfig, loading } = useApp(); // Data de la API disponible aquí
    
    const { 
        cart, orders, isCartOpen, setIsCartOpen, isProfileOpen, setIsProfileOpen, isCheckoutOpen, setIsCheckoutOpen, addToCart, updateQuantity, removeFromCart, handleCheckoutComplete 
    } = useCart();

    // --- ESTADOS DE NEGOCIO LOCALES (Estado local de la página)
    const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
    
    // 3. Lógica de Negocio extraída del Hook (Custom Hook)
    const rawProducts = frontConfig?.featured_products?.products || [];

    const {
        filteredProducts,
        activeCategory,
        setActiveCategory,
        sortBy,
        setSortBy,
        categories
    } = useProductFilters({ rawProducts, searchTerm });

    // Early return
    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-xl bg-white">Cargando Pulso Wear...</div>;
    
    return (
        <>
            <main className="flex-grow">
                
                <AnnouncementBar 
                    messages={["3X2 EN TODA LA WEB", "ENVÍO GRATIS + $120.000", "6 CUOTAS SIN INTERÉS"]} 
                />

                <HeroBanner 
                    banners={frontConfig?.banners || []}
                    onCtaClick={(url) => {
                        if (url.startsWith('#')) {
                        const targetId = url.replace('#', '');
                        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                        // Si es una URL externa o de otra página
                        window.location.href = url;
                        }
                    }}
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
                    onResetFilters={() => { setActiveCategory('Todos'); setSearchTerm(''); }} 
                />

                <LocationsSection />
                <Footer />
            </main>

            {/* COMPONENTES DE INTERACCIÓN (Consumiendo del Context) */}
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
                onAddToCart={(product, size) => {
                    // 1. Ejecuta la lógica global del carrito (guardar + abrir drawer)
                    addToCart(product, size); 
                    // 2. Limpia el estado local de la Home para cerrar este modal
                    setSelectedQuickView(null); 
                }}
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
        </>
    );
};

export default Home;