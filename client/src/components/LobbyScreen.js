import {
  Box, Button, Grid, List,
  ListItem, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from "@mui/material";
import MuiInput from "@mui/material/Input";
import Slider from "@mui/material/Slider";
//slider
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../auth";
import { GameContext } from "../game";
import { SocketContext } from "../socket";

//put all the lobby settings stuff on the right side!!!
export default function LobbyScreen() {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  const history = useHistory();

  const users = [auth.user.username, "Terran", "someone", "$_$", "another"];
  // const friends = auth.user.fr

  //#region slider
  const Input = styled(MuiInput)`
    width: 42px;
  `;
  //value is turn time, might need to rename it
  const [value, setValue] = React.useState(20);

  const marks = [
    {
      value: 10,
      label: "30 sec",
    },
    {
      value: 20,
      label: "1 min",
    },
    {
      value: 40,
      label: "2 min",
    },
    {
      value: 60,
      label: "3 min",
    },
    {
      value: 80,
      label: "4 min",
    },
    {
      value: 100,
      label: "5 min",
    },
  ];

  const handleSetTimer = (event, newValue) => {
    setValue(newValue);
  };
  //#endregion slider

  //#region invite/action
  //not implemented, should return a model
  const handleInvite = (username) => {
    console.log("the name of the user is", username);
    socket.emit("send-invite", username, game.lobby);
  };
  const handleLeave = (event) => {
    game.leaveLobby();
  };
  const handleToggleReady = (event) => {
    game.readyUp();
  };

  const isHost = (username) => {
    if (username == game.host) {
      return username + " (Host)";
    } else {
      return username;
    }
  };

  const isReady = (username) => {
    if (game.readyPlayers.includes(username)) {
      return "Ready";
    } else {
      return "Not Ready";
    }
  };
  //#endregion invite/control

  //Note, time is the slider value times 3
  const handleStartGame = (event) => {
    console.log(game);
    game.setTimer(value);
    console.log("game timer(in seconds): " + game.timer);
    game.createNewGame();
  };
  const changeGamemode = (event, gamemode) => {
    event.stopPropagation();
    if (gamemode != game.gamemode) {
      game.changeGamemode(gamemode);
    }
  };

  let gamemodeButton = (
    <Box>
      <Typography style={{ fontSize: "32px" }}>
        {"Gamemode: " + game.gamemode.toUpperCase()}
      </Typography>
      <Button disabled={true} style={{ fontSize: "32px", opacity: 0.5 }}>
        Comic
      </Button>
      <Typography display="inline" style={{ fontSize: "32px" }}>
        /
      </Typography>
      <Button
        style={{ fontSize: "32px" }}
        onClick={(event) => changeGamemode(event, "story")}
      >
        Story
      </Button>
    </Box>
  );
  if (auth.user.username != game.host) {
    gamemodeButton = (
      <Box>
        <Typography style={{ fontSize: "32px" }}>
          {"Gamemode: " + game.gamemode.toUpperCase()}
        </Typography>
      </Box>
    );
  } else if (game.gamemode == "story") {
    gamemodeButton = (
      <Box>
        <Typography style={{ fontSize: "32px" }}>
          {"Gamemode: " + game.gamemode.toUpperCase()}
        </Typography>
        <Button
          style={{ fontSize: "32px" }}
          onClick={(event) => changeGamemode(event, "comic")}
        >
          Comic
        </Button>
        <Typography display="inline" style={{ fontSize: "32px" }}>
          /
        </Typography>
        <Button disabled={true} style={{ fontSize: "32px", opacity: 0.5 }}>
          Story
        </Button>
      </Box>
    );
  }
  //#region uncategorized render components
  let startButton = (
    <div
      style={{
        width: "100%",
        marginRight: "-100%",
        opacity:
          auth.user.username !== game.host ||
          game.readyPlayers.length !== game.players.length
            ? 0.3
            : 1,
      }}
    >
      <Button
        disabled={
          auth.user.username !== game.host ||
          game.readyPlayers.length !== game.players.length
        }
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
    </div>
  );

  let lobbyTable = (
    <TableBody>
      {game.players.map((username) => (
        <TableRow key={username} sx={{}}>
          {/* <TableCell align="left">{user.host && <StarIcon />}</TableCell>
          <TableCell align="left" style={{ fontSize: "48px" }}>
            {user.position}
          </TableCell> */}
          <TableCell align="left" style={{ fontSize: "48px" }}>
            {isHost(username)}
          </TableCell>
          <TableCell align="left" style={{ fontSize: "48px" }}>
            {isReady(username)}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  let userCard = (
    <List sx={{ width: "100%" }}>
      {auth.friends.map((name) => (
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
                  {name.username}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  align="center"
                  onClick={(event) => handleInvite(name.username)}
                  style={{
                    fontWeight: 600,
                    border: "3px solid",
                    borderColor: "black",
                    backgroundColor: "green",
                    color: "black",
                    fontSize: "10px",
                    borderRadius: 20,
                  }}
                  sx={{ mr: 2, mt: 1, width: "25%" }}
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

  function sendGameInvite(event, receivedUser) {
    // Add logic to send the game
  }
  //#endregion uncategorized render components

  //#region right side components
  const timeSlider = (
    <Box sx={{ width: 400 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography id="input-slider" gutterBottom>
            Timer
          </Typography>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 1}
            onChange={handleSetTimer}
            aria-labelledby="input-slider"
            // marks={marks}
            defaultValue={60}
            step={10}
            min={30}
            max={300}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
    </Box>
  );
  //#endregion right side

  // TODO Maybe implement later... Otherwise just dont receive any invites when in lobby
  // useEffect(() => {
  //   const invite = async (lobbyID) => {
  //     console.log("inside the invite with lobbyID",lobbyID)
  //     // game.joinLobby(lobbyID)
  //   };
  //   socket.on("receive-invite", invite);
  //   return () => {
  //     socket.off("receive-invite", invite);
  //   };
  // }, []);

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
      }}
      style={{
        backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
      }}
    >
      {/* This grid shows the room code and invitation stuff */}
      <Grid item xs={3} align="center">
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
                Room Code #{game.lobby}
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
      {/* This grid renders the middle side of the webpage*/}
      <Grid item xs={6}>
        <List sx={{ justifyContent: "center" }}>
          <ListItem key="game_lobby" align="center">
            <Typography align="center" style={{ fontSize: "96px" }}>
              Game Lobby
            </Typography>
          </ListItem>
          {/* This is game mode and buttons */}
          <ListItem key="game_mode" align="center">
            {gamemodeButton}
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
                      <TableCell align="left" style={{ fontSize: "48px" }}>
                        Username
                      </TableCell>
                      <TableCell align="left" style={{ fontSize: "48px" }}>
                        Ready?
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
              {startButton}
            </ListItem>
          </Box>
        </List>
      </Grid>
      {/* This grid renders the right side of the webpage(host only)*/}
      {auth.user.username == game.host && (
        <Grid item xs={3}>
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
              <ListItem align="center">
                <Typography sx={{ fontSize: 50 }}>Time: {value} sec</Typography>
              </ListItem>
              <ListItem align="center">{timeSlider}</ListItem>
            </Box>
          </List>
        </Grid>
      )}
      <Grid item xs={8} align="center"></Grid>
    </Grid>
  );
}
