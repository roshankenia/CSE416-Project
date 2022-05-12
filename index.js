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
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://cse-416-jart.herokuapp.com/",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const authRouter = require("./routes/auth-router");
app.use("/auth", authRouter);
const communityRouter = require("./routes/community-router");
app.use("/api", communityRouter);
const gameRouter = require("./routes/game-router");
app.use("/play", gameRouter);

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

//comment out the line below
var io = require("socket.io").listen(server, {
  pingTimeout: 2500,
  pingInterval: 5000,
});

//and uncomment the line below to start a local websocket server
// var io = require("socket.io")(5000, {cors:{origin: ["http://localhost:3000"]}});

//by pass cors stuff
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

var userID = {};

io.on("connection", (socket) => {
  console.log("new client connected", socket.id);

  socket.on("disconnecting", (reason) => {
    console.log(socket.rooms); // Set { ... }
  });

  socket.on("disconnect-player", (username, lobbyID) => {
    console.log(username, "has left lobby", lobbyID);
    socket.to(lobbyID).emit("player-left", username);

    console.log("disconnecting all players from lobby");

    io.socketsLeave(lobbyID);
  });

  socket.on("send-message", (message) => {
    io.emit("message", message);
  });

  socket.on("join-lobby", (username, lobbyID) => {
    console.log(username, " has joined lobby ", lobbyID);
    socket.join(lobbyID);
    socket.to(lobbyID).emit("new-player", username, lobbyID);
  });

  socket.on(
    "consolidate-players",
    (players, readyPlayers, lobbyID, gameMode) => {
      console.log("sending players to users in lobby ", lobbyID);
      socket
        .to(lobbyID)
        .emit("add-players", players, readyPlayers, lobbyID, gameMode);
    }
  );

  socket.on("leave-lobby", (username, lobbyID) => {
    console.log(username, "is leaving", lobbyID);
    socket.leave(lobbyID);
    socket.to(lobbyID).emit("remove-player", username, lobbyID);
  });

  socket.on("ready-unready", (username, lobbyID) => {
    console.log(username, "is readying or unreadying");
    socket.to(lobbyID).emit("player-ready", username);
  });

  socket.on("update-votes", (voteVal, username, lobbyID) => {
    console.log(username, "has voted");
    socket.to(lobbyID).emit("update-votes-cb", voteVal, username);
  });

  socket.on("timer", (username, time, lobbyID) => {
    let counter = time;
    let WinnerCountdown = setInterval(function () {
      io.to(lobbyID).emit("counter", counter);
      counter--;
      if (counter <= 0) {
        console.log("counter hit 0");
        console.log("emitting end-time to lobby:", lobbyID);
        io.in(lobbyID).emit("end-time", time);
        clearInterval(WinnerCountdown);
      }
    }, 1000);
  });

  socket.on("change-gamemode", (gamemode, lobbyID) => {
    console.log("host switching game mode to:", gamemode, "for:", lobbyID);
    io.to(lobbyID).emit("switch-gamemode", gamemode);
  });

  socket.on("start-game", (players, lobbyID) => {
    io.to(lobbyID).emit("game-started", players);
  });

  socket.on("draw-actions", (userId, actions, lobbyID) => {
    console.log("sending actions to:", lobbyID);
    io.to(lobbyID).emit("sync-actions", userId, actions);
  });

  socket.on("edit-text", (text, lobbyID) => {
    console.log("sending text to:", lobbyID);
    socket.to(lobbyID).emit("sync-text", text);
  });

  socket.on("update-host", (host, lobbyID) => {
    console.log("sending host:", host);
    socket.to(lobbyID).emit("add-host", host);
  });

  socket.on("socket-username", (username, socketID) => {
    console.log("setting the username for the socket", username);
    socket.username = username;
    console.log("the socket id is", socketID);
    userID[username] = socketID;
  });
  //testing
  socket.on("send-invite", (username, lobbyID) => {
    console.log("sending invite to user ", username);
    socketid = userID[username];
    console.log("the socketid is", socketid);
    socket.to(socketid).emit("receive-invite", lobbyID, socketid);
  });
  //Chat testing
  socket.on("send-chat-message", (message, lobbyID, username) => {
    console.log("sending invite to user ", username);
    console.log("the message is", message);
    io.to(lobbyID).emit("receive-message", message, username);
  });
});

// socket.to(lobbyID).emit("new-player", username, lobbyID);
