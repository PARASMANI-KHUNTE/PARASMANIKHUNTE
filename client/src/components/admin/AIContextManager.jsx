import React, { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { Brain, Save, RotateCcw, Sparkles, Plus, X } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const AIContextManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [context, setContext] = useState({
        fullName: "",
        tagline: "",
        bio: "",
        location: "",
        currentRole: "",
        yearsOfExperience: 0,
        specializations: [],
        industries: [],
        technicalSkills: {
            languages: [],
            frameworks: [],
            tools: [],
            databases: [],
            cloudPlatforms: []
        },
        workStyle: "",
        preferredProjectTypes: [],
        careerGoals: "",
        writingTone: "professional",
        personalQuirks: "",
        customInstructions: ""
    });

    const [newSpecialization, setNewSpecialization] = useState("");
    const [newIndustry, setNewIndustry] = useState("");
    const [newSkill, setNewSkill] = useState({ category: "languages", value: "" });

    useEffect(() => {
        fetchContext();
    }, []);

    const fetchContext = async () => {
        try {
            const { data } = await api.get("/portfolio-context");
            setContext(data);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to load AI context");
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put("/portfolio-context", context);
            toast.success("AI Context saved successfully!");
        } catch (error) {
            toast.error("Failed to save context");
        } finally {
            setSaving(false);
        }
    };

    const handleReset = async () => {
        if (window.confirm("Are you sure you want to reset all AI context? This cannot be undone.")) {
            try {
                const { data } = await api.post("/portfolio-context/reset");
                setContext(data);
                toast.success("AI Context reset to defaults");
            } catch (error) {
                toast.error("Failed to reset context");
            }
        }
    };

    const addToArray = (field, value) => {
        if (value.trim()) {
            setContext({ ...context, [field]: [...context[field], value.trim()] });
        }
    };

    const removeFromArray = (field, index) => {
        setContext({ ...context, [field]: context[field].filter((_, i) => i !== index) });
    };

    const addSkill = () => {
        if (newSkill.value.trim()) {
            const updated = { ...context.technicalSkills };
            updated[newSkill.category] = [...updated[newSkill.category], newSkill.value.trim()];
            setContext({ ...context, technicalSkills: updated });
            setNewSkill({ category: newSkill.category, value: "" });
        }
    };

    const removeSkill = (category, index) => {
        const updated = { ...context.technicalSkills };
        updated[category] = updated[category].filter((_, i) => i !== index);
        setContext({ ...context, technicalSkills: updated });
    };

    const InputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors";

    if (loading) {
        return <div className="text-indigo-400 animate-pulse">Loading AI Context...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-bold text-white font-space-grotesk flex items-center gap-3">
                        <Brain className="text-indigo-400" size={28} />
                        AI Knowledge Base
                    </h3>
                    <p className="text-gray-400 mt-1">Provide details so AI can help you better</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
                    >
                        <RotateCcw size={18} /> Reset
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20 font-medium disabled:opacity-50"
                    >
                        <Save size={18} /> {saving ? "Saving..." : "Save Context"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <GlassCard className="!p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        📋 Basic Information
                    </h4>
                    <div className="space-y-4">
                        <input
                            placeholder="Full Name"
                            className={InputClass}
                            value={context.fullName}
                            onChange={e => setContext({ ...context, fullName: e.target.value })}
                        />
                        <input
                            placeholder="Tagline (e.g., Full-Stack Developer)"
                            className={InputClass}
                            value={context.tagline}
                            onChange={e => setContext({ ...context, tagline: e.target.value })}
                        />
                        <textarea
                            placeholder="Bio"
                            className={`${InputClass} min-h-[100px]`}
                            value={context.bio}
                            onChange={e => setContext({ ...context, bio: e.target.value })}
                        />
                        <input
                            placeholder="Location"
                            className={InputClass}
                            value={context.location}
                            onChange={e => setContext({ ...context, location: e.target.value })}
                        />
                    </div>
                </GlassCard>

                {/* Professional Details */}
                <GlassCard className="!p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        💼 Professional Details
                    </h4>
                    <div className="space-y-4">
                        <input
                            placeholder="Current Role"
                            className={InputClass}
                            value={context.currentRole}
                            onChange={e => setContext({ ...context, currentRole: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Years of Experience"
                            className={InputClass}
                            value={context.yearsOfExperience}
                            onChange={e => setContext({ ...context, yearsOfExperience: parseInt(e.target.value) || 0 })}
                        />

                        {/* Specializations */}
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Specializations</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    placeholder="Add specialization..."
                                    className={`${InputClass} flex-1`}
                                    value={newSpecialization}
                                    onChange={e => setNewSpecialization(e.target.value)}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addToArray('specializations', newSpecialization);
                                            setNewSpecialization("");
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        addToArray('specializations', newSpecialization);
                                        setNewSpecialization("");
                                    }}
                                    className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {context.specializations.map((spec, i) => (
                                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                        {spec}
                                        <button onClick={() => removeFromArray('specializations', i)} className="hover:text-white">
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Technical Skills */}
                <GlassCard className="!p-6 lg:col-span-2">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        💻 Technical Skills
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['languages', 'frameworks', 'tools', 'databases', 'cloudPlatforms'].map(category => (
                            <div key={category}>
                                <label className="text-sm text-gray-400 mb-2 block capitalize">{category.replace(/([A-Z])/g, ' $1')}</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        placeholder={`Add ${category}...`}
                                        className={`${InputClass} flex-1`}
                                        value={newSkill.category === category ? newSkill.value : ""}
                                        onFocus={() => setNewSkill({ category, value: "" })}
                                        onChange={e => setNewSkill({ category, value: e.target.value })}
                                        onKeyPress={e => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addSkill();
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            setNewSkill({ category, value: newSkill.value });
                                            addSkill();
                                        }}
                                        className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {context.technicalSkills[category]?.map((skill, i) => (
                                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10 text-sm">
                                            {skill}
                                            <button onClick={() => removeSkill(category, i)} className="hover:text-white">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* AI Preferences */}
                <GlassCard className="!p-6 lg:col-span-2">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="text-indigo-400" /> AI Preferences
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Writing Tone</label>
                            <select
                                className={InputClass}
                                value={context.writingTone}
                                onChange={e => setContext({ ...context, writingTone: e.target.value })}
                            >
                                <option value="professional">Professional</option>
                                <option value="casual">Casual</option>
                                <option value="technical">Technical</option>
                                <option value="creative">Creative</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Career Goals</label>
                            <input
                                placeholder="E.g., Become a tech lead, Start a startup..."
                                className={InputClass}
                                value={context.careerGoals}
                                onChange={e => setContext({ ...context, careerGoals: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm text-gray-400 mb-2 block">Custom Instructions for AI</label>
                            <textarea
                                placeholder="Any specific instructions for how AI should help you..."
                                className={`${InputClass} min-h-[100px]`}
                                value={context.customInstructions}
                                onChange={e => setContext({ ...context, customInstructions: e.target.value })}
                            />
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default AIContextManager;
