import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import AuthContext from "../auth";
import { Box, Button, List, ListItem, TextField } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import BrushIcon from "@mui/icons-material/Brush";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import ColorizeIcon from "@mui/icons-material/Colorize";
import ClearIcon from "@mui/icons-material/Clear";
import SquareIcon from "@mui/icons-material/Square";


import { styled } from "@mui/material/styles";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
// import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import WaitingScreen from "./WaitingScreen";
import GameTools from "./GameTools";
import IconButton from "@mui/material/IconButton";


// konva stuff
import { Stage, Layer, Rect, Text, Circle, Line, Star, Shape, Image } from "react-konva";
import useImage from "use-image";
import { BsEraserFill } from "react-icons/bs";

//socket
import { SocketContext } from "../socket";

export default function GameScreen() {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  //#region css
  const buttonCSS = { color: "black", fontSize: "40pt" };
  //#endregion css

  //#region game control

  //#region not-timer
  const roomCode = "imadethiscodeup";
  // ******* change gameMode as "story" or "comic" to get different game screens *******
  // const gameMode = "comic"
  const [gameMode, setGameMode] = useState(true);

  const [characterToggle, setCharacterToggle] = useState(false);
  const toggleCharacters = () =>{
    setCharacterToggle(!characterToggle)
  }
  const [bubbleToggle, setBubbleToggle] = useState(false);
  const toggleBubbles = () =>{
    setBubbleToggle(!bubbleToggle)
  }

  const handleGameMode = (event) => {
    event.stopPropagation();
    if (gameMode) {
      setGameMode(false);
    } else {
      setGameMode(true);
    }
  };

  const charactersLeft = 147;

  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 25,
    align: "center",
    alignItems: "center",
    justifyContent: "center",
  };
