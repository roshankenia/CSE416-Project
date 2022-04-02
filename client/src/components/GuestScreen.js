import { useContext } from "react";
import AuthContext from "../auth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalCommunityContext } from "../community";

const theme = createTheme();

export default function GuestScreen() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    auth.loginUser(data.get("username"), data.get("lobbyCode"));
  };

  return (
    <Box style={{ backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')" }}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" component="div" align="center">
            JART
          </Typography>
          <Typography component="h1" variant="h5">
            Guest
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  style={{
                    border: "3px solid",
                    borderColor: "black",
                    color: "black",
                    backgroundColor: "white",
                    fontSize: "32px",
                    borderRadius: 40,
                    outline: "none",
                  }}
                >
                  <Box style={{ width: "96%" }}>
                    <TextField
                      required
                      fullWidth
                      variant="standard"
                      id="username"
                      label="Temporary Username:"
                      name="username"
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontSize: 30,
                          paddingLeft: 20,
                          paddingTop: 10,
                          paddingBottom: 10,
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 30, paddingLeft: 20 },
                        shrink: true,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  style={{
                    border: "3px solid",
                    borderColor: "black",
                    color: "black",
                    backgroundColor: "white",
                    fontSize: "32px",
                    borderRadius: 40,
                    outline: "none",
                  }}
                >
                  <Box style={{ width: "96%" }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="lobbyCode"
                      label="Lobby Code:"
                      type="lobbyCode"
                      id="lobbyCode"
                      autoComplete="current-lobbyCode"
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontSize: 30,
                          paddingLeft: 20,
                          paddingTop: 10,
                          paddingBottom: 10,
                        },
                      }}
                      InputLabelProps={{
                        style: { fontSize: 30, paddingLeft: 20 },
                        shrink: true,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  size="large"
                  href="/register/"
                  style={{
                    fontWeight: 600,
                    border: "3px solid",
                    borderColor: "black",
                    backgroundColor: "#92C77F",
                    color: "black",
                    fontSize: "32px",
                  }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Join Lobby
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login/" variant="body2">
                    {"Have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
