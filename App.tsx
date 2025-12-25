
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProductCard from './components/ProductCard';
import SkeletonCard from './components/SkeletonCard';
import InquiryDrawer from './components/InquiryDrawer';
import Modal from './components/Modal';
import AddToInquiryModal from './components/AddToInquiryModal';
import Button from './components/Button';
import FilterSidebar from './components/FilterSidebar';
import PageTransition from './components/PageTransition';
import ScrollReveal from './components/ScrollReveal';
import Hero from './components/Hero';
import { InquiryProvider, useInquiry } from './context/InquiryContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Product, ViewState } from './types';
import {
    ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Factory, Filter, Lock, Send,
    MapPin, Phone, Mail, Trash2, Smartphone, Download, Scissors, Layers, Box,
    Truck, Ruler, Activity, Palette, Weight, Info, Tag, Maximize2, X, SlidersHorizontal,
    ArrowUpDown, Search, MessageSquare, Clock, Building2, UserCheck, Package
} from 'lucide-react';

// --- DATA ENGINE: PRODUCT DATA LOADER ---
// Import product data from external JSON file
import productsData from './products.json';

// Type definition for raw product data from JSON
interface RawProductData {
    sr_no: number;
    category: string;
    subcategory: string;
    design_name: string;
    variants: Array<{ size: string; price: number }>;
    prints_colour: string;
    style: string;
    image_url: string;
}

// Cast imported data to proper type
const RAW_PRODUCT_DATA: RawProductData[] = productsData as RawProductData[];

// Transform raw JSON data into the application's internal Product type
const MASTER_INVENTORY: Product[] = RAW_PRODUCT_DATA.map(raw => ({
    id: String(raw.sr_no),
    designNumber: raw.design_name,
    category: raw.category,
    imageUrl: raw.image_url,
    fabricType: raw.subcategory,
    ageGroup: raw.variants[0].size, // Mapping size range to age group field for UI
    width: 'Standard',
    gsm: 160,
    minOrderQty: 1,
    price: raw.variants[0].price,
    isNewArrival: raw.style === 'Fancy',
    sizes: raw.variants.map(v => v.size),
    colors: [raw.prints_colour],
    variants: raw.variants // Include full variant data with size-specific pricing
}));

