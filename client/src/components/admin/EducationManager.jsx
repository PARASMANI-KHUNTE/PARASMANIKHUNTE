import React, { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { Plus, Trash, Edit, X, Save, GraduationCap } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AIFormAssistant from "./AIFormAssistant";

const EducationManager = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({ institution: "", degree: "", year: "", description: "" });

    useEffect(() => { fetchEducation(); }, []);

    const fetchEducation = async () => {
        try {
            const { data } = await api.get("/education");
            setEducation(data);
            setLoading(false);
        } catch (error) { toast.error("Failed to load education"); setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this education?")) {
            try {
                await api.delete(`/education/${id}`);
                setEducation(education.filter(e => e._id !== id));
                toast.success("Education deleted");
            } catch { toast.error("Delete failed"); }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                const { data } = await api.put(`/education/${editing}`, formData);
                setEducation(education.map(e => e._id === editing ? data : e));
                toast.success("Updated successfully");
            } else {
                const { data } = await api.post("/education", formData);
                setEducation([data, ...education]);
                toast.success("Added successfully");
            }
            resetForm();
        } catch { toast.error("Operation failed"); }
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({ institution: "", degree: "", year: "", description: "" });
    };

    const handleEdit = (edu) => {
        setEditing(edu._id);
        setFormData(edu);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const InputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors";

    return (
        <div className="space-y-8">
            <GlassCard className="!p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                    {editing ? <><Edit size={20} className="text-indigo-400" /> Edit Education</> : <><Plus size={20} className="text-green-400" /> Add Education</>}
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input placeholder="Institution Name" className={InputClass} value={formData.institution} onChange={e => setFormData({ ...formData, institution: e.target.value })} required />
                    <input placeholder="Degree / Certificate" className={InputClass} value={formData.degree} onChange={e => setFormData({ ...formData, degree: e.target.value })} required />
                    <input placeholder="Year/Period (e.g. 2018 - 2022)" className={InputClass} value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                    <textarea placeholder="Description" className={`${InputClass} md:col-span-2 min-h-[100px]`} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />

                    <div className="md:col-span-2 flex gap-4">
                        <button type="submit" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 font-medium">
                            <Save size={18} /> {editing ? "Update Education" : "Save Education"}
                        </button>
                        {editing && <button type="button" onClick={resetForm} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-xl transition-colors"><X size={18} /> Cancel</button>}
                    </div>
                </form>
            </GlassCard>

            <div className="space-y-4">
                {loading ? <div className="text-indigo-400 animate-pulse">Loading education history...</div> : education.map(edu => (
                    <GlassCard key={edu._id} className="!p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-white/5 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400 hidden md:block">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-white">{edu.institution}</h4>
                                <div className="text-indigo-300 font-medium mb-1">{edu.degree}</div>
                                <div className="text-xs text-gray-500 bg-white/5 inline-block px-2 py-1 rounded mb-3">{edu.year}</div>
                                <p className="text-gray-400 text-sm max-w-2xl">{edu.description}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 self-start">
                            <button onClick={() => handleEdit(edu)} className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"><Edit size={18} /></button>
                            <button onClick={() => handleDelete(edu._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash size={18} /></button>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};
export default EducationManager;
