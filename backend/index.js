require('dotenv').config();


// import express
const express = require('express');
const UserRouter = require('./routers/UserRouter');
const QuestionRouter = require('./routers/questionRouter');
const GeminiRouter = require('./routers/geminiRouter');
const feedbackRouter = require('./routers/feedbackRouter');
const discussionRouter = require('./routers/discussionRouter');
const aiAnswerRouter = require('./routers/ai-answerRouter');
const contributionRouter = require('./routers/contributionRouter');
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
app.use('/api/questions',QuestionRouter);
app.use('/gemini',GeminiRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/discussion', discussionRouter);
app.use('/api/ai-answer', aiAnswerRouter);
app.use('/api/contributions', contributionRouter);
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