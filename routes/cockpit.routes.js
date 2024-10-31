const express = require('express');
const router = express.Router();
const cockpits = require('../controller/cockpit.controller');
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage()});
const upload = require('../multer.config');

// const verifyJWT = require('C:\Users\lenovo\Documents\FYP\ExpressApp\auth.middleware.js'); 

// router.use(verifyJWT);
router.post('/createCockpit',upload.single('jetImage'),cockpits.createCockpit);
router.get('/viewCockpits', cockpits.viewCockpits);
router.get('/viewCockpit/:id', cockpits.cockpitViewById);
router.get('/countCockpits', cockpits.countCockpits);
router.delete('/deleteCockpit/:id', cockpits.deleteCockpit);
router.patch('/updateCockpit/:id',upload.fields([{ name: 'jetImage', maxCount: 1 }]), cockpits.updateCockpit);

module.exports = router;