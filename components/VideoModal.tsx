import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isOpen && videoRef.current) {
            // Set playback speed to 0.75x
            videoRef.current.playbackRate = 0.75;
            // Mute the video
            videoRef.current.muted = true;
            // Play the video
            videoRef.current.play();
        }
    }, [isOpen]);

    useEffect(() => {
        // Prevent body scroll when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
                    aria-label="Close video"
                >
                    <X size={24} />
                </button>

                {/* Video Container */}
                <div className="relative aspect-video bg-black">
                    <video
                        ref={videoRef}
                        className="w-full h-full"
                        controls
                        loop
                        playsInline
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Video Info */}
                <div className="p-6 bg-slate-800 border-t border-slate-700">
                    <h3 className="text-xl font-heading font-bold text-white mb-2">
                        Factory Tour - Ketan Aditya Textile LLP
                    </h3>
                    <p className="text-slate-400 text-sm">
                        Take a virtual tour of our state-of-the-art manufacturing facility in Indore.
                        See how we craft premium quality girls' wear with precision and care.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
