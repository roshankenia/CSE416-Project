const express = require("express");
const router = express.Router();
const auth = require("../auth");
const CommunityController = require("../controllers/community-controller");

router.post("/community", auth.verify, CommunityController.createCommunity);
// const express = require("express");
// const router = express.Router();
// const auth = require("../auth");
// const Top5ListController = require("../controllers/top5list-controller");

// router.post("/top5list", auth.verify, Top5ListController.createTop5List);

module.exports = router;