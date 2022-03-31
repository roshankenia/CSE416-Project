import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "./auth-request-api";
import { GlobalCommunityContext } from "../community";

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
  GET_LOGGED_IN: "GET_LOGGED_IN",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  REGISTER_USER: "REGISTER_USER",
  SET_ERROR_MESSAGE: "SET_ERROR_MESSAGE",
};

function AuthContextProvider(props) {

  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
    errorMessage:null,
    isGuest: false
  });
  const history = useHistory();
  const { community } = useContext(GlobalCommunityContext);

  useEffect(() => {
    auth.getLoggedIn();
  }, []);

  const authReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.GET_LOGGED_IN: {
        return setAuth({
          user: payload.user,
          loggedIn: payload.loggedIn,
          errorMessage: auth.errorMessage
        });
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: auth.errorMessage
        });
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth({
          user: null,
          loggedIn: false,
          errorMessage: auth.errorMessage
        });
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: auth.errorMessage
        });
      }
      case AuthActionType.SET_ERROR_MESSAGE:{
          return setAuth({
            user: auth.user,
            loggedIn: auth.loggedIn,
            errorMessage: payload
          });
      }
      default:
        return auth;
    }
  };
  

  auth.setErrorMessage = function(message){
    authReducer({
      type: AuthActionType.SET_ERROR_MESSAGE,
      payload: message,
    });
  }
  auth.removeErrorMessage = function(){
    authReducer({
      type: AuthActionType.SET_ERROR_MESSAGE,
      payload: null,
    });
  }

  auth.getLoggedIn = async function () {
    const response = await api.getLoggedIn();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.SET_LOGGED_IN,
        payload: {
          loggedIn: response.data.loggedIn,
          user: response.data.user,
        },
      });
    }
  };

  auth.registerUser = async function (
    firstName,
    lastName,
    email,
    password,
    passwordVerify,
    username
  ) {
    try {
      const response = await api.registerUser(
        firstName,
        lastName,
        email,
        password,
        passwordVerify,
        username
      );
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.REGISTER_USER,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/login");
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      console.log(auth.errorMessage);
      auth.setErrorMessage(error.response.data.errorMessage);
    }
  };

  auth.loginUser = async function (username, password) {
    try {
      const response = await api.loginUser(username, password);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/");
      }
    } catch (error) {
      //console.log(error.response.data.errorMessage);
      //auth.setErrorMessage(error.response.data.errorMessage);
    }
  };

  auth.logoutUser = async function () {
    const response = await api.logoutUser();
    history.push("/");
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.LOGOUT_USER,
        payload: null,
      });
    }
  };

  auth.getUserInitials = function () {
    let initials = "";
    if (auth.user) {
      initials += auth.user.firstName.charAt(0);
      initials += auth.user.lastName.charAt(0);
    }
    console.log("user initials: " + initials);
    return initials;
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
