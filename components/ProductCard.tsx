
import React from 'react';
import { Plus, Check, Eye, ZoomIn, Lock, Edit2 } from 'lucide-react';
import { Product } from '../types';
import { useInquiry } from '../context/InquiryContext';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onInquiry: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onInquiry }) => {
  const { isInCart, getItemQuantities } = useInquiry();
  const { isAuthenticated } = useAuth();
  const added = isInCart(product.id);

  // Get total pieces if added
  const quantities = getItemQuantities(product.id);
  // Fix: Added explicit types to avoid unknown operator error
  const totalPieces = quantities ? Object.values(quantities).reduce((a: number, b: number) => a + b, 0) : 0;

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

        {/* Added Badge Overlay */}
        {added && (
          <div className="absolute top-2 right-2 z-10 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Check size={10} strokeWidth={4} /> {totalPieces} Pcs
          </div>
        )}

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

        {/* Pricing Logic */}
        <div className="mb-3">
          {isAuthenticated ? (
            <div className="flex items-baseline gap-1 animate-in fade-in duration-500">
              <span className="text-xs text-slate-400">Wholesale:</span>
              <span className="text-lg font-bold text-accent">₹{product.price}</span>
              <span className="text-xs text-slate-400">/pc</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 rounded border border-slate-100 w-fit">
              <Lock size={10} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Request Price</span>
            </div>
          )}
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="py-2 px-3 rounded-md border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors duration-300 flex items-center justify-center gap-1 active:scale-95 transform"
          >
            <Eye size={14} /> View
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onInquiry(product); }}
            className={`py-2 px-3 rounded-md text-xs font-bold flex items-center justify-center gap-1 transition-all duration-300 transform active:scale-95 ${added
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100'
              : 'bg-primary text-white border border-primary hover:bg-slate-800 hover:shadow-md'
              }`}
          >
            {added ? (
              <>
                <Edit2 size={14} /> Edit Qty
              </>
            ) : (
              <>
                <Plus size={14} /> Inquiry
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
