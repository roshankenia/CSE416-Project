import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../auth";
import { GameContext } from "../game";
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
        {game.chat.map((message) => (
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
  // useEffect(() => {
  //   const displayMessage = async (message, username) => {
  //     console.log("the message is", message)
  //     console.log("username is ", username)
  //     // setMessageArray(messageArray => [...messageArray, [username,message]]);
  //     game.storeChat([username, message])
   
  //   };
  //   socket.on("receive-message", displayMessage);
  //   return () => {
  //     socket.off("receive-message", displayMessage);
  //   };
  // }, [messageArray]);

  return <Typography fontSize={"12px"}> {chatbox} </Typography>;
}
