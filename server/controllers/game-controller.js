const Game = require("../models/game-model");
const Lobby = require("../models/lobby-model");
const User = require("../models/user-model");
const Comic = require("../models/comic-model");
const Story = require("../models/story-model");
const DefaultImages = require("../models/defaultImages-model")

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
  
    await Game.find({ communityID: req.params.id }, (err, game) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("Found game: " + JSON.stringify(game));
      return res.status(200).json({success:true, game:game});
    }).catch((err) => console.log(err));
  };

createDefaultImages = (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }
  
    const defaultImages = new DefaultImage(body);
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

module.exports = {
    createGame,
    createDefaultImages,
    createLobby
  };