const Community = require("../models/community-model");
const User = require("../models/user-model");
const Comic = require("../models/comic-model");
const Story = require("../models/story-model");
const Comment = require("../models/comment-model");
const Post = require("../models/post-model");

//#region community
//front-end payload: response.data.community
createCommunity = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  //check for duplicate community
  await Community.find(
    { communityName: body.communityName },
    function (err, docs) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          errorMessage: err,
        });
      } else if (docs.length != 0) {
        console.log("Duplicate communities found! : ", docs);
        return res.status(400).json({
          errorMessage: "A community with the same name already exists!",
        });
      } else {
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
    }
  );
};

//front-end payload: response.data.communityList
getCommunityList = async (req, res) => {
  await Community.find({}, (err, communities) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!communities.length) {
      return res
        .status(404)
        .json({ success: false, error: `no communities found` });
    }
    return res.status(201).json({ success: true, communityList: communities });
  }).catch((err) => console.log(err));
};

//not front-end payload for the next 3
//very resource intensive, not scalable
updateCommunityById = async (req, res) => {
  try {
    const id = req.params.id;
    await Community.findOne({ _id: id }, (err, community) => {
      console.log("Community found: " + JSON.stringify(community));
      if (err) {
        return res.status(404).json({
          success: false,
          message: "Community not found!",
        });
      }

      community.communityName = req.body.community.communityName;
      // this line check if user already in the community
      if (req.body.community.communityMembers.length !== new Set(req.body.community.communityMembers).size) {
        return res.status(401).json({
          success: false,
          message: "User is already in the community!",
        });
      }
      community.communityMembers = req.body.community.communityMembers;
      community.communityPosts = req.body.community.communityPosts;

      community.save().then(() => {
        return res.status(201).json({
          success: true,
          community: community,
          message: "Community updated!",
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

getCommunityById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Finding Community with id: " + JSON.stringify(id));

    await Community.findOne({ _id : id }, (err, community) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found community: " + JSON.stringify(community));
      return res.status(200).json({ success: true, community: community });
    }).catch((err) => console.log(err));
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// For testing purpose only
deleteCommunity = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }
  await Community.findOneAndDelete(
    { communityName: body.communityName },
    function (err, docs) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          errorMessage: "Community Not Deleted!",
        });
      } else {
        console.log("Deleted : ", docs);
        return res.status(201).json({
          Message: "Community Successfully Deleted!",
        });
      }
    }
  );
};

//#endregion community

//#region story
createStory = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }
  if (Object.keys(body).length !== 2) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const story = new Story(body);
  console.log("creating story: " + JSON.stringify(story));
  if (!story) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  story
    .save()
    .then(() => {
      return res.status(200).json({
        story: story,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        errorMessage: "Story Not Created!",
      });
    });
};

getStoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        errorMessage: "Missing id parameter",
      });
    }
    console.log("Find Story with id: " + JSON.stringify(id));

    await Story.findOne({ _id: id }, (err, story) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found story: " + JSON.stringify(story));
      return res.status(200).json({ success: true, story: story });
    }).catch((err) => console.log(err));
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

