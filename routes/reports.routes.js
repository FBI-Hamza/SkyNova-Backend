const express = require('express');
const router = express.Router();
const report = require('../controller/report.controller')

router.post('/createReport', report.createReport);
router.get('/viewReport', report.viewReports);
router.get('/viewReport/:id', report.viewById);
router.get('/countReports', report.countReports);
router.delete('/deleteReport/:id', report.deleteReport);
router.patch('/updateReport/:id', report.updateReport);
module.exports = router;
