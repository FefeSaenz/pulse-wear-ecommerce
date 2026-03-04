
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[]; // Changed from single image to array
  category: string;
  tag?: string;
  description?: string;
  promo?: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export type OrderStatus = 'Procesando' | 'Enviado' | 'Entregado' | 'Cancelado';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
}
