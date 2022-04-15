import React, { useContext, useEffect, useState } from "react";
import { GlobalCommunityContext } from "../community";
import AuthContext from "../auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//password stuff
import {IconButton, Input, InputAdornment, FormHelperText, FormControl} from '@mui/material/';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
export default function DeleteAccountModal() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const [values, setValues] = useState({
    password: 'ඞ',
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = (prop) => (event) => {
    setValues({
      ...values, [prop]: !values[prop],
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleDeleteAccount(event) {
    if(values.password==='ඞ'){
      setValues({password: '', showPassword: false})
    }else{
      auth.deleteAccount(auth.user.username, values.password);
    }   
  }
  function handleClose(event) {
    community.setDeleteAccount(false);
  }
  console.log(community.deleteAccountModal);

  let box = ''
  if(values.password === 'ඞ'){
    box = <Box sx={style}>
    <Typography id="modal-modal-title" variant="h5" component="h2">
      Are you sure you want to delete your account?
    </Typography>
    <Button variant="contained" onClick={handleDeleteAccount} sx={{ m: 1 }}>
      Confirm
    </Button>
    <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>
      Cancel
    </Button>
    </Box>
  }else{
    box = <Box sx={style}>
    <Typography id="modal-modal-title" variant="h5" component="h2" >
      Enter the password correctly to prove you are not an imposter ඞ.
    </Typography>
    <Typography 
        sx={{fontSize: 28, marginBottom:'-10px',textAlign: "left" }}>
        Confirm Password:
      </Typography>
      <FormControl fullWidth sx={{ }} variant="standard" >
          <Input
            error={auth.errorMessage === 'Wrong password provided.'}
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle Password visibility"
                  onClick={handleClickShowPassword('showPassword')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {auth.errorMessage === 'Wrong password provided.' && <FormHelperText id="my-helper-text" sx={{color:'red', fontSize:'14px'}}>{auth.errorMessage}</FormHelperText>}
      </FormControl>
        <Button variant="contained" onClick={handleDeleteAccount} sx={{ m: 1 }}>
        Confirm
      </Button>
      <Button variant="outlined" onClick={handleClose} sx={{ m: 1,}}>
        Cancel
      </Button>
    </Box>
  }
    
  return (
    <Modal
      open={community.deleteAccountModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {box}
    </Modal>
  );
}
