import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "./game-request-api";
import { GameContext } from "../community";
import AuthContext from "../auth";

export const GameContext = createContext({});
//console.log("create GlobalGameContext");

export const GlobalGameActionType = {};

function GlobalGameContextProvider(props) {
  const [game, setGame] = useState({});
  const history = useHistory();

  const { auth } = useContext(AuthContext);
  const { game } = useContext(GameContext);

  const gameReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GameActionType.CREATE_NEW_LOBBY: {
        return setCommunity({
          game: payload
        });
      }
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

export default GameContext;
export { GameContextProvider };
