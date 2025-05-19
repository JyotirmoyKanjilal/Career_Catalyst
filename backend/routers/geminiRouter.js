const express = require('express');
const router = express.Router();
const {GoogleGenerativeAI} = require('@google/generative-ai');

const genAI= new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

router.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
         const modifiedPrompt = `
        You are a recent graduate preparing for a job interview. Respond to the following interview question in a professional and confident tone:
        "${prompt}"
        `;
        const model= genAI.getGenerativeModel({
            model:"models/gemini-2.0-flash"
            
        })
        const result= await model.generateContent(modifiedPrompt)
        const response = result.response.text()
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating text' });
    }
})

module.exports = router;