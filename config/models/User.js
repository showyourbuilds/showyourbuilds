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
    provider: { type: Array, required: true, default: ['credentials'] },
    followers: {
        type: {
            total: { type: Number, default: 0 },
            users: { type: Array, default: [] },
        },
        default: {
            total: 0,
            users: [],
        }
    },
},
    {
        timestamps: true,
    });

export default mongoose.models.User || mongoose.model("User", user);