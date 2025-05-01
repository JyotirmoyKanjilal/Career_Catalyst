const express = require('express');
const FeedbackModel = require('../Models/feedbackModel');

const router = express.Router();

// Add new feedback
router.post('/add', (req, res) => {
    new FeedbackModel(req.body)
        .save()
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

// Get all feedback for a specific answer
router.get('/getbyanswer/:answerId', (req, res) => {
    FeedbackModel.find({ answerId: req.params.answerId })
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

// Get feedback by ID
router.get('/getbyid/:id', (req, res) => {
    FeedbackModel.findById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

// Delete feedback by ID
router.delete('/delete/:id', (req, res) => {
    FeedbackModel.findByIdAndDelete(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;