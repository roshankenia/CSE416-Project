const Community = require("../models/community-model");
const User = require("../models/user-model");

createCommunity = (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }
    //console.log(req.body.name)
    const community = new Community(body);
    console.log("creating community: " + JSON.stringify(community));
    if (!community) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }
  
    community
      .save()
      .then(() => {
        return res.status(201).json({
          community: community,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          errorMessage: "Community Not Created!",
        });
      });
  };

module.exports = {
    createCommunity,
};
  