import React, { useState, useEffect } from "react";
import { getContact, updateContact } from "../../services/api";
import { toast } from "react-toastify";
import { X, Save, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ContactInfoForm = ({ existingData, onClose, onSuccess }) => {
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (existingData) {
            setFormData({
                name: existingData.name || "",
                email: existingData.email || "",
                phone: existingData.phone || "",
                address: existingData.address || ""
            });
        }
    }, [existingData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateContact(formData);
            toast.success("Contact details updated successfully");
            onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-lg"}`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Edit Contact Details</h3>
                <button onClick={onClose} className={`p-2 rounded-lg ${isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                    <X size={20} />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className={`w-full p-2 rounded-xl border ${isDarkMode ? "bg-gray-900/50 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`} />
                </div>
                <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${isDarkMode ? "bg-gray-900/50 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Phone</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 1234567890" className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${isDarkMode ? "bg-gray-900/50 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className={`w-full p-2 rounded-xl border ${isDarkMode ? "bg-gray-900/50 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`} />
                </div>
                <button type="submit" disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-70">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save
                </button>
            </form>
        </div>
    );
};

export default ContactInfoForm;
