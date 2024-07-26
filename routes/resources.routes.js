const express = require('express');
const router = express.Router();
const Resources = require('../controller/resource.controller')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});

router.post('/createResource',upload.single('resource'), Resources.createResource);
router.get('/viewResources', Resources.viewResources);
router.get('/viewResource/:id', Resources.resourceViewById);
router.delete('/deleteResource/:id', Resources.deleteResource);
router.patch('/updateResource/:id', Resources.updateResource);
module.exports = router;