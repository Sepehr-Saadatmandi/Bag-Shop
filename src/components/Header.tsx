import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useUser } from '../context/UserContext';
import { PageContent } from '../context/ContentContext';
import Logo from './Logo';
import UserMenu from './user/UserMenu';

interface HeaderProps {
  onCartOpen: () => void;
  onSearchOpen: () => void;
  cartCount: number;
  currentPage: string;
  onNavigate: (page: string) => void;
  pages?: PageContent[];
  onAuthClick?: () => void;
}

export default function Header({ onCartOpen, onSearchOpen, cartCount, currentPage, onNavigate, pages, onAuthClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { siteConfig } = useContent();
  const { user } = useUser();

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
      {siteConfig.showAnnouncement && (
        <div className="bg-black text-white text-center py-2 text-xs tracking-widest uppercase">
          {siteConfig.announcement}
        </div>
      )}

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
            <Logo size="medium" />
          </button>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            <button onClick={onSearchOpen} className="p-2 hover:opacity-60 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {user ? (
              <UserMenu />
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden lg:block p-2 hover:opacity-60 transition-opacity"
                title="Sign In"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
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
            {/* Admin Login Button */}
            <button
              onClick={() => { window.location.hash = '#/admin'; }}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-300 hover:border-black transition-colors"
              title="Admin Login"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="hidden xl:inline">Admin</span>
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
            <div className="pt-4 border-t border-gray-100 space-y-4">
              {/* User Account / Login */}
              {user ? (
                <button
                  onClick={() => {
                    window.location.hash = '#/account';
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm tracking-widest uppercase text-left hover:opacity-60 transition-opacity w-full"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Account
                </button>
              ) : (
                <button
                  onClick={() => {
                    onAuthClick?.();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm tracking-widest uppercase text-left hover:opacity-60 transition-opacity w-full"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Sign In
                </button>
              )}

              {/* Admin */}
              <button
                onClick={() => {
                  window.location.hash = '#/admin';
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm tracking-widest uppercase text-left hover:opacity-60 transition-opacity w-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin Login
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
