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

export default function GameScreen(){
    // return <Grid style={{fontSize:'420px'}}>Not implemented</Grid>
    const { game } = useContext(GameContext);

    //We would get this data from our game context in actual implementation
    //This is just hardcoded for now
    // THIS DATA SHOULD BE TAKEN FROM THE GAME OBJECT PASSED IN GameContext
    const roomCode = 'imadethiscodeup'
    const gameMode = "comic"
    const timer = "0:11"
    const turnNumber = 0
    const players = [
        "u/anon",
        "u/Terran",
        "xx",
        "zz"
    ]
    const currentPlayer = players[turnNumber%(players.length)]

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        padding: 25,
        align: "center",
        alignItems: "center",
        justifyContent: "center"
      };
    
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
                    <Typography fontSize={"64px"}>
                        {currentPlayer} is currently drawing...
                    </Typography>
                
                    <List style={flexContainer}>
                        {/* List of current panels drawn goes here */}
                        <Box sx={{
                                width: 150,
                                height: 150,
                                margin: 1,
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                                },
                                border: 3
                            }}/>
                        <Box
                            sx={{
                                width: 150,
                                height: 150,
                                margin: 1,
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                backgroundColor: 'primary.main',
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
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                backgroundColor: 'primary.main',
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
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                backgroundColor: 'primary.main',
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
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                backgroundColor: 'primary.main',
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
                                    backgroundColor: 'primary.dark',
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
            Story Game Screen Not Implemented
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
            Game Mode Invalid
        </Grid>
    }
    
}