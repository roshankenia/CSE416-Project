import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "./community-request-api";
import AuthContext from "../auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
  UPDATE_CURRENT_COMMUNITY: "UPDATE_CURRENT_COMMUNITY",
  SET_REPORT_MODAL: "SET_REPORT_MODAL",
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
    reportModal: false,
    reportPost: null,
    deletePost: null,
    searchPosts: null,
  });
  const [load, setLoad] = useState(false);
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
          deletePost: community.deletePost,
          searchPosts: payload.searchPosts,
        });
      }
      case GlobalCommunityActionType.UPDATE_CURRENT_COMMUNITY: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: payload,
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
          reportModal: community.reportModal,
          reportPost: community.reportPost,
          deletePost: community.deletePost,
          searchPosts: community.searchPosts,
        });
      }
      case GlobalCommunityActionType.SET_REPORT_MODAL: {
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
          reportModal: payload.openBoolean,
          reportPost: payload.post,
          deletePost: community.deletePost,
          searchPosts: community.searchPosts,
        });
      }
      default:
        return community;
    }
  };
  community.joinCommunity = async function (communityName) {
    try {
      let getCommunityResponse = await api.searchCommunity(communityName);
      if (getCommunityResponse.status == 200) {
        let communityToJoin = getCommunityResponse.data.communityList[0];
        console.log(communityToJoin);

        communityToJoin.communityMembers.push(auth.user.username);

        let updateCommunity = await api.updateCommunityById(
          communityToJoin._id,
          communityToJoin
        );

        if (updateCommunity.status == 201) {
          let newCurCom = updateCommunity.data.community;
          console.log(newCurCom);
          communityReducer({
            type: GlobalCommunityActionType.UPDATE_CURRENT_COMMUNITY,
            payload: newCurCom,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  community.leaveCommunity = async function (communityName) {
    try {
      let getCommunityResponse = await api.searchCommunity(communityName);
      if (getCommunityResponse.status == 200) {
        let communityToJoin = getCommunityResponse.data.communityList[0];
        console.log(communityToJoin);
        const index = communityToJoin.communityMembers.indexOf(
          auth.user.username
        );
        if (index > -1) {
          communityToJoin.communityMembers.splice(index, 1);
        }

        let updateCommunity = await api.updateCommunityById(
          communityToJoin._id,
          communityToJoin
        );

        if (updateCommunity.status == 201) {
          let newCurCom = updateCommunity.data.community;
          console.log(newCurCom);
          communityReducer({
            type: GlobalCommunityActionType.UPDATE_CURRENT_COMMUNITY,
            payload: newCurCom,
          });
        }
      }
    } catch (err) {
      console.log(err);
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
        community.communityPosts[i].postTitle.toLowerCase().startsWith(search) ||
        community.communityPosts[i].communityName.toLowerCase().startsWith(search)
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
    setLoad(true);
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
    setLoad(false);
  };
  community.setScreen = async function (screen) {
    setLoad(true);
    let communityPosts = [];
    if (screen == "discovery") {
      for (let j = 0; j < community.communityList.length; j++) {
        let curCumm = community.communityList[j];

        try {
          for (let i = 0; i < curCumm.communityPosts.length; i++) {
            let postID = curCumm.communityPosts[i];
            const response = await api.getPostById(postID);
            let post = response.data.post;

            // comments array isn't always filled with comment objects
            let commentsArr = post.comments;
            let commentsObjArr = []
            for (let i = 0; i < commentsArr.length; i++){
              if (commentsArr[i].username){
                // console.log(commentsArr[i])
                commentsObjArr.push(commentsArr[i]);
              } else {
                let getCommResponse = await api.getCommentByID(commentsArr[i]);
                commentsObjArr.push(getCommResponse.data.comment[0]);
              }
            }
            post.comments = commentsObjArr
            console.log(post.comments)

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

            // comments array isn't always filled with comment objects
            let commentsArr = post.comments;
            let commentsObjArr = []
            for (let i = 0; i < commentsArr.length; i++){
              if (commentsArr[i].username){
                // console.log(commentsArr[i])
                commentsObjArr.push(commentsArr[i]);
              } else {
                let getCommResponse = await api.getCommentByID(commentsArr[i]);
                commentsObjArr.push(getCommResponse.data.comment[0]);
              }
            }
            post.comments = commentsObjArr
            console.log(post.comments)

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

    setLoad(false);
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
    setLoad(true);
    //first obtain all posts for this community
    let communityPosts = [];
    console.log(setCommunity);
    if (setCommunity == null) {
      console.log("returning back to communities");
      console.log("update communities");
      try {
        const listResponse = await api.getCommunityList();
        console.log(
          "getCommunities response: " + listResponse.data.communityList
        );
        if (listResponse.status === 201) {
          let communityList = listResponse.data.communityList;
          communityReducer({
            type: GlobalCommunityActionType.SET_COMMUNITY,
            payload: {
              communityList: communityList,
              currentCommunity: null,
              communityPosts: null,
            },
          });
        } else {
          console.log("could not update community list");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        for (let i = 0; i < setCommunity.communityPosts.length; i++) {
          let postID = setCommunity.communityPosts[i];
          const response = await api.getPostById(postID);
          let post = response.data.post;

          // comments array isn't always filled with comment objects
          let commentsArr = post.comments;
          let commentsObjArr = []
          for (let i = 0; i < commentsArr.length; i++){
            if (commentsArr[i].username){
              // console.log(commentsArr[i])
              commentsObjArr.push(commentsArr[i]);
            } else {
              let getCommResponse = await api.getCommentByID(commentsArr[i]);
              commentsObjArr.push(getCommResponse.data.comment[0]);
            }
          }
          post.comments = commentsObjArr
          console.log(post.comments)

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
            currentCommunity: setCommunity,
            communityPosts: communityPosts,
          },
        });
      } catch (err) {
        console.log("could not obtain posts:", err);
      }
    }
    setLoad(false);
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

  community.updatePost = async function (updateType, post, payload, user) {
    try {
      if (updateType == "comment") {
        let commresponse = await api.createComment(
          user.username,
          payload,
          [],
          [],
          []
        )
        console.log("Create Comment Response", commresponse.data.comment)
        if (commresponse.status === 200){
          console.log("Comment Object successfully made")
          let commentArr = post.comments;
          commentArr.push(commresponse.data.comment)
          console.log("Updated comment array:", commentArr)
          let response = await api.updatePost(
            post._id,
            post.postTitle,
            post.postComic,
            post.postStory,
            post.likes,
            post.dislikes,
            commentArr,
            post.communityPublished,
            post.discoveryPublished,
            post.dateAndTime,
            post.communityName
          )
          console.log("Update Post Response:", response)
          if (response.status === 200){
            console.log("Comment added to post")
          } else {
            console.log("Comment was not added to post")
          }
        } else {
          console.log("Comment Object was not made.")
        }
      }
      else if (updateType == "like") {
        let likeArray = post.likes;
        let dislikeArray = post.dislikes;
        let likeIndex = likeArray.indexOf(user._id);
        let dislikeIndex = dislikeArray.indexOf(user._id);
        console.log(likeIndex)
        console.log(dislikeIndex)
        //If user has already disliked, then remove the dislike and change to like
        if (dislikeIndex != -1) {
          dislikeArray.splice(dislikeIndex);
        }
        //If user has not liked, then add their username
        if (likeIndex == -1) {
          likeArray.push(user._id);
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
          post.comments,
          post.communityPublished,
          post.discoveryPublished,
          post.dateAndTime,
          post.communityName
        );
        if (response.status === 200){
          console.log("Update Post Successful")

          //ATTEMPTING TO UPDATE JUST THE UPDATED POST ON THE SCREEN
          console.log(response)
          let newPost = response.data.post
          let newCommunityPosts = []
          for (let i = 0; i < community.communityPosts.length; i++){
            if (community.communityPosts[i]._id == newPost._id){
              console.log("found a match")
              newCommunityPosts.push(newPost)
            } else {
              newCommunityPosts.push(community.communityPosts[i])
            }
          }
          console.log(newCommunityPosts)
        }
      } else if (updateType == "dislike") {
        let likeArray = post.likes;
        let dislikeArray = post.dislikes;
        let likeIndex = likeArray.indexOf(user._id);
        let dislikeIndex = dislikeArray.indexOf(user._id);
        //If user has already liked, then remove the like and change to dislike
        if (likeIndex != -1) {
          likeArray.splice(likeIndex);
        }
        //If user has not disliked, then add their username
        if (dislikeIndex == -1) {
          dislikeArray.push(user._id);
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
          post.comments,
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
  community.setReportModal = async function (openBoolean, post) {
    communityReducer({
      type: GlobalCommunityActionType.SET_REPORT_MODAL,
      payload: {
        openBoolean: openBoolean,
        post: post,
      },
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
            currentCommunity: community,
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
                      community.currentCommunity.communityName
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
                        currentCommunity: curCommunity,
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
                      community.currentCommunity.communityName
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
                        currentCommunity: curCommunity,
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
                      community.currentCommunity.communityName
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
                        currentCommunity: curCommunity,
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
                      community.currentCommunity.communityName
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
                        currentCommunity: curCommunity,
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

  community.createReport = async function (userID, postID, report) {
    try{
      let response = await api.createReport(
        userID,
        postID,
        report
      );
      if (response.status === 200){
        console.log("Report Made!");
      } else {
        console.log("Create Report Reponses Status FAIL")
      }
    } catch (err) {
      console.log("Report not created.")
    }
    
  };

  return (
    <GlobalCommunityContext.Provider
      value={{
        community,
      }}
    >
      {props.children}
      <Modal open={load}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            p: 4,
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    </GlobalCommunityContext.Provider>
  );
}

export default GlobalCommunityContext;
export { GlobalCommunityContextProvider };
