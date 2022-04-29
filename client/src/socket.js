import { createContext } from "react";
import io from "socket.io-client";

//comment the line below to disconnect to the heroku websocket server
export const socket = io.connect("/");

//uncomment the line below to connect to your local websocket server: 
//export const socket = io("http://localhost:5000");

socket.on("connection", () => {
  console.log('Client socket connected with the back-end\n');
  console.log(socket)
});

export const SocketContext = createContext();