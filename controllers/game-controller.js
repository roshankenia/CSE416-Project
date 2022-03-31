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
    }
    else if (game === []){
      return res.status(400).json({ success: false, error: "No Game with that ID found"});
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
    }

    game.uploadedPictures = body.game.uploadedPictures;
    game.gamemode = body.game.gamemode;
    game.comic = body.game.comic;
    game.story = body.game.story;
    game.lobbyID = body.game.lobbyID;
    game.chatMessages = body.game.chatMessages;
    game.communityID = body.game.communityID;

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

createDefaultImages = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }
  console.log('PRINTING DEFAULT IMAGES');
  console.log(body);
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
  await Game.find({}, (err, defaultImages) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    console.log("Found game: " + JSON.stringify(defaultImages));
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

  DefaultImages.find({}, (err, defaultImages) => {
    console.log("defaultImages found: " + JSON.stringify(defaultImages));
    if (err) {
      return res.status(404).json({
        err,
        message: "DefaultImages not found!",
      });
    }

    defaultImages = defaultImages[0];
    defaultImages.themes = body.defaultImages.themes;
    defaultImages.characters = body.defaultImages.characters;
    defaultImages.speechBubbles = body.defaultImages.speechBubbles;

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
    }
    else if (lobby === []){
      return res.status(400).json({ success: false, error: "No Lobby with that ID found"});
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
    }

    lobby.communityID = body.game.communityID;
    lobby.gamemode = body.game.gamemode;
    lobby.users = body.game.users;
    lobby.readyUsers = body.game.readyUsers;
    lobby.lobbyID = body.game.lobbyID;
    lobby.numberOfPlayers = body.game.numberOfPlayers;

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

module.exports = {
  createGame,
  getGameById,
  updateGame,
  createDefaultImages,
  getDefaultImages,
  updateDefaultImages,
  createLobby,
  getLobbyById,
  updateLobby,
};
