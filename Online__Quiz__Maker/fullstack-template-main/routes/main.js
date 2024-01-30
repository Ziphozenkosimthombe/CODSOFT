const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const homesController = require("../controllers/homes");
const { ensureAuth } = require("../middleware/auth");

//Main Routes 
router.get("/", homeController.getIndex);
router.get("/createQ", ensureAuth, homesController.getIndexCreate);
router.get("/takeQ", homesController.getIndexTake);
router.get("/home", homesController.getProHome);



//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);



module.exports = router;
