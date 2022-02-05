import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import { useContext } from "react";
import GlobalStoreContext from "../store";
import { useHistory } from "react-router-dom";

export default function WelcomeScreen() {
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();

  function handleGuest() {
    store.updateGuest(true);
    history.push("/");
  }
  return (
    <Box sx={{ width: "100%", height: "100%", background: 'linear-gradient(#f8f8fe, #9595f6)'}}>
      <Typography variant="h1" component="div" gutterBottom align="center">
        The Top 5 Lister
      </Typography>
      <div align="center">
        <Typography
          sx={{ width: "75%" }}
          variant="h6"
          gutterBottom
          component="div"
        >
          Welcome to the Top 5 Lister App! You can use this app to create, edit,
          and publish your own Top 5 Lists. In addition, you can view and
          interact with lists belonging to other users and with community
          aggregate lists. Enjoy!
        </Typography>
      </div>
      <div align="center">
        <div>
          <Button
            variant="contained"
            color="success"
            size="large"
            href="/register/"
            sx={{ mt: 2, width: "50%", minHeight: "100px" }}
          >
            Create New Account
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            size="large"
            href="/login/"
            sx={{ mt: 2, width: "50%", minHeight: "100px" }}
          >
            Login
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ mt: 2, width: "50%", minHeight: "100px" }}
            onClick={handleGuest}
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </Box>
  );
}
