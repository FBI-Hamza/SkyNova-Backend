const express = require('express');
const router = express.Router();
const question = require('../controller/question.controller')
// const multer = require('multer');
// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 50 * 1024 * 1024 }
//   });
const upload = require('../multer.config');


router.post('/createQuestion',question.createQuestion);
router.get('/viewQuestions', question.viewQuestions);
router.get('/viewQuestion/:id', question.viewById);
router.get('/countQuestions', question.countQuestions);
router.delete('/deleteQuestion/:id', question.deleteQuestion);
router.patch('/updateQuestion/:id', question.updateQuestion);
module.exports = router;
