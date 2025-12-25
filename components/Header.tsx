import React, { useState } from 'react';
import { Menu, MessageSquare, Search, X } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';
import { ViewState } from '../types';
import Button from './Button';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  onSearch: (query: string) => void;
  currentView: ViewState;
  onOpenLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onSearch, currentView, onOpenLogin }) => {
  const { items, toggleCart } = useInquiry();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    if (query.length > 0 && currentView !== 'catalog') {
      onNavigate('catalog');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
    setIsSearchOpen(false);
  };

  const getLinkClass = (view: ViewState) => {
    return `text-sm font-medium transition-colors ${currentView === view ? 'text-primary font-bold' : 'text-slate-600 hover:text-primary'}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">

          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <img
              src="/ketan-logo.png"
              alt="Ketan Aditya Textile LLP"
              className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => onNavigate('catalog')} className={getLinkClass('catalog')}>Full Catalog</button>
            <button onClick={() => onNavigate('factory')} className={getLinkClass('factory')}>Factory & Legacy</button>
            <button onClick={() => onNavigate('contact')} className={getLinkClass('contact')}>Contact & Inquiry</button>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                placeholder="Search Design Number (e.g. #405)"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>

            <button
              onClick={toggleCart}
              className="relative p-2 text-primary hover:bg-slate-100 rounded-full transition-colors group"
            >
              <MessageSquare size={24} className="group-hover:scale-105 transition-transform" />
              {items.length > 0 && (
                <span className="absolute top-1 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-in zoom-in">
                  {items.length}
                </span>
              )}
            </button>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full"
              >
                <Menu size={24} />
              </button>
            </div>

            <div className="hidden lg:block">
              <Button
                variant="primary"
                className="text-xs px-4 py-2.5 shadow-none border-slate-200"
                onClick={onOpenLogin}
              >
                Partner Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4 animate-in slide-in-from-top-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary text-sm"
              placeholder="Search Design Number..."
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <button onClick={() => { onNavigate('catalog'); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-900 rounded-md hover:bg-slate-50">Full Catalog</button>
            <button onClick={() => { onNavigate('factory'); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-900 rounded-md hover:bg-slate-50">Factory & Legacy</button>
            <button onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-900 rounded-md hover:bg-slate-50">Contact & Inquiry</button>
            <button onClick={() => { onOpenLogin(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-primary rounded-md hover:bg-slate-50">Partner Login</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;