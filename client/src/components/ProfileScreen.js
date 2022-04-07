import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Sidebar from "./Sidebar.js";
import AuthContext from "../auth";
import PostFeed from "./PostFeed.js";
import Sticky from 'react-stickynode';
export default function ProfileScreen(){
    const { community } = useContext(GlobalCommunityContext);
    
    return(
        <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{
  
          backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
        }}
      >
        
  
        <Grid item xs={8} sm={8} md ={8} lg = {8} xl ={8}>
          <Typography style={{ fontSize: "32px" }}>{community.communityList}</Typography>
          <PostFeed />
        </Grid>
  
        {/* <Sticky> */}
        <div class="sticky">
        <Sticky>
         <Sidebar />
         </Sticky>
        </div>
          {/* <Grid class="sticky" item xs={4}><Sidebar /></Grid>  */}
        {/* </Sticky> */}
        
      </Grid>
    );
}