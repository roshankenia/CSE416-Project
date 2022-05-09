import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

//import { io} from "socket.io-client"

//Testing websockets please leave
//@Alan
//const socket = io('http://localhost:3000')

export default function WelcomeScreen() {
  const history = useHistory();

  const handleLogin = (event) => {
    event.stopPropagation();
    history.push("/login/");
  };
  const handleRegister = (event) => {
    event.stopPropagation();
    history.push("/register/");
  };

  const handleGuest = (event) => {
    event.stopPropagation();
    history.push("/guest/");
  };
  return (
    <Box
      style={{ backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')" }}
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography variant="h1" component="div" gutterBottom align="center">
        JART
      </Typography>
      <Typography variant="h2" component="div" gutterBottom align="center">
        Joining Artists in Real Time
      </Typography>
      <div align="center">
        <div>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleRegister}
            style={{
              fontWeight: 600,
              border: "3px solid",
              borderColor: "black",
              backgroundColor: "#92C77F",
              color: "black",
              fontSize: "32px",
            }}
            sx={{ mt: 2, width: "25%" }}
          >
            Create New Account
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleLogin}
            style={{
              fontWeight: 600,
              border: "3px solid",
              borderColor: "black",
              backgroundColor: "#92C77F",
              color: "black",
              fontSize: "32px",
            }}
            sx={{ mt: 2, width: "25%" }}
          >
            Login
          </Button>
        </div>
        {/* <div>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleGuest}
            style={{
              fontWeight: 600,
              border: "3px solid",
              borderColor: "black",
              backgroundColor: "#92C77F",
              color: "black",
              fontSize: "32px",
            }}
            sx={{ mt: 2, width: "25%" }}
          >
            Continue as Guest
          </Button>
        </div> */}
      </div>
    </Box>
  );
}
