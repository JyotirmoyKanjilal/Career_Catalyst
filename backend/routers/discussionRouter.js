const express = require('express');
const DiscussionModel = require('../Models/discussionModel');

const router = express.Router();

// Create a new discussion thread
router.post('/add', (req, res) => {
    new DiscussionModel(req.body)
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Get all discussion threads
router.get('/getall', (req, res) => {
    DiscussionModel.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Get a discussion thread by ID
router.get('/getbyid/:id', (req, res) => {
    DiscussionModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Update a discussion thread by ID
router.put('/update/:id', (req, res) => {
    DiscussionModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Delete a discussion thread by ID
router.delete('/delete/:id', (req, res) => {
    DiscussionModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Add a comment to a discussion thread
router.post('/addcomment/:id', (req, res) => {
    const comment = req.body;
    DiscussionModel.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: comment }, $inc: { replies: 1 } },
        { new: true }
    )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Increment views for a discussion thread
router.put('/incrementviews/:id', (req, res) => {
    DiscussionModel.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

module.exports = router;