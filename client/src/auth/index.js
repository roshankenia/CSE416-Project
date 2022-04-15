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
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  RESET_PASSWORD: "RESET_PASSWORD",
  DELETE_ACCOUNT: "DELETE_ACCOUNT",
  CREATE_GUEST: "CREATE_GUEST",
  SEARCH_USERS: "SEARCH_USERS",
  SET_FRIENDS_AND_REQUESTS: "SET_FRIENDS_AND_REQUESTS",
};

function AuthContextProvider(props) {
  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
    errorMessage: null,
    isGuest: false, //Add this to the setAuth in the reducer
    searchUsers: null,
    friends: null,
    friendRequests: null,
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
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
        });
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: payload.friends,
          friendRequests: payload.friendRequests,
        });
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth({
          user: null,
          loggedIn: false,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
        });
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
        });
      }
      case AuthActionType.CREATE_GUEST: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: auth.errorMessage,
          isGuest: true,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
        });
      }
      case AuthActionType.SET_ERROR_MESSAGE: {
        return setAuth({
          user: auth.user,
          loggedIn: auth.loggedIn,
          errorMessage: payload,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
        });
      }
      case AuthActionType.CHANGE_PASSWORD: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
        });
      }
      case AuthActionType.RESET_PASSWORD: {
        return setAuth({
          user: payload.user,
          loggedIn: false,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
        });
      }
      case AuthActionType.DELETE_ACCOUNT: {
        return setAuth({
          user: payload.user,
          loggedIn: false,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
        });
      }
      case AuthActionType.SEARCH_USERS: {
        return setAuth({
          user: auth.user,
          loggedIn: auth.loggedIn,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: payload,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
        });
      }
      case AuthActionType.SET_FRIENDS_AND_REQUESTS: {
        return setAuth({
          user: auth.user,
          loggedIn: auth.loggedIn,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: payload.friends,
          friendRequests: payload.friendRequests,
        });
      }
      default:
        return auth;
    }
  };

  auth.addFriendByEmail = async function(email){
    console.log("Adding friend By Email")
    let response = await api.findByEmail(email);
    if (response.status === 200) {
      console.log(email);
      auth.sendFriendRequest(auth.user.email, email);

    } else {
      console.log("No email found")
      console.log(response);
    
    }
  }

  auth.sendFriendRequest = async function (sentUserEmail, receivedUserEmail) {
    console.log("sending friend request");
    console.log("The sent user email is"+sentUserEmail)
    console.log("the received user email is"+receivedUserEmail)
    
    try {
      const response = await api.friendRequest(
        sentUserEmail,
        receivedUserEmail
      );
      console.log("response:", response);
      if (response.status === 200) {
        let sentUser = response.data.sentUser;
        console.log("send friend request updating friends and requests");
        let friendRequestIds = sentUser.requests;
        let friendIds = sentUser.friends;

        let friendRequests = [];
        let friends = [];

        for (let i = 0; i < friendRequestIds.length; i++) {
          let response = await api.findById(friendRequestIds[i]);
          friendRequests.push(response.data.user);
        }
        for (let i = 0; i < friendIds.length; i++) {
          let response = await api.findById(friendIds[i]);
          friends.push(response.data.user);
        }

        authReducer({
          type: AuthActionType.SET_FRIENDS_AND_REQUESTS,
          payload: {
            friends: friends,
            friendRequests: friendRequests,
          },
        });
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      //auth.setErrorMessage(error.response.data.errorMessage);
    }
    history.push("/");
  };

  auth.addFriend = async function (sentUserEmail, receivedUserEmail) {
    console.log("adding friend");
    try {
      const response = await api.friend(sentUserEmail, receivedUserEmail);
      console.log("response:", response);
      if (response.status === 200) {
        let receivedUser = response.data.receivedUser;

        console.log("add friend updating friends and requests");

        let friendRequestIds = receivedUser.requests;
        let friendIds = receivedUser.friends;

        let friendRequests = [];
        let friends = [];

        for (let i = 0; i < friendRequestIds.length; i++) {
          let response = await api.findById(friendRequestIds[i]);
          friendRequests.push(response.data.user);
        }
        for (let i = 0; i < friendIds.length; i++) {
          let response = await api.findById(friendIds[i]);
          friends.push(response.data.user);
        }
        console.log("current friends:", friends);

        authReducer({
          type: AuthActionType.SET_FRIENDS_AND_REQUESTS,
          payload: {
            friends: friends,
            friendRequests: friendRequests,
          },
        });
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      //auth.setErrorMessage(error.response.data.errorMessage);
    }
    history.push("/");
  };

  auth.removeFriendRequest = async function (sentUserEmail, receivedUserEmail) {
    console.log("removing friend request");
    try {
      const response = await api.removeFriendRequest(
        sentUserEmail,
        receivedUserEmail
      );
      console.log("response:", response);
      if (response.status === 200) {
        let receivedUser = response.data.receivedUser;

        console.log("remove friend request updating friends and requests");

        let friendRequestIds = receivedUser.requests;
        let friendIds = receivedUser.friends;

        let friendRequests = [];
        let friends = [];

        for (let i = 0; i < friendRequestIds.length; i++) {
          let response = await api.findById(friendRequestIds[i]);
          friendRequests.push(response.data.user);
        }
        for (let i = 0; i < friendIds.length; i++) {
          let response = await api.findById(friendIds[i]);
          friends.push(response.data.user);
        }

        authReducer({
          type: AuthActionType.SET_FRIENDS_AND_REQUESTS,
          payload: {
            friends: friends,
            friendRequests: friendRequests,
          },
        });
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      //auth.setErrorMessage(error.response.data.errorMessage);
    }
    history.push("/");
  };

  auth.removeFriend = async function (currentEmail, externalUserEmail) {
    console.log("removing friend");
    try {
      const response = await api.removeFriend(currentEmail, externalUserEmail);
      console.log("response:", response);

      if (response.status === 200) {
        let currentUser = response.data.sentUser;
        console.log("remove friend updating friends and requests");

        let friendRequestIds = currentUser.requests;
        let friendIds = currentUser.friends;

        let friendRequests = [];
        let friends = [];

        for (let i = 0; i < friendRequestIds.length; i++) {
          let response = await api.findById(friendRequestIds[i]);
          friendRequests.push(response.data.user);
        }
        for (let i = 0; i < friendIds.length; i++) {
          let response = await api.findById(friendIds[i]);
          friends.push(response.data.user);
        }

        authReducer({
          type: AuthActionType.SET_FRIENDS_AND_REQUESTS,
          payload: {
            friends: friends,
            friendRequests: friendRequests,
          },
        });
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      //auth.setErrorMessage(error.response.data.errorMessage);
    }
    history.push("/");
  };

  auth.search = async function (username) {
    console.log(username);
    let response = await api.searchUsers(username);
    if (response.status === 200) {
      console.log(response.data.usernames);
      authReducer({
        type: AuthActionType.SEARCH_USERS,
        payload: response.data.usernames,
      });
    } else {
      console.log(response);
    }
  };

  auth.deleteAccount = async function (password) {
    try {
      console.log('attempt to delete account...')
      console.log(auth.user._id)
      const response = await api.deleteAccount(auth.user._id, password);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.DELETE_ACCOUNT,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/");
      }
      return true
    } catch (error) {
      console.log(error.response.data.errorMessage);
      auth.setErrorMessage(error.response.data.errorMessage);
      return false;
    }
  };

  auth.resetPassword = async function (email) {
    try {
      const response = await api.resetPassword(email);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.RESET_PASSWORD,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/");
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      //auth.setErrorMessage(error.response.data.errorMessage);
    }
  };

  auth.changePassword = async function (
    username,
    currPassword,
    newPassword,
    newPassVerify
  ) {
    try {
      const response = await api.changePassword(
        username,
        currPassword,
        newPassword,
        newPassVerify
      );
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.CHANGE_PASSWORD,
          payload: {
            user: response.data.user,
          },
        });
        return true;
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      auth.setErrorMessage(error.response.data.errorMessage);
      return false;
    }
  };

  auth.setErrorMessage = function (message) {
    authReducer({
      type: AuthActionType.SET_ERROR_MESSAGE,
      payload: message,
    });
  };
  auth.removeErrorMessage = function () {
    authReducer({
      type: AuthActionType.SET_ERROR_MESSAGE,
      payload: null,
    });
  };

  auth.getLoggedIn = async function () {
    try{
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
    }catch(err){
      console.log(err)
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
        username,
        false
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
      console.log("response:", response);

      if (response.status === 200) {
        let user = response.data.user;
        console.log("login updating friends and requests");
        let friendRequestIds = user.requests;
        let friendIds = user.friends;

        let friendRequests = [];
        let friends = [];

        for (let i = 0; i < friendRequestIds.length; i++) {
          let response = await api.findById(friendRequestIds[i]);
          friendRequests.push(response.data.user);
        }
        for (let i = 0; i < friendIds.length; i++) {
          let response = await api.findById(friendIds[i]);
          friends.push(response.data.user);
        }

        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            user: user,
            friends: friends,
            friendRequests: friendRequests,
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
    try{
      const response = await api.logoutUser();
      history.push("/");
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.LOGOUT_USER,
          payload: null,
        });
      }
    }catch(err){
      console.log('react: logout failed!')
      console.log(err)
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

  auth.createGuest = async function (username, lobbyCode) {
    console.log("making guest");
    try {
      const response = await api.createGuest(username, true);
      if (response.status === 200) {
        let user = response.data.newUser;
        authReducer({
          type: AuthActionType.CREATE_GUEST,
          payload: {
            user: user,
          },
        });
        //lobby push
        console.log(response.data.newUser);
        // history.push("/lobby/"+lobbyCode);
      }
    } catch (error) {
      console.log(error);
    }
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
