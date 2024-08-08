const express = require('express');
const router = express.Router();
const Messages = require('../controller/message.controller')

router.post('/createMessage', Messages.createMessage);
router.get('/viewMessages', Messages.viewMessage);
router.get('/viewMessage/:id', Messages.viewById);
router.delete('/deleteMessage/:id', Messages.deleteMessage);
router.patch('/updateMessage/:id', Messages.updateMessage);
module.exports = router;
