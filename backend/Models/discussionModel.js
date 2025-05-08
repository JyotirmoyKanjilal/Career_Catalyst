const { Schema, model } = require('../connection');

const discussionSchema = new Schema({
    title: { type: String, required: true },
    contribution: { type: Schema.Types.ObjectId, ref: 'contributions', required: true }, // <-- Added field
    description: { type: String }, // Optional longer explanation
    tags: [String], // e.g., ['JavaScript', 'HR', 'System Design']
    active: { type: Boolean, default: true }, // Indicates if the discussion is active
    views: { type: Number, default: 0 }, // Number of views
    upvotes: { type: Number, default: 0 }, // Number of upvotes
    downvotes: { type: Number, default: 0 }, // Number of downvotes
    createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('discussions', discussionSchema);