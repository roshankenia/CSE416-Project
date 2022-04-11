const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth-controller");

router.post("/register", AuthController.registerUser);
router.post("/guest", AuthController.createGuest);
router.post("/login", AuthController.loginUser);
router.get("/logout", AuthController.logoutUser);
router.get("/loggedIn", AuthController.getLoggedIn);
router.post("/changePassword", AuthController.changePassword);
router.post("/resetPassword", AuthController.resetPassword);
router.post("/deleteAccount", AuthController.deleteAccount);
router.get("/search/", AuthController.searchUsers);

module.exports = router;
