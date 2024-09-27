const express = require('express');
const router = express.Router();
const Results = require('../controller/results.controller')

router.post('/createResults', Results.createQuizResult);
router.get('/viewResults', Results.viewResults);
router.get('/viewResult/:id', Results.viewById);
router.get('/countResults', Results.countResult);
router.delete('/deleteResult/:id', Results.deleteQuizResult);
router.patch('/updateResult/:id', Results.updateQuizResult);
module.exports = router;