const MainContent: React.FC = () => {
    const [view, setView] = useState<ViewState>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [inquiryModalProduct, setInquiryModalProduct] = useState<Product | null>(null);

    const { addToInquiry, items, isInCart, getItemQuantities, removeFromInquiry } = useInquiry();
    const { isAuthenticated, login } = useAuth();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Catalog State
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high'>('newest');

    const [filters, setFilters] = useState({
        categories: [] as string[],
        ageGroups: [] as string[],
        fabrics: [] as string[],
        maxPrice: 2000,
        showOnlyNewArrivals: false
    });

    const filteredProducts = useMemo(() => {
        let result = MASTER_INVENTORY;

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p => p.designNumber.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        }

        if (filters.categories.length > 0) result = result.filter(p => filters.categories.includes(p.category));
        if (filters.ageGroups.length > 0) result = result.filter(p => filters.ageGroups.includes(p.ageGroup));
        if (filters.showOnlyNewArrivals) result = result.filter(p => p.isNewArrival);

        result = result.filter(p => (p.price || 0) <= filters.maxPrice);

        return result.sort((a, b) => {
            if (sortBy === 'price_low') return (a.price || 0) - (b.price || 0);
            if (sortBy === 'price_high') return (b.price || 0) - (a.price || 0);
            return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        });
    }, [filters, searchQuery, sortBy]);

    useEffect(() => {
        if (view === 'catalog') {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 400);
            return () => clearTimeout(timer);
        }
    }, [view, searchQuery, filters, sortBy]);

    const removeFilter = (type: keyof typeof filters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [type]: (prev[type] as string[]).filter(item => item !== value)
        }));
    };

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleInquiryClick = (product: Product) => {
        setInquiryModalProduct(product);
    };

    const navigateTo = (newView: ViewState) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setView(newView);
    };

    const handleFooterFilter = (category?: string, showNew?: boolean) => {
        setFilters({
            categories: category ? [category] : [],
            ageGroups: [],
            fabrics: [],
            maxPrice: 2000,
            showOnlyNewArrivals: showNew || false
        });
        setSearchQuery('');
    };

    const HomeView = () => (
        <PageTransition>
            <Hero
                products={MASTER_INVENTORY.slice(0, 5)}
                onNavigate={navigateTo}
                onOpenWhatsApp={() => window.open('https://wa.me/919479714198', '_blank')}
            />
            <section className="py-20 bg-background max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-primary">Key Categories</h2>
                            <p className="text-slate-500 mt-1">Direct access to our most requested production lines.</p>
                        </div>
                        <Button variant="ghost" onClick={() => navigateTo('catalog')}>View All Collection <ArrowRight size={16} className="ml-1" /></Button>
                    </div>
                </ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from(new Set(MASTER_INVENTORY.map(p => p.category))).slice(0, 6).map((catName, i) => {
                        const catProd = MASTER_INVENTORY.find(p => p.category === catName);
                        return (
                            <ScrollReveal key={catName} delay={i * 50}>
                                <div
                                    className="group relative rounded-2xl overflow-hidden cursor-pointer h-48 border border-slate-200 shadow-sm transition-all hover:shadow-elevated"
                                    onClick={() => { setFilters(f => ({ ...f, categories: [catName] })); navigateTo('catalog'); }}
                                >
                                    <img src={catProd?.imageUrl} alt={catName} className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/20 transition-all duration-500" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                        <span className="text-white font-heading font-bold text-base leading-tight drop-shadow-md">{catName}</span>
                                        <span className="text-accent text-[10px] font-bold uppercase tracking-widest mt-2 bg-white px-2 py-0.5 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">View Designs</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )
                    })}
                </div>
            </section>
        </PageTransition>
    );

    const CatalogView = () => {
        const activeFilterCount = filters.categories.length + filters.ageGroups.length + filters.fabrics.length;

        return (
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 flex items-start gap-8">
                    <FilterSidebar
                        filters={filters}
                        setFilters={setFilters}
                        isOpenMobile={isMobileFilterOpen}
                        setIsOpenMobile={setIsMobileFilterOpen}
                        totalResults={filteredProducts.length}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        masterCategories={Array.from(new Set(MASTER_INVENTORY.map(p => p.category)))}
                    />

                    <div className="flex-1 w-full">
                        <div className="sticky top-16 md:top-20 z-30 -mx-4 px-4 py-3 md:py-4 bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm mb-6">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm md:text-base font-bold text-primary">
                                        {filteredProducts.length} <span className="text-slate-400 font-medium">Designs Matching</span>
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsMobileFilterOpen(true)}
                                        className="lg:hidden flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all"
                                    >
                                        <Filter size={14} /> Filter & Sort
                                    </button>
                                    <div className="hidden md:flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order</span>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as any)}
                                            className="bg-white border border-slate-200 text-slate-700 py-1.5 px-3 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer hover:border-slate-300"
                                        >
                                            <option value="newest">Style Priority</option>
                                            <option value="price_low">Price: Low to High</option>
                                            <option value="price_high">Price: High to Low</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <PageTransition>
                            {isLoading ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <SkeletonCard key={n} />)}
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onQuickView={handleQuickView}
                                            onInquiry={handleInquiryClick}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-slate-200 shadow-sm px-6">
                                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-6">
                                        <Search size={40} />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">No results for filters</h3>
                                    <Button variant="primary" onClick={() => setFilters({ categories: [], ageGroups: [], fabrics: [], maxPrice: 2000 })}>Reset Filters</Button>
                                </div>
                            )}
                        </PageTransition>
                    </div>
                </div>
            </div>
        );
    };

    const ContactView = () => {
        const handleInquirySubmit = () => {
            if (items.length === 0) {
                // If no items, send a general inquiry message
                const message = `*Hello Ketan Aditya Textiles!*%0A%0AI would like to inquire about your products.%0A%0APlease share your catalog and pricing details.%0A%0AThank you!`;
                window.open(`https://wa.me/919479714198?text=${message}`, '_blank');
                return;
            }

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

                // Get price information if available
                let priceInfo = '';
                if (product.variants && product.variants.length > 0) {
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

            window.open(`https://wa.me/919479714198?text=${fullMessage}`, '_blank');
        };

        return (
            <PageTransition>
                <section className="bg-primary text-white py-24 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-accent mb-6">
                                <UserCheck size={12} /> Direct Factory Link
                            </div>
                            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight">
                                Scale Your Retail <br /><span className="text-slate-400">Directly with Us.</span>
                            </h1>
                            <p className="text-lg text-slate-300 font-medium">
                                Located in Indore's Ready Made Complex, we bridge the gap between high-quality manufacturing and profitable retail.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-5">
                            <ScrollReveal>
                                <div className="bg-white rounded-3xl p-8 shadow-elevated border border-slate-100 h-full">
                                    <h3 className="text-2xl font-heading font-bold text-primary mb-10">Office & Showroom</h3>
                                    <div className="space-y-12">
                                        <div className="flex gap-6 group">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary shrink-0 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                                <MapPin size={28} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Our Location</h4>
                                                <p className="text-slate-800 font-bold leading-relaxed text-lg">
                                                    Plot No.2, Ready Made Complex, <br />
                                                    Pardesipura, Indore (M.P.) - 452003
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 group">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary shrink-0 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                                <Phone size={28} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">WhatsApp/Call</h4>
                                                <p className="text-slate-800 font-bold text-2xl tracking-tight">+91 94797 14198</p>
                                                <p className="text-xs text-slate-500 mt-1 font-bold flex items-center gap-1 uppercase tracking-tighter"><Clock size={12} /> Mon-Sat: 10AM - 8PM</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 group">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary shrink-0 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                                <Mail size={28} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Corporate Email</h4>
                                                <p className="text-slate-800 font-bold text-lg break-all">ketanadityatextillellp@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        <div className="lg:col-span-7">
                            <ScrollReveal delay={100}>
                                <div className="bg-white rounded-3xl overflow-hidden shadow-elevated border border-slate-100 p-8">
                                    <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-6">
                                        <h3 className="text-2xl font-heading font-bold text-primary">Consolidated Inquiry</h3>
                                        <div className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold">
                                            {items.length} Designs Selected
                                        </div>
                                    </div>
                                    {items.length === 0 ? (
                                        <div className="py-20 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                            <h4 className="font-bold text-slate-800 mb-2">No selections for inquiry</h4>
                                            <p className="text-slate-500 text-sm mb-8">Add designs from our catalog to request bulk pricing.</p>
                                            <Button variant="primary" onClick={() => navigateTo('catalog')}>Start Browsing</Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 mb-10 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                            {items.map((item) => {
                                                const total = (Object.values(item.quantities) as number[]).reduce((a, b) => a + b, 0);
                                                return (
                                                    <div key={item.product.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                        <img src={item.product.imageUrl} className="h-16 w-12 rounded-lg object-cover bg-white" />
                                                        <div className="flex-1">
                                                            <p className="text-[10px] font-bold text-accent uppercase">{item.product.designNumber}</p>
                                                            <h5 className="font-bold text-primary">{item.product.category}</h5>
                                                            <p className="text-xs text-slate-500">{total} Pieces in list</p>
                                                        </div>
                                                        <button onClick={() => removeFromInquiry(item.product.id)} className="p-2 text-slate-300 hover:text-rose-500"><Trash2 size={18} /></button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    <div className="mt-8 bg-primary rounded-3xl p-8 text-white relative overflow-hidden group">
                                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                            <div className="text-center md:text-left">
                                                <h4 className="text-xl font-bold mb-2">Request Final Quote</h4>
                                                <p className="text-slate-400 text-sm">Our sales team handles all pricing via WhatsApp.</p>
                                            </div>
                                            <Button
                                                variant="accent"
                                                className="h-14 px-12 shadow-glow font-bold text-white text-lg"
                                                onClick={handleInquirySubmit}
                                                icon={<Send size={22} />}
                                            >
                                                Send to WhatsApp
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </PageTransition>
        );
    };

    const FactoryView = () => {
        return (
            <PageTransition>
                <section className="relative min-h-[50vh] flex items-center justify-center bg-primary py-24">
                    <div className="absolute inset-0">
                        <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-4xl md:text-7xl font-heading font-extrabold text-white mb-6">Built for <span className="text-accent">Scale.</span></h1>
                        <p className="text-slate-300 text-lg md:text-xl font-medium">Over four decades of garment manufacturing excellence in Central India.</p>
                    </div>
                </section>

                {/* --- LEADERSHIP & LEGACY SECTION --- */}
                <section className="py-24 bg-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.02] -skew-x-12 transform translate-x-1/2"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                                {/* MD Photo with Editorial Styling */}
                                <div className="lg:col-span-5">
                                    <div className="relative group">
                                        <div className="absolute -inset-4 bg-accent/10 rounded-[2rem] blur-2xl group-hover:bg-accent/20 transition-all duration-700"></div>
                                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                                            <img
                                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                                                alt="Nilesh Ranka - MD, Ketan Aditya Textiles LLP"
                                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                                <p className="text-2xl font-heading font-bold mb-1">Nilesh Ranka</p>
                                                <p className="text-xs font-bold uppercase tracking-widest text-accent/90">Managing Director</p>
                                            </div>
                                        </div>
                                        {/* Decorative Element */}
                                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-full flex items-center justify-center shadow-glow animate-pulse">
                                            <div className="text-white text-center">
                                                <p className="text-3xl font-extrabold leading-tight">40+</p>
                                                <p className="text-[8px] font-bold uppercase tracking-tighter">Years Legacy</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="lg:col-span-7 space-y-8">
                                    <div>
                                        <h4 className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">Leadership & Legacy</h4>
                                        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary leading-tight">
                                            Tradition Meets <br />
                                            <span className="text-accent italic">Modern Precision.</span>
                                        </h2>
                                    </div>

                                    <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                                        <p>
                                            "Our journey at Ketan Aditya Textiles LLP has always been about more than just manufacturing garments; it's about building a legacy of trust and quality that spans generations. We started with a vision to revolutionize the girls' fashion industry in Central India, and today, that vision breathes through every stitch we create."
                                        </p>
                                        <p className="font-medium italic border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-xl">
                                            "We don't just supply products; we empower retail partners with consistent quality, competitive pricing, and designs that lead the market."
                                        </p>
                                        <p>
                                            Under the direction of <span className="text-primary font-bold">Nilesh Ranka</span>, the company has grown into a technologically advanced powerhouse, seamlessly blending forty years of artisanal wisdom with high-speed automated production systems.
                                        </p>
                                    </div>

                                    <div className="pt-8 flex items-center gap-6">
                                        <div className="h-px bg-slate-200 flex-1"></div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-serif text-3xl text-primary/40 -mb-2">N. Ranka</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Signature</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
                <section className="py-24 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-primary mb-6">Indore's Manufacturing Powerhouse</h2>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                Ketan Aditya Textiles LLP operates from the heart of the Ready Made Complex in Pardesipura. Our production facility is designed for high-volume supply, catering to major retail hubs across the country.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <p className="text-3xl font-extrabold text-accent mb-1">200+</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Machines</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <p className="text-3xl font-extrabold text-accent mb-1">5k+</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Output</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-elevated h-[400px] border border-slate-200">
                            <img src="/factory-building.jpg" className="w-full h-full object-cover" alt="Ketan Aditya Textile Building" />
                        </div>
                    </div>
                </section>
            </PageTransition>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans text-slate-900">
            <Header onNavigate={navigateTo} onSearch={setSearchQuery} currentView={view} onOpenLogin={() => setIsLoginModalOpen(true)} />
            <InquiryDrawer />
            <main className="flex-grow">
                {view === 'home' && <HomeView />}
                {view === 'catalog' && <CatalogView />}
                {view === 'factory' && <FactoryView />}
                {view === 'contact' && <ContactView />}
            </main>
            <Footer onNavigate={navigateTo} onFilter={handleFooterFilter} />
            <WhatsAppFloat />

            <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title="Design Details">
                {selectedProduct && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-100 relative bg-slate-50">
                            {/* Cinematic Background Fill */}
                            <div
                                className="absolute inset-0 z-0 bg-cover bg-center scale-125 opacity-20 blur-xl"
                                style={{ backgroundImage: `url(${selectedProduct.imageUrl})` }}
                            />
                            {/* Main Product Image */}
                            <img
                                src={selectedProduct.imageUrl}
                                className="relative z-10 w-full h-full object-contain p-2 drop-shadow-xl"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col">
                            <div className="border-b border-slate-100 pb-6 mb-6">
                                <h2 className="text-3xl font-heading font-extrabold text-primary">{selectedProduct.designNumber}</h2>
                                <div className="flex flex-wrap items-center gap-2 mt-4">
                                    <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{selectedProduct.category}</span>
                                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{selectedProduct.fabricType}</span>
                                    {selectedProduct.isNewArrival && <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-glow">Fancy Style</span>}
                                </div>
                            </div>
                            <div className="space-y-6 mb-10">
                                <div>
                                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Category Style</p>
                                    <p className="font-bold text-slate-800">{selectedProduct.isNewArrival ? 'Fancy' : 'Core'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Stock Status</p>
                                    <p className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 size={14} /> Fresh Stock</p>
                                </div>

                                {/* Size & Price Table */}
                                {isAuthenticated ? (
                                    <div>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-3">Wholesale Pricing by Size</p>
                                        <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-inner">
                                            <div className="grid grid-cols-2 gap-px bg-slate-200">
                                                <div className="bg-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">Size</div>
                                                <div className="bg-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-right">Price/Unit</div>
                                            </div>
                                            {(() => {
                                                const rawProduct = RAW_PRODUCT_DATA.find(p => String(p.sr_no) === selectedProduct.id);
                                                return rawProduct?.variants.map((variant, idx) => (
                                                    <div key={idx} className="grid grid-cols-2 gap-px bg-slate-200">
                                                        <div className="bg-white px-4 py-3 font-bold text-slate-800">{variant.size}</div>
                                                        <div className="bg-white px-4 py-3 font-bold text-accent text-right">₹{variant.price}</div>
                                                    </div>
                                                ));
                                            })()}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Available Sizes</p>
                                        <p className="font-bold text-slate-800">{selectedProduct.sizes?.join(', ')}</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-auto">
                                <Button variant="primary" fullWidth className="h-14 text-lg shadow-elevated" onClick={() => { setSelectedProduct(null); handleInquiryClick(selectedProduct); }}>Add to Selection</Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <AddToInquiryModal
                isOpen={!!inquiryModalProduct}
                onClose={() => setInquiryModalProduct(null)}
                product={inquiryModalProduct}
                initialQuantities={inquiryModalProduct ? getItemQuantities(inquiryModalProduct.id) : undefined}
                onConfirm={addToInquiry}
            />

            <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} title="Partner Verification">
                <form onSubmit={(e) => { e.preventDefault(); if (login(loginPassword)) { setIsLoginModalOpen(false); setLoginPassword(''); setLoginError(''); } else { setLoginError('Incorrect Access Code.'); } }} className="space-y-6">
                    <p className="text-sm text-slate-500 font-medium">Verify your partner status to unlock exclusive factory-direct pricing across all catalogs.</p>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wholesale Access Code</label>
                        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Enter code (admin)" autoFocus />
                        {loginError && <p className="text-xs text-red-500 font-bold">{loginError}</p>}
                    </div>
                    <Button variant="primary" fullWidth type="submit" className="h-12">Authorize Session</Button>
                </form>
            </Modal>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <InquiryProvider>
                <MainContent />
            </InquiryProvider>
        </AuthProvider>
    );
};

export default App;
