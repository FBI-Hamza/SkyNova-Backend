const express = require('express');
const router = express.Router();
const medicalDetails = require('../controller/medicalDetails.controller')

router.post('/createMedicalDetails', medicalDetails.createMedicalDetails);
router.get('/viewMedicalDetails', medicalDetails.viewMedicalDetails);
router.get('/viewMedicalDetails/:id', medicalDetails.viewById);
router.delete('/deleteMedicalDetails/:id', medicalDetails.deletemedicalDetails);
router.patch('/updateMedicalDetails/:id', medicalDetails.updatemedicalDetails);
module.exports = router;
