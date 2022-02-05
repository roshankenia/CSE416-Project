import { useContext } from "react";
import HomeScreen from "./HomeScreen";
import WelcomeScreen from "./WelcomeScreen";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";

export default function HomeWrapper() {
  const { auth } = useContext(AuthContext);
  console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
  const { store } = useContext(GlobalStoreContext);

  if (store.isGuest) {
    return <HomeScreen />;
  } else {
    if (auth.loggedIn) return <HomeScreen />;
    else return <WelcomeScreen />;
  }
}
