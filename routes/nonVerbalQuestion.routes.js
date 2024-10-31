const express = require('express');
const router = express.Router();
const nonVerbalQuestion = require('../controller/nonVerbalQuestion.controller')
// const multer = require('multer');
// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 50 * 1024 * 1024 }
//   });
const upload = require('../multer.config');


router.post('/createNonVerbalQuestion',upload.fields([{ name: 'questionImg', maxCount: 1, },{ name: 'optionsImgs', maxCount: 4 },]), nonVerbalQuestion.createNonVerbalQuestion);
router.get('/viewNonVerbalQuestion', nonVerbalQuestion.viewNonVerbalQuestion);
router.get('/viewNonVerbalQuestion/:id', nonVerbalQuestion.viewById);
router.get('/countNonVerbalQuestions', nonVerbalQuestion.countNonVerbalQuestions);
router.delete('/deleteNonVerbalQuestion/:id', nonVerbalQuestion.deleteNonVerbalQuestion);
router.patch('/updateNonVerbalQuestion/:id',upload.single('nonVerbalQuestion'), nonVerbalQuestion.updateNonVerbalQuestion);
module.exports = router;
