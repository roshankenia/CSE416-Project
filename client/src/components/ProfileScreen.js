import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Sidebar from "./Sidebar.js";
import AuthContext from "../auth";
import PostFeed from "./PostFeed.js";
import Sticky from "react-stickynode";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ProfileScreen() {
  const { community } = useContext(GlobalCommunityContext);
  const { auth } = useContext(AuthContext);
  const [notifyOpen, setNotifyOpen] = React.useState(false);
  

  const handleBackToCommunities = (event) => {
    event.stopPropagation();
    community.setScreen("communities");
  };

  const handleSendFriendRequest = (event) => {
    event.stopPropagation();
    console.log("send from: " + auth.user.email)
    console.log("send to: " + community.userProfile.email)
    let receivedUserEmail = community.userProfile.email;
    let sentUserEmail = auth.user.email;
    auth.sendFriendRequest(sentUserEmail, receivedUserEmail);
    setNotifyOpen(true)
  }

  const handleNotifyClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotifyOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleNotifyClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  console.log(auth.user.bio)

  const welcomeTag = (
    <Typography
      style={{
        fontWeight: 600,
        color: "Black",
        fontSize: "140px",
        borderRadius: 20,
        opacity: 0.75,
      }}
      sx={{ mt: 2, width: "25%" }}
    >
      {"u/" + community.userProfile.username}
    </Typography>
  );

  let notFriendOrSelf = true;
  if (community.userProfile._id === auth.user._id){
    notFriendOrSelf = false
  } else {
    for (var i = 0; i < community.userProfile.friends.length; i++){
      if (auth.user._id === community.userProfile.friends[i]){
        notFriendOrSelf = false
      }
    }
    for (var j = 0; j < community.userProfile.requests.length; j++){
      if (auth.user._id === community.userProfile.requests[j]){
        notFriendOrSelf = false
      }
    }
  }

  if (notFriendOrSelf){
    return (
      <Grid
        container
        justifyContent="center"
        style={{
          backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
        }}
      >
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="small"
            align="center"
            onClick={handleBackToCommunities}
            style={{
              fontWeight: 600,
              border: "3px solid",
              borderColor: "black",
              backgroundColor: "orange",
              color: "black",
              fontSize: "10px",
              borderRadius: 20,
            }}
            sx={{ mt: 2 }}
          >
            Back to Communities
          </Button>
        </Grid>
        <Grid item xs={5} alignItems="flex-start">
          {welcomeTag}
        </Grid>

        <Button
          variant="contained"
          color="success"
          size="small"
          style={{
            fontWeight: 600,
            border: "3px solid",
            borderColor: "black",
            backgroundColor: "#46EC2B",
            color: "black",
            fontSize: "24px",
            borderRadius: 50,
          }}
          sx={{ mb: 0.5, height: "5%", width: "15%" }}
          onClick={handleSendFriendRequest}
        >
          + Add Friend
        </Button>
        <Snackbar
          open={notifyOpen}
          autoHideDuration={3000}
          message="Friend Request Sent"
          onClose={handleNotifyClose}
          action={action}
        />
  
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
    );
  } else {
    return (
      <Grid
        container
        justifyContent="center"
        style={{
          backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
        }}
      >
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="small"
            align="center"
            onClick={handleBackToCommunities}
            style={{
              fontWeight: 600,
              border: "3px solid",
              borderColor: "black",
              backgroundColor: "orange",
              color: "black",
              fontSize: "10px",
              borderRadius: 20,
            }}
            sx={{ mt: 2 }}
          >
            Back to Communities
          </Button>
        </Grid>
        <Grid item xs={5} alignItems="flex-start">
          {welcomeTag}
          <Typography fontSize={"30px"}>
            
          </Typography>
        </Grid>
            
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
    );
  }
  
}
