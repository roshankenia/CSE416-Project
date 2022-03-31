
const mongoose = require('mongoose')

const uri = "mongodb+srv://user_1:password12345678@cluster0.zkgj9.mongodb.net/JART?retryWrites=true&w=majority";
mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  }).catch(err => console.log(err.reason));

const db = mongoose.connection
// console.log('CONNECTED TO DB');
// console.log(db);
module.exports = db

