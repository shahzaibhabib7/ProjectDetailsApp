const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, 'A project must have a name'],
        unique: true,
        trim: true
    },
    projectSource: {
        type: String,
        required: [true, 'A project must have a source']
    },
    clientName: {
        type: String,
        required: [true, 'A project must have a client name']
    },
    developers: {
        type: [String],
        required: [true, 'A project must have a developer']
    },
    projectManager: {
        type: String,
        required: [true, 'A project must have a manager']
    },
    startDate: {
        type: Date,
        required: [true, 'A project must have a starting date']
    },
    dueDate: {
        type: Date,
        required: [true, 'A project must have a due date']
    },
    platform: {
        type: String,
        required: [true, 'A project must have a platform']
    },
    theme: {
        type: String,
        required: [true, 'A project must have a theme']
    },
    plugins: {
        type: [String]
    },
    status: {
        type: String
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;