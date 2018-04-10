const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    // Mongoose uses this option to automatically add two new fields - createdAt and updatedAt to the schema.
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);