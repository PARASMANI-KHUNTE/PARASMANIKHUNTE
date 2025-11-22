const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await argon2.verify(this.password, enteredPassword);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await argon2.hash(this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
