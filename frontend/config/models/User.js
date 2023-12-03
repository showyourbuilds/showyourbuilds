import mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, required: true, default: 'user' },
    image: { type: String, required: false },
}, 
{
    timestamps: true,
});

module.exports = mongoose.models.User || mongoose.model("User", user);