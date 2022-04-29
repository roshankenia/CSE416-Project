//#region imports
import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../game";
import AuthContext from "../auth";
import { Box, Button, List, ListItem, TextField } from "@mui/material";

import { styled } from "@mui/material/styles";
// import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import WaitingScreen from "./WaitingScreen";
import GameTools from "./GameTools";
import Timer from "./Timer";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
//#endregion imports

//#region konva import
import {
  Stage,
  Layer,
  Rect,
  Text,
  Circle,
  Line,
  Star,
  Shape,
  Image,
  Ellipse,
} from "react-konva";
import useImage from "use-image";
import { BsEraserFill } from "react-icons/bs";
import URLImage from "./URLImage";
//#endregion konva import

//#region quilljs import
import StoryEditor from "./StoryEditor";
//#endregion quilljs

//socket
import { SocketContext } from "../socket";

export default function GameScreen() {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  const [storyText, setStoryText] = React.useState("");

  //#region css
  const buttonCSS = { color: "black", fontSize: "40pt" };
  //#endregion css

  //#region game control

  //#region not-timer
  const [characterToggle, setCharacterToggle] = useState(false);
  const toggleCharacters = () => {
    if (!characterToggle) {
      setTool("image");
    }
    setCharacterToggle(!characterToggle);
  };
  const [bubbleToggle, setBubbleToggle] = useState(false);
  const toggleBubbles = () => {
    if (!bubbleToggle) {
      setTool("image");
    }
    setBubbleToggle(!bubbleToggle);
  };

  const [themeToggle, setThemeToggle] = useState(false);
  const toggleThemes = () => {
    if (!themeToggle) {
      setTool("image");
    }
    setThemeToggle(!themeToggle);
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
  const [actions, setActions] = React.useState([]);
  const [tool, setTool] = React.useState("pen");
  const [color, setColor] = React.useState("#000000");
  const [strokeWidth, setStrokeWidth] = React.useState(15);
  const [fill, setFill] = React.useState("#ffffff");
  const [redos, setRedos] = React.useState([]);
  const [displayText, setDisplayText] = React.useState("Enter Text Here");

  const isDrawing = React.useRef(false);
  const stageRef = React.useRef(null);
  const dragUrl = React.useRef();

  const handleChangeText = (e) => {
    const text = e.target.value;
    setDisplayText(text);
  };

  const handleUndo = () => {
    if (actions.length) {
      let redo = actions.pop();
      setActions(actions);
      setRedos([...redos, redo]);
      socket.emit("draw-actions", auth.user._id, actions, game.lobby);
    }
  };

  const handleRedo = () => {
    if (redos.length) {
      let action = redos.pop();
      socket.emit(
        "draw-actions",
        auth.user._id,
        [...actions, action],
        game.lobby
      );
      setActions([...actions, action]);
      setRedos(redos);
    }
  };

  const handleClear = () => {
    setActions([]);
    setRedos([]);
    socket.emit("draw-actions", auth.user._id, [], game.lobby);
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
          fill: fill,
        },
      ]);
    } else if (tool == "ellipse") {
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
          fill: fill,
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
          fill: fill,
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
      });
      setActions(actions);
      socket.emit("draw-actions", auth.user._id, actions, game.lobby);
    }
  };

  const handleMouseMove = (e) => {
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
        fill: fill,
      };
      actions.splice(actions.length - 1, 1, lastRectangle);
      setActions(actions.concat());
    } else if (tool == "ellipse") {
      const sx = actions[actions.length - 1].x;
      const sy = actions[actions.length - 1].y;
      const key = actions[actions.length - 1].key;
      const { x, y } = e.target.getStage().getPointerPosition();

      let lastEllipse = {
        tool,
        x: sx,
        y: sy,
        width: Math.abs(x - sx),
        height: Math.abs(y - sy),
        key: key,
        stroke: color,
        strokeWidth: strokeWidth,
        fill: fill,
      };
      actions.splice(actions.length - 1, 1, lastEllipse);
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
        fill: fill,
      };
      actions.splice(actions.length - 1, 1, lastCircle);
      setActions(actions.concat());
    }
    socket.emit("draw-actions", auth.user._id, actions, game.lobby);
  };

  const handleMouseUp = (e) => {
    isDrawing.current = false;
    setRedos([]);
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

    const syncT = async (text) => {
      console.log(text);
      console.log("storyText before update:", storyText);
      setStoryText(text);
      console.log("story text after update", storyText)
    };

    socket.on("sync-text", syncT);
    return () => {
      socket.off("sync-actions", syncA);
      socket.off("sync-text", syncT);
    };
  }, [actions, storyText]);

  const gameCurrentPlayer = (
    <Typography fontSize={"64px"}>
      {game.currentPlayer} is currently{" "}
      {game.gamemode == "comic" ? "Drawing" : "Writing"}...
    </Typography>
  );

  /* List of current panels drawn goes here */
  const gamePanels = (
    <Box sx={{ width: "70%", height: "70%" }}>
      <ImageList sx={{ width: "95%" }} cols={6}>
        {game.panels.map((picture) => (
          <ImageListItem key={picture}>
            <img src={picture} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );

  const isColorSelected = (buttonColor) => {
    if (color == buttonColor) {
      return "black";
    } else {
      return "white";
    }
  };

  const isFillSelected = (fillColor) => {
    if (fill == fillColor) {
      return "black";
    } else {
      return "white";
    }
  };

  const handleSetStrokeWidth = (event, width) => {
    setStrokeWidth(width);
  };

  const handleSetFill = (event, fill) => {
    setFill(fill);
  };

  const gameTools = (
    <GameTools
      buttonCSS={buttonCSS}
      setTool={setTool}
      gameMode={game.gamemode}
      flexContainer={flexContainer}
      tool={tool}
      changeColor={changeColor}
      isColorSelected={isColorSelected}
      handleSetStrokeWidth={handleSetStrokeWidth}
      strokeWidth={strokeWidth}
      fill={fill}
      handleSetFill={handleSetFill}
      isFillSelected={isFillSelected}
      handleUndo={handleUndo}
      handleRedo={handleRedo}
      handleChangeText={handleChangeText}
      handleClear={handleClear}
      setCharacterToggle={setCharacterToggle}
      setThemeToggle={setThemeToggle}
      setBubbleToggle={setBubbleToggle}
    />
  );

  /* Drawing/Writing Canvas */
  let gameWorkSpace = "";
  if (game.gamemode === "comic") {
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
            actions.push({
              ...stageRef.current.getPointerPosition(),
              src: dragUrl.current,
              key: actions.length + 1,
              size: strokeWidth,
            });
            setActions(
              actions.concat([
                {
                  ...stageRef.current.getPointerPosition(),
                  src: dragUrl.current,
                  key: actions.length + 1,
                  size: strokeWidth,
                },
              ])
            );
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
                      width={action.width}
                      height={action.height}
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
        </Box>
      </Grid>
    );
  } else {
    gameWorkSpace = (
      <Grid item xs="6" align="center">
        <StoryEditor
          storyText={storyText}
          setStoryText={setStoryText}
          game={game}
        />
      </Grid>
    );
  }

  //right handside buttons
  let gameUtils = "";
  if (game.gamemode === "comic") {
    gameUtils = (
      <Grid item xs="3" align="center">
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
          <Timer
            stageRef={stageRef}
            actions={actions}
            setActions={setActions}
            storyText={storyText}
            setStoryText={setStoryText}
          />
        </Box>
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
          onClick={toggleThemes}
        >
          <Typography fontSize={"32px"}>Themes</Typography>
        </Button>
        {themeToggle && (
          <Box
            sx={{
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
            <ImageList sx={{ width: "95%" }} cols={3}>
              <ImageListItem key={1}>
                <img
                  src={require("../images/background1.png")}
                  draggable="true"
                  onDragStart={(e) => {
                    dragUrl.current = e.target.src;
                  }}
                />
              </ImageListItem>
              <ImageListItem key={2}>
                <img
                  src={require("../images/background2.png")}
                  draggable="true"
                  onDragStart={(e) => {
                    dragUrl.current = e.target.src;
                  }}
                />
              </ImageListItem>
              <ImageListItem key={3}>
                <img
                  src={require("../images/background3.png")}
                  draggable="true"
                  onDragStart={(e) => {
                    dragUrl.current = e.target.src;
                  }}
                />
              </ImageListItem>
            </ImageList>
          </Box>
        )}
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
        {characterToggle && (
          <Box
            sx={{
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
            <ImageList sx={{ width: "95%" }} cols={3}>
              {[1, 2, 3, 4, 5, 6].map((picture) => (
                <ImageListItem key={picture}>
                  <img
                    src={require("../images/Trollface.png")}
                    draggable="true"
                    onDragStart={(e) => {
                      dragUrl.current = e.target.src;
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
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
        {bubbleToggle && (
          <Box
            sx={{
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
            <ImageList sx={{ width: "95%" }} cols={3}>
              {[1, 2, 3, 4, 5, 6].map((picture) => (
                <ImageListItem key={picture}>
                  <img
                    src={require("../images/Speech_bubble.png")}
                    draggable="true"
                    onDragStart={(e) => {
                      dragUrl.current = e.target.src;
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
      </Grid>
    );
  } else {
    gameUtils = (
      <Grid item xs="3" align="center">
        <Box
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
          <Timer
            stageRef={stageRef}
            actions={actions}
            setActions={setActions}
            storyText={storyText}
            setStoryText={setStoryText}
          />
        </Box>
        <Typography
          fontSize={"32px"}
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
          {"Characters Left: 237"}
        </Typography>
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
  if (auth.user.username !== game.currentPlayer) {
    currentDisplay = (
      <WaitingScreen
        stageRef={stageRef}
        actions={actions}
        URLImage={URLImage}
        setActions={setActions}
        storyText={storyText}
        setStoryText={setStoryText}
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
        {gameCurrentPlayer}
        {/* List of current panels drawn goes here */}
        {gamePanels}
        {/* Bottom half of screen */}
        {currentDisplay}
      </Grid>
    </Grid>
  );
}
