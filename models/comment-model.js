const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const Comment = require("./comment-model").schema;

const CommentSchema = new Schema(
    {   
        username: { type: String, required: true },
        comment: { type: String, required: true},
        likes: { type: [String], required: true },
        dislikes: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Comment', CommentSchema)
