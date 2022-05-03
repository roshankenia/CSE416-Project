import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import CommunityCard from "./CommunityCard.js";
import Sidebar from "./Sidebar.js";
//import MUIDeleteModal from "./MUIDeleteModal";
//import Statusbar from "./Statusbar";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import FunctionsIcon from "@mui/icons-material/Functions";
import TextField from "@mui/material/TextField";
import SortIcon from "@mui/icons-material/Sort";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

import Grid from "@mui/material/Grid";

import AuthContext from "../auth";
import { SocketContext } from "../socket";
import { GameContext } from "../game";

/*
    User gets redirected here after login,
    use this name rather than communitiesScreen to avoid confuse other people
    
    @Terran
*/
const HomeScreen = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const { community } = useContext(GlobalCommunityContext);

  //   //Keeps track if a list is currently being edited
  //   const [editActive, setEditActive] = useState(false);

  //   //Keeps track of current search
  //   const [search, setSearch] = useState("");

  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  const socket  = useContext(SocketContext);

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
  const [gameLobbyID, setLobbyID] = React.useState(false);

  const handleJoin = (event) => {
    event.preventDefault();
    console.log("new lobby");
    console.log("lobby join from invite:", gameLobbyID);

    game.joinLobby(gameLobbyID);
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpenCommunity = (event, name) => {
    event.preventDefault();
    community.setCommunity(name);
  };
  const setScreen = (event, screen) => {
    event.preventDefault();
    community.setScreen(screen);
  };
  const handleLeaveCommunity = (event) => {
    event.stopPropagation();
  };

  const communitiesButton = (
    <Button
      onClick={(event) => setScreen(event, "communities")}
      disabled={true}
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
        opacity: 0.5,
      }}
      sx={{ mt: 2, width: "25%" }}
    >
      Communities
    </Button>
  );

  const discoveryButton = (
    <Button
      onClick={(event) => setScreen(event, "discovery")}
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
  let communityCard = <List></List>;
  communityCard = (
    <List>
      {community.communityList.map((com) => (
        <ListItem key={com}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={(event) => handleOpenCommunity(event, com)}
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
            <Grid container>
              <Grid item xs={8}>
                <Typography align="center" style={{ fontSize: "48px" }}>
                  {"J/" + com.communityName}
                </Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  align="center"
                  onClick={handleLeaveCommunity}
                  style={{
                    fontWeight: 600,
                    border: "3px solid",
                    borderColor: "black",
                    backgroundColor: "red",
                    color: "black",
                    fontSize: "10px",
                    borderRadius: 20,
                  }}
                  sx={{ mt: 2, width: "25%" }}
                >
                  Leave
                </Button>
              </Grid>
            </Grid>
          </Button>
        </ListItem>
      ))}
    </List>
  );

  useEffect(() => {
    const invite = async (lobbyID) => {
      setLobbyID(lobbyID)
      console.log("inside the invite with lobbyID",lobbyID)
      handleClick()
      // game.joinLobby(lobbyID)
    };
    socket.on("receive-invite", invite);
    return () => {
      socket.off("receive-invite", invite);
    };
  }, []);
  return (
    <Box
      style={{
        backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          {communitiesButton}
          {discoveryButton}
          {friendsButton}
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <Typography display="inline" style={{ fontSize: "48px" }}>
            {"Your Communities"}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          {" "}
          <Box
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "white",
              fontSize: "32px",
              borderRadius: 20,
              outline: "none",
              width: "96%",
              marginTop: 2,
            }}
          >
            <Box style={{ width: "96%" }}>
              <TextField
                fullWidth
                variant="standard"
                id="search"
                label="Search:"
                name="search"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: 20,
                    paddingLeft: 20,
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: 24, paddingLeft: 20 },
                  shrink: true,
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8} align="center">
          {communityCard}
        </Grid>
        <div class="sticky">
          {/* <Sticky> */}
          <Sidebar />
          {/* </Sticky> */}
        </div>
      </Grid>
      <Snackbar
          open={openInvite}
          autoHideDuration={6000}
          onClose={handleClose}
          message="u/Roshan has invited you to the game"
          action={action}
        />
    </Box>
  );
};

export default HomeScreen;
