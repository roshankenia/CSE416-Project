import { useContext } from "react";
import HomeScreen from "./HomeScreen";
import WelcomeScreen from "./WelcomeScreen";
import LobbyScreen from "./LobbyScreen";
import GameContext from "../game";
import { GameScreen } from ".";

export default function GameWrapper(){
  const { game } = useContext(GameContext);

  console.log(game)

  if (game.lobby) {
    console.log(game.lobby);
    return <LobbyScreen />;
  } else if (game.game){
    console.log('Implement This part in GameScreen')
    return <GameScreen/>;
  }
}