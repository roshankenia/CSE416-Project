import { useContext } from "react";
import HomeScreen from "./HomeScreen";
import WelcomeScreen from "./WelcomeScreen";
import CommunityScreen from "./CommunityScreen";
import DiscoveryScreen from "./DiscoveryScreen";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
import ProfileScreen from "./ProfileScreen";

export default function HomeWrapper() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
  //const { community } = useContext(GlobalStoreContext);

  if (auth.isGuest) {
    console.log(auth.isGuest);
    return <HomeScreen />;
  } else {
    if (auth.loggedIn) {
      if (community.communityList) {
        return <CommunityScreen />;
      } else {
        if (community.screen == "communities") {
          return <HomeScreen />;
        } else if (community.screen == "discovery") {
          return <DiscoveryScreen />;
        }
        if (community.screen == "profile"){
          return <ProfileScreen />
        }
      }
    } else return <WelcomeScreen />;
  }
}
