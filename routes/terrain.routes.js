const express = require('express');
const router = express.Router();
const terrains = require('../controller/terrain.controller');
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage()});
const upload = require('../multer.config');

router.post('/createTerrain',upload.single('terrainImage'),terrains.createTerrain);
router.get('/viewTerrain', terrains.viewTerrains);
router.get('/viewTerrain/:id', terrains.TerrainViewById);
router.delete('/deleteTerrain/:id', terrains.deleteTerrain);

module.exports = router;