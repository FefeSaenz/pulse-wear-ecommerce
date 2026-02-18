import React from 'react';
import CartItem from './CartItem';
import CartShippingTracker from './CartShippingTracker';
import CartRecommendations from './CartRecommendations';
import CartSummary from './CartSummary';
import EmptyState from '../ui/EmptyState';
import { CartItem as CartItemType, Product } from '../../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
  cart: CartItemType[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
  onAddFromRec: (product: Product) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = (props) => {
  const { isOpen, onClose, onOpenCheckout, cart, onUpdateQuantity, onRemove, onAddFromRec } = props;
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />

      <div className={`fixed top-0 right-0 h-full bg-white z-50 w-full max-w-[850px] shadow-2xl transition-transform duration-300 transform flex ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <CartRecommendations onAddFromRec={onAddFromRec} />

        <div className="flex-1 flex flex-col h-full bg-white">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-sm font-bold uppercase tracking-widest text-black">Mi Carrito</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
            <CartShippingTracker subtotal={subtotal} />

            <div className="space-y-8">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <CartItem key={`${item.id}-${item.selectedSize}`} item={item} onUpdateQuantity={onUpdateQuantity} onRemove={onRemove} />
                ))
              ) : (
                <EmptyState message="Tu carrito está vacío" icon="fa-cart-arrow-down" />
              )}
            </div>
          </div>

          <CartSummary subtotal={subtotal} onCheckout={onOpenCheckout} disabled={cart.length === 0} />
        </div>
      </div>
    </>
  );
};

export default CartDrawer;