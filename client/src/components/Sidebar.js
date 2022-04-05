import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Sidebar() {

  const { game } = useContext(GameContext);

  const handleHostNewGame = (event, name) => {
    event.preventDefault();
    game.hostNewLobby();
  };

  return (
    <List>
      <ListItem key="host">
        <Box
          justifyContent="center"
          alignItems="center"
          style={{
            border: "3px solid",
            borderColor: "black",
            color: "black",
            backgroundColor: "#E39090",
            fontSize: "20px",
            outline: "none",
            borderRadius: 20,
            width: "75%",
          }}
        >
          <Typography align="center" style={{ fontSize: "32px" }}>
            Host New Game
          </Typography>
          <Box textAlign="center">
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
              sx={{ mb: 0.5, width: "25%" }}
              onClick={handleHostNewGame}
            >
              +
            </Button>
          </Box>
        </Box>
      </ListItem>
      <ListItem key="join">
        <Box
          justifyContent="center"
          alignItems="center"
          style={{
            border: "3px solid",
            borderColor: "black",
            color: "black",
            backgroundColor: "#E39090",
            fontSize: "20px",
            outline: "none",
            borderRadius: 20,
            width: "75%",
          }}
        >
          <Typography align="center" style={{ fontSize: "32px" }}>
            Join A Lobby
          </Typography>
          <Box
            m="auto"
            textAlign="center"
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "white",
              fontSize: "32px",
              borderRadius: 40,
              outline: "none",
              width: "85%",
            }}
          >
            <TextField
              align="center"
              id="lobbyCode"
              label="Enter Lobby Code:"
              autoFocus
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: 20,
                  paddingLeft: 20,
                  paddingBottom: 10,
                },
              }}
              InputLabelProps={{
                style: { fontSize: 30, paddingLeft: 20 },
                shrink: true,
              }}
            />
          </Box>
          <Box textAlign="center">
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
                fontSize: "20px",
                borderRadius: 20,
              }}
              sx={{ mt: 1, mb: 0.5, width: "25%" }}
            >
              Join
            </Button>
          </Box>
        </Box>
      </ListItem>
      <ListItem key="create">
        <Box
          justifyContent="center"
          alignItems="center"
          style={{
            border: "3px solid",
            borderColor: "black",
            color: "black",
            backgroundColor: "#E39090",
            fontSize: "20px",
            outline: "none",
            borderRadius: 20,
            width: "75%",
          }}
        >
          <Typography align="center" style={{ fontSize: "32px" }}>
            {" "}
            Create New Community
          </Typography>
          <Box
            m="auto"
            textAlign="center"
            style={{
              border: "3px solid",
              borderColor: "black",
              color: "black",
              backgroundColor: "white",
              fontSize: "32px",
              borderRadius: 40,
              outline: "none",
              width: "85%",
            }}
          >
            <TextField
              align="center"
              id="communityName"
              label="Enter A Community Name:"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: 20,
                  paddingLeft: 20,
                  paddingBottom: 10,
                },
              }}
              InputLabelProps={{
                style: { fontSize: 24, paddingLeft: 20 },
                shrink: true,
              }}
            />
          </Box>
          <Box textAlign="center">
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
                fontSize: "20px",
                borderRadius: 20,
              }}
              sx={{ mt: 1, mb: 0.5, width: "35%" }}
            >
              Create!
            </Button>
          </Box>
        </Box>
      </ListItem>
    </List>
  );
}
