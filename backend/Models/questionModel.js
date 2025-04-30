const { Schema, model } = require('../connection');

const questionSchema = new Schema({
    question: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Behavioral, Technical
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    tags: { type: [String], default: [] }, // Array of tags
    saved: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }, // Average rating
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('questions', questionSchema);