const express = require('express');
const router = express.Router();
const Results = require('../controller/results.controller')

router.post('/createResults', Results.createResult);
router.get('/viewResults', Results.viewResults);
router.get('/viewResult/:id', Results.viewById);
// router.get('/countResults', Results.countResult);
router.delete('/deleteResult/:id', Results.deleteResult);
router.patch('/updateResult/:id', Results.updateResult);
module.exports = router;
