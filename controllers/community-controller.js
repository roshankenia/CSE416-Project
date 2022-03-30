const Community = require("../models/community-model");
const User = require("../models/user-model");

createCommunity = async (req, res) => {
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
deleteCommunity = async (req, res) => {
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

// @Jeff Hu copied getGameByID method from game-controller
getCommunityById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id){
      return res.status(400).json({
        errorMessage: "Missing id parameter",
      });
    }
    console.log("Find Community with id: " + JSON.stringify(id));

    await Community.find({ communityID: id }, (err, community) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found community: " + JSON.stringify(community));
      return res.status(200).json({ success: true, community: community });
    }).catch((err) => console.log(err));
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

// @Jeff Hu INCOMPLETE
updateCommunity = async (req, res) => {
  try{
    const {communityMembers, communityPosts} = req.body;
    const id = req.params.id;
    if (!communityMembers) {
      return res.status(400).json({
        errorMessage: "Missing communityMembers parameter",
      });
    }
    if (!communityPosts) {
      return res.status(400).json({
        errorMessage: "Missing communityPosts parameter",
      });
    }
    if (!id){
      return res.status(400).json({
        errorMessage: "Missing id parameter",
      });
    }

    Community.findOne({ _id: id }, (err, community) => {
      console.log("Community found: " + JSON.stringify(community));
      if (err) {
        return res.status(404).json({
          err,
          message: "Community not found!",
        });
      }
  
      // community.set({})
      // game.uploadedPictures = body.game.uploadedPictures;
      // game.gamemode = body.game.gamemode;
      // game.comic = body.game.comic;
      // game.story = body.game.story;
      // game.lobbyID = body.game.lobbyID;
      // game.chatMessages = body.game.chatMessages;
      // game.communityID = body.game.communityID;
  
      community
        .save()
        .then(() => {
          console.log("SUCCESS!!!");
          return res.status(200).json({
            success: true,
            id: community.communityID,
            message: "Community updated!",
          });
        })
        .catch((error) => {
          console.log("FAILURE: " + JSON.stringify(error));
          return res.status(404).json({
            error,
            message: "Community not updated!",
          });
        });
    });


  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

createStory = async (req, res) =>{
  try {
    
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

// @Jeff Hu copied getGameByID method from game-controller
getStoryById = async (req, res) =>{
  try {
    const id = req.params.id;
    if (!id){
      return res.status(400).json({
        errorMessage: "Missing id parameter",
      });
    }
    console.log("Find Story with id: " + JSON.stringify(id));

    await Story.find({ storyID: id }, (err, story) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found story: " + JSON.stringify(story));
      return res.status(200).json({ success: true, story: story });
    }).catch((err) => console.log(err));
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

deleteStory = async (req, res) =>{
  try {
    
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

createComic = async (req, res) =>{
  try {
    
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

// @Jeff Hu copied getGameByID method from game-controller
getComicById = async (req, res) =>{
  try {
    const id = req.params.id;
    if (!id){
      return res.status(400).json({
        errorMessage: "Missing id parameter",
      });
    }
    console.log("Find Comic with id: " + JSON.stringify(id));

    await Comic.find({ comicID: id }, (err, comic) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found comic: " + JSON.stringify(comic));
      return res.status(200).json({ success: true, comic: comic });
    }).catch((err) => console.log(err));
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

deleteComic = async (req, res) =>{
  try {
    
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

createPost = async (req, res) =>{
  try {
    
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

// @Jeff Hu copied getGameByID method from game-controller
getPostById = async (req, res) =>{
  try {
    const id = req.params.id;
    if (!id){
      return res.status(400).json({
        errorMessage: "Missing id parameter",
      });
    }
    console.log("Find Post with id: " + JSON.stringify(id));

    await Post.find({ postID: id }, (err, post) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found post: " + JSON.stringify(post));
      return res.status(200).json({ success: true, post: post });
    }).catch((err) => console.log(err));
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

updatePost = async (req, res) =>{
  try {
    
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

createComment = async (req, res) =>{
  try {
    
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

// @Jeff Hu copied getGameByID method from game-controller
getCommentById = async (req, res) =>{
  try {
    const id = req.params.id;
    if (!id){
      return res.status(400).json({
        errorMessage: "Missing id parameter",
      });
    }
    console.log("Find Comment with id: " + JSON.stringify(id));

    await Comment.find({ commentID: id }, (err, comment) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found comment: " + JSON.stringify(comment));
      return res.status(200).json({ success: true, comment: comment });
    }).catch((err) => console.log(err));
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

updateComment = async (req, res) =>{
  try {
    
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

searchCommunity = async (req, res) =>{
  try {
    
  } catch (err){
    console.error(err);
    res.status(500).send();
  }
}

module.exports = {
    createCommunity,
    //for testing purpose only
    deleteCommunity,
    getCommunityById,
    updateCommunity,
    createStory,
    getStoryById,
    deleteStory,
    createComic,
    getComicById,
    deleteComic,
    createPost,
    getPostById,
    updatePost,
    createComment,
    getCommentById,
    updateComment,
    searchCommunity
};
  