export interface Product {
  id: string;
  designNumber: string;
  category: string;
  imageUrl: string;
  hoverImageUrl?: string; // For the close-up effect
  fabricType: string;
  ageGroup: string; // e.g., "2-5 Yrs"
  width: string;
  gsm: number;
  minOrderQty: number;
  isNewArrival?: boolean;
  sizes?: string[];
  colors?: string[];
  price?: number;
  variants?: Array<{ size: string; price: number }>; // Size-specific pricing
}

export interface InquiryItem {
  product: Product;
  quantities: Record<string, number>; // Size -> Quantity mapping
}

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';

export interface CartContextType {
  items: InquiryItem[];
  addToInquiry: (product: Product, quantities: Record<string, number>) => void;
  removeFromInquiry: (productId: string) => void;
  clearInquiry: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantities: (productId: string) => Record<string, number> | undefined;
  toggleCart: () => void;
  isCartOpen: boolean;
}

export type ViewState = 'home' | 'factory' | 'contact';