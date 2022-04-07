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
    <Box style={{ backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography display="inline" style={{ fontSize: "48px" }}>
            {community.communityList}
          </Typography>
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
            sx={{ ml: 2, mb:2}}
          >
            Leave
          </Button>
        </Grid>
        <Grid item xs={8}>
          <PostFeed />
        </Grid>
        <Grid item xs={4} align="center">
          <Sidebar />
        </Grid>
      </Grid>
    </Box>
  );
}
