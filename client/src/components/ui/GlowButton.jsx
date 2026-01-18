import React from 'react';
import { motion } from 'framer-motion';

const GlowButton = ({ children, onClick, icon: Icon, className = "", variant = "primary" }) => {
    const baseStyles = "relative px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 overflow-hidden group";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]",
        secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md",
        danger: "bg-red-500/20 text-red-200 hover:bg-red-500/30 border border-red-500/30"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            <span className="relative z-10 flex items-center gap-2">
                {Icon && <Icon size={20} />}
                {children}
            </span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
        </motion.button>
    );
};

export default GlowButton;
