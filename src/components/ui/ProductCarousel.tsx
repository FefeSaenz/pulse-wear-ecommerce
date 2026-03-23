import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Product } from '@/src/types/product.types';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onAdd: (product: Product) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, onAdd }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Funciones para deslizar con las flechas en PC
  // Funciones para deslizar con las flechas en PC
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8; 
      
      // Agregamos un margen de 5px para evitar errores de redondeo de píxeles
      const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 5;
      const isAtStart = scrollLeft <= 5;

      if (direction === 'left') {
        if (isAtStart) {
          carouselRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' }); // Al final
        } else {
          carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (isAtEnd) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' }); // Al principio
        } else {
          carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full py-16 border-t border-gray-100 mt-10 md:mt-20 ">
        <style>{`
        .no-scroll-view::-webkit-scrollbar { display: none; }
        .no-scroll-view { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="max-w-360 mx-auto px-6 relative group">
        
        {/* Título del Carrusel */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-3xl font-black italic-pulso uppercase tracking-tighter">
            {title}
          </h2>
          {/* Botón opcional para ver todos */}
          <Link
            to="/productos"
            className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 hover:text-black transition-colors hidden md:block cursor-pointer">
            Ver Todo
          </Link>
        </div>

        {/* FLECHAS LATERALES (Adaptadas a fondo blanco) */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-4 top-1/2 mt-4 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center border border-gray-200 bg-white rounded-full text-black hover:bg-black hover:text-white hover:border-black transition-all opacity-0 group-hover:opacity-100 shadow-sm cursor-pointer"
        >
          <i className="fa-solid fa-chevron-left text-sm"></i>
        </button>
        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-4 top-1/2 mt-4 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center border border-gray-200 bg-white rounded-full text-black hover:bg-black hover:text-white hover:border-black transition-all opacity-0 group-hover:opacity-100 shadow-sm cursor-pointer"
        >
          <i className="fa-solid fa-chevron-right text-sm"></i>
        </button>

        {/* CONTENEDOR DEL CARRUSEL (Scroll Nativo + Snap) */}
        {/* En mobile ocupa el 70% de la pantalla para dejar asomar el siguiente producto y fomentar el swipe */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 md:gap-6 snap-x snap-mandatory scroll-smooth pb-4 no-scroll-view"
        >
          {products.map((product, idx) => (
            <div 
              key={`${product.id}-${idx}`} 
              className="snap-start shrink-0 w-[75%] md:w-[45%] lg:w-[23%]"
            >
              {/* Le pasamos el onAdd para que funcione el QuickView Modal */}
              <ProductCard product={product} onAdd={onAdd} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductCarousel;