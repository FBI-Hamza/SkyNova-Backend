const express = require('express');
const router = express.Router();
const questions = require('../controller/communityQuestion.controller')

router.post('/createCommunityQuestion', questions.createCommunityQuestion);
router.get('/viewCommunityQuestions', questions.viewCommunityQuestions);
router.get('/viewCommunityQuestion/:id', questions.viewById);
router.get('/countCommunityQuestions', questions.countCommunityQuestions);
router.delete('/deleteCommunityQuestion/:id', questions.deleteCommunityQuestion);
router.patch('/updateCommunityQuestion/:id', questions.updateCommunityQuestion);
module.exports = router;
