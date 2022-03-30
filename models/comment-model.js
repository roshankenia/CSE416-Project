const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const Comment = require("./comment-model").schema;

const Reply = new Schema({
    commentID: { type: String, required: true },
    username: { type: String, required: true },
    likes: { type: [String], required: true },
    dislikes: { type: [String], required: true }
})

const CommentSchema = new Schema(
    {   
        commentID: { type: String, required: true },
        username: { type: String, required: true },
        likes: { type: [String], required: true },
        dislikes: { type: [String], required: true },
        authors: {type: [String], required: true},
        reply: [Reply]
    },
    { timestamps: true },
)

module.exports = mongoose.model('Comment', CommentSchema)
