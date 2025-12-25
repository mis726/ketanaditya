import React from 'react';
import { X, Trash2, Send, MessageSquare } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const InquiryDrawer: React.FC = () => {
  const { isCartOpen, toggleCart, items, removeFromInquiry, clearInquiry } = useInquiry();
  const { isAuthenticated } = useAuth();

  const handleSendInquiry = () => {
    if (items.length === 0) return;

    // Create a well-formatted WhatsApp message
    const greeting = `*🛍️ B2B INQUIRY - KETAN ADITYA TEXTILES*%0A`;
    const separator = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━%0A%0A`;

    // Format each product with detailed information
    const productDetails = items.map((item, idx) => {
      const product = item.product;

      // Calculate total quantity across all sizes
      const totalQty = (Object.values(item.quantities) as number[]).reduce((sum, qty) => sum + qty, 0);

      // Format size breakdown
      const sizeBreakdown = Object.entries(item.quantities)
        .filter(([_, qty]) => (qty as number) > 0)
        .map(([size, qty]) => `   • Size ${size}: ${qty} pcs`)
        .join('%0A');

      // Get price information if available and authenticated
      let priceInfo = '';
      if (isAuthenticated && product.variants && product.variants.length > 0) {
        const prices = product.variants.map(v => `₹${v.price}`).join(', ');
        priceInfo = `%0A   💰 Price Range: ${prices}`;
      }

      return `*${idx + 1}. ${product.designNumber}*%0A` +
        `   📦 Category: ${product.category}%0A` +
        `   🧵 Fabric: ${product.fabricType}%0A` +
        `   📊 Total Quantity: *${totalQty} pieces*%0A` +
        `%0A   *Size Breakdown:*%0A${sizeBreakdown}${priceInfo}`;
    }).join('%0A%0A');

    // Calculate grand total
    const grandTotal = items.reduce((sum, item) => {
      return sum + (Object.values(item.quantities) as number[]).reduce((s, q) => s + q, 0);
    }, 0);

    const footer = `%0A%0A━━━━━━━━━━━━━━━━━━━━━━━━━━━━%0A` +
      `*📋 SUMMARY*%0A` +
      `Total Designs: ${items.length}%0A` +
      `Total Pieces: *${grandTotal}*%0A%0A` +
      `_Please provide your best wholesale rates for the above inquiry._`;

    const fullMessage = greeting + separator + productDetails + footer;
    const whatsappUrl = `https://wa.me/919479714198?text=${fullMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-500 ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-primary/40 backdrop-blur-md transition-opacity duration-500 ease-elegant ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={toggleCart}
      />

      <div className={`absolute inset-y-0 right-0 max-w-md w-full flex transition-transform duration-500 ease-elegant transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full w-full bg-surface shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50 backdrop-blur-sm">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-3">
                Your Selection <span className="bg-accent text-white text-xs px-2.5 py-1 rounded-full shadow-glow">{items.length}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-bold uppercase tracking-widest">B2B Lead Generation</p>
            </div>
            <button
              onClick={toggleCart}
              className="p-2.5 text-slate-400 hover:text-primary rounded-2xl hover:bg-white border border-transparent hover:border-slate-100 transition-all duration-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {items.length === 0 ? (
              <div className={`h-full flex flex-col items-center justify-center text-center space-y-6 transition-all duration-700 delay-100 ${isCartOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 border border-slate-200">
                  <MessageSquare size={40} />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-slate-900">List is empty</p>
                  <p className="text-sm text-slate-500 max-w-[240px] mx-auto font-medium">Add designs from our curated factory catalog to begin your inquiry.</p>
                </div>
                <Button variant="secondary" onClick={toggleCart} className="mt-4 px-10">Return to Catalog</Button>
              </div>
            ) : (
              items.map((item, i) => {
                const totalQty = (Object.values(item.quantities) as number[]).reduce((a: number, b: number) => a + b, 0);
                return (
                  <div
                    key={item.product.id}
                    className={`flex gap-5 p-4 bg-white border border-slate-100 rounded-3xl hover:border-primary/20 transition-all duration-500 shadow-sm items-center group ${isCartOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    style={{ transitionDelay: `${i * 50 + 100}ms` }}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.designNumber}
                      className="w-20 h-28 object-cover rounded-2xl bg-slate-50 flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900 truncate text-lg">{item.product.designNumber}</h4>
                          <p className="text-[10px] font-bold text-accent uppercase tracking-wider">{item.product.category}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(item.quantities).map(([size, qty]) => (
                          <span key={size} className="inline-flex items-center text-[10px] font-black bg-primary/5 text-primary px-2 py-1 rounded-lg border border-primary/10">
                            {size}: {qty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromInquiry(item.product.id)}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-8 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md">
              <div className="space-y-4">
                <Button
                  variant="accent"
                  fullWidth
                  onClick={handleSendInquiry}
                  icon={<Send size={20} />}
                  className="h-14 shadow-glow text-lg font-bold"
                >
                  Submit WhatsApp Inquiry
                </Button>
                <button
                  onClick={clearInquiry}
                  className="w-full text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
                >
                  Clear All Selection
                </button>
              </div>
              <p className="text-[10px] font-bold text-slate-400 text-center mt-6 uppercase tracking-tight">
                Direct B2B Communication with Indore Factory
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryDrawer;