const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Feedback = new Schema({
    userID: { type: String, required: true },
    username: { type: String, required: true },
    feedback: { type: String, required: true }
})

module.exports = mongoose.model('Feedback', Feedback)
