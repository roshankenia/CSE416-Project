const express = require("express");
const router = express.Router();
const auth = require("../auth");
const Top5ListController = require("../controllers/top5list-controller");

router.post("/top5list", auth.verify, Top5ListController.createTop5List);
router.delete("/top5list/:id", auth.verify, Top5ListController.deleteTop5List);
router.get("/top5list/:id", auth.verify, Top5ListController.getTop5ListById);
router.get("/top5listpairs", auth.verify, Top5ListController.getTop5ListPairs);
router.get("/top5lists", auth.verify, Top5ListController.getTop5Lists);
router.put("/top5list/:id", auth.verify, Top5ListController.updateTop5List);
router.put(
  "/top5list/nouser/:id",
  auth.verify,
  Top5ListController.updateTop5ListWithoutUser
);
router.post(
  "/search/top5list/",
  auth.verify,
  Top5ListController.searchTop5List
);

router.put(
  "/communitylist/:id",
  auth.verify,
  Top5ListController.updateCommunityList
);
router.post(
  "/communitylist",
  auth.verify,
  Top5ListController.createCommunityList
);
router.delete(
  "/communitylist/:id",
  auth.verify,
  Top5ListController.deleteCommunityList
);
router.post(
  "/search/communitylist/exact/",
  auth.verify,
  Top5ListController.searchCommunityListByExactName
);
router.post(
  "/search/communitylist/start/",
  auth.verify,
  Top5ListController.searchCommunityListByStart
);

router.post(
  "/search/communitylist/start/guest/",
  Top5ListController.searchCommunityListByStart
);
router.post("/search/top5list/guest/", Top5ListController.searchTop5List);

module.exports = router;
