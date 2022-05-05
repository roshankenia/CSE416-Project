import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import AuthContext from "../auth";
import CommentCard from "./CommentCard.js";
import StoryPopout from "./StoryPopout.js";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import SortIcon from "@mui/icons-material/Sort";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Grid from "@mui/material/Grid";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function PostCard(props) {
  const { community } = useContext(GlobalCommunityContext);
  const { auth } = useContext(AuthContext);
  const { post, index } = props;

  //Keeps track if post is expanded or not
  const [expanded, setExpanded] = useState(false);

  function handleExpand(event) {
    event.stopPropagation();
    let ex = !expanded;
    setExpanded(ex);
    // if (ex) {
    //   store.updateViews(top5List);
    // }
  }

  function handleDelete(event) {
    event.stopPropagation();
    community.setDeletePost(true, post);
  }

  function handleLike(event) {
    event.stopPropagation();
    community.updatePost("like", post, auth.user._id);
  }

  function handleDislike(event) {
    event.stopPropagation();
    community.updatePost("dislike", post, auth.user._id);
  }
  let postData = "";

  if (post.postComic) {
    postData = (
      <ImageList sx={{ width: "95%" }} cols={3}>
        {post.data.panels.map((picture) => (
          <ImageListItem key={picture}>
            <img src={picture} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    );
  } else if (post.postStory) {
    postData = <StoryPopout post={post} />;
  }

  // if (index % 2 == 1) {
  //   postData = (
  //     <Typography
  //       style={{
  //         fontSize: "22px",
  //       }}
  //     >
  //       There are still rusted bayonets to be found in the dirt. Alongside
  //       broken firearms, canteens, and bullet-struck helmets. At times, still
  //       attached to skeletons. The deep-sea team would occasionally find a
  //       corroded tank or the remains of a submarine acting as an aquarium.
  //       Fighter planes would turn up far off in the mountains, a surprise to
  //       climbers. Rare was it that Hisao found letters buried in Saipan.
  //     </Typography>
  //   );
  // }
  function handleViewProfile(event, username) {
    console.log("in view profile");
    event.stopPropagation();
    community.setUserProfile(username);
  }

  function openCommunity(event, communityName) {
    event.stopPropagation();
    community.getCommunityFromPost(communityName);
  }

  let comms = ["J/Rage Comics", "J/Memes", "J/Random"];

  let communityName = (
    <Button
      style={{
        fontSize: "22px",
        paddingLeft: 10,
        paddingBottom: 10,
      }}
      onClick={(event) => openCommunity(event, post.communityName)}
    >
      {post.communityName}
    </Button>
  );

  let profileOptions = "";

  if (community.screen == "profile") {
    profileOptions = (
      <IconButton color="primary" onClick={handleDelete}>
        <DeleteIcon
          sx={{
            width: 40,
            height: 40,
          }}
        />
      </IconButton>
    );
  }

  const comments = post.comments;
  const commentFeed = (
    <List>
      {comments.map((comment, index) => (
        <ListItem key={index}>
          <CommentCard comment={comment} />
        </ListItem>
      ))}
    </List>
  );
  if (expanded) {
    return (
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
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={3}>
            {communityName}
          </Grid>
          <Grid item xs={3}>
            <Typography
              style={{
                fontSize: "22px",
              }}
            >
              {post.dateAndTime.substring(0, 10)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              style={{
                fontWeight: 600,
                fontSize: "24px",
              }}
            >
              {post.postTitle}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <IconButton color="primary">
              <FlagIcon />
              <Typography>{"Report"}</Typography>
            </IconButton>
          </Grid>
          <Grid item xs={2} align="center">
            <IconButton color="primary" onClick={handleLike}>
              <ThumbUpIcon
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </IconButton>
            <Typography
              style={{
                fontSize: "22px",
              }}
            >
              {post.likes.length}
            </Typography>
            <IconButton color="primary" onClick={handleDislike}>
              <ThumbDownIcon
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </IconButton>
            <Typography
              style={{
                fontSize: "22px",
              }}
            >
              {post.dislikes.length}
            </Typography>
            <IconButton
              color="primary"
              onClick={(event) => {
                handleExpand(event);
              }}
            >
              <CommentIcon
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </IconButton>
            <Typography
              style={{
                fontSize: "22px",
              }}
            >
              {post.comments.length}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            {postData}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={9}>
            <Typography
              display="inline"
              style={{
                fontSize: "22px",
              }}
            >
              {"Authors:"}
            </Typography>
            {post.data.authors.map((author) => {
              return (
                <Button
                  display="inline"
                  onClick={(event) => handleViewProfile(event, author)}
                  style={{ fontSize: "24px" }}
                  sx={{ mt: 1 }}
                  key={author}
                >
                  {author}
                </Button>
              );
            })}
          </Grid>
          <Grid item xs={1}>
            {profileOptions}
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <IconButton
              color="primary"
              onClick={(event) => {
                handleExpand(event);
              }}
            >
              <ExpandLessIcon
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Box
              style={{
                border: "3px solid",
                borderColor: "black",
                color: "black",
                backgroundColor: "white",
                fontSize: "32px",
                borderRadius: 20,
                outline: "none",
                width: "97%",
                marginLeft: 15,
              }}
            >
              <Box style={{ width: "96%" }}>
                <TextField
                  fullWidth
                  variant="standard"
                  id="comment"
                  label="Comment:"
                  name="comment"
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
          <Grid item xs={12}>
            {commentFeed}
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
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
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={3}>
            {communityName}
          </Grid>
          <Grid item xs={3}>
            <Typography
              style={{
                fontSize: "22px",
              }}
            >
              {post.dateAndTime.substring(0, 10)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              style={{
                fontWeight: 600,
                fontSize: "24px",
              }}
            >
              {post.postTitle}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <IconButton color="primary">
              <FlagIcon />
              <Typography>{"Report"}</Typography>
            </IconButton>
          </Grid>
          <Grid item xs={2} align="center">
            <IconButton color="primary" onClick={handleLike}>
              <ThumbUpIcon
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </IconButton>
            <Typography
              style={{
                fontSize: "22px",
              }}
            >
              {post.likes.length}
            </Typography>
            <IconButton color="primary" onClick={handleDislike}>
              <ThumbDownIcon
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </IconButton>
            <Typography
              style={{
                fontSize: "22px",
              }}
            >
              {post.dislikes.length}
            </Typography>
            <IconButton
              color="primary"
              onClick={(event) => {
                handleExpand(event);
              }}
            >
              <CommentIcon
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </IconButton>
            <Typography
              style={{
                fontSize: "22px",
              }}
            >
              {post.comments.length}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            {postData}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Typography
              display="inline"
              style={{
                fontSize: "22px",
              }}
            >
              {"Authors:"}
            </Typography>
            {post.data.authors.map((author) => {
              return (
                <Button
                  display="inline"
                  onClick={(event) => handleViewProfile(event, author)}
                  style={{ fontSize: "24px" }}
                  key={author}
                  sx={{ mt: 1 }}
                >
                  {author}
                </Button>
              );
            })}
          </Grid>
          <Grid item xs={2}>
            {profileOptions}
          </Grid>
        </Grid>
      </Box>
    );
  }
}
