import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import CommunityCard from "./CommunityCard.js";
import Sidebar from "./Sidebar.js";
//import MUIDeleteModal from "./MUIDeleteModal";
//import Statusbar from "./Statusbar";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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

import Grid from "@mui/material/Grid";

import AuthContext from "../auth";

import Snackbar from "@mui/material/Snackbar";

/*
    User gets redirected here after login,
    use this name rather than communitiesScreen to avoid confuse other people
    
    @Terran
*/
const FriendsScreen = () => {
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

  function handleUpdateSearch(event) {
    setUserSearch(event.target.value);
  }
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
      <List textAlign="center">
        {newSearchUsers.map((user) => (
          <ListItem key={user}>
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
                    onClick={(event) => handleViewProfile(event, user)}
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
    <List textAlign="center">
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
    <List textAlign="center">
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
                  onClick={(event) => handleViewProfile(event, friend)}
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
        <div class="sticky">
          {/* <Sticky> */}
          <Sidebar />
          {/* </Sticky> */}
        </div>
      </Grid>
    </Box>
  );
};

export default FriendsScreen;