updateStoryById = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }
  try {
    const id = req.params.id;
    await Story.findOne({ _id: id }, (err, story) => {
      console.log("Story found: " + JSON.stringify(story));
      if (err) {
        return res.status(404).json({
          success: false,
          message: "Story not found!",
        });
      }
      story.authors = req.body.story.authors;
      story.panels = req.body.story.panels;

      story.save().then(() => {
        return res.status(200).json({
          success: true,
          story: story,
          message: "Story updated!",
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

deleteStoryById = async (req, res) => {
  try {
    await Story.findOneAndDelete(
      { _id : req.params.id },
      function (err, story) {
        if (err) {
          console.log(err);
          return res.status(400).json({
            errorMessage: "Story Not Deleted!",
          });
        } else {
          console.log("Deleted : ", story);
          return res.status(201).json({
            Message: "Story Successfully Deleted!",
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
//#endregion story

//#region comic
createComic = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }
  if (Object.keys(body).length !== 2) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const comic = new Comic(body);
  console.log("creating comic: " + JSON.stringify(comic));
  if (!comic) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  comic
    .save()
    .then(() => {
      return res.status(200).json({
        comic: comic,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        errorMessage: "Comic Not Created!",
      });
    });
};

updateComicById = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }
  try {
    const id = req.params.id;
    await Comic.findOne({ _id: id }, (err, comic) => {
      console.log("Comic found: " + JSON.stringify(comic));
      if (err) {
        return res.status(404).json({
          success: false,
          message: "Comic not found!",
        });
      }
      comic.authors = req.body.comic.authors;
      comic.panels = req.body.comic.panels;

      comic.save().then(() => {
        return res.status(200).json({
          success: true,
          comic: comic,
          message: "Comic updated!",
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

getComicById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Find Comic with id: " + JSON.stringify(id));

    await Comic.findOne({ _id: id }, (err, comic) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found comic: " + JSON.stringify(comic));
      return res.status(200).json({ success: true, comic: comic });
    }).catch((err) => console.log(err));
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

deleteComicById = async (req, res) => {
  try {
    await Comic.findOneAndDelete(
      { _id : req.params.id },
      function (err, comic) {
        if (err) {
          console.log(err);
          return res.status(400).json({
            errorMessage: "Comic Not Deleted!",
          });
        } else {
          console.log("Deleted : ", comic);
          return res.status(201).json({
            Message: "Comic Successfully Deleted!",
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
//#endregion story

//#region post
createPost = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }
  if (Object.keys(body).length < 6) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }
  const post = new Post(body);
  console.log("creating post: " + JSON.stringify(post));
  if (!post) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  post
    .save()
    .then(() => {
      return res.status(200).json({
        post: post,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        errorMessage: "Post Not Created!",
      });
    });
};

getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Find Post with id: " + JSON.stringify(id));

    await Post.findOne({ _id: id }, (err, post) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found post: " + JSON.stringify(post));
      return res.status(200).json({ success: true, post: post });
    }).catch((err) => console.log(err));
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

updatePost = async (req, res) => {
  try {
    const {
      postTitle,
      postComic,
      postStory,
      likes,
      dislikes,
      comments,
      communityPublished,
      discoveryPublished,
      dateAndTime,
    } = req.body;
    const id = req.params.id;

    Post.findOne({ _id: id }, (err, post) => {
      console.log("Post found: " + JSON.stringify(post));
      if (err) {
        return res.status(404).json({
          err,
          message: "Post not found!",
        });
      }

      if (postTitle) {
        post.postTitle = postTitle;
      }
      if (postComic){
        post.postComic = postComic;
      }
      if (postStory) {
        post.postStory = postStory;
      }
      if (likes) {
        post.likes = likeCount;
      }
      if (dislikes) {
        post.dislikes = dislikeCount;
      }
      if (comments) {
        post.comment = comments;
      }
      if (communityPublished) {
        post.communityPublished = communityPublished;
      }
      if (discoveryPublished) {
        post.discoveryPublished = discoveryPublished;
      }
      if (dateAndTime) {
        post.dateAndTime = dateAndTime;
      }

      post
        .save()
        .then(() => {
          console.log("SUCCESS!!!");
          return res.status(200).json({
            success: true,
            post: post,
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
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

deletePostById = async (req, res) => {
  try {
    await Post.findOneAndDelete(
      { _id : req.params.id },
      function (err, post) {
        if (err) {
          console.log(err);
          return res.status(400).json({
            errorMessage: "Post Not Deleted!",
          });
        } else {
          console.log("Deleted : ", post);
          return res.status(201).json({
            Message: "Post Successfully Deleted!",
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
//#endregion post

//#region comment
createComment = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }
    if (Object.keys(body).length < 4) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }
    const comment = new Comment(body);
    console.log("creating comment: " + JSON.stringify(comment));
    if (!comment) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }

    comment
      .save()
      .then(() => {
        return res.status(200).json({
          comment: comment,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          errorMessage: "Comment Not Created!",
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// @Jeff Hu copied getGameByID method from game-controller
getCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Find Comment with id: " + JSON.stringify(id));

    await Comment.find({ commentID: id }, (err, comment) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found comment: " + JSON.stringify(comment));
      return res.status(200).json({ success: true, comment: comment });
    }).catch((err) => console.log(err));
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// @Jeff Hu Completed but UNTESTED
// BEWARE!!! Double check what is being passed down in the request, it is possible that we have
// a naming problem. The object name is comment and the parameter passed down is also comment.
updateComment = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    if (!body) {
      return res.status(400).json({
        errorMessage: "Missing a parameter",
      });
    }

    if (!id) {
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
      comment.likes = body.likes;
      comment.dislikes = body.dislikes;

      comment
        .save()
        .then(() => {
          console.log("SUCCESS!!!");
          return res.status(200).json({
            success: true,
            comment: comment,
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
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
//#endregion comment

searchCommunity = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  createCommunity,
  getCommunityList,
  updateCommunityById,
  deleteCommunity,
  getCommunityById,
  createStory,
  getStoryById,
  deleteStoryById,
  updateStoryById,
  createComic,
  getComicById,
  updateComicById,
  deleteComicById,
  createPost,
  getPostById,
  updatePost,
  deletePostById,
  createComment,
  getCommentById,
  updateComment,
  searchCommunity,
};
