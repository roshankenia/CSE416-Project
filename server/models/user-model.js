const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comment = require("comment-model");

const UserSchema = new Schema(
    {
        guest: {type: Boolean, required:true},
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        username: {type: String, required: true},
        email: { type: String, required: false },
        passwordHash: { type: String, required: false },
        likedPosts: {type: [String], required: false},
        dislikedPosts: {type: [String], required: false},
        likedComments: {type: [String], required: false},
        dislikedComments: {type: [String], required: false},
        comments: {type: [Comment], required:false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
