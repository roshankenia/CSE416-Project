import { useContext, useState } from "react";
import AuthContext from "../auth";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function LoginScreen() {
  const { auth } = useContext(AuthContext);
  const [success, setSuccess] = useState(false)

  async function handleSubmit(event){
    event.preventDefault();
    console.log("handle reset")
    const data = new FormData(event.currentTarget);
    let response = await auth.resetPassword(data.get("email"))
    setSuccess(response)
  };

  let container = ''
  if(success){
    container = <Container component="main" maxWidth="md">
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
      <Typography component="h1" variant="h5"  align="center">
        Your password has been successfully reset. Please check your email(including spam folder) for your temporaray passcode.
      </Typography>
    </Box>
    </Container>
  }else{
      container = <Container component="main" maxWidth="md">
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
          Reset Password
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
                    error={typeof(auth.errorMessage) === 'string'}
                    required
                    fullWidth
                    variant="standard"
                    id="email"
                    label="Eamil:"
                    name="email"
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
                <Typography sx={{marginLeft:'3%', fontSize:'14pt', color: theme.palette.error.main}}>
                    {auth.errorMessage}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={12}>
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  }

  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
      }}
    >
      {container}
    </Box>
  );
}

