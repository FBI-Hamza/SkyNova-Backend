const express = require('express');
const router = express.Router();
const tasks = require('../controller/tasks.controller');
const Task = require('../models/tasks.model'); 
const verifyJWT = require('../auth.middleware');

router.post('/createTask',verifyJWT, tasks.create);
router.put('/updateTask',verifyJWT, tasks.update);
router.get('/viewTask',verifyJWT, tasks.view);
router.get('/viewTask/:id',verifyJWT, tasks.viewById);
router.delete('/deleteTask/:id',verifyJWT, tasks.delete);
router.patch('/updateTask/:id',verifyJWT, tasks.update);
module.exports = router;
