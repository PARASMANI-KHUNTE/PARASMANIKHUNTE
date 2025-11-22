import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { sendMessage } from "../services/api";
import { toast } from "react-toastify";
import { Send, User, Mail as MailIcon, FileText, MessageSquare } from "lucide-react";

const ContactForm = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendMessage(formData);
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ icon: Icon, label, name, type = "text", rows }) => {
    const isTextarea = !!rows;
    const InputComponent = isTextarea ? "textarea" : "input";

    return (
      <div className="relative">
        <label
          className={`block text-sm font-medium mb-2 transition-colors ${focusedField === name
              ? isDarkMode ? "text-amber-400" : "text-amber-600"
              : isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
        >
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </div>
        </label>
        <InputComponent
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField("")}
          rows={rows}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${focusedField === name
              ? "border-amber-500 ring-4 ring-amber-500/20"
              : isDarkMode
                ? "border-gray-700 focus:border-amber-500"
                : "border-gray-300 focus:border-amber-500"
            } ${isDarkMode
              ? "bg-gray-800 text-white placeholder-gray-500"
              : "bg-white text-gray-900 placeholder-gray-400"
            } focus:outline-none ${isTextarea ? "resize-none" : ""}`}
          required
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      </div>
    );
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={`p-8 rounded-3xl transition-all duration-300 ${isDarkMode
          ? "bg-gray-800/50 border border-gray-700 shadow-2xl"
          : "bg-white border border-gray-200 shadow-2xl"
        }`}
    >
      <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-800"
        }`}>
        <MessageSquare className={`w-6 h-6 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`} />
        Send a Message
      </h3>

      <div className="space-y-5">
        <InputField icon={User} label="Name" name="name" />
        <InputField icon={MailIcon} label="Email" name="email" type="email" />
        <InputField icon={FileText} label="Subject" name="subject" />
        <InputField icon={MessageSquare} label="Message" name="message" rows={5} />

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : isDarkMode
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 hover:from-amber-400 hover:to-amber-500"
                : "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
            }`}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
