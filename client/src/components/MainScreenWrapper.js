import { useContext } from "react";
import WelcomeScreen from "./WelcomeScreen";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";

export default function MainScreenWrapper() {
  const { auth } = useContext(AuthContext);
  console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
  const { community } = useContext(GlobalCommunityContext);
}
