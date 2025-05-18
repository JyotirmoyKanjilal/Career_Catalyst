const express = require('express');
const FeedbackModel = require('../Models/feedbackModel');
const verifyExpert = require('../middlewares/verifyExpert');

const router = express.Router();

// Add new feedback (protected route - only experts can add feedback)
router.post('/add', verifyExpert, (req, res) => {
  const { queryId, content, rating } = req.body;
  
  // Use expert ID from verified token
  const expertId = req.expert.id;
  
  new FeedbackModel({
    queryId,
    expertId,
    content,
    rating,
    isVerified: true // Auto-verify since we confirmed expert status
  })
    .save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json(err));
});

// Get all feedback
router.get('/getall', (req, res) => {
    FeedbackModel.find()
        .populate('expertId', 'name role company')
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

// Get all feedback for a specific query
router.get('/getbyquery/:queryId', (req, res) => {
    FeedbackModel.find({ queryId: req.params.queryId })
        .populate('expertId', 'name role company') // Populate expert details
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

// Get feedback by ID
router.get('/getbyid/:id', (req, res) => {
    FeedbackModel.findById(req.params.id)
        .populate('expertId', 'name role company') // Populate expert details
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

// Update feedback by ID
router.put('/update/:id', (req, res) => {
    FeedbackModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

// Delete feedback by ID
router.delete('/delete/:id', (req, res) => {
    FeedbackModel.findByIdAndDelete(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

// Increment upvotes for feedback
router.put('/upvote/:id', (req, res) => {
    FeedbackModel.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true })
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;