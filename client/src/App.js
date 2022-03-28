import "./App.css";
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./auth";
import { GlobalCommunityContextProvider } from "./community";
import {
  AppBanner,
  HomeWrapper,
  RegisterScreen,
  LoginScreen,
  Test,
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
          <ThemeProvider theme={theme}>
            <AppBanner />
            <Switch>
              {/* if loggedin, redirect user to homescreen, else redirect to welcome screen */}
              <Route path="/" exact component={HomeWrapper} />
              <Route path="/register/" exact component={RegisterScreen} />
              <Route path="/login/" exact component={LoginScreen} />
              <Route path="/test/" exact component={Test} />
            </Switch>
          </ThemeProvider>
        </GlobalCommunityContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
