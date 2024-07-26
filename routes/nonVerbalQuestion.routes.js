const express = require('express');
const router = express.Router();
const nonVerbalQuestion = require('../controller/nonVerbalQuestion.controller')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});

router.post('/createNonVerbalQuestion', upload.fields([{ name: 'questionImage', maxCount: 1 },{ name: 'optionsImages', maxCount: 4 },{ name: 'answerImage', maxCount: 1 },]), nonVerbalQuestion.createNonVerbalQuestion);
router.get('/viewNonVerbalQuestion', nonVerbalQuestion.viewNonVerbalQuestion);
router.get('/viewNonVerbalQuestion/:id', nonVerbalQuestion.viewById);
router.get('/countNonVerbalQuestions', nonVerbalQuestion.countNonVerbalQuestions);
router.delete('/deleteNonVerbalQuestion/:id', nonVerbalQuestion.deleteNonVerbalQuestion);
router.patch('/updateNonVerbalQuestion/:id',upload.single('nonVerbalQuestion'), nonVerbalQuestion.updateNonVerbalQuestion);
module.exports = router;
