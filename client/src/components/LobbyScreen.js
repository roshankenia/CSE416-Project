import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function LobbyScreen(){

    const { game } = useContext(GameContext);

    const handleNewGame = (event) => {
        event.preventDefault();
        game.createNewGame();
      };

    return <Button onClick={handleNewGame}><Typography sx={{fontSize:'80px'}}>click to go to game screen</Typography>
            </Button>
}