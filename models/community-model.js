const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = require("./post-model").schema;

const CommunitySchema = new Schema(
    {   
        /* Mongodb automatically generate an id for each document
           Therefore we dont need to include id in the PAYLOAD
           Will remove this in future clean-up commit
           @Terran
        */
        //communityID: { type: String, required: true },
        communityName: { type: String, required: true },
        communityMembers: {type: [String], required: true},
        communityPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    },
    { timestamps: true },
)

module.exports = mongoose.model('Community', CommunitySchema)
