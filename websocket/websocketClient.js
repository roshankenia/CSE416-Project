import { io} from "socket.io-client"

//gets a new socket connection, make it so whenever anyone comes to site they will connect to websocketServer
const socket = io('LOCALHOST???') //Name of the server

// an event that runs everytime we connect to the server
socket.on('connect', () =>{
    console.log('you connected with id:' + socket.id)
})

function getSocket(){
    return socket
}

//Emit function talks to server, 'join-Gameroom' is the function
function joinRoom(GameRoomID){
    socket.emit('join-Gameroom', GameRoomID)
}

