// THESE ARE NODE APIs WE WISH TO USE
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

// CREATE OUR SERVER
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
// SETUP THE MIDDLEWARE
// app.use(cors());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const authRouter = require("./routes/auth-router");
app.use("/auth", authRouter);
const communityRouter = require("./routes/community-router");
app.use("/api", communityRouter);

/* Will not need this in the future @Terran
 const top5listsRouter = require('./routes/top5lists-router')
 app.use('/api', top5listsRouter)
*/

// INITIALIZE OUR DATABASE OBJECT
const db = require("./db");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// PUT THE SERVER IN LISTENING MODE
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("running at http://" + host + ":" + port);
});

//websocket server

// const io = require("socket.io")(3000)
const io = require("socket.io")(8000,{
  cors: {
    // origin:["https://cse-416-jart.herokuapp.com"]
    origin:["http://localhost:3001"]
  }
})


io.on('connection', (socket) => {
  console.log("CONNECTION TO WEBSOCKET" + socket.id);
});
