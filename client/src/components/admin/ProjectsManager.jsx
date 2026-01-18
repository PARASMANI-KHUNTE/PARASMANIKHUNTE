import React, { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { Plus, Trash, Edit, X, Save, Eye } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import ProjectCard from "../ProjectCard";
import AIFormAssistant from "./AIFormAssistant";

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        title: "", description: "", tech: "", link: "", github: "", year: "", image: ""
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get("/projects");
            setProjects(data);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to load projects");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await api.delete(`/projects/${id}`);
                setProjects(projects.filter(p => p._id !== id));
                toast.success("Project deleted");
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = formData.image;

            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append("image", imageFile);
                const res = await api.post("/upload", uploadData);
                imageUrl = res.data.url;
            }

            const payload = { ...formData, image: imageUrl };

            if (editing) {
                const { data } = await api.put(`/projects/${editing}`, payload);
                setProjects(projects.map(p => p._id === editing ? data : p));
                toast.success("Project updated");
            } else {
                const { data } = await api.post("/projects", payload);
                setProjects([data, ...projects]);
                toast.success("Project created");
            }

            resetForm();
        } catch (error) {
            toast.error("Operation failed");
        }
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({ title: "", description: "", tech: "", link: "", github: "", year: "", image: "" });
        setImageFile(null);
        setShowForm(false);
    };

    const handleEdit = (project) => {
        setEditing(project._id);
        setFormData(project);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openNewForm = () => {
        setEditing(null);
        setFormData({ title: "", description: "", tech: "", link: "", github: "", year: new Date().getFullYear().toString(), image: "" });
        setImageFile(null);
        setShowForm(true);
    };

    const InputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors";

    return (
        <div className="space-y-8">
            {/* Header Actions */}
            {!showForm && (
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white font-space-grotesk">My Projects</h3>
                    <button
                        onClick={openNewForm}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] font-medium"
                    >
                        <Plus size={20} /> Add New Project
                    </button>
                </div>
            )}

            {/* Form & Live Preview Section */}
            {showForm && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-top-4 duration-500">
                    <GlassCard className="!p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                            {editing ? <><Edit size={20} className="text-indigo-400" /> Edit Project</> : <><Plus size={20} className="text-green-400" /> Add New Project</>}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                placeholder="Project Title"
                                className={InputClass}
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="Year"
                                    className={InputClass}
                                    value={formData.year}
                                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                                />
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <label className="text-sm text-gray-400 flex-1">Tech Stack</label>
                                        <AIFormAssistant
                                            type="project"
                                            field="tech"
                                            context={{ title: formData.title, description: formData.description }}
                                            onSelect={(suggestion) => setFormData({ ...formData, tech: suggestion })}
                                        />
                                    </div>
                                    <input
                                        placeholder="Tech Stack (comma separated)"
                                        className={InputClass}
                                        value={formData.tech}
                                        onChange={e => setFormData({ ...formData, tech: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-gray-400">Description</label>
                                    <AIFormAssistant
                                        type="project"
                                        field="description"
                                        context={{ title: formData.title, tech: formData.tech }}
                                        onSelect={(suggestion) => setFormData({ ...formData, description: suggestion })}
                                    />
                                </div>
                                <textarea
                                    placeholder="Description"
                                    className={`${InputClass} min-h-[120px]`}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="Live Demo Link"
                                    className={InputClass}
                                    value={formData.link}
                                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                                />
                                <input
                                    placeholder="GitHub Repository"
                                    className={InputClass}
                                    value={formData.github}
                                    onChange={e => setFormData({ ...formData, github: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-400">Project Cover Image</label>
                                <input
                                    type="file"
                                    onChange={e => {
                                        if (e.target.files[0]) {
                                            setImageFile(e.target.files[0]);
                                            // Create a fake URL for preview
                                            setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) })
                                        }
                                    }}
                                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 transition-all cursor-pointer"
                                />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-white/10">
                                <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 font-medium">
                                    <Save size={18} /> {editing ? "Update Project" : "Save Project"}
                                </button>
                                <button type="button" onClick={resetForm} className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors">
                                    <X size={18} /> Cancel
                                </button>
                            </div>
                        </form>
                    </GlassCard>

                    {/* Live Preview */}
                    <div className="sticky top-8">
                        <div className="flex items-center gap-2 mb-4 text-indigo-300 font-medium">
                            <Eye size={18} /> Live Preview
                        </div>
                        <div className="h-[500px]">
                            <ProjectCard
                                project={{
                                    ...formData,
                                    image: formData.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", // Fallback for preview
                                    title: formData.title || "Project Title",
                                    description: formData.description || "Project description will appear here..."
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Project List */}
            {!showForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? <div className="text-indigo-400 animate-pulse">Loading projects...</div> : projects.map(project => (
                        <div key={project._id} className="relative group">
                            {/* Edit/Delete Overlay */}
                            <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(project)} className="p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500 transition-colors"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(project._id)} className="p-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-500 transition-colors"><Trash size={16} /></button>
                            </div>
                            <div className="h-[400px]">
                                <ProjectCard project={project} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
