import React, { useState, useEffect } from "react";
import {
    getMessages,
    deleteMessage,
    getProjects,
    deleteProject,
    getExperience,
    deleteExperience,
    getEducation,
    deleteEducation,
    getContact,
} from "../services/api";
import { toast } from "react-toastify";
import {
    Trash2,
    Plus,
    MessageSquare,
    Briefcase,
    Code,
    LogOut,
    GraduationCap,
    Mail,
} from "lucide-react";
import ProjectForm from "./forms/ProjectForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import ContactInfoForm from "./forms/ContactInfoForm";

const AdminDashboard = ({ userInfo, onLogout }) => {
    const [activeTab, setActiveTab] = useState("messages");
    const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [contactInfo, setContactInfo] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const fetchData = async () => {
        try {
            if (activeTab === "messages") {
                const { data } = await getMessages();
                setMessages(data);
            } else if (activeTab === "projects") {
                const { data } = await getProjects();
                setProjects(data);
            } else if (activeTab === "experience") {
                const { data } = await getExperience();
                setExperience(data);
            } else if (activeTab === "education") {
                const { data } = await getEducation();
                setEducation(data);
            } else if (activeTab === "contact") {
                const { data } = await getContact();
                setContactInfo(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleDeleteMessage = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteMessage(id);
                toast.success("Message deleted");
                fetchData();
            } catch (error) {
                toast.error("Failed to delete message");
            }
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteProject(id);
                toast.success("Project deleted");
                fetchData();
            } catch (error) {
                toast.error("Failed to delete project");
            }
        }
    };

    const handleDeleteExperience = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteExperience(id);
                toast.success("Experience deleted");
                fetchData();
            } catch (error) {
                toast.error("Failed to delete experience");
            }
        }
    };

    const handleDeleteEducation = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteEducation(id);
                toast.success("Education deleted");
                fetchData();
            } catch (error) {
                toast.error("Failed to delete education");
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Dashboard
                </h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600 dark:text-gray-300">
                        Welcome, {userInfo.username}
                    </span>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 overflow-x-auto">
                <button
                    onClick={() => setActiveTab("messages")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === "messages"
                        ? "bg-amber-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                    <MessageSquare size={18} /> Messages
                </button>
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === "projects"
                        ? "bg-amber-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                    <Code size={18} /> Projects
                </button>
                <button
                    onClick={() => setActiveTab("experience")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === "experience"
                        ? "bg-amber-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                    <Briefcase size={18} /> Experience
                </button>
                <button
                    onClick={() => setActiveTab("education")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === "education"
                        ? "bg-amber-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                    <GraduationCap size={18} /> Education
                </button>
                <button
                    onClick={() => setActiveTab("contact")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === "contact"
                        ? "bg-amber-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                    <Mail size={18} /> Contact
                </button>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                {activeTab === "messages" && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">Inbox</h2>
                        {messages.length === 0 ? (
                            <p className="text-gray-500">No messages yet.</p>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    className="border dark:border-gray-700 p-4 rounded-lg relative"
                                >
                                    <button
                                        onClick={() => handleDeleteMessage(msg._id)}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <h3 className="font-bold text-lg dark:text-white">{msg.subject}</h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        From: {msg.name} ({msg.email}) - {new Date(msg.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {msg.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "projects" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold dark:text-white">Projects</h2>
                            <button
                                onClick={() => {
                                    setEditingItem(null);
                                    setShowProjectForm(true);
                                }}
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                <Plus size={18} /> Add Project
                            </button>
                        </div>

                        {showProjectForm ? (
                            <ProjectForm
                                existingData={editingItem}
                                onClose={() => setShowProjectForm(false)}
                                onSuccess={() => {
                                    setShowProjectForm(false);
                                    fetchData();
                                }}
                            />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projects.map((project) => (
                                    <div
                                        key={project._id}
                                        className="border dark:border-gray-700 p-4 rounded-lg relative"
                                    >
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingItem(project);
                                                    setShowProjectForm(true);
                                                }}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProject(project._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <h3 className="font-bold text-lg dark:text-white">{project.title}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{project.year}</p>
                                        <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "experience" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold dark:text-white">Experience</h2>
                            <button
                                onClick={() => {
                                    setEditingItem(null);
                                    setShowExperienceForm(true);
                                }}
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                <Plus size={18} /> Add Experience
                            </button>
                        </div>

                        {showExperienceForm ? (
                            <ExperienceForm
                                existingData={editingItem}
                                onClose={() => setShowExperienceForm(false)}
                                onSuccess={() => {
                                    setShowExperienceForm(false);
                                    fetchData();
                                }}
                            />
                        ) : (
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div
                                        key={exp._id}
                                        className="border dark:border-gray-700 p-4 rounded-lg relative"
                                    >
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingItem(exp);
                                                    setShowExperienceForm(true);
                                                }}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteExperience(exp._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <h3 className="font-bold text-lg dark:text-white">{exp.role}</h3>
                                        <p className="text-amber-500 font-medium">{exp.company}</p>
                                        <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "education" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold dark:text-white">Education</h2>
                            <button
                                onClick={() => {
                                    setEditingItem(null);
                                    setShowEducationForm(true);
                                }}
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                <Plus size={18} /> Add Education
                            </button>
                        </div>

                        {showEducationForm ? (
                            <EducationForm
                                existingData={editingItem}
                                onClose={() => setShowEducationForm(false)}
                                onSuccess={() => {
                                    setShowEducationForm(false);
                                    fetchData();
                                }}
                            />
                        ) : (
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div
                                        key={edu._id}
                                        className="border dark:border-gray-700 p-4 rounded-lg relative"
                                    >
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingItem(edu);
                                                    setShowEducationForm(true);
                                                }}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEducation(edu._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <h3 className="font-bold text-lg dark:text-white">{edu.degree}</h3>
                                        <p className="text-amber-500 font-medium">{edu.institution}</p>
                                        <p className="text-sm text-gray-500 mb-2">{edu.year} • {edu.grade}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "contact" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold dark:text-white">Contact Details</h2>
                            <button
                                onClick={() => {
                                    setEditingItem(contactInfo);
                                    setShowContactForm(true);
                                }}
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                <Mail size={18} /> Edit Contact
                            </button>
                        </div>

                        {showContactForm ? (
                            <ContactInfoForm
                                existingData={contactInfo}
                                onClose={() => setShowContactForm(false)}
                                onSuccess={() => {
                                    setShowContactForm(false);
                                    fetchData();
                                }}
                            />
                        ) : (
                            contactInfo && (
                                <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <p><strong>Name:</strong> {contactInfo.name}</p>
                                    <p><strong>Email:</strong> {contactInfo.email}</p>
                                    <p><strong>Phone:</strong> {contactInfo.phone}</p>
                                    <p><strong>Address:</strong> {contactInfo.address}</p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
