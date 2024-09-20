const express = require('express');
const router = express.Router();
const nonVerbalQuizResult = require('../controller/nonVerbalQuizResult.controller')
const verifyJWT = require('../auth.middleware'); 

router.post('/createNonVerbalQuizResult',verifyJWT,nonVerbalQuizResult.createNonVerbalQuizResult);
router.get('/viewNonVerbalQuizResults', nonVerbalQuizResult.viewNonVerbalQuizResults);
router.get('/viewNonVerbalQuizResult/:id', nonVerbalQuizResult.viewResultById);
// router.get('/countnonVerbalQuizResult', nonVerbalQuizResult.countnonVerbalQuizResult);
router.delete('/deleteNonVerbalQuizResult/:id', nonVerbalQuizResult.deleteNonVerbalQuizResult);
router.patch('/updateNonVerbalQuizResult/:id', nonVerbalQuizResult.updateNonVerbalQuizResult);
module.exports = router;
