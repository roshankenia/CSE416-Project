const express = require("express");
const router = express.Router();
const auth = require("../auth");
const GameController = require("../controllers/game-controller");

//handles creating a new game in database request
router.post('/game', auth.verify, GameController.createGame);

//handles a get game request
router.get('/game/:id', auth.verify, GameController.getGameById);

//handles an update game request
router.put('/game/:id', auth.verify, GameController.updateGame);

//handles a delete game request
router.delete("/game/:id", auth.verify, GameController.deleteGameById);

//handles creating a new lobby in database request
router.post('/lobby', auth.verify, GameController.createLobby);

//handles a get lobby request
router.get('/lobby/:id', auth.verify, GameController.getLobbyById);

//handles an update lobby request
router.put('/lobby/:id', auth.verify, GameController.updateLobby);

//handles a delete lobby request
router.delete("/lobby/:id", auth.verify, GameController.deleteLobbyById);

//handles creating a new default images in database request
router.post('/defaultimages', auth.verify, GameController.createDefaultImages);

//handles a get default images request
router.get('/defaultimages', auth.verify, GameController.getDefaultImages);

//handles an update default images request
router.put('/defaultimages', auth.verify, GameController.updateDefaultImages);

module.exports = router;