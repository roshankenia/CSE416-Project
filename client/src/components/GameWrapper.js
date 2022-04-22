import { useContext } from "react";
import HomeScreen from "./HomeScreen";
import WelcomeScreen from "./WelcomeScreen";
import LobbyScreen from "./LobbyScreen";
// import VoteToPublishScreen from "./VoteToPublishScreen";
import GameContext from "../game";
import { GameScreen, VoteToPublishScreen } from ".";

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
