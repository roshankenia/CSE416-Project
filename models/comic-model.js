const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ComicSchema = new Schema(
    {   
        authors: {type: [String], required: true},
        panels: {type: [String], required:true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Comic', ComicSchema)
