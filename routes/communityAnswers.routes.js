const express = require('express');
const router = express.Router();
const answers = require('../controller/communityAnswer.controller')
const verifyJWT = require('../auth.middleware');

router.post('/createCommunityAnswer',verifyJWT, answers.createCommunityAnswer);
router.get('/viewCommunityAnswers', answers.viewAnswers);
router.get('/viewCommunityAnswer/:id', answers.viewById);
router.get('/countCommunityAnswers', answers.countAnswers);
router.delete('/deleteCommunityAnswer/:id', answers.deleteAnswer);
router.patch('/updateCommunityAnswer/:id', answers.updateAnswer);
module.exports = router;
