const express = require('express');
const router = express.Router();
const answers = require('../controller/communityAnswer.controller')

router.post('/createCommunityAnswer', answers.createAnswer);
router.get('/viewCommunityAnswers', answers.viewAnswers);
router.get('/viewCommunityAnswer/:id', answers.viewById);
router.get('/countCommunityAnswers', answers.countAnswers);
router.delete('/deleteCommunityAnswer/:id', answers.deleteAnswer);
router.patch('/updateCommunityAnswer/:id', answers.updateAnswer);
module.exports = router;
