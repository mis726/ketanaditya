import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, InquiryItem, CartContextType } from '../types';

const InquiryContext = createContext<CartContextType | undefined>(undefined);

export const InquiryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToInquiry = (product: Product, quantities: Record<string, number>) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      
      // Filter out zero quantities
      const validQuantities: Record<string, number> = {};
      Object.entries(quantities).forEach(([size, qty]) => {
        if (qty > 0) validQuantities[size] = qty;
      });

      if (Object.keys(validQuantities).length === 0) return prev;

      if (existingIndex > -1) {
        // Overwrite quantities with new selection for better UX in edit mode
        // Or merge? Let's overwrite/update to reflect the modal state exactly
        const newItems = [...prev];
        newItems[existingIndex] = { 
          ...newItems[existingIndex], 
          quantities: validQuantities 
        };
        return newItems;
      }
      
      return [...prev, { product, quantities: validQuantities }];
    });
    
    setIsCartOpen(true);
  };

  const removeFromInquiry = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearInquiry = () => {
    setItems([]);
  };

  const isInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  const getItemQuantities = (productId: string) => {
    return items.find(item => item.product.id === productId)?.quantities;
  }

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <InquiryContext.Provider value={{ items, addToInquiry, removeFromInquiry, clearInquiry, isInCart, getItemQuantities, toggleCart, isCartOpen }}>
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};