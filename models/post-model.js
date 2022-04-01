const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comic = require("./comic-model").schema;
const Story = require("./story-model").schema;
const Comment = require("./comment-model").schema;


const PostSchema = new Schema(
    {   
        postID: { type: String, required: true },
        postTitle: { type: String, required: true },
        postComic: {type: mongoose.Schema.Types.ObjectId, ref: 'Comic', required: false},
        postStory: {type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: false},
        likes: { type: [String], required: true },
        dislikes: { type: [String], required: true },
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false}],
        communityPublished: {type: Boolean, required:true},
        discoveryPublished: {type: Boolean, required:true},
        dateAndTime: {type: Date, required:true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Post', PostSchema)
