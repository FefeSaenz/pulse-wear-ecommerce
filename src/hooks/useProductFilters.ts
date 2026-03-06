import { useState, useMemo } from 'react';
import { FeaturedProduct } from '../types/api';
import { mapApiProductToLocal } from '../utils/mappers';

interface UseProductFiltersProps {
  rawProducts: FeaturedProduct[];
  searchTerm: string;
}

export const useProductFilters = ({ rawProducts, searchTerm }: UseProductFiltersProps) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');

  const categories = ['Todos', 'Remeras', 'Pantalones', 'Buzos'];

  const filteredProducts = useMemo(() => {
    // 1. Mapeamos la data de la API a nuestro formato de UI
    const mappedProducts = rawProducts.map(mapApiProductToLocal);

    // 2. Filtro por Categoría
    let result = activeCategory === 'Todos' 
      ? [...mappedProducts] 
      : mappedProducts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

    // 3. Filtro por Búsqueda (Search)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term) || (p.description?.toLowerCase().includes(term))
      );
    }

    // 4. Ordenamiento (Sort)
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);

    return result;
  }, [rawProducts, activeCategory, sortBy, searchTerm]);

  return {
    filteredProducts,
    activeCategory,
    setActiveCategory,
    sortBy,
    setSortBy,
    categories
  };
};