const express = require('express');
const app = express();
const https = require('https');
const server = https.createServer(app);          //Create server per room? 
const { Server } = require("socket.io");
const io = new Server(server);
// const io = new Server(GameRoomID); Server side room?


// runs everytime a client connects to the server
// gives a socket instance for each one
io.on('connection', (socket) => {
    console.log('Client connected' + socket.id);
    socket.on('disconnect', () => console.log('Client disconnected'));

//From the client, listens whenever join-Gameroom is called
    socket.on('join-Gameroom',GameRoomID => { 
        socket.join(GameRoomID)
    })
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});


