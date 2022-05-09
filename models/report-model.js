const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Report = new Schema({
    userID: { type: String, required: true },
    postID: { type: String, required: true },
    report: { type: String, required: true }
})

module.exports = mongoose.model('Report', Report)
