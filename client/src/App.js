import "./App.css";
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./auth";
import { GlobalCommunityContextProvider } from "./community";
import { GameContextProvider } from "./game";
import Box from "@mui/material/Box";

import {
  AppBanner,
  HomeWrapper,
  RegisterScreen,
  LoginScreen,
  Test,
  GuestScreen,
  GameWrapper
} from "./components";
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poor Story",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 40,
        },
      },
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalCommunityContextProvider>
          <GameContextProvider>
            <ThemeProvider theme={theme}>
              <Box>
                {" "}
                <AppBanner />
                <Switch>
                  {/* if loggedin, redirect user to homescreen, else redirect to welcome screen */}
                  <Route path="/" exact component={HomeWrapper} />
                  <Route path="/register/" exact component={RegisterScreen} />
                  <Route path="/login/" exact component={LoginScreen} />
                  <Route path="/guest/" exact component={GuestScreen} />
                  <Route path="/test/" exact component={Test} />
                  <Route path="/game/:id" exact component={GameWrapper} />
                </Switch>
              </Box>
            </ThemeProvider>
          </GameContextProvider>
        </GlobalCommunityContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
