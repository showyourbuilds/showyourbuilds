import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    highlightedFeatures: {
        type: [String],
        default: '',
    },
    techStack: {
        type: [{
            label: String,
            value: String
        }],
        default: [],
    },
    links: {
        type: [{
            label: String,
            link: String,
        }]
    },
    repoLink: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    commits: {
        type: Number,
        default: 0,
    },
    duration: {
        type: String,
        default: '',
    },
    likes: {
        type: Number,
        default: 0,
    },
    snapshots: {
        type: [String],
        default: [""]
    },
    sponsors: {
        type: [String],
        default: [""]
    },
}, {
    timestamps: true,

});

export default mongoose.models.Project || mongoose.model("Project", projectSchema);