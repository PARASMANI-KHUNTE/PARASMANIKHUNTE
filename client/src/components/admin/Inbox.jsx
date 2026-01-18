import React, { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { Mail, Trash, Check, CheckCircle } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data } = await api.get("/contact");
            setMessages(data);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to load messages");
            setLoading(false);
        }
    };

    const handleMarkRead = async (id) => {
        try {
            await api.put(`/contact/${id}/read`);
            setMessages(messages.map(msg => msg._id === id ? { ...msg, read: true } : msg));
            toast.success("Marked as read");
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this message?")) return;
        try {
            await api.delete(`/contact/${id}`);
            setMessages(messages.filter(msg => msg._id !== id));
            toast.success("Message deleted");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    if (loading) return <div className="text-indigo-400 animate-pulse">Loading inbox...</div>;

    return (
        <div className="space-y-6">
            {messages.length === 0 ? (
                <div className="text-gray-500 text-center py-20 flex flex-col items-center">
                    <Mail size={48} className="mb-4 opacity-50" />
                    <p>No messages yet.</p>
                </div>
            ) : (
                messages.map((msg) => (
                    <GlassCard
                        key={msg._id}
                        className={`!p-6 flex flex-col md:flex-row justify-between gap-6 border-l-4 ${msg.read ? "border-l-indigo-500/30" : "border-l-green-500"}`}
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-bold text-lg text-white">{msg.name}</h4>
                                <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded">{msg.email}</span>
                                {!msg.read && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">NEW</span>}
                            </div>
                            <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-lg mt-2 font-mono text-sm">{msg.message}</p>
                            <div className="mt-2 text-xs text-gray-500">
                                {new Date(msg.createdAt).toLocaleString()}
                            </div>
                        </div>

                        <div className="flex md:flex-col gap-2 justify-center">
                            {!msg.read && (
                                <button
                                    onClick={() => handleMarkRead(msg._id)}
                                    className="p-3 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-xl transition-colors tooltip"
                                    title="Mark as Read"
                                >
                                    <Check size={20} />
                                </button>
                            )}
                            {msg.read && <div className="p-3 text-gray-600"><CheckCircle size={20} /></div>}

                            <button
                                onClick={() => handleDelete(msg._id)}
                                className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors"
                                title="Delete"
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    </GlassCard>
                ))
            )}
        </div>
    );
};

export default Inbox;
