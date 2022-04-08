import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import PostCard from "./PostCard.js";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import FlagIcon from "@mui/icons-material/Flag";

import SortIcon from "@mui/icons-material/Sort";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Grid from "@mui/material/Grid";

export default function PostFeed() {
  const { community } = useContext(GlobalCommunityContext);

  const fakePost1 = {
    postTitle: "Mondays",
    likes: [
      "1",
      "2",
      "3",
      "1",
      "2",
      "3",
      "1",
      "2",
      "3",
      "1",
      "2",
      "3",
      "1",
      "2",
      "3",
      "1",
      "2",
      "3",
    ],
    dislikes: ["1", "2", "3"],
    comments: [
      {
        username: "RDK961",
        comment: "wow so cool",
        likes: ["1", "2", "3"],
        dislikes: ["1", "2", "3"],
        reply: [
          {
            username: "Roshan",
            reply: "ratio",
            likes: [
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
              "1",
              "2",
              "3",
            ],
            dislikes: ["1", "2", "3"],
          },
        ],
      },
      {
        username: "Roshan",
        comment: "so true",
        likes: ["1", "2", "3", "1", "2", "3", "1", "2", "3", "1", "2", "3"],
        dislikes: ["1", "2", "3"],
        reply: [],
      },
    ],

    dateAndTime: "04-06-2022",
  };

  const posts = [fakePost1, fakePost1, fakePost1];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function handleSort(event, sort) {
    event.stopPropagation();
    handleMenuClose();
  }

  const postFeed = (
    <List>
      {posts.map((post) => (
        <ListItem key={post}>
          <PostCard post={post} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Grid container alignItems="center">
      <Grid item xs={10} style={{paddingLeft:18}}>
        <Box
          style={{
            border: "3px solid",
            borderColor: "black",
            color: "black",
            backgroundColor: "white",
            fontSize: "32px",
            borderRadius: 20,
            outline: "none",
            width: "75%",
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
      <Grid item xs={2}>
        <Typography
          style={{
            fontSize: "20px",
          }}
          display="inline"
        >
          Sort by
        </Typography>
        <IconButton
          aria-label="sort"
          color="primary"
          size="small"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleMenuClick}
        >
          <SortIcon
            sx={{
              width: 40,
              height: 40,
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
              handleSort(event, "comments");
            }}
          >
            Comments
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
      <Grid item xs={12}>
        {postFeed}
      </Grid>
    </Grid>
  );
}
