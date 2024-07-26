const express = require('express');
const router = express.Router();
const Community = require('../controller/Community.controller')

router.post('/createCommunity', Community.createCommunity);
router.get('/viewCommunity', Community.viewCommunity);
router.get('/viewCommunity/:id', Community.viewById);
router.get('/countCommunity', Community.countCommunity);
router.delete('/deleteCommunity/:id', Community.deleteCommunity);
router.patch('/updateCommunity/:id', Community.updateCommunity);
module.exports = router;
