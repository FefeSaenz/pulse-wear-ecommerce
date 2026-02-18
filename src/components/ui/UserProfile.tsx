
import React from 'react';
import { Order } from '../../../types';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose, orders }) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 w-full max-w-[500px] shadow-2xl transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-sm font-black uppercase tracking-[4px]">Mi Perfil</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-8 overflow-y-auto h-[calc(100%-80px)] custom-scrollbar">
          <div className="mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 mb-6 border-b border-gray-100 pb-2">Información de cuenta</h3>
            <p className="text-sm font-bold">CLIENTE PULSE</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">cliente@pulse.com</p>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 mb-6 border-b border-gray-100 pb-2">Mis Pedidos</h3>
            
            {orders.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">No tienes pedidos aún</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-100 p-5 rounded-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] font-black tracking-widest">ORDEN #{order.id}</p>
                        <p className="text-[9px] text-gray-400 uppercase font-bold mt-1">{order.date}</p>
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                        order.status === 'Procesando' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex -space-x-2 mb-4 overflow-hidden">
                      {order.items.map((item, idx) => (
                        <img 
                          key={idx} 
                          /* Changed item.image to item.images[0] */
                          src={item.images[0]} 
                          className="w-10 h-10 object-cover rounded-full border-2 border-white shadow-sm"
                          alt={item.name}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
                      <span className="text-xs font-black">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
