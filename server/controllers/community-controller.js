const Community = require("../models/community-model");
const User = require("../models/user-model");

createCommunity = (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }

    //check for duplicate community
    Community.find({ communityName: body.communityName}, function (err, docs) {
      if (err){
          console.log(err);
      }
      else if(docs.length != 0){
          console.log("Duplicate communities found! : ", docs);
          return res.status(400).json({
            errorMessage: "A community with the same name already exists!",
          });
      }else{
          //create new community
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
        }
    });    
  };

// For testing purpose
deleteCommunity = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }
  Community.findOneAndDelete({communityName : body.communityName}, function (err, docs) {
    if (err){
        console.log(err)
        return res.status(400).json({
          errorMessage: "Community Not Deleted!",
        });
    }
    else{
        console.log("Deleted : ", docs);
        return res.status(201).json({
          errorMessage: "Community Successfully Deleted!",
        });
    }
  })
};

module.exports = {
    createCommunity,
    //for testing purpose only
    deleteCommunity
};
  