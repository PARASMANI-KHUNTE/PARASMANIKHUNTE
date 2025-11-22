import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Briefcase,
    User,
    Mail,
    Cpu,
    Menu,
    X,
    Moon,
    Sun,
    Github,
    Linkedin,
    Twitter
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Chatbot from './Chatbot';
import VisitorCounter from "./VisitorCounter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModernLayout = ({ children }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/projects', label: 'Projects', icon: Briefcase },
        { path: '/experience', label: 'Experience', icon: Cpu },
        { path: '/education', label: 'Education', icon: User },
        { path: '/contact', label: 'Contact', icon: Mail },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>

            {/* Floating Navbar (Desktop) */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
                <nav className={`
          flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300
          ${scrolled
                        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50 shadow-lg'
                        : 'bg-transparent border-transparent'}
        `}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="relative px-4 py-2 rounded-full group"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-primary-500/10 dark:bg-primary-500/20 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${isActive
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}>
                                    <Icon size={16} />
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50">
                <Link to="/" className="font-display font-bold text-xl tracking-tight">
                    PK<span className="text-primary-500">.</span>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white dark:bg-gray-950 pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-4 p-4 rounded-xl text-lg font-medium transition-colors ${location.pathname === item.path
                                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                                            }`}
                                    >
                                        <Icon size={24} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10 min-h-[calc(100vh-80px)]">
                <div className="max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="font-display font-bold text-xl mb-2">Parasmani Khunte</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Building digital experiences with code and creativity.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a href="https://github.com/PARASMANI-KHUNTE" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/parasmani-khunte-330488228/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:parasmanikhunte@gmail.com" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                            <Mail size={20} />
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <VisitorCounter />
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            © {new Date().getFullYear()} All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>

            <Chatbot />
            <ToastContainer position="bottom-right" theme={isDarkMode ? 'dark' : 'light'} />
        </div>
    );
};

export default ModernLayout;
