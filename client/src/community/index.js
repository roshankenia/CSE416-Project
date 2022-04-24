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
        });
      }
      case GlobalCommunityActionType.SET_COMMUNITY: {
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
        });
      }
      case GlobalCommunityActionType.SET_SCREEN: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: payload,
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: auth.user,
          changeBioModal: community.changeBioModal,
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
          deletePostModal: payload,
          userProfile: community.userProfile,
          changeBioModal: community.changeBioModal,
        });
      }
      case GlobalCommunityActionType.SET_USER_PROFILE: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: community.currentCommunity,
          communityPosts: community.communityPosts,
          search: community.search,
          errorMessage: community.errorMessage,
          sort: community.sort,
          screen: "profile",
          deleteAccountModal: community.deleteAccountModal,
          changePasswordModal: community.changePasswordModal,
          feedbackModal: community.feedbackModal,
          deletePostModal: community.deletePostModal,
          userProfile: payload,
          changeBioModal: community.changeBioModal,
        });
      }
      case GlobalCommunityActionType.SET_CHANGE_BIO: {
        return setCommunity({
          communityList: community.communityList,
          currentCommunity: community.currentCommunity,
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
        });
      }
      default:
        return community;
    }
  };
  //hard coded for now
  community.setUserProfile = async function (user) {
    communityReducer({
      type: GlobalCommunityActionType.SET_USER_PROFILE,
      payload: user,
    });
  };
  community.setScreen = async function (screen) {
    communityReducer({
      type: GlobalCommunityActionType.SET_SCREEN,
      payload: screen,
    });
  };
  community.setCommunity = async function (community) {
    //first obtain all posts for this community
    let communityPosts = [];
    console.log(community);
    if (community == null) {
      communityReducer({
        type: GlobalCommunityActionType.SET_COMMUNITY,
        payload: {
          currentCommunity: null,
          communityPosts: null,
        },
      });
    } else {
      try {
        for (let i = 0; i < community.communityPosts.length; i++) {
          let postID = community.communityPosts[i];
          const response = await api.getPostById(postID);
          let post = response.data.post;
          if (post.postComic) {
            const comicResponse = await api.getComicById(post.postComic);
            console.log("comic:", comicResponse.data.comic);
            post.data = comicResponse.data.comic;
          }
          communityPosts.push(post);
        }
        console.log("posts found:", communityPosts);
        communityReducer({
          type: GlobalCommunityActionType.SET_COMMUNITY,
          payload: {
            currentCommunity: community.communityName,
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
  community.setDeletePost = async function (deletePost) {
    communityReducer({
      type: GlobalCommunityActionType.SET_DELETE_POST,
      payload: deletePost,
    });
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
