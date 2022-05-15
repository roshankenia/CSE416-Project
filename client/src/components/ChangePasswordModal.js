import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, Modal, Typography } from "@mui/material/";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";


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
export default function ChangePasswordModal() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => { if(values.newPassword.length < 8 && values.newPassword.length !== 0){
    setErr('lessthan8')
  }else if(values.newPassword !== values.confirmPassword){
    setErr('mismatch')
  }else{
    setErr('')
  }},[values.newPassword, values.confirmPassword]);

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
  async function handleChangePassword(event) {
    if(!err){
      let response = await auth.changePassword(auth.user.username, values.oldPassword, values.newPassword, values.confirmPassword);
      setSuccess(response)
    }
  }
  function handleClose(event) {
    setValues({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    })
    setSuccess(false)
    auth.setErrorMessage('')
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
      {!success? 
      <Grid>
{/* Old Password */}
      <Typography 
        sx={{fontSize: 28, marginBottom:'-10px'}}>
        Old Password:
      </Typography>
      <FormControl fullWidth sx={{ }} variant="standard" >
          <Input
            error={auth.errorMessage === 'Wrong password provided.'}
            id="standard-adornment-password"
            type={values.showOldPassword ? 'text' : 'password'}
            value={values.oldPassword}
            onChange={handleChange('oldPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle oldPassword visibility"
                  onClick={handleClickShowPassword('showOldPassword')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {auth.errorMessage === 'Wrong password provided.' && <FormHelperText id="my-helper-text" sx={{color:'red', fontSize:'14px'}}>{auth.errorMessage}</FormHelperText>}
      </FormControl>
{/* New Password */}
      <Typography 
        sx={{fontSize: 28, marginBottom:'-10px'}}>
        New Password:
      </Typography>
      <FormControl fullWidth sx={{ }} variant="standard" >
          <Input
            error={err==='lessthan8'}
            id="standard-adornment-password"
            type={values.showNewPassword ? 'text' : 'password'}
            value={values.newPassword}
            onChange={handleChange('newPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle newPassword visibility"
                  onClick={handleClickShowPassword('showNewPassword')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {err==='lessthan8' && <FormHelperText id="my-helper-text" sx={{color:'red', fontSize:'14px'}}>Please enter a password of at least 8 characters.</FormHelperText>}
      </FormControl>
{/* Confirm New Password */}
      <Typography 
        sx={{fontSize: 28, marginBottom:'-10px'}}>
        Confirm New Password:
      </Typography>
      <FormControl fullWidth sx={{ }} variant="standard" >
          <Input
            error={err==='mismatch'}
            helperText="Incorrect entry."
            id="standard-adornment-password"
            type={values.showConfirmPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirmPassword visibility"
                  onClick={handleClickShowPassword('showConfirmPassword')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
         {err==='mismatch' && <FormHelperText id="my-helper-text" sx={{color:'red', fontSize:'14px'}}>Please enter the same password twice.</FormHelperText>}
        </FormControl>
        </Grid>
        : "Change successful"}

        {!success &&
        <Button
          variant="contained"
          onClick={handleChangePassword}
          sx={{ m: 1 }}
        >
          Confirm
        </Button>}
        <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
