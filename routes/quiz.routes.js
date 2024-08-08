const express = require('express');
const router = express.Router();
const quiz = require('../controller/quiz.controller')

router.post('/createQuiz', quiz.createQuiz);
router.get('/viewQuizzes', quiz.viewQuizzes);
router.get('/viewQuiz/:title', quiz.viewByTitle);
router.get('/countQuizzes', quiz.countQuizzes);
router.delete('/deleteQuiz/:id', quiz.deleteQuiz);
router.patch('/updateQuiz/:id', quiz.updateQuiz);
module.exports = router;
