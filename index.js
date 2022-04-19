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
app.use(
  cors({
    origin: ["http://localhost:3000", "https://cse-416-jart.herokuapp.com/"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const authRouter = require("./routes/auth-router");
app.use("/auth", authRouter);
const communityRouter = require("./routes/community-router");
app.use("/api", communityRouter);
const gameRouter = require("./routes/game-router");
app.use("/play", gameRouter);

/* Will not need this in the future @Terran
 const top5listsRouter = require('./routes/top5lists-router')
 app.use('/api', top5listsRouter)
*/

// INITIALIZE OUR DATABASE OBJECT
const db = require("./db");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Right before your app.listen(), add this:
// I don't know what it does but this removes the ability of add get routes in this file -@Terran
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// PUT THE SERVER IN LISTENING MODE
var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("running at http://" + host + ":" + port);
});

// websocket stuff
var io = require("socket.io")(server);
var STATIC_CHANNELS = [
  {
    name: "Global chat",
    participants: 0,
    id: 1,
    sockets: [],
  },
  {
    name: "Funny",
    participants: 0,
    id: 2,
    sockets: [],
  },
];

//by pass cors stuff
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

io.on("connection", (socket) => {
  // socket object may be used to send specific messages to the new connected client
  console.log("new client connected");
  socket.emit("connection", null);
  socket.on("channel-join", (id) => {
    console.log("channel join", id);
    STATIC_CHANNELS.forEach((c) => {
      if (c.id === id) {
        if (c.sockets.indexOf(socket.id) == -1) {
          c.sockets.push(socket.id);
          c.participants++;
          io.emit("channel", c);
        }
      } else {
        let index = c.sockets.indexOf(socket.id);
        if (index != -1) {
          c.sockets.splice(index, 1);
          c.participants--;
          io.emit("channel", c);
        }
      }
    });

    return id;
  });
  socket.on("send-message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    STATIC_CHANNELS.forEach((c) => {
      let index = c.sockets.indexOf(socket.id);
      if (index != -1) {
        c.sockets.splice(index, 1);
        c.participants--;
        io.emit("channel", c);
      }
    });
  });

  socket.on("join-lobby", (username, lobbyID) => {
    console.log(username, " has joined lobby ", lobbyID);
    socket.join(lobbyID);
    socket.to(lobbyID).emit("new-player", username, lobbyID);
  });

  socket.on("consolidate-players", (players, lobbyID) => {
    console.log("sending players to users in lobby ", lobbyID);
    socket.to(lobbyID).emit("add-players", players, lobbyID);
  });

  socket.on("leave-lobby", (username, lobbyID) => {
    console.log(username, "is leaving", lobbyID);
    socket.to(lobbyID).emit("remove-player", username, lobbyID);
  });
});
