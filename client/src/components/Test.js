import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import CommunityCard from "./CommunityCard.js";

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

import Grid from "@mui/material/Grid";

import AuthContext from "../auth";

/*
    This module is used for testing stuff
    modules can be copy+pasted to other components
    
    @Terran
*/
const HomeScreen = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const { community } = useContext(GlobalCommunityContext);
  const { auth } = useContext(AuthContext);
  
  //#region ************* Create community module ***************/
  const [name, setName] = useState("")
  /* default community name is "untitled" 
   * -@Terran */ 
  function handleCreateNewCommunity() {
    if(name){
      community.createNewCommunity(name);
    }else{
      community.createNewCommunity("untitled")
    }
  }
  /* handleBlur and handleKeyPress may be useful 
   * depending on the future implementation 
   * -@Terran */ 
  function handleBlur(event) {
    // let id = event.target.id.substring("list-".length);if(text !== ""){store.changeListName(id, text.trim())}toggleEdit();
  }
  function handleKeyPress(event) {
    // if (event.code === "Enter") {handleBlur(event)}
  }
  function updateCommunityName(event) {
    setName(event.target.value);
  }
  const createCommunityRender = <Box>    
                            <TextField id="outlined-basic" label="Community Name" variant="outlined" 
                              onKeyPress={handleKeyPress}
                              onBlur={handleBlur}
                              onChange={updateCommunityName}/>            
                            <Button variant="outlined" onClick={handleCreateNewCommunity}>Create new community</Button>
                          </Box>
  //#endregion ************* End Create community module ***************/

  //#region ************* Delete community module ***************/
  /* delete a community with given name" 
   * -@Terran */ 
  const [dName, setDName] = useState("")
  function handleDeleteCommunity() {
    if(dName){
      community.deleteCommunity(dName);
    }
  }
  function updateDeleteName(event) {
    setDName(event.target.value);
  }
  const deleteCommunityRender = <Box>    
                            <TextField id="outlined-basic" label="delete Community Name" variant="outlined" 
                              onChange={updateDeleteName}/>            
                            <Button variant="outlined" onClick={handleDeleteCommunity}>Delete community</Button>
                          </Box>
  //#endregion *************** delete community module ***************/

  //#region ************* Retrieve community module ***************/
  /* get all existing communities" 
   * -@Terran */ 
  function handleGetCommunities() {
    community.getCommunities()
  }
  let communityCards = "";
  if (community.communityList) {
    communityCards = 
          <List sx={{ width: '90%', left: '5%', bgcolor: 'light-gray' }}>
          {
              community.communityList.map((obj) => (
                  <CommunityCard
                      key={obj._id}
                      Obj={obj}
                  />
              ))
          }
          </List>;
  }
  const getCommunitiesRender = <Box>    
                            <Button variant="outlined" onClick={handleGetCommunities}>Get All Communities</Button>
                            {communityCards}
                          </Box>
  //#endregion *************** delete community module ***************/
  return (
    <Grid container direction={'column'}>
    {createCommunityRender}
    {deleteCommunityRender}
    {getCommunitiesRender}
    </Grid>
  );
};

export default HomeScreen;