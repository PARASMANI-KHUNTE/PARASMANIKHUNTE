import React, { useState } from "react";
import { createExperience, updateExperience } from "../../services/api";
import { toast } from "react-toastify";

const ExperienceForm = ({ existingData, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        role: existingData?.role || "",
        company: existingData?.company || "",
        companyUrl: existingData?.companyUrl || "",
        duration: existingData?.duration || "",
        location: existingData?.location || "",
        description: existingData?.description || "",
        skills: existingData?.skills ? existingData.skills.join(",") : "",
    });
    const [logo, setLogo] = useState(null);
    const [certificate, setCertificate] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));
        if (logo) data.append("logo", logo);
        if (certificate) data.append("certificate", certificate);

        try {
            if (existingData) {
                await updateExperience(existingData._id, data);
                toast.success("Experience updated");
            } else {
                await createExperience(data);
                toast.success("Experience created");
            }
            onSuccess();
        } catch (error) {
            toast.error("Failed to save experience");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Role</label>
                    <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Company</label>
                    <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Company URL</label>
                <input
                    type="url"
                    value={formData.companyUrl}
                    onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                    <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Location</label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                </div>
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    rows="3"
                />
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Skills (comma separated)</label>
                <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Logo</label>
                    <input
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Certificate</label>
                    <input
                        type="file"
                        onChange={(e) => setCertificate(e.target.files[0])}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                </div>
            </div>
            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ExperienceForm;
