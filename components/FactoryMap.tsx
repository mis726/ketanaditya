import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const FactoryMap: React.FC = () => {
    // Factory Center: 22.750595, 75.865059
    // Map URL with Satellite mode (t=k) and Zoom level 20 (z=20)
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d184.006325!2d75.865059!3d22.750595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&hl=en&t=k";

    // SVG Points calculated relative to center (50% 50%)
    // Scale at latitude 22.75, Zoom 20: 
    // X-scale: ~0.138 m/px (or 745654 px/deg Lon)
    // Y-scale: ~0.150 m/px (or 808735 px/deg Lat)

    // P1: 22.750639, 75.865222 -> dx: 0.000163, dy: 0.000044 -> px: +121, -36
    // P2: 22.750706, 75.864764 -> dx: -0.000295, dy: 0.000111 -> px: -220, -90
    // P3: 22.750580, 75.864746 -> dx: -0.000313, dy: -0.000015 -> px: -233, +12
    // P4: 22.750504, 75.865189 -> dx: 0.000130, dy: -0.000091 -> px: +97, +74

    const points = [
        "calc(50% + 121px),calc(50% - 36px)",
        "calc(50% - 220px),calc(50% - 90px)",
        "calc(50% - 233px),calc(50% + 12px)",
        "calc(50% + 97px),calc(50% + 74px)"
    ].join(" ");

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-elevated border border-slate-100 h-[560px] relative group">
            {/* Google Map Iframe (Satellite) */}
            <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Factory Satellite View"
                className="scale-110" // Slight scale to hide edge artifacts if any
            ></iframe>

            {/* Interaction Lock Overlay */}
            <div className="absolute inset-0 z-10 bg-transparent cursor-default" title="Static view of factory periphery"></div>

            {/* Periphery Design Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.3" />
                    </linearGradient>
                </defs>

                {/* Highlight Polygon */}
                <polygon
                    points={points}
                    className="fill-accent/10 stroke-accent stroke-[3] transition-all duration-700"
                    strokeDasharray="10 5"
                    filter="url(#glow)"
                    style={{
                        animation: 'dash 30s linear infinite'
                    }}
                />

                {/* Pulse Points at Corners */}
                {points.split(" ").map((p, i) => {
                    const [x, y] = p.split(",");
                    return (
                        <circle key={i} cx={x} cy={y} r="4" className="fill-accent animate-pulse" />
                    );
                })}

                {/* Center Pin Indicator */}
                <g transform="translate(-16, -32)" className="animate-bounce">
                    <circle cx="50%" cy="50%" r="8" className="fill-accent/40 animate-ping" />
                    <foreignObject x="50%" y="50%" width="32" height="32">
                        <div className="text-accent drop-shadow-lg">
                            <MapPin size={32} fill="currentColor" fillOpacity={0.2} strokeWidth={2.5} />
                        </div>
                    </foreignObject>
                </g>
            </svg>

            {/* Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-30">
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-slate-200 shadow-2xl flex items-center justify-between transform transition-transform group-hover:translate-y-[-4px]">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Factory Premise</p>
                        </div>
                        <h4 className="text-primary font-bold text-lg">Ready Made Complex, Indore</h4>
                        <p className="text-slate-500 text-xs mt-1">27 Years of Manufacturing Legacy</p>
                    </div>
                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=22.750595,75.865059"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white p-4 rounded-2xl hover:bg-accent transition-all duration-500 shadow-glow flex items-center gap-2 font-bold text-sm"
                    >
                        Directions <ArrowRight size={18} />
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes dash {
                    to {
                        stroke-dashoffset: 1000;
                    }
                }
            `}</style>
        </div>
    );
};

export default FactoryMap;
