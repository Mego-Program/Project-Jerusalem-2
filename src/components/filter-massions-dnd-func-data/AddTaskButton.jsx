import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
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
    <div style={{ display: 'flex', alignItems: 'center', color: 'green', cursor: 'pointer' }}>
      <PostAddIcon variant="contained" onClick={handleClickOpen} sx={{ color: 'green', ml: '10px', mr: '5px', cursor: 'pointer' }}/>
      <p className='text_button' style={{ margin: 0, verticalAlign: 'middle' }} onClick={handleClickOpen}>
        Add Task
      </p>
      
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