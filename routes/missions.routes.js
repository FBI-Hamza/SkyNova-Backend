const express = require('express');
const router = express.Router();
const missions = require('../controller/mission.controller');
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage()});
const upload = require('../multer.config');

// const verifyJWT = require('C:\Users\lenovo\Documents\FYP\ExpressApp\auth.middleware.js'); 

// router.use(verifyJWT);
router.post('/createMission',upload.single('missionImage'),missions.createMission);
router.get('/viewMissions', missions.viewMissions);
router.get('/viewMet/:id', missions.missionViewById);
router.get('/countMissions', missions.countMissions);
router.delete('/deleteMission/:id', missions.deleteMission);
router.patch('/updateMission/:id',upload.fields([{ name: 'missionImage', maxCount: 1 }]), missions.updateMission);

module.exports = router;