import mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    socials: { type: Array, required: false },
    projects: { type: Array, required: false },
    image: { type: String, required: false },
    provider: { type: String, required: true, default: 'credentials' },
}, 
{
    timestamps: true,
});

export default mongoose.models.User || mongoose.model("User", user);