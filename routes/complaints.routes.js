const express = require('express');
const router = express.Router();
const Complaints = require('../controller/complaint.controller')

router.post('/createComplaint', Complaints.createComplaint);
router.get('/viewComplaints', Complaints.viewComplaints);
router.get('/viewComplaint/:id', Complaints.viewById);
router.get('/countComplaints', Complaints.countComplaints);
router.delete('/deleteComplaint/:id', Complaints.deleteComplaint);
// router.patch('/updateComplaint/:id', Complaints.updateComplaint);
module.exports = router;
