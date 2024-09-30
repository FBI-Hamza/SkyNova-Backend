const express = require('express');
const router = express.Router();
const report = require('../controller/finalReport.controller')
const verifyJWT = require('../auth.middleware'); 

router.post('/createReport',verifyJWT, report.createReport);
router.get('/viewReport', report.viewReports);
router.get('/viewReport/:id', report.reportViewById);
router.get('/countReports', report.countReports);
router.delete('/deleteReport/:id', report.deleteReport);
router.patch('/updateReport/:id', report.updateReport);
module.exports = router;
