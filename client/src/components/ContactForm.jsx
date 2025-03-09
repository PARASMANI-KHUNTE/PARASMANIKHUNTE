import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ContactForm = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={`max-w-md  mx-auto p-6 rounded-2xl shadow-lg transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-500 transition-all ${
            isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
          required
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-500 transition-all ${
            isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
          required
        />
      </div>

      {/* Message Input */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-amber-500 transition-all ${
            isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full py-3 text-lg font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-all"
      >
        Send Message
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
