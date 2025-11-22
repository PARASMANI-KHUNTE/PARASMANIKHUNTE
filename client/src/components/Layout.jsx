import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from './Chatbot';

const Layout = ({ children }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Navbar />

            {/* Main Content Wrapper with Top Padding for Fixed Navbar */}
            <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>

            <Footer />
            <Chatbot />
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default Layout;
