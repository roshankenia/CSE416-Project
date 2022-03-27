const Top5List = require("../models/top5list-model");
//const CommunityList = require("../models/communitylist-model");
const User = require("../models/user-model");

createCommunityList = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const communityList = new CommunityList(body);
  console.log("creating communityList: " + JSON.stringify(communityList));
  if (!communityList) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  communityList
    .save()
    .then(() => {
      return res.status(201).json({
        communityList: communityList,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        errorMessage: "CommunityList List Not Created!",
      });
    });
};

createTop5List = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const top5List = new Top5List(body);
  console.log("creating top5List: " + JSON.stringify(top5List));
  if (!top5List) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  // REMEMBER THAT OUR AUTH MIDDLEWARE GAVE THE userId TO THE req
  console.log("top5List created for " + req.userId);
  User.findOne({ _id: req.userId }, (err, user) => {
    console.log("user found: " + JSON.stringify(user));
    user.top5Lists.push(top5List._id);
    user.save().then(() => {
      top5List
        .save()
        .then(() => {
          return res.status(201).json({
            top5List: top5List,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({
            errorMessage: "Top 5 List Not Created!",
          });
        });
    });
  });
};

deleteCommunityList = async (req, res) => {
  CommunityList.findOneAndDelete({ _id: req.params.id }, () => {
    return res.status(200).json({});
  }).catch((err) => console.log(err));
};

deleteTop5List = async (req, res) => {
  console.log("delete Top 5 List with id: " + JSON.stringify(req.params.id));
  console.log("delete " + req.params.id);
  Top5List.findById({ _id: req.params.id }, (err, top5List) => {
    console.log("top5List found: " + JSON.stringify(top5List));
    if (err) {
      return res.status(404).json({
        errorMessage: "Top 5 List not found!",
      });
    }

    // DOES THIS LIST BELONG TO THIS USER?
    async function asyncFindUser(list) {
      User.findOne({ email: list.ownerEmail }, (err, user) => {
        console.log("user._id: " + user._id);
        console.log("req.userId: " + req.userId);
        if (user._id == req.userId) {
          console.log("correct user!");
          Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({});
          }).catch((err) => console.log(err));
        } else {
          console.log("incorrect user!");
          return res.status(400).json({
            errorMessage: "authentication error",
          });
        }
      });
    }
    asyncFindUser(top5List);
  });
};
getTop5ListById = async (req, res) => {
  console.log("Find Top 5 List with id: " + JSON.stringify(req.params.id));

  await Top5List.findById({ _id: req.params.id }, (err, list) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    console.log("Found list: " + JSON.stringify(list));

    // DOES THIS LIST BELONG TO THIS USER?
    async function asyncFindUser(list) {
      await User.findOne({ email: list.ownerEmail }, (err, user) => {
        console.log("user._id: " + user._id);
        console.log("req.userId: " + req.userId);
        if (user._id == req.userId) {
          console.log("correct user!");
          return res.status(200).json({ success: true, top5List: list });
        } else {
          console.log("incorrect user!");
          return res
            .status(400)
            .json({ success: false, description: "authentication error" });
        }
      });
    }
    asyncFindUser(list);
  }).catch((err) => console.log(err));
};
getTop5ListPairs = async (req, res) => {
  console.log("getTop5ListPairs");
  await User.findOne({ _id: req.userId }, (err, user) => {
    console.log("find user with id " + req.userId);
    async function asyncFindList(email) {
      console.log("find all Top5Lists owned by " + email);
      await Top5List.find({ ownerEmail: email }, (err, top5Lists) => {
        console.log("found Top5Lists: " + JSON.stringify(top5Lists));
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!top5Lists) {
          console.log("!top5Lists.length");
          return res
            .status(404)
            .json({ success: false, error: "Top 5 Lists not found" });
        } else {
          console.log("Send the Top5List pairs");
          // PUT ALL THE LISTS INTO ID, NAME PAIRS
          let pairs = [];
          for (let key in top5Lists) {
            let list = top5Lists[key];
            let pair = {
              _id: list._id,
              name: list.name,
            };
            pairs.push(pair);
          }
          return res.status(200).json({ success: true, idNamePairs: pairs });
        }
      }).catch((err) => console.log(err));
    }
    asyncFindList(user.email);
  }).catch((err) => console.log(err));
};
getTop5Lists = async (req, res) => {
  await Top5List.find({}, (err, top5Lists) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!top5Lists.length) {
      return res
        .status(404)
        .json({ success: false, error: `Top 5 Lists not found` });
    }
    return res.status(200).json({ success: true, data: top5Lists });
  }).catch((err) => console.log(err));
};

