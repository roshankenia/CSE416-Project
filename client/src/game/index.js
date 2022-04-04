import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "./game-request-api";
import { GameContext } from "../community";
import AuthContext from "../auth";

export const GameContext = createContext({});

export const GameActionType = {};

function GameContextProvider(props) {
  const [game, setGame] = useState({
    game: null,
  });
  const history = useHistory();

  const { auth } = useContext(AuthContext);

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
