
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProductCard from './components/ProductCard';
import Modal from './components/Modal';
import Button from './components/Button';
import PageTransition from './components/PageTransition';
import ScrollReveal from './components/ScrollReveal';
import Hero from './components/Hero';
import CategoryCard from './components/CategoryCard';
import FactoryMap from './components/FactoryMap';
import { Product, ViewState } from './types';
import {
    CheckCircle2, MapPin, Phone, Mail, MessageSquare, Clock, UserCheck
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

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
    };

    const navigateTo = (newView: ViewState) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setView(newView);
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
                    </div>
                </ScrollReveal>
                <div className="space-y-16">
                    {(() => {
                        const categoryMapping: Record<string, { search: string, cover: string }> = {
                            'Full Bottom': {
                                search: 'Denim Pants',
                                cover: 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Cover%20Images/full%20bottom.png'
                            },
                            'Capri Bottom': {
                                search: 'Capri',
                                cover: 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Cover%20Images/capri.png'
                            },
                            'Half Bottom': {
                                search: 'Shorts',
                                cover: 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Cover%20Images/shorts.png'
                            },
                            'Skirts': {
                                search: 'Skirts',
                                cover: 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Cover%20Images/skirts.png'
                            },
                            'Sets': {
                                search: 'Set',
                                cover: 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Cover%20Images/sets.png'
                            },
                            'Tops': {
                                search: 'Tops(T-shirt)',
                                cover: 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Cover%20Images/Tops.png'
                            },
                            'Long Tops': {
                                search: 'Aline',
                                cover: 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Cover%20Images/Alines.png'
                            }
                        };

                        const groups = [
                            {
                                title: 'Bottom Wear',
                                items: ['Full Bottom', 'Capri Bottom', 'Half Bottom', 'Skirts']
                            },
                            {
                                title: 'Top Wear & Sets',
                                items: ['Tops', 'Long Tops', 'Sets']
                            }
                        ];

                        return groups.map((group, groupIdx) => (
                            <div key={group.title} className="space-y-8">
                                <ScrollReveal delay={groupIdx * 100}>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                                        <span className="w-12 h-px bg-slate-200"></span>
                                        {group.title}
                                    </h3>
                                </ScrollReveal>
                                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${group.items.length === 3 ? 'lg:flex lg:justify-center' : ''}`}>
                                    {group.items.map((displayLabel, i) => {
                                        const config = categoryMapping[displayLabel];
                                        const inventoryImages = Array.from(new Set(
                                            MASTER_INVENTORY
                                                .filter(p => p.category === config.search)
                                                .map(p => p.imageUrl)
                                        ));

                                        const catImages = [
                                            config.cover,
                                            ...inventoryImages.filter(img => img !== config.cover)
                                        ].slice(0, 10);

                                        return (
                                            <div key={displayLabel} className={group.items.length === 3 ? 'lg:w-[calc(25%-1.5rem)]' : ''}>
                                                <CategoryCard
                                                    display={displayLabel}
                                                    images={catImages}
                                                    delay={i * 50}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ));
                    })()}
                </div>
            </section>
        </PageTransition>
    );



    const ContactView = () => {
        const handleInquirySubmit = () => {
            const message = `*Hello Ketan Aditya Textiles!*%0A%0AI would like to inquire about your products.%0A%0APlease share your catalog and pricing details.%0A%0AThank you!`;
            window.open(`https://wa.me/919479714198?text=${message}`, '_blank');
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
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm overflow-hidden p-3">
                                                <img src="https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/ketan-logo.png" className="w-full h-full object-contain" alt="Ketan Logo" />
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
                                                <p className="text-slate-800 font-bold text-lg break-all">hello@ketanaditya.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        <div className="lg:col-span-7 h-full">
                            <ScrollReveal delay={100}>
                                <FactoryMap />
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
                <section className="relative min-h-[60vh] flex items-center justify-center bg-primary py-24 overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/factory.png"
                            className="w-full h-full object-cover opacity-30 scale-105"
                            alt="Ketan Aditya Factory Floor"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary" />
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-6 animate-fade-in-up">
                            Establishment Since 1998
                        </div>
                        <h1 className="text-5xl md:text-8xl font-heading font-extrabold text-white mb-6 drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            Built for <span className="text-accent">Scale.</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            Over two decades of garment manufacturing excellence, powered by industrial-grade precision and artisanal legacy.
                        </p>
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
                                        <div className="absolute -inset-4 bg-accent/10 rounded-[2rem] blur-2rem group-hover:bg-accent/20 transition-all duration-700"></div>
                                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                                            <img
                                                src="https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/MD1.png"
                                                alt="Nilesh K. Ranka - MD, Ketan Aditya Textiles LLP"
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
                                                <p className="text-3xl font-extrabold leading-tight">27+</p>
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
                                            Under the direction of <span className="text-primary font-bold">Nilesh Ranka</span>, the company has grown into a technologically advanced powerhouse, seamlessly blending twenty-seven years of artisanal wisdom with high-speed automated production systems.
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
                                    <p className="text-3xl font-extrabold text-accent mb-1">1900+</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Customers</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <p className="text-3xl font-extrabold text-accent mb-1">10k+</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Output</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-elevated h-[400px] border border-slate-200">
                            <img src="https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/factory-building.jpg" className="w-full h-full object-cover" alt="Ketan Aditya Textile Building" />
                        </div>
                    </div>
                </section>
            </PageTransition>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans text-slate-900">
            <Header onNavigate={navigateTo} currentView={view} />
            <main className="flex-grow">
                {view === 'home' && <HomeView />}
                {view === 'factory' && <FactoryView />}
                {view === 'contact' && <ContactView />}
            </main>
            <Footer onNavigate={navigateTo} />
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

                                {/* Size & Price Table - Always Visible */}
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
                            </div>
                            <div className="mt-auto">
                                <Button
                                    variant="primary"
                                    fullWidth
                                    className="h-14 text-lg shadow-elevated flex items-center justify-center gap-2"
                                    onClick={() => {
                                        const message = `*Inquiry for ${selectedProduct.designNumber}*%0A%0ACategory: ${selectedProduct.category}%0AFabric: ${selectedProduct.fabricType}%0A%0AHello, I would like to inquire about this design.`;
                                        window.open(`https://wa.me/919479714198?text=${message}`, '_blank');
                                    }}
                                >
                                    <MessageSquare size={20} /> Direct Inquiry
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <MainContent />
    );
};

export default App;
