import { React, createContext } from "react";
import io from "socket.io-client";

export const socket = io.connect("/");
socket.on("connection", () => {
  console.log(
    `I'm connected with the back-end\nI'm connected with the back-end\nI'm connected with the back-end\n(repeated 3 times)`
  );
  console.log(socket);
});

export const SocketContext = createContext();