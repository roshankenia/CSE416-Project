import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "./game-request-api";
import AuthContext from "../auth";
import io from "socket.io-client";
import { SocketContext } from "../socket";
import $ from "jquery";

export const GameContext = createContext({});

export const GameActionType = {
  CREATE_NEW_GAME: "CREATE_NEW_GAME",
  CREATE_NEW_LOBBY: "CREATE_NEW_LOBBY",
  ENTER_VOTING: "ENTER_VOTING",
  EXIT_VOTING: "EXIT_VOTING",
  JOIN_LOBBY: "JOIN_LOBBY",
  UPDATE_PLAYERS: "UPDATE_PLAYERS",
  LEAVE_LOBBY: "LEAVE_LOBBY",
  ADD_READY: "ADD_READY",
  ADD_HOST: "ADD_HOST",
  UPDATE_TIMER: "UPDATE_TIMER",
  NEXT_TURN: "NEXT_TURN",
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
    timer: null,
    host: null,
    turn: null,
    currentPlayer: null,
    panelNumber: null,
    communityName: null,
    panels: [],
  });
  const history = useHistory();

  const { auth } = useContext(AuthContext);

  const gameReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GameActionType.CREATE_NEW_LOBBY: {
        return setGame({
          game: null,
          lobby: payload.lobbyID,
          voting: game.voting,
          players: payload.players,
          readyPlayers: game.readyPlayers,
          screen: "lobby",
          timer: null,
          host: auth.user.username,
          turn: null,
          currentPlayer: null,
          panelNumber: null,
          communityName: payload.communityName,
          panels: game.panels,
        });
      }
      case GameActionType.UPDATE_TIMER: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: game.screen,
          timer: payload,
          host: game.host,
          turn: game.turn,
          currentPlayer: game.currentPlayer,
          panelNumber: game.panelNumber,
          communityName: game.communityName,
          panels: game.panels,
        });
      }
      case GameActionType.CREATE_NEW_GAME: {
        return setGame({
          game: payload.game,
          //need lobbyID to keep socket connection
          lobby: game.lobby,
          voting: game.voting,
          players: payload.players,
          readyPlayers: game.readyPlayers,
          screen: "game",
          timer: game.timer,
          host: game.host,
          turn: 0,
          currentPlayer: payload.players[0],
          panelNumber: payload.players.length * 3,
          communityName: game.communityName,
          panels: game.panels,
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
          timer: 60,
          host: game.host,
          turn: null,
          currentPlayer: null,
          panelNumber: null,
          communityName: game.communityName,
          panels: game.panels,
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
          timer: null,
          host: game.host,
          turn: null,
          currentPlayer: null,
          panelNumber: game.panelNumber,
          communityName: game.communityName,
          panels: game.panels,
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
          timer: null,
          host: game.host,
          turn: null,
          currentPlayer: null,
          panelNumber: null,
          communityName: game.communityName,
          panels: game.panels,
        });
      }
      case GameActionType.UPDATE_PLAYERS: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          players: payload.players,
          readyPlayers: payload.readyPlayers,
          screen: game.screen,
          timer: null,
          host: game.host,
          turn: null,
          currentPlayer: null,
          panelNumber: null,
          communityName: game.communityName,
          panels: game.panels,
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
          timer: null,
          host: game.host,
          turn: null,
          currentPlayer: null,
          panelNumber: null,
          communityName: game.communityName,
          panels: game.panels,
        });
      }
      case GameActionType.ADD_READY: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          players: game.players,
          readyPlayers: payload,
          screen: game.screen,
          timer: null,
          host: game.host,
          turn: null,
          currentPlayer: null,
          panelNumber: null,
          communityName: game.communityName,
          panels: game.panels,
        });
      }
      case GameActionType.NEXT_TURN: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: game.screen,
          host: game.host,
          turn: payload.turn,
          currentPlayer: payload.currentPlayer,
          panelNumber: game.panelNumber,
          communityName: game.communityName,
          panels: payload.panels,
        });
      }
      case GameActionType.ADD_HOST: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: game.screen,
          host: payload,
          turn: null,
          currentPlayer: null,
          panelNumber: null,
          communityName: game.communityName,
          panels: game.panels,
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
        payload: { players: players, readyPlayers: game.readyPlayers },
      });

      let readyPlayers = game.readyPlayers;

      socket.emit("consolidate-players", players, readyPlayers, lobbyID);

      if (auth.user.username == game.host) {
        socket.emit("update-host", auth.user.username, lobbyID);
      }
    };
    socket.once("new-player", newP);

    const addH = async (host) => {
      console.log("adding host:", host);
      if (host != game.host) {
        gameReducer({
          type: GameActionType.ADD_HOST,
          payload: host,
        });
      }
    };

    socket.once("add-host", addH);

    const addP = async (addPlayer, addReady, lobbyID) => {
      console.log("adding all unknown players");
      let players = game.players;
      for (var i = 0; i < addPlayer.length; i++) {
        let a = addPlayer[i];
        if (!players.includes(a)) {
          players.push(a);
        }
      }

      let readyPlayers = game.readyPlayers;
      for (var i = 0; i < addReady.length; i++) {
        let a = addReady[i];
        if (!readyPlayers.includes(a)) {
          readyPlayers.push(a);
        }
      }

      gameReducer({
        type: GameActionType.UPDATE_PLAYERS,
        payload: { players: players, readyPlayers: readyPlayers },
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

      let readyPlayers = game.readyPlayers;
      const readyIndex = readyPlayers.indexOf(username);
      if (readyIndex > -1) {
        readyPlayers.splice(index, 1);
      }

      gameReducer({
        type: GameActionType.UPDATE_PLAYERS,
        payload: { players: players, readyPlayers: readyPlayers },
      });
    };

    socket.once("remove-player", removeP);

    const readyP = async (username) => {
      let readyPlayers = game.readyPlayers;
      console.log("trying to ready a player");
      if (!readyPlayers.includes(username)) {
        console.log("readying", username);
        readyPlayers.push(username);
      } else {
        console.log("unreadying", username);
        readyPlayers.splice(readyPlayers.indexOf(username), 1);
      }
      gameReducer({
        type: GameActionType.ADD_READY,
        payload: readyPlayers,
      });
    };

    socket.once("player-ready", readyP);

    // const countDown = async (count)=>{
    //   gameReducer({
    //     type: GameActionType.UPDATE_TIMER,
    //     payload: count
    //   });
    // };

    // socket.once("counter", countDown);

    //pass real game obj when backend is ready
    const gameStart = async (players) => {
      console.log(players);
      let fakeGameObj = { game: "random bullshit go!", players: players };
      gameReducer({
        type: GameActionType.CREATE_NEW_GAME,
        payload: fakeGameObj,
      });
    };
    //right now it passes player array
    socket.once("game-started", gameStart);

    // const syncL = async (lines) => {
    //   console.log('lines\n!!!!!!!!')
    //   console.log(lines)

    // };
    // socket.on("sync-lines", syncL);

    return () => {
      socket.off("new-player", newP);
      socket.off("add-players", addP);
      socket.off("remove-player", removeP);
      socket.off("player-ready", readyP);
      // socket.off("counter", countDown)
      socket.off("add-host", addH);
      socket.off("game-started", gameStart);

      // socket.off('count1');
    };
  }, [game]);

  game.readyUp = async function () {
    let readyPlayers = game.readyPlayers;
    if (!readyPlayers.includes(auth.user.username)) {
      readyPlayers.push(auth.user.username);
    } else {
      readyPlayers.splice(readyPlayers.indexOf(auth.user.username), 1);
    }
    gameReducer({
      type: GameActionType.ADD_READY,
      payload: readyPlayers,
    });

    socket.emit("ready-unready", auth.user.username, game.lobby);
  };

  game.createNewGame = async function () {
    let sortPlayers = game.players.sort();
    try {
      let id = "madeupgameid";
      let newgame = { game: "gameOBJ", players: sortPlayers };
      // backend stuff
      // const response = await api.createGame();
      // if (response.status === 201) {
      //   let game = response.data.game;
      gameReducer({
        type: GameActionType.CREATE_NEW_GAME,
        payload: newgame,
      });
      history.push("/game/" + id);
      //}
      console.log("new game created:");
      console.log(game);
    } catch {
      console.log("API FAILED TO CREATE A GAME MONGODB INSTANCE");
    }
    socket.emit("start-game", sortPlayers, game.lobby);
  };

  game.leaveLobby = async function () {
    try {
      let lobbyID = game.lobby;
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

  game.hostNewLobby = async function (communityName) {
    try {
      let id = Math.floor(100000 + Math.random() * 900000);
      let lobbyID = "" + id;
      let players = game.players;
      players.push(auth.user.username);
      // backend stuff
      // const response = await api.createGame();
      // if (response.status === 201) {
      //   let game = response.data.game;
      console.log("creating lobby for:", communityName);
      gameReducer({
        type: GameActionType.CREATE_NEW_LOBBY,
        payload: {
          lobbyID: lobbyID,
          players: players,
          communityName: communityName,
        },
      });
      history.push("/game/" + lobbyID);
      socket.emit("join-lobby", auth.user.username, lobbyID);
      //}
    } catch {
      console.log("API FAILED TO CREATE A LOBBY MONGODB INSTANCE");
    }
  };

  game.changeTurn = function (turn, currentPlayer, newPanel) {
    let panels = game.panels;
    panels.push(newPanel);
    gameReducer({
      type: GameActionType.NEXT_TURN,
      payload: { turn: turn, currentPlayer: currentPlayer, panels: panels },
    });
  };

  game.enterVoting = async function () {
    try {
      const id = "madeupgameid";
      gameReducer({
        type: GameActionType.ENTER_VOTING,
        payload: null,
      });
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
      history.push("/");
      //}
    } catch {
      console.log("error buddy");
    }
  };

  //TIMER CODE- make sure time only starts when start game happens
  game.setTimer = async function (time) {
    console.log("set timer... " + time);
    socket.emit("timer", auth.user.username, time, game.lobby);
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
