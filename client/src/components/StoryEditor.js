import React, { useContext } from "react";
import ReactQuill from "react-quill";
import StoryToolbar, { modules, formats } from "./StoryToolbar";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import { SocketContext } from "../socket";
import { useState } from "react";

export const StoryEditor = (props) => {
  
    const socket = useContext(SocketContext);
  
    let { storyText, setStoryText,  game, charLimit } = props;
    //need extra state for char limit
    const [oldText, setOldText] = useState(storyText)

    const quillRef = React.useRef(null);

    const handleChange = (text) => {
        if(charLimit - storyText.replace(/<\/?[^>]+(>|$)/g, "").length <= 1){
            setOldText(storyText)
        }
        //console.log("updating:",text);
        //console.log("Setting store Text" ,storyText)
        setStoryText(text)
        socket.emit("edit-text", text, game.lobby);
        if(charLimit - storyText.replace(/<\/?[^>]+(>|$)/g, "").length === 0 && charLimit - text.replace(/<\/?[^>]+(>|$)/g, "").length <= 0){
            setStoryText(oldText)
        }
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
            ref={quillRef}
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
