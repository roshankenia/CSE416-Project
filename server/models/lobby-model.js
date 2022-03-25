const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require("user-model");

const LobbySchema = new Schema(
    {   
        communityID: {type: String, required: true},
        lobbyID: { type: String, required: true },
        users: {type: [User], required: true},
        readyUsers: {type: [User], required: true},
        gamemode: { type: String, required: true },
        numberOfPlayers: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Lobby', LobbySchema)
