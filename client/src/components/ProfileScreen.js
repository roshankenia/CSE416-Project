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
import ChangeBioModal from "./ChangeBioModal";
import Box from "@mui/material/Box";

export default function ProfileScreen() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { community } = useContext(GlobalCommunityContext);
  const { auth } = useContext(AuthContext);
  const [notifyOpen, setNotifyOpen] = React.useState(false);

  const handleBackToCommunities = (event) => {
    event.stopPropagation();
    community.setScreen("communities");
  };

  const handleSendFriendRequest = (event) => {
    event.stopPropagation();
    console.log("send from: " + auth.user.email);
    console.log("send to: " + community.userProfile.email);
    let receivedUserEmail = community.userProfile.email;
    let sentUserEmail = auth.user.email;
    auth.sendFriendRequest(sentUserEmail, receivedUserEmail);
    setNotifyOpen(true);
  };

  const handleNotifyClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotifyOpen(false);
  };

  function handleOpenBioModal(event) {
    event.preventDefault();
    community.setChangeBio(true);
    console.log("reached here");
    console.log(community.changeBioModal);
    // let newBio = "Updated Bio"
    // const response = await auth.updateBio(auth.user.username, newBio)
    // console.log(response)
  }

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

  let isSelf = false;
  let isFriend = false;
  console.log(community.userProfile._id);
  console.log(auth.user._id);
  if (community.userProfile._id === auth.user._id) {
    isSelf = true;
  }
  if (!isSelf) {
    for (var i = 0; i < community.userProfile.friends.length; i++) {
      if (auth.user._id === community.userProfile.friends[i]) {
        isFriend = true;
      }
    }
    for (var j = 0; j < community.userProfile.requests.length; j++) {
      if (auth.user._id === community.userProfile.requests[j]) {
        isFriend = true;
      }
    }
  }

  let bioToPrint = community.userProfile.bio;
  console.log(community.userProfile);
  console.log(auth.user);
  if (community.userProfile.bio == "") {
    bioToPrint = "No Bio Yet";
  }

  if (isSelf) {
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
          <Typography fontSize={"30px"}>{bioToPrint}</Typography>
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
          onClick={handleOpenBioModal}
        >
          Update Bio
        </Button>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <PostFeed />
        </Grid>

        <div className="sticky">
          <Sidebar />
        </div>
        <ChangeBioModal />
      </Grid>
    );
  } else if (isFriend) {
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
          <Typography fontSize={"30px"}>{bioToPrint}</Typography>
        </Grid>

        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          {/* <Typography style={{ fontSize: "32px" }}>
            {community.communityList}
          </Typography> */}
          <PostFeed />
        </Grid>

        <div className="sticky">
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
          <Typography fontSize={"30px"}>{bioToPrint}</Typography>
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
          {/* <Typography style={{ fontSize: "32px" }}>
            {community.communityList}
          </Typography> */}
          <PostFeed />
        </Grid>

        <div className="sticky">
          <Sidebar />
        </div>
      </Grid>
    );
  }
}
