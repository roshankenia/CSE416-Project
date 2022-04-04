import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "./game-request-api";
import { GlobalCommunityContext } from "../community";
import AuthContext from "../auth";

export const GameContext = createContext({});
console.log("create GameContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA Community STATE THAT CAN BE PROCESSED
export const GameActionType = {};

function GameContextProvider(props) {
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
    <GameContext.Provider
      value={{
        game,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}

export default GameContext;
export { GameContextProvider };
