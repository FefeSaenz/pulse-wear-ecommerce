import { useMemo } from 'react';
import { useApp } from '@/src/context/AppContext';
import { mapApiProductToLocal } from '@/src/utils/mappers';

export const useUnifiedProducts = () => {
    const { allProducts, frontConfig } = useApp();

    const unifiedProducts = useMemo(() => {
        const catalog = allProducts.map(p => ({ ...p }));

        const featuredRaw = frontConfig?.featured_products?.products || [];
        const featuredMapped = featuredRaw.map(mapApiProductToLocal);

        // Mezclamos e inyectamos tags
        featuredMapped.forEach(fProd => {
            const existingIndex = catalog.findIndex(p => p.id === fProd.id);
            
            if (existingIndex === -1) {
                // Producto fantasma
                catalog.push(fProd);
            } else {
                // Producto existente -> Le pegamos la etiqueta de destacado
                if (fProd.tags) {
                    catalog[existingIndex].tags = fProd.tags;
                }
            }
        });

        return catalog;
    }, [allProducts, frontConfig]);

    return { unifiedProducts };
};