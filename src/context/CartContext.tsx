import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Product, CartItem, Order } from '../types/product.types';

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, size: string, delta: number) => void;
  removeFromCart: (id: string, size: string) => void;
  handleCheckoutComplete: (newOrder: Order) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // --- ESTADOS DE INTERFAZ ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // --- ESTADO DE NEGOCIO: CARRITO CON PERSISTENCIA ---
  // Lazy initializer: Se ejecuta solo en el primer render para leer el disco duro
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('pulso_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error leyendo el carrito de localStorage:", error);
      return [];
    }
  });

  // Efecto Sincronizador: Cada vez que 'cart' cambia, lo guardamos
  useEffect(() => {
    try {
      localStorage.setItem('pulso_cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error guardando el carrito en localStorage:", error);
    }
  }, [cart]);


  /*
    MANEJADORES DEL CARRITO
   */
  const addToCart = useCallback((newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === newItem.id && item.selectedSize === newItem.selectedSize && item.selectedColor === newItem.selectedColor);
      if (existing) {
        return prev.map((item) =>
          (item.id === newItem.id && item.selectedSize === newItem.selectedSize && item.selectedColor === newItem.selectedColor)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, newItem];
    });
    
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
   */
  const handleCheckoutComplete = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setCart([]); // Al vaciar el array acá, el useEffect automáticamente borra el localStorage
    setIsCheckoutOpen(false);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, orders, isCartOpen, setIsCartOpen, isProfileOpen, setIsProfileOpen,
      isCheckoutOpen, setIsCheckoutOpen, addToCart, updateQuantity, 
      removeFromCart, handleCheckoutComplete, cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};