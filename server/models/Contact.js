const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
