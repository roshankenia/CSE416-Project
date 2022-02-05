import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "./store-request-api";
import AuthContext from "../auth";
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
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

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
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

  console.log("inside useGlobalStore");

  // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
  const { auth } = useContext(AuthContext);
  console.log("auth: " + auth);

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.CHANGE_LIST_NAME: {
        return setStore({
          idNamePairs: payload.idNamePairs,
          currentList: payload.top5List,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: store.currentLists,
          search: store.search,
          sort: store.sort,
        });
      }
      // STOP EDITING THE CURRENT LIST
      case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: null,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: store.currentLists,
          search: store.search,
          sort: store.sort,
        });
      }
      // CREATE A NEW LIST
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter + 1,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: store.currentLists,
          search: store.search,
          sort: store.sort,
        });
      }
      // GET ALL THE LISTS SO WE CAN PRESENT THEM
      case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
        return setStore({
          idNamePairs: payload,
          currentList: null,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: store.currentLists,
          search: store.search,
          sort: store.sort,
        });
      }
      // PREPARE TO DELETE A LIST
      case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: null,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: payload,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: store.currentLists,
          search: store.search,
          sort: store.sort,
        });
      }
      // PREPARE TO DELETE A LIST
      case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: null,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: store.currentLists,
          search: store.search,
          sort: store.sort,
        });
      }
      // UPDATE A LIST
      case GlobalStoreActionType.SET_CURRENT_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: store.currentLists,
          search: store.search,
          sort: store.sort,
        });
      }
      // START EDITING A LIST ITEM
      case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: true,
          listMarkedForDeletion: null,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: store.currentLists,
          search: store.search,
          sort: store.sort,
        });
      }
      // START EDITING A LIST NAME
      case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter,
          isListNameEditActive: true,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: store.currentLists,
          search: store.search,
          sort: store.sort,
        });
      }

      case GlobalStoreActionType.SET_IS_GUEST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          isListNameEditActive: store.isListNameEditActive,
          isItemEditActive: store.isItemEditActive,
          listMarkedForDeletion: store.listMarkedForDeletion,
          isGuest: payload,
          listView: "yours",
          currentLists: null,
          search: store.search,
          sort: store.sort,
        });
      }

      case GlobalStoreActionType.SET_LIST_VIEW: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          isListNameEditActive: store.isListNameEditActive,
          isItemEditActive: store.isItemEditActive,
          listMarkedForDeletion: store.listMarkedForDeletion,
          isGuest: store.isGuest,
          listView: payload.view,
          currentLists: payload.top5Lists,
          search: payload.search,
          sort: store.sort,
        });
      }

      case GlobalStoreActionType.SET_CURRENT_LISTS: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          isListNameEditActive: store.isListNameEditActive,
          isItemEditActive: store.isItemEditActive,
          listMarkedForDeletion: null,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: payload.top5Lists,
          search: payload.search,
          sort: store.sort,
        });
      }

      case GlobalStoreActionType.SET_SORT: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          isListNameEditActive: store.isListNameEditActive,
          isItemEditActive: store.isItemEditActive,
          listMarkedForDeletion: store.listMarkedForDeletion,
          isGuest: store.isGuest,
          listView: store.listView,
          currentLists: payload.top5Lists,
          search: store.search,
          sort: payload.sort,
        });
      }
      default:
        return store;
    }
  };

  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

  store.sortLists = function (sort) {
    let sortedLists = store.sorted(store.currentLists, sort, store.listView);

    storeReducer({
      type: GlobalStoreActionType.SET_SORT,
      payload: { top5Lists: sortedLists, sort: sort },
    });
  };

  store.sorted = function (currentLists, sort, view) {
    console.log(view);
    console.log(sort);

    if (view === "community") {
      let sortedLists = currentLists;

      if (sort === "views") {
        sortedLists = sortedLists.sort(function (a, b) {
          if (a.views > b.views) {
            return -1;
          } else if (a.views < b.views) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sort === "likes") {
        sortedLists = sortedLists.sort(function (a, b) {
          if (a.likes.length > b.likes.length) {
            return -1;
          } else if (a.likes.length < b.likes.length) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sort === "dislikes") {
        sortedLists = sortedLists.sort(function (a, b) {
          if (a.dislikes.length > b.dislikes.length) {
            return -1;
          } else if (a.dislikes.length < b.dislikes.length) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sort === "newest date") {
        sortedLists = sortedLists.sort(function (a, b) {
          let d1 = Date.parse(a.updateDate);
          let d2 = Date.parse(b.updateDate);
          if (d1 > d2) {
            return -1;
          } else if (d1 < d2) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sort === "oldest date") {
        sortedLists = sortedLists.sort(function (a, b) {
          let d1 = Date.parse(a.updateDate);
          let d2 = Date.parse(b.updateDate);
          if (d1 > d2) {
            return 1;
          } else if (d1 < d2) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      return sortedLists;
    } else {
      let curLists = currentLists;
      let nonPublishedLists = [];
      let sortedLists = [];

      for (let i = 0; i < curLists.length; i++) {
        let curList = curLists[i];
        if (curList.published) {
          sortedLists.push(curList);
        } else {
          nonPublishedLists.push(curList);
        }
      }
      if (sort === "views") {
        sortedLists = sortedLists.sort(function (a, b) {
          if (a.views > b.views) {
            return -1;
          } else if (a.views < b.views) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sort === "likes") {
        sortedLists = sortedLists.sort(function (a, b) {
          if (a.likes.length > b.likes.length) {
            return -1;
          } else if (a.likes.length < b.likes.length) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sort === "dislikes") {
        sortedLists = sortedLists.sort(function (a, b) {
          if (a.dislikes.length > b.dislikes.length) {
            return -1;
          } else if (a.dislikes.length < b.dislikes.length) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sort === "newest date") {
        sortedLists = sortedLists.sort(function (a, b) {
          let d1 = Date.parse(a.publishedDate);
          let d2 = Date.parse(b.publishedDate);
          if (d1 > d2) {
            return -1;
          } else if (d1 < d2) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sort === "oldest date") {
        sortedLists = sortedLists.sort(function (a, b) {
          let d1 = Date.parse(a.publishedDate);
          let d2 = Date.parse(b.publishedDate);
          if (d1 > d2) {
            return 1;
          } else if (d1 < d2) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      sortedLists = sortedLists.concat(nonPublishedLists);
      return sortedLists;
    }
  };

  store.updateView = async function (view) {
    let search = "";
    console.log(view);

    if (view === "yours" || view === "all") {
      let response = null;

      if (store.isGuest) {
        response = await api.searchTop5ListGuest(search, view);
      } else {
        response = await api.searchTop5List(search, view, auth.user.username);
      }
      if (response.status === 200) {
        console.log(response.data.top5Lists);
        let sortedLists = store.sorted(
          response.data.top5Lists,
          store.sort,
          view
        );
        storeReducer({
          type: GlobalStoreActionType.SET_LIST_VIEW,
          payload: {
            top5Lists: sortedLists,
            search: search,
            view: view,
          },
        });
      } else {
        console.log(response);
      }
    } else if (view === "users") {
      storeReducer({
        type: GlobalStoreActionType.SET_LIST_VIEW,
        payload: {
          top5Lists: null,
          search: search,
          view: view,
        },
      });
    } else if (view === "community") {
      let response = null;
      if (store.isGuest) {
        response = await api.searchCommunityListByStartGuest(search);
      } else {
        response = await api.searchCommunityListByStart(search);
      }
      if (response.status === 200) {
        console.log(response.data.communityLists);
        let sortedLists = store.sorted(
          response.data.communityLists,
          store.sort,
          view
        );
        storeReducer({
          type: GlobalStoreActionType.SET_LIST_VIEW,
          payload: {
            top5Lists: sortedLists,
            search: search,
            view: view,
          },
        });
      } else {
        console.log(response);
      }
    }
  };

  store.changeView = async function (view) {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_VIEW,
      payload: view,
    });
  };

  store.saveList = async function (name, items) {
    store.currentList.name = name;
    store.currentList.items = items;
    store.updateCurrentList().then(() => history.push("/"));
  };

  store.publishList = async function (name, items) {
    console.log(store.currentList);
    store.currentList.name = name;
    store.currentList.items = items;
    store.currentList.published = true;
    var today = new Date();
    store.currentList.publishedDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    store.updateCurrentList().then(() => history.push("/"));
    store.addToCommunityList(name, items, store.currentList.publishedDate);
  };

  store.addToCommunityList = async function (name, items, updateDate) {
    let response = await api.searchCommunityListByExactName(name);

    let weightedItems = [];

    for (let i = 0; i < items.length; i++) {
      let weight = 5 - i;
      let item = items[i] + weight;
      weightedItems.push(item.toLowerCase());
    }

    if (response.status === 200) {
      if (response.data.communityLists.length !== 0) {
        let communityList = response.data.communityLists[0];
        for (let i = 0; i < weightedItems.length; i++) {
          communityList.items.push(weightedItems[i]);
        }
        communityList.updateDate = updateDate;
        let response2 = await api.updateCommunityList(
          communityList._id,
          communityList
        );
        if (response2.status === 200) {
          console.log("updated community list");
        } else {
          console.log(response2);
        }
      } else {
        let response2 = await api.createCommunityList(
          name,
          weightedItems,
          updateDate
        );
        if (response2.status === 200) {
          console.log("created community list");
        } else {
          console.log(response2);
        }
      }
    } else {
      console.log("NOT FOUND");
    }
  };

  store.removeFromCommunityList = async function (name, items) {
    let response = await api.searchCommunityListByExactName(name);
    let weightedItems = [];

    for (let i = 0; i < items.length; i++) {
      let weight = 5 - i;
      let item = items[i] + weight;
      weightedItems.push(item);
    }

    if (response.status === 200) {
      let communityList = response.data.communityLists[0];
      for (let i = 0; i < weightedItems.length; i++) {
        let index = communityList.items.indexOf(weightedItems[i]);
        communityList.items.splice(index, 1);
      }

      if (communityList.items.length === 0) {
        let response2 = api.deleteCommunityList(communityList._id);
        if (response2.status === 200) {
          console.log("deleted community list");
        } else {
          console.log(response2);
        }
      } else {
        let response2 = await api.updateCommunityList(
          communityList._id,
          communityList
        );
        if (response2.status === 200) {
          console.log("updated community list");
        } else {
          console.log(response2);
        }
      }
    }
  };

  store.newSearch = async function (search) {
    if (store.listView === "community") {
      if (store.isGuest) {
        let response = await api.searchCommunityListByStartGuest(search);
        if (response.status === 200) {
          console.log(response.data.communityLists);
          let sortedLists = store.sorted(
            response.data.communityLists,
            store.sort,
            store.listView
          );
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LISTS,
            payload: {
              top5Lists: sortedLists,
              search: search,
            },
          });
        } else {
          console.log(response);
        }
      } else {
        let response = await api.searchCommunityListByStart(search);
        if (response.status === 200) {
          console.log(response.data.communityLists);
          let sortedLists = store.sorted(
            response.data.communityLists,
            store.sort,
            store.listView
          );
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LISTS,
            payload: {
              top5Lists: sortedLists,
              search: search,
            },
          });
        } else {
          console.log(response);
        }
      }
    } else {
      if (store.isGuest) {
        let response = await api.searchTop5ListGuest(search, store.listView);
        if (response.status === 200) {
          console.log(response.data.top5Lists);
          let sortedLists = store.sorted(
            response.data.top5Lists,
            store.sort,
            store.listView
          );
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LISTS,
            payload: { top5Lists: sortedLists, search: search },
          });
        } else {
          console.log(response);
        }
      } else {
        let response = await api.searchTop5List(
          search,
          store.listView,
          auth.user.username
        );
        if (response.status === 200) {
          console.log(response.data.top5Lists);
          let sortedLists = store.sorted(
            response.data.top5Lists,
            store.sort,
            store.listView
          );
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LISTS,
            payload: { top5Lists: sortedLists, search: search },
          });
        } else {
          console.log(response);
        }
      }
    }
  };

  // THIS FUNCTION PROCESSES CHANGING A LIST NAME
  store.changeListName = async function (id, newName) {
    let response = await api.getTop5ListById(id);
    if (response.status === 200) {
      let top5List = response.data.top5List;
      top5List.name = newName;
      async function updateList(top5List) {
        response = await api.updateTop5ListById(top5List._id, top5List);
        if (response.status === 200) {
          async function getListPairs(top5List) {
            response = await api.getTop5ListPairs();
            if (response.status === 200) {
              let pairsArray = response.data.idNamePairs;
              storeReducer({
                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                payload: {
                  idNamePairs: pairsArray,
                  top5List: top5List,
                },
              });
            }
          }
          getListPairs(top5List);
        }
      }
      updateList(top5List);
    }
  };

  // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
  store.closeCurrentList = function () {
    storeReducer({
      type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
      payload: {},
    });

    history.push("/");
  };

  store.updateGuest = function (guest) {
    storeReducer({
      type: GlobalStoreActionType.SET_IS_GUEST,
      payload: guest,
    });
  };

  // THIS FUNCTION CREATES A NEW LIST
  store.createNewList = async function () {
    let newListName = "Untitled" + store.newListCounter;
    const response = await api.createTop5List(
      newListName,
      ["?", "?", "?", "?", "?"],
      auth.user.email,
      auth.user.username
    );
    console.log("createNewList response: " + response);
    if (response.status === 201) {
      let newList = response.data.top5List;
      storeReducer({
        type: GlobalStoreActionType.CREATE_NEW_LIST,
        payload: newList,
      });

      // IF IT'S A VALID LIST THEN LET'S START EDITING IT
      history.push("/top5list/" + newList._id);
    } else {
      console.log("API FAILED TO CREATE A NEW LIST");
    }
  };

  // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
  store.loadIdNamePairs = async function () {
    console.log("store.loadIdNamePairs");
    const response = await api.getTop5ListPairs();
    if (response.status === 200) {
      let pairsArray = response.data.idNamePairs;
      storeReducer({
        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
        payload: pairsArray,
      });
    } else {
      console.log("API FAILED TO GET THE LIST PAIRS");
    }
  };

  // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
  // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
  // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
  // showDeleteListModal, and hideDeleteListModal
  store.markListForDeletion = async function (id) {
    // GET THE LIST
    let response = await api.getTop5ListById(id);
    if (response.status === 200) {
      let top5List = response.data.top5List;
      storeReducer({
        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
        payload: top5List,
      });
    }
  };

  store.deleteList = async function (listToDelete) {
    let response = await api.deleteTop5ListById(listToDelete._id);
    if (response.status === 200) {
      console.log("deleted");
      let response = await api.searchTop5List(
        store.search,
        store.listView,
        auth.user.username
      );
      if (response.status === 200) {
        console.log(response.data.top5Lists);
        let sortedLists = store.sorted(
          response.data.top5Lists,
          store.sort,
          store.listView
        );
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LISTS,
          payload: { top5Lists: sortedLists, search: store.search },
        });
      } else {
        console.log(response);
      }
      if (listToDelete.published) {
        store.removeFromCommunityList(listToDelete.name, listToDelete.items);
      }
      history.push("/");
    }
  };

  store.deleteMarkedList = function () {
    store.deleteList(store.listMarkedForDeletion);
  };

  store.unmarkListForDeletion = function () {
    storeReducer({
      type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
      payload: null,
    });
  };

  // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
  // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
  // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
  // moveItem, updateItem, updateCurrentList, undo, and redo
  store.setCurrentList = async function (id) {
    let response = await api.getTop5ListById(id);
    if (response.status === 200) {
      let top5List = response.data.top5List;

      response = await api.updateTop5ListById(top5List._id, top5List);
      if (response.status === 200) {
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: top5List,
        });
        history.push("/top5list/" + top5List._id);
      }
    }
  };

  store.updateLikes = async function (top5List) {
    if (top5List.likes.includes(auth.user.username)) {
      let index = top5List.likes.indexOf(auth.user.username);
      top5List.likes.splice(index, 1);
    } else {
      top5List.likes.push(auth.user.username);
    }

    if (top5List.dislikes.includes(auth.user.username)) {
      let index = top5List.dislikes.indexOf(auth.user.username);
      top5List.dislikes.splice(index, 1);
    }
    if (store.listView === "community") {
      store.updateCommunityList(top5List);
    } else {
      store.updateList(top5List);
    }
  };

  store.updateDislikes = async function (top5List) {
    if (top5List.dislikes.includes(auth.user.username)) {
      let index = top5List.dislikes.indexOf(auth.user.username);
      top5List.dislikes.splice(index, 1);
    } else {
      top5List.dislikes.push(auth.user.username);
    }

    if (top5List.likes.includes(auth.user.username)) {
      let index = top5List.likes.indexOf(auth.user.username);
      top5List.likes.splice(index, 1);
    }

    if (store.listView === "community") {
      store.updateCommunityList(top5List);
    } else {
      store.updateList(top5List);
    }
  };

  store.updateViews = async function (top5List) {
    console.log(store.listView);
    if (store.listView === "community" || top5List.published) {
      top5List.views = top5List.views + 1;
      if (store.listView === "community") {
        store.updateCommunityList(top5List);
      } else {
        store.updateList(top5List);
      }
    }
  };

  store.addComment = async function (top5List, comment) {
    top5List.comments[comment] = auth.user.username;
    if (store.listView === "community") {
      store.updateCommunityList(top5List);
    } else {
      store.updateList(top5List);
    }
  };

  store.updateCommunityList = async function (top5List) {
    const response = await api.updateCommunityList(top5List._id, top5List);
    if (response.status === 200) {
      console.log("updated");
      let response = null;
      if (store.isGuest) {
        response = await api.searchCommunityListByStartGuest(store.search);
      } else {
        response = await api.searchCommunityListByStart(store.search);
      }
      if (response.status === 200) {
        console.log(response.data.communityLists);
        let sortedLists = store.sorted(
          response.data.communityLists,
          store.sort,
          store.listView
        );
        storeReducer({
          type: GlobalStoreActionType.SET_LIST_VIEW,
          payload: {
            top5Lists: sortedLists,
            search: store.search,
            view: store.listView,
          },
        });
      } else {
        console.log(response);
      }
    }
  };

  store.updateList = async function (top5List) {
    const response = await api.updateTop5ListByIdWithoutUser(
      top5List._id,
      top5List
    );
    if (response.status === 200) {
      console.log("updated");
      let response = null;

      if (store.isGuest) {
        response = await api.searchTop5ListGuest(store.search, store.listView);
      } else {
        response = await api.searchTop5List(
          store.search,
          store.listView,
          auth.user.username
        );
      }
      if (response.status === 200) {
        console.log(response.data.top5Lists);
        let sortedLists = store.sorted(
          response.data.top5Lists,
          store.sort,
          store.listView
        );
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LISTS,
          payload: { top5Lists: sortedLists, search: store.search },
        });
      } else {
        console.log(response);
      }
    }
  };

  store.updateCurrentList = async function () {
    const response = await api.updateTop5ListById(
      store.currentList._id,
      store.currentList
    );
    if (response.status === 200) {
      console.log("updated");
      let response = await api.searchTop5List(
        store.search,
        store.listView,
        auth.user.username
      );
      if (response.status === 200) {
        console.log(response.data.top5Lists);
        let sortedLists = store.sorted(
          response.data.top5Lists,
          store.sort,
          store.listView
        );
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LISTS,
          payload: { top5Lists: sortedLists, search: store.search },
        });
      } else {
        console.log(response);
      }
    }
  };

  // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
  store.setIsListNameEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
      payload: null,
    });
  };

  // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
  store.setIsItemEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
      payload: null,
    });
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
