const express = require('express');
const router = express.Router();
const verbalQuiz = require('../controller/verbalQuiz.controller');

router.post('/createVerbalQuiz', verbalQuiz.createVerbalQuiz);
router.get('/viewVerbalQuizzes', verbalQuiz.viewVerbalQuizzes);
router.get('/viewVerbalQuiz/:id', verbalQuiz.viewById);
router.get('/countVerbalQuizzes', verbalQuiz.countVerbalQuizzes);
router.delete('/deleteVerbalQuiz/:id', verbalQuiz.deleteVerbalQuiz);
router.patch('/updateVerbalQuiz/:title', verbalQuiz.updateVerbalQuiz);
module.exports = router;
