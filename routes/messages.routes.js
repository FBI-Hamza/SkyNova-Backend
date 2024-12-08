const express = require("express");
const router = express.Router();
const Messages = require("../controller/message.controller");
const verifyJWT = require("../auth.middleware");

router.get("/viewConversations", verifyJWT, Messages.getConversations);
router.get("/viewConversation/:userId", verifyJWT, Messages.getConversation);
router.post("/createMessage", Messages.createMessage);
router.get("/viewMessages", Messages.viewMessage);
router.get("/viewMessage/:id", Messages.viewById);
router.delete("/deleteMessage/:id", Messages.deleteMessage);
router.patch("/updateMessage/:id", Messages.updateMessage);
module.exports = router;
