import React from 'react';

const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    className = '',
    ...props
}) => {
    const variants = {
        default: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        info: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
    };

    const badgeClasses = `inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <span className={badgeClasses} {...props}>
            {children}
        </span>
    );
};

export default Badge;
