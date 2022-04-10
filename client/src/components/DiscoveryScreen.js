import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";

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

import Sidebar from "./Sidebar.js";
import AuthContext from "../auth";
import PostFeed from "./PostFeed.js";
import Sticky from "react-stickynode";

export default function DiscoveryScreen() {
  const { community } = useContext(GlobalCommunityContext);
  const { auth } = useContext(AuthContext);

  const setScreen = (event, screen) => {
    event.preventDefault();
    community.setScreen(screen);
  };
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
      disabled="true"
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

  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {communitiesButton}
          {discoveryButton}
        </Grid>
        {/* <Grid item xs={6}></Grid> */}

        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <Typography style={{ fontSize: "32px" }}>
            {community.communityList}
          </Typography>
          <PostFeed />
        </Grid>

        <div class="sticky">
          <Sidebar />
        </div>
      </Grid>
    </Box>
  );
}
