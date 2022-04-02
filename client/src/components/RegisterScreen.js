import { useContext } from "react";
import AuthContext from "../auth";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GlobalCommunityContext } from "../community";

export default function RegisterScreen() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.registerUser(
      formData.get("firstName"),
      formData.get("lastName"),
      formData.get("email"),
      formData.get("password"),
      formData.get("passwordVerify"),
      formData.get("username")
    );
  };

  return (
    <Box>
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
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name:"
                    autoFocus
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 30,
                        paddingLeft: 20,
                        paddingBottom: 10,
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 30, paddingLeft: 20 },
                      shrink: true,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  <TextField
                    required
                    fullWidth
                    variant="standard"
                    id="lastName"
                    label="Last Name:"
                    name="lastName"
                    autoComplete="lname"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 30,
                        paddingLeft: 20,
                        paddingBottom: 10,
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 30, paddingLeft: 20 },
                      shrink: true,
                    }}
                  />
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
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 30,
                        paddingLeft: 20,
                        paddingBottom: 10,
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 30, paddingLeft: 20 },
                      shrink: true,
                    }}
                  />
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
                  <TextField
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="username"
                    id="username"
                    autoComplete="username"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 30,
                        paddingLeft: 20,
                        paddingBottom: 10,
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 30, paddingLeft: 20 },
                      shrink: true,
                    }}
                  />
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
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 30,
                        paddingLeft: 20,
                        paddingBottom: 10,
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 30, paddingLeft: 20 },
                      shrink: true,
                    }}
                  />
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
                  <TextField
                    required
                    fullWidth
                    name="passwordVerify"
                    label="Password Verify"
                    type="password"
                    id="passwordVerify"
                    autoComplete="new-password"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: 30,
                        paddingLeft: 20,
                        paddingBottom: 10,
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 30, paddingLeft: 20 },
                      shrink: true,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              size="large"
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
              Create New Account
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
