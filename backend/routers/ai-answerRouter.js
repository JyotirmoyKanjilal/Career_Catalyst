const express = require('express');
const AIAnswerModel = require('../Models/ai-answerModel');

const router = express.Router();


// Get all AI-generated answers
router.get('/getall', (req, res) => {
    AIAnswerModel.find()
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

// Add feedback to an AI-generated answer
router.post('/addfeedback/:id', (req, res) => {
    const feedback = req.body;
    AIAnswerModel.findByIdAndUpdate(
        req.params.id,
        { $push: { feedback: feedback } },
        { new: true }
    )
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

// Save an AI-generated answer for a user
router.put('/save/:id', (req, res) => {
    const userId = req.body.userId;
    AIAnswerModel.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { savedBy: userId } }, // Prevent duplicate entries
        { new: true }
    )
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;