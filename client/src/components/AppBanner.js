import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material/";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
import DeletePostModal from "./DeletePostModal";
import FeedbackModal from "./FeedbackModal";
import ReportModal from "./ReportModal";

export default function AppBanner() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);
  const { game } = useContext(GameContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenDeleteAccount = (event) => {
    event.preventDefault();
    community.setDeleteAccount(true);
  };

  const handleOpenChangePassword = (event) => {
    event.preventDefault();
    community.setChangePassword(true);
  };

  const handleOpenFeedback = (event) => {
    event.preventDefault();
    community.setFeedback(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    // store.resetCurrentList()
    auth.logoutUser();
  };

  const setScreen = (event, screen) => {
    event.preventDefault();
    community.setScreen(screen);
  };

  const handleViewProfile = (event) => {
    setScreen(event, "profile");
  };
  const handleChangePassword = () => {};

  const menuId = "primary-search-account-menu";
  const loggedOutMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login/">Login</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/register/">Create New Account</Link>
      </MenuItem>
    </Menu>
  );
  let username = "";
  if (auth.loggedIn) {
    username = auth.user.username;
  }
  const loggedInMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Typography> {"Hi " + username} </Typography>
      <MenuItem onClick={handleViewProfile}> View Profile</MenuItem>
      <MenuItem onClick={handleOpenChangePassword}>Change Password</MenuItem>
      <MenuItem onClick={handleOpenDeleteAccount}>Delete Account</MenuItem>
      <MenuItem onClick={handleOpenFeedback}>Send Feedback</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  let menu = loggedOutMenu;

  if (auth.loggedIn && !auth.isGuest) {
    menu = loggedInMenu;
  }

  function getAccountMenu(loggedIn) {
    if (loggedIn && !auth.isGuest) {
      let initials =
        auth.user.firstName.substring(0, 1) +
        auth.user.lastName.substring(0, 1);
      return (
        <Typography
          style={{
            fontSize: "32px",
          }}
        >
          {initials}
        </Typography>
      );
    } else {
      return <AccountCircle />;
    }
  }
  const history = useHistory();

  function backToJART(event) {
    event.stopPropagation();
    if (game.lobby) {
      game.disconnectPlayer();
    } else {
      history.push("/");
    }
  }

  return (
    <Box>
      <AppBar>
        <Toolbar sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Button
              onClick={backToJART}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "36px",
              }}
            >
              JART
            </Button>
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!game.lobby && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {getAccountMenu(auth.loggedIn)}
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {menu}
      <DeleteAccountModal />
      <FeedbackModal />
      <ChangePasswordModal />
      <DeletePostModal />
      <ReportModal />
    </Box>
  );
}
