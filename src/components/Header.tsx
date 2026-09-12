import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { PageContent } from '../context/ContentContext';

interface HeaderProps {
  onCartOpen: () => void;
  onSearchOpen: () => void;
  cartCount: number;
  currentPage: string;
  onNavigate: (page: string) => void;
  pages?: PageContent[];
}

export default function Header({ onCartOpen, onSearchOpen, cartCount, currentPage, onNavigate, pages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { siteConfig } = useContent();

  // Use provided pages or default navigation
  const navItems = pages || [
    { id: 'shop', title: 'Shop', slug: 'shop' },
    { id: 'new', title: 'New Arrivals', slug: 'new' },
    { id: 'collections', title: 'Collections', slug: 'collections' },
    { id: 'about', title: 'About', slug: 'about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      {/* Announcement bar */}
      <div className="bg-black text-white text-center py-2 text-xs tracking-widest uppercase">
        {siteConfig.announcement}
      </div>

      {/* Main header */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.slug)}
                className={`text-xs tracking-widest uppercase hover:opacity-60 transition-opacity ${
                  currentPage === item.slug
                    ? 'border-b border-black pb-0.5'
                    : ''
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>

          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:mx-auto"
          >
            <h1 className="text-xl lg:text-2xl tracking-[0.3em] uppercase font-light">
              {siteConfig.siteName}
            </h1>
          </button>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            <button onClick={onSearchOpen} className="p-2 hover:opacity-60 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="hidden lg:block p-2 hover:opacity-60 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button onClick={onCartOpen} className="p-2 hover:opacity-60 transition-opacity relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-6 px-6">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.slug);
                  setMobileMenuOpen(false);
                }}
                className="text-sm tracking-widest uppercase text-left hover:opacity-60 transition-opacity"
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
