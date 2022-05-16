import { Box, Button, Grid, List, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
// konva stuff
import { Circle, Ellipse, Layer, Line, Rect, Stage, Text, RegularPolygon } from "react-konva";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import AuthContext from "../auth";
import { GameContext } from "../game";
//socket
import { SocketContext } from "../socket";
import Chat from "./Chat";
import Timer from "./Timer";

export default function WaitingScreen(props) {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  console.log(game);

  let {
    stageRef,
    actions,
    setActions,
    URLImage,
    storyText,
    setStoryText,
    quillRef,
  } = props;
  const handleLeave = (event) => {
    game.disconnectPlayer();
  };
  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 25,
    align: "center",
    alignItems: "center",
    justifyContent: "center",
  };
  //TODO Alan
  const handleChat = (event) => {
    event.preventDefault();
    console.log("handleAddFriend");
    const data = new FormData(event.currentTarget);
    const message = data.get("chat");
    console.log(game.lobby);
    // game.storeChat([username, message])
    socket.emit("send-chat-message", message, game.lobby, auth.user.username);
    document.getElementById("chat").placeholder = "Type Something";
    document.getElementById("chat").value = "";
  };
  //Handles the messages
  // const messages = [["alan","hi"]];
  // let chatbox =(
  //   <List>
  //       {messages.map((message) => (
  //         <ListItem key={message}>
  //           <Box
  //             style={{
  //               border: "3px solid",
  //               borderColor: "black",
  //               color: "black",
  //               backgroundColor: "white",
  //               fontSize: "20px",
  //               outline: "none",
  //               borderRadius: 20,
  //               width: "100%",
  //             }}
  //           >
  //             <Grid container spacing={2}>
  //               <Grid item xs={5}>
  //                 <Typography
  //                   display="inline"
  //                   style={{ fontSize: "32px" }}
  //                   sx={{ ml: 2 }}
  //                 >
  //                   {message[0]}: {message[1]} test
  //                 </Typography>
  //               </Grid>
  //             </Grid>
  //           </Box>
  //         </ListItem>
  //       ))}
  //     </List>
  // );
  //#region wait elements
  let waitCenterPanel = (
    <Grid item xs="6" align="center">
      <Box
        sx={{
          pointerEvents: "none",
          width: 600,
          height: 600,
          backgroundColor: "white",
          border: 3,
        }}
      >
        {game.gamemode === "comic" ? (
          <Stage width={600} height={600} ref={stageRef}>
            <Layer>
              <Rect x={0} y={0} width={600} height={600} fill="white" />
              {actions.map((action) => {
                if (action.tool === "pen" || action.tool === "eraser") {
                  return (
                    <Line
                      points={action.points}
                      stroke={action.stroke}
                      strokeWidth={action.strokeWidth}
                      tension={0.5}
                      lineCap="round"
                      globalCompositeOperation={
                        action.tool === "eraser"
                          ? "destination-out"
                          : "source-over"
                      }
                    />
                  );
                } else if (action.tool === "rectangle") {
                  return (
                    <Rect
                      x={action.x}
                      y={action.y}
                      width={action.width}
                      height={action.height}
                      fill={action.fill}
                      stroke={action.stroke}
                      strokeWidth={action.strokeWidth}
                    />
                  );
                } else if (action.tool === "ellipse") {
                  return (
                    <Ellipse
                      x={action.x}
                      y={action.y}
                      width={action.width}
                      height={action.height}
                      fill={action.fill}
                      stroke={action.stroke}
                      strokeWidth={action.strokeWidth}
                    />
                  );
                } else if (action.tool === "circle") {
                  return (
                    <Circle
                      x={action.x}
                      y={action.y}
                      radius={action.radius}
                      fill={action.fill}
                      stroke={action.stroke}
                      strokeWidth={action.strokeWidth}
                    />
                  );
                } else if (action.tool === "triangle") {
                  return (
                    <RegularPolygon
                      x={action.x}
                      y={action.y}
                      sides={action.sides}
                      radius={action.radius}
                      fill={action.fill}
                      stroke={action.stroke}
                      strokeWidth={action.strokeWidth}
                    />
                  );
                } else if (action.tool === "pentagon") {
                  return (
                    <RegularPolygon
                      x={action.x}
                      y={action.y}
                      sides={action.sides}
                      radius={action.radius}
                      fill={action.fill}
                      stroke={action.stroke}
                      strokeWidth={action.strokeWidth}
                    />
                  );
                } else if (action.tool === "hexagon") {
                  return (
                    <RegularPolygon
                      x={action.x}
                      y={action.y}
                      sides={action.sides}
                      radius={action.radius}
                      fill={action.fill}
                      stroke={action.stroke}
                      strokeWidth={action.strokeWidth}
                    />
                  );
                } else if (action.tool === "text") {
                  return (
                    <Text
                      x={action.x}
                      y={action.y}
                      text={action.text}
                      fontSize={action.fontSize}
                      fill={action.fill}
                    />
                  );
                } else {
                  return <URLImage image={action} />;
                }
              })}
            </Layer>
          </Stage>
        ) : (
          <ReactQuill
            theme="bubble"
            value={storyText}
            placeholder={"Write something awesome..."}
            sx={{
              width: 600,
              height: 600,
              backgroundColor: "white",
              border: 3,
            }}
          ></ReactQuill>
        )}
      </Box>
    </Grid>
  );

  const waitChat = (
    <Grid container>
      <Box
        sx={{
          width: 600,
          height: 600,
          backgroundColor: "white",
          border: 3,
          justifyContent: "space-between",
          overflowY: "auto",
        }}
      >
        <Chat></Chat>
      </Box>
      <Box
        sx={{
          width: 600,
          height: "auto",
          backgroundColor: "white",
          border: 3,
          justifyContent: "space-between",
          overflowY: "auto",
        }}
      >
        <Box component="form" onSubmit={handleChat} noValidate>
          <TextField id="chat" name="chat" sx={{ top: "65%", width: "60%" }}>
            Type Message
          </TextField>
          <Button
            type="submit"
            sx={{
              marginLeft: 2,
              width: "20%",
              top: "65%",
              backgroundColor: "yellow",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
              borderRadius: 5,
              border: 3,
              color: "black",
            }}
          >
            <Typography fontSize={"32px"}>chat</Typography>
          </Button>
        </Box>
      </Box>
    </Grid>
  );
  const waitUtils = (
    <Grid item xs="3" align="center">
      <Timer
        stageRef={stageRef}
        actions={actions}
        setActions={setActions}
        storyText={storyText}
        setStoryText={setStoryText}
      ></Timer>
      <Button
        sx={{
          width: 450,
          height: 75,
          margin: 1,
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          borderRadius: 5,
          border: 3,
          color: "black",
        }}
        onClick={(event) => handleLeave()}
      >
        <Typography fontSize={"32px"}>Leave</Typography>
      </Button>
    </Grid>
  );

  function outputMessage(user, message) {
    // for(var i =0; i<messages.length; i++){
    //   const div = document.createElement('Typography');
    //   div.classList.add('message');
    //   div.innerHTML =`<p> ${user2message[i]}: ${messages[i]}</p>`;
    //   document.querySelector('.chat-messages').appendChild(div)
    // }
    // const div = document.createElement('div');
    // div.classList.add('message');
    // div.innerHTML =`<p> ${user}: ${message}</p>`;
    // document.querySelector('.chat-messages').appendChild(div)
  }

  // useEffect(() => {
  //   const displayMessage = async (message, username) => {
  //     console.log("the message is", message)
  //     messages.push([username,message])
  //     // user2message.push(username)
  //     // if(game.currentPlayer == auth.user.username){
  //     //   console.log("is the current player")
  //     //   outputMessage(username,message);
  //     // }
  //     // else{
  //       // const div = document.createElement('div');
  //       // div.classList.add('message');
  //       // div.style.width = "100%"
  //       // div.style.height = "100%"
  //       // div.className='inline-block'
  //       // div.innerHTML =`<p> ${username}: ${message}</p>`;
  //       // document.querySelector('.chat-messages').appendChild(div)
  //     // }
  //   };
  //   socket.on("receive-message", displayMessage);
  //   return () => {
  //     socket.off("receive-message", displayMessage);
  //   };
  // }, []);

  return (
    <List style={flexContainer} sx={{ justifyContent: "center" }}>
      {/* Left of Canvas */}
      {waitChat}
      {/* Drawing Canvas */}
      {waitCenterPanel}
      {/* Right of Canvas */}
      {waitUtils}
    </List>
  );
  //#endregion
}
