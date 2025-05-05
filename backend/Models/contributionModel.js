const { Schema, model } = require('../connection');

const contributionSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'questions', required: true }, // Reference to the question
  answer: { type: String, required: true }, // User's answer
  timestamp: { type: Date, default: Date.now }, // Timestamp of the contribution
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, // Status of the contribution
  upvotes: { type: Number, default: 0 }, // Number of upvotes
  downvotes: { type: Number, default: 0 }, // Number of downvotes
  views: { type: Number, default: 0 }, // Number of views
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Reference to the user who submitted the contribution
});

module.exports = model('contributions', contributionSchema);