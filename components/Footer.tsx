import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'catalog' | 'factory' | 'contact') => void;
  onFilter: (category?: string, showNew?: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onFilter }) => {
  return (
    <footer className="bg-primary pt-16 pb-8 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <h2 className="text-xl font-heading font-bold text-white tracking-tight">KETAN ADITYA</h2>
              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Textile LLP</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Indore's leading manufacturer of girls' wholesale fashion. Delivering excellence and trust directly to retailers nationwide for over 40 years.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center border border-white/5 shadow-lg">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center border border-white/5 shadow-lg">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center border border-white/5 shadow-lg">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              onClick={() => onNavigate('catalog')}
              className="text-sm font-bold text-white uppercase tracking-wider mb-6 cursor-pointer hover:text-accent transition-colors"
            >
              Explore
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <button
                  onClick={() => { onNavigate('catalog'); onFilter(undefined, true); }}
                  className="hover:text-accent transition-all duration-300 flex items-center gap-2 group outline-none"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-accent transition-colors"></span> New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('catalog'); onFilter('Denim Pants'); }}
                  className="hover:text-accent transition-all duration-300 flex items-center gap-2 group outline-none"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-accent transition-colors"></span> Denim Pants
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('catalog'); onFilter('Tops(T-shirt)'); }}
                  className="hover:text-accent transition-all duration-300 flex items-center gap-2 group outline-none"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-accent transition-colors"></span> T-Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('factory')}
                  className="hover:text-accent transition-all duration-300 flex items-center gap-2 group outline-none"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-accent transition-colors"></span> Factory Visit
                </button>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Business Hours</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Mon - Sat</span>
                <span className="text-white">10:00 AM - 08:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Sunday</span>
                <span className="text-accent font-bold">Closed</span>
              </li>
              <li className="pt-2 text-xs text-slate-500 italic">
                *Wholesale and Retail Partners only.
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Contact Factory</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-accent border border-white/5"><MapPin size={20} /></div>
                <span className="text-slate-400 font-medium">Plot No.2, Ready Made Complex, Pardesipura, Indore (M.P.) - 452003</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-accent border border-white/5"><Phone size={20} /></div>
                <span className="text-white font-bold">+91 94797 14198</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-accent border border-white/5"><Mail size={20} /></div>
                <span className="text-slate-400 break-all text-[11px] font-bold">ketanadityatextillellp@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-medium">© 2024 Ketan Aditya Textile LLP. Registered in Indore. All rights reserved.</p>
          <div className="flex gap-8 text-xs text-slate-500 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;