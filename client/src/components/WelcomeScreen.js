import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export default function WelcomeScreen() {
  return (
    <Box
      style={{ backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')" }}
      sx={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(#f8f8fe, #9595f6)",
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
            href="/register/"
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
            href="/login/"
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
        <div>
          <Button
            variant="contained"
            color="success"
            size="large"
            href="/guest/"
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
        </div>
      </div>
    </Box>
  );
}
