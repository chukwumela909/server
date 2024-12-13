const express = require('express');
const Question = require('../models/questions')
const router = express.Router();

//get the create screen
router.get('/create', (req, res) => res.render('create'));

// Create a new question
router.post('/create', async (req, res) => {
    const { question, answer } = req.body;

    // Gather options from the request body
    const options = [
        req.body.option1,
        req.body.option2,
        req.body.option3,
        req.body.option4
    ];

    // Create a new question object
    const newQuestion = new Question({
        question,
        options,
        answer
    });

    // Save the new question to the database
    await newQuestion.save();

    // Redirect to the questions page
    res.redirect('/questions/quiz');
});

// Test
router.get('/test', async (req, res) => {
    const questions = await Question.find();
    const randomizedQuestions = questions.sort(() => 0.5 - Math.random());
    res.render('test', { questions: randomizedQuestions });
});

//Test the user
router.get('/quiz', async (req, res) => {
    const questions = await Question.find();
    const randomizedQuestions = questions;
    res.render('quiz', { questions: randomizedQuestions });
});

router.use(express.json());

router.post('/submit-answers', async (req, res) => {
    try {
        const userAnswers = req.body; // Access submitted answers from the form
        const questions = await Question.find(); // Retrieve all questions from the database

        let score = 0;

        // Grade the user's answers
        questions.forEach((question, index) => {
            // Check if the user's answer matches the correct answer
            if (userAnswers[`question-${index}`] === question.answer) {
                score++; // Increment score for each correct answer
            }
        });

        // Render a results page with the user's score
        res.render('results', { score: score, total: questions.length });
    } catch (error) {
        console.error('Error processing answers:', error); // Log the error for debugging
        res.status(500).render('error', { message: 'An error occurred while processing your answers. Please try again later.' });
    }
});

module.exports = router;
