import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function AddTaskButton(props) {
  const [open, setOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    header: '',
    content: '',
    category: '',
    milestone: '',
    issueType: ''
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
      issueType: ''
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
    
    const { header, content, category, milestone, issueType } = taskDetails;
    if ([header, content,category, milestone, issueType].some(field => field.trim() === '')) {
      alert('All fields must be filled!');
      return;
    }
    props.func(taskDetails)
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="header"
            label="header"
            type="text"
            fullWidth
            value={taskDetails.header}
            onChange={handleInputChange}
          />
          {/* Additional fields */}
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={taskDetails.content}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={taskDetails.category}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="milestone"
            label="Milestone"
            type="text"
            fullWidth
            value={taskDetails.milestone}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="issueType"
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

export default AddTaskButton;