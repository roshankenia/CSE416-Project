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
import PostFeed from "./PostFeed.js";

export default function CommunityScreen() {
  const { community } = useContext(GlobalCommunityContext);
  return (
    <Grid
      container
      justifyContent="center"
      style={{ backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')" }}
    >
      <Grid item xs={8}>
        <Typography style={{ fontSize: "32px" }}>{community.communityList}</Typography>
        <PostFeed />
      </Grid>
      <Grid item xs={4} align="center">
        <Sidebar />
      </Grid>
    </Grid>
  );
}
