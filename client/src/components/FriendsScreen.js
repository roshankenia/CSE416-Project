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

import Grid from "@mui/material/Grid";

import AuthContext from "../auth";

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
  console.log("FRIENDS:", auth.friends);

  let searchUserList = "";
  if (auth.searchUsers) {
    let searchUsers = Object.values(auth.searchUsers);
    searchUserList = (
      <List textAlign="center">
        {searchUsers.map((user) => (
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
              <Grid item xs={8}>
                <Typography
                  display="inline"
                  style={{ fontSize: "32px" }}
                  sx={{ ml: 2 }}
                >
                  {friend.username}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
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
        width: "100vw",
        height: "100vh",
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
