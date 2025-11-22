import React, { useState } from "react";
import { createProject, updateProject } from "../../services/api";
import { toast } from "react-toastify";

const ProjectForm = ({ existingData, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: existingData?.title || "",
        description: existingData?.description || "",
        tech: existingData?.tech || "",
        link: existingData?.link || "",
        github: existingData?.github || "",
        year: existingData?.year || "",
    });
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));
        if (image) data.append("image", image);

        try {
            if (existingData) {
                await updateProject(existingData._id, data);
                toast.success("Project updated");
            } else {
                await createProject(data);
                toast.success("Project created");
            }
            onSuccess();
        } catch (error) {
            toast.error("Failed to save project");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    rows="3"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Tech Stack (comma separated)</label>
                <input
                    type="text"
                    value={formData.tech}
                    onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Live Link</label>
                    <input
                        type="url"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">GitHub Link</label>
                    <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                </div>
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Year</label>
                <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Image</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
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

export default ProjectForm;
