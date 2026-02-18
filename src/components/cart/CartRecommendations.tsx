import React from 'react';
import { MOCK_PRODUCTS } from '../../../constants';
import { Product } from '../../../types';
import Price from '../ui/Price';

interface Props {
  onAddFromRec: (product: Product) => void;
}

const CartRecommendations: React.FC<Props> = ({ onAddFromRec }) => {
  return (
    <div className="hidden md:flex flex-col w-[300px] border-r border-gray-100 bg-gray-50/30 overflow-y-auto custom-scrollbar">
      <div className="p-8 border-b border-gray-100">
        <h2 className="text-[11px] font-bold uppercase tracking-[3px] text-gray-400">Te puede gustar</h2>
      </div>
      <div className="p-4 space-y-8">
        {MOCK_PRODUCTS.slice(2, 6).map((product) => (
          <div key={product.id} className="text-center group cursor-pointer" onClick={() => onAddFromRec(product)}>
            <div className="aspect-[3/4] mb-3 overflow-hidden">
              <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={product.name} />
            </div>
            <h4 className="text-[10px] font-medium uppercase truncate px-2">{product.name}</h4>
            <Price amount={product.price} className="text-[10px] font-bold mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartRecommendations;