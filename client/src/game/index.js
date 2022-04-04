import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "./community-request-api";
import AuthContext from "../auth";

export const GameContext = createContext({});
//console.log("create GameContext");

export const GameActionType = {
  CREATE_NEW_LOBBY: "CREATE_NEW_LOBBY",
};

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

  community.reset = function () {
    communityReducer({
      type: GlobalCommunityActionType.RESET,
      payload: community,
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameReducer,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}

export default GameContext;
export { GameContextProvider };
