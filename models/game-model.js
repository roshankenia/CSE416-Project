const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comic = require("./comic-model").schema;
const Story = require("./story-model").schema;

const GameSchema = new Schema(
    {   
        uploadedPictures: {type: [String], required: false},
        gamemode: { type: String, required: true },
        comic: { type: Schema.Types.ObjectId, ref: 'Comic', required: false },
        story: { type: Schema.Types.ObjectId, ref: 'Story', required: false },
        lobbyID: { type: String, required: true },
        chatMessages: {type: [String], required:true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Game', GameSchema)
