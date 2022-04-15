import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import AuthContext from "../auth";
import {Box, Button, Typography, Modal, Grid} from "@mui/material/";

import {IconButton, Input, InputAdornment, FormHelperText, FormControl} from '@mui/material/';

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

  return (
    <Modal>
      to be completed
    </Modal>
  );
}
