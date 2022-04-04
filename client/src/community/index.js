import { createContext, useContext, useState } from "react";
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
};

function GlobalCommunityContextProvider(props) {
  const [community, setCommunity] = useState({
    communityList: null,
    currentCommunity: null,
    search: null,
    errorMessage: null,
    sort: "newest date",
  });
  const history = useHistory();

  const { auth } = useContext(AuthContext);

  const communityReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GlobalCommunityActionType.CREATE_NEW_COMMUNITY: {
        return setCommunity({
          communityList: null,
          currentCommunity: payload,
        });
      }
      case GlobalCommunityActionType.GET_COMMUNITYLIST: {
        return setCommunity({
          communityList: payload,
          currentCommunity: null,
        });
      }
      case GlobalCommunityActionType.UPDATE_COMMUNITYLIST: {
        return setCommunity({
          communityList: payload,
          currentCommunity: null,
        });
      }
      //For testing purpose only
      case GlobalCommunityActionType.RESET: {
        return setCommunity({
          communityList: null,
          currentCommunity: null,
        });
      }
      case GlobalCommunityActionType.SET_COMMUNITY: {
        return setCommunity({
          communityList: payload,
        });
      }
      default:
        return community;
    }
  };
  //hard coded for now
  community.setCommunity = async function (name) {
    communityReducer({
      type: GlobalCommunityActionType.SET_COMMUNITY,
      payload: name,
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
          payload: community,
        });
        history.push("/community/" + community._id);
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
