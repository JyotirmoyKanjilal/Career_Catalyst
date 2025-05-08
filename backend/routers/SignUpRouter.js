const express = require('express');
const bcrypt = require('bcryptjs');
const SignUp = require('../Models/UserModel');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, city, avatar, role } = req.body;

    // Check if user already exists
    const existingUser = await SignUp.findOne({ email });
    console.log(existingUser);
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Password match check
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: 'Passwords do not match' });
    // }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new SignUp({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      // city,
      // avatar,
      // role,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user: { name, email, city, role } });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Get all users (for admin/testing)
router.get('/all', async (req, res) => {
  try {
    const users = await SignUp.find().select('-password -confirmPassword');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

module.exports = router;