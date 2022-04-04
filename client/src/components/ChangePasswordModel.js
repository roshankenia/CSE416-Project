import { useContext } from 'react'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: 'center',
    p: 4,
};

function ChangePasswordModal() {
    const { auth } = useContext(AuthContext);

    let name = "";
    let open = false;
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
        open = true
    }
    function handleDeleteAccount(event) {
        auth.deleteAccount();
    }
    function handleClose(event) {
        
    }
    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style} >
        <Typography id="modal-modal-title" variant="h5" component="h2">
        Are you sure you want to delete your account?
        </Typography>
        <Button variant="contained" onClick={handleDeleteAccount} sx={{ m: 1}}>Confirm</Button>
        <Button variant="outlined" onClick={handleClose} sx={{ m: 1}}>Cancel</Button>
        </Box>
        </Modal>
    )
}

export default DeleteModal;