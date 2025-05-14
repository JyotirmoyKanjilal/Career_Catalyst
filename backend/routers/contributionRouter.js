const express = require('express');
const Contribution = require('../Models/contributionModel');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Get all contributions
router.get('/getall', async (req, res) => {
  try {
    const contributions = await Contribution.find().populate('questionId user');
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contributions' });
  }
});

// Get a specific contribution by ID
router.get('/:id', async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id).populate('questionId');
    if (!contribution) {
      return res.status(404).json({ error: 'Contribution not found' });
    }
    res.json(contribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the contribution' });
  }
});

// Add a new contribution (user id from token)
router.post('/add', verifyToken, async (req, res) => {
  // console.log(req.user);
  
  try {
    const { questionId, question, answer } = req.body;

    const newContribution = new Contribution({
      questionId,
      question,
      answer,
      user: req.user._id, // user id from token
    });

    const savedContribution = await newContribution.save();
    res.status(201).json(savedContribution);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to add contribution' });
  }
});

// Update a contribution's status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updatedContribution = await Contribution.findByIdAndUpdate(
      req.params._id,
      { status },
      { new: true }
    );

    if (!updatedContribution) {
      return res.status(404).json({ error: 'Contribution not found' });
    }

    res.json(updatedContribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contribution status' });
  }
});

// Delete a contribution (only by owner)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params._id);

    if (!contribution) {
      return res.status(404).json({ error: 'Contribution not found' });
    }

    if (contribution.user.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Not authorized to delete this contribution' });
    }

    await Contribution.findByIdAndDelete(req.params._id);
    res.json({ message: 'Contribution deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contribution' });
  }
});

module.exports = router;