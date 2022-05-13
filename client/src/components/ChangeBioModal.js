import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import AuthContext from "../auth";
import { Box, Button, Typography, Modal, Grid } from "@mui/material/";

import {
  IconButton,
  Input,
  InputAdornment,
  FormHelperText,
  FormControl,
} from "@mui/material/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  textAlign: "left",
  p: 4,
};
export default function ChangeBioModal() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const [newBio, setNewBio] = useState("");

  function handleChange(event) {
    console.log(event.target.value);
    setNewBio(event.target.value);
  }

  function handleClose(event) {
    setNewBio("");
    auth.setErrorMessage("");
    community.setChangeBio(false);
  }

  async function handleChangeBio(event) {
    community.updateBio(auth.user.username, newBio);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    textAlign: "left",
    p: 4,
  };

  return (
    <Modal
      open={community.changeBioModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={style}>
        <Typography sx={{ fontSize: 28, marginBottom: "-10px" }}>
          New Biography:
        </Typography>
        <FormControl fullWidth sx={{}} variant="standard">
          <Input id="standard-adornment-biography" onChange={handleChange} />
        </FormControl>
        <Button variant="contained" onClick={handleChangeBio} sx={{ m: 1 }}>
          Confirm
        </Button>
        <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
