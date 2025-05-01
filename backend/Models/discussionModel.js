const { Schema, model } = require('../connection');

// Define the schema for a discussion thread
const discussionSchema = new Schema({
    title: { type: String, required: true }, // Title of the discussion thread
    content: { type: String, required: true }, // Main content of the thread
    author: {
        name: { type: String, required: true }, // Author's name
        role: { type: String, enum: ['student', 'expert'], required: true }, // Role of the author
        avatar: { type: String, default: '/placeholder.svg' }, // Avatar URL
    },
    tags: { type: [String], default: [] }, // Tags for categorization
    views: { type: Number, default: 0 }, // Number of views
    replies: { type: Number, default: 0 }, // Number of replies
    createdAt: { type: Date, default: Date.now }, // Timestamp for creation
    comments: [
        {
            author: {
                name: { type: String, required: true }, // Comment author's name
                role: { type: String, enum: ['student', 'expert'], required: true }, // Role of the comment author
                avatar: { type: String, default: '/placeholder.svg' }, // Avatar URL
            },
            content: { type: String, required: true }, // Content of the comment
            createdAt: { type: Date, default: Date.now }, // Timestamp for the comment
        },
    ],
});

module.exports = model('discussions', discussionSchema);