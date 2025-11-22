import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    hover = true,
    glass = false,
    ...props
}) => {
    const baseStyles = 'rounded-2xl transition-all duration-300';
    const glassStyles = glass
        ? 'glass dark:glass-dark'
        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
    const hoverStyles = hover
        ? 'hover:shadow-xl hover:-translate-y-1'
        : '';

    const cardClasses = `${baseStyles} ${glassStyles} ${hoverStyles} ${className} shadow-lg`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cardClasses}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
