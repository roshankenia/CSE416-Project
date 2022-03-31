import { useContext, useState } from 'react'
import { GlobalCommunityContext } from "../community";
import AuthContext from "../auth";
import ListItem from '@mui/material/ListItem';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Stack, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Collapse } from '@mui/material';
import { Box } from '@mui/system';
import { List } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CommentCard(props){
    const { community } = useContext(GlobalCommunityContext);
    const { auth } = useContext(AuthContext);
    const { Obj } = props;

    let joinText = 'join'
    let joinButton = <Button onClick={handleJoin}>join</Button>
    function handleJoin() {
        community.join(Obj._id)
    }
    function handleLeave() {
        community.leave(Obj._id)
    }
    if(Obj.communityMembers.indexOf(auth.user.username) > -1){
        joinButton = <Button onClick={handleLeave}>leave</Button>
    }


    return (<ListItem>{Obj.communityName}{joinButton}</ListItem>);
}