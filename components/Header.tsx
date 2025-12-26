import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              src="https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/ketan-logo.png"
              alt="Ketan Aditya Textile LLP"
              className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => onNavigate('factory')} className={getLinkClass('factory')}>Factory & Legacy</button>
            <button onClick={() => onNavigate('contact')} className={getLinkClass('contact')}>Contact & Inquiry</button>
          </nav>

          <div className="hidden md:flex flex-1"></div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <button onClick={() => { onNavigate('factory'); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-900 rounded-md hover:bg-slate-50">Factory & Legacy</button>
            <button onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-900 rounded-md hover:bg-slate-50">Contact & Inquiry</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;