const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = require("post-model");

const CommunitySchema = new Schema(
    {   
        communityID: { type: String, required: true },
        communityName: { type: String, required: true },
        communityMembers: {type: [String], required: true},
        communityPosts: {type: [Post], required:true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Community', CommunitySchema)
