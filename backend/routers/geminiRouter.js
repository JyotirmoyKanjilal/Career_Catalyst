const express = require('express');
const router = express.Router();
const {GoogleGenerativeAI} = require('@google/generative-ai');

const genAI= new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

router.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const model= genAI.getGenerativeModel({
            model:"models/gemini-2.0-flash"
            
        })
        const result= await model.generateContent(prompt)
        const response = result.response.text()
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating text' });
    }
})

module.exports = router;