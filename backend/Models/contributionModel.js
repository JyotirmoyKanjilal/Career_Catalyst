const { Schema, model } = require('../connection');

const contributionSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'questions', required: true }, // Reference to the question
  question: { type: String, required: true }, // Question text
  answer: { type: String, required: true }, // User's answer
  timestamp: { type: Date, default: Date.now }, // Timestamp of the contribution
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, // Status of the contribution
  upvotes: { type: Number, default: 0 }, // Number of upvotes
  downvotes: { type: Number, default: 0 }, // Number of downvotes
  views: { type: Number, default: 0 }, // Number of views
  user: { type: String, required: true }, // User who submitted the contribution
});

module.exports = model('contributions', contributionSchema);