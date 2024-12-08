const express = require("express");
const router = express.Router();
const users = require("../controller/users.controller");
const verifyJWT = require("../auth.middleware");

router.post("/signup", users.signup);
router.post("/login", users.login);
router.post("/logout", users.logout);
router.post("/forgetPassword", users.forgetPassword);
router.post("/forgetPasswordLoggedIn", verifyJWT, users.forgetPasswordLoggedIn);
router.post("/verifyCode", users.verifyPassword);
router.post("/resetPassword", users.resetPassword);
router.patch("/block/:id", users.blockUser);
router.patch("/unblock/:id", users.unblockUser);
router.get("/viewAdmins", users.viewAdmins);
router.post("/contactUs", users.contactUs);

module.exports = router;
