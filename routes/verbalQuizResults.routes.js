const express = require('express');
const router = express.Router();
const verbalQuizResult = require('../controller/verbalQuizResult.controller')
const verifyJWT = require('../auth.middleware'); 

router.post('/createVerbalQuizResult',verifyJWT ,verbalQuizResult.createVerbalQuizResult);
router.get('/viewVerbalQuizResults', verbalQuizResult.viewVerbalQuizResults);
router.get('/viewVerbalQuizResult/:id', verbalQuizResult.viewResultById);
// router.get('/countverbalQuizResult', verbalQuizResult.countverbalQuizResult);
router.delete('/deleteVerbalQuizResult/:id', verbalQuizResult.deleteVerbalQuizResult);
router.patch('/updateVerbalQuizResult/:id', verbalQuizResult.updateVerbalQuizResult);
module.exports = router;