//TODO Alan update to useState(game.players[game.currentPlayer])
// const [currentPlayer, setCurrentPlayer] = useState(game.players[0]);

  const [currentPlayer, setCurrentPlayer] = useState(game.currentPlayer);
  const [timer, setTimer] = useState(null)

  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState(() => ["italic"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border: 0,
      "&.Mui-disabled": {
        border: 0,
      },
      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));
  //#endregion not-timer

  

  //#endregion game control

  //#region KONVA functions
  const [tool, setTool] = React.useState("pen");
  const [color, setColor] = React.useState("#000000");
  const [strokeWidth, setStrokeWidth] = React.useState(1);
  const [actions, setActions] = React.useState([]);
  const [redos, setRedos] = React.useState([])
  const [displayText, setDisplayText] = React.useState("Enter Text Here")

  const isDrawing = React.useRef(false);
  const stageRef = React.useRef(null);
  const dragUrl = React.useRef();

  const handleChangeText = (e) => {
    const text = e.target.value
    setDisplayText(text)
  }

  const URLImage = ({ image }) => {
    const [img] = useImage(image.src);
    return (
      <Image
        image={img}
        x={image.x}
        y={image.y}
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />
    );
  };

  const handleUndo = () => {
    if(actions.length){
      let redo = actions.pop()
      setActions(actions)
      setRedos([...redos,redo])
      socket.emit("draw-actions", auth.user._id, actions, game.lobby);
    }
  };

  const handleRedo = () => {
    if(redos.length){
      let action = redos.pop()
      socket.emit("draw-actions", auth.user._id, [...actions,action], game.lobby);
      setActions([...actions,action])
      setRedos(redos);
    }
  };

  const changeColor = (event, color) => {
    event.stopPropagation();
    setColor(color);
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    if (tool == "pen" || tool == "eraser") {
      const pos = e.target.getStage().getPointerPosition();
      setActions([
        ...actions,
        {
          tool,
          key: actions.length + 1,
          strokeWidth: strokeWidth,
          stroke: color,
          points: [pos.x, pos.y],
        },
      ]);
    } else if (tool == "rectangle") {
      const { x, y } = e.target.getStage().getPointerPosition();
      setActions([
        ...actions,
        {
          tool,
          x,
          y,
          width: 0,
          height: 0,
          key: actions.length + 1,
          stroke: color,
          strokeWidth: strokeWidth,
        },
      ]);
    } else if (tool == "circle") {
      const { x, y } = e.target.getStage().getPointerPosition();
      setActions([
        ...actions,
        {
          tool,
          x,
          y,
          width: 0,
          height: 0,
          key: actions.length + 1,
          stroke: color,
          strokeWidth: strokeWidth,
        },
      ]);
    } else if (tool == "text") {
      const { x, y } = e.target.getStage().getPointerPosition();
      actions.push({
        tool,
        x,
        y,
        fontSize: strokeWidth,
        fill: color,
        key: actions.length + 1,
        text: displayText,
        draggable: true,
      })
      setActions(actions);
      socket.emit("draw-actions",auth.user._id, actions, game.lobby);
    }
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    if (tool == "pen" || tool == "eraser") {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = actions[actions.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      // replace last
      actions.splice(actions.length - 1, 1, lastLine);
      setActions(actions.concat());
    } else if (tool == "rectangle") {
      const sx = actions[actions.length - 1].x;
      const sy = actions[actions.length - 1].y;
      const key = actions[actions.length - 1].key;
      const { x, y } = e.target.getStage().getPointerPosition();

      let lastRectangle = {
        tool,
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: key,
        stroke: color,
        strokeWidth: strokeWidth,
      };
      actions.splice(actions.length - 1, 1, lastRectangle);
      setActions(actions.concat());
    } else if (tool == "circle") {
      const sx = actions[actions.length - 1].x;
      const sy = actions[actions.length - 1].y;
      const key = actions[actions.length - 1].key;
      const { x, y } = e.target.getStage().getPointerPosition();

      let lastCircle = {
        tool,
        x: sx,
        y: sy,
        width: Math.abs(x - sx),
        height: Math.abs(y - sy),
        key: key,
        stroke: color,
        strokeWidth: strokeWidth,
      };
      actions.splice(actions.length - 1, 1, lastCircle);
      setActions(actions.concat());
    }
    console.log(game.currentPlayer)
    socket.emit("draw-actions", auth.user._id, actions, game.lobby);
  };

  const handleMouseUp = (e) => {
    isDrawing.current = false;
    setRedos([])
  };

  //#endregion

  //the websocket codes
  useEffect(() => {
    const syncA = async (userId, actions) => {
      if (userId != auth.user._id) {
        setActions(actions);
      }
    };
    socket.on("sync-actions", syncA);

    const countDown = async (count)=>{
      console.log("Inside the countDown", count)
      setTimer(count)
    };

    socket.once("counter", countDown);

    //TODO Alan heck to see which turn it is, who is the current
    const changeTurn = async (time)=>{
      console.log("Inside Change Turn / end Time the game turn value is ", game.turn)
      console.log("Check to make sure all players are organized the same", game.players)
      // check if game.turn == amount of panels
      if(game.panelNumber == game.turn){
        game.enterVoting()
      }
      else{
        let sortedArray = game.players.sort()
        console.log(sortedArray)
        let currentTurn = game.turn + 1;
        let currPlayer = sortedArray[currentTurn%(game.players.length)]
        console.log(currPlayer)
        game.changeTurn({turn: currentTurn, currentPlayer: currPlayer})
        if(auth.user.username === game.host){
          socket.emit("timer", auth.user.username, time, game.lobby);
        }
      }
    }
    socket.once("end-time", changeTurn);

    return () => {
      socket.off("sync-actions", syncA);
      socket.off("end-time", changeTurn);
      socket.off("counter",countDown)
    };
  }, [timer]);

  //probably most important function
  const handleSubmit = (event) => {
    event.preventDefault();
    let imageData = stageRef.current.toDataURL();
    console.log(imageData);
    //need some where to store timer
    socket.emit("timer", auth.user.username, 1, game.lobby);
    //setTimeout(() => setSeconds(0), 1000);
  };

  //#region game elements to render
  const gameModeButton = (
    <Button
      onClick={handleGameMode}
      sx={{
        width: 300,
        height: 50,
        margin: 1,
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "white",
          opacity: [0.9, 0.8, 0.7],
        },
        borderRadius: 5,
        border: 3,
        color: "black",
      }}
    >
      <Typography>
        {gameMode
          ? "Click me to switch to Story"
          : "Click me to switch to Comic"}
      </Typography>
    </Button>
  );

  const gameCurrentPlayer = (
    <Typography fontSize={"64px"}>
      {game.currentPlayer} is currently {gameMode ? "Drawing" : "Writing"}...
    </Typography>
  );

  /* List of current panels drawn goes here */
  const gamePanels = (
    <List style={flexContainer}>
      <Box
        sx={{
          width: 150,
          height: 150,
          margin: 1,
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.7],
          },
          border: 3,
        }}
      />
      <Box
        sx={{
          width: 150,
          height: 150,
          margin: 1,
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.7],
          },
          border: 3,
        }}
      >
        {gameMode ? (
          ""
        ) : (
          <Typography fontSize={"10px"}>
            Fiona lived in her parents’ house, in the town where she and Grant
            went to university. It was a big, bay-windowed house that seemed to
            Grant both luxurious and disorderly, with rugs crooked on the floors
            and cup rings bitten into the table varnish.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          width: 150,
          height: 150,
          margin: 1,
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.7],
          },
          border: 3,
        }}
      >
        {gameMode ? (
          ""
        ) : (
          <Typography fontSize={"10px"}>
            Her mother was Icelandic—a powerful woman with a froth of white hair
            and indignant far-left politics. The father was an important
            cardiologist, revered around the hospital but happily subservient at
            home, where he would listen to his wife’s strange tirades with an
            absentminded smile.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          width: 150,
          height: 150,
          margin: 1,
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.7],
          },
          border: 3,
        }}
      >
        {gameMode ? (
          ""
        ) : (
          <Typography fontSize={"10px"}>
            Fiona had her own little car and a pile of cashmere sweaters, but
            she wasn’t in a sorority, and her mother’s political activity was
            probably the reason. Not that she cared. Sororities were a joke to
            her, and so was politics—though she liked to play “The Four
            Insurgent Generals” on the phonograph, and sometimes also the
            “Internationale,” very loud.
          </Typography>
        )}
      </Box>
    </List>
  );

  const isColorSelected = (buttonColor) => {
    if (color == buttonColor) {
      return "black";
    } else {
      return "white";
    }
  };

  const handleSetStrokeWidth = (event, width) => {
    setStrokeWidth(width);
  };

  const gameTools = (
    <GameTools
      buttonCSS={buttonCSS}
      setTool={setTool}
      gameMode={gameMode}
      flexContainer={flexContainer}
      tool={tool}
      changeColor={changeColor}
      isColorSelected={isColorSelected}
      handleSetStrokeWidth={handleSetStrokeWidth}
      strokeWidth={strokeWidth}
      handleUndo={handleUndo}
      handleRedo={handleRedo}
      handleChangeText={handleChangeText}
    />
  );

  /* Drawing/Writing Canvas */
  let gameWorkSpace = "";
  if (gameMode) {
    gameWorkSpace = (
      <Grid item xs="6" align="center">
        <Box
          sx={{
            width: 600,
            height: 600,
            backgroundColor: "white",
            border: 3,
          }}
          onDrop={(e) => {
            e.preventDefault();
            // register event position
            stageRef.current.setPointersPositions(e);
            // add image
            actions.push(
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
                key: actions.length + 1
              }
            )
            setActions(actions);
            socket.emit("draw-actions", auth.user._id, actions, game.lobby);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <Stage
            width={600}
            height={600}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            ref={stageRef}
            
          >
            <Layer>
              <Text text="Starts drawing here" x={5} y={30} />
              {actions.map((action) => {
                if(action.tool === 'pen' || action.tool === 'eraser'){
                  return <Line
                    points={action.points}
                    stroke={action.stroke}
                    strokeWidth={action.strokeWidth}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                      action.tool === "eraser" ? "destination-out" : "source-over"
                    }
                  />
                }else if(action.tool === 'rectangle'){
                  return <Rect
                    x={action.x}
                    y={action.y}
                    width={action.width}
                    height={action.height}
                    fill="transparent"
                    stroke={action.stroke}
                    strokeWidth={action.strokeWidth}
                  />
                }else if(action.tool === 'circle'){
                  return <Circle
                    x={action.x}
                    y={action.y}
                    width={action.width}
                    height={action.height}
                    fill="transparent"
                    stroke={action.stroke}
                    strokeWidth={action.strokeWidth}
                  />
                }else if(action.tool === 'text'){
                  return <Text
                    x={action.x}
                    y={action.y}
                    text={action.text}
                    fontSize={action.fontSize}
                    fill={action.fill}
                  />
                }else{
                  return <URLImage image={action} />;
                }
              })}
            </Layer>
          </Stage>
        </Box>
      </Grid>
    );
  } else {
    gameWorkSpace = (
      <Grid item xs="6" align="center">
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            flexWrap: "wrap",
          }}
        >
          <StyledToggleButtonGroup
            // orientation="vertical"
            size="small"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justified" disabled>
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
          <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
          <StyledToggleButtonGroup
            // orientation="vertical"
            size="small"
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton value="color" aria-label="color" disabled>
              <FormatColorFillIcon />
              <ArrowDropDownIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Paper>
        <Box
          sx={{
            width: 600,
            height: 600,
            backgroundColor: "white",
            border: 3,
          }}
        ></Box>
      </Grid>
    );
  }

  //right handside buttons
  let gameUtils = "";
  if (gameMode) {
    gameUtils = (
      <Grid item xs="3" align="center">
        <Button
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
        </Button>
        <Button
          sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography fontSize={"32px"}>Themes</Typography>
        </Button>
        <Button
          sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
          onClick={toggleCharacters}
        >
          <Typography fontSize={"32px"}>Characters</Typography>
        </Button>
        {characterToggle &&
        <Box sx={{width: 450,
          height: 200,
          margin: 1,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          borderRadius: 5,
          border: 3,
          color: "black",}}>
              <img src={require('../images/Trollface.png')}
                   draggable="true"
                   onDragStart={(e) => {
                   dragUrl.current = e.target.src;
               }} />
          </Box>
        }
        <Button
          sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
          onClick={toggleBubbles}
        >
          <Typography fontSize={"32px"}>Speech Bubbles</Typography>
        </Button>
        {bubbleToggle &&
        <Box sx={{width: 450,
          height: 200,
          margin: 1,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          borderRadius: 5,
          border: 3,
          color: "black",}}>
              <img src={require('../images/Speech_bubble.png')}
                   draggable="true"
                   onDragStart={(e) => {
                   dragUrl.current = e.target.src;
               }} />
          </Box>
        }
        <Button
          sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography fontSize={"32px"}>Your Recent Shapes</Typography>
        </Button>
        <Button
          sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: "yellow",
            "&:hover": {
              backgroundColor: "yellow",
              opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography fontSize={"32px"}>Save Selected As Shape</Typography>
        </Button>
        <Button
          sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: "green",
            "&:hover": {
              backgroundColor: "green",
              opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
          onClick={handleSubmit}
        >
          <Typography fontSize={"32px"}>Submit</Typography>
        </Button>
      </Grid>
    );
  } else {
    gameUtils = (
      <Grid item xs="3" align="center">
        <Button
          sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: "#FF7F7F",
            "&:hover": {
              backgroundColor: "#FF7F7F",
              opacity: [1, 1, 1],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography fontSize={"32px"}>Time Left: {timer}</Typography>
        </Button>
        <Button
          sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: "#b19cd9",
            "&:hover": {
              backgroundColor: "#b19cd9",
              opacity: [1, 1, 1],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography fontSize={"32px"}>
            Characters Left: {charactersLeft}
          </Typography>
        </Button>
        <Button
          sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: "green",
            "&:hover": {
              backgroundColor: "green",
              opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography fontSize={"32px"}>Submit</Typography>
        </Button>
      </Grid>
    );
  }
  //#endregion render elements

  let currentDisplay = (
    <List style={flexContainer} sx={{ justifyContent: "center" }}>
      {/* Left of Canvas */}
      {gameTools}
      {/* Drawing Canvas */}
      {gameWorkSpace}
      {/* Right of Canvas */}
      {gameUtils}
    </List>
  );

  //waiting switch
  if (auth.user.username != game.currentPlayer) {
    currentDisplay = (
      <WaitingScreen
        stageRef={stageRef}
        actions={actions}
        URLImage={URLImage}
        timer={timer}
      />
    );
  }

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
      }}
    >
      <Grid item xs="12" align="center">
        {gameModeButton}
        {gameCurrentPlayer}
        {/* List of current panels drawn goes here */}
        {gamePanels}
        {/* Bottom half of screen */}
        {currentDisplay}
      </Grid>
    </Grid>
  );
}
