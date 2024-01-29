const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const postsController = require("../controllers/homes");
const { ensureAuth } = require("../middleware/auth");


router.get("/:id", ensureAuth, postsController.getProHome);
router.get("/takeQuiz/:id", postsController.takeQuiz);
router.post("/submitQuiz/:id", postsController.submitQuiz);
router.post("/createPost", postsController.createPost);


module.exports = router;