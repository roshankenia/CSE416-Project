import { Grid, Typography, List, Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";

export default function VoteToPublishScreen(){
    const players = [
        "u/foreverlife1143",
        "u/Terran",
        "u/RDK",
        "u/jeffhu"
    ]

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        align: "center",
        alignItems: "center",
        justifyContent: "center"
    };

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
                <Grid item xs="12" align="center">
                <Typography fontSize={"64px"}>
                    Vote to Publish?
                </Typography>
                    <List style={flexContainer}> 
                        <Grid>
                            <Typography>
                                {players[0]}:
                            </Typography>
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
                                <Typography fontSize={"10px"}>
                                    Fiona lived in her parents’ house, 
                                    in the town where she and Grant went to university. 
                                    It was a big, bay-windowed house that seemed to Grant 
                                    both luxurious and disorderly, with rugs crooked on the floors 
                                    and cup rings bitten into the table varnish.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid>
                            <Typography>
                                {players[1]}:
                            </Typography>
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
                                <Typography fontSize={"10px"}>
                                    Her mother was Icelandic—a powerful woman with a froth of white hair 
                                    and indignant far-left politics. The father was an important cardiologist, 
                                    revered around the hospital but happily subservient at home, where he would 
                                    listen to his wife’s strange tirades with an absentminded smile.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid>
                            <Typography>
                                {players[2]}:
                            </Typography>
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
                                <Typography fontSize={"10px"}>
                                    Fiona had her own little car and a pile of cashmere sweaters, but she wasn’t 
                                    in a sorority, and her mother’s political activity was probably the reason. 
                                    Not that she cared. Sororities were a joke to her, and so was politics—though 
                                    she liked to play “The Four Insurgent Generals” on the phonograph, and 
                                    sometimes also the “Internationale,” very loud.
                                </Typography>
                            </Box>
                        </Grid>
                    </List>
                    <List style={flexContainer}>
                        <Typography fontSize={"36px"}>
                            To Community?
                        </Typography>
                        <Button
                            // onClick={}
                            sx={{
                                width: 100,
                                height: 50,
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
                            <Typography>
                                Yes
                            </Typography>
                        </Button>
                        <Button
                            // onClick={}
                            sx={{
                                width: 100,
                                height: 50,
                                margin: 1,
                                backgroundColor: 'red',
                                '&:hover': {
                                backgroundColor: 'red',
                                opacity: [0.9, 0.8, 0.7],
                                },
                                borderRadius: 5,
                                border: 3,
                                color: "black"
                            }}
                        >
                            <Typography>
                                No
                            </Typography>
                        </Button>
                    </List>
                    <List style={flexContainer}>
                        <Typography fontSize={"36px"}>
                            To Discovery?
                        </Typography>
                        <Button
                            // onClick={}
                            sx={{
                                width: 100,
                                height: 50,
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
                            <Typography>
                                Yes
                            </Typography>
                        </Button>
                        <Button
                            // onClick={}
                            sx={{
                                width: 100,
                                height: 50,
                                margin: 1,
                                backgroundColor: 'red',
                                '&:hover': {
                                backgroundColor: 'red',
                                opacity: [0.9, 0.8, 0.7],
                                },
                                borderRadius: 5,
                                border: 3,
                                color: "black"
                            }}
                        >
                            <Typography>
                                No
                            </Typography>
                        </Button>
                    </List>
                </Grid>
                <Button
                    // onClick={}
                    sx={{
                        width: 300,
                        height: 50,
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
                    <Typography>
                        Submit
                    </Typography>
                </Button>
                        
            </Grid>
}