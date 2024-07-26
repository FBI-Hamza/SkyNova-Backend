const express = require('express');
const router = express.Router();
const jets = require('../controller/jets.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});

router.post('/createJet',upload.single('jetImage'),jets.createJet);
router.get('/viewJets', jets.viewJets);
router.get('/viewJet/:id', jets.jetViewById);
router.delete('/deleteJet/:id', jets.deleteJet);

module.exports = router;