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

import ReactQuill from "react-quill";

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
  const charLimit = 9999999;

  //#region css
  const buttonCSS = { color: "black", fontSize: "40pt" };
  //#endregion css

  let backgroundImages = [
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499280/Background%20Images/sunset-5766785_640_ra1ubj.jpg",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499280/Background%20Images/istockphoto-1141522220-612x612_fmq5k9.jpg",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499280/Background%20Images/6-square-cartoon-radial-background-1_mpfd1i.jpg",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499280/Background%20Images/red-fox-5456627_640_xv9xwr.jpg",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499280/Background%20Images/scenery-5660762_640_uqljyg.jpg",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499279/Background%20Images/cats-7122943_640_omrg42.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499280/Background%20Images/modern-4423814_640_fjh5sk.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499280/Background%20Images/park-4971822_640_rniioc.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499280/Background%20Images/cartoon-2716788_640_yswv0m.jpg",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499279/Background%20Images/icon-4423853_640_nra6au.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499279/Background%20Images/cartoon-2640561_640_uw2ebe.jpg",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499279/Background%20Images/cartoon-2640563_640_fswqjq.jpg",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499279/Background%20Images/cartoon-background-2633730_640_qaxouv.jpg",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499279/Background%20Images/cartoon-7106965_640_zyqmck.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499279/Background%20Images/background-6360861_640_mokesd.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499279/Background%20Images/cartoon-2614617_640_cxirx7.jpg",
  ];
  let characters = [
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499850/Characters/pokemon-5426712_640_wkzzcr.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499849/Characters/blonde-1300066_640_toyvok.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499849/Characters/bird-1297727_640_mpsegg.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499850/Characters/cartoon-1296251_640_vgt3tv.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499849/Characters/animal-2029279_640_kjni8i.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499849/Characters/business-2025814_640_j4xuwl.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499849/Characters/boy-2027615_640_masjm7.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499850/Characters/grinch-5849048_640_sewr4l.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499850/Characters/mermaid-1980181_640_iub1wk.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499850/Characters/eggplant-2924511_640_krm26z.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499850/Characters/cat-278845_640_ucmdgw.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499850/Characters/woman-4530909_640_nxaecj.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499850/Characters/santa-4607097_640_fk8vqe.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499850/Characters/zebra-470305_640_im2rwq.png",
    "https://res.cloudinary.com/jart-cse416/image/upload/v1652499850/Characters/monster-1460885_640_g2xc8n.png",
  ];
  //#region game control

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

  const handleLeave = (event) => {
    game.disconnectPlayer();
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
      console.log("story text after update", storyText);
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
  let gamePanels = "";
  if (game.gamemode == "comic") {
    gamePanels = (
      <Box sx={{ width: "70%", height: "70%" }}>
        <ImageList sx={{ width: "95%" }} cols={6}>
          {game.panels.map((picture, index) => (
            <ImageListItem key={index}>
              <img src={picture} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    );
  } else if (game.gamemode == "story") {
    gamePanels = (
      <Grid container spacing={2}>
        {game.panels.map((text) => (
          <Grid
            item
            key={text}
            xs={2}
            sx={{
              backgroundColor: "white",
              border: 3,
            }}
            style={{ height: 200 }}
          >
            <ReactQuill
              style={{ maxHeight: "100%", overflow: "auto" }}
              readOnly={true}
              theme="bubble"
              value={text}
            ></ReactQuill>
          </Grid>
        ))}
      </Grid>
    );
  }

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
      <Grid item xs={6} align="center">
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
      <Grid item xs={6} align="center">
        <StoryEditor
          storyText={storyText}
          setStoryText={setStoryText}
          charLimit={charLimit}
          game={game}
        />
      </Grid>
    );
  }

  //right handside buttons
  let gameUtils = "";
  if (game.gamemode === "comic") {
    gameUtils = (
      <Grid item xs={3} align="center">
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
            <ImageList
              sx={{ width: "95%" }}
              cols={3}
              style={{ maxHeight: 200, overflow: "auto" }}
            >
              {backgroundImages.map((picture) => (
                <ImageListItem key={picture}>
                  <img
                    src={picture}
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
            <ImageList
              sx={{ width: "95%" }}
              cols={3}
              style={{ maxHeight: 200, overflow: "auto" }}
            >
              {characters.map((picture) => (
                <ImageListItem key={picture}>
                  <img
                    src={picture}
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
            <ImageList
              sx={{ width: "95%" }}
              cols={3}
              style={{ maxHeight: 200, overflow: "auto" }}
            >
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
      <Grid item xs={3} align="center">
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
        {/* <Typography
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
          {"Characters Left: "} {charLimit - storyText.replace(/<\/?[^>]+(>|$)/g, "").length}
        </Typography> */}
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
      <Grid item xs={12} align="center">
        {gameCurrentPlayer}
        {/* List of current panels drawn goes here */}
        {gamePanels}
        {/* Bottom half of screen */}
        {currentDisplay}
      </Grid>
    </Grid>
  );
}
