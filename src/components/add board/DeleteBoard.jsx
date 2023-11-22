
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';


export default function DeleteBoard({deleteFunc,project}){
    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const overlayStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.7)', 
      zIndex: 998, 
    };
    const modalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      background: 'rgb(16, 16, 95)',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      zIndex: 999,
      alignItems: 'center',
      Width:'20vw',
      Height:'25vh',
      borderRadius:'10px',
      color:'white',
    };
    const handleDelete = () => {
        deleteFunc(project)
         setOpen(false);
       };
     
       const handleClickOpen = () => {
         setOpen(true);
       };
     
       const handleClose = () => {
         setOpen(false);
       };
       function isOpen(){
         return open
       }

return(
    <div>
       <p style={{fontSize:'large', color:'#36B176', display: 'inline', whiteSpace: 'nowrap',cursor:'pointer'}} onClick={handleClickOpen}><DeleteTwoToneIcon/>Delete board</p> 
       {isOpen ? (
      <Dialog open={open} onClose={handleClose} sx={overlayStyle}>
      <div style={modalStyle}>
        <DialogTitle>Delete Board: {project}</DialogTitle>
        <DialogContent >
          <p>Are you sure you want to delete this board?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:'white'}}>
            Cancel
          </Button>
          <Button onClick={handleDelete} sx={{color:'white'}}>
            Delete
          </Button>
        </DialogActions>
        </div>
      </Dialog>):null}
    </div>
)
}