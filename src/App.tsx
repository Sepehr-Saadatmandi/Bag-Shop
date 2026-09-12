import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart, { CartItem } from './components/Cart';
import Search from './components/Search';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import FeaturedSection from './components/FeaturedSection';
import { Product } from './data/products';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <Header
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        cartCount={cartCount}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main content */}
      <main className="pt-[72px] lg:pt-[88px]">
        {/* Home page */}
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />

            {/* Brand story */}
            <section className="max-w-4xl mx-auto px-6 py-20 lg:py-32 text-center">
              <h2 className="text-2xl lg:text-3xl font-light tracking-wider mb-8">
                Crafted with Intention
              </h2>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Maison Élan is a British luxury accessories brand founded in 2018. 
                Our pieces are designed in London and handcrafted by skilled artisans 
                using the finest Italian leathers. Each bag is a testament to timeless 
                design and uncompromising quality — created to be cherished for years to come.
              </p>
              <button
                onClick={() => handleNavigate('about')}
                className="mt-8 text-xs tracking-widest uppercase border-b border-black pb-1 hover:opacity-60 transition-opacity"
              >
                Our Story
              </button>
            </section>

            {/* Featured section */}
            <FeaturedSection />

            {/* New arrivals preview */}
            <ProductGrid
              onAddToCart={handleAddToCart}
              onViewProduct={handleViewProduct}
              showNewOnly={true}
            />

            <Newsletter />
          </>
        )}

        {/* Shop page */}
        {currentPage === 'shop' && (
          <ProductGrid
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
          />
        )}

        {/* New arrivals page */}
        {currentPage === 'new' && (
          <ProductGrid
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
            showNewOnly={true}
          />
        )}

        {/* Collections page */}
        {currentPage === 'collections' && (
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4">
                Collections
              </h2>
              <p className="text-sm text-gray-500 tracking-wide">
                Explore our curated collections
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Totes', desc: 'Everyday elegance', img: 'https://image.qwenlm.ai/generated-images/6dbe78a7-57bc-4fa9-bbad-95f37c9786f3/_result.png', cat: 'Totes' },
                { name: 'Crossbody', desc: 'Effortless style', img: 'https://image.qwenlm.ai/generated-images/7f2d3153-b7ad-4f58-8429-fbc2931a557b/_result.png', cat: 'Crossbody' },
                { name: 'Clutches', desc: 'Evening sophistication', img: 'https://image.qwenlm.ai/generated-images/ca8ad241-878d-416a-b807-a81cad098087/_result.png', cat: 'Clutches' },
                { name: 'Bucket', desc: 'Relaxed luxury', img: 'https://image.qwenlm.ai/generated-images/518a1ede-8545-4ced-8d53-88784be8230b/_result.png', cat: 'Bucket' },
              ].map((collection) => (
                <button
                  key={collection.name}
                  onClick={() => {
                    handleNavigate('shop');
                  }}
                  className="relative group overflow-hidden aspect-[4/3]"
                >
                  <img
                    src={collection.img}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute bottom-8 left-8 text-white text-left">
                    <h3 className="text-2xl font-light tracking-wide mb-1">{collection.name}</h3>
                    <p className="text-xs tracking-widest uppercase opacity-80">{collection.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* About page */}
        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4">
                Our Story
              </h2>
            </div>

            <div className="aspect-[16/9] mb-16 overflow-hidden">
              <img
                src="https://image.qwenlm.ai/generated-images/53e21664-ce6a-4cc6-96cd-967d006fabef/_result.png"
                alt="Maison Élan"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-8 text-center">
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                Maison Élan was founded in 2018 with a singular vision: to create luxury 
                bags that transcend seasons and trends. Based in the heart of London, our 
                design studio draws inspiration from architecture, art, and the modern woman's 
                dynamic lifestyle.
              </p>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                Every piece begins as a sketch and is brought to life through meticulous 
                craftsmanship. We work exclusively with heritage tanneries in Italy, 
                selecting only the finest full-grain leathers that develop a beautiful 
                patina over time.
              </p>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                Our commitment to quality extends beyond materials. Each bag undergoes 
                over 200 individual steps in its creation, from pattern cutting to the 
                final hand-stitching. The result is a product that not only looks 
                exceptional but is built to last a lifetime.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-100">
                <div>
                  <h4 className="text-3xl font-light mb-2">100%</h4>
                  <p className="text-xs tracking-widest uppercase text-gray-500">Italian Leather</p>
                </div>
                <div>
                  <h4 className="text-3xl font-light mb-2">200+</h4>
                  <p className="text-xs tracking-widest uppercase text-gray-500">Steps per Bag</p>
                </div>
                <div>
                  <h4 className="text-3xl font-light mb-2">5yr</h4>
                  <p className="text-xs tracking-widest uppercase text-gray-500">Warranty</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Search
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onViewProduct={handleViewProduct}
      />

      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
