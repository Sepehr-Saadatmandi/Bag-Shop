import { useState } from 'react';
import { Product } from '../data/products';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product, selectedSize);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-10 p-2 hover:opacity-60 transition-opacity bg-white/80 backdrop-blur-sm rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Images */}
          <div className="grid grid-cols-2 gap-1 p-4 lg:p-8">
            <div className="aspect-[3/4] bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] bg-gray-50">
              <img
                src={product.hoverImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16">
            <div className="max-w-md">
              {product.isNew && (
                <span className="text-[10px] tracking-widest uppercase text-gray-400 mb-4 block">
                  New Arrival
                </span>
              )}

              <h1 className="text-2xl lg:text-3xl font-light tracking-wide mb-4">
                {product.name}
              </h1>

              <p className="text-xl mb-8">${product.price.toLocaleString()}</p>

              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Color */}
              <div className="mb-8">
                <p className="text-xs tracking-widest uppercase mb-3">
                  Colour: <span className="font-normal">{product.color}</span>
                </p>
              </div>

              {/* Size selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs tracking-widest uppercase">Size</p>
                  <button className="text-xs text-gray-400 underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 text-xs border transition-all ${
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

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 text-xs tracking-widest uppercase transition-all ${
                  addedToCart
                    ? 'bg-green-800 text-white'
                    : selectedSize
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {addedToCart ? '✓ Added to Bag' : selectedSize ? 'Add to Bag' : 'Select a Size'}
              </button>

              {/* Details accordion */}
              <div className="mt-12 border-t border-gray-100 pt-8 space-y-6">
                <div>
                  <h4 className="text-xs tracking-widest uppercase mb-2">Details</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Crafted from premium Italian leather</li>
                    <li>• Gold-tone hardware</li>
                    <li>• Interior zip pocket</li>
                    <li>• Dust bag included</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs tracking-widest uppercase mb-2">Shipping</h4>
                  <p className="text-sm text-gray-600">
                    Complimentary express delivery on orders over $500. 
                    Free returns within 30 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
