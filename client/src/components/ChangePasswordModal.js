import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import AuthContext from "../auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};
export default function ChangePasswordModal() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  function handleChangePassword(event) {
    // auth.deleteAccount();
  }
  function handleClose(event) {
    community.setChangePassword(false);
  }
  return (
    <Modal
      open={community.changePasswordModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          name="oldPass"
          fullWidth
          id="oldPass"
          label="Old Password:"
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
        <TextField
          name="newPass"
          fullWidth
          id="newPass"
          label="New Password:"
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
        <TextField
          name="confirmNewPass"
          fullWidth
          id="confirmNewPass"
          label="Confirm New Password:"
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
        <Button
          variant="contained"
          onClick={handleChangePassword}
          sx={{ m: 1 }}
        >
          Confirm
        </Button>
        <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}
