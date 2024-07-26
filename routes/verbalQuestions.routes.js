const express = require('express');
const router = express.Router();
const verbalQuestions = require('../controller/verbalQuestion.controller')

router.post('/createVerbalQuestion', verbalQuestions.createVerbalQuestion);
router.get('/viewVerbalQuestions', verbalQuestions.viewVerbalQuestion);
router.get('/viewQuestion/:id', verbalQuestions.viewById);
router.get('/countVerbalQuestions', verbalQuestions.countVerbalQuestions);
router.delete('/deleteVerbalQuestion/:id', verbalQuestions.deleteVerbalQuestions);
router.patch('/updateVerbalQuestion/:id', verbalQuestions.updateVerbalQuestion);
module.exports = router;
