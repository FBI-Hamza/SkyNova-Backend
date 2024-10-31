const express = require('express');
const router = express.Router();
const WarHero = require('../controller/warHero.controller')

router.post('/createWarHero', WarHero.createWarHero);
router.get('/viewWarHeroes', WarHero.viewWarHeroes);
router.get('/viewWarHero/:id', WarHero.warHeroViewById);
router.delete('/deleteWarHero/:id', WarHero.deleteWarHero);
router.patch('/updateWarHero/:id', WarHero.updateWarHero);
module.exports = router;
