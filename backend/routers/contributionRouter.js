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

// Get contributions by category
router.get('/by-category', async (req, res) => {
  try {
    // Aggregate contributions by category
    const categories = await Contribution.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { category: "$_id", count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);
    
    // If no results, return empty array
    if (!categories.length) {
      return res.json([
        { category: "Behavioral", count: 0 },
        { category: "Technical", count: 0 },
        { category: "Situational", count: 0 },
        { category: "Other", count: 0 },
      ]);
    }
    
    // Return the aggregated data
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch contribution categories' });
  }
});

// Improved pie chart function
const drawCategoryPieChart = () => {
  if (!pieChartRef.current) return;

  const canvas = pieChartRef.current;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Use real data from stats or fallback
  const data = stats.contributionsByCategory || [
    { category: "Behavioral", count: 45 },
    { category: "Technical", count: 30 },
    { category: "Situational", count: 15 },
    { category: "Other", count: 10 },
  ];

  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  // If no contributions, show empty state
  if (total === 0) {
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("No contribution data available", centerX, centerY);
    return;
  }

  let startAngle = 0;

  // Vibrant colors for pie slices
  const colors = ["#00A3A9", "#008C8B", "#006770", "#003B46", "#00D7E2", "#00BFC9"];

  // Draw pie slices
  data.forEach((item, index) => {
    const sliceAngle = (2 * Math.PI * item.count) / total;
    const endAngle = startAngle + sliceAngle;

    // Draw slice with subtle shadow
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();
    ctx.shadowColor = "transparent";

    // Draw percentage label 
    const labelAngle = startAngle + sliceAngle / 2;
    const labelRadius = radius * 0.7;
    const labelX = centerX + labelRadius * Math.cos(labelAngle);
    const labelY = centerY + labelRadius * Math.sin(labelAngle);

    const percent = Math.round((item.count / total) * 100);
    
    // Only show label if slice is big enough to fit text
    if (percent > 3) {
      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${percent}%`, labelX, labelY);
    }

    startAngle = endAngle;
  });

  // Draw center circle (donut hole)
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
  ctx.fillStyle = "#070F12";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Draw legend below the chart
  const legendY = centerY + radius + 20;
  const legendItemHeight = 20;
  const legendItemWidth = width / data.length;

  data.forEach((item, index) => {
    const legendX = (index * legendItemWidth) + (legendItemWidth / 2) - (width / 4);
    
    // Color box
    ctx.fillStyle = colors[index % colors.length];
    ctx.fillRect(legendX - 35, legendY, 10, 10);
    
    // Category name & count
    ctx.fillStyle = "#fff";
    ctx.font = "10px Arial";
    ctx.textAlign = "left";
    ctx.fillText(
      `${item.category} (${item.count})`, 
      legendX - 20, 
      legendY + 9
    );
  });
}

module.exports = router;