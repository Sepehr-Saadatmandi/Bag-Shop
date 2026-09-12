import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Cart panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-sm tracking-widest uppercase">
              Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
            <button onClick={onClose} className="p-2 hover:opacity-60 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg className="w-12 h-12 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-sm text-gray-400 tracking-wide">Your bag is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-20 h-24 bg-gray-50 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-light">{item.product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                      <p className="text-sm mt-2">${item.product.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-gray-200">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="px-2 py-1 text-sm hover:bg-gray-50"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-xs">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="px-2 py-1 text-sm hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-xs text-gray-400 underline hover:text-black transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="tracking-wide">Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400">
                Shipping and taxes calculated at checkout
              </p>
              <button className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors">
                Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full border border-gray-200 py-3 text-xs tracking-widest uppercase hover:border-black transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
