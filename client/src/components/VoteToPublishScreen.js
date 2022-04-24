import { Grid, Typography, List, Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';

export default function VoteToPublishScreen(){
    const { game } = useContext(GameContext);
    const { community } = useContext(GlobalCommunityContext);

    const style = {
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
        width: 400,
        // bgcolor: "background.paper",
        // border: "2px solid #000",
        // boxShadow: 24,
        textAlign: "left",
        p: 4,
      };

    let comic = null;

    let now = new Date();
    let date = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    let dateTime = date+' '+time;

    const [value, setValue] = React.useState('scrap');

    const handleChangeVote = (event) => {
        console.log(event.target.value)
        // changeSubmit(event.target.value);
        setValue(event.target.value);
    };

    // function changeSubmit(voteVal) {
    //     let submitButton = document.getElementById("vote-submit-button");
    //     if (voteVal == "comm"){
    //         submitButton.onClick = "handleWrapPostComm";
    //         console.log(submitButton)
    //         console.log(submitButton.onClick)
    //     } else if (voteVal == "commdis"){
    //         submitButton.onClick = "handleWrapPostCommDis";
    //         console.log(submitButton)
    //         console.log(submitButton.onClick)
    //     } else {
    //         submitButton.onClick = "handleExitVoting";
    //         console.log(submitButton)
    //         console.log(submitButton.onClick)
    //     }
    // }

    const [title, setTitle] = useState('Untitled')

    function handleChangeTitle(event) {
        console.log(event.target.value)
        setTitle(event.target.value)
    }

    function handleExitVoting() {
        game.exitVoting();
    }

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

    //hardcoded for now but should take the array of panels after game ends
    let panelString = ["panel1", "panel2", "panel3", "panel4"]
    // let panelImages = (
    //     <ImageList sx={{ width: "95%" }} cols={3}>
    //       {panelString.map((picture) => (
    //         <ImageListItem key={picture}>
    //           <img src={picture} loading="lazy" />
    //         </ImageListItem>
    //       ))}
    //     </ImageList>
    //   );


    function submitAction(event, voteVal){
        event.stopPropagation();
        if (voteVal == "scrap"){
            handleExitVoting()
        } else if (voteVal == "comm"){
            console.log("POSTED TO COMMUNITY SUCCESS")
        } else if (voteVal == "commdis"){
            console.log("POSTED TO COMM AND DISCOVERY SUCCESS")
        } else {
            console.log("Improper voting value")
        }
    }
    // async function handleWrapComic(event) {
    //     const response = await community.createComic({
    //         authors: players, 
    //         panels: panelString,
    //     })
    //     console.log(response)
    //     comic = response;
    // }

    // function handleWrapPostComm(event) {
    //     event.stopPropagation()
    //     console.log("POSTED TO COMMUNITY")
    //     const response = await community.createPost({
    //         postTitle: title, 
    //         postComic: comic, 
    //         likes: 0, 
    //         dislikes: 0,
    //         communityPublished: true,
    //         discoveryPublished: false,
    //         dateAndTime: dateTime,
    //         communityName: game.communityName,
    //     })
    // }

    // function handleWrapPostCommDis(event) {
    //     event.stopPropagation()
    //     console.log("POSTED TO COMMUNITY AND DISCOVERY")
    //     // const response = await community.createPost({
    //     //     postTitle: title, 
    //     //     postComic: comic, 
    //     //     likes: 0, 
    //     //     dislikes: 0,
    //     //     communityPublished: true,
    //     //     discoveryPublished: true,
    //     //     dateAndTime: dateTime,
    //     //     communityName: game.communityName,
    //     // })
    // }

    

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
                    {/* <List style={flexContainer}>
                        <Typography fontSize={"36px"}>
                            Scrap Project?
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
                            Post To Community?
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
                            Post To Community and Discovery?
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
                    </List> */}
                    <Box sx={style}>
                        <Typography 
                            sx={{fontSize: 28, marginBottom:'-10px'}}>
                            Post Title:
                        </Typography>
                        <FormControl fullWidth sx={{ }} variant="standard" >
                            <Input
                                id="standard-adornment-biography"
                                onChange={handleChangeTitle}
                            />
                        </FormControl>
                    </Box>
                    
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Voting Options</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChangeVote}
                        >
                            <FormControlLabel value="scrap" control={<Radio />} label="Scrap Project" />
                            <FormControlLabel value="comm" control={<Radio />} label="Post to Community" />
                            <FormControlLabel value="commdis" control={<Radio />} label="Post to Community and Discovery" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Button
                    id = "vote-submit-button"
                    onClick={(event) => submitAction(event, value)}
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