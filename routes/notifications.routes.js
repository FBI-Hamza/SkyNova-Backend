const express = require('express');
const router = express.Router();
const notification = require('../controller/notification.controller')

router.post('/createNotification', notification.createNotification);
router.get('/viewNotifications', notification.viewNotifications);
router.get('/viewNotification/:id', notification.viewById);
// router.get('/countnotification', notification.countnotificationzes);
router.delete('/deleteNotification/:id', notification.deleteNotification);
router.patch('/updateNotification/:id', notification.updateNotification);
module.exports = router;
