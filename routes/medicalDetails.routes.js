const express = require('express');
const router = express.Router();
const medicalDetails = require('../controller/medicalDetails.controller')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});
const verifyJWT = require('../auth.middleware'); 

router.post('/createMedicalDetails',upload.single('medicalReport'),verifyJWT, medicalDetails.createMedicalDetails);
router.get('/viewMedicalDetails', medicalDetails.viewMedicalDetails);
router.get('/viewMedicalDetails/:id', medicalDetails.viewById);
router.delete('/deleteMedicalDetails/:id', medicalDetails.deletemedicalDetails);
router.patch('/updateMedicalDetails/:id', medicalDetails.updatemedicalDetails);
module.exports = router;
