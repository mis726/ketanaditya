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
    // State to track which model is currently hovered for the "desaturate other" effect
    const [hoveredModel, setHoveredModel] = useState<string | null>(null);

    // Parallax & Tilt Logic handled directly in the JSX for performance and readability

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
                        From Indore to the World
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                        <span className="block animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            Products that
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-[length:200%_auto] animate-shimmer-text pb-2" style={{ animationDelay: '200ms' }}>
                            sells fast in retail
                        </span>
                        <span className="block text-2xl md:text-4xl font-semibold text-slate-300 mt-2 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            Girls' Clothing Reimagined.
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        Since last 27 years, Ketan Aditya Textiles has helped
                        2500+ retailers, across 4 countries, sell over 3 Cr. units of garments.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                        <Button
                            variant="accent"
                            className="h-14 px-8 text-lg shadow-glow hover:scale-105 transition-transform"
                            onClick={() => onNavigate('contact')}
                            icon={<ArrowRight size={20} />}
                        >
                            Get in Touch
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
                            <span className="text-2xl font-bold text-white">27+</span>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Years Legacy</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white">400+</span>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Live Designs</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white">4</span>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Countries Served</span>
                        </div>
                    </div>
                </div>

                {/* Right: Interactive 3D Model Stack - Parallax & Depth */}
                <div className="hidden lg:flex justify-center items-center relative h-[700px] w-full mt-12">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="relative w-[600px] h-[600px] flex items-center justify-center">
                            {[
                                { id: 'left', img: 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/set.png', z: 10, pos: 'left-0 top-20', scale: 0.85, rotate: -8 },
                                { id: 'center', img: 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/white.png', z: 20, pos: 'left-1/2 -translate-x-1/2 top-10', scale: 1, rotate: 0 },
                                { id: 'right', img: 'https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/Long%20Top%20Alines/Gemini_Generated_Image_trj8qotrj8qotrj8.png', z: 30, pos: 'right-0 bottom-20', scale: 0.9, rotate: 8 }
                            ].map((model) => {
                                const isFocused = hoveredModel === model.id;
                                const isAnyHovered = hoveredModel !== null;

                                // Parallax logic: Front (right): ~12px, Middle (center): ~6px, Back (left): ~3px
                                const moveFactor = model.id === 'right' ? 12 : model.id === 'center' ? 6 : 3;
                                const translateX = mousePos.x * moveFactor;
                                const translateY = mousePos.y * moveFactor;

                                return (
                                    <div
                                        key={model.id}
                                        className={`absolute transition-all duration-700 ease-elegant cursor-pointer ${model.pos}`}
                                        style={{
                                            zIndex: isFocused ? 50 : model.z,
                                            transform: `scale(${isFocused ? 1.08 : model.scale}) 
                                                       translate(${translateX}px, ${translateY}px) 
                                                       rotate(${isFocused ? 0 : model.rotate}deg)
                                                       translateY(${isFocused ? -20 : 0}px)`,
                                            filter: isAnyHovered && !isFocused ? 'grayscale(0.4) blur(1px) brightness(0.7)' : 'none',
                                            willChange: 'transform, filter'
                                        }}
                                        onMouseEnter={() => setHoveredModel(model.id)}
                                        onMouseLeave={() => setHoveredModel(null)}
                                    >
                                        <div className="relative group">
                                            {/* Premium Border and Shadow Container */}
                                            <div className={`
                                                relative w-[280px] h-[400px] md:w-[320px] md:h-[450px] 
                                                rounded-[2.5rem] overflow-hidden border-2 
                                                transition-all duration-500
                                                ${isFocused ? 'border-accent shadow-glow' : 'border-white/20 shadow-2xl'}
                                                bg-primary/40 backdrop-blur-sm
                                            `}>
                                                {/* Glossy Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 z-10 pointer-events-none" />

                                                {/* Main Image */}
                                                <img
                                                    src={model.img}
                                                    alt={`Production Model ${model.id}`}
                                                    className={`
                                                        w-full h-full object-cover transition-transform duration-1000 ease-out
                                                        ${isFocused ? 'scale-110' : 'scale-100'}
                                                    `}
                                                />

                                                {/* Content Overlay - Removed text as requested */}
                                                <div className={`
                                                    absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent 
                                                    transition-opacity duration-500 flex flex-col justify-end p-6
                                                    ${isFocused ? 'opacity-100' : 'opacity-0'}
                                                `}>
                                                </div>
                                            </div>

                                            {/* Subtitle/Badge under the card */}
                                            <div className={`
                                                absolute -bottom-10 left-1/2 -translate-x-1/2 
                                                transition-all duration-500 whitespace-nowrap
                                                ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                            `}>
                                                <span className="px-4 py-1.5 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-widest shadow-glow">
                                                    Factory Direct
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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
                videoSrc="https://tahoismsecifrazmevgm.supabase.co/storage/v1/object/public/products/factory-tour.mp4"
            />
        </section>
    );
};

export default Hero;