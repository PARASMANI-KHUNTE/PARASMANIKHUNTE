import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", hoverEffect = true }) => {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.3)" } : {}}
            className={`glass-card rounded-2xl p-6 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
