import React, { useState } from 'react';
import { CartItem, Order } from '../../../types';
import Modal from './Modal'; // Asegurate de que la ruta sea correcta
import Price from './Price';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onComplete: (order: Order) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '', address: '', city: '', zip: '',
  });

  // Si no está abierto, el componente Modal ya se encarga de retornar null, 
  // pero lo mantenemos acá por seguridad de lógica.
  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNext = () => {
    if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        const newOrder: Order = {
          id: Math.random().toString(36).substr(2, 9).toUpperCase(),
          date: new Date().toLocaleDateString(),
          items: [...cart],
          total,
          status: 'Procesando',
          shippingAddress: `${formData.address}, ${formData.city}`
        };
        setLoading(false);
        onComplete(newOrder);
        setStep(3);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={step < 3 ? onClose : () => {}} // Evita cerrar si el pedido ya se confirmó
      maxWidth="max-w-2xl"
    >
      {/* --- CABECERA DE PASOS --- */}
      {step < 3 && (
        <div className="flex border-b border-gray-100">
          {[1, 2].map((s) => (
            <div 
              key={s} 
              className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-[3px] transition-colors ${
                step >= s ? 'text-black' : 'text-gray-300'
              }`}
            >
              {s === 1 ? 'Información' : 'Pago'}
              <div className={`h-[2px] mt-2 mx-auto w-12 transition-colors ${step >= s ? 'bg-black' : 'bg-gray-100'}`} />
            </div>
          ))}
        </div>
      )}

      <div className="p-8 md:p-12">
        {/* PASO 1: ENVÍO */}
        {step === 1 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8 text-black">Información de Envío</h3>
            <div className="space-y-4">
              <input 
                type="email" placeholder="EMAIL" 
                className="w-full border-b border-gray-200 py-3 text-xs font-bold focus:border-black outline-none uppercase tracking-widest placeholder:text-gray-300 text-black"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="text" placeholder="DIRECCIÓN" 
                className="w-full border-b border-gray-200 py-3 text-xs font-bold focus:border-black outline-none uppercase tracking-widest placeholder:text-gray-300 text-black"
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="CIUDAD" 
                  className="w-full border-b border-gray-200 py-3 text-xs font-bold focus:border-black outline-none uppercase tracking-widest placeholder:text-gray-300 text-black"
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
                <input 
                  type="text" placeholder="CP" 
                  className="w-full border-b border-gray-200 py-3 text-xs font-bold focus:border-black outline-none uppercase tracking-widest placeholder:text-gray-300 text-black"
                  onChange={(e) => setFormData({...formData, zip: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}

        {/* PASO 2: PAGO */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8 text-black">Método de Pago</h3>
            <div className="bg-gray-50 p-6 mb-8 rounded-sm">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-black">
                <span>Total a pagar</span>
                <Price amount={total} className="font-black" />
              </div>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="NOMBRE EN TARJETA" className="w-full border-b border-gray-200 py-3 text-xs font-bold focus:border-black outline-none uppercase tracking-widest text-black" />
              <input type="text" placeholder="NÚMERO DE TARJETA" className="w-full border-b border-gray-200 py-3 text-xs font-bold focus:border-black outline-none uppercase tracking-widest text-black" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="border-b border-gray-200 py-3 text-xs font-bold focus:border-black outline-none uppercase tracking-widest text-black" />
                <input type="text" placeholder="CVV" className="border-b border-gray-200 py-3 text-xs font-bold focus:border-black outline-none uppercase tracking-widest text-black" />
              </div>
            </div>
          </div>
        )}

        {/* PASO 3: CONFIRMACIÓN */}
        {step === 3 && (
          <div className="text-center py-12 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8 text-white">
              <i className="fa-solid fa-check text-3xl"></i>
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-black">¡Pedido Confirmado!</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-12">
              Gracias por tu compra, Federico. Recibirás un correo con los detalles.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[4px] hover:bg-gray-800 transition-colors"
            >
              Volver a la tienda
            </button>
          </div>
        )}

        {/* BOTONES DE NAVEGACIÓN INTERNA */}
        {step < 3 && (
          <div className="mt-12 flex space-x-4">
            {step === 2 && (
              <button 
                onClick={() => setStep(1)}
                className="px-8 border border-gray-200 text-[10px] font-black uppercase tracking-[3px] hover:bg-gray-50 text-black"
              >
                Atrás
              </button>
            )}
            <button 
              onClick={handleNext}
              disabled={loading}
              className="flex-1 bg-black text-white py-5 text-[11px] font-black uppercase tracking-[4px] relative flex items-center justify-center"
            >
              {loading ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : (
                step === 2 ? <>PAGAR <Price amount={total} className="ml-2" /></> : 'Continuar'
              )}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CheckoutModal;