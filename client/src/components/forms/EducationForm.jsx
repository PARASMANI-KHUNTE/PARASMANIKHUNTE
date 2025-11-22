import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createEducation, updateEducation } from "../../services/api";
import { toast } from "react-toastify";
import { X, Save, Loader2, GraduationCap, Calendar, MapPin, Building } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const EducationForm = ({ existingData, onClose, onSuccess }) => {
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        degree: "",
        institution: "",
        year: "",
        description: "",
        grade: ""
    });

    useEffect(() => {
        if (existingData) {
            setFormData({
                degree: existingData.degree || "",
                institution: existingData.institution || "",
                year: existingData.year || "",
                description: existingData.description || "",
                grade: existingData.grade || ""
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
            if (existingData) {
                await updateEducation(existingData._id, formData);
                toast.success("Education updated successfully");
            } else {
                await createEducation(formData);
                toast.success("Education added successfully");
            }
            onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-lg"}`}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {existingData ? "Edit Education" : "Add Education"}
                </h3>
                <button
                    onClick={onClose}
                    className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Degree</label>
                        <div className="relative">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Bachelor of Computer Applications"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all ${isDarkMode
                                    ? "bg-gray-900/50 border-gray-700 text-white focus:border-primary-500"
                                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500"
                                    }`}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Institution</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                name="institution"
                                value={formData.institution}
                                onChange={handleChange}
                                required
                                placeholder="e.g. University of Technology"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all ${isDarkMode
                                    ? "bg-gray-900/50 border-gray-700 text-white focus:border-primary-500"
                                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500"
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Year/Duration</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                placeholder="e.g. 2022 - 2025"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all ${isDarkMode
                                    ? "bg-gray-900/50 border-gray-700 text-white focus:border-primary-500"
                                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500"
                                    }`}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Grade/GPA</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                placeholder="e.g. 8.5 CGPA"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all ${isDarkMode
                                    ? "bg-gray-900/50 border-gray-700 text-white focus:border-primary-500"
                                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500"
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Brief details about your studies..."
                        className={`w-full p-4 rounded-xl border outline-none transition-all resize-none ${isDarkMode
                            ? "bg-gray-900/50 border-gray-700 text-white focus:border-primary-500"
                            : "bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500"
                            }`}
                    ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {existingData ? "Update" : "Save"}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default EducationForm;
