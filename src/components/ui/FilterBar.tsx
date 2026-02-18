import React from 'react';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange 
}) => {
  return (
    <div id="shop-section" className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="flex space-x-6 overflow-x-auto no-scrollbar w-full md:w-auto">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`text-[10px] font-black uppercase tracking-[2px] transition-colors whitespace-nowrap ${
              activeCategory === cat ? 'text-black border-b-2 border-black' : 'text-gray-300 hover:text-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Ordenar por:</span>
        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-[10px] font-black uppercase tracking-widest outline-none bg-transparent cursor-pointer"
        >
          <option value="default">Recomendados</option>
          <option value="price-low">Menor Precio</option>
          <option value="price-high">Mayor Precio</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;