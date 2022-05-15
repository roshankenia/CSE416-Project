import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Snackbar from "@mui/material/Snackbar";
//import MUIDeleteModal from "./MUIDeleteModal";
//import Statusbar from "./Statusbar";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import { SocketContext } from "../socket";
import Sidebar from "./Sidebar.js";

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
  const socket = useContext(SocketContext);

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

  const [yourCommunities, setUCom] = useState(
    community.communityList.filter((x) =>
      x.communityMembers.includes(auth.user.username)
    )
  );
  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let text = event.target.value;
      console.log(text);
      setUCom(
        community.communityList.filter(
          (x) =>
            x.communityMembers.includes(auth.user.username) &&
            x.communityName.toLowerCase().startsWith(text.toLowerCase())
        )
      );
    }
  }
  let communityCard = <List></List>;
  communityCard = (
    <List>
      {yourCommunities.map((com, index) => (
        <ListItem key={index}>
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
                <Typography align="center" style={{ fontSize: "54px" }}>
                  {"J/" + com.communityName}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  align="center"
                  style={{ fontSize: "36px", color: "#000e6b" }}
                >
                  {com.communityMembers.length + " member(s)"}
                </Typography>
                <Typography
                  align="center"
                  style={{ fontSize: "36px", color: "#005449" }}
                >
                  {com.communityPosts.length + " Post(s)"}
                </Typography>
              </Grid>
            </Grid>
          </Button>
        </ListItem>
      ))}
    </List>
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
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8} align="center">
          {communityCard}
        </Grid>
        <div className="sticky">
          {/* <Sticky> */}
          <Sidebar />
          {/* </Sticky> */}
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
};

export default HomeScreen;
