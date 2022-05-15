//#region imports
import { Box, Button, Grid, List, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { styled } from "@mui/material/styles";
// import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useContext, useEffect, useState } from "react";
//#endregion imports
//#region konva import
import { Circle, Ellipse, Layer, Line, Rect, Stage, Text } from "react-konva";
import ReactQuill from "react-quill";
import { useHistory } from "react-router-dom";
import AuthContext from "../auth";
import api from "../community/community-request-api";
import { GameContext } from "../game";
import GameTools from "./GameTools";
//#endregion konva import
//#region quilljs import
import StoryEditor from "./StoryEditor";
import URLImage from "./URLImage";

//#endregion quilljs

export default function GameScreen() {
  const { game } = useContext(GameContext);
  const [isComic, setIsComic] = useState(true);
  const history = useHistory();

  const [panels, setPanels] = useState([]);
  const [index, setIndex] = useState(0);

  const [postID, setPostID] = useState(
    window.location.pathname.toString().substring(14)
  );

  //comic or story Id
  const [csID, setCSID] = useState("");
  const [author, setAuthor] = useState("");

  const [actions, setActions] = React.useState([]);
  const [storyText, setStoryText] = React.useState("");
  const charLimit = 9999999;

  let backgroundImages = [
    require("../images/Backgrounds/6-square-cartoon-radial-background-1.jpg"),
    require("../images/Backgrounds/background-6360861_640.png"),
    require("../images/Backgrounds/cartoon-2614617_640.jpg"),
    require("../images/Backgrounds/cartoon-2640561_640.jpg"),
    require("../images/Backgrounds/cartoon-2640563_640.jpg"),
    require("../images/Backgrounds/cartoon-2716788_640.jpg"),
    require("../images/Backgrounds/cartoon-7106965_640.png"),
    require("../images/Backgrounds/sunset-5766785_640.jpg"),
    require("../images/Backgrounds/scenery-5660762_640.jpg"),
    require("../images/Backgrounds/red-fox-5456627_640.jpg"),
    require("../images/Backgrounds/park-4971822_640.png"),
    require("../images/Backgrounds/cartoon-background-2633730_640.jpg"),
    require("../images/Backgrounds/cats-7122943_640.png"),
    require("../images/Backgrounds/icon-4423853_640.png"),
    require("../images/Backgrounds/istockphoto-1141522220-612x612.jpg"),
    require("../images/Backgrounds/modern-4423814_640.png"),
  ];

  let characters = [
    require("../images/Characters/pokemon-5426712_640.png"),
    require("../images/Characters/blonde-1300066_640.png"),
    require("../images/Characters/business-2025814_640.png"),
    require("../images/Characters/boy-2027615_640.png"),
    require("../images/Characters/animal-2029279_640.png"),
    require("../images/Characters/bird-1297727_640.png"),
    require("../images/Characters/cartoon-1296251_640.png"),
    require("../images/Characters/cat-278845_640.png"),
    require("../images/Characters/eggplant-2924511_640.png"),
    require("../images/Characters/grinch-5849048_640.png"),
    require("../images/Characters/mermaid-1980181_640.png"),
    require("../images/Characters/monster-1460885_640.png"),
    require("../images/Characters/santa-4607097_640.png"),
    require("../images/Characters/woman-4530909_640.png"),
    require("../images/Characters/zebra-470305_640.png"),
  ];

  let speechBubbles = [
    require("../images/Speech Bubbles/bubble-154255_640.png"),
    require("../images/Speech Bubbles/bubble-160786_640.png"),
    require("../images/Speech Bubbles/bubble-160851_640.png"),
    require("../images/Speech Bubbles/cloud-304979_640.png"),
    require("../images/Speech Bubbles/comics-151341_640.png"),
    require("../images/Speech Bubbles/comic-speech-bubbles-4997661_640.png"),
    require("../images/Speech Bubbles/comic-speech-bubbles-4997664_640.png"),
    require("../images/Speech Bubbles/speech-25902_640.png"),
    require("../images/Speech Bubbles/speech-bubble-145975_640.png"),
    require("../images/Speech Bubbles/speech-bubble-145979_640.png"),
    require("../images/Speech Bubbles/speech-bubble-156056_640.png"),
  ];

  async function getPost() {
    const postResponse = await api.getPostById(postID);
    //also need to check for story
    if (postResponse.data.post.postStory === null) {
      setCSID(postResponse.data.post.postComic);
      const comicResponse = await api.getComicById(
        postResponse.data.post.postComic
      );
      setAuthor(comicResponse.data.comic.authors);
      setPanels(comicResponse.data.comic.panels);
      console.log("the value of game.turn in getPost ", game.turn);
      
      setActions(
        actions.concat([
          {
            ...stageRef.current.getPointerPosition(),
            src: comicResponse.data.comic.panels[game.turn],
            key: actions.length + 1,
          }
        ])
      );
    } else {
      setIsComic(false);
      setCSID(postResponse.data.post.postStory);
      const storyResponse = await api.getStoryById(
        postResponse.data.post.postStory
      );
      setAuthor(storyResponse.data.story.authors);
      setPanels(storyResponse.data.story.panels);
      console.log("the value of game.turn in getPost ", game.turn);
      setStoryText(storyResponse.data.story.panels[0]);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  const { auth } = useContext(AuthContext);

  //#region css
  const buttonCSS = { color: "black", fontSize: "40pt" };
  //#endregion css

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

  const addPanel = (event) => {
    if (isComic) {
      event.stopPropagation();
      console.log("Add panel method");
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

          //set panel to update
          let pan = panels;
          pan[game.turn] = imageData;
          setPanels(pan);
          game.soloNextTurn(imageData);

          setActions([]);
        })
        .catch((err) => console.log(err));
    } else {
      let newPanels = panels;
      newPanels[index] = storyText;
      setPanels(newPanels);
      setIndex(index + 1);
      setStoryText("");
    }
  };

  const nextPanel = (event) => {
    if (isComic) {
      event.stopPropagation();
      //TODO
      //change to next panel
      console.log("next panel method");
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
          console.log(imageData)
          const currTurn = game.turn;
          //set panel to update
          let pan = panels;
          pan[currTurn] = imageData;
          setPanels(pan);
          if (currTurn + 1 == panels.length) {
            console.log("inside go to voting");
            game.enterVoting(imageData, postID);
          } else {
            game.soloNextTurn(imageData); //Updates the image Data
            setActions([
              {
                ...stageRef.current.getPointerPosition(),
                src: panels[currTurn + 1],
                key: actions.length + 1,
              },
            ]);
          }
        })
        .catch((err) => console.log(err));
    } else {
      let newPanels = panels;
      newPanels[index] = storyText;
      setPanels(newPanels);
      setStoryText(panels[index + 1]);
      setIndex(index + 1);
    }
  };

  const handleConfirm = (event) => {
    let newPanels = panels;
    newPanels[index] = storyText;
    // api.updateStoryById(csID, author, newPanels);
    game.enterVoting()
    history.push("/");
  };

  const handleLeave = (event) => {
    history.push("/");
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
    }
  };

  const handleRedo = () => {
    if (redos.length) {
      let action = redos.pop();
      setActions([...actions, action]);
      setRedos(redos);
    }
  };

  const handleClear = () => {
    setActions([]);
    setRedos([]);
  };

  const changeColor = (event, color) => {
    event.stopPropagation();
    setColor(color);
  };

  const handleMouseDown = (e) => {
    console.log(panels)
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
  };

  const handleMouseUp = (e) => {
    isDrawing.current = false;
    setRedos([]);
  };

  //#endregion

  /* List of current panels drawn goes here */
  let gamePanels = "";

  if (isComic) {
    gamePanels = (
      <Box sx={{ width: "70%", height: "70%" }}>
        <ImageList sx={{ width: "95%" }} cols={6}>
          {panels.map((picture, index) => (
            <ImageListItem key={index}>
              <img src={picture} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    );
  } else {
    console.log("story")
    gamePanels = (

      // gamePanels = (
      //   <Box sx={{ width: "70%", height: "70%" }}>
      //     <ImageList sx={{ width: "95%" }} cols={6}>
      //       {panels.map((text, index) => (
      //         <ImageListItem key={index}
      //         sx={{
      //                   backgroundColor: "white",
      //                   border: 3,
      //                 }}>
      //            <ReactQuill
      //             style={{ maxHeight: "100%", overflow: "auto" }}
      //             readOnly={true}
      //             theme="bubble"
      //             value={text}
      //       ></ReactQuill>
      //         </ImageListItem>
      //       ))}
      //     </ImageList>
      //   </Box>
      // )
      <Grid container spacing={2}>
        {panels.map((text) => (
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
      //force comic
      gameMode={isComic? "comic" : "story"}
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

  if (isComic) {
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

  if (isComic) {
    gameUtils = (
      <Grid item xs={3} align="center">
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
              {speechBubbles.map((picture) => (
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
          //TODO
          onClick={nextPanel}
        >
          <Typography fontSize={"32px"}>NEXT</Typography>
        </Button>
        {game.turn + 1 >= panels.length && game.turn + 1 < 12 && (
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
            //TODO
            onClick={addPanel}
          >
            <Typography fontSize={"32px"}>ADD PANEL</Typography>
          </Button>
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
          //TODO
          onClick={handleLeave}
        >
          <Typography fontSize={"32px"}>Leave</Typography>
        </Button>
      </Grid>
    );
  } else {
    gameUtils = (
      <Grid item xs={3} align="center">
        {index < panels.length - 1 && (
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
            //TODO
            onClick={nextPanel}
          >
            <Typography fontSize={"32px"}>NEXT</Typography>
          </Button>
        )}
        {index >= panels.length - 1 && panels.length < 12 && (
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
            //TODO
            onClick={addPanel}
          >
            <Typography fontSize={"32px"}>ADD PANEL</Typography>
          </Button>
        )}
        {index >= panels.length - 1 && (
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
            //TODO
            onClick={handleConfirm}
          >
            <Typography fontSize={"32px"}>Confirm Edit</Typography>
          </Button>
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
          //TODO
          onClick={handleLeave}
        >
          <Typography fontSize={"32px"}>Leave</Typography>
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

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
      }}
    >
      <Grid item xs={12} align="center">
        {gamePanels}
        {/* Bottom half of screen */}
        {currentDisplay}
      </Grid>
    </Grid>
  );
}
