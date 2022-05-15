import { useContext } from "react";
import { GameScreen, VoteToPublishScreen } from ".";
// import VoteToPublishScreen from "./VoteToPublishScreen";
import GameContext from "../game";
import LobbyScreen from "./LobbyScreen";

export default function GameWrapper() {
  const { game } = useContext(GameContext);

  if (game.screen == "voting") {
    console.log("Entering voting phase");
    return <VoteToPublishScreen />;
  } else if (game.screen == "lobby") {
    return <LobbyScreen />;
  } else if (game.screen == "game") {
    return <GameScreen />;
  }
}
