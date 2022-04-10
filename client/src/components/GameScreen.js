import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import AuthContext from "../auth";
import { Box, Button, List, ListItem, TextField } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import BrushIcon from '@mui/icons-material/Brush';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ColorizeIcon from '@mui/icons-material/Colorize';
import ClearIcon from '@mui/icons-material/Clear';

import { styled } from '@mui/material/styles';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
// import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// konva stuff
import { Stage, Layer, Rect, Text, Circle, Line, Star } from 'react-konva';

export default function GameScreen(){
    const { game } = useContext(GameContext);
    const { auth } = useContext(AuthContext)

    //#region game control

    //We would get this data from our game context in actual implementation
    //This is just hardcoded for now
    // THIS DATA SHOULD BE TAKEN FROM THE GAME OBJECT PASSED IN GameContext
    const roomCode = 'imadethiscodeup'
    // ******* change gameMode as "story" or "comic" to get different game screens *******
    // const gameMode = "comic"
    // WILL NOT BE IMPLEMENTED IN FINAL PROJECT
    // SIMPLY USED FOR DEMONSTRATION PURPOSES
    const [gameMode, setGameMode] = useState(true);
    const handleGameMode = (event) => {
        event.stopPropagation();
        if (gameMode){
            setGameMode(false)
        } else {
            setGameMode(true)
        }
    }

    const charactersLeft = 147
    const players = [
        auth.user.username,
        "u/Terran",
        "xx",
        "zz"
    ]

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        padding: 25,
        align: "center",
        alignItems: "center",
        justifyContent: "center"
    };

    const [currentPlayer, setCurrentPlayer] = useState(players[0]);

    //#region timer: some timer code i found online
    const [seconds, setSeconds] = useState(30);
    const [isActive, setIsActive] = useState(true);

    // useEffect(() => {
    //     let interval = null;
    //     if (seconds === 0) {
    //       setSeconds(500)
    //     }
    //     interval = setInterval(() => {
    //         setSeconds(seconds => seconds - 1);
    //     }, 1000);
    // }, [seconds]);

    // const [seconds, setSeconds] = React.useState(10);

    React.useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            if(players.indexOf(currentPlayer) == 3){
                setSeconds('Vote To Publish!');
                
            }else{
                setCurrentPlayer(players[players.indexOf(currentPlayer) + 1])
                setSeconds(30);
            }
        }
    });

    //#endregion timer

    const [alignment, setAlignment] = React.useState('left');
    const [formats, setFormats] = React.useState(() => ['italic']);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
          margin: theme.spacing(0.5),
          border: 0,
          '&.Mui-disabled': {
            border: 0,
          },
          '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
          },
          '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
          },
        },
      }));
    console.log(gameMode)
    //#endregion game control


    //#region KONVA functions hardcoded
    const [tool, setTool] = React.useState('pen');
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
        return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };
    //#endregion


    //list of game elements to render
    //#region game elements to render
    const gameModeButton = <Button
        onClick={handleGameMode}
        sx={{
            width: 300,
            height: 50,
            margin: 1,
            backgroundColor: 'white',
            '&:hover': {
            backgroundColor: 'white',
            opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black"
        }}
    >
        <Typography>
            {gameMode ? 'Click me to switch to Story' : 'Click me to switch to Comic'}
        </Typography>
    </Button>

    const gameCurrentPlayer = <Typography fontSize={"64px"}>
        {currentPlayer} is currently {gameMode ? 'Drawing' : 'Writing'}...
    </Typography>

    {/* List of current panels drawn goes here */}
    const gamePanels = <List style={flexContainer}>
        <Box sx={{
                width: 150,
                height: 150,
                margin: 1,
                backgroundColor: 'white',
                '&:hover': {
                backgroundColor: 'white',
                opacity: [0.9, 0.8, 0.7],
                },
                border: 3
            }}/>
        <Box
            sx={{
                width: 150,
                height: 150,
                margin: 1,
                backgroundColor: 'white',
                '&:hover': {
                backgroundColor: 'white',
                opacity: [0.9, 0.8, 0.7],
                },
                border: 3
            }}
        >{gameMode? '':<Typography fontSize={"10px"}>
            Fiona lived in her parents’ house, 
            in the town where she and Grant went to university. 
            It was a big, bay-windowed house that seemed to Grant 
            both luxurious and disorderly, with rugs crooked on the floors 
            and cup rings bitten into the table varnish.
        </Typography>}
        </Box>
        <Box
            sx={{
                width: 150,
                height: 150,
                margin: 1,
                backgroundColor: 'white',
                '&:hover': {
                backgroundColor: 'white',
                opacity: [0.9, 0.8, 0.7],
                },
                border: 3
            }}
        >
        {gameMode? '': 
            <Typography fontSize={"10px"}>Her mother was Icelandic—a powerful woman with a froth of white hair 
                and indignant far-left politics. The father was an important cardiologist, 
                revered around the hospital but happily subservient at home, where he would 
                listen to his wife’s strange tirades with an absentminded smile.
            </Typography>}
        </Box>
        <Box
            sx={{
                width: 150,
                height: 150,
                margin: 1,
                backgroundColor: 'white',
                '&:hover': {
                backgroundColor: 'white',
                opacity: [0.9, 0.8, 0.7],
                },
                border: 3
            }}
        >
        {gameMode? '': 
        <Typography fontSize={"10px"}>Fiona had her own little car and a pile of cashmere sweaters, but she wasn’t 
                                         in a sorority, and her mother’s political activity was probably the reason. 
                                         Not that she cared. Sororities were a joke to her, and so was politics—though 
                                         she liked to play “The Four Insurgent Generals” on the phonograph, and 
                                         sometimes also the “Internationale,” very loud.
        </Typography>}
        </Box>
    </List>    

    const gameTools = <Grid item xs="3" align="center"> 
                    {gameMode? 
                        <List style={flexContainer}>
                            <Box
                                sx={{
                                    width: 300,
                                    height: 600,
                                    margin: 1,
                                    backgroundColor: 'primary.dark',
                                    borderRadius: 5,
                                    border: 3
                                }}
                            >
                                <List>
                                    <Typography fontSize={"32px"}>
                                        Layers:
                                    </Typography>
                                    <Button
                                        sx={{
                                            width: 200,
                                            height: 75,
                                            margin: 1,
                                            backgroundColor: 'white',
                                            '&:hover': {
                                            backgroundColor: 'white',
                                            opacity: [0.9, 0.8, 0.7],
                                            },
                                            borderRadius: 5,
                                            border: 3,
                                            color: "black"
                                        }}
                                    >
                                        <Typography fontSize={"32px"}>
                                            Layer 1
                                        </Typography>
                                    </Button>
                                    <Button
                                        sx={{
                                            width: 200,
                                            height: 75,
                                            margin: 1,
                                            backgroundColor: 'white',
                                            '&:hover': {
                                            backgroundColor: 'white',
                                            opacity: [0.9, 0.8, 0.7],
                                            },
                                            borderRadius: 5,
                                            border: 3,
                                            color: "black"
                                        }}
                                    >
                                        <Typography fontSize={"32px"}>
                                            Layer 2
                                        </Typography>
                                    </Button>
                                </List>
                            </Box>
                            <Box
                                sx={{
                                    width: 150,
                                    height: 600,
                                    margin: 1,
                                    backgroundColor: 'primary.dark',
                                    borderRadius: 5,
                                    border: 3
                                }}
                            >
                                <EditIcon fontSize="large" />
                                <BrushIcon fontSize="large" />
                                <FormatColorFillIcon fontSize="large" />
                                <ImageSearchIcon fontSize="large" />
                                <OpenInFullIcon fontSize="large" />
                                <TextFormatIcon fontSize="large" />
                                <ColorizeIcon fontSize="large" />
                                <ClearIcon fontSize="large" />
                            </Box>
                        </List>
                    : 
                        <Grid item xs="3" align="center"> 
                        </Grid>}   
    </Grid>

    {/* Drawing/Writing Canvas */}
    let gameWorkSpace = ''
    if(gameMode){ gameWorkSpace = <Grid item xs="6" align="center">
                            <Box
                                sx={{
                                    width: 600,
                                    height: 600,
                                    backgroundColor: 'white',
                                    border: 3
                                }}
                            >
                            <div>
                            <Stage
                                width={window.innerWidth}
                                height={window.innerHeight}
                                onMouseDown={handleMouseDown}
                                onMousemove={handleMouseMove}
                                onMouseup={handleMouseUp}
                            >
                                <Layer>
                                <Text text="Just start drawing" x={5} y={30} />
                                {lines.map((line, i) => (
                                    <Line
                                    key={i}
                                    points={line.points}
                                    stroke="#df4b26"
                                    strokeWidth={5}
                                    tension={0.5}
                                    lineCap="round"
                                    globalCompositeOperation={
                                        line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                    }
                                    />
                                ))}
                                </Layer>
                            </Stage>
                            <select
                                value={tool}
                                onChange={(e) => {
                                setTool(e.target.value);
                                }}
                            >
                                <option value="pen">Pen</option>
                                <option value="eraser">Eraser</option>
                            </select>
                            </div>

                            </Box>
    </Grid>}
    else{ gameWorkSpace = <Grid item xs="6" align="center">
                         <Paper
                                elevation={0}
                                sx={{
                                display: 'flex',
                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                flexWrap: 'wrap',
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
                                    backgroundColor: 'white',
                                    border: 3
                                }}
                            ></Box>
                        </Grid>
    }

    let gameUtils = ''
    if(gameMode){ gameUtils = <Grid item xs="3" align="center">
                    <Button
                        sx={{
                            width: 450,
                            height: 75,
                            margin: 1,
                            backgroundColor: '#FF7F7F',
                            borderRadius: 5,
                            border: 3,
                            color: "black"
                        }}
                    >
                        <Typography fontSize={"32px"}>
                            Time Left: {seconds}
                        </Typography>
                    </Button>
                    <Button
                        sx={{
                            width: 450,
                            height: 75,
                            margin: 1,
                            backgroundColor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                            borderRadius: 5,
                            border: 3,
                            color: "black"
                        }}
                    >
                        <Typography fontSize={"32px"}>
                            Themes
                        </Typography>
                    </Button>
                    <Button
                        sx={{
                            width: 450,
                            height: 75,
                            margin: 1,
                            backgroundColor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                            borderRadius: 5,
                            border: 3,
                            color: "black"
                        }}
                    >
                        <Typography fontSize={"32px"}>
                            Characters
                        </Typography>
                    </Button>
                    <Button
                        sx={{
                            width: 450,
                            height: 75,
                            margin: 1,
                            backgroundColor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                            borderRadius: 5,
                            border: 3,
                            color: "black"
                        }}
                    >
                        <Typography fontSize={"32px"}>
                            Speech Bubbles
                        </Typography>
                    </Button>
                    <Button
                        sx={{
                            width: 450,
                            height: 75,
                            margin: 1,
                            backgroundColor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                            borderRadius: 5,
                            border: 3,
                            color: "black"
                        }}
                    >
                        <Typography fontSize={"32px"}>
                            Your Recent Shapes
                        </Typography>
                    </Button>
                    <Button
                        sx={{
                            width: 450,
                            height: 75,
                            margin: 1,
                            backgroundColor: 'yellow',
                            '&:hover': {
                            backgroundColor: 'yellow',
                            opacity: [0.9, 0.8, 0.7],
                            },
                            borderRadius: 5,
                            border: 3,
                            color: "black"
                        }}
                    >
                        <Typography fontSize={"32px"}>
                            Save Selected As Shape
                        </Typography>
                    </Button>
                    <Button
                        sx={{
                            width: 450,
                            height: 75,
                            margin: 1,
                            backgroundColor: 'green',
                            '&:hover': {
                            backgroundColor: 'green',
                            opacity: [0.9, 0.8, 0.7],
                            },
                            borderRadius: 5,
                            border: 3,
                            color: "black"
                        }}
                    >
                        <Typography fontSize={"32px"}>
                            Submit
                        </Typography>
                    </Button>
    </Grid>}
    else{ gameUtils = <Grid item xs="3" align="center">
                                 <Button
                                    sx={{
                                        width: 450,
                                        height: 75,
                                        margin: 1,
                                        backgroundColor: '#FF7F7F',
                                        '&:hover': {
                                            backgroundColor: '#FF7F7F',
                                            opacity: [1, 1, 1],
                                        },
                                        borderRadius: 5,
                                        border: 3,
                                        color: "black",
                                    }}
                                >
                                    <Typography fontSize={"32px"}>
                                        Time Left: {seconds}
                                    </Typography>
                                </Button>
                                <Button
                                    sx={{
                                        width: 450,
                                        height: 75,
                                        margin: 1,
                                        backgroundColor: '#b19cd9',
                                        '&:hover': {
                                            backgroundColor: '#b19cd9',
                                            opacity: [1, 1, 1],
                                        },
                                        borderRadius: 5,
                                        border: 3,
                                        color: "black"
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
                                        backgroundColor: 'green',
                                        '&:hover': {
                                        backgroundColor: 'green',
                                        opacity: [0.9, 0.8, 0.7],
                                        },
                                        borderRadius: 5,
                                        border: 3,
                                        color: "black"
                                    }}
                                >
                                    <Typography fontSize={"32px"}>
                                        Submit
                                    </Typography>
                                </Button>
                            </Grid>
    }
    //#endregion render elements

    //list of waiting elements to render
    //#region wait elements
    const waitChat = <Button
        sx={{
            width: 450,
            height: 75,
            margin: 1,
            backgroundColor: 'red',
            '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black"
        }}
    >
        <Typography fontSize={"32px"}>
            chat
        </Typography>
    </Button>

    const waitUtils =<Grid item xs="3" align="center">
                    <Button
                    sx={{
                        width: 450,
                        height: 75,
                        margin: 1,
                        backgroundColor: '#FF7F7F',
                        borderRadius: 5,
                        border: 3,
                        color: "black"
                    }}
                    >
                        <Typography fontSize={"32px"}>
                            Time Left: {seconds}
                        </Typography>
                    </Button>

                    <Button
                    sx={{
                        width: 450,
                        height: 75,
                        margin: 1,
                        backgroundColor: 'red',
                        '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                        },
                        borderRadius: 5,
                        border: 3,
                        color: "black"
                    }}
                    >
                    <Typography fontSize={"32px"}>
                        Leave
                    </Typography>
                    </Button>
    </Grid>
    //#endregion

    if(auth.user.username != currentPlayer){
        return  <Grid 
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
                    <List style={flexContainer} sx={{justifyContent:"center"}}>
                        {/* Left of Canvas */}
                        {waitChat}
                        {/* Drawing Canvas */}
                        {gameWorkSpace}
                        {/* Right of Canvas */}
                        {waitUtils}
                    </List>   
                </Grid> 
            </Grid>
    }else{
        return  <Grid 
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
                    <List style={flexContainer} sx={{justifyContent:"center"}}>
                        {/* Left of Canvas */}
                        {gameTools}
                        {/* Drawing Canvas */}
                        {gameWorkSpace}
                        {/* Right of Canvas */}
                        {gameUtils}
                    </List>   
                </Grid> 
            </Grid>
    }
}