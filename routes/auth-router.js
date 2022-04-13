const express = require("express");
const auth = require("../auth");
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
router.post("/search", AuthController.searchUsers);
router.post("/friendRequest", AuthController.addFriendRequest);
router.post("/friend", AuthController.addFriend);
router.post("/removeFriendRequest", AuthController.removeFriendRequest);
router.post("/removeFriend", AuthController.removeFriend);
router.get("/findById/:id", AuthController.findById);

module.exports = router;
