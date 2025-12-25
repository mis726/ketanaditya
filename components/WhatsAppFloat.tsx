import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
        {/* Pulse effect */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full opacity-50 animate-ping"></div>
        
        <a 
          href="https://wa.me/919479714198"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-2 bg-[#25D366] text-white px-4 py-4 rounded-full shadow-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 group"
        >
          <MessageCircle size={28} fill="currentColor" className="text-white" />
          <span className="font-bold hidden sm:inline-block max-w-0 overflow-hidden group-hover:max-w-xs group-hover:pr-3 group-hover:pl-1 transition-all duration-500 ease-in-out whitespace-nowrap uppercase tracking-widest text-xs">
            Direct Sales Inquiry
          </span>
        </a>
    </div>
  );
};

export default WhatsAppFloat;