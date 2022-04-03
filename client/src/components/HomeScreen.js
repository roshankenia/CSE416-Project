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
const HomeScreen = () => {
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

  //   function handleUpdateSearch(event) {
  //     setSearch(event.target.value);
  //   }
  //   function handleKeyPress(event) {
  //     if (event.code === "Enter") {
  //       let text = event.target.value;
  //       console.log(text);
  //       store.newSearch(text);
  //     }
  //   }

  //   function changeLists(event, view) {
  //     event.stopPropagation();
  //     store.updateView(view);
  //   }

  //   function handleSort(event, sort) {
  //     event.stopPropagation();
  //     store.sortLists(sort);
  //     handleMenuClose();
  //   }

  //   let yoursDisabled = false;
  //   if(store.isGuest){
  //     yoursDisabled = true;
  //   }
  const communities = [
    "J/Stickman",
    "J/Rage Comics",
    "J/Memes",
    "J/Spiderman",
    "J/Random",
  ];
  let communityCard = <List></List>;
  communityCard = (
    <List>
      {communities.map((name) => (
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
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  align="center"
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
      style={{ backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')" }}
    >
      <Grid item xs={8} align="center">
        {communityCard}
      </Grid>
      <Grid item xs={4} align="center">
        <Sidebar />
      </Grid>
    </Grid>
  );
};

export default HomeScreen;
