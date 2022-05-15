import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import AuthContext from "../auth";
import { Box, Button, List, ListItem, TextField } from "@mui/material";




//socket
import { SocketContext } from "../socket";

export default function Chat(props) {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  const [messageArray, setMessageArray] = useState([]);

  let {} = props;

  let chatbox =(
    <List>
        {messageArray.map((message) => (
          <ListItem key={message}
          style ={{
              width: "90%"
          }}
          >
            <Box
              style={{
                color: "black",
                backgroundColor: "white",
                fontSize: "10px",
                width: "100%",
                whiteSpace: 'pre-wrap', 
                overflowWrap: 'break-word'
              }}
            >
                  <Typography
                    display = "auto"
                    style={{ 
                        fontSize: "32px",
                        width:"75%" 
                    }}
                    sx={{ ml: 2 }}

                  >
                    {message[0] + ": " + message[1]}
                  </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
  );
  useEffect(() => {
    const displayMessage = async (message, username) => {
      console.log("the message is", message)
      console.log("username is ", username)
      setMessageArray(messageArray => [...messageArray, [username,message]]);
   
    };
    socket.on("receive-message", displayMessage);
    return () => {
      socket.off("receive-message", displayMessage);
    };
  }, [messageArray]);

  return <Typography fontSize={"12px"}> {chatbox} </Typography>;
}
