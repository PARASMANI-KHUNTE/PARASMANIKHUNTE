import React, { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { Save, Key, User } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newUsername: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleUpdateCredentials = async (e) => {
        e.preventDefault();

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                currentPassword: formData.currentPassword
            };

            if (formData.newUsername) payload.username = formData.newUsername;
            if (formData.newPassword) payload.password = formData.newPassword;

            await api.put("/auth/update-credentials", payload);
            toast.success("Credentials updated successfully!");
            setFormData({ currentPassword: "", newUsername: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update credentials");
        } finally {
            setLoading(false);
        }
    };

    const InputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors";

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-bold text-white font-space-grotesk flex items-center gap-3">
                    <Key className="text-indigo-400" size={28} />
                    Account Settings
                </h3>
                <p className="text-gray-400 mt-1">Update your login credentials</p>
            </div>

            <GlassCard className="!p-8 max-w-2xl">
                <h4 className="text-lg font-bold text-white mb-6">Update Credentials</h4>
                <form onSubmit={handleUpdateCredentials} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Current Password (Required)</label>
                        <input
                            type="password"
                            placeholder="Enter current password"
                            className={InputClass}
                            value={formData.currentPassword}
                            onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Required to verify your identity</p>
                    </div>

                    <div className="border-t border-white/10 pt-5">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                    <User size={14} /> New Username (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Leave blank to keep current"
                                    className={InputClass}
                                    value={formData.newUsername}
                                    onChange={e => setFormData({ ...formData, newUsername: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                    <Key size={14} /> New Password (Optional)
                                </label>
                                <input
                                    type="password"
                                    placeholder="Leave blank to keep current"
                                    className={InputClass}
                                    value={formData.newPassword}
                                    onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                                />
                            </div>

                            {formData.newPassword && (
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Re-enter new password"
                                        className={InputClass}
                                        value={formData.confirmPassword}
                                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/10">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20 font-medium disabled:opacity-50"
                        >
                            <Save size={18} /> {loading ? "Updating..." : "Update Credentials"}
                        </button>
                    </div>
                </form>
            </GlassCard>

            <GlassCard className="!p-6 max-w-2xl border-l-4 border-l-yellow-500/50">
                <div className="flex items-start gap-3">
                    <div className="text-yellow-400 mt-1">⚠️</div>
                    <div>
                        <h5 className="font-bold text-white mb-1">Security Notice</h5>
                        <p className="text-sm text-gray-400">
                            Make sure to remember your new credentials. If you lose access, you'll need to update them directly in the database.
                        </p>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};

export default Settings;
