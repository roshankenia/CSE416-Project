import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "./community-request-api";
import AuthContext from "../auth";
/*
    This is our global data Community. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR Community
export const GlobalCommunityContext = createContext({});
console.log("create GlobalCommunityContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA Community STATE THAT CAN BE PROCESSED
export const GlobalCommunityActionType = {
  CREATE_NEW_COMMUNITY: "CREATE_NEW_COMMUNITY",
  GET_COMMUNITYLIST: "GET_COMMUNITYLIST",
  UPDATE_COMMUNITYLIST: "UPDATE_COMMUNITYLIST",
  RESET: "RESET",
  SET_COMMUNITY: "SET_COMMUNITY",
  SET_SCREEN: "SET_SCREEN",
  SET_DELETE_ACCOUNT: "SET_DELETE_ACCOUNT",
  SET_CHANGE_PASSWORD: "SET_CHANGE_PASSWORD",
  SET_FEEDBACK: "SET_FEEDBACK",
  SET_DELETE_POST: "SET_DELETE_POST",
  SET_USER_PROFILE: "SET_USER_PROFILE",
  SET_CHANGE_BIO: "SET_CHANGE_BIO",
  DELETE_POST: "DELETE_POST",
  SEARCH_POSTS: "SEARCH_POSTS",
  SORT_POSTS: "SORT_POSTS",
};

function GlobalCommunityContextProvider(props) {
  const { auth } = useContext(AuthContext);
  const [community, setCommunity] = useState({
    communityList: null,
    currentCommunity: null,
    communityPosts: null,
    search: null,
    errorMessage: null,
    sort: "newest date",
    screen: "communities",
    deleteAccountModal: false,
    changePasswordModal: false,
    feedbackModal: false,
    deletePostModal: false,
    userProfile: auth.user,
    changeBioModal: false,
    deletePost: null,
    searchPosts: null,
  });
  const history = useHistory();

  useEffect(() => {
    // call api or anything
    community.getCommunities();
  }, []);

  const communityReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GlobalCommunityActionType.CREATE_NEW_COMMUNITY: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: payload.currentCommunity,
          communityPosts: payload.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: payload.communityPosts,
        });
      }
      case GlobalCommunityActionType.GET_COMMUNITYLIST: {
        return setCommunity({
          communityList: payload,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: community.searchPosts,
        });
      }
      case GlobalCommunityActionType.UPDATE_COMMUNITYLIST: {
        return setCommunity({
          communityList: payload,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: community.searchPosts,
        });
      }
      //For testing purpose only
      case GlobalCommunityActionType.RESET: {
        return setCommunity({
          communityList: null,
          currentCommunity: null,
          communityPosts: null,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: community.searchPosts,
        });
      }
      case GlobalCommunityActionType.SET_COMMUNITY: {
        return setCommunity({
          communityList: payload.communityList,
          currentCommunity: payload.currentCommunity,
          communityPosts: payload.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: "communities",
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: payload.communityPosts,
        });
      }
      case GlobalCommunityActionType.SET_SCREEN: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: null,
          communityPosts: payload.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: payload.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: auth.user,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: payload.communityPosts,
        });
      }
      case GlobalCommunityActionType.SET_DELETE_ACCOUNT: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: payload,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: community.searchPosts,
        });
      }
      case GlobalCommunityActionType.SET_FEEDBACK: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: payload,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: community.searchPosts,
        });
      }
      case GlobalCommunityActionType.SET_CHANGE_PASSWORD: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: payload,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: community.searchPosts,
        });
      }
      case GlobalCommunityActionType.SET_DELETE_POST: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: payload.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: payload.deletePost,
          searchPosts: community.searchPosts,
        });
      }
      case GlobalCommunityActionType.SET_USER_PROFILE: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: null,
          communityPosts: payload.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: payload.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: payload.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: payload.communityPosts,
        });
      }
      case GlobalCommunityActionType.SET_CHANGE_BIO: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: payload,
          deletePost: community.deletePost,
          searchPosts: community.searchPosts,
        });
      }
      case GlobalCommunityActionType.DELETE_POST: {
        return setCommunity({
          communityList: payload.communityList,
          currentCommunity: community.currentCommunity,
          communityPosts: payload.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: false,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: null,
          searchPosts: payload.communityPosts,
        });
      }
      case GlobalCommunityActionType.SEARCH_POSTS: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: payload,
        });
      }
      case GlobalCommunityActionType.SORT_POSTS: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: payload.sort,
          screen: community.screen,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
          deletePost: community.deletePost,
          searchPosts: payload.searchPosts,
        });
      }
      default:
        return community;
    }
  };

  community.selectSort = async function (sort) {
    let currentPosts = community.searchPosts;

    let sortedPosts = await community.sortPosts(currentPosts, sort);
    
    console.log(sortedPosts);

    communityReducer({
      type: GlobalCommunityActionType.SORT_POSTS,
      payload: { sort: sort, searchPosts: sortedPosts },
    });
  };
  community.sortPosts = async function (currentPosts, sort) {
    let sortedPosts = currentPosts;

    if (sort === "comments") {
      sortedPosts = sortedPosts.sort(function (a, b) {
        if (a.comments.length > b.comments.length) {
          return -1;
        } else if (a.views < b.views) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sort === "likes") {
      sortedPosts = sortedPosts.sort(function (a, b) {
        if (a.likes.length > b.likes.length) {
          return -1;
        } else if (a.likes.length < b.likes.length) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sort === "dislikes") {
      sortedPosts = sortedPosts.sort(function (a, b) {
        if (a.dislikes.length > b.dislikes.length) {
          return -1;
        } else if (a.dislikes.length < b.dislikes.length) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sort === "newest date") {
      sortedPosts = sortedPosts.sort(function (a, b) {
        let d1 = Date.parse(a.dateAndTime);
        let d2 = Date.parse(b.dateAndTime);
        if (d1 > d2) {
          return -1;
        } else if (d1 < d2) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sort === "oldest date") {
      sortedPosts = sortedPosts.sort(function (a, b) {
        let d1 = Date.parse(a.dateAndTime);
        let d2 = Date.parse(b.dateAndTime);
        if (d1 > d2) {
          return 1;
        } else if (d1 < d2) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    return sortedPosts;
  };
  community.searchPostsUp = async function (search) {
    search = search.toLowerCase();
    let newCommunityPosts = [];
    for (let i = 0; i < community.communityPosts.length; i++) {
      if (
        community.communityPosts[i].postTitle.toLowerCase().startsWith(search)
      ) {
        newCommunityPosts.push(community.communityPosts[i]);
      }
    }
    console.log("search posts:", newCommunityPosts);
    communityReducer({
      type: GlobalCommunityActionType.SEARCH_POSTS,
      payload: newCommunityPosts,
    });
  };

  community.setUserProfile = async function (username) {
    try {
      let userResponse = await api.searchUserExact(username);
      if (userResponse.status == 200) {
        let newUser = userResponse.data.user;
        console.log("user found:", newUser);
        //now find all posts with this user
        let communityPosts = [];
        for (let j = 0; j < community.communityList.length; j++) {
          let curCumm = community.communityList[j];

          try {
            for (let i = 0; i < curCumm.communityPosts.length; i++) {
              let postID = curCumm.communityPosts[i];
              console.log("searching for post with id", postID);
              const response = await api.getPostById(postID);
              let post = response.data.post;
              if (post.postComic) {
                const comicResponse = await api.getComicById(post.postComic);
                console.log("comic:", comicResponse.data.comic);
                post.data = comicResponse.data.comic;
              } else if (post.postStory) {
                const storyResponse = await api.getStoryById(post.postStory);
                console.log("story:", storyResponse.data.story);
                post.data = storyResponse.data.story;
              }
              if (post.data.authors.includes(newUser.username)) {
                communityPosts.push(post);
              }
            }
            console.log("posts found:", communityPosts);

            communityReducer({
              type: GlobalCommunityActionType.SET_USER_PROFILE,
              payload: {
                userProfile: newUser,
                screen: "profile",
                communityPosts: communityPosts,
              },
            });
          } catch (err) {
            console.log("could not obtain posts:", err);
          }
        }
      } else {
        console.log(userResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };
  community.setScreen = async function (screen) {
    let communityPosts = [];
    if (screen == "discovery") {
      for (let j = 0; j < community.communityList.length; j++) {
        let curCumm = community.communityList[j];

        try {
          for (let i = 0; i < curCumm.communityPosts.length; i++) {
            let postID = curCumm.communityPosts[i];
            const response = await api.getPostById(postID);
            let post = response.data.post;
            if (post.postComic) {
              const comicResponse = await api.getComicById(post.postComic);
              console.log("comic:", comicResponse.data.comic);
              post.data = comicResponse.data.comic;
            } else if (post.postStory) {
              const storyResponse = await api.getStoryById(post.postStory);
              console.log("story:", storyResponse.data.story);
              post.data = storyResponse.data.story;
            }
            if (post.discoveryPublished) {
              communityPosts.push(post);
            }
          }
          console.log("posts found:", communityPosts);
        } catch (err) {
          console.log("could not obtain posts:", err);
        }
      }
    } else if (screen == "profile") {
      for (let j = 0; j < community.communityList.length; j++) {
        let curCumm = community.communityList[j];

        try {
          for (let i = 0; i < curCumm.communityPosts.length; i++) {
            let postID = curCumm.communityPosts[i];
            const response = await api.getPostById(postID);
            let post = response.data.post;
            if (post.postComic) {
              const comicResponse = await api.getComicById(post.postComic);
              console.log("comic:", comicResponse.data.comic);
              post.data = comicResponse.data.comic;
            } else if (post.postStory) {
              const storyResponse = await api.getStoryById(post.postStory);
              console.log("story:", storyResponse.data.story);
              post.data = storyResponse.data.story;
            }
            if (post.data.authors.includes(auth.user.username)) {
              communityPosts.push(post);
            }
          }
          console.log("posts found:", communityPosts);
        } catch (err) {
          console.log("could not obtain posts:", err);
        }
      }
    }

    console.log("community posts are:", communityPosts);
    communityReducer({
      type: GlobalCommunityActionType.SET_SCREEN,
      payload: { screen: screen, communityPosts: communityPosts },
    });
  };
  community.getCommunityFromPost = async function (communityName) {
    try {
      let communitySearchResponse = await api.searchCommunity(communityName);
      if (communitySearchResponse.status == 200) {
        let currentCommunity = communitySearchResponse.data.communityList[0];
        community.setCommunity(currentCommunity);
      } else {
        console.log(communitySearchResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };
  community.setCommunity = async function (setCommunity) {
    //first obtain all posts for this community
    let communityPosts = [];
    console.log(setCommunity);
    if (setCommunity == null) {
      console.log("returning back to communities");
      communityReducer({
        type: GlobalCommunityActionType.SET_COMMUNITY,
        payload: {
          communityList: community.communityList,
          currentCommunity: null,
          communityPosts: null,
        },
      });
    } else {
      try {
        for (let i = 0; i < setCommunity.communityPosts.length; i++) {
          let postID = setCommunity.communityPosts[i];
          const response = await api.getPostById(postID);
          let post = response.data.post;
          if (post.postComic) {
            const comicResponse = await api.getComicById(post.postComic);
            console.log("comic:", comicResponse.data.comic);
            post.data = comicResponse.data.comic;
          } else if (post.postStory) {
            const storyResponse = await api.getStoryById(post.postStory);
            console.log("story:", storyResponse.data.story);
            post.data = storyResponse.data.story;
          }
          communityPosts.push(post);
        }
        console.log("posts found:", communityPosts);
        communityReducer({
          type: GlobalCommunityActionType.SET_COMMUNITY,
          payload: {
            communityList: community.communityList,
            currentCommunity: setCommunity.communityName,
            communityPosts: communityPosts,
          },
        });
      } catch (err) {
        console.log("could not obtain posts:", err);
      }
    }
  };
  community.setDeleteAccount = async function (deleteAccount) {
    communityReducer({
      type: GlobalCommunityActionType.SET_DELETE_ACCOUNT,
      payload: deleteAccount,
    });
  };
  community.setDeletePost = async function (deletePostModal, deletePost) {
    communityReducer({
      type: GlobalCommunityActionType.SET_DELETE_POST,
      payload: { deletePostModal: deletePostModal, deletePost: deletePost },
    });
  };

  community.updatePost = async function (updateType, post, userID) {
    try {
      if (updateType == "like") {
        let likeArray = post.likes;
        let dislikeArray = post.dislikes;
        let likeIndex = likeArray.indexOf(userID);
        let dislikeIndex = dislikeArray.indexOf(userID);
        //If user has already disliked, then remove the dislike and change to like
        if (dislikeIndex != -1) {
          dislikeArray.splice(dislikeIndex);
        }
        //If user has not liked, then add their username
        if (likeIndex == -1) {
          likeArray.push(userID);
          console.log("pushed user to like Array");
        }
        //If user has liked, then remove their like and username
        else {
          likeArray.splice(likeIndex);
        }
        let response = await api.updatePost(
          post._id,
          post.postTitle,
          post.postComic,
          post.postStory,
          likeArray,
          dislikeArray,
          post.communityPublished,
          post.discoveryPublished,
          post.dateAndTime,
          post.communityName
        );
        console.log("Like reponse: ", response);
      } else if (updateType == "dislike") {
        let likeArray = post.likes;
        let dislikeArray = post.dislikes;
        let likeIndex = likeArray.indexOf(userID);
        let dislikeIndex = dislikeArray.indexOf(userID);
        //If user has already liked, then remove the like and change to dislike
        if (likeIndex != -1) {
          likeArray.splice(likeIndex);
        }
        //If user has not disliked, then add their username
        if (dislikeIndex == -1) {
          dislikeArray.push(userID);
        }
        //If user has disliked, then remove their dislike and username
        else {
          dislikeArray.splice(dislikeIndex);
        }
        let response = await api.updatePost(
          post._id,
          post.postTitle,
          post.postComic,
          post.postStory,
          likeArray,
          dislikeArray,
          post.communityPublished,
          post.discoveryPublished,
          post.dateAndTime,
          post.communityName
        );
        console.log("Dislike reponse: ", response);
      } else {
        console.log("Update Type not given or invalid!");
      }
    } catch {
      console.log("FAILED TO UPDATE POST");
    }
  };

  community.removePost = async function () {
    try {
      //first delete comic
      let post = community.deletePost;
      if (post.postComic) {
        let comicResponse = await api.deleteComicById(post.postComic);
        if (comicResponse.status == 201) {
          //next delete post
          let postResponse = await api.deletePostById(post._id);
          if (postResponse.status == 201) {
            //delete postID from community
            let comResponse = await api.searchCommunityByName(
              post.communityName
            );
            console.log("Search Comm By Name returns: ", comResponse);
            if (comResponse.status === 200) {
              console.log("Found designated community");
              console.log(post._id);
              let newComm = comResponse.data.communityList[0];
              console.log(newComm);

              const index = newComm.communityPosts.indexOf(post._id);
              if (index > -1) {
                newComm.communityPosts.splice(index, 1); // 2nd parameter means remove one item only
              }
              let updateResponse = await api.updateCommunityById(
                newComm._id,
                newComm
              );
              if (updateResponse.status === 201) {
                //update posts
                const listResponse = await api.getCommunityList();
                console.log(
                  "getCommunities response: " + listResponse.data.communityList
                );
                if (listResponse.status === 201) {
                  let communityList = listResponse.data.communityList;

                  let communityPosts = [];
                  for (let j = 0; j < communityList.length; j++) {
                    let curCumm = communityList[j];

                    try {
                      for (let i = 0; i < curCumm.communityPosts.length; i++) {
                        let postID = curCumm.communityPosts[i];
                        const response = await api.getPostById(postID);
                        let post = response.data.post;
                        if (post.postComic) {
                          const comicResponse = await api.getComicById(
                            post.postComic
                          );
                          console.log("comic:", comicResponse.data.comic);
                          post.data = comicResponse.data.comic;
                        } else if (post.postStory) {
                          const storyResponse = await api.getStoryById(
                            post.postStory
                          );
                          console.log("story:", storyResponse.data.story);
                          post.data = storyResponse.data.story;
                        }
                        if (post.data.authors.includes(auth.user.username)) {
                          communityPosts.push(post);
                        }
                      }
                      console.log("posts found:", communityPosts);

                      communityReducer({
                        type: GlobalCommunityActionType.DELETE_POST,
                        payload: {
                          communityPosts: communityPosts,
                          communityList: communityList,
                        },
                      });
                    } catch (err) {
                      console.log("could not obtain posts:", err);
                    }
                  }
                }
              }
            }
          }
        }
      } else if (post.postStory) {
        let storyResponse = await api.deleteStoryById(post.postStory);
        if (storyResponse.status == 201) {
          //next delete post
          let postResponse = await api.deletePostById(post._id);
          if (postResponse.status == 201) {
            //delete postID from community
            let comResponse = await api.searchCommunityByName(
              post.communityName
            );
            console.log("Search Comm By Name returns: ", comResponse);
            if (comResponse.status === 200) {
              console.log("Found designated community");
              console.log(post._id);
              let newComm = comResponse.data.communityList[0];
              console.log(newComm);

              const index = newComm.communityPosts.indexOf(post._id);
              if (index > -1) {
                newComm.communityPosts.splice(index, 1); // 2nd parameter means remove one item only
              }
              let updateResponse = await api.updateCommunityById(
                newComm._id,
                newComm
              );
              if (updateResponse.status === 201) {
                //update posts
                const listResponse = await api.getCommunityList();
                console.log(
                  "getCommunities response: " + listResponse.data.communityList
                );
                if (listResponse.status === 201) {
                  let communityList = listResponse.data.communityList;

                  let communityPosts = [];
                  for (let j = 0; j < communityList.length; j++) {
                    let curCumm = communityList[j];

                    try {
                      for (let i = 0; i < curCumm.communityPosts.length; i++) {
                        let postID = curCumm.communityPosts[i];
                        const response = await api.getPostById(postID);
                        let post = response.data.post;
                        if (post.postComic) {
                          const comicResponse = await api.getComicById(
                            post.postComic
                          );
                          console.log("comic:", comicResponse.data.comic);
                          post.data = comicResponse.data.comic;
                        } else if (post.postStory) {
                          const storyResponse = await api.getStoryById(
                            post.postStory
                          );
                          console.log("story:", storyResponse.data.story);
                          post.data = storyResponse.data.story;
                        }
                        if (post.data.authors.includes(auth.user.username)) {
                          communityPosts.push(post);
                        }
                      }
                      console.log("posts found:", communityPosts);

                      communityReducer({
                        type: GlobalCommunityActionType.DELETE_POST,
                        payload: {
                          communityPosts: communityPosts,
                          communityList: communityList,
                        },
                      });
                    } catch (err) {
                      console.log("could not obtain posts:", err);
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  community.setChangePassword = async function (changePassword) {
    communityReducer({
      type: GlobalCommunityActionType.SET_CHANGE_PASSWORD,
      payload: changePassword,
    });
  };
  community.setChangeBio = async function (changeBio) {
    communityReducer({
      type: GlobalCommunityActionType.SET_CHANGE_BIO,
      payload: changeBio,
    });
  };
  community.setFeedback = async function (feedback) {
    communityReducer({
      type: GlobalCommunityActionType.SET_FEEDBACK,
      payload: feedback,
    });
  };
  community.createNewCommunity = async function (name) {
    try {
      const response = await api.createCommunity(name, [auth.user.username]);
      console.log("createNewCommunity response: " + response);
      if (response.status === 201) {
        let community = response.data.community;
        communityReducer({
          type: GlobalCommunityActionType.CREATE_NEW_COMMUNITY,
          payload: {
            currentCommunity: community.communityName,
            communityPosts: [],
          },
        });
      }
    } catch {
      console.log("API FAILED TO CREATE A NEW COMMUNITY");
    }
  };

  community.getCommunities = async function () {
    try {
      const response = await api.getCommunityList();
      console.log("getCommunities response: " + response.data.communityList);
      if (response.status === 201) {
        communityReducer({
          type: GlobalCommunityActionType.GET_COMMUNITYLIST,
          payload: response.data.communityList,
        });
        console.log(community.communityList);
      }
    } catch {
      console.log("API FAILED TO GET ALL THE COMMUNITIES");
    }
  };

  community.reset = function () {
    communityReducer({
      type: GlobalCommunityActionType.RESET,
      payload: community,
    });
  };
  //#region join/leave
  /* Both Join and Leave function require you to pass an id to the param
   * @Terran
   */
  community.join = async function (id) {
    try {
      let target = community.communityList.filter((c) => c._id === id);
      let index = community.communityList.indexOf(target);
      target[0].communityMembers.push(auth.user.username);
      community.communityList[index] = target[0];
      //trigger immediate re-render
      setCommunity({
        communityList: community.communityList,
        currentCommunity: null,
      });
      const response = await api.updateCommunityById(id, target[0]);
      if (response.status === 201) {
        console.log("JOIN SUCCESS");
      }
    } catch {
      console.log("FAILED TO JOIN THE COMMUNITIES");
    }
  };
  community.leave = async function (id) {
    try {
      let target = community.communityList.filter((c) => c._id === id);
      let index = community.communityList.indexOf(target);
      target[0].communityMembers = target[0].communityMembers.filter(
        (n) => n !== auth.user.username
      );
      community.communityList[index] = target[0];
      //trigger immediate re-render
      setCommunity({
        communityList: community.communityList,
        currentCommunity: null,
      });
      const response = await api.updateCommunityById(id, target[0]);
      if (response.status === 201) {
        console.log("LEAVE SUCCESS");
      }
    } catch {
      console.log("FAILED TO LEAVE THE COMMUNITIES");
    }
  };
  //#endregion

  /* This will probably never make into the app
     just for testing purposes
     -@Terran
  */
  community.deleteCommunity = async function (name) {
    try {
      const response = await api.deleteCommunity(name);
      console.log("deleteCommunity response: " + response);
      if (response.status === 201) {
        communityReducer({
          type: GlobalCommunityActionType.RESET,
          payload: null,
        });
        history.push("/");
      }
    } catch {
      console.log("API FAILED TO DELETE THE COMMUNITY");
    }
  };

  community.makePost = async function (voteVal, title, dateTime, game) {
    if (game.gamemode == "comic") {
      let response = await api.createComic(game.players, game.panels);
      if (response.status === 200) {
        console.log("Made comic: ", response.data.comic);
        let comicID = response.data.comic._id;
        if (voteVal == "comm") {
          let postResponse = await api.createPost(
            title,
            comicID,
            null,
            [],
            [],
            true,
            false,
            dateTime,
            game.communityName
          );
          if (postResponse.status === 200) {
            console.log("Made post: ", postResponse.data.post);
            let postID = postResponse.data.post._id;
            let comResponse = await api.searchCommunityByName(
              game.communityName
            );
            console.log("Search Comm By Name returns: ", comResponse);
            if (comResponse.status === 200) {
              console.log("Found designated community");
              console.log(postID);
              let newComm = comResponse.data.communityList[0];
              console.log(newComm);
              newComm.communityPosts.push(postID);
              let updateResponse = await api.updateCommunityById(
                newComm._id,
                newComm
              );
              if (updateResponse.status === 201) {
                //update posts
                const listResponse = await api.getCommunityList();
                console.log(
                  "getCommunities response: " + listResponse.data.communityList
                );
                if (listResponse.status === 201) {
                  let communityList = listResponse.data.communityList;

                  let curCommunity = null;
                  let communityPosts = [];

                  for (let k = 0; k < communityList.length; k++) {
                    if (
                      communityList[k].communityName ==
                      community.currentCommunity
                    ) {
                      curCommunity = communityList[k];
                    }
                  }

                  try {
                    for (
                      let i = 0;
                      i < curCommunity.communityPosts.length;
                      i++
                    ) {
                      let postID = curCommunity.communityPosts[i];
                      const response = await api.getPostById(postID);
                      let post = response.data.post;
                      if (post.postComic) {
                        const comicResponse = await api.getComicById(
                          post.postComic
                        );
                        console.log("comic:", comicResponse.data.comic);
                        post.data = comicResponse.data.comic;
                      } else if (post.postStory) {
                        const storyResponse = await api.getStoryById(
                          post.postStory
                        );
                        console.log("story:", storyResponse.data.story);
                        post.data = storyResponse.data.story;
                      }
                      communityPosts.push(post);
                    }
                    console.log("posts found:", communityPosts);
                    communityReducer({
                      type: GlobalCommunityActionType.SET_COMMUNITY,
                      payload: {
                        currentCommunity: curCommunity.communityName,
                        communityPosts: communityPosts,
                        communityList: communityList,
                      },
                    });
                  } catch (err) {
                    console.log("could not obtain posts:", err);
                  }
                }
              }
            }
          }
        } else if (voteVal == "commdis") {
          let postResponse = await api.createPost(
            title,
            comicID,
            null,
            [],
            [],
            true,
            true,
            dateTime,
            game.communityName
          );
          if (postResponse.status === 200) {
            console.log("Made post: ", postResponse.data.post);
            let postID = postResponse.data.post._id;
            let comResponse = await api.searchCommunityByName(
              game.communityName
            );
            console.log("Search Comm By Name returns: ", comResponse);
            if (comResponse.status === 200) {
              console.log("Found designated community");
              console.log(postID);
              let newComm = comResponse.data.communityList[0];
              console.log(newComm);
              newComm.communityPosts.push(postID);
              let updateResponse = await api.updateCommunityById(
                newComm._id,
                newComm
              );
              if (updateResponse.status === 201) {
                //update posts
                const listResponse = await api.getCommunityList();
                console.log(
                  "getCommunities response: " + listResponse.data.communityList
                );
                if (listResponse.status === 201) {
                  let communityList = listResponse.data.communityList;

                  let curCommunity = null;
                  let communityPosts = [];

                  for (let k = 0; k < communityList.length; k++) {
                    if (
                      communityList[k].communityName ==
                      community.currentCommunity
                    ) {
                      curCommunity = communityList[k];
                    }
                  }

                  try {
                    for (
                      let i = 0;
                      i < curCommunity.communityPosts.length;
                      i++
                    ) {
                      let postID = curCommunity.communityPosts[i];
                      const response = await api.getPostById(postID);
                      let post = response.data.post;
                      if (post.postComic) {
                        const comicResponse = await api.getComicById(
                          post.postComic
                        );
                        console.log("comic:", comicResponse.data.comic);
                        post.data = comicResponse.data.comic;
                      } else if (post.postStory) {
                        const storyResponse = await api.getStoryById(
                          post.postStory
                        );
                        console.log("story:", storyResponse.data.story);
                        post.data = storyResponse.data.story;
                      }
                      communityPosts.push(post);
                    }
                    console.log("posts found:", communityPosts);
                    communityReducer({
                      type: GlobalCommunityActionType.SET_COMMUNITY,
                      payload: {
                        currentCommunity: curCommunity.communityName,
                        communityPosts: communityPosts,
                        communityList: communityList,
                      },
                    });
                  } catch (err) {
                    console.log("could not obtain posts:", err);
                  }
                }
              }
            }
          }
        }
      }
    } else if (game.gamemode == "story") {
      let response = await api.createStory(game.players, game.panels);
      if (response.status === 200) {
        console.log("Made story: ", response.data.story);
        let storyID = response.data.story._id;
        if (voteVal == "comm") {
          let postResponse = await api.createPost(
            title,
            null,
            storyID,
            [],
            [],
            true,
            false,
            dateTime,
            game.communityName
          );
          if (postResponse.status === 200) {
            console.log("Made post: ", postResponse.data.post);
            let postID = postResponse.data.post._id;
            let comResponse = await api.searchCommunityByName(
              game.communityName
            );
            console.log("Search Comm By Name returns: ", comResponse);
            if (comResponse.status === 200) {
              console.log("Found designated community");
              console.log(postID);
              let newComm = comResponse.data.communityList[0];
              console.log(newComm);
              newComm.communityPosts.push(postID);
              let updateResponse = await api.updateCommunityById(
                newComm._id,
                newComm
              );
              if (updateResponse.status === 201) {
                //update posts
                const listResponse = await api.getCommunityList();
                console.log(
                  "getCommunities response: " + listResponse.data.communityList
                );
                if (listResponse.status === 201) {
                  let communityList = listResponse.data.communityList;

                  let curCommunity = null;
                  let communityPosts = [];

                  for (let k = 0; k < communityList.length; k++) {
                    if (
                      communityList[k].communityName ==
                      community.currentCommunity
                    ) {
                      curCommunity = communityList[k];
                    }
                  }

                  try {
                    for (
                      let i = 0;
                      i < curCommunity.communityPosts.length;
                      i++
                    ) {
                      let postID = curCommunity.communityPosts[i];
                      const response = await api.getPostById(postID);
                      let post = response.data.post;
                      if (post.postComic) {
                        const comicResponse = await api.getComicById(
                          post.postComic
                        );
                        console.log("comic:", comicResponse.data.comic);
                        post.data = comicResponse.data.comic;
                      } else if (post.postStory) {
                        const storyResponse = await api.getStoryById(
                          post.postStory
                        );
                        console.log("story:", storyResponse.data.story);
                        post.data = storyResponse.data.story;
                      }
                      communityPosts.push(post);
                    }
                    console.log("posts found:", communityPosts);
                    communityReducer({
                      type: GlobalCommunityActionType.SET_COMMUNITY,
                      payload: {
                        currentCommunity: curCommunity.communityName,
                        communityPosts: communityPosts,
                        communityList: communityList,
                      },
                    });
                  } catch (err) {
                    console.log("could not obtain posts:", err);
                  }
                }
              }
            }
          }
        } else if (voteVal == "commdis") {
          let postResponse = await api.createPost(
            title,
            null,
            storyID,
            [],
            [],
            true,
            true,
            dateTime,
            game.communityName
          );
          if (postResponse.status === 200) {
            console.log("Made post: ", postResponse.data.post);
            let postID = postResponse.data.post._id;
            let comResponse = await api.searchCommunityByName(
              game.communityName
            );
            console.log("Search Comm By Name returns: ", comResponse);
            if (comResponse.status === 200) {
              console.log("Found designated community");
              console.log(postID);
              let newComm = comResponse.data.communityList[0];
              console.log(newComm);
              newComm.communityPosts.push(postID);
              let updateResponse = await api.updateCommunityById(
                newComm._id,
                newComm
              );
              if (updateResponse.status === 201) {
                //update posts
                const listResponse = await api.getCommunityList();
                console.log(
                  "getCommunities response: " + listResponse.data.communityList
                );
                if (listResponse.status === 201) {
                  let communityList = listResponse.data.communityList;

                  let curCommunity = null;
                  let communityPosts = [];

                  for (let k = 0; k < communityList.length; k++) {
                    if (
                      communityList[k].communityName ==
                      community.currentCommunity
                    ) {
                      curCommunity = communityList[k];
                    }
                  }

                  try {
                    for (
                      let i = 0;
                      i < curCommunity.communityPosts.length;
                      i++
                    ) {
                      let postID = curCommunity.communityPosts[i];
                      const response = await api.getPostById(postID);
                      let post = response.data.post;
                      if (post.postComic) {
                        const comicResponse = await api.getComicById(
                          post.postComic
                        );
                        console.log("comic:", comicResponse.data.comic);
                        post.data = comicResponse.data.comic;
                      } else if (post.postStory) {
                        const storyResponse = await api.getStoryById(
                          post.postStory
                        );
                        console.log("story:", storyResponse.data.story);
                        post.data = storyResponse.data.story;
                      }
                      communityPosts.push(post);
                    }
                    console.log("posts found:", communityPosts);
                    communityReducer({
                      type: GlobalCommunityActionType.SET_COMMUNITY,
                      payload: {
                        currentCommunity: curCommunity.communityName,
                        communityPosts: communityPosts,
                        communityList: communityList,
                      },
                    });
                  } catch (err) {
                    console.log("could not obtain posts:", err);
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <GlobalCommunityContext.Provider
      value={{
        community,
      }}
    >
      {props.children}
    </GlobalCommunityContext.Provider>
  );
}

export default GlobalCommunityContext;
export { GlobalCommunityContextProvider };
