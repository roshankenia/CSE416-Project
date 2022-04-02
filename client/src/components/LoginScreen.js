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

export default function LoginScreen() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    auth.loginUser(data.get("username"), data.get("password"));
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
            Login
          </Typography>
          <Box
            component="form"
            noValidate
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
                      label="Username:"
                      name="username"
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
                      name="password"
                      label="Password:"
                      type="password"
                      id="password"
                      autoComplete="current-password"
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
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  sx={{ color: "gray", textDecoration: "line-through" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleSubmit}
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
                  Sign In
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ color: "gray", textDecoration: "line-through" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register/" variant="body2">
                    {"Don't have an account? Sign Up"}
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
