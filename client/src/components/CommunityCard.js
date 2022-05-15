import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { useContext } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";

export default function CommentCard(props) {
  const { community } = useContext(GlobalCommunityContext);
  const { auth } = useContext(AuthContext);
  const { Obj } = props;

  let joinText = "join";
  let joinButton = <Button onClick={handleJoin}>join</Button>;
  function handleJoin() {
    community.join(Obj._id);
  }
  function handleLeave() {
    community.leave(Obj._id);
  }
  if (Obj.communityMembers.indexOf(auth.user.username) > -1) {
    joinButton = <Button onClick={handleLeave}>leave</Button>;
  }

  return (
    <ListItem>
      {Obj.communityName}
      {joinButton}
    </ListItem>
  );
}
