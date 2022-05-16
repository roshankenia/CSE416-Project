import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
//import MUIDeleteModal from "./MUIDeleteModal";
//import Statusbar from "./Statusbar";
import Typography from "@mui/material/Typography";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
import Sidebar from "./Sidebar.js";
import { GameContext } from "../game";
import { SocketContext } from "../socket";

/*
    User gets redirected here after login,
    use this name rather than communitiesScreen to avoid confuse other people
    
    @Terran
*/
const FriendsScreen = () => {
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

  const action1 = (
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
  const { innerWidth: width, innerHeight: height } = window;
  const { community } = useContext(GlobalCommunityContext);

  //   //Keeps track if a list is currently being edited
  //   const [editActive, setEditActive] = useState(false);

  //   //Keeps track of current search
  //   const [search, setSearch] = useState("");

  const { auth } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [notifyOpen, setNotifyOpen] = React.useState(false);

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

  //Keeps track of current search
  const [userSearch, setUserSearch] = useState("");

  function handleUpdateSearch(event) {}
  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let text = event.target.value;
      console.log(text);
      auth.search(text);
    }
  }

  function handleViewProfile(event, user) {
    event.stopPropagation();
    community.setUserProfile(user);
  }

  function addFriend(event, sentUser) {
    event.stopPropagation();
    let receivedUserEmail = auth.user.email;
    let sentUserEmail = sentUser.email;
    auth.addFriend(sentUserEmail, receivedUserEmail);
  }
  function removeFriend(event, externalUser) {
    event.stopPropagation();
    let currentEmail = auth.user.email;
    let externalUserEmail = externalUser.email;
    auth.removeFriend(currentEmail, externalUserEmail);
  }
  function sendFriendRequest(event, receivedUser) {
    event.stopPropagation();
    let receivedUserEmail = receivedUser.email;
    let sentUserEmail = auth.user.email;
    auth.sendFriendRequest(sentUserEmail, receivedUserEmail);
    setNotifyOpen(true);
  }

  const handleNotifyClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotifyOpen(false);
  };
  function removeFriendRequest(event, sentUser) {
    event.stopPropagation();
    let receivedUserEmail = auth.user.email;
    let sentUserEmail = sentUser.email;
    auth.removeFriendRequest(sentUserEmail, receivedUserEmail);
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleNotifyClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  let searchUserList = "";
  if (auth.searchUsers) {
    let searchUsers = Object.values(auth.searchUsers);
    let newSearchUsers = [];
    console.log("search users:", searchUsers);
    console.log("friends:", auth.friends);
    console.log("friend requests:", auth.friendRequests);
    //we must first remove friends, requests, and user themself from this list
    for (var i = 0; i < searchUsers.length; i++) {
      let add = true;
      for (var j = 0; j < auth.friendRequests.length; j++) {
        if (searchUsers[i].username == auth.friendRequests[j].username) {
          add = false;
        }
      }
      for (var j = 0; j < auth.friends.length; j++) {
        if (searchUsers[i].username == auth.friends[j].username) {
          add = false;
        }
      }
      if (auth.user.username == searchUsers[i].username) {
        add = false;
      }
      if (add) {
        newSearchUsers.push(searchUsers[i]);
      }
    }
    searchUserList = (
      <List>
        {newSearchUsers.map((user, index) => (
          <ListItem key={index}>
            <Box
              style={{
                border: "3px solid",
                borderColor: "black",
                color: "black",
                backgroundColor: "white",
                fontSize: "20px",
                outline: "none",
                borderRadius: 20,
                width: "100%",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography
                    display="inline"
                    style={{ fontSize: "32px" }}
                    sx={{ ml: 2 }}
                  >
                    {user.username}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={(event) => handleViewProfile(event, user.username)}
                    style={{
                      fontWeight: 600,
                      border: "3px solid",
                      borderColor: "black",
                      backgroundColor: "blue",
                      color: "white",
                      fontSize: "10px",
                      borderRadius: 20,
                    }}
                    sx={{ mt: 1 }}
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={(event) => sendFriendRequest(event, user)}
                    style={{
                      fontWeight: 600,
                      border: "3px solid",
                      borderColor: "black",
                      backgroundColor: "green",
                      color: "white",
                      fontSize: "10px",
                      borderRadius: 20,
                    }}
                    sx={{ ml: 2, mt: 1 }}
                  >
                    Add Friend
                  </Button>
                  <Snackbar
                    open={notifyOpen}
                    autoHideDuration={3000}
                    message="Friend Request Sent"
                    onClose={handleNotifyClose}
                    action={action}
                  />
                </Grid>
              </Grid>
            </Box>
          </ListItem>
        ))}
      </List>
    );
  }

  let requestList = (
    <List>
      {auth.friendRequests.map((request) => (
        <ListItem key={request}>
          <Box
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "white",
              fontSize: "20px",
              outline: "none",
              borderRadius: 20,
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <Typography
                  display="inline"
                  style={{ fontSize: "32px" }}
                  sx={{ ml: 2 }}
                >
                  {request.username}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={(event) => addFriend(event, request)}
                  style={{
                    fontWeight: 600,
                    border: "3px solid",
                    borderColor: "black",
                    backgroundColor: "green",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: 20,
                  }}
                  sx={{ mt: 1 }}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  onClick={(event) => removeFriendRequest(event, request)}
                  color="success"
                  size="small"
                  style={{
                    fontWeight: 600,
                    border: "3px solid",
                    borderColor: "black",
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: 20,
                  }}
                  sx={{ ml: 2, mt: 1 }}
                >
                  Deny
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
      ))}
    </List>
  );

  let friendsList = (
    <List>
      {auth.friends.map((friend) => (
        <ListItem key={friend}>
          <Box
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "white",
              fontSize: "20px",
              outline: "none",
              borderRadius: 20,
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Typography
                  display="inline"
                  style={{ fontSize: "32px" }}
                  sx={{ ml: 2 }}
                >
                  {friend.username}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={(event) => handleViewProfile(event, friend.username)}
                  style={{
                    fontWeight: 600,
                    border: "3px solid",
                    borderColor: "black",
                    backgroundColor: "blue",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: 20,
                  }}
                  sx={{ mt: 1 }}
                >
                  View Profile
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={(event) => removeFriend(event, friend)}
                  style={{
                    fontWeight: 600,
                    border: "3px solid",
                    borderColor: "black",
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: 20,
                  }}
                  sx={{ ml: 2, mt: 1 }}
                >
                  Remove Friend
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
      ))}
    </List>
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
      disabled={true}
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
        opacity: 0.5,
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
      <Grid container>
        <Grid item xs={6}>
          {communitiesButton}
          {discoveryButton}
          {friendsButton}
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={12} textAlign="center">
          <Typography style={{ fontSize: "48px" }}>{"Friends"}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            justifyContent="center"
            alignItems="center"
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "white",
              fontSize: "20px",
              outline: "none",
              borderRadius: 20,
              width: "90%",
            }}
          >
            <Typography align="center" style={{ fontSize: "32px" }}>
              {" "}
              Your Friends
            </Typography>
            {friendsList}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            justifyContent="center"
            alignItems="center"
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "white",
              fontSize: "20px",
              outline: "none",
              borderRadius: 20,
              width: "90%",
            }}
          >
            <Typography align="center" style={{ fontSize: "32px" }}>
              {" "}
              Friend Requests
            </Typography>
            {requestList}
          </Box>
        </Grid>
        <Grid item xs={8} textAlign="center" sx={{ mt: 2 }}>
          <Box
            justifyContent="center"
            alignItems="center"
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "white",
              fontSize: "20px",
              outline: "none",
              borderRadius: 20,
              width: "95%",
            }}
          >
            <Typography align="center" style={{ fontSize: "32px" }}>
              {" "}
              Search Users
            </Typography>

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
                marginLeft: 15,
              }}
              sx={{ mb: 2 }}
            >
              <Box style={{ width: "96%" }}>
                <TextField
                  fullWidth
                  variant="standard"
                  id="searchUser"
                  label="Search:"
                  name="searchUser"
                  onKeyPress={handleKeyPress}
                  onChange={handleUpdateSearch}
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
            {searchUserList}
          </Box>
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
        action={action1}
      />
    </Box>
  );
};

export default FriendsScreen;
