const express = require('express');
const Model = require('../Models/UserModel');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/authenticate', async (req, res) => {
    console.log(req.body);
    
    try {
        // Find user by email
        const user = await Model.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const { _id, name, email, role } = user;
        const payload = { _id, name, email, role }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);

                } else {
                    res.status(200).json({ token, role });
                }
            }
        )

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
});

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });

});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
});

router.get('/getbycity/:city', (req, res) => {
    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err)
        });

})

router.get('/getbyemail/:email', (req, res) => {
    Model.find({ email: req.params.email })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err)
        });
})

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err)
        });
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err)
        });
});

router.post('/authenticate', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    Model.findOne({ email, password })
        .then((result) => {

            if (result) {
                const { _id, name, email } = result;
                const payload = { _id, name, email }

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);

                        } else {
                            res.status(200).json({ token });
                        }
                    }

                )

            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
})

router.get('/growth', async (req, res) => {
    try {
        // Get user growth for the last 7 days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6); // Last 7 days including today
        
        // Array to hold the results
        const userGrowth = [];
        
        // For each day, count users created on that day
        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          
          const nextDate = new Date(currentDate);
          nextDate.setDate(currentDate.getDate() + 1);
          
          const count = await Model.countDocuments({
            createdAt: {
              $gte: currentDate,
              $lt: nextDate
            }
          });
          
          userGrowth.push(count);
        }
        
        res.json({ userGrowth });
      } catch (error) {
        console.error('Error fetching user growth:', error);
        res.status(500).json({ error: 'Failed to fetch user growth data' });
      }
});

module.exports = router;