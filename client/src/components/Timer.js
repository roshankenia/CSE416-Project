import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth";
import { GameContext } from "../game";
//socket
import { SocketContext } from "../socket";

export default function Timer(props) {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  const [timer, setTimer] = useState(null);

  let { stageRef, actions, setActions, storyText, setStoryText } = props;
  useEffect(() => {
    const countDown = async (count) => {
      console.log("Inside the countDown", count);
      setTimer(count);
    };

    socket.once("counter", countDown);

    //TODO Alan heck to see which turn it is, who is the current
    const changeTurn = async (time) => {
      console.log(
        "Inside Change Turn / end Time the game turn value is ",
        game.turn
      );
      console.log(
        "Check to make sure all players are organized the same",
        game.players
      );
      //check game
      if (game.gamemode == "comic") {
        // check if game.turn == amount of panels
        if (game.panelNumber - 1 == game.turn) {
          let imageData = stageRef.current.toDataURL();
          const data = new FormData();
          data.append("file", imageData);
          data.append("upload_preset", "jartimages");
          data.append("cloud_name", "jart-cse416");

          fetch("  https://api.cloudinary.com/v1_1/jart-cse416/image/upload", {
            method: "post",
            body: data,
          })
            .then((resp) => resp.json())
            .then((data) => {
              game.enterVoting(data.url, "comic");
            })
            .catch((err) => console.log(err));
        } else {
          console.log("stageref:", stageRef);
          let imageData = stageRef.current.toDataURL();

          const data = new FormData();
          data.append("file", imageData);
          data.append("upload_preset", "jartimages");
          data.append("cloud_name", "jart-cse416");

          fetch("  https://api.cloudinary.com/v1_1/jart-cse416/image/upload", {
            method: "post",
            body: data,
          })
            .then((resp) => resp.json())
            .then((data) => {
              imageData = data.url;

              setActions([]);
              console.log("after reset:", actions);
              //console.log(imageData);

              game.changeTurn(imageData);
              if (auth.user.username === game.host) {
                socket.emit("timer", auth.user.username, time, game.lobby);
              }
            })
            .catch((err) => console.log(err));
        }
      } else if (game.gamemode == "story") {
        console.log("inside timer gamemode story");
        console.log(storyText);
        // check if game.turn == amount of panels
        if (game.panelNumber - 1 == game.turn) {
          game.enterVoting(storyText, "story");
        } else {
          //Might be uneccessary to do this here... Maybe reset the text whenever the turn starts?
          setStoryText("");
          game.changeTurn(storyText);
          if (auth.user.username === game.host) {
            socket.emit("timer", auth.user.username, time, game.lobby);
          }
        }
      }
    };
    socket.once("end-time", changeTurn);

    return () => {
      socket.off("counter", countDown);
      socket.off("end-time", changeTurn);
    };
  }, [timer, stageRef, actions, storyText]);

  function handleSubmit(event) {
    event.stopPropagation();
    socket.emit("set-counter-zero", game.lobby);
  }

  return (
    <Box>
      <Box
        sx={{
          width: 450,
          height: 75,
          margin: 1,
          backgroundColor: "#FF7F7F",
          borderRadius: 5,
          border: 3,
          color: "black",
        }}
      >
        <Typography fontSize={"32px"}>Time Left: {timer}</Typography>
      </Box>
      {game.currentPlayer == auth.user.username && (
        <Button
          sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: "green",
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
          onClick={handleSubmit}
        >
          <Typography fontSize={"32px"}>Submit</Typography>
        </Button>
      )}
    </Box>
  );
}
