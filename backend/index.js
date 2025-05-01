require('dotenv').config();


// import express
const express = require('express');
const UserRouter = require('./routers/UserRouter');
const QuestionRouter = require('./routers/questionRouter');
const GeminiRouter = require('./routers/geminiRouter');
const forumRouter = require('./routers/forumRouter');
const feedbackRouter = require('./routers/feedbackRouter');
const cors =require('cors');


// initialize express
const app = express();

const port = process.env.PORT || 5000;

//middlewares
app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use('/user',UserRouter);
app.use('/questions',QuestionRouter);
app.use('/gemini',GeminiRouter);
app.use('/api/forum', forumRouter);
app.use('/api/feedback', feedbackRouter);

// endpoint or route
app.get('/',(req,res) => {
    res.send('response from express');
});

app.get('/add',(req,res) => {
    res.send('response from add');
});

app.listen(port, () => {
    console.log('server started');
});