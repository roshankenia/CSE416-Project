const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comic = require("comic-model");
const Story = require("story-model");

const GameSchema = new Schema(
    {   
        uploadedPictures: {type: [String], required: false},
        gamemode: { type: String, required: true },
        comic: { type: Comic, required: false },
        story: { type: Story, required: false },
        lobbyID: { type: String, required: true },
        chatMessages: {type: [String], required:true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Game', GameSchema)
