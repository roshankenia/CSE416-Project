const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comic = require("comic-model");
const Story = require("story-model");
const Comment = require("comment-model");


const PostSchema = new Schema(
    {   
        postID: { type: String, required: true },
        postTitle: { type: String, required: true },
        postComic: { type: Comic, required: false },
        postStory: { type: Story, required: false },
        likes: { type: [String], required: true },
        dislikes: { type: [String], required: true },
        comments: {type: [Comment], required: true},
        communityPublished: {type: Boolean, required:true},
        discoveryPublished: {type: Boolean, required:true},
        dateAndTime: {type: Date, required:true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Post', PostSchema)
