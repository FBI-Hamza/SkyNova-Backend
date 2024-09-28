const express = require('express');
const router = express.Router();
const jets = require('../controller/jets.controller');
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage()});
const upload = require('../multer.config');
const verifyJWT = require('../auth.middleware.js'); 

// router.use(verifyJWT);
router.post('/createJet',upload.single('jetImage'),jets.createJet);
router.get('/viewJets', jets.viewJets);
router.get('/viewJet/:id', jets.jetViewById);
router.get('/countJets', jets.countJets);
router.delete('/deleteJet/:id', jets.deleteJet);
router.patch('/updateJet/:id',upload.fields([{ name: 'jetImage', maxCount: 1 }]), jets.updateJet);

module.exports = router;