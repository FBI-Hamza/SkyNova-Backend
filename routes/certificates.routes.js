const express = require('express');
const router = express.Router();
const Certificates = require('../controller/certificates.controller')
const upload = require('../multer.config');
const verifyJWT = require('../auth.middleware.js'); 

router.post('/createCertificates',verifyJWT,Certificates.createCertificate);
router.get('/viewCertificates', Certificates.viewCertificates);
router.get('/viewCertificate/:id', Certificates.viewById);
router.get('/countCertificates', Certificates.countCertificates);
router.delete('/deleteCertificate/:id', Certificates.deleteCertificate);
router.patch('/updateCertificate/:id', Certificates.updateCertificate);
module.exports = router;
