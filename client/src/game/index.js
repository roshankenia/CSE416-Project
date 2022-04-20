import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "./game-request-api";
import AuthContext from "../auth";
import io from "socket.io-client";
import { SocketContext } from "../socket";

export const GameContext = createContext({});

export const GameActionType = {
  CREATE_NEW_GAME: "CREATE_NEW_GAME",
  CREATE_NEW_LOBBY: "CREATE_NEW_LOBBY",
  ENTER_VOTING: "ENTER_VOTING",
  EXIT_VOTING: "EXIT_VOTING",
  JOIN_LOBBY: "JOIN_LOBBY",
  UPDATE_PLAYERS: "UPDATE_PLAYERS",
  LEAVE_LOBBY: "LEAVE_LOBBY",
};

function GameContextProvider(props) {
  /* if game is null, lobby is not null, if lobby is null, game is not null
   *  this is used to determine which route the GameWrapper use
   *  @Terran
   */

  const socket = useContext(SocketContext);

  const [game, setGame] = useState({
    game: null,
    lobby: null,
    voting: false,
    players: [],
    readyPlayers: [],
    screen: "lobby",
  });
  const history = useHistory();

  const { auth } = useContext(AuthContext);

  const gameReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GameActionType.CREATE_NEW_LOBBY: {
        return setGame({
          game: null,
          lobby: payload,
          voting: game.voting,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: "lobby",
        });
      }
      case GameActionType.CREATE_NEW_GAME: {
        return setGame({
          game: payload,
          lobby: null,
          voting: game.voting,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: "game",
        });
      }
      case GameActionType.ENTER_VOTING: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: true,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: "voting",
        });
      }
      case GameActionType.EXIT_VOTING: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: false,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: "lobby",
        });
      }
      case GameActionType.JOIN_LOBBY: {
        return setGame({
          game: game.game,
          lobby: payload.lobby,
          voting: game.voting,
          players: payload.players,
          readyPlayers: game.readyPlayers,
          screen: "lobby",
        });
      }
      case GameActionType.UPDATE_PLAYERS: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          players: payload,
          readyPlayers: game.readyPlayers,
          screen: game.screen,
        });
      }
      case GameActionType.LEAVE_LOBBY: {
        return setGame({
          game: game.game,
          lobby: null,
          voting: game.voting,
          players: [],
          readyPlayers: [],
          screen: game.screen,
        });
      }
      default:
        return game;
    }
  };

  useEffect(() => {
    socket.on("disconnect", () => {
      socket.removeAllListeners();
    });

    const newP = async (username, lobbyID) => {
      console.log("new player joined");
      let players = game.players;
      if (!players.includes(username)) {
        players.push(username);
      }
      gameReducer({
        type: GameActionType.UPDATE_PLAYERS,
        payload: players,
      });

      socket.emit("consolidate-players", players, lobbyID);
    };
    socket.once("new-player", newP);

    const addP = async (add, lobbyID) => {
      console.log("adding all unknown players");
      let players = game.players;
      for (var i = 0; i < add.length; i++) {
        let a = add[i];
        if (!players.includes(a)) {
          players.push(a);
        }
      }
      gameReducer({
        type: GameActionType.UPDATE_PLAYERS,
        payload: players,
      });
    };
    socket.once("add-players", addP);

    const removeP = async (username, lobbyID) => {
      console.log("removing user", username);
      let players = game.players;

      const index = players.indexOf(username);
      if (index > -1) {
        players.splice(index, 1);
      }

      gameReducer({
        type: GameActionType.UPDATE_PLAYERS,
        payload: players,
      });
    };

    socket.once("remove-player", removeP);

    return () => {
      socket.off("new-player", newP);
      socket.off("add-players", addP);
      socket.off("remove-player", removeP);
    };
  }, [game]);

  game.createNewGame = async function () {
    try {
      let id = "madeupgameid";
      let newgame = "gameOBJ";
      // backend stuff
      // const response = await api.createGame();
      // console.log("createNewGame response: " + response);
      // if (response.status === 201) {
      //   let game = response.data.game;
      gameReducer({
        type: GameActionType.CREATE_NEW_GAME,
        payload: newgame,
      });
      console.log("inside game.createNewGame");
      console.log(game);
      history.push("/game/" + id);
      //}
    } catch {
      console.log("API FAILED TO CREATE A GAME MONGODB INSTANCE");
    }
  };

  game.leaveLobby = async function () {
    try {
      let lobbyID = game.lobby;
      console.log("Leaving lobby:", lobbyID);
      socket.emit("leave-lobby", auth.user.username, lobbyID);
      gameReducer({
        type: GameActionType.LEAVE_LOBBY,
        payload: null,
      });
      history.push("/");
    } catch {
      console.log("Failed to leave lobby");
    }
  };

  game.joinLobby = async function (lobbyID) {
    try {
      let players = game.players;
      players.push(auth.user.username);
      gameReducer({
        type: GameActionType.JOIN_LOBBY,
        payload: { lobby: lobbyID, players: players },
      });
      history.push("/game/" + lobbyID);
    } catch {
      console.log("Failed to join lobby");
    }

    socket.emit("join-lobby", auth.user.username, lobbyID);
  };

  game.hostNewLobby = async function () {
    try {
      let id = "madeuplobbyid";
      let lobby = "lobbyOBJ";
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

  game.enterVoting = async function () {
    try {
      const id = "madeupgameid";
      gameReducer({
        type: GameActionType.ENTER_VOTING,
        payload: null,
      });
      console.log("inside game.enterVoting");
      console.log(game);
      history.push("/game/" + id);
      //}
    } catch {
      console.log("error buddy");
    }
  };

  game.exitVoting = async function () {
    try {
      const id = "madeupgameid";
      gameReducer({
        type: GameActionType.EXIT_VOTING,
        payload: null,
      });
      console.log("inside game.exitVoting");
      console.log(game);
      history.push("/");
      //}
    } catch {
      console.log("error buddy");
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
