import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import { Box, Button, List, ListItem, TextField } from "@mui/material";

export default function GameScreen(){
    // return <Grid style={{fontSize:'420px'}}>Not implemented</Grid>
    const { game } = useContext(GameContext);

    //We would get this data from our game context in actual implementation
    //This is just hardcoded for now
    // THIS DATA SHOULD BE TAKEN FROM THE GAME OBJECT PASSED IN GameContext
    const roomCode = 'imadethiscodeup'
    const gameMode = "comic"
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
        alignItems: "center"
        
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
                    <Typography fontSize={"32px"}>
                        {currentPlayer} + " is currently drawing..."
                    </Typography>
                
                    <List style={flexContainer} sx={{justifyContent:"center"}}>
                        {/* List of current panels drawn goes here */}
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
                                        '&:hover': {
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                        },
                                    }}
                                ></Box>
                                <Box
                                    sx={{
                                        width: 150,
                                        height: 600,
                                        margin: 1,
                                        backgroundColor: 'primary.dark',
                                        '&:hover': {
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                        },
                                    }}
                                ></Box>
                            </List>
                        </Grid>
                        {/* Drawing / Writing Canvas */}
                        <Grid item xs="6" align="center">
                            <Box
                                sx={{
                                    width: 600,
                                    height: 600,
                                    backgroundColor: 'primary.dark',
                                    '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            ></Box>
                        </Grid>
                        {/* Right of Canvas */}
                        <Grid item xs="3" align="center">
                            <Box
                                sx={{
                                    width: 250,
                                    height: 50,
                                    margin: 1,
                                    backgroundColor: 'primary.dark',
                                    '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    width: 250,
                                    height: 50,
                                    margin: 1,
                                    backgroundColor: 'primary.dark',
                                    '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    width: 250,
                                    height: 50,
                                    margin: 1,
                                    backgroundColor: 'primary.dark',
                                    '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    width: 250,
                                    height: 50,
                                    margin: 1,
                                    backgroundColor: 'primary.dark',
                                    '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    width: 250,
                                    height: 50,
                                    margin: 1,
                                    backgroundColor: 'primary.dark',
                                    '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    width: 250,
                                    height: 50,
                                    margin: 1,
                                    backgroundColor: 'primary.dark',
                                    '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            ></Box>
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