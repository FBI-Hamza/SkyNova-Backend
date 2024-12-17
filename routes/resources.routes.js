const express = require("express");
const router = express.Router();
const Resources = require("../controller/resource.controller");
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage()});
const upload = require("../multer.config");

router.post("/createResource", upload.single("resourceFile"), Resources.createResource);
router.get("/viewResources", Resources.viewResources);
router.get("/viewResource/:id", Resources.resourceViewById);
router.get("/countResources", Resources.countResources);
router.delete("/deleteResource/:id", Resources.deleteResource);
router.patch("/updateResource/:id", upload.single("resourceFile"), Resources.updateResource);
module.exports = router;
