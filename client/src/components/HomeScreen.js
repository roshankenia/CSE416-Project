import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";
import Statusbar from "./Statusbar";

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

import Grid from "@mui/material/Grid";

import AuthContext from "../auth";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const { store } = useContext(GlobalStoreContext);

  //Keeps track if a list is currently being edited
  const [editActive, setEditActive] = useState(false);

  //Keeps track of current search
  const [search, setSearch] = useState("");

  const { auth } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function handleUpdateSearch(event) {
    setSearch(event.target.value);
  }
  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let text = event.target.value;
      console.log(text);
      store.newSearch(text);
    }
  }

  function changeLists(event, view) {
    event.stopPropagation();
    store.updateView(view);
  }

  function handleSort(event, sort) {
    event.stopPropagation();
    store.sortLists(sort);
    handleMenuClose();
  }

  let yoursDisabled = false;
  if(store.isGuest){
    yoursDisabled = true;
  }

  let listCard = <List></List>;
  if (store.currentLists) {
    listCard = (
      <List
        sx={{
          width: "100%",
          background: 'linear-gradient(#f8f8fe, #9595f6)',
          position: "relative",
          overflow: "auto",
          maxHeight: Math.round(height / 1.75),
        }}
      >
        {store.currentLists.map((list) => (
          <ListCard key={list._id} top5List={list} />
        ))}
      </List>
    );
  }
  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <IconButton
              aria-label="yours"
              color="primary"
              disabled = {yoursDisabled}
              onClick={(event) => {
                changeLists(event, "yours");
              }}
            >
              <HomeIcon
                sx={{
                  width: 60,
                  height: 60,
                }}
              />
            </IconButton>
            <IconButton
              aria-label="all lists"
              color="primary"
              size="large"
              onClick={(event) => {
                changeLists(event, "all");
              }}
            >
              <PeopleIcon
                sx={{
                  width: 60,
                  height: 60,
                }}
              />
            </IconButton>
            <IconButton
              aria-label="user lists"
              color="primary"
              size="large"
              onClick={(event) => {
                changeLists(event, "users");
              }}
            >
              <PersonIcon
                sx={{
                  width: 60,
                  height: 60,
                }}
              />
            </IconButton>
            <IconButton
              aria-label="community lists"
              color="primary"
              size="large"
              onClick={(event) => {
                changeLists(event, "community");
              }}
            >
              <FunctionsIcon
                sx={{
                  width: 60,
                  height: 60,
                }}
              />
            </IconButton>
            <TextField
              label="Search"
              sx={{ width: "50%" }}
              margin="normal"
              id={"search"}
              name="search"
              onKeyPress={handleKeyPress}
              onChange={handleUpdateSearch}
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
            />
          </Grid>
          <Grid item xs={2} align="right">
            <Typography display="inline" variant="h4">
              Sort by
            </Typography>
            <IconButton
              aria-label="sort"
              color="primary"
              size="large"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuClick}
            >
              <SortIcon
                sx={{
                  width: 60,
                  height: 60,
                }}
              />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={(event) => {
                  handleSort(event, "newest date");
                }}
              >
                Publish Date (Newest){" "}
              </MenuItem>
              <MenuItem
                onClick={(event) => {
                  handleSort(event, "oldest date");
                }}
              >
                Publish Date (Oldest)
              </MenuItem>
              <MenuItem
                onClick={(event) => {
                  handleSort(event, "views");
                }}
              >
                Views
              </MenuItem>
              <MenuItem
                onClick={(event) => {
                  handleSort(event, "likes");
                }}
              >
                Likes
              </MenuItem>
              <MenuItem
                onClick={(event) => {
                  handleSort(event, "dislikes");
                }}
              >
                Dislikes
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {listCard}
        <MUIDeleteModal />
      </Box>
      <Statusbar />
    </Box>
  );
};

export default HomeScreen;
