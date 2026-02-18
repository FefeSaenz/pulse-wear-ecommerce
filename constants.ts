
import { Product } from './types';

const BASE_URL = import.meta.env.BASE_URL;
const DEFAULT_SIZES = ['S', 'M', 'L', 'XL','2XL'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Remera Boxy Drift Negra',
    price: 37990,
    images: [
      /*'https://picsum.photos/seed/vcp1/600/800',
      'https://picsum.photos/seed/vcp1-2/600/800',
      'https://picsum.photos/seed/vcp1-3/600/800'*/
      `${BASE_URL}assets/rem mujer 1.jpg`,
      `${BASE_URL}assets/rem mujer 2.jpg`
    ],
    category: 'Remeras',
    promo: '3X2',
    sizes: DEFAULT_SIZES,
    description: 'Nuestra clásica remera Boxy Fit confeccionada en jersey de algodón premium de alto gramaje.'
  },
  {
    id: '2',
    name: 'Remera Over Hana Hum Navy',
    price: 49990,
    images: [
      /*'https://picsum.photos/seed/vcp2/600/800',
      'https://picsum.photos/seed/vcp2-2/600/800'*/
      `${BASE_URL}assets/remera navy frente.jpg`,
      `${BASE_URL}assets/remera navy atras.jpg`
    ],
    category: 'Remeras',
    sizes: DEFAULT_SIZES,
    description: 'Corte oversize con bordado central de alta definición. Ideal para un look relajado y urbano.'
  },
  {
    id: '3',
    name: 'Remera Over Rhy Soft Black',
    price: 39990,
    images: [
      /*'https://picsum.photos/seed/vcp3/600/800',
      'https://picsum.photos/seed/vcp3-2/600/800'*/
      `${BASE_URL}assets/remera negra ov frente.jpg`,
      `${BASE_URL}assets/remera negra ov atras.jpg`
    ],
    category: 'Remeras',
    sizes: DEFAULT_SIZES,
    description: 'Tejido soft touch con proceso de suavizado extremo. Confort y estilo en una sola prenda.'
  },
  {
    id: '4',
    name: 'Remera Over Hana Hum Negra',
    price: 49990,
    images: [
      /*'https://picsum.photos/seed/vcp4/600/800',
      'https://picsum.photos/seed/vcp4-2/600/800'*/
      `${BASE_URL}assets/rem negra 1.jpg`,
      `${BASE_URL}assets/rem negra 2.jpg`
    ],
    category: 'Remeras',
    sizes: DEFAULT_SIZES,
    description: 'Versión Black de nuestra Hana Hum. Versatilidad pura para cualquier outfit nocturno.'
  },
  {
    id: '5',
    name: 'Remera Boxy Drift Blanca',
    price: 37990,
    images: [
      /*'https://picsum.photos/seed/vcp5/600/800',
      'https://picsum.photos/seed/vcp5-2/600/800'*/
      `${BASE_URL}assets/Blanca_1.png`,
      `${BASE_URL}assets/Blanca_2.png`
    ],
    category: 'Remeras',
    promo: 'SALE',
    sizes: DEFAULT_SIZES,
    description: 'La esencia del minimalismo. Calce perfecto y durabilidad garantizada.'
  },
  {
    id: '6',
    name: 'Pantalón Cargo Drift Negro',
    price: 75990,
    images: [
      /*'https://picsum.photos/seed/vcp6/600/800',
      'https://picsum.photos/seed/vcp6-2/600/800'*/
      `${BASE_URL}assets/cargo 1.jpg`,
      `${BASE_URL}assets/cargo 2.jpg`
    ],
    category: 'Pantalones',
    sizes: ['38', '40', '42', '44'],
    description: 'Pantalón cargo técnico con múltiples bolsillos y ajuste en tobillos.'
  }
];

export const FREE_SHIPPING_THRESHOLD = 120000;
