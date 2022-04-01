const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = require("./post-model").schema;

const CommunitySchema = new Schema(
    {   
        communityName: { type: String, required: true },
        communityMembers: {type: [String], required: true},
        communityPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    },
    { timestamps: true },
)

module.exports = mongoose.model('Community', CommunitySchema)
