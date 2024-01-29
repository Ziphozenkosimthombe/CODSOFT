const express = require("express");
const router = express.Router();
const createController = require("../controllers/take")

router.get("/", createController.getIndex);

module.exports = router;