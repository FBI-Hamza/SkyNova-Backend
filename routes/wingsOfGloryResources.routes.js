const express = require('express');
const router = express.Router();
const WingsOfGlory = require('../controller/wingsOfGloryResource.controller.js')
const upload = require('../multer.config');
const verifyJWT = require('../auth.middleware.js'); 

router.post('/createWingsOfGloryResource',upload.single('file'), WingsOfGlory.createWingsOfGloryResource);
router.get('/viewWingsOfGloryResources', WingsOfGlory.viewWingsOfGloryResource);
router.get('/viewWingsOfGloryResource/:id', WingsOfGlory.WingsOfGloryResourceViewById);
router.delete('/deleteWingsOfGloryResource/:id', WingsOfGlory.deleteWingsOfGloryResource);
router.patch('/updateWingsOfGloryResource/:id', WingsOfGlory.updateWingsOfGloryResource);
module.exports = router;
