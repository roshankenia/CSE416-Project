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
} from "react-konva";
import useImage from "use-image";
import { BsEraserFill } from "react-icons/bs";

//socket
import { SocketContext } from "../socket";

export default function Timer() {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const countDown = async (count) => {
      console.log("Inside the countDown", count);
      setTimer(count);
    };

    socket.once("counter", countDown);

    return () => {
      socket.off("counter", countDown);
    };
  }, [timer]);

  return <Typography fontSize={"32px"}>Time Left: {timer}</Typography>;
}
