const Game = require("../models/game-model");
const Lobby = require("../models/lobby-model");
const User = require("../models/user-model");
const Comic = require("../models/comic-model");
const Story = require("../models/story-model");
const DefaultImages = require("../models/defaultImages-model");

createGame = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const game = new Game(body);
  console.log("creating game: " + JSON.stringify(game));
  if (!game) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  game
    .save()
    .then(() => {
      return res.status(200).json({
        game: game,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        errorMessage: "Game Not Created!",
      });
    });
};

getGameById = async (req, res) => {
  console.log("Find Game with id: " + JSON.stringify(req.params.id));

  await Game.find({ lobbyID: req.params.id }, (err, game) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    } else if (!game) {
      return res
        .status(400)
        .json({ success: false, error: "No Game with that ID found" });
    } else if (game.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No Game with that ID found" });
    }
    console.log("Found game: " + JSON.stringify(game));
    return res.status(200).json({ success: true, game: game });
  }).catch((err) => console.log(err));
};

updateGame = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Game.findOne({ lobbyID: req.params.id }, (err, game) => {
    console.log("Game found: " + JSON.stringify(game));
    if (err) {
      return res.status(404).json({
        err,
        message: "Game not found!",
      });
    } else if (!game) {
      return res
        .status(400)
        .json({ success: false, error: "No Game with that ID found" });
    } else if (game.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No Game with that ID found" });
    }
    if (body.uploadedPictures) {
      game.uploadedPictures = body.uploadedPictures;
    }
    if (body.gamemode) {
      game.gamemode = body.gamemode;
    }
    if (body.comic) {
      game.comic = body.comic;
    }
    if (body.story) {
      game.story = body.story;
    }
    if (body.lobbyID) {
      game.lobbyID = body.lobbyID;
    }
    if (body.chatMessages) {
      game.chatMessages = body.chatMessages;
    }
    if (body.communityID) {
      game.communityID = body.communityID;
    }

    game
      .save()
      .then(() => {
        console.log("SUCCESS!!!");
        return res.status(200).json({
          success: true,
          id: game.lobbyID,
          message: "Game updated!",
        });
      })
      .catch((error) => {
        console.log("FAILURE: " + JSON.stringify(error));
        return res.status(404).json({
          error,
          message: "Game not updated!",
        });
      });
  });
};

deleteGameById = async (req, res) => {
  try {
    await Game.findOneAndDelete(
      { lobbyID: req.params.id },
      function (err, game) {
        if (err) {
          console.log(err);
          return res.status(400).json({
            errorMessage: "Game Not Deleted!",
          });
        } else if (!game) {
          return res.status(400).json({
            errorMessage: "No game with that ID exists",
          });
        } else {
          console.log("Deleted : ", game);
          return res.status(201).json({
            Message: "Game Successfully Deleted!",
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

createDefaultImages = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }
  if (Object.keys(body).length !== 3) {
    return res.status(400).json({
      errorMessage: "You did not include all types of DefaultImages",
    });
  }
  const defaultImages = new DefaultImages(body);
  console.log("creating default images: " + JSON.stringify(defaultImages));
  if (!defaultImages) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  defaultImages
    .save()
    .then(() => {
      return res.status(200).json({
        defaultImages: defaultImages,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        errorMessage: "Default Images Not Created!",
      });
    });
};

getDefaultImages = async (req, res) => {
  await DefaultImages.find({}, (err, defaultImages) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    } else if (!defaultImages) {
      return res
        .status(400)
        .json({ success: false, error: "No Default Images found" });
    } else if (defaultImages.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No Default Images found" });
    }
    console.log("Found DefaultImages: " + JSON.stringify(defaultImages));
    return res
      .status(200)
      .json({ success: true, defaultImages: defaultImages });
  }).catch((err) => console.log(err));
};

updateDefaultImages = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  if (Object.keys(body).length !== 3) {
    return res.status(400).json({
      errorMessage: "You did not include all types of DefaultImages",
    });
  }

  DefaultImages.find({}, (err, defaultImages) => {
    console.log("defaultImages found: " + JSON.stringify(defaultImages));
    if (err) {
      return res.status(404).json({
        err,
        message: "DefaultImages not found!",
      });
    } else if (!defaultImages) {
      return res
        .status(400)
        .json({ success: false, error: "No Default Images updated" });
    } else if (defaultImages.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No Default Images updated" });
    }

    defaultImages = defaultImages[0];
    if (body.themes) {
      defaultImages.themes = body.themes;
    }
    if (body.characters) {
      defaultImages.characters = body.characters;
    }
    if (body.speechBubbles) {
      defaultImages.speechBubbles = body.speechBubbles;
    }

    defaultImages
      .save()
      .then(() => {
        console.log("SUCCESS!!!");
        return res.status(200).json({
          success: true,
          id: defaultImages._id,
          message: "DefaultImages updated!",
        });
      })
      .catch((error) => {
        console.log("FAILURE: " + JSON.stringify(error));
        return res.status(404).json({
          error,
          message: "Default Images not updated!",
        });
      });
  });
};

createLobby = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const lobby = new Lobby(body);
  console.log("creating lobby: " + JSON.stringify(lobby));
  if (!lobby) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  lobby
    .save()
    .then(() => {
      return res.status(200).json({
        lobby: lobby,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        errorMessage: "Lobby Not Created!",
      });
    });
};

getLobbyById = async (req, res) => {
  console.log("Find Lobby with id: " + JSON.stringify(req.params.id));

  await Lobby.find({ lobbyID: req.params.id }, (err, lobby) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    } else if (!lobby) {
      return res
        .status(400)
        .json({ success: false, error: "No Lobby with that ID found" });
    } else if (lobby.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No Lobby with that ID found" });
    }
    console.log("Found lobby: " + JSON.stringify(lobby));
    return res.status(200).json({ success: true, lobby: lobby });
  }).catch((err) => console.log(err));
};