searchCommunityListByExactName = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const name = body.search;

  await CommunityList.find(
    { name: { $regex: new RegExp(name, "i") } },
    (err, communityLists) => {
      console.log("found CommunityLists: " + JSON.stringify(communityLists));
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!communityLists) {
        console.log("!communityLists.length");
        return res
          .status(404)
          .json({ success: false, error: "Community Lists not found" });
      } else {
        console.log("Send the CommunityLists");
        return res
          .status(200)
          .json({ success: true, communityLists: communityLists });
      }
    }
  ).catch((err) => console.log(err));
};

searchCommunityListByStart = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const name = body.search;
  console.log(name);

  await CommunityList.find(
    { name: { $regex: new RegExp("^" + name, "i") } },
    (err, communityLists) => {
      console.log("found CommunityLists: " + JSON.stringify(communityLists));
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!communityLists) {
        console.log("!communityLists.length");
        return res
          .status(404)
          .json({ success: false, error: "Community Lists not found" });
      } else {
        console.log("Send the CommunityLists");
        return res
          .status(200)
          .json({ success: true, communityLists: communityLists });
      }
    }
  ).catch((err) => console.log(err));
};

searchTop5List = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const search = body.search;
  const listView = body.listView;
  const username = body.username;

  console.log(listView);
  console.log(search);

  if (listView === "yours") {
    await Top5List.find(
      { username: username, name: { $regex: new RegExp("^" + search, "i") } },
      (err, top5Lists) => {
        console.log("found Top5Lists: " + JSON.stringify(top5Lists));
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!top5Lists) {
          console.log("!top5Lists.length");
          return res
            .status(404)
            .json({ success: false, error: "Top 5 Lists not found" });
        } else {
          console.log("Send the Top5Lists");
          return res.status(200).json({ success: true, top5Lists: top5Lists });
        }
      }
    ).catch((err) => console.log(err));
  } else if (listView === "all") {
    await Top5List.find(
      {
        published: { $eq: true },
        name: { $regex: new RegExp("^" + search, "i") },
      },
      (err, top5Lists) => {
        console.log("found Top5Lists: " + JSON.stringify(top5Lists));
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!top5Lists) {
          console.log("!top5Lists.length");
          return res
            .status(404)
            .json({ success: false, error: "Top 5 Lists not found" });
        } else {
          console.log("Send the Top5Lists");
          return res.status(200).json({ success: true, top5Lists: top5Lists });
        }
      }
    ).catch((err) => console.log(err));
  } else if (listView === "users") {
    await Top5List.find(
      {
        published: { $eq: true },
        username: { $regex: new RegExp(search, "i") },
      },
      (err, top5Lists) => {
        console.log("found Top5Lists: " + JSON.stringify(top5Lists));
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!top5Lists) {
          console.log("!top5Lists.length");
          return res
            .status(404)
            .json({ success: false, error: "Top 5 Lists not found" });
        } else {
          console.log("Send the Top5Lists");
          return res.status(200).json({ success: true, top5Lists: top5Lists });
        }
      }
    ).catch((err) => console.log(err));
  }
};

