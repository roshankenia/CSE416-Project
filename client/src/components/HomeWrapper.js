import { useContext } from "react";
import HomeScreen from "./HomeScreen";
import WelcomeScreen from "./WelcomeScreen";
import AuthContext from "../auth";

export default function HomeWrapper() {
  const { auth } = useContext(AuthContext);
  console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
  //const { community } = useContext(GlobalStoreContext);

  if (auth.isGuest) {
    console.log(auth.isGuest)
    return <HomeScreen />;
  } else {
    if (auth.loggedIn) return <HomeScreen />;
    else return <WelcomeScreen />;
  }
}