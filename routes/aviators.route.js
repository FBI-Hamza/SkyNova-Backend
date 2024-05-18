const express = require('express');
const router = express.Router();
const verifyJWT = require('../auth.middleware');
const aviator = require('../controller/aviator.controller')

router.post('/createAviator', aviator.createAviator);
router.put('/updateAviator', aviator.update);
router.get('/viewAviators', aviator.viewAviators);
router.get('/viewAviator/:id', aviator.viewById);
router.get('/countAviators', aviator.countAviators);
router.delete('/deleteAviator/:id', aviator.delete);
router.patch('/updateAviator/:id', aviator.update);
module.exports = router;
