import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
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
  ADD_READY: "ADD_READY",
  ADD_HOST: "ADD_HOST",
  UPDATE_TIMER: "UPDATE_TIMER",
  NEXT_TURN: "NEXT_TURN",
  CHANGE_GAMEMODE: "CHANGE_GAMEMODE",
  UPDATE_VOTES: "UPDATE_VOTES",
  RESET_GAME: "RESET_GAME",
  STORE_CHAT: "STORE_CHAT",
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
    votes: [0, 0, 0, 0],
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
    gamemode: "comic",
    chat: [],
    postID: null,
  });
  const history = useHistory();

  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const gameReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GameActionType.RESET_GAME: {
        return setGame({
          game: null,
          lobby: null,
          voting: false,
          votes: [0, 0, 0],
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
          gamemode: "comic",
          chat: [],
          postID: null,
        });
      }
      case GameActionType.CREATE_NEW_LOBBY: {
        return setGame({
          game: null,
          lobby: payload.lobbyID,
          voting: game.voting,
          votes: game.votes,
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
          gamemode: game.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.UPDATE_TIMER: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          votes: game.votes,
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
          gamemode: game.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.CREATE_NEW_GAME: {
        return setGame({
          game: payload.game,
          //need lobbyID to keep socket connection
          lobby: game.lobby,
          voting: game.voting,
          votes: game.votes,
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
          gamemode: game.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.ENTER_VOTING: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: true,
          votes: game.votes,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: "voting",
          timer: 60,
          host: game.host,
          turn: null,
          currentPlayer: null,
          panelNumber: null,
          communityName: game.communityName,
          panels: payload.panels,
          gamemode: game.gamemode,
          chat: game.chat,
          postID: payload.postID,
        });
      }
      case GameActionType.EXIT_VOTING: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: false,
          votes: game.votes,
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
          gamemode: game.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.JOIN_LOBBY: {
        return setGame({
          game: game.game,
          lobby: payload.lobby,
          voting: game.voting,
          votes: game.votes,
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
          gamemode: game.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.UPDATE_PLAYERS: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          votes: game.votes,
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
          gamemode: payload.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.LEAVE_LOBBY: {
        return setGame({
          game: game.game,
          lobby: null,
          voting: game.voting,
          votes: game.votes,
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
          gamemode: game.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.ADD_READY: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          votes: game.votes,
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
          gamemode: game.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.NEXT_TURN: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          votes: game.votes,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: game.screen,
          host: game.host,
          turn: payload.turn,
          currentPlayer: payload.currentPlayer,
          panelNumber: game.panelNumber,
          communityName: game.communityName,
          panels: payload.panels,
          gamemode: game.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.ADD_HOST: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          votes: game.votes,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: game.screen,
          host: payload,
          turn: null,
          currentPlayer: null,
          panelNumber: null,
          communityName: game.communityName,
          panels: game.panels,
          gamemode: game.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.CHANGE_GAMEMODE: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          votes: game.votes,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: game.screen,
          host: game.host,
          turn: game.turn,
          currentPlayer: game.currentPlayer,
          panelNumber: game.panelNumber,
          communityName: game.communityName,
          panels: game.panels,
          gamemode: payload,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.UPDATE_VOTES: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          votes: payload,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: game.screen,
          host: game.host,
          turn: game.turn,
          currentPlayer: game.currentPlayer,
          panelNumber: game.panelNumber,
          communityName: game.communityName,
          panels: game.panels,
          gamemode: game.gamemode,
          chat: game.chat,
          postID: game.postID,
        });
      }
      case GameActionType.STORE_CHAT: {
        return setGame({
          game: game.game,
          lobby: game.lobby,
          voting: game.voting,
          votes: game.votes,
          players: game.players,
          readyPlayers: game.readyPlayers,
          screen: game.screen,
          host: game.host,
          turn: game.turn,
          currentPlayer: game.currentPlayer,
          panelNumber: game.panelNumber,
          communityName: game.communityName,
          panels: game.panels,
          gamemode: game.gamemode,
          chat: payload,
          postID: game.postID,
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
        payload: {
          players: players,
          readyPlayers: game.readyPlayers,
          gamemode: game.gamemode,
        },
      });

      let readyPlayers = game.readyPlayers;

      if (auth.user.username == game.host) {
        socket.emit("update-host", auth.user.username, lobbyID);
        socket.emit(
          "consolidate-players",
          players,
          readyPlayers,
          lobbyID,
          game.gamemode
        );
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

    const addP = async (addPlayer, addReady, lobbyID, gameMode) => {
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
        payload: {
          players: players,
          readyPlayers: readyPlayers,
          gamemode: gameMode,
        },
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
        readyPlayers.splice(readyIndex, 1);
      }

      gameReducer({
        type: GameActionType.UPDATE_PLAYERS,
        payload: {
          players: players,
          readyPlayers: readyPlayers,
          gamemode: game.gamemode,
        },
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

    const newVotes = async (voteVal, username) => {
      console.log("inside votes callback");
      try {
        let votesArr = game.votes;
        if (votesArr.indexOf(username) == -1) {
          if (voteVal == "scrap") {
            console.log("vote to scrap was made by somebody else");
            votesArr[0] = votesArr[0] + 1;
            votesArr.push(username);
            gameReducer({
              type: GameActionType.UPDATE_VOTES,
              payload: votesArr,
            });
            console.log("votes array updated");
          } else if (voteVal == "comm") {
            console.log("vote to comm was made by somebody else");
            votesArr[1] = votesArr[1] + 1;
            votesArr.push(username);
            gameReducer({
              type: GameActionType.UPDATE_VOTES,
              payload: votesArr,
            });
            console.log("votes array updated");
          } else if (voteVal == "commdis") {
            console.log("vote to commdis was made by somebody else");
            votesArr[2] = votesArr[2] + 1;
            votesArr.push(username);
            gameReducer({
              type: GameActionType.UPDATE_VOTES,
              payload: votesArr,
            });
            console.log("votes array updated");
          } else {
            console.log("error in updating votes: vote value not found");
          }
        } else {
          console.log("this user has already made a vote");
        }
      } catch {
        console.log("error in updating votes");
      }
    };

    socket.once("update-votes-cb", newVotes);

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

    const switchGamemode = async (gamemode) => {
      console.log("host switching gamemode to:", gamemode);
      gameReducer({
        type: GameActionType.CHANGE_GAMEMODE,
        payload: gamemode,
      });
    };

    socket.once("switch-gamemode", switchGamemode);

    const playerLeft = async (user) => {
      console.log(user, "has left the game.");
      if (game != null) {
        try {
          console.log("resetting game");
          gameReducer({
            type: GameActionType.RESET_GAME,
            payload: null,
          });
          history.push("/");
          community.notifyLeft();
        } catch {
          console.log("Failed to leave lobby");
        }
      } else {
        console.log("stay in lobby");
      }
    };

    socket.once("player-left", playerLeft);

    const displayMessage = async (message, username) => {
      console.log("the message is", message);
      console.log("username is ", username);
      // setMessageArray(messageArray => [...messageArray, [username,message]]);
      game.storeChat([username, message]);
    };
    socket.on("receive-message", displayMessage);

    const lobbyConfirmed = async (username, lobbyID, confirmed) => {
      console.log("listener:", username, lobbyID, confirmed);
      if (username == auth.user.username) {
        if (confirmed) {
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
        }
      } else {
        community.lobbyUnavailable();
      }
    };

    socket.on("lobby-confirmed", lobbyConfirmed);

    return () => {
      socket.off("new-player", newP);
      socket.off("add-players", addP);
      socket.off("remove-player", removeP);
      socket.off("player-ready", readyP);
      // socket.off("counter", countDown)
      socket.off("add-host", addH);
      socket.off("game-started", gameStart);
      socket.off("switch-gamemode", switchGamemode);
      socket.off("update-votes-cb", newVotes);
      socket.off("player-left", playerLeft);
      socket.off("receive-message", displayMessage);
      socket.off("lobby-confirmed", lobbyConfirmed);

      // socket.off('count1');
    };
  }, [game]);

  game.storeChat = async function (userMessage) {
    try {
      console.log("in storeChat method");
      let chat = game.chat;
      chat.push(userMessage);
      gameReducer({
        type: GameActionType.STORE_CHAT,
        payload: chat,
      });
    } catch {
      console.log("Failed to update chat");
    }
  };

  game.disconnectPlayer = async function () {
    try {
      let lobbyID = game.lobby;
      socket.emit("disconnect-player", auth.user.username, lobbyID);
      gameReducer({
        type: GameActionType.RESET_GAME,
        payload: null,
      });
      history.push("/");
    } catch {
      console.log("Failed to leave lobby");
    }
  };

  game.changeGamemode = async function (gamemode) {
    console.log("host switching gamemode to:", gamemode);
    gameReducer({
      type: GameActionType.CHANGE_GAMEMODE,
      payload: gamemode,
    });
    socket.emit("change-gamemode", gamemode, game.lobby);
  };
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

  game.updateVotes = async function (voteVal, username) {
    try {
      let votesArr = game.votes;
      if (votesArr.indexOf(username) == -1) {
        if (voteVal == "scrap") {
          console.log("vote to scrap was made");
          votesArr[0] = votesArr[0] + 1;
          votesArr.push(username);
          gameReducer({
            type: GameActionType.UPDATE_VOTES,
            payload: votesArr,
          });
        } else if (voteVal == "comm") {
          console.log("vote to comm was made");
          votesArr[1] = votesArr[1] + 1;
          votesArr.push(username);
          gameReducer({
            type: GameActionType.UPDATE_VOTES,
            payload: votesArr,
          });
        } else if (voteVal == "commdis") {
          console.log("vote to commdis was made");
          votesArr[2] = votesArr[2] + 1;
          votesArr.push(username);
          gameReducer({
            type: GameActionType.UPDATE_VOTES,
            payload: votesArr,
          });
        } else if (voteVal == "save") {
          console.log("vote to save was made");
          votesArr[3] = votesArr[3] + 1;
          votesArr.push(username);
          gameReducer({
            type: GameActionType.UPDATE_VOTES,
            payload: votesArr,
          });
        } else {
          console.log("error in updating votes: vote value not found");
        }
      } else {
        console.log("this user has already made a vote");
      }
      socket.emit("update-votes", voteVal, username, game.lobby);
      console.log("announcing to server to update votes for other clients");
    } catch {
      console.log("error in updating votes");
    }
  };

  game.createNewGame = async function () {
    let sortPlayers = game.players.sort();
    try {
      console.log(game.gamemode);
      let id = game.lobby;
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
        type: GameActionType.RESET_GAME,
        payload: null,
      });
      history.push("/");
    } catch {
      console.log("Failed to leave lobby");
    }
  };

  game.joinLobby = async function (lobbyID) {
    socket.emit("confirm-lobby", auth.user.username, lobbyID);
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

  game.changeTurn = function (newPanel) {
    let panels = game.panels;
    panels.push(newPanel);
    let currentTurn = game.turn + 1;
    console.log("currentTurn:", currentTurn);

    let sortedArray = game.players.sort();
    console.log(sortedArray);

    let currPlayer = sortedArray[currentTurn % game.players.length];
    console.log(currPlayer);

    gameReducer({
      type: GameActionType.NEXT_TURN,
      payload: {
        turn: currentTurn,
        currentPlayer: currPlayer,
        panels: panels,
      },
    });
  };

  //Solo Game replaces panels
  //might need to set game.turn to 0 when clicking edit
  game.soloNextTurn = function (newPanel) {
    console.log("inside next turn method in game-index.js");
    let panels = game.panels;

    //If we add new panel, this code works.
    panels.push(newPanel);
    let currentTurn = game.turn + 1;
    console.log("currentTurn:", currentTurn);

    let sortedArray = game.players.sort();
    console.log(sortedArray);

    let currPlayer = sortedArray[currentTurn % game.players.length];
    console.log(currPlayer);

    gameReducer({
      type: GameActionType.NEXT_TURN,
      payload: {
        turn: currentTurn,
        currentPlayer: currPlayer,
        panels: panels,
      },
    });
  };

  game.enterVoting = async function (lastPanel, postID = null) {
    try {
      const id = game.lobby;
      // if (game.host != auth.user.username) {
      // game.exitVoting();
      // } else {
      let panels = game.panels;
      panels.push(lastPanel);
      gameReducer({
        type: GameActionType.ENTER_VOTING,
        payload: {
          panels: panels,
          postID: postID,
        },
      });
      history.push("/game/" + id);
      // }
      //}
    } catch {
      console.log("error buddy");
    }
  };

  game.exitVoting = async function () {
    try {
      gameReducer({
        type: GameActionType.RESET_GAME,
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
