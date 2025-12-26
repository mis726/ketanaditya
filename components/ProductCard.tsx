import React from 'react';
import { Eye, ZoomIn } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  return (
    <div className="group relative bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-elevated transition-all duration-700 ease-elegant flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Image Area */}
      <div
        className="relative aspect-square bg-slate-50 overflow-hidden cursor-zoom-in"
        onClick={() => onQuickView(product)}
      >
        {/* Cinematic Background Fill */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center scale-110 opacity-15 blur-lg transition-transform duration-700 group-hover:scale-125"
          style={{ backgroundImage: `url(${product.imageUrl})` }}
        />
        {/* Main Image */}
        <img
          src={product.imageUrl}
          alt={product.designNumber}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-elegant opacity-100 group-hover:opacity-0 p-1 relative z-10"
        />

        {/* Hover/Close-up Image */}
        <img
          src={product.hoverImageUrl || product.imageUrl}
          alt={`${product.designNumber} close up`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-elegant scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 p-1 relative z-10"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="bg-accent/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              NEW
            </span>
          )}
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            {product.ageGroup}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 ease-elegant flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-elegant">
            <ZoomIn size={20} className="text-slate-800" />
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-3 flex flex-col flex-1 bg-white relative z-20">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-heading font-extrabold text-lg text-slate-900 tracking-tight">{product.designNumber}</h3>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
          <span>{product.category}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>{product.fabricType}</span>
        </div>

        {/* Pricing Logic - Always Visible */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1 animate-in fade-in duration-500">
            <span className="text-xs text-slate-400">Wholesale:</span>
            <span className="text-lg font-bold text-accent">₹{product.price}</span>
            <span className="text-xs text-slate-400">/pc</span>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="mt-auto">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="w-full py-2.5 px-4 rounded-md bg-primary text-white text-xs font-bold hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 transform shadow-sm hover:shadow-md"
          >
            <Eye size={16} /> View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
