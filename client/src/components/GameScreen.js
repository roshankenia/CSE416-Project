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
        padding: 0,
      };

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
                {currentPlayer} + " is currently drawing..."
                <List style={flexContainer}>
                    <ListItem
                    primaryText="foo1"
                    secondaryText="bar1"/>
                    <ListItem
                    primaryText="foo2"
                    secondaryText="bar2"/>
                </List>
                <Box
                    sx={{
                        width: 300,
                        height: 300,
                        backgroundColor: 'primary.dark',
                        '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                />
            </Grid>
}