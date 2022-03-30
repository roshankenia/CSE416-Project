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

// @Jeff Hu Completed but Untested
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
  
      community.communityMembers = communityMembers;
      community.communityPosts = communityPosts;
  
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

// @Jeff Hu Completed but UNTESTED
updatePost = async (req, res) =>{
  try {
    const {postTitle, postComic, postStory, likeCount, dislikeCount, comments, 
    communityPublished, discoveryPublished, dateAndTime} = req.body;
    const id = req.params.id;
    if (!postTitle) {
      return res.status(400).json({
        errorMessage: "Missing postTitle parameter",
      });
    }
    if (!postComic) {
      return res.status(400).json({
        errorMessage: "Missing postComic parameter",
      });
    }
    if (!postStory) {
      return res.status(400).json({
        errorMessage: "Missing postStory parameter",
      });
    }
    if (!likeCount) {
      return res.status(400).json({
        errorMessage: "Missing likeCount parameter",
      });
    }
    if (!dislikeCount) {
      return res.status(400).json({
        errorMessage: "Missing dislikeCount parameter",
      });
    }
    if (!comments) {
      return res.status(400).json({
        errorMessage: "Missing comments parameter",
      });
    }
    //not sure how boolean values work with this conditional statement
    if (!communityPublished) {
      return res.status(400).json({
        errorMessage: "Missing communityPublished parameter",
      });
    }
    if (!discoveryPublished) {
      return res.status(400).json({
        errorMessage: "Missing discoveryPublished parameter",
      });
    }
    if (!dateAndTime) {
      return res.status(400).json({
        errorMessage: "Missing dateAndTime parameter",
      });
    }
    if (!id){
      return res.status(400).json({
        errorMessage: "Missing id parameter",
      });
    }

    Post.findOne({ _id: id }, (err, post) => {
      console.log("Post found: " + JSON.stringify(post));
      if (err) {
        return res.status(404).json({
          err,
          message: "Post not found!",
        });
      }
  
      post.postTitle = postTitle;
      post.postComic = postComic;
      post.postStory = postStory;
      post.likeCount = likeCount;
      post.dislikeCount = dislikeCount;
      post.comments = comments;
      post.communityPublished = communityPublished;
      post.discoveryPublished = discoveryPublished;
      post.dateAndTime = dateAndTime;
  
      post
        .save()
        .then(() => {
          console.log("SUCCESS!!!");
          return res.status(200).json({
            success: true,
            id: post.postID,
            message: "Post updated!",
          });
        })
        .catch((error) => {
          console.log("FAILURE: " + JSON.stringify(error));
          return res.status(404).json({
            error,
            message: "Post not updated!",
          });
        });
    });
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

// @Jeff Hu Completed but UNTESTED
// BEWARE!!! Double check what is being passed down in the request, it is possible that we have
// a naming problem. The object name is comment and the parameter passed down is also comment. 
updateComment = async (req, res) =>{
  try {
    const body = req.body;
    const id = req.params.id;
    if (!body) {
      return res.status(400).json({
        errorMessage: "Missing a parameter",
      });
    }
    
    if (!id){
      return res.status(400).json({
        errorMessage: "Missing id parameter",
      });
    }

    Comment.findOne({ _id: id }, (err, comment) => {
      console.log("Comment found: " + JSON.stringify(comment));
      if (err) {
        return res.status(404).json({
          err,
          message: "Comment not found!",
        });
      }
  
      //This line could be wrong here
      comment.comment = body.comment;
      comment.likeCount = body.likeCount;
      comment.dislikeCount = body.dislikeCount;
  
      comment
        .save()
        .then(() => {
          console.log("SUCCESS!!!");
          return res.status(200).json({
            success: true,
            id: comment.commentID,
            message: "Comment updated!",
          });
        })
        .catch((error) => {
          console.log("FAILURE: " + JSON.stringify(error));
          return res.status(404).json({
            error,
            message: "Comment not updated!",
          });
        });
    });
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
  