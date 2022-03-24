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
  CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
  CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
  CREATE_NEW_LIST: "CREATE_NEW_LIST",
  LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
  MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
  UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
  SET_CURRENT_LIST: "SET_CURRENT_LIST",
  SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
  SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
  SET_IS_GUEST: "SET_IS_GUEST",
  SET_CURRENT_LISTS: "SET_CURRENT_LISTS",
  SET_LIST_VIEW: "SET_LIST_VIEW",
  SET_SORT: "SET_SORT",
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA Community
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalCommunityContextProvider(props) {
  // THESE ARE ALL THE THINGS OUR DATA Community WILL MANAGE
  const [Community, setCommunity] = useState({
    idNamePairs: [],
    currentList: null,
    newListCounter: 0,
    listNameActive: false,
    itemActive: false,
    listMarkedForDeletion: null,
    isGuest: false,
    listView: "yours",
    currentLists: null,
    search: null,
    errorMessage: null,
    sort: "newest date",
  });
  const history = useHistory();

  console.log("inside useGlobalCommunity");

  // SINCE WE'VE WRAPPED THE Community IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
  const { auth } = useContext(AuthContext);
  console.log("auth: " + auth);

  // HERE'S THE DATA Community'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const CommunityReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      default:
        return Community;
    }
  };

  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR Community AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.
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
