const express = require('express');
const Forum = require('../Models/forumModel');

const router = express.Router();

// Get all discussions
router.get('/discussions', async (req, res) => {
  try {
    const forum = await Forum.findOne(); // Assuming a single forum document
    res.json(forum.discussions || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch discussions' });
  }
});

// Add a new discussion
router.post('/discussions', async (req, res) => {
  try {
    const { title, content, category, tags, author } = req.body;

    const newDiscussion = {
      title,
      content,
      category,
      tags,
      author,
      createdAt: new Date(),
      upvotes: 0,
      views: 0,
      isBookmarked: false,
      isPinned: false,
      replies: [],
    };

    const forum = await Forum.findOne();
    if (!forum) {
      const newForum = new Forum({ discussions: [newDiscussion] });
      await newForum.save();
      res.status(201).json(newDiscussion);
    } else {
      forum.discussions.push(newDiscussion);
      await forum.save();
      res.status(201).json(newDiscussion);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add discussion' });
  }
});

// Add a reply to a discussion
router.post('/discussions/:id/replies', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;

    const forum = await Forum.findOne();
    if (!forum) return res.status(404).json({ error: 'Forum not found' });

    const discussion = forum.discussions.id(id);
    if (!discussion) return res.status(404).json({ error: 'Discussion not found' });

    const newReply = {
      content,
      author,
      createdAt: new Date(),
      upvotes: 0,
      isVerified: false,
    };

    discussion.replies.push(newReply);
    await forum.save();

    res.status(201).json(newReply);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add reply' });
  }
});

// Upvote a discussion
router.patch('/discussions/:id/upvote', async (req, res) => {
  try {
    const { id } = req.params;

    const forum = await Forum.findOne();
    if (!forum) return res.status(404).json({ error: 'Forum not found' });

    const discussion = forum.discussions.id(id);
    if (!discussion) return res.status(404).json({ error: 'Discussion not found' });

    discussion.upvotes += 1;
    await forum.save();

    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upvote discussion' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const forum = await Forum.findOne();
    res.json(forum.categories || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;