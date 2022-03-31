import { useContext, useState } from 'react'
import { GlobalCommunityContext } from "../community";
import ListItem from '@mui/material/ListItem';
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
    const { communtiy } = useContext(GlobalCommunityContext);
    const { Obj } = props;
    return ('hi');
    
}