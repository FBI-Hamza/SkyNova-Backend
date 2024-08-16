const express = require('express');
const router = express.Router();
const users = require('../controller/users.controller');

router.post('/signup', users.signup);
router.post('/login', users.login);
router.post('/forgetPassword', users.forgetPassword);
router.post('/verifyCode', users.verifyPassword);
router.post('/resetPassword', users.resetPassword);
router.get('/viewAdmins',users.viewAdmins);
module.exports = router;
