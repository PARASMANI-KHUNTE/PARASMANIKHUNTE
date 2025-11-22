const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema({
    count: {
        type: Number,
        default: 0,
    },
    lastVisited: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
