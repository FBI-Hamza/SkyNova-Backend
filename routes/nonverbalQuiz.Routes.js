const express = require('express');
const router = express.Router();
const nonVerbalQuiz = require('../controller/nonVerbalQuiz.controller')

router.post('/createnonVerbalQuiz', nonVerbalQuiz.createNonVerbalQuiz);
router.get('/viewNonVerbalQuizzes', nonVerbalQuiz.viewNonVerbalQuizzes);
router.get('/viewNonVerbalQuiz/:title', nonVerbalQuiz.viewByTitle);
router.get('/countNonVerbalQuizzes', nonVerbalQuiz.countNonVerbalQuizzes);
router.delete('/deleteNonVerbalQuiz/:id', nonVerbalQuiz.deleteNonVerbalQuiz);
router.patch('/updateNonVerbalQuiz/:id', nonVerbalQuiz.updateNonVerbalQuiz);
module.exports = router;
