import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import {
  Typography,
  Box,
  Grid,
  Button,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import Sidebar from "./Sidebar.js";
import { useHistory } from "react-router-dom";
//Table stuff
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AuthContext from "../auth";

export default function LobbyScreen() {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);

  const history = useHistory();

  const roomCode = "imadethiscodeup";

  const users = [auth.user.username, "Terran", "someone", "$_$", "another"];

  const [inlobby, setInLobby] = useState([
    { position: 1, username: users[0], host: true, ready: false },
    { position: 2, username: "u/Terran", host: false, ready: true },
    { position: 3, username: "xx", host: false, ready: true },
    { position: 4, username: "zz", host: false, ready: true },
  ]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleStartGame = (event) => {
    let ready = 1;
    for (let i = 0; i < inlobby.length; i++) {
      if (inlobby[i].ready == false) {
        ready = 0;
      }
    }
    if (ready) {
      game.createNewGame();
    }
  };

  //not implemented, should return a model
  const handleInvite = (event) => {
    console.log("nothing");
  };

  const handleLeave = (event) => {
    history.push("/");
  };

  let lobbyTable = (
    <TableBody>
      {inlobby.map((user) => (
        <TableRow key={user.username} sx={{}}>
          <TableCell align="left">{user.host && <StarIcon />}</TableCell>
          <TableCell align="left" style={{ fontSize: "48px" }}>
            {user.position}
          </TableCell>
          <TableCell align="left" style={{ fontSize: "48px" }}>
            {user.username}
          </TableCell>
          <TableCell align="left" style={{ fontSize: "48px" }}>
            {user.ready && (
              <Typography style={{ fontSize: "48px" }}>Ready!</Typography>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  const handleToggleReady = (event) => {
    let newlobby = inlobby;
    for (let i = 0; i < inlobby.length; i++) {
      console.log(inlobby[i].ready);
      if (inlobby[i].username == auth.user.username) {
        newlobby[i].ready = !inlobby[i].ready;
      }
    }
    setInLobby(newlobby);
    forceUpdate();
  };

  //does nothing
  const nothing = (event) => {
    console.log("nothing");
  };

  let userCard = (
    <List sx={{ width: "100%" }}>
      {users.map((name) => (
        <ListItem key={name}>
          <Box
            variant="contained"
            color="success"
            size="large"
            style={{
              fontWeight: 600,
              border: "3px solid",
              borderColor: "black",
              backgroundColor: "white",
              color: "black",
              fontSize: "48px",
              borderRadius: 20,
            }}
            sx={{ mt: 2, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography align="center" style={{ fontSize: "48px" }}>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  align="center"
                  onClick={(event) => handleInvite()}
                  style={{
                    fontWeight: 600,
                    border: "3px solid",
                    borderColor: "black",
                    backgroundColor: "green",
                    color: "black",
                    fontSize: "10px",
                    borderRadius: 20,
                  }}
                  sx={{ mr:2, mt: 1, width: "25%" }}
                >
                  invite
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
      ))}
    </List>
  );

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
      {/* This grid shows the room code and invitation stuff */}
      <Grid item xs={4} align="center">
        <List>
          <Box
            justifyContent="center"
            alignItems="center"
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "#E39090",
              fontSize: "20px",
              outline: "none",
              borderRadius: 20,
              width: "75%",
            }}
          >
            <ListItem key="room_code" align="center">
              <Typography align="center" style={{ fontSize: "32px" }}>
                Room Code
              </Typography>
            </ListItem>
            <ListItem key="_id" align="center">
              <Typography align="center" style={{ fontSize: "32px" }}>
                #{roomCode}
              </Typography>
            </ListItem>
            <ListItem key="invite">
              <Typography align="center" style={{ fontSize: "32px" }}>
                Invite
              </Typography>
            </ListItem>
            <ListItem key="create">{userCard}</ListItem>
          </Box>
        </List>
      </Grid>
      {/* This grid renders the right side of the webpage*/}
      <Grid item xs={6}>
        <List sx={{ justifyContent: "center" }}>
          <ListItem key="game_lobby" align="center">
            <Typography align="center" style={{ fontSize: "96px" }}>
              Game Lobby
            </Typography>
          </ListItem>
          {/* This is game mode and buttons */}
          <ListItem key="game_mode" align="center">
            <Typography align="center" style={{ fontSize: "32px" }}>
              Game Mode:
            </Typography>
            <Button style={{ fontSize: "32px" }}>Comic</Button>
            <Typography style={{ fontSize: "32px" }}>/</Typography>
            <Button style={{ fontSize: "32px" }}>Story</Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              align="center"
              onClick={(event) => handleInvite()}
              style={{
                fontWeight: 600,
                border: "3px solid",
                borderColor: "black",
                backgroundColor: "red",
                color: "black",
                fontSize: "30px",
                borderRadius: 20,
              }}
              sx={{ ml: 1, width: "10%", height: "40px" }}
            >
              solo
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              align="center"
              onClick={(event) => handleInvite()}
              style={{
                fontWeight: 600,
                border: "3px solid",
                borderColor: "black",
                backgroundColor: "red",
                color: "black",
                fontSize: "30px",
                borderRadius: 20,
              }}
              sx={{ ml: 1, width: "10%", height: "40px" }}
            >
              2
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              align="center"
              onClick={(event) => handleInvite()}
              style={{
                fontWeight: 600,
                border: "3px solid",
                borderColor: "black",
                backgroundColor: "red",
                color: "black",
                fontSize: "30px",
                borderRadius: 20,
              }}
              sx={{ ml: 1, width: "10%", height: "40px" }}
            >
              3
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              align="center"
              onClick={(event) => handleInvite()}
              style={{
                fontWeight: 600,
                border: "3px solid",
                borderColor: "black",
                backgroundColor: "red",
                color: "black",
                fontSize: "30px",
                borderRadius: 20,
              }}
              sx={{ ml: 1, width: "10%", height: "40px" }}
            >
              4
            </Button>
          </ListItem>
          <Box
            justifyContent="center"
            alignItems="center"
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "#E39090",
              fontSize: "20px",
              outline: "none",
              borderRadius: 20,
              width: "75%",
            }}
          >
            {/* This is the table */}
            <ListItem key="inlobby">
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left" style={{ fontSize: "48px" }}>
                        #
                      </TableCell>
                      <TableCell align="left" style={{ fontSize: "48px" }}>
                        Name
                      </TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                  {lobbyTable}
                </Table>
              </TableContainer>
            </ListItem>
            {/* This is another set of buttons */}
            <ListItem key="game_mode" align="center">
              <Button
                variant="contained"
                color="success"
                size="small"
                align="center"
                onClick={(event) => handleLeave()}
                style={{
                  fontWeight: 600,
                  border: "3px solid",
                  borderColor: "black",
                  backgroundColor: "red",
                  color: "black",
                  fontSize: "30px",
                  borderRadius: 20,
                }}
                sx={{ mt: 2, width: "30%", height: "40px" }}
              >
                Leave
              </Button>
              <Button
                variant="contained"
                color="success"
                size="small"
                align="center"
                onClick={(event) => handleToggleReady()}
                style={{
                  fontWeight: 600,
                  border: "3px solid",
                  borderColor: "black",
                  backgroundColor: "yellow",
                  color: "black",
                  fontSize: "30px",
                  borderRadius: 20,
                }}
                sx={{ ml: 3, mt: 2, width: "30%", height: "40px" }}
              >
                Ready Up
              </Button>
              <Button
                variant="contained"
                color="success"
                size="small"
                align="center"
                onClick={(event) => handleStartGame(event)}
                style={{
                  fontWeight: 600,
                  border: "3px solid",
                  borderColor: "black",
                  backgroundColor: "green",
                  color: "black",
                  fontSize: "30px",
                  borderRadius: 20,
                }}
                sx={{ ml: 3, mt: 2, width: "30%", height: "40px" }}
              >
                Start
              </Button>
            </ListItem>
          </Box>
        </List>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={8} align="center"></Grid>
    </Grid>
  );
}
