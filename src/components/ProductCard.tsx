import { useState } from 'react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onViewProduct: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewProduct }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizes, setShowSizes] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-black text-white text-[10px] tracking-widest uppercase px-3 py-1">
            New
          </span>
        )}

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {product.sizes.length > 1 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSizes(!showSizes);
              }}
              className="w-full bg-white/95 backdrop-blur-sm text-black text-xs tracking-widest uppercase py-3 hover:bg-white transition-colors"
            >
              {showSizes ? 'Select Size' : 'Quick Add'}
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product, product.sizes[0]);
              }}
              className="w-full bg-white/95 backdrop-blur-sm text-black text-xs tracking-widest uppercase py-3 hover:bg-white transition-colors"
            >
              Add to Bag
            </button>
          )}
        </div>

        {/* Size selector */}
        {showSizes && (
          <div className="absolute bottom-16 left-0 right-0 bg-white p-4 shadow-lg">
            <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-3">
              Available Sizes
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                    onAddToCart(product, size);
                    setShowSizes(false);
                  }}
                  className={`px-4 py-2 text-xs border transition-all ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product info */}
      <div onClick={() => onViewProduct(product)}>
        <h3 className="text-sm tracking-wide mb-1 font-light">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600">
          ${product.price.toLocaleString()}
        </p>
        <div className="flex gap-1.5 mt-2">
          <span className="text-[10px] tracking-wider uppercase text-gray-400">
            {product.color}
          </span>
        </div>
      </div>
    </div>
  );
}
