const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DefaultImagesSchema = new Schema(
    {   
        themes: {type: [String], required: true},
        characters: {type: [String], required: true},
        speechBubbles: {type: [String], required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('DefaultImages', DefaultImagesSchema)
