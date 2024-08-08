const express = require('express');
const router = express.Router();
const Documentary = require('../controller/documentary.controller')

router.post('/createDocumentary', Documentary.createDocumentary);
router.get('/viewDocumentaries', Documentary.viewDocumentaries);
router.get('/viewDocumentary/:id', Documentary.documentaryViewById);
router.delete('/deleteDocumentary/:id', Documentary.deleteDocumentary);
router.patch('/updateDocumentary/:id', Documentary.updateDocumentary);
module.exports = router;
