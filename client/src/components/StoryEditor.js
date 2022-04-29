import React, { useContext } from "react";
import ReactQuill from "react-quill";
import StoryToolbar, { modules, formats } from "./StoryToolbar";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import { SocketContext } from "../socket";

export const StoryEditor = (props) => {
  
    const socket = useContext(SocketContext);
  
    let { storyText, setStoryText,  game } = props;
    const handleChange = (text) => {
        setStoryText(storyText)
        socket.emit("edit-text", text, game.lobby);
    };

    return (
    <Box
        sx={{
            width: 600,
            height: 600,
            backgroundColor: "white",
            border: 3,
        }}
        >
        {<StoryToolbar />}
        <ReactQuill
            theme="snow"
            value={storyText}
            onChange={(e) => handleChange(e)}
            placeholder={"Write something awesome..."}
            sx={{
            width: 600,
            height: 600,
            backgroundColor: "white",
            border: 3,
            }}
            modules={modules}
            formats={formats}
        ></ReactQuill>
        </Box>
    );
};

export default StoryEditor;
