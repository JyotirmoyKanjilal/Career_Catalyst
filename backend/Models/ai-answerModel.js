const { Schema, model } = require('../connection');

// Define the schema for AI-generated answers
const aiAnswerSchema = new Schema({
    question: { type: String, required: true }, // The interview question
    answer: { type: String, required: true }, // The AI-generated answer
    generatedBy: { type: String, default: 'AI' }, // Indicates the source of the answer
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the answer was generated
    upvotes: { type: Number, default: 0 }, // Number of upvotes for the answer
    downvotes: { type: Number, default: 0 }, // Number of downvotes for the answer
    feedback: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'users' }, // Reference to the user providing feedback
            comment: { type: String }, // Feedback comment
            createdAt: { type: Date, default: Date.now }, // Timestamp for the feedback
        },
    ],
    savedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }], // List of users who saved the answer
});

module.exports = model('aiAnswers', aiAnswerSchema);