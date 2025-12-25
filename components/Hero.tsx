import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Play, TrendingUp, CheckCircle2 } from 'lucide-react';
import Button from './Button';
import VideoModal from './VideoModal';
import { Product, ViewState } from '../types';

interface HeroProps {
    products: Product[]; // Pass a few products for the 3D stack
    onNavigate: (view: ViewState) => void;
    onOpenWhatsApp: () => void;
}

const Hero: React.FC<HeroProps> = ({ products, onNavigate, onOpenWhatsApp }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle Mouse Move for Spotlight & Tilt
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
            const y = (e.clientY / innerHeight) * 2 - 1; // -1 to 1
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // 3D Card Tilt Logic - Reduced intensity for premium feel
    const tiltX = mousePos.y * -8; // Rotate X axis (up/down tilt)
    const tiltY = mousePos.x * 8;  // Rotate Y axis (left/right tilt)

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center overflow-hidden bg-primary perspective-1000"
            style={{ perspective: '1000px' }}
        >
            {/* 1. Dynamic Background Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Spotlight Gradient - Follows Mouse */}
                <div
                    className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-blue-500/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none transition-transform duration-200 ease-out z-20 mix-blend-screen"
                    style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${mousePos.x * 300}px), calc(-50% + ${mousePos.y * 300}px))`
                    }}
                />

                {/* Video Background - Static */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40 z-10" />
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50">
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-working-on-a-piece-of-cloth-42173-large.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* 2. Content Layer */}
            <div className="relative z-30 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Typography & CTAs - Static */}
                <div className="space-y-8 max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-white/10 text-xs font-bold text-accent tracking-wider uppercase animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        Direct From Indore
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                        <span className="block animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            Crafting
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-[length:200%_auto] animate-shimmer-text pb-2" style={{ animationDelay: '200ms' }}>
                            Excellence.
                        </span>
                        <span className="block text-2xl md:text-4xl font-semibold text-slate-300 mt-2 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            Wholesale Girls' Wear Reimagined.
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        Join 2,500+ retailers scaling their business with our factory-direct pricing and premium quality manufacturing.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                        <Button
                            variant="accent"
                            className="h-14 px-8 text-lg shadow-glow hover:scale-105 transition-transform"
                            onClick={() => onNavigate('catalog')}
                            icon={<ArrowRight size={20} />}
                        >
                            Explore Catalog
                        </Button>
                        <Button
                            variant="secondary"
                            className="h-14 px-8 text-lg bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-md"
                            onClick={() => setIsVideoModalOpen(true)}
                            icon={<Play size={18} fill="currentColor" className="opacity-50" />}
                        >
                            Watch Factory Tour
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-8 border-t border-white/10 flex gap-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white">40+</span>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Years Legacy</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white">500+</span>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Live Designs</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white">15</span>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">States Served</span>
                        </div>
                    </div>
                </div>

                {/* Right: Interactive 3D Card Stack - Rotates in place */}
                <div className="hidden lg:flex justify-center items-center relative h-[600px] perspective-1000">
                    <div
                        className="relative w-[340px] h-[480px] transition-transform duration-100 ease-out"
                        style={{
                            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {/* Back Card (Decoration) */}
                        <div
                            className="absolute inset-0 bg-slate-800 rounded-2xl shadow-2xl transform translate-z-[-50px] translate-x-12 translate-y-12 opacity-40 border border-white/10"
                            style={{ transform: 'translateZ(-60px) translateX(60px) translateY(40px)' }}
                        ></div>

                        {/* Middle Card (Product 2) */}
                        {products[1] && (
                            <div
                                className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden transform border border-white/20 animate-float-delayed"
                                style={{ transform: 'translateZ(-30px) translateX(30px) translateY(20px)' }}
                            >
                                <img src={products[1].imageUrl} className="w-full h-full object-cover opacity-60" alt="Secondary" />
                                <div className="absolute inset-0 bg-black/40"></div>
                            </div>
                        )}

                        {/* Main Card (Product 1) */}
                        {products[0] && (
                            <div
                                className="absolute inset-0 bg-white rounded-2xl shadow-glow overflow-hidden transform animate-float border border-white/20 group cursor-pointer"
                                style={{ transform: 'translateZ(20px)' }}
                                onClick={() => onNavigate('catalog')}
                            >
                                <img src={products[0].imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Main" />

                                {/* Glass Overlay on Card */}
                                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                    <div className="glass-card p-3 rounded-xl border-white/30 backdrop-blur-md flex items-center justify-between">
                                        <div>
                                            <p className="text-accent text-[10px] font-bold uppercase tracking-wider mb-1">Trending Now</p>
                                            <h3 className="text-white font-bold text-lg">#{products[0].designNumber}</h3>
                                            <p className="text-slate-300 text-xs">{products[0].category}</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center font-bold shadow-lg">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        )}

                        {/* Floating Elements around stack */}
                        <div
                            className="absolute -top-10 -left-10 glass-card p-3 rounded-lg flex items-center gap-2 animate-bounce shadow-lg"
                            style={{ transform: 'translateZ(50px)', animationDuration: '3s' }}
                        >
                            <div className="bg-green-500 rounded-full p-1">
                                <CheckCircle2 size={12} className="text-white" />
                            </div>
                            <span className="text-white text-xs font-bold">In Stock</span>
                        </div>

                        <div
                            className="absolute top-1/2 -right-16 glass-card p-3 rounded-lg flex flex-col items-center gap-1 shadow-lg animate-pulse"
                            style={{ transform: 'translateZ(40px)' }}
                        >
                            <TrendingUp size={16} className="text-accent" />
                            <span className="text-white text-[10px] font-bold">Top Seller</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none z-20" />

            {/* Video Modal */}
            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoSrc="/factory-tour.mp4"
            />
        </section>
    );
};

export default Hero;