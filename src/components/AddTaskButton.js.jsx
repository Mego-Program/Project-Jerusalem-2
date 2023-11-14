import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function AddTaskButton({ onAddTask }) {
  const [open, setOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    taskName: '',
    content: '',
    deadline: '',
    status: '',
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
      taskName: '',
      content: '',
      deadline: '',
      status: '',
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
    // Validation for all fields
    const { taskName, content, deadline, status, category, milestone, issueType } = taskDetails;
    if ([taskName, content, deadline, status, category, milestone, issueType].some(field => field.trim() === '')) {
      alert('All fields must be filled!');
      return;
    }

    handleClose();
    onAddTask(taskDetails);
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
            name="taskName"
            label="Task Name"
            type="text"
            fullWidth
            value={taskDetails.taskName}
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
            name="deadline"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={taskDetails.deadline}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={taskDetails.status}
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
