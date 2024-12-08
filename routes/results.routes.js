const express = require("express");
const router = express.Router();
const Results = require("../controller/results.controller");
const verifyJWT = require("../auth.middleware.js");

router.post("/createResults", verifyJWT, Results.createQuizResult);
router.get("/viewResults", Results.viewQuizResults);
router.get("/viewResult/:id", verifyJWT, Results.viewResultById);
router.get("/countResults", Results.countQuizResults);
router.delete("/deleteResult/:id", Results.deleteQuizResult);
router.patch("/updateResult/:id", Results.updateQuizResult);
module.exports = router;
