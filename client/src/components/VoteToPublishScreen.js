import { Grid, Typography, List, Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import AuthContext from "../auth";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import ReactQuill from "react-quill";

export default function VoteToPublishScreen() {
  const { game } = useContext(GameContext);
  const { community } = useContext(GlobalCommunityContext);
  const { auth } = useContext(AuthContext);

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
  let date =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  let dateTime = date + " " + time;

  const [value, setValue] = React.useState("scrap");

  const handleChangeVote = (event) => {
    console.log(event.target.value);
    // changeSubmit(event.target.value);
    setValue(event.target.value);
  };

  const [title, setTitle] = useState("Untitled");

  function handleChangeTitle(event) {
    console.log(event.target.value);
    setTitle(event.target.value);
  }

  function handleExitVoting() {
    game.exitVoting();
  }

  const players = ["u/foreverlife1143", "u/Terran", "u/RDK", "u/jeffhu"];

  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    align: "center",
    alignItems: "center",
    justifyContent: "center",
  };

  //hardcoded for now but should take the array of panels after game ends
  let gamePanels = "";
  if (game.gamemode == "comic") {
    gamePanels = (
      <Box sx={{ width: "90%", height: "90%" }}>
        <ImageList sx={{ width: "95%" }} cols={6}>
          {game.panels.map((picture) => (
            <ImageListItem key={picture}>
              <img src={picture} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    );
  } else if (game.gamemode == "story") {
    gamePanels = (
      <Grid container spacing={2}>
        {game.panels.map((text) => (
          <Grid
            item
            key={text}
            xs={2}
            sx={{
              backgroundColor: "white",
              border: 3,
            }}
            style={{ height: 200 }}
          >
            <ReactQuill
              style={{ maxHeight: "100%", overflow: "auto" }}
              readOnly={true}
              theme="bubble"
              value={text}
            ></ReactQuill>
          </Grid>
        ))}
      </Grid>
    );
  }

  function makePostingDecision() {
    const arr = game.votes;
    console.log("votes:", arr);
    const max = Math.max(arr[0], arr[1], arr[2]);
    console.log("max value: ", max);
    const decisionVal = arr.indexOf(max);
    console.log("index of max:", decisionVal);
    if (decisionVal == 0) {
      console.log("Voting Decision: Scrap");
    } else if (decisionVal == 1) {
      console.log("Voting Decision: Community");
      community.makePost("comm", title, dateTime, game);
    } else if (decisionVal == 2) {
      console.log("Voting Decision: Community and Discovery");
      community.makePost("commdis", title, dateTime, game);
    } else {
      console.log("error: improper decision value");
      console.log("post was not posted");
    }
  }

  function submitAction(event, voteVal) {
    event.stopPropagation();
    console.log("sending vote to state");
    game.updateVotes(voteVal, auth.user.username);
    if (game.votes[0] + game.votes[1] + game.votes[2] == game.players.length) {
      console.log("all votes have been made");
      makePostingDecision();
    }
    handleExitVoting();
  }
  if ((auth.user.username == game.host)) {
    return (
      <Grid
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
          <Typography fontSize={"64px"}>Vote to Publish?</Typography>
          {gamePanels}
          <Box sx={style}>
            <Typography sx={{ fontSize: 28, marginBottom: "-10px" }}>
              Post Title:
            </Typography>
            <FormControl fullWidth sx={{}} variant="standard">
              <Input
                id="standard-adornment-biography"
                onChange={handleChangeTitle}
              />
            </FormControl>
          </Box>

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Voting Options
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChangeVote}
            >
              <FormControlLabel
                value="scrap"
                control={<Radio />}
                label="Scrap Project"
              />
              <FormControlLabel
                value="comm"
                control={<Radio />}
                label="Post to Community"
              />
              <FormControlLabel
                value="commdis"
                control={<Radio />}
                label="Post to Community and Discovery"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Button
          id="vote-submit-button"
          onClick={(event) => submitAction(event, value)}
          sx={{
            width: 300,
            height: 50,
            margin: 1,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography>Submit</Typography>
        </Button>
      </Grid>
    );
  } else {
    return (
      <Grid
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
          <Typography fontSize={"64px"}>Vote to Publish?</Typography>
          {gamePanels}
          {/* <Box sx={style}>
            <Typography sx={{ fontSize: 28, marginBottom: "-10px" }}>
              Post Title:
            </Typography>
            <FormControl fullWidth sx={{}} variant="standard">
              <Input
                id="standard-adornment-biography"
                onChange={handleChangeTitle}
              />
            </FormControl>
          </Box> */}

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Voting Options
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChangeVote}
            >
              <FormControlLabel
                value="scrap"
                control={<Radio />}
                label="Scrap Project"
              />
              <FormControlLabel
                value="comm"
                control={<Radio />}
                label="Post to Community"
              />
              <FormControlLabel
                value="commdis"
                control={<Radio />}
                label="Post to Community and Discovery"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Button
          id="vote-submit-button"
          onClick={(event) => submitAction(event, value)}
          sx={{
            width: 300,
            height: 50,
            margin: 1,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: 5,
            border: 3,
            color: "black",
          }}
        >
          <Typography>Submit</Typography>
        </Button>
      </Grid>
    );
  }
}
