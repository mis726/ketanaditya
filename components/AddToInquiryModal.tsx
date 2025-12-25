
import React, { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { Product } from '../types';

interface AddToInquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    initialQuantities?: Record<string, number>;
    onConfirm: (product: Product, quantities: Record<string, number>) => void;
}

const AddToInquiryModal: React.FC<AddToInquiryModalProps> = ({
    isOpen,
    onClose,
    product,
    initialQuantities,
    onConfirm
}) => {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    useEffect(() => {
        if (isOpen && product) {
            // Initialize with existing quantities or 0
            const initial = initialQuantities || {};
            const resetState: Record<string, number> = {};
            (product.sizes || []).forEach(size => {
                resetState[size] = initial[size] || 0;
            });
            setQuantities(resetState);
        }
    }, [isOpen, product, initialQuantities]);

    const updateQuantity = (size: string, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [size]: Math.max(0, (prev[size] || 0) + delta)
        }));
    };

    const handleInputChange = (size: string, val: string) => {
        const num = parseInt(val) || 0;
        setQuantities(prev => ({
            ...prev,
            [size]: Math.max(0, num)
        }));
    };

    // Fixed: Cast Object.values to number[] to ensure reduce results in a number type, fixing unknown operator issues
    const totalPieces = (Object.values(quantities) as number[]).reduce((a, b) => a + b, 0);

    const handleConfirm = () => {
        if (product && totalPieces > 0) {
            onConfirm(product, quantities);
            onClose();
        }
    };

    if (!product) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Select Quantity">
            <div className="flex flex-col gap-6">
                {/* Product Summary */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <img
                        src={product.imageUrl}
                        alt={product.designNumber}
                        className="w-16 h-16 rounded-lg object-cover bg-white shadow-sm"
                    />
                    <div>
                        <h4 className="font-heading font-bold text-slate-900">#{product.designNumber}</h4>
                        <p className="text-sm text-slate-500">{product.category} • {product.fabricType}</p>
                    </div>
                </div>

                {/* Size Grid */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Select Sizes & Quantity</label>
                        <span className="text-xs text-slate-400">Enter quantity in pieces</span>
                    </div>

                    <div className="grid gap-3">
                        {(product.sizes || []).map((size, idx) => {
                            // Get price for this specific size from variants
                            const variant = product.variants?.find(v => v.size === size);
                            const sizePrice = variant?.price;

                            return (
                                <div key={size} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-700">Size {size}</span>
                                        {sizePrice && (
                                            <span className="text-xs text-accent font-bold mt-0.5">₹{sizePrice}/unit</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(size, -1)}
                                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                                            disabled={!quantities[size]}
                                        >
                                            <Minus size={14} />
                                        </button>

                                        <input
                                            type="number"
                                            value={quantities[size] || ''}
                                            onChange={(e) => handleInputChange(size, e.target.value)}
                                            placeholder="0"
                                            className="w-16 h-10 text-center font-bold text-slate-900 bg-slate-50 rounded-md border-transparent focus:border-primary focus:ring-0"
                                        />

                                        <button
                                            onClick={() => updateQuantity(size, 1)}
                                            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-slate-800 shadow-sm"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-slate-500">Total Pieces selected:</span>
                        <span className="text-xl font-bold text-accent">{totalPieces} pcs</span>
                    </div>

                    <Button
                        variant="primary"
                        fullWidth
                        onClick={handleConfirm}
                        disabled={totalPieces === 0}
                        icon={<Check size={18} />}
                        className={totalPieces > 0 ? 'shadow-glow' : ''}
                    >
                        {totalPieces === 0 ? 'Select Quantity' : 'Add to Inquiry List'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddToInquiryModal;
