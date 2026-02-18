import React from 'react';
import { CartItem as CartItemType } from '../../../types';
import Price from '../ui/Price'; // Usamos nuestro nuevo componente Price

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex space-x-4">
      <div className="w-24 aspect-[3/4] flex-shrink-0 bg-gray-100 overflow-hidden">
        <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-tight leading-tight">{item.name}</h4>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
              Talle: <span className="text-black font-bold">{item.selectedSize}</span>
            </p>
          </div>
          <Price amount={item.price} className="text-xs font-bold" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border border-gray-200">
            <button 
              onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)} 
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
            >
              <i className="fa-solid fa-minus text-[10px]"></i>
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-xs font-bold">{item.quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)} 
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
            >
              <i className="fa-solid fa-plus text-[10px]"></i>
            </button>
          </div>
          <button 
            onClick={() => onRemove(item.id, item.selectedSize)} 
            className="text-[10px] text-gray-400 hover:text-black underline uppercase tracking-widest"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;