updateCommunityList = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  CommunityList.findOne({ _id: req.params.id }, (err, communityList) => {
    console.log("communityList found: " + JSON.stringify(communityList));
    if (err) {
      return res.status(404).json({
        err,
        message: "CommunityList List not found!",
      });
    }

    communityList.name = body.top5List.name;
    communityList.items = body.top5List.items;
    communityList.comments = body.top5List.comments;
    communityList.likes = body.top5List.likes;
    communityList.dislikes = body.top5List.dislikes;
    communityList.views = body.top5List.views;
    communityList.updateDate = body.top5List.updateDate;
    communityList
      .save()
      .then(() => {
        console.log("SUCCESS!!!");
        return res.status(200).json({
          success: true,
          id: communityList._id,
          message: "CommunityList List updated!",
        });
      })
      .catch((error) => {
        console.log("FAILURE: " + JSON.stringify(error));
        return res.status(404).json({
          error,
          message: "CommunityList List not updated!",
        });
      });
  });
};

updateTop5ListWithoutUser = async (req, res) => {
  const body = req.body;
  console.log("updateTop5List: " + JSON.stringify(body));
  console.log(
    "req.body.name, req.body.items: " + req.body.name + ", " + req.body.items
  );

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
    console.log("top5List found: " + JSON.stringify(top5List));
    if (err) {
      return res.status(404).json({
        err,
        message: "Top 5 List not found!",
      });
    }

    top5List.name = body.top5List.name;
    top5List.items = body.top5List.items;
    top5List.comments = body.top5List.comments;
    top5List.likes = body.top5List.likes;
    top5List.dislikes = body.top5List.dislikes;
    top5List.views = body.top5List.views;
    top5List.published = body.top5List.published;
    top5List.publishedDate = body.top5List.publishedDate;
    top5List
      .save()
      .then(() => {
        console.log("SUCCESS!!!");
        return res.status(200).json({
          success: true,
          id: top5List._id,
          message: "Top 5 List updated!",
        });
      })
      .catch((error) => {
        console.log("FAILURE: " + JSON.stringify(error));
        return res.status(404).json({
          error,
          message: "Top 5 List not updated!",
        });
      });
  });
};

updateTop5List = async (req, res) => {
  const body = req.body;
  console.log("updateTop5List: " + JSON.stringify(body));
  console.log(
    "req.body.name, req.body.items: " + req.body.name + ", " + req.body.items
  );

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
    console.log("top5List found: " + JSON.stringify(top5List));
    if (err) {
      return res.status(404).json({
        err,
        message: "Top 5 List not found!",
      });
    }

    // DOES THIS LIST BELONG TO THIS USER?
    async function asyncFindUser(list) {
      await User.findOne({ email: list.ownerEmail }, (err, user) => {
        console.log("user._id: " + user._id);
        console.log("req.userId: " + req.userId);
        if (user._id == req.userId) {
          console.log("correct user!");
          console.log(
            "req.body.name, req.body.items: " +
              req.body.name +
              ", " +
              req.body.items
          );

          list.name = body.top5List.name;
          list.items = body.top5List.items;
          list.comments = body.top5List.comments;
          list.likes = body.top5List.likes;
          list.dislikes = body.top5List.dislikes;
          list.views = body.top5List.views;
          list.published = body.top5List.published;
          list.publishedDate = body.top5List.publishedDate;
          list
            .save()
            .then(() => {
              console.log("SUCCESS!!!");
              return res.status(200).json({
                success: true,
                id: list._id,
                message: "Top 5 List updated!",
              });
            })
            .catch((error) => {
              console.log("FAILURE: " + JSON.stringify(error));
              return res.status(404).json({
                error,
                message: "Top 5 List not updated!",
              });
            });
        } else {
          console.log("incorrect user!");
          return res
            .status(400)
            .json({ success: false, description: "authentication error" });
        }
      });
    }
    asyncFindUser(top5List);
  });
};

module.exports = {
  createTop5List,
  deleteTop5List,
  getTop5ListById,
  getTop5ListPairs,
  getTop5Lists,
  updateTop5List,
  searchTop5List,
  updateTop5ListWithoutUser,
  updateCommunityList,
  createCommunityList,
  deleteCommunityList,
  searchCommunityListByExactName,
  searchCommunityListByStart,
};
