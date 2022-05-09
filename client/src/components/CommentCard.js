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


  //Keeps track if post is expanded or not
  const [expanded, setExpanded] = useState(false);
  // const [reply, setReply] = useState('');

  function handleExpand(event) {
    event.stopPropagation();
    let ex = !expanded;
    setExpanded(ex);
    // if (ex) {
    //   store.updateViews(top5List);
    // }
  }

  // const enterKeyDown = (event) => {
  //   if (event.key === "Enter"){
  //     console.log("Enter was pressed.");
  //     handleSubmitReply();
  //     setReply('');
  //     setExpanded(false);
  //   }
  // }

  // function handleSubmitReply(){
  //   if (reply !== ''){
  //     console.log("reply submitted:", reply)
  //     community.updatePost("reply", null, {comment: comment, reply: reply}, auth.user);
  //   } else {
  //     console.log("no reply to submit");
  //   }
  // }

  // function handleUpdateReply(event) {
  //   console.log(event.target.value)
  //   setReply(event.target.value)
  // }

  // const replies = comment.reply;
  // console.log(comment)
  // console.log(replies)
  // const replyFeed = (
  //   <List>
  //     {replies.map((reply, index) => (
  //       <ListItem key={index}>
  //         <Box
  //           variant="contained"
  //           color="success"
  //           size="large"
  //           style={{
  //             fontWeight: 600,
  //             border: "3px solid",
  //             borderColor: "black",
  //             backgroundColor: "#c3dbd0",
  //             color: "black",
  //             fontSize: "48px",
  //             borderRadius: 20,
  //           }}
  //           sx={{ width: "100%" }}
  //         >
  //           <Grid container alignItems="center">
  //             <Grid item xs={2}>
  //               <Typography
  //                 display="inline"
  //                 style={{
  //                   fontSize: "22px",
  //                   paddingLeft: 10,
  //                 }}
  //               >
  //                 {reply.likes.length}
  //               </Typography>
  //               <IconButton color="primary">
  //                 <ThumbUpIcon
  //                   sx={{
  //                     width: 20,
  //                     height: 20,
  //                   }}
  //                 />
  //               </IconButton>
  //               <Typography
  //                 display="inline"
  //                 style={{
  //                   fontSize: "22px",
  //                 }}
  //               >
  //                 {reply.dislikes.length}
  //               </Typography>
  //               <IconButton color="primary">
  //                 <ThumbDownIcon
  //                   sx={{
  //                     width: 20,
  //                     height: 20,
  //                   }}
  //                 />
  //               </IconButton>
  //             </Grid>
  //             <Grid item xs={10}>
  //               <Typography
  //                 style={{
  //                   fontSize: "22px",
  //                 }}
  //               >
  //                 {reply.username + ": " + reply.reply}
  //               </Typography>
  //             </Grid>
  //           </Grid>
  //         </Box>
  //       </ListItem>
  //     ))}
  //   </List>
  // );
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
          backgroundColor: "#dfe4ed",
          color: "black",
          fontSize: "48px",
          borderRadius: 20,
        }}
        sx={{ width: "100%" }}
      >
        <Grid container alignItems="center">
          <Grid item xs={2.5}>
            <Typography
              display="inline"
              style={{
                fontSize: "22px",
                paddingLeft: 10,
              }}
            >
              {comment.likes.length}
            </Typography>
            <IconButton color="primary">
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
            <IconButton color="primary">
              <ThumbDownIcon
                sx={{
                  width: 20,
                  height: 20,
                }}
              />
            </IconButton>
            {/* <Typography
              display="inline"
              style={{
                fontSize: "22px",
              }}
            >
              {comment.reply.length}
            </Typography>
            <IconButton color="primary">
              <CommentIcon
                onClick={(event) => {
                  handleExpand(event);
                }}
                sx={{
                  width: 20,
                  height: 20,
                }}
              />
            </IconButton> */}
          </Grid>
          <Grid item xs={9.5}>
            <Typography
              style={{
                fontSize: "26px",
              }}
            >
              {comment.username + ": " + comment.comment}
            </Typography>
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
              {/* <Box style={{ width: "96%" }}>
                <TextField
                  fullWidth
                  variant="standard"
                  id="reply"
                  label="Reply:"
                  name="reply"
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
                  onChange={handleUpdateReply}
                  onKeyDown={(e) => enterKeyDown(e)}
                />
              </Box> */}
            </Box>
          </Grid>
          {/* <Grid item xs={12}>
            {replyFeed}
          </Grid> */}
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
          backgroundColor: "#dfe4ed",
          color: "black",
          fontSize: "48px",
          borderRadius: 20,
        }}
        sx={{ width: "100%" }}
      >
        <Grid container alignItems="center">
          <Grid item xs={2.5}>
            <Typography
              display="inline"
              style={{
                fontSize: "22px",
                paddingLeft: 10,
              }}
            >
              {comment.likes.length}
            </Typography>
            <IconButton color="primary">
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
            <IconButton color="primary">
              <ThumbDownIcon
                sx={{
                  width: 20,
                  height: 20,
                }}
              />
            </IconButton>
            {/* <Typography
              display="inline"
              style={{
                fontSize: "22px",
              }}
            >
              {comment.reply.length}
            </Typography>
            <IconButton color="primary">
              <CommentIcon
                onClick={(event) => {
                  handleExpand(event);
                }}
                sx={{
                  width: 20,
                  height: 20,
                }}
              />
            </IconButton> */}
          </Grid>
          <Grid item xs={9.5}>
            <Typography
              style={{
                fontSize: "26px",
              }}
            >
              {comment.username + ": " + comment.comment}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
