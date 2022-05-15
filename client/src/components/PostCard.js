import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FlagIcon from "@mui/icons-material/Flag";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import jsPDF from "jspdf";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import CommentCard from "./CommentCard.js";
import StoryPopout from "./StoryPopout.js";

export default function PostCard(props) {
  const { community } = useContext(GlobalCommunityContext);
  const { auth } = useContext(AuthContext);
  const { game } = useContext(GameContext);
  const { post, index } = props;

  //Keeps track if post is expanded or not
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const enterKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Enter was pressed.");
      handleSubmitComment();
      setComment("");
      setExpanded(false);
    }
  };

  function handleSubmitComment() {
    // call update post, creating new update type "comment" and just push the comment into array
    if (comment !== "") {
      console.log("comment submitted:", comment);
      community.updatePost("comment", post, comment, auth.user);
    } else {
      console.log("no comment to submit");
    }
  }

  function handleExpand(event) {
    event.stopPropagation();
    let ex = !expanded;
    setExpanded(ex);
    setComment("");
    // if (ex) {
    //   store.updateViews(top5List);
    // }
  }

  function handleUpdateComment(event) {
    console.log(event.target.value);
    setComment(event.target.value);
  }

  function handleDelete(event) {
    event.stopPropagation();
    community.setDeletePost(true, post);
  }

  function handleLike(event) {
    event.stopPropagation();
    community.updatePost("like", post, null, auth.user);
  }

  function handleDislike(event) {
    event.stopPropagation();
    community.updatePost("dislike", post, null, auth.user);
  }

  function handleOpenReportModal(event) {
    event.stopPropagation();
    console.log("Open report modal");
    community.setReportModal(true, post);
  }

  let postData = "";

  if (post.postComic) {
    postData = (
      <ImageList id={"data" + index} sx={{ width: "95%" }} cols={3}>
        {post.data.panels.map((picture) => (
          <ImageListItem key={picture}>
            <img src={picture} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    );
  } else if (post.postStory) {
    postData = <StoryPopout index={index} post={post} />;
  }

  function toDataURL(src) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        var canvas = document.createElement("CANVAS");
        var ctx = canvas.getContext("2d");
        var dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL();
        resolve(dataURL);
      };
      img.src = src;
      if (img.complete || img.complete === undefined) {
        img.src =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
      }
    });
  }

  async function downloadPost(event) {
    event.stopPropagation();
    let input = document.getElementById("data" + index);
    console.log(input);

    const pdf = new jsPDF("l", "pt", "a4");
    const pageLength = pdf.internal.pageSize.getHeight();

    const marginY = (pageLength - 250) / 2;

    for (let i = 0; i < post.data.panels.length; i += 3) {
      if (post.data.panels[i]) {
        const url1 = await toDataURL(post.data.panels[i]);
        pdf.addImage(url1, "JPEG", 45, marginY, 250, 250);
      }
      if (post.data.panels[i + 1]) {
        const url2 = await toDataURL(post.data.panels[i + 1]);
        pdf.addImage(url2, "JPEG", 295, marginY, 250, 250);
      }
      if (post.data.panels[i + 2]) {
        const url3 = await toDataURL(post.data.panels[i + 2]);
        pdf.addImage(url3, "JPEG", 545, marginY, 250, 250);
      }

      if (i + 3 != post.data.panels.length) {
        pdf.addPage();
      }
    }
    pdf.save("jart.pdf");
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
  const history = useHistory();
  function handleEdit(event) {
    if (!post.communityPublished){
      history.push("/singleplayer/" + post._id);
      game.turn = 0;
      console.log("game.turn should be 0", game.turn);
    } else {
      console.log("this cannot be edited. already published.")
    }
    
  }
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

  if (community.currentCommunity) {
    communityName = (
      <Button
        disabled={true}
        style={{
          fontSize: "22px",
          paddingLeft: 10,
          paddingBottom: 10,
          color: "grey",
        }}
        onClick={(event) => openCommunity(event, post.communityName)}
      >
        {post.communityName}
      </Button>
    );
  }

  let profileOptions = "";

  if (
    community.screen == "profile" &&
    auth.user.username == community.userProfile.username
  ) {
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
          <CommentCard comment={comment} post={post} />
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
            <IconButton color="primary" onClick={handleOpenReportModal}>
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
                  sx={{ mt: 1 }}
                  key={author}
                >
                  {author}
                </Button>
              );
            })}
          </Grid>
          <Grid item xs={1}>
            {post.postComic && (
              <IconButton color="primary" onClick={downloadPost}>
                <DownloadIcon
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                />
              </IconButton>
            )}
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
                  onChange={handleUpdateComment}
                  onKeyDown={(e) => enterKeyDown(e)}
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
            <IconButton color="primary" onClick={handleOpenReportModal}>
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
          <Grid item xs={7}>
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
          {
          !post.communityPublished &&
          auth.user.username == post.data.authors[0] &&
            post.data.authors.length == 1 && (
              <Grid item xs={1}>
                <Button onClick={handleEdit} sx={{ fontSize: 24 }}>
                  {" "}
                  Edit{" "}
                </Button>
              </Grid>
            )}
          <Grid item xs={1}>
            {post.postComic && (
              <IconButton color="primary" onClick={downloadPost}>
                <DownloadIcon
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={1}>
            {profileOptions}
          </Grid>
        </Grid>
      </Box>
    );
  }
}
