import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Sidebar from "./Sidebar.js";
import AuthContext from "../auth";
import PostFeed from "./PostFeed.js";
import Sticky from "react-stickynode";
import Button from "@mui/material/Button";

export default function ProfileScreen() {
  const { community } = useContext(GlobalCommunityContext);
  const { auth } = useContext(AuthContext);
  const handleBackToCommunities = (event) => {
    event.stopPropagation();
    community.setScreen("communities");
  };
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
