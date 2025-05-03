const { Schema, model } = require('../connection');

// Define the schema for expert feedback
const expertFeedbackSchema = new Schema({
    queryId: { type: Schema.Types.ObjectId, ref: 'discussions', required: true }, // Reference to the discussion or query
    expertId: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Reference to the expert providing feedback
    content: { type: String, required: true }, // Feedback content provided by the expert
    rating: { type: Number, min: 1, max: 5, required: true }, // Rating (1-5 stars)
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the feedback was created
    upvotes: { type: Number, default: 0 }, // Number of upvotes for the feedback
    isVerified: { type: Boolean, default: false }, // Whether the feedback is verified
});

module.exports = model('expertFeedbacks', expertFeedbackSchema);