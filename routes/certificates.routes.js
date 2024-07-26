const express = require('express');
const router = express.Router();
const Certificates = require('../controller/certificates.controller')

router.post('/createCertificates', Certificates.createCertificate);
router.get('/viewCertificates', Certificates.viewCertificates);
router.get('/viewCerrtificate/:id', Certificates.viewById);
router.get('/countCertificates', Certificates.countCertificates);
router.delete('/deleteCertificate/:id', Certificates.deleteCertificate);
router.patch('/updateCertificate/:id', Certificates.updateCertificate);
module.exports = router;
