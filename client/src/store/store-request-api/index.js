/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createTop5List = (newListName, newItems, userEmail, username) => {
  return api.post(`/top5list/`, {
    // SPECIFY THE PAYLOAD
    name: newListName,
    items: newItems,
    ownerEmail: userEmail,
    username: username,
    published: false,
    publishedDate: "none",
    comments: {},
    likes: [],
    dislikes: [],
    views: 0,
  });
};
export const deleteTop5ListById = (id) => api.delete(`/top5list/${id}`);
export const getTop5ListById = (id) => api.get(`/top5list/${id}`);
export const getTop5ListPairs = () => api.get(`/top5listpairs/`);
export const updateTop5ListById = (id, top5List) => {
  return api.put(`/top5list/${id}`, {
    // SPECIFY THE PAYLOAD
    top5List: top5List,
  });
};

export const updateTop5ListByIdWithoutUser = (id, top5List) => {
  return api.put(`/top5list/nouser/${id}`, {
    // SPECIFY THE PAYLOAD
    top5List: top5List,
  });
};

export const searchTop5List = (search, listView, username) =>
  api.post(`/search/top5list/`, {
    search: search,
    listView: listView,
    username: username,
  });

export const updateCommunityList = (id, communityList) => {
  return api.put(`/communitylist/${id}`, {
    // SPECIFY THE PAYLOAD
    top5List: communityList,
  });
};
export const createCommunityList = (newListName, newItems, updateDate) => {
  return api.post(`/communitylist/`, {
    // SPECIFY THE PAYLOAD
    name: newListName,
    items: newItems,
    updateDate: updateDate,
    comments: {},
    likes: [],
    dislikes: [],
    views: 0,
  });
};
export const deleteCommunityList = (id) => api.delete(`/communitylist/${id}`);

export const searchCommunityListByExactName = (search) =>
  api.post(`/search/communitylist/exact`, {
    search: search,
  });

export const searchCommunityListByStart = (search) =>
  api.post(`/search/communitylist/start`, {
    search: search,
  });

export const searchCommunityListByStartGuest = (search) =>
  api.post(`/search/communitylist/start/guest/`, {
    search: search,
  });
export const searchTop5ListGuest = (search, listView) =>
  api.post(`/search/top5list/guest/`, {
    search: search,
    listView: listView,
    username: null,
  });

const apis = {
  createTop5List,
  deleteTop5ListById,
  getTop5ListById,
  getTop5ListPairs,
  updateTop5ListById,
  searchTop5List,
  updateTop5ListByIdWithoutUser,
  updateCommunityList,
  createCommunityList,
  deleteCommunityList,
  searchCommunityListByExactName,
  searchCommunityListByStart,
  searchCommunityListByStartGuest,
  searchTop5ListGuest,
};

export default apis;
