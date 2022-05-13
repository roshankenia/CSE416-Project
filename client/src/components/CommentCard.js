import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function CommentCard(props) {
  const { community } = useContext(GlobalCommunityContext);
  const { comment, post } = props;
  const { auth } = useContext(AuthContext);

  async function handleDeleteComment() {
    community.updatePost("delComment", post, comment[0], auth.user)
  }
  if (auth.user.username == comment[1]){
    return (
      <Box
        variant="contained"
        color="success"
        size="large"
        style={{
          fontWeight: 600,
          border: "3px solid",
          borderColor: "black",
          backgroundColor: "#dfe4ed",
          color: "black",
          fontSize: "48px",
          borderRadius: 20,
        }}
        sx={{ width: "100%" }}
      >
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <Typography
              style={{
                fontSize: "26px",
                paddingLeft: 10,
              }}
            >
              {comment[1] + ": " + comment[2]}
            </Typography>
            
          </Grid>
          <Grid item xs={1}>
            <IconButton color="primary" onClick={handleDeleteComment}>
              <DeleteIcon
                sx={{
                  width: 20,
                  height: 20,
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box
        variant="contained"
        color="success"
        size="large"
        style={{
          fontWeight: 600,
          border: "3px solid",
          borderColor: "black",
          backgroundColor: "#dfe4ed",
          color: "black",
          fontSize: "48px",
          borderRadius: 20,
        }}
        sx={{ width: "100%" }}
      >
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <Typography
              style={{
                fontSize: "26px",
                paddingLeft: 10,
              }}
            >
              {comment[1] + ": " + comment[2]}
            </Typography>
            
          </Grid>
        </Grid>  
      </Box>
    );
  }
  
}
