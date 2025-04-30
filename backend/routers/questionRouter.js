const express = require('express');
const QuestionModel = require('../Models/questionModel');

const router = express.Router();

// Add a new question
router.post('/add', (req, res) => {
    new QuestionModel(req.body)
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Get all questions
router.get('/getall', (req, res) => {
    QuestionModel.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Get a question by ID
router.get('/getbyid/:id', (req, res) => {
    QuestionModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Get questions by category
router.get('/getbycategory/:category', (req, res) => {
    QuestionModel.find({ category: req.params.category })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Get questions by difficulty
router.get('/getbydifficulty/:difficulty', (req, res) => {
    QuestionModel.find({ difficulty: req.params.difficulty })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Update a question by ID
router.put('/update/:id', (req, res) => {
    QuestionModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Delete a question by ID
router.delete('/delete/:id', (req, res) => {
    QuestionModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Increment views for a question
router.put('/incrementviews/:id', (req, res) => {
    QuestionModel.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Increment answers for a question
router.put('/incrementanswers/:id', (req, res) => {
    QuestionModel.findByIdAndUpdate(req.params.id, { $inc: { answers: 1 } }, { new: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Update rating for a question
router.put('/updaterating/:id', (req, res) => {
    const { rating } = req.body;
    QuestionModel.findByIdAndUpdate(req.params.id, { rating }, { new: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

module.exports = router;