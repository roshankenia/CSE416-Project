/*
    This is our http api for all things auth, which we use to 
    send authorization requests to our back-end API. Note we`re 
    using the Axios library for doing this, which is an easy to 
    use AJAX-based library. We could (and maybe should) use Fetch, 
    which is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "https://cse-416-jart.herokuapp.com/auth",
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /register). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const loginUser = (username, password) => {
  return api.post(`/login/`, {
    username: username,
    password: password,
  });
};
export const logoutUser = () => api.post(`/logout/`);

export const createGuest = (username, guest) => {
  console.log(process.env.PORT);
  return api.post(`/guest/`, {
    username: username,
    guest: guest,
  });
};

export const registerUser = (
  firstName,
  lastName,
  email,
  password,
  passwordVerify,
  username,
  guest
) => {
  console.log(process.env.PORT);
  return api.post(`/register/`, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    passwordVerify: passwordVerify,
    username: username,
    guest: guest,
  });
};

// @Jeff Hu front end request auth apis TO DO
export const changePassword = (
  username,
  currentPassword,
  newPassword,
  newPassVerify
) => {
  return api.post("/changePassword/", {
    username: username,
    currentPassword: currentPassword,
    newPassword: newPassword,
    newPassVerify: newPassVerify,
  });
};
export const resetPassword = (email) => {
  return api.post("/resetPassword/", {
    email: email,
  });
};

//id set as 
export const deleteAccount = (_id, password) => {
  return api.post("/deleteAccount/", {
    _id : _id,
    password: password,
  });
};

export const searchUsers = (username) => {
  return api.post("/search/", {
    username: username,
  });
};

export const findById = (id) => api.get(`/findById/${id}`);

export const findByEmail = (email) =>api.post(`/findByEmail/ ${email}`);

export const friendRequest = (sentUserEmail, receivedUserEmail) => {
  return api.put("/friendRequest/", {
    sentUserEmail: sentUserEmail,
    receivedUserEmail: receivedUserEmail,
  });
};

export const friend = (sentUserEmail, receivedUserEmail) => {
  return api.put("/friend/", {
    sentUserEmail: sentUserEmail,
    receivedUserEmail: receivedUserEmail,
  });
};

export const removeFriendRequest = (sentUserEmail, receivedUserEmail) => {
  return api.put("/removeFriendRequest/", {
    sentUserEmail: sentUserEmail,
    receivedUserEmail: receivedUserEmail,
  });
};

export const removeFriend = (sentUserEmail, receivedUserEmail) => {
  return api.put("/removeFriend/", {
    sentUserEmail: sentUserEmail,
    receivedUserEmail: receivedUserEmail,
  });
};

API_KEY = ENV['1c7007196cc83982ba328dc5430ec592-162d1f80-c371ade5']
API_URL = "https://api.mailgun.net/v3/sandbox3c1850ceca9c4f40acd62ef49894899b.mailgun.org"

export const sendEmail = () =>{
  return  apis.post( API_URL+"/messages",
  {from : "nikolaterranthe1@gamil.com",
  to : "tianrun.liu@stonybrook.edu",
  subject : "This is subject",
  text : "Text body",
  html : "<b>this is sent by router</b> version of the body!"})
}
const apis = {
  getLoggedIn,
  registerUser,
  createGuest,
  loginUser,
  logoutUser,
  changePassword,
  resetPassword,
  deleteAccount,
  searchUsers,
  findById,
  findByEmail,
  friendRequest,
  friend,
  removeFriendRequest,
  removeFriend,
  // ,
  // changePassword,
  // resetPassword,
  // deleteAccount
};

export default apis;