updateLobby = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Lobby.findOne({ lobbyID: req.params.id }, (err, lobby) => {
    console.log("Lobby found: " + JSON.stringify(lobby));
    if (err) {
      return res.status(404).json({
        err,
        message: "Lobby not found!",
      });
    } else if (!lobby) {
      return res
        .status(400)
        .json({ success: false, error: "No Lobby with that ID found" });
    } else if (lobby.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No Lobby with that ID found" });
    }
    if (body.communityID) {
      lobby.communityID = body.communityID;
    }
    if (body.gamemode) {
      lobby.gamemode = body.gamemode;
    }
    if (body.users) {
      lobby.users = body.users;
    }
    if (body.readyUsers) {
      lobby.readyUsers = body.readyUsers;
    }
    if (body.lobbyID) {
      lobby.lobbyID = body.lobbyID;
    }
    if (body.numberOfPlayers) {
      lobby.numberOfPlayers = body.numberOfPlayers;
    }

    lobby
      .save()
      .then(() => {
        console.log("SUCCESS!!!");
        return res.status(200).json({
          success: true,
          id: lobby.lobbyID,
          message: "Lobby updated!",
        });
      })
      .catch((error) => {
        console.log("FAILURE: " + JSON.stringify(error));
        return res.status(404).json({
          error,
          message: "Lobby not updated!",
        });
      });
  });
};

deleteLobbyById = async (req, res) => {
  try {
    await Lobby.findOneAndDelete(
      { lobbyID: req.params.id },
      function (err, lobby) {
        if (err) {
          console.log(err);
          return res.status(400).json({
            errorMessage: "Lobby Not Deleted!",
          });
        } else if (!lobby) {
          return res.status(400).json({
            errorMessage: "No lobby with that ID exists",
          });
        }else {
          console.log("Deleted : ", lobby);
          return res.status(201).json({
            Message: "Lobby Successfully Deleted!",
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

var STATIC_CHANNELS = [{
  name: 'Global chat',
  participants: 0,
  id: 1,
  sockets: []
}, {
  name: 'Funny',
  participants: 0,
  id: 2,
  sockets: []
}];

getStaticChannels = async (req, res) => {
  res.status(200).json({
      channels: STATIC_CHANNELS
  })
}

module.exports = {
  createGame,
  getGameById,
  updateGame,
  deleteGameById,
  createDefaultImages,
  getDefaultImages,
  updateDefaultImages,
  createLobby,
  getLobbyById,
  updateLobby,
  deleteLobbyById,
  getStaticChannels
};
