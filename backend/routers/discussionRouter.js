const express = require('express');
const DiscussionModel = require('../Models/discussionModel');

const router = express.Router();

// Create a new discussion
router.post('/create', async (req, res) => {
    try {
        const discussion = new Discussion(req.body);
        await discussion.save();
        res.status(201).json(discussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all discussions
router.get('/getall', async (req, res) => {
    try {
        const discussions = await Discussion.find().populate('createdBy', 'name email');
        res.json(discussions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific discussion by ID
router.get('/:id', async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id).populate('createdBy', 'name email');
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });
        res.json(discussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post an answer to a discussion
router.post('/:id/answer', async (req, res) => {
    try {
        const { answerText, answeredBy } = req.body;
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        discussion.answers.push({ answerText, answeredBy });
        await discussion.save();
        res.status(201).json(discussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
