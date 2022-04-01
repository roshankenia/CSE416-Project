const express = require("express");
const router = express.Router();
const auth = require("../auth");
const CommunityController = require("../controllers/community-controller");

//handles creating a new commmunity in database request
router.post("/community", auth.verify, CommunityController.createCommunity);

//handles a get community request
router.get("/community/:id", auth.verify, CommunityController.getCommunityById);

//handles a get all communities
router.get("/communitylist", auth.verify, CommunityController.getCommunityList);

//handles an update community request
router.put("/community/:id", auth.verify, CommunityController.updateCommunityById);

//handles creating a new story in database request
router.post("/story", auth.verify, CommunityController.createStory);

//handles a get story request
router.get("/story/:id", auth.verify, CommunityController.getStoryById);

//handles a delete story request
router.delete("/story/:id", auth.verify, CommunityController.deleteStory);

//handles creating a new comic in database request
router.post("/comic", auth.verify, CommunityController.createComic);

//handles a get comic request
router.get("/comic/:id", auth.verify, CommunityController.getComicById);

//handles a delete comic request
router.delete("/comic/:id", auth.verify, CommunityController.deleteComic);

//handles creating a new post in database request
router.post("/post", auth.verify, CommunityController.createPost);

//handles a get post request
router.get("/post/:id", auth.verify, CommunityController.getPostById);

//handles an update post request
router.put("/post/:id", auth.verify, CommunityController.updatePost);

//handles creating a new comment in database request
router.post("/comment", auth.verify, CommunityController.createComment);

//handles a get comment request
router.get("/comment/:id", auth.verify, CommunityController.getCommentById);

//handles an update comment request
router.put("/comment/:id", auth.verify, CommunityController.updateComment);

//handles a search community request
router.get("/community/", auth.verify, CommunityController.searchCommunity);

//for testing purpose only
router.post(
  "/deletecommunity",
  auth.verify,
  CommunityController.deleteCommunity
);

module.exports = router;
