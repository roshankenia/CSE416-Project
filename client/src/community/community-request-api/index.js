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
  baseURL: "https://cse-416-jart.herokuapp.com/api",
});

export const createCommunity = (name, members) => {
  return api.post(`/community`, {
    communityName: name,
    communityMembers: members,
  });
};

export const getCommunityList = () => {
  return api.get(`/communitylist`, {});
};

export const updateCommunityById = (id, community) => {
  return api.put(`/community/${id}`, {
    community: community,
  });
};

export const deleteCommunity = (name) => {
  return api.post(`/deletecommunity`, {
    communityName: name,
  });
};

export const getPostById = (id) => {
  return api.get(`/post/${id}`);
};

export const getComicById = (id) => {
  return api.get(`/comic/${id}`);
};

export const getStoryById = (id) => {
  return api.get(`/story/${id}`);
};

export const getCommentByID = (id) => {
  return api.get(`/comment/${id}`);
};

export const createComic = (authors, panels) => {
  return api.post(`/comic`, {
    authors: authors,
    panels: panels,
  });
};

export const createStory = (authors, panels) => {
  return api.post(`/story`, {
    authors: authors,
    panels: panels,
  });
};

export const deleteComicById = (id) => {
  return api.delete(`/comic/${id}`);
};
export const deleteStoryById = (id) => {
  return api.delete(`/story/${id}`);
};
export const deletePostById = (id) => {
  return api.delete(`/post/${id}`);
};

export const searchCommunity = (name) => {
  return api.get(`/searchcommunitybyname/${name}`);
};

export const createPost = (
  postTitle,
  postComic,
  postStory,
  likes,
  dislikes,
  comments,
  communityPublished,
  discoveryPublished,
  dateAndTime,
  communityName
) => {
  return api.post(`/post`, {
    postTitle: postTitle,
    postComic: postComic,
    postStory: postStory,
    likes: likes,
    dislikes: dislikes,
    comments: comments,
    communityPublished: communityPublished,
    discoveryPublished: discoveryPublished,
    dateAndTime: dateAndTime,
    communityName: communityName,
  });
};

export const updatePost = (
  id,
  postTitle,
  postComic,
  postStory,
  likes,
  dislikes,
  comments,
  communityPublished,
  discoveryPublished,
  dateAndTime,
  communityName
) => {
  return api.put(`/post/${id}`, {
    postTitle: postTitle,
    postComic: postComic,
    postStory: postStory,
    likes: likes,
    dislikes: dislikes,
    comments: comments,
    communityPublished: communityPublished,
    discoveryPublished: discoveryPublished,
    dateAndTime: dateAndTime,
    communityName: communityName,
  });
};

export const updateStoryById = (id, authors, panels) =>{
  return api.put(`/story/${id}`, {comic: {authors: authors, panels: panels}})
}

export const createComment = (
  username,
  comment,
  likes,
  dislikes,
  reply,
) => {
  return api.post(`/comment`, {
    username: username,
    comment: comment,
    likes: likes,
    dislikes: dislikes,
    reply: reply,
  });
};

export const searchCommunityByName = (name) => {
  return api.get(`/searchcommunitybyname/${name}`);
};

export const searchUserExact = (username) => {
  return api.post("/searchUserExact/", {
    username: username,
  });
};

export const sendFeedback = (
  userID,
  username,
  feedback,
) => {
  return api.post(`/feedback`, {
    userID: userID,
    username: username,
    feedback: feedback
  });
};

export const createReport = (
  userID,
  postID,
  username,
  postTitle,
  postCommunity,
  report,
) => {
  return api.post(`/report`, {
    userID: userID,
    postID: postID,
    username: username,
    postTitle: postTitle,
    postCommunity: postCommunity,
    report: report
  });
};

export const updateCommentById = (
  id,
  username,
  comment,
  likes,
  dislikes,
) => {
  console.log("In request API")
  return api.put(`/comment/${id}`, {
    username: username,
    comment: comment,
    likes: likes,
    dislikes: dislikes,
  });
};

export const updateBio = (
  username,
  bio
) => {
  return api.post("/updateBio/", {
    username: username,
    bio: bio
  })
}

const apis = {
  updateBio,
  createCommunity,
  getCommunityList,
  updateCommunityById,
  createComic,
  createPost,
  searchCommunityByName,
  updateStoryById,
  // for testing purpose
  deleteCommunity,
  getPostById,
  updatePost,
  getComicById,
  getStoryById,
  deleteComicById,
  deleteStoryById,
  deletePostById,
  createStory,
  searchUserExact,
  searchCommunity,
  createComment,
  getCommentByID,
  createReport,
  updateCommentById,
  sendFeedback
};

export default apis;

/*
    Below this comment are the legacy stuffs
    @Terran
*/
// export const deleteTop5ListById = (id) => api.delete(`/top5list/${id}`);
// export const getTop5ListById = (id) => api.get(`/top5list/${id}`);
// export const getTop5ListPairs = () => api.get(`/top5listpairs/`);
// export const updateTop5ListById = (id, top5List) => {
//   return api.put(`/top5list/${id}`, {
//     // SPECIFY THE PAYLOAD
//     top5List: top5List,
//   });
// };

// export const updateTop5ListByIdWithoutUser = (id, top5List) => {
//   return api.put(`/top5list/nouser/${id}`, {
//     // SPECIFY THE PAYLOAD
//     top5List: top5List,
//   });
// };

// export const searchTop5List = (search, listView, username) =>
//   api.post(`/search/top5list/`, {
//     search: search,
//     listView: listView,
//     username: username,
//   });

// export const updateCommunityList = (id, communityList) => {
//   return api.put(`/communitylist/${id}`, {
//     // SPECIFY THE PAYLOAD
//     top5List: communityList,
//   });
// };
// export const createCommunityList = (newListName, newItems, updateDate) => {
//   return api.post(`/communitylist/`, {
//     // SPECIFY THE PAYLOAD
//     name: newListName,
//     items: newItems,
//     updateDate: updateDate,
//     comments: {},
//     likes: [],
//     dislikes: [],
//     views: 0,
//   });
// };
// export const deleteCommunityList = (id) => api.delete(`/communitylist/${id}`);

// export const searchCommunityListByExactName = (search) =>
//   api.post(`/search/communitylist/exact`, {
//     search: search,
//   });

// export const searchCommunityListByStart = (search) =>
//   api.post(`/search/communitylist/start`, {
//     search: search,
//   });

// export const searchCommunityListByStartGuest = (search) =>
//   api.post(`/search/communitylist/start/guest/`, {
//     search: search,
//   });
// export const searchTop5ListGuest = (search, listView) =>
//   api.post(`/search/top5list/guest/`, {
//     search: search,
//     listView: listView,
//     username: null,
//   });
