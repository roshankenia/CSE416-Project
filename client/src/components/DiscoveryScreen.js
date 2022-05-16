import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
import PostFeed from "./PostFeed.js";
import Sidebar from "./Sidebar.js";
import { SocketContext } from "../socket";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../game";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

export default function DiscoveryScreen() {
  const { community } = useContext(GlobalCommunityContext);
  const { auth } = useContext(AuthContext);
  const { game } = useContext(GameContext);

  const socket = useContext(SocketContext);
  const [loaded, setLoaded] = useState(false);
  const [gameLobbyID, setLobbyID] = React.useState(false);
  const [inviteName, setInviteName] = React.useState(false);
  const [openInvite, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleJoin = (event) => {
    event.preventDefault();
    console.log("new lobby");
    console.log("lobby join from invite:", gameLobbyID);
    game.joinLobby(gameLobbyID);
  };
  
  const setScreen = (event, screen) => {
    event.preventDefault();
    community.setScreen(screen);
  };

  const action = (
    <React.Fragment>
      {/* On click here will join the game lobby (button) */}
      <Button color="secondary" size="large" onClick={handleJoin}>
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
  const communitiesButton = (
    <Button
      onClick={(event) => setScreen(event, "communities")}
      variant="contained"
      color="success"
      size="small"
      align="center"
      style={{
        fontWeight: 600,
        border: "3px solid",
        borderColor: "black",
        backgroundColor: "orange",
        color: "black",
        fontSize: "10px",
        borderRadius: 20,
      }}
      sx={{ mt: 2, width: "25%" }}
    >
      Communities
    </Button>
  );

  const discoveryButton = (
    <Button
      onClick={(event) => setScreen(event, "discovery")}
      disabled={true}
      variant="contained"
      color="success"
      size="small"
      align="center"
      style={{
        fontWeight: 600,
        border: "3px solid",
        borderColor: "black",
        backgroundColor: "aqua",
        color: "black",
        fontSize: "10px",
        borderRadius: 20,
        opacity: 0.5,
      }}
      sx={{ mt: 2, width: "25%" }}
    >
      Discovery
    </Button>
  );

  const friendsButton = (
    <Button
      onClick={(event) => setScreen(event, "friends")}
      variant="contained"
      color="success"
      size="small"
      align="center"
      style={{
        fontWeight: 600,
        border: "3px solid",
        borderColor: "black",
        backgroundColor: "purple",
        color: "white",
        fontSize: "10px",
        borderRadius: 20,
      }}
      sx={{ mt: 2, width: "25%" }}
    >
      Friends
    </Button>
  );
  useEffect(() => {
    const invite = async (lobbyID, socketid, hostName) => {
      setLobbyID(lobbyID);
      setInviteName(hostName);
      console.log("inside the invite with lobbyID", lobbyID);
      console.log("socketID is", socketid);
      handleClick();

      // game.joinLobby(lobbyID)
    };
    socket.on("receive-invite", invite);

    if (!loaded) {
      community.getCommunities();
      setLoaded(true);
    }

    const lobbyConfirmed = async (username, lobbyID, confirmed) => {
      console.log("listener:", username, lobbyID, confirmed);
      console.log(auth.user);
      if (username == auth.user.username) {
        console.log("checking confirmed");
        if (confirmed) {
          game.confirmJoinLobby(lobbyID);
        }
       else {
        community.lobbyUnavailable();
      }
    }
    };

    socket.on("lobby-confirmed", lobbyConfirmed);

    return () => {
      socket.off("receive-invite", invite);
      socket.off("lobby-confirmed", lobbyConfirmed);

    };
  }, [auth]);
  return (
    <Box
      style={{
        backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {communitiesButton}
          {discoveryButton}
          {friendsButton}
        </Grid>
        {/* <Grid item xs={6}></Grid> */}

        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <PostFeed />
        </Grid>

        <div className="sticky">
          <Sidebar />
        </div>
      </Grid>
      <Snackbar
        open={openInvite}
        autoHideDuration={6000}
        onClose={handleClose}
        message={inviteName + " has invited you to the game"}
        action={action}
      />
    </Box>
  );
}
