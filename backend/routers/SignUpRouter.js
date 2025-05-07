const express = require('express');
const router = express.Router();
const Model = require('../Models/SignUpModel');
// const bcrypt = require('bcrypt');

// Signup Route
router.post('/add', async (req, res) => {
    try {
        // Check if user already exists
        const userExists = await Model.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if passwords match
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user without confirmPassword in database
        const newUser = new Model({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            city: req.body.city || 'Not Specified',
            role: 'user'
        });

        // Save user
        const result = await newUser.save();
        res.status(201).json({
            message: 'User registered successfully',
            data: result
        });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Error during signup', error: error.message });
    }
});

// Get all users
router.get('/getall', async (req, res) => {
    try {
        const result = await Model.find();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by id
router.get('/getbyid/:id', async (req, res) => {
    try {
        const result = await Model.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // If updating password, hash it
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
            updateData.confirmPassword = updateData.password;
        }

        const result = await Model.findByIdAndUpdate(id, updateData, { new: true });
        res.json({
            message: 'User updated successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Model.findByIdAndDelete(id);
        res.json({
            message: 'User deleted successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;