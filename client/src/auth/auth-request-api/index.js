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
  baseURL: "http://localhost:4000/auth",
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
export const logoutUser = () => api.get(`/logout/`);
export const registerUser = (
  firstName,
  lastName,
  email,
  password,
  passwordVerify,
  username
) => {
  console.log(process.env.PORT);
  return api.post(`/register/`, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    passwordVerify: passwordVerify,
    username: username,
  });
};

// @Jeff Hu front end request auth apis TO DO
export const changePassword = (username, currentPassword, newPassword, newPassVerify) => {
  return api.post('/changePassword/',{
    username: username,
    currentPassword: currentPassword,
    newPassword: newPassword,
    newPassVerify: newPassVerify
  });
};
export const resetPassword = (email) => {
  return api.post('/resetPassword/',{
    email: email
  });
};

export const deleteAccount = (username, password) => {
  return api.post('/deleteAccount/',{
    username: username,
    password: password
  });
}

const apis = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  resetPassword,
  deleteAccount
  // ,
  // changePassword,
  // resetPassword,
  // deleteAccount
};

export default apis;
