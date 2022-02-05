import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import List from "@mui/material/List";
import Link from "@mui/material/Link";

import Grid from "@mui/material/Grid";

import { Typography } from "@mui/material";

import AuthContext from "../auth";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");
  const { top5List } = props;

  //Keeps track if list is expanded or not
  const [expanded, setExpanded] = useState(false);

  //Keeps track of current search
  const [comment, setComment] = useState("");

  const { auth } = useContext(AuthContext);

  function handleLoadList(event, id) {
    console.log("handleLoadList for " + id);
    if (!event.target.disabled) {
      let _id = event.target.id;
      if (_id.indexOf("list-card-text-") >= 0)
        _id = ("" + _id).substring("list-card-text-".length);

      console.log("load " + event.target.id);

      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
    }
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  async function handleDeleteList(event, id) {
    event.stopPropagation();
    // let _id = event.target.id;
    // _id = ("" + _id).substring("delete-list-".length);
    store.markListForDeletion(id);
  }

  function handleUpdateText(event) {
    setText(event.target.value);
  }

  function handleLike(event) {
    event.stopPropagation();
    store.updateLikes(top5List);
  }
  function handleDislike(event) {
    event.stopPropagation();
    store.updateDislikes(top5List);
  }
  function handleExpand(event) {
    event.stopPropagation();
    let ex = !expanded;
    setExpanded(ex);
    if (ex) {
      store.updateViews(top5List);
    }
  }

  function handleEditList(event) {
    event.stopPropagation();
    store.setCurrentList(top5List._id);
  }

  function handleUpdateComment(event) {
    setComment(event.target.value);
  }
  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let text = event.target.value;
      store.addComment(top5List, text);
      setComment("");
    }
  }

  let likeDisabled = false;
  let dislikeDisabled = false;
  let commentDisabled = false;
  let deleteDisabled = false;

  if (store.isGuest) {
    likeDisabled = true;
    dislikeDisabled = true;
    commentDisabled = true;
    deleteDisabled = true;
  } else {
    if (
      store.listView === "community" ||
      auth.user.username !== top5List.username
    ) {
      deleteDisabled = true;
    }
    if (store.listView !== "community" && !top5List.published) {
      likeDisabled = true;
      dislikeDisabled = true;
      commentDisabled = true;
    }
  }

  let items = (
    <List
      sx={{
        border: 2,
        borderRadius: 8,
        width: "100%",
        bgcolor: "#9595f6",
      }}
    >
      {top5List.items.map((item, index) => (
        <ListItem key={index}>
          <Typography>{index + 1 + ". " + item}</Typography>
        </ListItem>
      ))}
    </List>
  );

  if (store.listView === "community") {
    const counts = {};
    for (const itemName of top5List.items) {
      let item = itemName.substring(0, itemName.length - 1);
      let weight = parseInt(itemName.substring(itemName.length - 1));
      counts[item] = counts[item] ? counts[item] + weight : weight;
    }
    let newItems = [];

    let keys = Object.keys(counts);
    let values = Object.values(counts);

    console.log(keys);
    console.log(values);

    while (newItems.length !== 5) {
      let max = Number.MIN_VALUE;
      let maxName = "";

      for (let i = 0; i < values.length; i++) {
        if (values[i] > max && !newItems.includes(keys[i])) {
          max = values[i];
          maxName = keys[i];
        }
      }
      newItems.push(maxName);
    }

    items = (
      <List
        sx={{
          border: 2,
          borderRadius: 8,
          width: "100%",
          bgcolor: "#9595f6",
        }}
      >
        {newItems.map((item, index) => (
          <ListItem key={index}>
            <Typography>{index + 1 + ". " + item}</Typography>
          </ListItem>
        ))}
      </List>
    );
  }

  let commentStrings = Object.keys(top5List.comments);
  let commentUsers = Object.values(top5List.comments);

  let comments = (
    <Box>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 200,
        }}
      >
        {commentUsers.map((user, index) => (
          <ListItem
            key={index}
            sx={{
              border: 2,
              borderRadius: 8,
              bgcolor: "#9595f6",
              width: "100%",
              marginTop: "2px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography display="inline" style={{ fontSize: "12pt" }}>
                  {user}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography display="inline" style={{ fontSize: "12pt" }}>
                  {commentStrings[index]}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          border: 2,
          borderRadius: 2,
          width: "100%",
          marginTop: "12px",
        }}
      >
        <TextField
          label="Comment"
          sx={{ width: "100%" }}
          margin="normal"
          id={"comment"}
          name="comment"
          disabled={commentDisabled}
          onKeyPress={handleKeyPress}
          onChange={handleUpdateComment}
          value={comment}
          inputProps={{ style: { fontSize: 14 } }}
          InputLabelProps={{ style: { fontSize: 14 } }}
        />
      </Box>
    </Box>
  );

  let editOrPublishedElement = (
    <Link
      component="button"
      variant="body2"
      onClick={(event) => {
        handleEditList(event);
      }}
    >
      Edit
    </Link>
  );

  let byElement = (
    <Typography display="inline">{"By: " + top5List.username}</Typography>
  );

  if (store.listView === "community") {
    editOrPublishedElement = (
      <Typography display="inline">
        {"Updated: " + top5List.updateDate}
      </Typography>
    );

    byElement = <Typography display="inline">{""}</Typography>;
  } else if (top5List.published) {
    editOrPublishedElement = (
      <Typography display="inline">
        {"Published: " + top5List.publishedDate}
      </Typography>
    );
  }

  let cardElement = (
    <ListItem
      id={top5List._id}
      key={top5List._id}
      sx={{
        border: 2,
        borderRadius: 8,
        width: "90%",
        margin: "auto",
        marginTop: "15px",
        display: "flex",
        p: 1,
        bgcolor: "white",
      }}
      style={{ width: "100%" }}
      style={{
        fontSize: "16pt",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Typography display="inline" style={{ fontSize: "20pt" }}>
            {top5List.name}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="like"
            color="primary"
            disabled={likeDisabled}
            onClick={(event) => {
              handleLike(event);
            }}
          >
            <ThumbUpIcon style={{ fontSize: "20pt" }} />
          </IconButton>
          <Typography display="inline">{top5List.likes.length}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="like"
            color="primary"
            disabled={dislikeDisabled}
            onClick={(event) => {
              handleDislike(event);
            }}
          >
            <ThumbDownIcon style={{ fontSize: "20pt" }} />
          </IconButton>
          <Typography display="inline">{top5List.dislikes.length}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            disabled={deleteDisabled}
            onClick={(event) => {
              handleDeleteList(event, top5List._id);
            }}
            aria-label="delete"
          >
            <DeleteIcon style={{ fontSize: "20pt" }} />
          </IconButton>
        </Grid>
        <Grid item xs={9}>
          {byElement}
        </Grid>
        <Grid item xs={3}>
          <Typography display="inline">{"Views: " + top5List.views}</Typography>
        </Grid>
        <Grid item xs={11}>
          {editOrPublishedElement}
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="like"
            color="primary"
            onClick={(event) => {
              handleExpand(event);
            }}
          >
            <KeyboardArrowDownIcon style={{ fontSize: "20pt" }} />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  );
  if (expanded) {
    cardElement = (
      <ListItem
        id={top5List._id}
        key={top5List._id}
        sx={{
          border: 2,
          borderRadius: 8,
          width: "90%",
          margin: "auto",
          marginTop: "15px",
          display: "flex",
          p: 1,
          bgcolor: "white",
        }}
        style={{ width: "100%" }}
        style={{
          fontSize: "16pt",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography display="inline" style={{ fontSize: "20pt" }}>
              {top5List.name}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="like"
              color="primary"
              disabled={likeDisabled}
              onClick={(event) => {
                handleLike(event);
              }}
            >
              <ThumbUpIcon style={{ fontSize: "20pt" }} />
            </IconButton>
            <Typography display="inline">{top5List.likes.length}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="like"
              color="primary"
              disabled={dislikeDisabled}
              onClick={(event) => {
                handleDislike(event);
              }}
            >
              <ThumbDownIcon style={{ fontSize: "20pt" }} />
            </IconButton>
            <Typography display="inline">{top5List.dislikes.length}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              disabled={deleteDisabled}
              onClick={(event) => {
                handleDeleteList(event, top5List._id);
              }}
              aria-label="delete"
            >
              <DeleteIcon style={{ fontSize: "20pt" }} />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            {byElement}
          </Grid>

          <Grid item xs={6}>
            {items}
          </Grid>
          <Grid item xs={6}>
            {comments}
          </Grid>

          <Grid item xs={9}>
            {editOrPublishedElement}
          </Grid>
          <Grid item xs={2}>
            <Typography display="inline">
              {"Views: " + top5List.views}
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <IconButton
              aria-label="like"
              color="primary"
              onClick={(event) => {
                handleExpand(event);
              }}
            >
              <KeyboardArrowUpIcon style={{ fontSize: "20pt" }} />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
  return cardElement;
}

export default ListCard;
