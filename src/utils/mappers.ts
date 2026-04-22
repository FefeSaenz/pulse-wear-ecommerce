// utils/mappers.ts
import { Product, ProductVariant } from '../types/product.types';
import { ApiDress } from '../types/api';

/**
 * Adapter Pattern: Transforma un producto de la API al formato estandarizado de la UI.
 */
export const mapApiDressToProduct = (apiDress: ApiDress): Product => {
  // 1. Agrupamos las variantes por el NOMBRE DEL COLOR (para evitar duplicados por distintos HEX)
  const groupedVariants: Record<string, ProductVariant> = {};

  if (apiDress.dress_variants && apiDress.dress_variants.length > 0) {
    apiDress.dress_variants.forEach((v) => {
      // Normalizamos el nombre del color: mayúsculas y sin espacios. Si viene vacío, usamos 'ÚNICO'.
      const rawColorName = v.variant_color ? v.variant_color.trim().toUpperCase() : '';
      const colorKey = rawColorName !== '' ? rawColorName : 'ÚNICO';
      
      // Fallback de color: Si el backend no manda un HEX válido, pintamos el círculo de gris oscuro (#333)
      const safeHex = v.variant_hex || '#333333'; 

      if (!groupedVariants[colorKey]) {
        groupedVariants[colorKey] = {
          color: {
            name: colorKey, // Ej: "BLANCO" o "ÚNICO"
            hex: safeHex,   // Ej: "#f7f7f7" o "#333333"
            image: v.variant_picture,
          },
          sizes: [],
        };
      }

      // 2. Metemos el talle adentro de ese color
      groupedVariants[colorKey].sizes.push({
        size: v.variant_size,
        sku: v.variant_sku || apiDress.dress_sku,
        stock: v.variant_stock !== null ? v.variant_stock : 99,
        available: v.variant_stock === null || v.variant_stock > 0, // Clave para deshabilitar talles sin stock (Punto 3c)
      });
    });
  } else {
    // Fallback: Si un producto viene sin variantes desde la API, le creamos una estructura base para no romper la UI
    groupedVariants['ÚNICO'] = {
      color: { name: 'ÚNICO', hex: '#333333' },
      sizes: [{ size: 'U', sku: apiDress.dress_sku, stock: 10, available: true }]
    };
  }

  // 3. Devolvemos el producto mapeado correctamente
  return {
    id: apiDress.dress_bound.toString(),
    slug: apiDress.dress_slug,
    name: apiDress.dress_name,
    description: apiDress.dress_description,
    price: apiDress.dress_price,
    original_price: null,
    discount_percentage: null,
    images: [apiDress.dress_picture], // Por ahora hay 1 sola, luego atacamos el Punto 2
    category: apiDress.category_name,
    base_sku: apiDress.dress_sku,
    brand: apiDress.brand_name,
    material: apiDress.dress_material,
    active: true,
    tags: apiDress.dress_highlight === 1 ? 'Destacado' : undefined, 
    variants: Object.values(groupedVariants),
  };
};

/**
 * Utilidad extra para extraer categorías únicas del catálogo
 */
export const extractUniqueCategories = (products: Product[]): string[] => {
  const categories = products.map(p => p.category);
  return Array.from(new Set(categories)); // Elimina duplicados
};