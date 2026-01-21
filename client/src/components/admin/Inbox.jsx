import React, { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { Mail, Trash, Check, CheckCircle } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all"); // all, unread, read
    const [replyModal, setReplyModal] = useState({ open: false, messageId: null, to: "", name: "", subject: "" });
    const [replyData, setReplyData] = useState({ subject: "", message: "" });
    const [sendingReply, setSendingReply] = useState(false);

    const [confirmModal, setConfirmModal] = useState({ open: false, id: null });

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
            await api.patch(`/contact/${id}`);
            setMessages(messages.map(msg => msg._id === id ? { ...msg, read: true } : msg));
            toast.success("Marked as read");
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleDelete = (id) => {
        setConfirmModal({ open: true, id });
    };

    const confirmDelete = async () => {
        if (!confirmModal.id) return;
        try {
            await api.delete(`/contact/${confirmModal.id}`);
            setMessages(messages.filter(msg => msg._id !== confirmModal.id));
            toast.success("Message deleted");
            setConfirmModal({ open: false, id: null });
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const openReplyModal = (msg) => {
        setReplyModal({ open: true, messageId: msg._id, to: msg.email, name: msg.name });
        setReplyData({ subject: `Re: Contact from ${msg.name}`, message: "" });
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        setSendingReply(true);
        try {
            await api.post("/contact/reply", {
                to: replyModal.to,
                subject: replyData.subject,
                message: replyData.message
            });
            toast.success("Reply sent successfully");
            setReplyModal({ ...replyModal, open: false });
        } catch (error) {
            console.error("Reply error", error);
            toast.error("Failed to send reply");
        } finally {
            setSendingReply(false);
        }
    };

    const filteredMessages = messages.filter(msg => {
        if (filter === "unread") return !msg.read;
        if (filter === "read") return msg.read;
        return true;
    });

    if (loading) return <div className="text-indigo-400 animate-pulse">Loading inbox...</div>;

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${filter === "all" ? "bg-indigo-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("unread")}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${filter === "unread" ? "bg-indigo-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
                >
                    Unread
                </button>
                <button
                    onClick={() => setFilter("read")}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${filter === "read" ? "bg-indigo-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
                >
                    Read
                </button>
            </div>

            {filteredMessages.length === 0 ? (
                <div className="text-gray-500 text-center py-20 flex flex-col items-center">
                    <Mail size={48} className="mb-4 opacity-50" />
                    <p>No messages found.</p>
                </div>
            ) : (
                filteredMessages.map((msg) => (
                    <GlassCard
                        key={msg._id}
                        className={`!p-4 md:!p-6 flex flex-col md:flex-row justify-between gap-4 md:gap-6 border-l-4 ${msg.read ? "border-l-indigo-500/30" : "border-l-green-500"}`}
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h4 className="font-bold text-lg text-white truncate max-w-full">{msg.name}</h4>
                                <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded break-all">{msg.email}</span>
                                {!msg.read && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">NEW</span>}
                            </div>
                            <p className="text-gray-300 leading-relaxed bg-white/5 p-3 md:p-4 rounded-lg mt-2 font-mono text-sm break-words whitespace-pre-wrap">{msg.message}</p>
                            <div className="mt-2 text-xs text-gray-500">
                                {new Date(msg.createdAt).toLocaleString()}
                            </div>
                        </div>

                        <div className="flex md:flex-col gap-2 justify-end md:justify-center shrink-0">
                            <button
                                onClick={() => openReplyModal(msg)}
                                className="p-3 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-colors tooltip"
                                title="Reply"
                            >
                                <Mail size={20} />
                            </button>

                            {!msg.read && (
                                <button
                                    onClick={() => handleMarkRead(msg._id)}
                                    className="p-3 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-xl transition-colors tooltip"
                                    title="Mark as Read"
                                >
                                    <Check size={20} />
                                </button>
                            )}
                            {msg.read && <div className="p-3 text-gray-600 flex items-center justify-center"><CheckCircle size={20} /></div>}

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

            {/* Reply Modal */}
            {replyModal.open && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <GlassCard className="!p-6 w-full max-w-lg relative">
                        <button
                            onClick={() => setReplyModal({ ...replyModal, open: false })}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold text-white mb-4">Reply to {replyModal.name}</h3>
                        <form onSubmit={handleReplySubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">To</label>
                                <input type="text" value={replyModal.to} disabled className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-400" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={replyData.subject}
                                    onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Message</label>
                                <textarea
                                    value={replyData.message}
                                    onChange={(e) => setReplyData({ ...replyData, message: e.target.value })}
                                    rows="5"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
                                    required
                                    placeholder="Type your reply..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={sendingReply}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-xl transition-colors disabled:opacity-50"
                            >
                                {sendingReply ? "Sending..." : "Send Reply"}
                            </button>
                        </form>
                    </GlassCard>
                </div>
            )}

            {/* Confirmation Modal */}
            {confirmModal.open && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <GlassCard className="!p-6 w-full max-w-md relative text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Delete Message?</h3>
                        <p className="text-gray-300 mb-6">Are you sure you want to delete this message? This action cannot be undone.</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setConfirmModal({ open: false, id: null })}
                                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-bold"
                            >
                                Delete
                            </button>
                        </div>
                    </GlassCard>
                </div>
            )}
        </div>
    );
};

export default Inbox;
