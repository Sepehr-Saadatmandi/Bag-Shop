import { useState } from 'react';
import { products, categories, colors, Product } from '../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  onAddToCart: (product: Product, size: string) => void;
  onViewProduct: (product: Product) => void;
  filterCategory?: string;
  showNewOnly?: boolean;
}

export default function ProductGrid({ onAddToCart, onViewProduct, filterCategory, showNewOnly }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  let filteredProducts = products;

  if (showNewOnly) {
    filteredProducts = filteredProducts.filter((p) => p.isNew);
  }

  if (filterCategory && filterCategory !== 'All') {
    filteredProducts = filteredProducts.filter((p) => p.category === filterCategory);
  }

  if (selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }

  if (selectedColor !== 'All') {
    filteredProducts = filteredProducts.filter((p) => p.color === selectedColor);
  }

  return (
    <section className="max-w-[1800px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-2">
            {showNewOnly ? 'New Arrivals' : filterCategory ? filterCategory : 'The Collection'}
          </h2>
          <p className="text-sm text-gray-500 tracking-wide">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-xs tracking-widest uppercase mt-4 md:mt-0 hover:opacity-60 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Filter</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="border-t border-gray-100 pt-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 font-medium">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs border transition-all ${
                    selectedCategory === cat
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 font-medium">Colour</h4>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-xs border transition-all ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewProduct={onViewProduct}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 tracking-wide">No products found matching your filters.</p>
        </div>
      )}
    </section>
  );
}
