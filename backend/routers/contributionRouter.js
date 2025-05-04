const express = require('express');
const Contribution = require('../Models/contributionModel');

const router = express.Router();

// Get all contributions
router.get('/getall', async (req, res) => {
  try {
    const contributions = await Contribution.find().populate('questionId');
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

// Add a new contribution
router.post('/add', async (req, res) => {
  try {
    const { questionId, question, answer, user } = req.body;

    const newContribution = new Contribution({
      questionId,
      question,
      answer,
      user,
    });

    const savedContribution = await newContribution.save();
    res.status(201).json(savedContribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add contribution' });
  }
});

// Update a contribution's status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updatedContribution = await Contribution.findByIdAndUpdate(
      req.params.id,
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

// Delete a contribution
router.delete('/:id', async (req, res) => {
  try {
    const deletedContribution = await Contribution.findByIdAndDelete(req.params.id);

    if (!deletedContribution) {
      return res.status(404).json({ error: 'Contribution not found' });
    }

    res.json({ message: 'Contribution deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contribution' });
  }
});

module.exports = router;