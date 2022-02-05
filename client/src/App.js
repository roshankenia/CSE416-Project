import "./App.css";
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./auth";
import { GlobalStoreContextProvider } from "./store";
import {
  AppBanner,
  HomeWrapper,
  LoginScreen,
  RegisterScreen,
  Statusbar,
  WorkspaceScreen,
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
const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>
          <AppBanner />
          <Switch>
            <Route path="/" exact component={HomeWrapper} />
            <Route path="/login/" exact component={LoginScreen} />
            <Route path="/register/" exact component={RegisterScreen} />
            <Route path="/top5list/:id" exact component={WorkspaceScreen} />
          </Switch>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
