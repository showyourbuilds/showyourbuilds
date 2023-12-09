const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
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
    },
    techStack: {
        type: [String],
    },
    links: {
        type: [{
            website: String,
            link: String,
        }]
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
    },
    likes: {
        type: Number,
        default: 0,
    },
    snapshots: {
        type: [String],
    },
    sponsors: {
        type: [String],
    },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
