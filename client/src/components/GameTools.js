import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import AuthContext from "../auth";
import { Box, Button, List, ListItem, TextField } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import BrushIcon from "@mui/icons-material/Brush";

import IconButton from "@mui/material/IconButton";

// konva stuff
import { Stage, Layer, Rect, Text, Circle, Line, Star } from "react-konva";
import { BsEraserFill } from "react-icons/bs";

//socket
import { SocketContext } from "../socket";

import SquareIcon from "@mui/icons-material/Square";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import CircleIcon from "@mui/icons-material/Circle";
import Slider from "@mui/material/Slider";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import VignetteRoundedIcon from "@mui/icons-material/VignetteRounded";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GameTools(props) {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  let {
    buttonCSS,
    setTool,
    gameMode,
    flexContainer,
    tool,
    changeColor,
    isColorSelected,
    handleSetStrokeWidth,
    strokeWidth,
    handleSetFill,
    fill,
    isFillSelected,
    handleUndo,
    handleRedo,
    handleChangeText,
    handleClear,
    setBubbleToggle,
    setCharacterToggle,
    setThemeToggle,
  } = props;

  let strokeSlider = (
    <Slider
      value={typeof strokeWidth === "number" ? strokeWidth : 1}
      onChange={handleSetStrokeWidth}
      aria-labelledby="input-slider"
      min={1}
      max={30}
      sx={{ width: "90%" }}
      valueLabelDisplay="auto"
    />
  );

  let properties = (
    <List>
      <Typography fontSize={"32px"}>
        {tool.toUpperCase() + " Properties"}
      </Typography>
      {tool != "image" && (
        <Box
          sx={{
            margin: 1,
            backgroundColor: "white",
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography fontSize={"24px"}>Color</Typography>
          <Grid container sx={{ width: "95%", mr: 2 }}>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#ff0000" }}
                onClick={(event) => changeColor(event, "#ff0000")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#ff0000"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#ff5900" }}
                onClick={(event) => changeColor(event, "#ff5900")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#ff5900"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#ff9900" }}
                onClick={(event) => changeColor(event, "#ff9900")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#ff9900"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#f6ff00" }}
                onClick={(event) => changeColor(event, "#f6ff00")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#f6ff00"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#a6ff00" }}
                onClick={(event) => changeColor(event, "#a6ff00")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#a6ff00"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#62ff00" }}
                onClick={(event) => changeColor(event, "#62ff00")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#62ff00"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>

            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#00ff84" }}
                onClick={(event) => changeColor(event, "#00ff84")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#00ff84"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>

            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#00ffd9" }}
                onClick={(event) => changeColor(event, "#00ffd9")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#00ffd9"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#0048ff" }}
                onClick={(event) => changeColor(event, "#0048ff")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#0048ff"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#6a00ff" }}
                onClick={(event) => changeColor(event, "#6a00ff")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#6a00ff"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#a600ff" }}
                onClick={(event) => changeColor(event, "#a600ff")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#a600ff"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#ff00e6" }}
                onClick={(event) => changeColor(event, "#ff00e6")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#ff00e6"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>

            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#ffffff" }}
                onClick={(event) => changeColor(event, "#ffffff")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#ffffff"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#a1a1a1" }}
                onClick={(event) => changeColor(event, "#a1a1a1")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#a1a1a1"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#5c5c5c" }}
                onClick={(event) => changeColor(event, "#5c5c5c")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#5c5c5c"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#000000" }}
                onClick={(event) => changeColor(event, "#000000")}
                sx={{
                  border: 1,
                  borderColor: isColorSelected("#000000"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      )}
      {tool == "text" && (
        <Box
          sx={{
            margin: 1,
            backgroundColor: "white",
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography fontSize={"24px"}>Text</Typography>
          <TextField
            sx={{ border: 2, margin: 1 }}
            defaultValue="Enter Text Here"
            onChange={handleChangeText}
          ></TextField>
        </Box>
      )}
      {(tool == "rectangle" || tool == "circle" || tool == "ellipse") && (
        <Box
          sx={{
            margin: 1,
            backgroundColor: "white",
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography fontSize={"24px"}>Fill</Typography>
          <Grid container sx={{ width: "95%", mr: 2 }}>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#ff0000" }}
                onClick={(event) => handleSetFill(event, "#ff0000")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#ff0000"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#ff5900" }}
                onClick={(event) => handleSetFill(event, "#ff5900")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#ff5900"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#ff9900" }}
                onClick={(event) => handleSetFill(event, "#ff9900")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#ff9900"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#f6ff00" }}
                onClick={(event) => handleSetFill(event, "#f6ff00")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#f6ff00"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#a6ff00" }}
                onClick={(event) => handleSetFill(event, "#a6ff00")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#a6ff00"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#62ff00" }}
                onClick={(event) => handleSetFill(event, "#62ff00")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#62ff00"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>

            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#00ff84" }}
                onClick={(event) => handleSetFill(event, "#00ff84")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#00ff84"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>

            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#00ffd9" }}
                onClick={(event) => handleSetFill(event, "#00ffd9")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#00ffd9"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#0048ff" }}
                onClick={(event) => handleSetFill(event, "#0048ff")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#0048ff"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#6a00ff" }}
                onClick={(event) => handleSetFill(event, "#6a00ff")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#6a00ff"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#a600ff" }}
                onClick={(event) => handleSetFill(event, "#a600ff")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#a600ff"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#ff00e6" }}
                onClick={(event) => handleSetFill(event, "#ff00e6")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#ff00e6"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>

            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#ffffff" }}
                onClick={(event) => handleSetFill(event, "#ffffff")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#ffffff"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#a1a1a1" }}
                onClick={(event) => handleSetFill(event, "#a1a1a1")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#a1a1a1"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#5c5c5c" }}
                onClick={(event) => handleSetFill(event, "#5c5c5c")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#5c5c5c"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                size="small"
                style={{ color: "#000000" }}
                onClick={(event) => handleSetFill(event, "#000000")}
                sx={{
                  border: 1,
                  borderColor: isFillSelected("#000000"),
                }}
              >
                <SquareIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box
        sx={{
          margin: 1,
          backgroundColor: "white",
          borderRadius: 5,
          border: 3,
          color: "black",
        }}
      >
        <Typography fontSize={"24px"}>Size</Typography>
        {strokeSlider}
      </Box>
    </List>
  );

  if (tool == "eraser") {
    properties = (
      <List>
        <Typography fontSize={"32px"}>
          {tool.toUpperCase() + " Properties"}
        </Typography>
        <Box
          sx={{
            margin: 1,
            backgroundColor: "white",
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography fontSize={"24px"}>Size</Typography>
          {strokeSlider}
        </Box>
      </List>
    );
  }

  return (
    <Grid item xs="3" align="center">
      {gameMode == "comic" ? (
        <List style={flexContainer}>
          <Box
            sx={{
              width: "100%",
              height: 600,
              margin: 1,
              backgroundColor: "primary.dark",
              borderRadius: 5,
              border: 3,
            }}
          >
            {properties}
          </Box>
          <Box
            sx={{
              height: 600,
              width: "50%",
              margin: 1,
              backgroundColor: "primary.dark",
              borderRadius: 5,
              border: 3,
            }}
          >
            <Button
              sx={buttonCSS}
              onClick={(e) => {
                setBubbleToggle(false);
                setCharacterToggle(false);
                setThemeToggle(false);
                setTool("pen");
              }}
            >
              <EditIcon fontSize="large" />
            </Button>
            <Button
              sx={buttonCSS}
              onClick={(e) => {
                setBubbleToggle(false);
                setCharacterToggle(false);
                setThemeToggle(false);
                setTool("eraser");
              }}
            >
              <BsEraserFill fontSize="large" />
            </Button>
            <Button
              sx={buttonCSS}
              onClick={(e) => {
                setBubbleToggle(false);
                setCharacterToggle(false);
                setThemeToggle(false);
                setTool("rectangle");
              }}
            >
              <CropSquareIcon fontSize="large" />
            </Button>
            <Button
              sx={buttonCSS}
              onClick={(e) => {
                setBubbleToggle(false);
                setCharacterToggle(false);
                setThemeToggle(false);
                setTool("circle");
              }}
            >
              <CircleIcon fontSize="large" />
            </Button>
            <Button
              sx={buttonCSS}
              onClick={(e) => {
                setBubbleToggle(false);
                setCharacterToggle(false);
                setThemeToggle(false);
                setTool("ellipse");
              }}
            >
              <VignetteRoundedIcon fontSize="large" />
            </Button>
            <Button
              sx={buttonCSS}
              onClick={(e) => {
                setBubbleToggle(false);
                setCharacterToggle(false);
                setThemeToggle(false);
                setTool("text");
              }}
            >
              <TextFieldsIcon fontSize="large" />
            </Button>
            <Button sx={buttonCSS} onClick={(e) => handleUndo()}>
              <UndoIcon fontSize="large" />
            </Button>
            <Button sx={buttonCSS} onClick={(e) => handleRedo()}>
              <RedoIcon fontSize="large" />
            </Button>
            <Button sx={buttonCSS} onClick={(e) => handleClear()}>
              <DeleteIcon fontSize="large" />
            </Button>
            {/* <FormatColorFillIcon fontSize="large" />
            <ImageSearchIcon fontSize="large" />
            <OpenInFullIcon fontSize="large" />
            <TextFormatIcon fontSize="large" />
            <ColorizeIcon fontSize="large" />
            <ClearIcon fontSize="large" /> */}
          </Box>
        </List>
      ) : (
        <Grid item xs="3" align="center"></Grid>
      )}
    </Grid>
  );
}
