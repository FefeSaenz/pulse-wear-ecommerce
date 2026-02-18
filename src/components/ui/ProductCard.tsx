import React, { useState } from 'react';
import { Product } from '../../../types';
import Price from './Price'; // <-- Importamos el componente

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col group cursor-pointer" 
      onClick={() => onAdd(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        {product.promo && (
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest z-10">
            {product.promo}
          </div>
        )}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
           <span className="bg-white text-black px-6 py-3 text-[11px] font-bold uppercase tracking-wider shadow-xl">Vista Rápida</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-sm font-medium text-gray-800 uppercase tracking-tight">{product.name}</h3>
                
        <Price amount={product.price} className="mt-1 text-sm font-bold block" />
      </div>
    </div>
  );
};

export default ProductCard;