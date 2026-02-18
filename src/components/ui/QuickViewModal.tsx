import React, { useState } from 'react';
import { Product } from '../../../types';
import Modal from './Modal'; // Importamos el componente base
import Price from './Price'; // Importamos el componente Price

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  // Si no hay producto seleccionado, el Modal base ya maneja el !isOpen, 
  // pero lo mantenemos para evitar errores de hooks abajo.
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <Modal isOpen={!!product} onClose={onClose} maxWidth="max-w-5xl">
      {/* Botón de cerrar específico del diseño QuickView */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md text-gray-500 hover:text-black transition-colors"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      <div className="flex flex-col md:flex-row overflow-hidden max-h-[95vh]">
        {/* SECCIÓN DE GALERÍA */}
        <div className="w-full md:w-[60%] bg-gray-50 flex flex-col md:flex-row">
          {/* Miniaturas (Desktop) */}
          <div className="hidden md:flex flex-col p-4 space-y-2 w-20 overflow-y-auto custom-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveImageIndex(idx)}
                className={`aspect-[3/4] border-2 transition-all ${
                  activeImageIndex === idx ? 'border-black' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
              </button>
            ))}
          </div>
          
          {/* Imagen Principal */}
          <div className="flex-1 relative overflow-hidden group">
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700"
            />
            
            {/* Indicadores Mobile */}
            <div className="absolute bottom-4 left-0 right-0 md:hidden flex justify-center space-x-2">
               {product.images.map((_, idx) => (
                 <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2 h-2 rounded-full ${activeImageIndex === idx ? 'bg-black' : 'bg-white/50'}`} 
                 />
               ))}
            </div>
          </div>
        </div>

        {/* SECCIÓN DE INFORMACIÓN */}
        <div className="w-full md:w-[40%] p-8 md:p-10 flex flex-col justify-center overflow-y-auto bg-white">
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-2">{product.category}</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-tight text-black">{product.name}</h2>
          
          <Price amount={product.price} className="text-xl font-bold mb-8 text-black block" />
          
          {/* Selección de Talle */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 text-black">Seleccionar Talle</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center text-xs font-bold border transition-all ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-10">
             <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 text-black">Descripción</h4>
             <p className="text-sm text-gray-500 leading-relaxed">
               {product.description}
             </p>
          </div>

          <button
            onClick={() => onAddToCart(product, selectedSize)}
            className="w-full bg-black text-white py-5 text-[12px] font-black uppercase tracking-[4px] hover:bg-gray-900 transition-colors flex items-center justify-center space-x-3"
          >
            <i className="fa-solid fa-cart-plus"></i>
            <span>Añadir al carrito</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;