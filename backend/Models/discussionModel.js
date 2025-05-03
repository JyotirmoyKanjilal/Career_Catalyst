const { Schema, model } = require('../connection');

const discussionSchema = new Schema({
    title: { type: String, required: true },
    question: { type: String, required: true },
    description: { type: String }, // Optional longer explanation
    tags: [String], // e.g., ['JavaScript', 'HR', 'System Design']
    createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    createdAt: { type: Date, default: Date.now },
    answers: [
        {
            answerText: { type: String, required: true },
            answeredBy: { type: Schema.Types.ObjectId, ref: 'users' },
            createdAt: { type: Date, default: Date.now },
        }
    ]
});

module.exports = model('discussions', discussionSchema);