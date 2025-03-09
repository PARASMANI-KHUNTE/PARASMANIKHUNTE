import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import SectionTitle from "../components/SectionTitle";
import ContactForm from "../components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`mt-6 h-screen relative py-16 px-6 transition-all duration-300 ${
        isDarkMode 
        ? "bg-gray-900 text-white" 
        : "bg-gradient-to-br from-amber-50 to-white text-gray-800"
      }`}
    >
      {/* Background Abstract Shapes */}
      <motion.div
        className="absolute top-0 left-0 w-24 h-24 bg-amber-500 opacity-30 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-amber-400 opacity-20 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <SectionTitle title="Contact Me" subtitle="Get in touch with me!" />
      </motion.div>

      {/* Contact Details + Form */}
      <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-4">
            <Mail className="w-6 h-6 text-amber-500" />
            <p className="text-lg">example@email.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="w-6 h-6 text-amber-500" />
            <p className="text-lg">+123 456 7890</p>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="w-6 h-6 text-amber-500" />
            <p className="text-lg">New York, USA</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
