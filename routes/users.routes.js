const express = require('express');
const router = express.Router();
const users = require('../controller/users.controller');
const verifyJWT = require('../auth.middleware'); 

router.post('/signup', users.signup);
router.post('/login', users.login);
router.post('/logout', users.logout);
router.post('/forgetPassword', users.forgetPassword);
router.post('/forgetPasswordLoggedIn',verifyJWT, users.forgetPasswordLoggedIn);
router.post('/verifyCode', users.verifyPassword);
router.post('/resetPassword', users.resetPassword);
router.get('/viewAdmins',users.viewAdmins);
router.post('/contactUs',users.contactUs);
router.patch('/blockUser/:id',users.blockUser);


module.exports = router;
