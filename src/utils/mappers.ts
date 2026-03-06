import { Product } from '../types/product.types';
import { FeaturedProduct } from '../types/api';

/*
 * Transforma un producto de la API (destacados) al formato estandarizado que usa la interfaz de UI 'Product'.
*/
export const mapApiProductToLocal = (apiProd: FeaturedProduct): Product => {
  return {
    id: apiProd.id,
    name: apiProd.name,
    price: apiProd.price,
    // FALLBACK: Si la API no trae 'images', usamos 'main_image' dentro de un array
    images: (apiProd as any).images || [apiProd.main_image], 
    category: apiProd.category,
    description: `Descubrí lo mejor en ${apiProd.category}. Calidad premium Pulso Wear.`, // Placeholder
    promo: apiProd.badge || undefined,
    tag: apiProd.badge || undefined,
    sizes: ['S', 'M', 'L', 'XL'], // Talles por defecto ya que la API de front no los trae
  };
};