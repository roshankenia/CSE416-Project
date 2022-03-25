import "./App.css";
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./auth";
import { GlobalCommunityContextProvider } from "./community";
import { WelcomeScreen } from "./components";
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
import { ThemeProvider, createMuiTheme } from "@mui/material/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poor Story"].join(","),
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalCommunityContextProvider>
          <ThemeProvider theme={theme}>
            <WelcomeScreen />
          </ThemeProvider>
        </GlobalCommunityContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
