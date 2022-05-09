import { useContext, useState } from "react";
import { GlobalCommunityContext } from "../community";
import AuthContext from "../auth";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Collapse } from "@mui/material";
import { Box } from "@mui/system";
import { List } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";


export default function CommentCard(props) {
  const { community } = useContext(GlobalCommunityContext);
  const { comment } = props;
  const { auth } = useContext(AuthContext);

  function handleLike(event) {
    event.stopPropagation();
    // console.log(comment)
    community.updateComment("like", comment, auth.user);
  }

  function handleDislike(event) {
    event.stopPropagation();
    community.updateComment("dislike", comment, auth.user);
  }

  return (
    <Box
      variant="contained"
      color="success"
      size="large"
      style={{
        fontWeight: 600,
        border: "3px solid",
        borderColor: "black",
        backgroundColor: "#dfe4ed",
        color: "black",
        fontSize: "48px",
        borderRadius: 20,
      }}
      sx={{ width: "100%" }}
    >
      <Grid container alignItems="center">
        {/* <Grid item xs={2.5}>
          <Typography
            display="inline"
            style={{
              fontSize: "22px",
              paddingLeft: 10,
            }}
          >
            {comment.likes.length}
          </Typography>
          <IconButton color="primary" onClick={handleLike}>
            <ThumbUpIcon
              sx={{
                width: 20,
                height: 20,
              }}
            />
          </IconButton>
          <Typography
            display="inline"
            style={{
              fontSize: "22px",
            }}
          >
            {comment.dislikes.length}
          </Typography>
          <IconButton color="primary" onClick={handleDislike}>
            <ThumbDownIcon
              sx={{
                width: 20,
                height: 20,
              }}
            />
          </IconButton>
        </Grid> */}
        <Grid item xs={12}>
          <Typography
            style={{
              fontSize: "26px",
              paddingLeft: 10,
            }}
          >
            {comment.username + ": " + comment.comment}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
