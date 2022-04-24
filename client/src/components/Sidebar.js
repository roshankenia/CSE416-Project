import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthContext from "../auth";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Sidebar() {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const [gameInviteOpen, setGameInviteOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleJoin = (event, reason) => {
    // Join game room logic here
  };

  const handleAddFriend = (event) => {
    event.preventDefault();
    console.log("handleAddFriend");
    const data = new FormData(event.currentTarget);
    auth.sendFriendRequest(auth.user.email, data.get("email"));
  };

  const handleLobbyJoin = (event) => {
    event.preventDefault();
    console.log("new lobby");
    const data = new FormData(event.currentTarget);
    let lobbyID = data.get("lobbyCode");
    console.log("lobby join from sidebar:", lobbyID);

    game.joinLobby(lobbyID);
  };

  const action = (
    <React.Fragment>
      {/* On click here will join the game lobby (button) */}
      <Button color="secondary" size="large" onClick={handleClose}>
        JOIN
      </Button>
      <IconButton
        size="large"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <List>
      <ListItem key="join">
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
          <Typography align="center" style={{ fontSize: "32px" }}>
            Add a friend c:
          </Typography>
          <Box component="form" onSubmit={handleAddFriend} noValidate>
            <Box
              m="auto"
              textAlign="center"
              style={{
                border: "3px solid",
                borderColor: "black",
                color: "black",
                backgroundColor: "white",
                fontSize: "32px",
                borderRadius: 40,
                outline: "none",
                width: "85%",
              }}
            >
              <TextField
                align="center"
                id="email"
                name="email"
                label="Enter email:"
                autoFocus
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: 20,
                    paddingLeft: 20,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: 30, paddingLeft: 20 },
                  shrink: true,
                }}
              />
            </Box>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="small"
                style={{
                  fontWeight: 600,
                  border: "3px solid",
                  borderColor: "black",
                  backgroundColor: "#46EC2B",
                  color: "black",
                  fontSize: "20px",
                  borderRadius: 20,
                }}
                sx={{ mt: 1, mb: 0.5, width: "25%" }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </ListItem>
      <ListItem key="join">
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
          <Typography align="center" style={{ fontSize: "32px" }}>
            Join A Lobby
          </Typography>
          <Box component="form" onSubmit={handleLobbyJoin} noValidate>
            <Box
              m="auto"
              textAlign="center"
              style={{
                border: "3px solid",
                borderColor: "black",
                color: "black",
                backgroundColor: "white",
                fontSize: "32px",
                borderRadius: 40,
                outline: "none",
                width: "85%",
              }}
            >
              <TextField
                align="center"
                id="lobbyCode"
                name="lobbyCode"
                label="Enter Lobby Code:"
                autoFocus
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: 20,
                    paddingLeft: 20,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: 30, paddingLeft: 20 },
                  shrink: true,
                }}
              />
            </Box>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="small"
                style={{
                  fontWeight: 600,
                  border: "3px solid",
                  borderColor: "black",
                  backgroundColor: "#46EC2B",
                  color: "black",
                  fontSize: "20px",
                  borderRadius: 20,
                }}
                sx={{ mt: 1, mb: 0.5, width: "25%" }}
              >
                Join
              </Button>
            </Box>
          </Box>
        </Box>
      </ListItem>
      <ListItem key="create">
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
          <Typography align="center" style={{ fontSize: "32px" }}>
            {" "}
            Create New Community
          </Typography>
          <Box
            m="auto"
            textAlign="center"
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "white",
              fontSize: "32px",
              borderRadius: 40,
              outline: "none",
              width: "85%",
            }}
          >
            <TextField
              align="center"
              id="communityName"
              label="Enter A Community Name:"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: 20,
                  paddingLeft: 20,
                  paddingBottom: 10,
                },
              }}
              InputLabelProps={{
                style: { fontSize: 24, paddingLeft: 20 },
                shrink: true,
              }}
            />
          </Box>
          <Box textAlign="center">
            <Button
              variant="contained"
              color="success"
              size="small"
              style={{
                fontWeight: 600,
                border: "3px solid",
                borderColor: "black",
                backgroundColor: "#46EC2B",
                color: "black",
                fontSize: "20px",
                borderRadius: 20,
              }}
              sx={{ mt: 1, mb: 0.5, width: "35%" }}
            >
              Create!
            </Button>
          </Box>
        </Box>
      </ListItem>
      <ListItem key="create">
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
          <Typography align="center" style={{ fontSize: "32px" }}>
            {" "}
            Your Game Invites
          </Typography>
          <Box textAlign="center">
            <Typography
              align="center"
              display="inline"
              style={{ fontSize: "28px" }}
            >
              {"u/Roshan"}
            </Typography>
            <Button
              variant="contained"
              color="success"
              size="small"
              style={{
                fontWeight: 600,
                border: "3px solid",
                borderColor: "black",
                backgroundColor: "#46EC2B",
                color: "black",
                fontSize: "20px",
                borderRadius: 20,
              }}
              sx={{ ml: 2, mb: 0.5, width: "25%" }}
            >
              Join
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              style={{
                fontWeight: 600,
                border: "3px solid",
                borderColor: "black",
                backgroundColor: "red",
                color: "black",
                fontSize: "20px",
                borderRadius: 20,
              }}
              sx={{ ml: 2, mb: 0.5, width: "25%" }}
            >
              Reject
            </Button>
          </Box>
        </Box>
      </ListItem>
      <div>
        <Button onClick={handleClick}>Sample Invite</Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="u/Roshan has invited you to the game"
          action={action}
        />
      </div>
    </List>
  );
}
