import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "./game-request-api";
import { GlobalCommunityContext } from "../community";
import AuthContext from "../auth";

export const GlobalGameContext = createContext({});
console.log("create GlobalGameContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA Community STATE THAT CAN BE PROCESSED
export const GlobalGameActionType = {};

function GlobalGameContextProvider(props) {
  const [game, setGame] = useState({});
  const history = useHistory();

  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const gameReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      default:
        return game;
    }
  };

  return (
    <GlobalGameContext.Provider
      value={{
        game,
      }}
    >
      {props.children}
    </GlobalGameContext.Provider>
  );
}

export default GlobalGameContext;
export { GlobalGameContextProvider };
