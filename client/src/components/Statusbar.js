import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { Typography } from "@mui/material";
import AuthContext from "../auth";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  function addList(event) {
    event.stopPropagation();
    store.createNewList();
  }

  let search = store.search;

  let text = "";
  if (store.listView === "yours") {
    if (!store.currentLists) {
      text = (
        <Box>
          <Typography
            display="inline"
            align="right"
            variant="h3"
            alignSelf="flex-end"
          >
            {"Click on a section to begin!"}
          </Typography>
        </Box>
      );
    } else {
      text = (
        <Box>
          <IconButton
            aria-label="sort"
            color="primary"
            size="large"
            onClick={(event) => {
              addList(event);
            }}
          >
            <AddIcon
              sx={{
                width: 60,
                height: 60,
              }}
            />
          </IconButton>
          <Typography
            display="inline"
            align="right"
            variant="h3"
            alignSelf="flex-end"
          >
            Your Lists
          </Typography>
        </Box>
      );
    }
  } else if (store.listView === "all") {
    if (store.search === "") {
      text = (
        <Box>
          <Typography
            display="inline"
            align="right"
            variant="h3"
            alignSelf="flex-end"
          >
            {"Named Lists"}
          </Typography>
        </Box>
      );
    } else {
      text = (
        <Box>
          <Typography
            display="inline"
            align="right"
            variant="h3"
            alignSelf="flex-end"
          >
            {search + " Lists"}
          </Typography>
        </Box>
      );
    }
  } else if (store.listView === "users") {
    if (store.search === "") {
      text = (
        <Box>
          <Typography
            display="inline"
            align="right"
            variant="h3"
            alignSelf="flex-end"
          >
            {"User Lists"}
          </Typography>
        </Box>
      );
    } else {
      text = (
        <Box>
          <Typography
            display="inline"
            align="right"
            variant="h3"
            alignSelf="flex-end"
          >
            {search + " Lists"}
          </Typography>
        </Box>
      );
    }
  } else if (store.listView === "community") {
    if (store.search === "") {
      text = (
        <Box>
          <Typography
            display="inline"
            align="right"
            variant="h3"
            alignSelf="flex-end"
          >
            {"Community Lists"}
          </Typography>
        </Box>
      );
    } else {
      text = (
        <Box>
          <Typography
            display="inline"
            align="right"
            variant="h3"
            alignSelf="flex-end"
          >
            {search + " Lists"}
          </Typography>
        </Box>
      );
    }
  }

  if (!store.isGuest && !auth.loggedIn) {
    return (
      <div id="top5-statusbar">
        <Typography
          align="right"
          variant="body1"
          gutterBottom
          alignSelf="flex-end"
        >
          Developed by Roshan Kenia
        </Typography>
      </div>
    );
  } else {
    return (
      <div id="top5-statusbar">
        <Typography variant="h4">{text}</Typography>
      </div>
    );
  }
}

export default Statusbar;
