import mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    bio: { type: String, required: false, default: "" },
    email: { type: String, required: false },
    password: { type: String, required: false },
    socials: { type: Array, required: false },
    projects: { type: Array, required: false },
    image: { type: String, required: false },
    bookmarks: { type: Array, required: false, default: [] },
    provider: { type: String, required: true, default: 'credentials' },
}, 
{
    timestamps: true,
});

export default mongoose.models.User || mongoose.model("User", user);