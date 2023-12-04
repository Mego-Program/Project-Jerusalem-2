import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Login } from '@mui/icons-material';

function EditTask(props) {
  const [open, setOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    header: '',
    content: '',
    category: '',
    milestone: '',
    issue_type: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskDetails({
      header: '',
      content: '',
      category: '',
      milestone: '',
      issue_type: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleAddTask = () => {
        for (const key in taskDetails) {if(taskDetails[key]!==''){
        props.updateTaskFunc(props.id,key,taskDetails[key])}}
    handleClose();
  };

  return (
    <div >
      <EditIcon  variant="contained" onClick={handleClickOpen} sx={{ cursor: 'pointer' }}/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            placeholder={props.TaskDetails.header}
            margin="dense"
            name="header"
            label="header"
            type="text"
            fullWidth
            value={taskDetails.header}
            onChange={handleInputChange}
          />
          <TextField
          placeholder={props.TaskDetails.content}
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={taskDetails.content}
            onChange={handleInputChange}
          />
          <TextField
          placeholder={props.TaskDetails.category}
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={taskDetails.category}
            onChange={handleInputChange}
          />
          <TextField
            placeholder={props.TaskDetails.milestone}
            margin="dense"
            name="milestone"
            label="Milestone"
            type="text"
            fullWidth
            value={taskDetails.milestone}
            onChange={handleInputChange}
          />
          <TextField
          placeholder={props.TaskDetails.issueType}
            margin="dense"
            name="issue_type"
            label="Issue Type"
            type="text"
            fullWidth
            value={taskDetails.issueType}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditTask