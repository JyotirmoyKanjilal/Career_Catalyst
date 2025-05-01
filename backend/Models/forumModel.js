const { Schema, model } = require('../connection');

const replySchema = new Schema({
  author: {
    name: String,
    avatar: String,
    role: String,
    title: String,
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
});

const discussionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  author: {
    name: String,
    avatar: String,
    role: String,
    joinDate: Date,
  },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  isBookmarked: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  replies: [replySchema],
});

const forumSchema = new Schema({
  discussions: [discussionSchema],
  categories: [
    {
      id: String,
      name: String,
      count: { type: Number, default: 0 },
    },
  ],
});

module.exports = model('forum', forumSchema);