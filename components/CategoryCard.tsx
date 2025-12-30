
import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

interface CategoryCardProps {
    display: string;
    images: string[];
    delay?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ display, images, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovered && images.length > 1) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }, 1000); // 1.0 second per image (faster than 1.5s)
        } else {
            setCurrentIndex(0);
        }
        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    return (
        <ScrollReveal delay={delay}>
            <div
                className="group relative rounded-3xl overflow-hidden cursor-default h-[350px] border border-slate-200 shadow-lg transition-all"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background Images with Crossfade and Ken Burns Effect */}
                <div className="absolute inset-0 bg-slate-50">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={img}
                                alt={display}
                                className={`w-full h-full object-cover transition-transform duration-[1000ms] ease-linear ${idx === currentIndex && isHovered ? 'scale-110' : 'scale-100'
                                    }`}
                            />
                        </div>
                    ))}
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/10 transition-all duration-700 z-10" />

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8 text-left z-20">
                    <span className="text-white font-heading font-bold text-2xl md:text-3xl leading-tight drop-shadow-xl">
                        {display}
                    </span>
                </div>
            </div>
        </ScrollReveal>
    );
};

export default CategoryCard;
