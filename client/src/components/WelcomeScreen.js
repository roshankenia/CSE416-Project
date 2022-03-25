import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

export default function WelcomeScreen(){
    return (
        <Box sx={{ width: "100%", height: "100%", background: 'linear-gradient(#f8f8fe, #9595f6)'}}>
          <Typography variant="h1" component="div" gutterBottom align="center">
            JART
          </Typography>
          <div align="center">
            <div>
              <Button
                variant="contained"
                color="success"
                size="large"
                href="/register/"
                sx={{ mt: 2, width: "50%", minHeight: "100px" }}
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
                sx={{ mt: 2, width: "50%", minHeight: "100px" }}
              >
                Login
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ mt: 2, width: "50%", minHeight: "100px" }}
              >
                Continue as Guest
              </Button>
            </div>
          </div>
        </Box>
      );
}