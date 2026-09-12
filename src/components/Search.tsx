import { useState } from 'react';
import { products, Product } from '../data/products';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  onViewProduct: (product: Product) => void;
}

export default function Search({ isOpen, onClose, onViewProduct }: SearchProps) {
  const [query, setQuery] = useState('');

  const results = query.length > 0
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.color.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ['Totes', 'Crossbody', 'New', 'Black', 'Cream'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-24">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:opacity-60 transition-opacity"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our store"
            className="w-full text-2xl lg:text-3xl font-light border-b border-black pb-4 pr-12 outline-none placeholder:text-gray-300 bg-transparent"
            autoFocus
          />
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Results */}
        {query.length > 0 && (
          <div className="mt-8">
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onViewProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-4 w-full text-left p-3 hover:bg-gray-50 transition-colors rounded"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-20 object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-light">{product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{product.category} · {product.color}</p>
                      <p className="text-sm mt-1">${product.price.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mt-4">No results found for "{query}"</p>
            )}
          </div>
        )}

        {/* Popular searches */}
        {query.length === 0 && (
          <div className="mt-12">
            <h4 className="text-xs tracking-widest uppercase text-gray-400 mb-4">
              Popular Searches
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setQuery(search)}
                  className="px-4 py-2 text-xs border border-gray-200 hover:border-black transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
