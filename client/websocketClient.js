import { io} from "socket.io-client"

//gets a new socket connection, make it so whenever anyone comes to site they will connect to websocketServer
// const socket = io('https://cse-416-jart.herokuapp.com') //Name of the server
const socket = io('http://localhost:8000')

// an event that runs everytime we connect to the server
// socket.on('connection', () =>{
//     console.log('you connected with id:' + socket.id)
// })
 
// Proably not needednpm s
function getSocket(){
    return socket
}

function getSocketId(){
    return socket.id
}

//Emit function talks to server, 'join-Gameroom' is the function
function joinRoom(GameRoomID){
    socket.emit('join-Gameroom', GameRoomID)
}

