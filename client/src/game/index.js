import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "./game-request-api";
import AuthContext from "../auth";

export const GameContext = createContext({});

export const GameActionType = {
  CREATE_NEW_GAME: "CREATE_NEW_GAME",
  CREATE_NEW_LOBBY: "CREATE_NEW_LOBBY",
};

function GameContextProvider(props) {

/* if game is null, lobby is not null, if lobby is null, game is not null
 *  this is used to determine which route the GameWrapper use
 *  @Terran
 */
  const [game, setGame] = useState({
    game: null,
    lobby: null
  });
  const history = useHistory();

  const { auth } = useContext(AuthContext);

  const gameReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GameActionType.CREATE_NEW_LOBBY: {
        return setGame({
          game: null,
          lobby: payload
        });
      }
      case GameActionType.CREATE_NEW_GAME: {
        return setGame({
          game: payload,
          lobby: null
        });
      }
      default:
        return game;
    }
  };

  game.createNewGame = async function (){
    try {
        let id = 'madeupgameid'
        let newgame = 'gameOBJ'
        // backend stuff
        // const response = await api.createGame();
        // console.log("createNewGame response: " + response);
        // if (response.status === 201) {
        //   let game = response.data.game;
          gameReducer({
            type: GameActionType.CREATE_NEW_GAME,
            payload: newgame,
          });
          console.log('inside game.createNewGame')
          console.log(game)
          history.push("/game/" + id);
        //}
      } catch {
        console.log("API FAILED TO CREATE A GAME MONGODB INSTANCE");
      }
  }

  game.hostNewLobby = async function () {
    try {
        let id = 'madeuplobbyid'
        let lobby = 'lobbyOBJ'
        // backend stuff
        // const response = await api.createGame();
        // console.log("createNewGame response: " + response);
        // if (response.status === 201) {
        //   let game = response.data.game;
          gameReducer({
            type: GameActionType.CREATE_NEW_LOBBY,
            payload: lobby,
          });
          history.push("/game/" + id);
        //}
      } catch {
        console.log("API FAILED TO CREATE A LOBBY MONGODB INSTANCE");
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
