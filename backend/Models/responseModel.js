const { Schema, model } = require('../connection');

const responseSchema = new Schema({
  queryId: { type: Schema.Types.ObjectId, ref: 'discussions', required: true },
  expert: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  content: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('responses', responseSchema);