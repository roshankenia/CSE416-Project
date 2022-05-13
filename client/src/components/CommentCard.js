import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function CommentCard(props) {
  const { community } = useContext(GlobalCommunityContext);
  const { comment, post } = props;
  const { auth } = useContext(AuthContext);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  function handleDeleteConfirm(event) {
    setDeleteConfirm(!deleteConfirm);
  }

  async function handleDeleteComment() {
    setDeleteConfirm(false)
    community.updatePost("delComment", post, comment[0], auth.user)
  }
  if (auth.user.username == comment[1]){
    if (!deleteConfirm){
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
              <IconButton color="primary" onClick={handleDeleteConfirm}>
                <DeleteIcon/>
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
            <Grid item xs={9}>
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
              <DeleteIcon/>
            </Grid>
            <Grid item xs={1}>
              <IconButton color="primary" onClick={handleDeleteComment}>
                <CheckIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton color="primary" onClick={handleDeleteConfirm}>
                <CloseIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      );
    }
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
