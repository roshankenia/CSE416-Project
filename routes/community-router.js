const express = require("express");
const router = express.Router();
const auth = require("../auth");
const CommunityController = require("../controllers/community-controller");

router.post("/community", auth.verify, CommunityController.createCommunity);
router.get("/communities", auth.verify, CommunityController.getCommunityList);
router.put("/community/:id", auth.verify, CommunityController.updateCommunityById);

//for testing purpose only
router.post("/deletecommunity", auth.verify, CommunityController.deleteCommunity);

module.exports = router;