import { useContext } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
import CommunityScreen from "./CommunityScreen";
import DiscoveryScreen from "./DiscoveryScreen";
import FriendsScreen from "./FriendsScreen";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import WelcomeScreen from "./WelcomeScreen";

export default function HomeWrapper() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

  if (auth.isGuest) {
    console.log(auth.isGuest);
    return <HomeScreen />;
  } else {
    if (auth.loggedIn) {
      if (community.currentCommunity) {
        return <CommunityScreen />;
      } else {
        if (community.screen == "communities") {
          return <HomeScreen />;
        } else if (community.screen == "discovery") {
          return <DiscoveryScreen />;
        } else if (community.screen == "profile") {
          return <ProfileScreen />;
        } else if (community.screen == "friends") {
          return <FriendsScreen />;
        }
      }
    } else return <WelcomeScreen />;
  }
}
