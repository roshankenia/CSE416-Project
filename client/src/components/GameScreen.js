import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import { Box, Button, List, ListItem, TextField } from "@mui/material";

export default function GameScreen(){
    // return <Grid style={{fontSize:'420px'}}>Not implemented</Grid>
    return <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            style={{
              width: "100vw",
              height: "100vh",
              backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
            }}
          ></Grid>
}