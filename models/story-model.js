const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StorySchema = new Schema(
    {   
        storyID: { type: String, required: true },
        authors: {type: [String], required: true},
        panels: {type: [String], required:true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Story', StorySchema)
