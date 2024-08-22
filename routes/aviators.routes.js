const express = require('express');
const router = express.Router();
const verifyJWT = require('../auth.middleware');
const aviator = require('../controller/aviator.controller')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});

router.post('/createAviator', aviator.createAviator);
router.post('/uploadPicture',upload.single('profileImage'), aviator.uploadDP);
router.get('/viewAviators', aviator.viewAviators);
router.get('/viewAviator/:id', aviator.viewById);
router.get('/countAviators', aviator.countAviators);
router.delete('/deleteAviator/:id', aviator.deleteAviator);
router.patch('/updateAviator/:id', aviator.updateAviator);
module.exports = router;
