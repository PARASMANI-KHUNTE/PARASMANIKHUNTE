import React, { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { Plus, Trash, Edit, X, Save, Briefcase, Calendar } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AIFormAssistant from "./AIFormAssistant";

const ExperienceManager = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [isCurrent, setIsCurrent] = useState(false);

    // We'll split the 'years' field logic into start/end dates for the UI
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: ""
    });

    useEffect(() => { fetchExperiences(); }, []);

    const fetchExperiences = async () => {
        try {
            const { data } = await api.get("/experience");
            setExperiences(data);
            setLoading(false);
        } catch (error) { toast.error("Failed to load experience"); setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this experience?")) {
            try {
                await api.delete(`/experience/${id}`);
                setExperiences(experiences.filter(e => e._id !== id));
                toast.success("Experience deleted");
            } catch { toast.error("Delete failed"); }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Format dates into the schema's expected format if needed, 
            // OR just store them in the existing fields. 
            // The backend has 'startYear', 'endYear', 'years'. 
            // We'll update to use startYear/endYear mainly, and construct 'years' as a display string.

            const start = formData.startDate; // "YYYY-MM"
            const end = isCurrent ? "Present" : formData.endDate; // "YYYY-MM" or "Present"
            const duration = `${start} - ${end}`;

            const payload = {
                company: formData.company,
                role: formData.role,
                startYear: start, // Mapping startDate to startYear
                endYear: end,     // Mapping endDate to endYear
                years: duration,  // Keeping backward compatibility for display
                description: formData.description,
                technologies: formData.technologies
            };

            if (editing) {
                const { data } = await api.put(`/experience/${editing}`, payload);
                setExperiences(experiences.map(e => e._id === editing ? data : e));
                toast.success("Updated successfully");
            } else {
                const { data } = await api.post("/experience", payload);
                setExperiences([data, ...experiences]);
                toast.success("Added successfully");
            }
            resetForm();
        } catch { toast.error("Operation failed"); }
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({ company: "", role: "", startDate: "", endDate: "", description: "", technologies: "" });
        setIsCurrent(false);
        setShowForm(false);
    };

    const handleEdit = (exp) => {
        setEditing(exp._id);
        // Try to parse existing data back to inputs
        // This is a bit tricky if old data is just text. We'll do our best or default to empty.

        setIsCurrent(exp.endYear === 'Present' || exp.years?.toLowerCase().includes('present'));

        setFormData({
            company: exp.company,
            role: exp.role,
            startDate: exp.startYear || "",
            endDate: exp.endYear === 'Present' ? "" : (exp.endYear || ""),
            description: exp.description,
            technologies: exp.technologies ? (Array.isArray(exp.technologies) ? exp.technologies.join(', ') : exp.technologies) : ""
        });

        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openNewForm = () => {
        resetForm();
        setShowForm(true);
    };

    const InputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors";

    return (
        <div className="space-y-8">
            {/* Header Actions */}
            {!showForm && (
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white font-space-grotesk">Experience History</h3>
                    <button
                        onClick={openNewForm}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] font-medium"
                    >
                        <Plus size={20} /> Add Experience
                    </button>
                </div>
            )}

            {showForm && (
                <GlassCard className="!p-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                        {editing ? <><Edit size={20} className="text-indigo-400" /> Edit Experience</> : <><Plus size={20} className="text-green-400" /> Add Experience</>}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input placeholder="Company Name" className={InputClass} value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} required />
                        <input placeholder="Role / Position" className={InputClass} value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required />

                        {/* Date Selection */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Start Date</label>
                            <input
                                type="month"
                                className={`${InputClass} [color-scheme:dark]`}
                                value={formData.startDate}
                                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm text-gray-400 ml-1">End Date</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="currentRole"
                                        checked={isCurrent}
                                        onChange={e => setIsCurrent(e.target.checked)}
                                        className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                                    />
                                    <label htmlFor="currentRole" className="text-xs text-indigo-300 font-medium cursor-pointer">Currently Working</label>
                                </div>
                            </div>
                            <input
                                type="month"
                                className={`${InputClass} [color-scheme:dark] disabled:opacity-50 disabled:cursor-not-allowed`}
                                value={formData.endDate}
                                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                disabled={isCurrent}
                                required={!isCurrent}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-2">
                                <label className="text-sm text-gray-400 flex-1">Key Technologies</label>
                                <AIFormAssistant
                                    type="experience"
                                    field="technologies"
                                    context={{ role: formData.role, company: formData.company }}
                                    onSelect={(suggestion) => setFormData({ ...formData, technologies: suggestion })}
                                />
                            </div>
                            <input placeholder="Key Technologies (comma separated)" className={InputClass} value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} />
                        </div>

                        <div className="md:col-span-2">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm text-gray-400">Description & Achievements</label>
                                <AIFormAssistant
                                    type="experience"
                                    field="description"
                                    context={{ role: formData.role, company: formData.company, technologies: formData.technologies }}
                                    onSelect={(suggestion) => setFormData({ ...formData, description: suggestion })}
                                />
                            </div>
                            <textarea placeholder="Description & Achievements" className={`${InputClass} min-h-[120px]`} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                        </div>

                        <div className="md:col-span-2 flex gap-4 pt-4 border-t border-white/10">
                            <button type="submit" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 font-medium">
                                <Save size={18} /> {editing ? "Update Experience" : "Save Experience"}
                            </button>
                            <button type="button" onClick={resetForm} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-xl transition-colors">
                                <X size={18} /> Cancel
                            </button>
                        </div>
                    </form>
                </GlassCard>
            )}

            <div className="space-y-4">
                {loading ? <div className="text-indigo-400 animate-pulse">Loading experience history...</div> : experiences.map(exp => (
                    <GlassCard key={exp._id} className="!p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-white/5 transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400 hidden md:block">
                                <Briefcase size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-white group-hover:text-indigo-300 transition-colors">{exp.company}</h4>
                                <div className="text-indigo-400 font-medium mb-1">{exp.role}</div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <Calendar size={14} />
                                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                        {exp.startYear || '?'} — {exp.endYear || 'Present'}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">{exp.description}</p>
                                {exp.technologies && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {exp.technologies.split(',').map((t, i) => <span key={i} className="text-xs font-medium text-indigo-200 bg-indigo-900/30 border border-indigo-500/20 px-2 py-1 rounded-md">{t.trim()}</span>)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2 self-start opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(exp)} className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"><Edit size={18} /></button>
                            <button onClick={() => handleDelete(exp._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash size={18} /></button>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};
export default ExperienceManager;
