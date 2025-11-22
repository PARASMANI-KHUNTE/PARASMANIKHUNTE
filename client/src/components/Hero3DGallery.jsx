import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero3DGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Add your images here - you can replace these with your actual image paths
    const images = [
        {
            url: '/images/profile1.jpg',
            title: 'Full Stack Developer',
            description: 'Building scalable web applications'
        },
        {
            url: '/images/profile2.jpg',
            title: 'Creative Coder',
            description: 'Crafting beautiful user experiences'
        },
        {
            url: '/images/profile3.jpg',
            title: 'Problem Solver',
            description: 'Turning ideas into reality'
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {/* 3D Card Stack */}
            <div className="relative w-full max-w-md h-96">
                <AnimatePresence mode="popLayout">
                    {images.map((image, index) => {
                        const offset = index - currentIndex;
                        const isActive = index === currentIndex;

                        return (
                            <motion.div
                                key={index}
                                className="absolute inset-0 cursor-pointer"
                                initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                                animate={{
                                    scale: isActive ? 1 : 0.85 - Math.abs(offset) * 0.1,
                                    opacity: Math.abs(offset) <= 1 ? 1 - Math.abs(offset) * 0.3 : 0,
                                    rotateY: offset * 15,
                                    z: isActive ? 0 : -Math.abs(offset) * 100,
                                    x: offset * 120,
                                    transition: {
                                        duration: 0.5,
                                        ease: [0.32, 0.72, 0, 1]
                                    }
                                }}
                                exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    pointerEvents: Math.abs(offset) <= 1 ? 'auto' : 'none'
                                }}
                            >
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 backdrop-blur-sm border border-white/20">
                                    {/* Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={image.url}
                                            alt={image.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                        <motion.h3
                                            className="text-2xl font-bold text-white mb-2"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {image.title}
                                        </motion.h3>
                                        <motion.p
                                            className="text-white/80"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {image.description}
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                            ? 'bg-white w-8'
                            : 'bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero3DGallery;
