import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
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

export default function GameScreen(){
    const { game } = useContext(GameContext);

    //We would get this data from our game context in actual implementation
    //This is just hardcoded for now
    // THIS DATA SHOULD BE TAKEN FROM THE GAME OBJECT PASSED IN GameContext
    const roomCode = 'imadethiscodeup'

    // ******* change gameMode as "story" or "comic" to get different game screens *******
    const gameMode = "comic"

    // WILL NOT BE IMPLEMENTED IN FINAL PROJECT
    // SIMPLY USED FOR DEMONSTRATION PURPOSES
    // const [gameMode, setGameMode] = useState('comic');
    // const handleGameMode = (event, newGameMode) => {
    //     setGameMode(newGameMode);
    // }

    const timer = "0:11"
    const charactersLeft = 147
    const players = [
        "u/anon",
        "u/Terran",
        "xx",
        "zz"
    ]
    const currentPlayer = players[0]

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        padding: 25,
        align: "center",
        alignItems: "center",
        justifyContent: "center"
    };

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
    
    if (gameMode === "comic"){
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
                    <Button
                    // onClick={handleGameMode("story")}
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
                            Click me to switch to Story
                        </Typography>
                    </Button>
                    <Typography fontSize={"64px"}>
                        {currentPlayer} is currently drawing...
                    </Typography>
                
                    <List style={flexContainer}>
                        {/* List of current panels drawn goes here */}
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
                        ></Box>
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
                        ></Box>
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
                        ></Box>
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
                        ></Box>
                        
                    </List>
                    
                    {/* Bottom half of screen */}
                    <List style={flexContainer} sx={{justifyContent:"center"}}>
                        {/* Left of Canvas */}
                        <Grid item xs="3" align="center"> 
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
                        </Grid>
                        {/* Drawing / Writing Canvas */}
                        <Grid item xs="6" align="center">
                            <Box
                                sx={{
                                    width: 600,
                                    height: 600,
                                    backgroundColor: 'white',
                                    border: 3
                                }}
                            ></Box>
                        </Grid>
                        {/* Right of Canvas */}
                        <Grid item xs="3" align="center">
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
                                    Time Left: {timer}
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
                        </Grid>
                    </List>   
                </Grid> 
            </Grid>
    } else if (gameMode === "story") {
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
                <Button
                    // onClick={handleGameMode("comic")}
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
                            Click me to switch to Comic
                        </Typography>
                    </Button>
                    <Typography fontSize={"64px"}>
                        {currentPlayer} is currently writing...
                    </Typography>
                
                    <List style={flexContainer}>
                        {/* List of current panels drawn goes here */}
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
                        ></Box>
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
                        ></Box>
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
                        ></Box>
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
                        ></Box>
                        
                    </List>
                    
                    
                    {/* Bottom half of screen */}
                    <List style={flexContainer} sx={{justifyContent:"center"}}>
                        {/* Left of Canvas */}
                        <Grid item xs="3" align="center"> 
                            
                        </Grid>
                        {/* Drawing / Writing Canvas */}
                        <Grid item xs="6" align="center">
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
                        {/* Right of Canvas */}
                        <Grid item xs="3" align="center">
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
                                    Time Left: {timer}
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
                    </List>   
                </Grid> 
            </Grid>
    } else {
        return <Grid
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
            Invalid Game Mode
        </Grid>
    }
    
}