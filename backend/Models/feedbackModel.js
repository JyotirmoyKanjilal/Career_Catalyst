const { Schema, model } = require('../connection');

// Define the schema for student feedback
const feedbackSchema = new Schema({
    answerId: { type: Schema.Types.ObjectId, ref: 'answers', required: true }, // Reference to the answer being reviewed
    expertName: { type: String, required: true }, // Name of the expert providing feedback
    comment: { type: String, required: true }, // Feedback comment
    rating: { type: Number, min: 1, max: 5, required: true }, // Rating (1-5 stars)
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the feedback was created
});

module.exports = model('feedbacks', feedbackSchema);