import "./App.css";
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./auth";
import { GlobalCommunityContextProvider } from "./community";
import { GameContextProvider } from "./game";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  AppBanner,
  HomeWrapper,
  RegisterScreen,
  LoginScreen,
  Test,
  GuestScreen,
  GameWrapper,
  ResetScreen
} from "./components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import io from "socket.io-client";

const socket = io.connect('/');
socket.on('connection', () => {
  console.log(`I'm connected with the back-end\nI'm connected with the back-end\nI'm connected with the back-end\n(repeated 3 times)`);
});

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
                <AppBanner />
                <Box
                  style={{
                    marginTop: 50,
                    width: "100vw",
                    height: "100vh",
                  }}
                >
                  <Switch>
                    {/* if loggedin, redirect user to homescreen, else redirect to welcome screen */}
                    <Route path="/" exact component={HomeWrapper} />
                    <Route path="/register/" exact component={RegisterScreen} />
                    <Route path="/login/" exact component={LoginScreen} />
                    <Route path="/guest/" exact component={GuestScreen} />
                    <Route path="/game/:id" exact component={GameWrapper} />
                    <Route path="/reset" exact component={ResetScreen} />
                    <Route path="/test" exact component={Test} />
                  </Switch>
                </Box>
              </Box>
            </ThemeProvider>
          </GameContextProvider>
        </GlobalCommunityContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
